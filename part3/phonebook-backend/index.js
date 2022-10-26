require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const app = express();
const cors = require('cors');
const Person = require('./models/person');
const { default: mongoose } = require('mongoose');
app.use(cors());
app.use(express.json())
app.use(express.static('build'))
morgan.token('body',(req,res)=>{
    return JSON.stringify(req.body)
})
app.use(morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms',
      tokens['body'](req,res),''
    ].join(' ')
  }))
// const persons=[
//     { 
//       "id": 1,
//       "name": "Arto Hellas", 
//       "number": "040-123456"
//     },
//     { 
//       "id": 2,
//       "name": "Ada Lovelace", 
//       "number": "39-44-5323523"
//     },
//     { 
//       "id": 3,
//       "name": "Dan Abramov", 
//       "number": "12-43-234345"
//     },
//     { 
//       "id": 4,
//       "name": "Mary Poppendieck", 
//       "number": "39-23-6423122"
//     }
// ];

const errorHandler=(error,request,response,next)=>{
    console.error(error);
    if(error.name==='CastError'){
        return response.status(400).send({ error: 'malformatted id' })
    }
    next(error)
}
app.get('/api/persons',(request,response)=>{
    Person.find({}).then((people)=>{
        response.json(people)
    })
});
app.get('/api/info',(request,response)=>{
    Person.find({})
    .then(people=>{
        response.send(`Phonbook has info for ${people.length} people <br>${new Date()} `)
    })
    
});
app.get('/api/persons/:id',(request,response,next)=>{
    const id = request.params.id
    Person.findById(id)
    .then((person)=>{
        if (person){
            response.json(person);
        }
        else{
            response.status(404).end()
        }
    })
    .catch((error)=>{
        next(error);
    });
});
app.post('/api/persons',(request,response)=>{
    const body = request.body;
    if(!body.name){
        return response.status(204).json({
            error:"name must exist"
        })
    }
    if(!body.number){
        return response.status(204).json({
            error:"number must exist"
        })
    }
    const newPerson = new Person({
        name: body.name,
        number: body.number
    });
    newPerson.save().then(()=>{
        response.json(newPerson);
    })
});
app.put('/api/persons/:id',(request,response)=>{
    const body = request.body;
    Person.findOneAndUpdate({name:body.name}, {number:body.number},()=>{
        console.log("ok");
        response.status(204);
    })
})
app.delete('api/notes/:id',(request,response)=>{
    Person.findByIdAndRemove(request.params.id)
    .then(result=>{
        response.status(204).end();
    })
    .catch(error=>{
        next(error);
    })
})
const PORT = process.env.PORT || 3001;
app.listen(PORT,()=>{
    console.log(`running on ${3001}`);
});
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
app.use(unknownEndpoint)
app.use(errorHandler)