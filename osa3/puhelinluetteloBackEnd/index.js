require('dotenv').config()
const express = require('express')
const app = express()
var morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')


let persons = [
]

morgan.token('body', (req) => {
  return JSON.stringify(req.body)
})

app.use(express.json())
app.use(cors())
app.use(morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    tokens.body(req)
  ].join(' ')
}))
app.use(express.static('dist'))


  app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
    response.json(persons)
    })
  })

  app.get('/info', (request, response) => {
    response.send(`<p>Phonebook has info for ${persons.length} people</p> <p>${Date()}</p>`)
  })


  app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person =>{
      response.json(person)
    })
  })


  app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()

  })

  const generateId = (max) => {
    return Math.floor(Math.random() * max).toString()
  }
  
  app.post('/api/persons', (request, response) => {
    const body = request.body
  
    if (!body.name || !body.number) {
      return response.status(400).json({ 
        error: 'name or number missing' 
      })
    }
  
    

    const person = new Person({
      name: body.name,
      number: body.number,
    })

    if (!persons.find(person => person.name === body.name) === false) {
      return response.status(400).json({ 
        error: 'name must be unique' 
      })
    }

    person.save().then(savedPerson => {
      response.json(savedPerson)

    })
  })

  const PORT = process.env.PORT
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })