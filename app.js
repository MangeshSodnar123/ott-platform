const express = require('express');
require('dotenv').config(); 
const httpStatus = require('http-status');
const cors = require('cors');
// const { json } = require('body-parser');
const myListRoutes = require('./MyListFeature/routes/myList.routes');
const app = express();

//supportive middlewares 
app.use(cors());
app.use(express.json())

app.use('/mylist', myListRoutes);

app.use((req, res)=>{
    res.status(httpStatus.OK).json({"message":"No such route found."});
})


module.exports = app;

