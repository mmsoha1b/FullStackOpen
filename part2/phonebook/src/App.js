import { useEffect, useState } from 'react'
import Persons from './components/Persons'
import AddPerson from './components/AddPerson';
import Search from './components/Search';
import Notification from './components/Notification';
import personService from './services/persons';

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
  const [notification,setNotification]=useState(null)
  const [err,setErr]=useState(false) 
  

  const showPeople = persons.filter((person)=>person.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div>
      <Notification message={notification} err={err}/>
      <h2>Phonebook</h2>
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
      <h2>add a new</h2>
      <AddPerson
        setNewName={setNewName} newName={newName} newNumber={newNumber} setNewNumber={setNewNumber}
        persons={persons} setPersons={setPersons} personService={personService} notification={notification}
        setNotification={setNotification} err={err} setErr={setErr}/>
      
      <h2>Numbers</h2>
      <div>
        <Persons people={showPeople} personService={personService} setPersons={setPersons} persons={persons}/>
      </div>
    </div>
  )
}

export default App