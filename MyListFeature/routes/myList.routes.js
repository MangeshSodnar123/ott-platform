const express = require('express');
const router = express.Router();
const myListController = require('../controllers/myList.controller');

router.post('/add', myListController.addToMyList);
router.delete('/remove/:contentId', myListController.removeFromMyList);


// const test = (req, res, next)=>{
//     console.log("inside myList.routes.js file");
//     next();
// }
router.get('/list', myListController.listMyItems);

module.exports = router;
