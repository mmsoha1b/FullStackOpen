const AddPerson=({setNewName,setNewNumber,newName,newNumber,persons,setPersons})=>{
    const handleNameChange=(event)=>{
        setNewName(event.target.value)
      }
      const handleNumberChange=(event)=>{
        setNewNumber(event.target.value)
      }
    const checkIfAlreadyPresent=()=>{
        const names = persons.map(person=>person.name)
        if (names.includes(newName)){
            alert(`${newName} is already present`)
            return false
        }
        return true
    }
        const addNewName=(event)=>{
        event.preventDefault();
        if (!checkIfAlreadyPresent()){
            return
        }
        const newPerson={
            name: newName,
            number: newNumber,
            id: persons.length+1
        }
        setPersons(persons.concat(newPerson));
        setNewName('')
        setNewNumber('')
    }
    return(
    <form onSubmit={addNewName}>
        <div>
          name: <input 
                 value={newName} 
                 onChange={handleNameChange}/>
              <div>
          number:  <input 
                    value={newNumber}
                    onChange={handleNumberChange}/>
      </div>
      <div>
          <button type="submit">add</button>
      </div> 
        </div>
      </form>
    )
}
export default AddPerson