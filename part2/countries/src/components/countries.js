import Country from "./country"
import {useEffect} from 'react'
const Countries = ({searchTerm,countries,showCountries,setShowCountries})=>{
    useEffect(()=>{
    setShowCountries(countries.filter((country)=>{
        return country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    }))
},[searchTerm,countries,setShowCountries])
    if(showCountries.length>10)
    {
        return(
            <div>
            Too many matches, specify another filter
            </div>
        )
    }
    else if (showCountries.length>1 && showCountries.length <= 10)
    {
        return(
            <>
            {showCountries.map((country)=>{
                return(
                    
                    <div key={country.ccn3}>
                    <span> {country.name.common }</span> 
                    <button onClick={()=>setShowCountries([country])}>show</button>
                    </div>
                )
            })}
            </>
        )
    }
    else if (showCountries.length===1){
        const country = showCountries[0]
        return(
        <Country country={country}/>
        )
    }
}
export default Countries