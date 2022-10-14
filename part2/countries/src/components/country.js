import axios from 'axios'
import {useState} from 'react'
const Country=({country})=>{
    const api_key = process.env.REACT_APP_API_KEY
    const [lat,lon]=[...country.latlng]
    const [temp,setTemp] = useState('')
    const [wind,setWind] = useState('')
    const [code,setCode] = useState('')
    axios
        .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`)
        .then((response)=>{
            // console.log(response.data)
            setTemp((response.data.main.temp-275.15).toFixed(2))
            setWind(response.data.wind.speed)
            setCode(response.data.weather[0].icon)
        })
        .catch((error)=>{
            console.log(error)
        })
    return(
        <div>
            <h2>
                {country.name.common}
            </h2>
            <p>capital {country.capital[0]}</p>
            <p>area {country.area}</p>
            <h3>languages</h3>
            <ul>
                {
                    Object.values(country.languages).map((language,index)=>{
                        return(
                            <li key={index}>{language}</li>
                        )
                    })
                }
            </ul>
            <div style={{fontSize:200}}>
                {country.flag}
            </div>
            <div>
            <h3>Weather in {country.capital[0]}</h3>
            temperature {temp} Celicius
            </div>
            <div>
                <img src={`http://openweathermap.org/img/wn/${code}@2x.png`} alt='weather icon'></img>
            </div>
            <div>
                wind {wind} m/s
            </div>
        </div>
    )
}
export default Country