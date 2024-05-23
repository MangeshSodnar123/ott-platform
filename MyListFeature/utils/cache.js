const redis = require('redis');

const client = redis.createClient();

client.on('error', (err) => {
  console.error('Redis error:', err);
});

async function connectRedis() {
  try {
    await client.connect();
    console.log('Connected to Redis');
  } catch (err) {
    console.error('Redis connection error:', err);
  }
}

connectRedis();

module.exports = client;

