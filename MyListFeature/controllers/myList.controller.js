const { ObjectId } = require('mongodb');
const User = require('../models/user.model');


exports.addToMyList = async (req, res) => {
  const { userId, contentId } = req.body;
  

  try {
    console.log("userId: ",userId);
    const user = await User.findById(userId);
    if (!user) return res.status(404).send('User not found');

    if (!user.myList.includes(contentId)) {
      user.myList.push(contentId);
      await user.save();
    }
    
    res.status(200).send('Content added to My List');
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.removeFromMyList = async (req, res) => {
  const { userId } = req.body;
  const { contentId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).send('User not found');

    user.myList = user.myList.filter(id => id !== contentId);
    await user.save();
    
    res.status(200).send('Content removed from My List');
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.listMyItems = async (req, res) => {
  const { userId, page, limit } = req.body;

  try {
    // console.log("userId: ",userId);

    const user = await User.findById(new ObjectId(userId));

    if (!user) return res.status(404).send('User not found');

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    
    const paginatedList = user.myList.slice(startIndex, endIndex);
    
    res.status(200).json(paginatedList);

    // console.log("user: ",user);
    // res.status(200).json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
};







//////////////////////////////Cache needs more dubugging////////////////////////////////////////////////////

// const { ObjectId } = require('mongodb');
// const User = require('../models/user.model');
// const redisClient = require('../utils/cache');

// exports.addToMyList = async (req, res) => {
//   const { userId, contentId } = req.body;

//   try {
//     const user = await User.findById(userId);
//     if (!user) return res.status(404).send('User not found');

//     if (!user.myList.includes(contentId)) {
//       user.myList.push(contentId);
//       await user.save();

//       // Update the cache
//       await redisClient.del(`myList:${userId}`);
//       console.log(`Cache for myList:${userId} cleared`);
//     }

//     res.status(200).send('Content added to My List');
//   } catch (error) {
//     console.error('Error in addToMyList:', error);
//     res.status(500).send(error.message);
//   }
// };

// exports.removeFromMyList = async (req, res) => {
//   const { userId } = req.body;
//   const { contentId } = req.params;

//   try {
//     const user = await User.findById(userId);
//     if (!user) return res.status(404).send('User not found');

//     user.myList = user.myList.filter(id => id !== contentId);
//     await user.save();

//     // Update the cache
//     await redisClient.del(`myList:${userId}`);
//     console.log(`Cache for myList:${userId} cleared`);

//     res.status(200).send('Content removed from My List');
//   } catch (error) {
//     console.error('Error in removeFromMyList:', error);
//     res.status(500).send(error.message);
//   }
// };

// exports.listMyItems = async (req, res) => {
//   const { userId, page, limit } = req.body;

//   try {
//     const cacheKey = `myList:${userId}:${page}:${limit}`;
//     console.log(`Checking cache for key: ${cacheKey}`);

//     // Check if data is in cache
//     const cachedData = await redisClient.get(cacheKey);
//     if (cachedData) {
//       console.log('Cache hit');
//       // Return cached data
//       return res.status(200).json(JSON.parse(cachedData));
//     } else {
//       console.log('Cache miss');
//       // Fetch data from database
//       const user = await User.findById(new ObjectId(userId));
//       if (!user) return res.status(404).send('User not found');

//       const startIndex = (page - 1) * limit;
//       const endIndex = page * limit;

//       const paginatedList = user.myList.slice(startIndex, endIndex);
//       console.log('Fetched data from DB:', paginatedList);

//       // Cache the data
//       await redisClient.setEx(cacheKey, 3600, JSON.stringify(paginatedList)); // Cache for 1 hour
//       console.log(`Data cached for key: ${cacheKey}`);

//       res.status(200).json(paginatedList);
//     }
//   } catch (error) {
//     console.error('Error in listMyItems:', error);
//     res.status(500).send(error.message);
//   }
// };






//////////////////////////////////////////////////////////////////////////////////////

