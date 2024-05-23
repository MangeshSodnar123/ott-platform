require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = require('./app');

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

app.use(bodyParser.json());


mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(()=>{
  console.log("Mongodb database connected...");
  app.listen(PORT, () => {
    console.log('Server is running on port:',PORT);
  });
});


module.exports = app;








