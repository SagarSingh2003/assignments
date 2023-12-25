const request = require('supertest');
const assert = require('assert');
const express = require('express');
const app = express();
// You have been given an express server which has a few endpoints.
// Your task is to create a global middleware (app.use) which will
// rate limit the requests from a user to only 5 request per second
// If a user sends more than 5 requests in a single second, the server
// should block them with a 404.
// User will be sending in their user id in the header as 'user-id'
// You have been given a numberOfRequestsForUser object to start off with which
// clears every one second

let numberOfRequestsForUser = {};
let requestCount = 0;

setInterval(() => {
    numberOfRequestsForUser = {};
    requestCount = 0;
    // console.log(numberOfRequestsForUser);
    // console.log('cleared');
}, 1000)

app.get('/user', function(req, res , next) {

  checkForRequests(req ,res , next);

});

app.post('/user', function(req, res) {
  checkForRequests();
  res.status(200).json({ msg: 'created dummy user' });
});


function checkForRequests(req , res , next){
  const user = req.headers.userid;
  requestCount = requestCount + 1;
  numberOfRequestsForUser[user] = requestCount;
  // console.log(numberOfRequestsForUser);
  if(numberOfRequestsForUser[user] > 5){
    res.status(404);
    res.json({"msg" : "you have exceeded the rate limit"});
  }else{
    res.status(200).json({ name: 'john' });
  }
}


module.exports = app;