const express = require('express')
const app = express()
var morgan = require('morgan')
const cors = require('cors')


let persons = [
    { 
      name: "Arto Hellas", 
      number: "040-123456",
      id: "1"
    },
    { 
      name: "Ada Lovelace", 
      number: "39-44-5323523",
      id: "2"
    },
    { 
      name: "Dan Abramov", 
      number: "12-43-234345",
      id: "3"
    },
    { 
      name: "Mary Poppendieck", 
      number: "39-23-6423122",
      id: "4"
    }
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
    response.json(persons)
  })

  app.get('/info', (request, response) => {
    response.send(`<p>Phonebook has info for ${persons.length} people</p> <p>${Date()}</p>`)
  })


  app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)
    
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })


  app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()

  })

  const generateId = (max) => {
    return Math.floor(Math.random() * max)
  }
  
  app.post('/api/persons', (request, response) => {
    const body = request.body
  
    if (!body.name || !body.number) {
      return response.status(400).json({ 
        error: 'name or number missing' 
      })
    }
  
    

    const person = {
      name: body.name,
      number: body.number,
      id: generateId(100000000),
    }

    if (!persons.find(person => person.name === body.name) === false) {
      return response.status(400).json({ 
        error: 'name must be unique' 
      })
    }

      
    persons = persons.concat(person)
  
    response.json(person)
  })

  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })