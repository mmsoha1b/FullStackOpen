
const express = require('express');
const morgan = require('morgan');
const app = express();
app.use(express.json())
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
const persons=[
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
];

const PORT = 3001;

app.get('/api/persons',(request,response)=>{
    response.json(persons);
});
app.get('/api/info',(request,response)=>{
    response.send(`Phonbook has info for ${persons.length} people <br>${new Date()} `)
});
app.get('/api/persons/:id',(request,response)=>{
    const id = Number(request.params.id)
    const person = persons.find((person)=>person.id===id)
    if(!person){
        return response.status(404).end()
    }
    response.json(person);
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
    if(persons.find(person=>person.name===body.name)){
        return response.status(204).json({
            error:"name must be unique"
        })
    }
    const newPerson ={
        id:Math.floor(Math.random()*10000),
        name:body.name,
        number:body.number,
    }
    persons.push(newPerson);
    return response.json(newPerson);
});

app.listen(PORT,()=>{
    console.log(`running on ${3001}`);
});
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
app.use(unknownEndpoint)