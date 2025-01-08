import { useState, useEffect } from 'react'
import personService from './persons'



const Numbers = ({persons, deletePerson}) => {
return (
  <div>
    {persons.map(person => 
    <Names key={person.name} person={person} deletePerson={() => deletePerson(person.id)}/>
    )}
  </div>
  )}

const Names = ({person, deletePerson}) => {
  return (
    <div>
      <p>
        {person.name} {person.number} <button onClick={deletePerson}>delete</button>

      </p>
    </div>
    )
  }


const Filter = ({lookFor, handleLookForChange}) => (
    <div>
    filter shown with: <input value={lookFor} onChange={handleLookForChange}/>
   </div>
  )


const PersonForm = (props) => {
  return (
    <form onSubmit={props.onsubmit}>
      <div> {props.name}: <input value={props.value} onChange={props.onchange}/></div>
      <div> {props.number}: <input value={props.value2} onChange={props.onchange2}/></div>
      <div> <button type="submit">add</button> </div>
  </form>
  )
}


const Notification = ({message, color}) => {
  if (message === null) {
    return null
  }

  return (
    <div className={color}>
      {message}
    </div>
  )
}



const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [lookFor, setLookFor] = useState('')
  const [message, setMessage] = useState(null)
  const [color, setColor] = useState("added")



  const hook = () => {
    personService
    .getAll()
    .then(returnedPerson => setPersons(returnedPerson))
      }

  useEffect(hook, [])

  const addName = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    if (persons.map(person => person.name).indexOf(personObject.name) > -1) {
      const findPerson = persons.find(person => person.name == personObject.name)
      if (window.confirm(`${personObject.name} is already added to phonebook, replace the old number with a new one?`)) { 
        personService
        .update(findPerson.id, personObject).then(returnedPerson => {
          setPersons(persons.map(person => person.id !== findPerson.id ? person : returnedPerson))
          setMessage(`Changed number of ${returnedPerson.name}`)
          setTimeout(() => {setMessage(null)}, 1000)
        })
      }
      setNewName("")
      setNewNumber("")
    }
    else {
      personService
      .create(personObject)
      .then(returnedPerson => {      
        setPersons(persons.concat(returnedPerson))
        setNewName("")
        setNewNumber("")
        setMessage(`Added ${returnedPerson.name}`)
        setTimeout(() => {setMessage(null), setColor("added")}, 1000)
      })
      .catch(error => {
        setMessage(`${error.response.data.error}`)
        setColor("error")
        setTimeout(() => {setMessage(null), setColor("added")}, 1000)
        console.log(error.response.data)
      })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleLookForChange = (event) => {
    setLookFor(event.target.value)
  }

  const deletePerson = (id) => {
    const personDeleted = persons.find(person => person.id == id)
    console.log(personDeleted)
    if (window.confirm(`Delete ${personDeleted.name} ?`)) {

    personService
    .deleted(id)
    .then(() => {setPersons(persons.filter((person) => person.id !== id))
    setMessage(`Deleted ${personDeleted.name}`)
    setTimeout(() => {setMessage(null), setColor("added")}, 1000)
    })
    .catch(() => {
    setMessage(`Ei onnistu ${personDeleted.name}`)
    setColor("error")
    setTimeout(() => {setMessage(null), setColor("added")}, 1000)
    })

    
  
  
    }
  }


  const namesToShow = persons.filter(person => person.name.toLowerCase().includes(lookFor.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} color={color}/>
      <Filter lookFor={lookFor} handleLookForChange={handleLookForChange}/>
      <h2>add a new</h2>
      <PersonForm name="name" value={newName} onchange={handleNameChange}
      number="number" value2={newNumber} onchange2={handleNumberChange} onsubmit={addName}/>
      <h2>Numbers</h2>
      <Numbers persons={namesToShow} deletePerson={deletePerson}/>
    </div>
  )

}

export default App