/* eslint-disable no-unused-vars */
const express = require('express');
const {logger} = require('./middleware/middleware')
const logger2 = require('morgan')
const usersRouter = require('./users/users-router');

const server = express();

// remember express by default cannot parse JSON in request bodies
server.use(express.json());

server.use(logger);

server.use(logger2('dev'));

server.use('/api/users', usersRouter);
// global middlewares and the user's router need to be connected here

server.use((error,req,res,next) => {
  res.status(error.status || 500).json({
    message: "An error has happened bro",
    err: error.message
  });
});

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
