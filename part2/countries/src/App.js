import {useState,useEffect} from 'react'
import Search from './components/search'
import axios from 'axios'
import Countries from './components/countries'
function App() {
  const [countries,setCountries] = useState([])
  const [searchTerm,setSearchTerm] = useState('')
  const [showCountries,setShowCountries] = useState([])
  useEffect(()=>{
    axios.get('https://restcountries.com/v3.1/all')
    .then((result)=>{
      setCountries(result.data)
    })
    .catch((error)=>{
      axios.isAxiosError(error)
    })
  },[])

  return (
    <>
    <Search searchTerm = {searchTerm} setSearchTerm={setSearchTerm}/>
    <Countries countries={countries} searchTerm={searchTerm} showCountries={showCountries} setShowCountries={setShowCountries}/>
    </>
  )
}

export default App;
