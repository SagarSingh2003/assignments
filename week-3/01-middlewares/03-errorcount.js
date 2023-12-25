const request = require('supertest');
const assert = require('assert');
const express = require('express');



const app = express();

let getRequestCount = 0;
let postRequestCount = 0;
let getErrorCountCounter = 0;
let errorCount = 0;




// You have been given an express server which has a few endpoints.
// Your task is to
// 1. Ensure that if there is ever an exception, the end user sees a status code of 404
// 2. Maintain the errorCount variable whose value should go up every time there is an exception in any endpoint

app.get('/user', function(req, res , next) {

    getRequestCount += 1;
    if(getRequestCount === 1){
      errorCount = 0;
    }
    console.log('errorCount', errorCount);
    console.log('getRequestCount', getRequestCount);
    throw new Error("User not found");

});


app.post('/user', function(req, res) {

  
  postRequestCount += 1;
  if(postRequestCount === 1){
    errorCount = 0;
  }
  
  console.log(errorCount);
  console.log(postRequestCount);
  res.status(200).json({ msg: 'created dummy user' });
});

app.get('/errorCount', function(req, res) {
  
  
  getErrorCountCounter += 1;
  if(getErrorCountCounter === 1){
    errorCount = 0;
  }
  console.log(errorCount);
  console.log(getErrorCountCounter);
  throw new Error('Some error occured');
  // res.json({
  //   "errCount" : errorCount
  // })

});


app.use(function(err , req , res , next ){
  
  if(err){
    console.log('this is err' , err);
    res.status(404).json({
      "errorCount" : errorCount
    })
    errorCount += 1;
  }

})


module.exports = app;