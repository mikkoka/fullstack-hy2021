import { useEffect, useState } from 'react'
import axios from 'axios'
const api_key = process.env.REACT_APP_API_KEY

function App() {
  const [ countries, setCountries ] = useState([])
  const [ shownCountries, setShownCountries ] = useState([])
  const [ filterString, setFilterString ] = useState('')
  const [ shownCountry, setShownCountry ] = useState(null)

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(resp => {
        setCountries(resp.data)
      })

  }, [])


  const onFilterStringChange = e => {
    const newFilterString = e.target.value
    setFilterString(newFilterString)

    const newShownCountries = countries.filter(c => 
          c.name.toLowerCase()
          .includes(newFilterString) )

    if (newShownCountries.length === 1) 
      setShownCountry(newShownCountries[0]) 
    
    else {
      setShownCountry(null)
      setShownCountries(newShownCountries)
    }

  }


  return (
    <div>

      find countries 
      <input 
        value={filterString} 
        onChange={onFilterStringChange}>
      </input>
      
      {shownCountry 
        ? <Country shownCountry={shownCountry}></Country> 
        : <Countries 
            shownCountries={shownCountries} 
            setShownCountry={setShownCountry}>
          </Countries>}
    </div>
  )


}

const Countries = ({shownCountries, setShownCountry}) => {

  if (shownCountries.length < 11)
  return (
    <div>
      {shownCountries.map((c, i) => 
        <p key={c.name}>{c.name} 
          <button onClick={() => setShownCountry(shownCountries[i])}>show</button>
        </p>)}
    </div>
  )

  return (
    <p>Too many matches, specify another filter</p>
  ) 

}

const Country = ({shownCountry}) => {
  const [ temp, setTemp ] = useState(0)
  const [ wind, setWind ] = useState('')
  const [ weatherImageUrl, setWeatherImageUrl ] = useState('')

  useEffect(() => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${shownCountry.name}`)
      .then(resp => {
        setTemp(resp.data.current.temperature)
        setWind(`${resp.data.current.wind_speed} mph direction ${resp.data.current.wind_dir}`)
        setWeatherImageUrl(resp.data.current.weather_icons[0])
      })

  }, [ shownCountry ])
  return (
    <>
      <h2>{shownCountry.name}</h2>

      <p>capital {shownCountry.capital}<br/>
      population {shownCountry.population}</p>

      <h2>languages</h2>

      <ul>
        {shownCountry.languages.map(l => 
          <li key={l.name}>{l.name}</li>)}
      </ul>

      <img src={shownCountry.flag} 
        width="200" height="125" 
        alt="flag">  
      </img>

      <h2>weather in {shownCountry.capital}</h2>
      <p>temperature: {temp}<br/>
      <img 
        src={weatherImageUrl} 
        width="100" height="100" 
        alt="weather">
      </img><br/>
      wind: {wind}</p>
    </>
  )
}

export default App
