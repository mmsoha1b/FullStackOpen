import { useState } from 'react'
import Persons from './Persons'
import AddPerson from './AddPerson';
import Search from './Search';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number:'000-111022',
      id:1,
    }
  ]) 
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
        persons={persons} setPersons={setPersons}/>
      
      <h2>Numbers</h2>
      <div>
        <Persons people={showPeople}/>
      </div>
    </div>
  )
}

export default App