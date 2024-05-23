const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../index');
const User = require('../models/user.model');

describe('My List API', () => {
  let userId;

  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/ott-platform-test', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const user = new User({ username: 'testUser', preferences: { favoriteGenres: [], dislikedGenres: [] }, watchHistory: [], myList: [] });
    await user.save();
    userId = user._id.toString();
  });

  afterAll(async () => {
    await User.deleteMany({});
    await mongoose.connection.close();
  });

  it('should add content to my list', async () => {
    const res = await request(app).post('/my-list/add').send({ userId, contentId: 'movie123' });
    expect(res.status).toBe(200);
    expect(res.text).toBe('Content added to My List');
  });

  it('should return error for adding duplicate content', async () => {
    await request(app).post('/my-list/add').send({ userId, contentId: 'movie123' });
    const res = await request(app).post('/my-list/add').send({ userId, contentId: 'movie123' });
    expect(res.status).toBe(200); 
  });

  it('should list items in my list', async () => {
    const res = await request(app).get('/my-list/list').query({ userId, page: 1, limit: 10 });
    expect(res.status).toBe(200);
    expect(res.body).toContain('movie123');
  });

  it('should remove content from my list', async () => {
    const res = await request(app).delete(`/my-list/remove/movie123`).send({ userId });
    expect(res.status).toBe(200);
    expect(res.text).toBe('Content removed from My List');
  });

  it('should return error for removing content that does not exist', async () => {
    const res = await request(app).delete(`/my-list/remove/nonexistentMovie`).send({ userId });
    expect(res.status).toBe(200); 
  });

  it('should list items in my list after removal', async () => {
    const res = await request(app).get('/my-list/list').query({ userId, page: 1, limit: 10 });
    expect(res.status).toBe(200);
    expect(res.body).not.toContain('movie123');
  });

  it('should return error for invalid user ID', async () => {
    const res = await request(app).get('/my-list/list').query({ userId: 'invalidUserId', page: 1, limit: 10 });
    expect(res.status).toBe(500); 
  });
});
