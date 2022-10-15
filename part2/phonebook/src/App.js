import { useEffect, useState } from 'react'
import Persons from './components/Persons'
import AddPerson from './components/AddPerson';
import Search from './components/Search';
import personService from './services/persons'  
import noteService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]) 
  const fetchData = ()=>{
    personService.getAll()
                  .then(data=>{
                  setPersons(data)
                  })
                }
  useEffect(fetchData,[])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber]= useState('')
  const [searchTerm, setSearchTerm]=useState('')  
  

  const showPeople = persons.filter((person)=>person.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
      <h2>add a new</h2>
      <AddPerson
        setNewName={setNewName} newName={newName} newNumber={newNumber} setNewNumber={setNewNumber}
        persons={persons} setPersons={setPersons} noteService={noteService}/>
      
      <h2>Numbers</h2>
      <div>
        <Persons people={showPeople} noteService={noteService} setPersons={setPersons} persons={persons}/>
      </div>
    </div>
  )
}

export default App