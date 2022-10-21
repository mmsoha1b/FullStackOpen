import axios from 'axios'
const baseUrl = '/api/persons'
const create = newPerson=>{
    const request = axios.post(baseUrl,newPerson)
    return request.then(response => response.data)
}
const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response =>response.data)
}
const destroy=(person)=>{
    axios.delete(`${baseUrl}/${person.id}`)
}
const replaceNumber=(person,newPerson)=>{
    const request = axios.put(`${baseUrl}/${person.id}`,newPerson)
    return request
}
const personService = {create, getAll, destroy,replaceNumber}
export default personService