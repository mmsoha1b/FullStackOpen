
const AddPerson=({setNewName,setNewNumber,newName,newNumber,persons,setPersons,noteService})=>{
    const handleNameChange=(event)=>{
        setNewName(event.target.value)
      }
      const handleNumberChange=(event)=>{
        setNewNumber(event.target.value)
      }
    const checkIfAlreadyPresent=()=>{
        const names = persons.map(person=>person.name)
        if (names.includes(newName)){
            return false
        }
        return true
    }
    const addNewName=(event)=>{
        event.preventDefault();
        if (!checkIfAlreadyPresent()){
            if(window.confirm(`${newName} is already present, replace the old number?`)){
                const oldPerson = persons.find(person=>person.name===newName)
                const newPerson = {...oldPerson,number:newNumber}
                noteService.replaceNumber(oldPerson ,newPerson).then((response)=>{
                    console.log(response.data)
                    setPersons(persons.map((obj)=>obj.id!==oldPerson.id?obj:newPerson))
                })               
            }
        }
        else{
            const newPerson={
                name: newName,
                number: newNumber,
            }
            noteService.create(newPerson)
                .then(newPerson=>{
                    setPersons(persons.concat(newPerson));
                    setNewName('')
                    setNewNumber('')
                })
                .catch(error=>{
                    console.log(error)
                })}}
    return(
    <form onSubmit = {addNewName}>
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