## API Endpoints

deployment url: https://ott-platform-v3ek.onrender.com

1) List My Items - retrieve all items in the user's list

https://ott-platform-v3ek.onrender.com/mylist/list

request body={
    "userId": "664eb5900f8fdb4b8d8b3f1d",
    "page": 1, 
    "limit": 4
}


2)Add to My List - add a movie or TV show to the user's list

https://ott-platform-v3ek.onrender.com/mylist/add

request body={
    "userId": "664eb5900f8fdb4b8d8b3f1d",
    "contentId": "664eb5900f8fdb4b8d8b3f2a",
}


3)Remove from My List - remove an item from the user's list using the item's unique ID.

https://ott-platform-v3ek.onrender.com/mylist/remove/<contentId>

request body={
    "userId": "664eb5900f8fdb4b8d8b3f1d",
    "contentId": "664eb5900f8fdb4b8d8b3f2a",
}

 
===============================================================================================
## Setup

### Prerequisites

Ensure you have the following installed on your machine:

- Node.js (>= 12.x)
- npm (>= 6.x)
- MongoDB Atlas account or local MongoDB instance

### Installation

1. Clone the repository:

    >>>git clone https://github.com/MangeshSodnar123/ott-platform.git
    >>>cd ott-platform


2. Install the dependencies:
    >>>npm install

3. Seed the database
    >>>npm dbseed


### Configuration

1. Create a `.env` file in the root directory and add the following environment variables:

    MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/ott-platform?retryWrites=true&w=majority
    PORT=3000
 

### Running the Application

1. Start the application:
    >>>npm start


2. For development mode with live reloading:
    >>>npm run dev


### Running Tests

1. To run the tests:
    >>>npm test


## Design Choices

### Performance Optimization

- **Database Indexing**: Added indexes to the MongoDB collections to optimize query performance.
- **Asynchronous Operations**: Used asynchronous operations to handle requests without blocking the event loop.

### Scalability

- **Modular Architecture**: Organized the code into modules to enhance maintainability and scalability. Each feature is encapsulated in its own module.
- **Horizontal Scaling**: The application is designed to run in a containerized environment (Docker) for easy horizontal scaling.
- **Stateless Design**: Ensured the application remains stateless by storing session data in Redis, allowing multiple instances to handle requests independently.

## Assumptions

- The users of the platform will have a stable internet connection.
- MongoDB Atlas is used as the primary database, and the connection string is correctly configured in the `.env` file.
- Redis is used for caching and is properly configured and running.
- The application will run in an environment that supports Node.js.

