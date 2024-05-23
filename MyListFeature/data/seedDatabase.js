const mongoose = require('mongoose');
require('dotenv').config(); 
const User = require('../models/user.model'); 
const Movie = require('../models/movie.model'); 
const TVShow = require('../models/tvShow.model'); 

const users = [
  {
    id: 'user1',
    username: 'john_doe',
    preferences: {
      favoriteGenres: ['Action', 'SciFi'],
      dislikedGenres: ['Romance']
    },
    watchHistory: [
      {
        contentId: 'movie1',
        watchedOn: new Date('2024-05-01T12:00:00Z'),
        rating: 5
      },
      {
        contentId: 'tvshow1',
        watchedOn: new Date('2024-05-05T15:00:00Z')
      }
    ]
  },
  {
    id: 'user2',
    username: 'jane_smith',
    preferences: {
      favoriteGenres: ['Comedy', 'Drama'],
      dislikedGenres: ['Horror']
    },
    watchHistory: [
      {
        contentId: 'movie2',
        watchedOn: new Date('2024-04-20T20:00:00Z'),
        rating: 4
      },
      {
        contentId: 'tvshow2',
        watchedOn: new Date('2024-04-25T10:00:00Z')
      }
    ]
  }
];

const movies = [
  {
    id: 'movie1',
    title: 'Action Hero',
    description: 'A thrilling action movie with non-stop excitement.',
    genres: ['Action'],
    releaseDate: new Date('2024-03-15T00:00:00Z'),
    director: 'Michael Bay',
    actors: ['Star A', 'Star B']
  },
  {
    id: 'movie2',
    title: 'Romantic Comedy',
    description: 'A heartwarming story about love and laughter.',
    genres: ['Romance', 'Comedy'],
    releaseDate: new Date('2023-12-25T00:00:00Z'),
    director: 'Nora Ephron',
    actors: ['Actor C', 'Actress D']
  },
  {
    id: 'movie3',
    title: 'Sci-Fi Thriller',
    description: 'A mind-bending thriller set in the future.',
    genres: ['SciFi', 'Thriller'],
    releaseDate: new Date('2022-11-10T00:00:00Z'),
    director: 'Steven Spielberg',
    actors: ['Actor E', 'Actress F']
  },
  {
    id: 'movie4',
    title: 'Fantasy Adventure',
    description: 'An epic adventure in a magical world.',
    genres: ['Fantasy', 'Adventure'],
    releaseDate: new Date('2022-09-05T00:00:00Z'),
    director: 'Peter Jackson',
    actors: ['Actor G', 'Actress H']
  },
  {
    id: 'movie5',
    title: 'Drama',
    description: 'A gripping drama that will touch your heart.',
    genres: ['Drama'],
    releaseDate: new Date('2023-08-20T00:00:00Z'),
    director: 'Christopher Nolan',
    actors: ['Actor I', 'Actress J']
  }
];

const tvShows = [
  {
    id: 'tvshow1',
    title: 'Space Adventures',
    description: 'A sci-fi series about exploring the universe.',
    genres: ['SciFi', 'Action'],
    episodes: [
      {
        episodeNumber: 1,
        seasonNumber: 1,
        releaseDate: new Date('2023-01-01T00:00:00Z'),
        director: 'Jane Doe',
        actors: ['Actor A', 'Actor B']
      },
      {
        episodeNumber: 2,
        seasonNumber: 1,
        releaseDate: new Date('2023-01-08T00:00:00Z'),
        director: 'John Smith',
        actors: ['Actor A', 'Actor C']
      }
    ]
  },
  {
    id: 'tvshow2',
    title: 'Funny Moments',
    description: 'A comedy series that will make you laugh out loud.',
    genres: ['Comedy'],
    episodes: [
      {
        episodeNumber: 1,
        seasonNumber: 1,
        releaseDate: new Date('2022-10-01T00:00:00Z'),
        director: 'Alex Johnson',
        actors: ['Comedian X', 'Comedian Y']
      },
      {
        episodeNumber: 2,
        seasonNumber: 1,
        releaseDate: new Date('2022-10-08T00:00:00Z'),
        director: 'Emily Davis',
        actors: ['Comedian X', 'Comedian Z']
      }
    ]
  },
  {
    id: 'tvshow3',
    title: 'Mystery Thriller',
    description: 'A suspenseful thriller with unexpected twists.',
    genres: ['Mystery', 'Thriller'],
    episodes: [
      {
        episodeNumber: 1,
        seasonNumber: 1,
        releaseDate: new Date('2023-05-15T00:00:00Z'),
        director: 'David Fincher',
        actors: ['Actor K', 'Actress L']
      },
      {
        episodeNumber: 2,
        seasonNumber: 1,
        releaseDate: new Date('2023-05-22T00:00:00Z'),
        director: 'Christopher Nolan',
        actors: ['Actor K', 'Actress M']
      }
    ]
  },
  {
    id: 'tvshow4',
    title: 'Historical Drama',
    description: 'A period drama set in a significant historical era.',
    genres: ['Drama', 'History'],
    episodes: [
      {
        episodeNumber: 1,
        seasonNumber: 1,
        releaseDate: new Date('2023-09-10T00:00:00Z'),
        director: 'Martin Scorsese',
        actors: ['Actor N', 'Actress O']
      },
      {
        episodeNumber: 2,
        seasonNumber: 1,
        releaseDate: new Date('2023-09-17T00:00:00Z'),
        director: 'Steven Spielberg',
        actors: ['Actor N', 'Actress P']
      }
    ]
  },
  {
    id: 'tvshow5',
    title: 'Reality TV',
    description: 'A reality show that follows the lives of interesting individuals.',
    genres: ['Reality'],
    episodes: [
      {
        episodeNumber: 1,
        seasonNumber: 1,
        releaseDate: new Date('2024-01-05T00:00:00Z'),
        director: 'Reality Director 1',
        actors: ['Participant Q', 'Participant R']
      },
      {
        episodeNumber: 2,
        seasonNumber: 1,
        releaseDate: new Date('2024-01-12T00:00:00Z'),
        director: 'Reality Director 2',
        actors: ['Participant S', 'Participant T']
      }
    ]
  }
];

const MONGODB_URI = process.env.MONGODB_URI;

async function seedDatabase() {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await User.deleteMany({});
    await Movie.deleteMany({});
    await TVShow.deleteMany({});

    await User.insertMany(users);
    await Movie.insertMany(movies);
    await TVShow.insertMany(tvShows);

    console.log('Database seeded successfully!');
    mongoose.connection.close();
  } catch (err) {
    console.error('Error seeding database:', err);
  }
}

seedDatabase();
