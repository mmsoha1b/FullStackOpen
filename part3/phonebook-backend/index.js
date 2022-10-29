require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const app = express();
const cors = require('cors');
const Person = require('./models/person');
const mongoose = require('mongoose');
app.use(cors());
app.use(express.json());
app.use(express.static('build'));
morgan.token('body',(req, res) => {
  return JSON.stringify(req.body);
});
app.use(morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    tokens['body'](req,res),''
  ].join(' ');
}));


app.get('/api/persons',(request,response) => {
  Person.find({}).then( people => {
    response.json(people);
  });
});
app.get('/api/info',(request,response) => {
  Person.find({})
    .then(people => {
      response.send(`Phonbook has info for ${people.length} people <br>${new Date()} `);
    });
});
app.get('/api/persons/:id',(request,response,next) => {
  const id = request.params.id;
  Person.findById(id)
    .then(person => {
      if (person){
        response.json(person);
      }
      else{
        response.status(404).end();
      }
    })
    .catch((error) => {
      next(error);
    });
});
app.post('/api/persons',(request,response,next) => {
  const body = request.body;
  if(!body.name){
    return response.status(204).json({
      error:'name must exist'
    });
  }
  if(!body.number){
    return response.status(204).json({
      error:'number must exist'
    });
  }
  Person.find({ name:body.name })
    .then((person) => {
      if(person.length!==0)
      {
        return response.status(400).send({ error:'Name already present' });
      }
      else{
        const newPerson = new Person({
          name: body.name,
          number: body.number
        });
        newPerson.save().then((newPerson) => {
          response.json(newPerson);
        }).catch((error) => {
          next(error);
        });
      }});
});
app.put('/api/persons/:id',(request,response,next) => {
  const body = request.body;
  const id = mongoose.Types.ObjectId(request.params.id);
  Person.find({ _id:id }).then( ([person]) => {
    console.log(person);
    person.number = body.number;
    person.save();
    response.status(204).end();
  })
    .catch((error) => {
      next(error);
    });
});
app.delete('/api/persons/:id',(request,response,next) => {
  Person.findByIdAndRemove(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch(error => {
      next(error);
    });
});
const PORT = process.env.PORT || 3001;
app.listen(PORT,() => {
  console.log(`running on ${3001}`);
});
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};
app.use(unknownEndpoint);
const errorHandler=(error,request,response,next) => {
  console.error(error);
  if(error.name==='CastError'){
    return response.status(400).send({ error: 'malformatted id' });
  }
  else if(error.name==='ValidationError'){
    return response.status(400).json({ error:error.message });
  }
  next(error);
};
app.use(errorHandler);