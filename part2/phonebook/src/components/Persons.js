const Person = ({person,destroy})=>{
  return(
    <div>
    <span>{person.name} {person.number}</span>
    <button onClick={destroy}>delete</button>
    </div>
  )
}
const Persons =({people,noteService,setPersons,persons})=>{
  return(
    people.map((person)=>{
    return(
      <Person key={person.id} person={person} destroy={()=>{
        if(window.confirm(`Delete ${person.name} ?`)){
        noteService.destroy(person)
        const newPersons=persons.filter(obj=>obj.id!==person.id)
        setPersons(newPersons)
      }}}/>
    )
  })
  )
}
export default Persons