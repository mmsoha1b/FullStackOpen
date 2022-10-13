const Persons =({people})=>{
  return(
    people.map((person)=>{
    return(
        <p key={person.id}>{person.name} {person.number}</p>
    )
  })
  )
}
export default Persons