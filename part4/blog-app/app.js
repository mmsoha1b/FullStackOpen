const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const config=require('./utils/config');
const blogsRouter=require('./controllers/blogs');
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login');
const middlewhere = require('./utils/middlewhere');
mongoose.connect(config.mongoUrl);


const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 
  
  next(error)
}
if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/tests'); 
  app.use('/api/testing',testingRouter);
}

app.use(cors());
app.use(express.json());
app.use('/api/blogs',/*middlewhere.tokenExtractor,middlewhere.userExtractor,*/blogsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use(errorHandler);
module.exports=app;