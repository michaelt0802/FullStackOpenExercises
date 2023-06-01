import {useState, useEffect} from 'react'
import axios from 'axios'
import './App.css';

const FindCountries = ({newCountry, onSearch}) => {
  return (
    <div>
      find countries <input value={newCountry} onChange={onSearch} />
    </div>
  )
}

const CountryInformation = ({newCountry, countryData, filteredCountryNames, handleShowCountry, weatherData}) => {
  if (countryData === null) {
    return (
      <div>
        Data loading...
      </div>
    )
  }
  if (newCountry === '') {
    return null;
  }

  const arbitraryLimit = 10;

  if (filteredCountryNames.length > arbitraryLimit) {
    return (
      <div>
        Too many matches, be more specific
      </div>
    )
  } else if (filteredCountryNames.length <= arbitraryLimit && filteredCountryNames.length > 1) {
    return (
      <p style={{ whiteSpace: 'pre-line' }}>
        {filteredCountryNames.map((item, index) => (
          <span key={index}>{item}<button onClick={handleShowCountry} value={item}>show</button><br /></span>
        ))}
      </p>
    )
  } else if (filteredCountryNames.length === 1) {
    const foundCountry = countryData.filter((item) => item.name.common === filteredCountryNames[0])[0];

    console.log('foundCountry', foundCountry)
    return (
      <div>
        <h1>{foundCountry.name.common}</h1>
        <p>Capital: {foundCountry.capital[0]}</p>
        <p>Area: {foundCountry.area}</p>
        <figure>
          <figcaption>Languages Spoken</figcaption>
          <ul>
            {Object.entries(foundCountry.languages).map(([key, value]) =>
            <li key={key}>{value}</li>)}
        </ul>
        </figure>
        <img src={foundCountry.flags.png} alt={foundCountry.flags.alt}/>

      </div>
    )
  }

  return (
    <div>
      Country not found
    </div>
  )
}

function extractCountryNames(countryData) {
  return countryData.map((item) => item.name.common)
}

function App() {
  const [newCountry, setNewCountry] = useState('')
  const [countryData, setCountryData] = useState(null)
  const [countryNames, setCountryNames] = useState([])
  const [filteredCountryNames, setFilteredCountryNames] = useState([])
  const [weatherData, setWeatherData] = useState(null)

  const api_key = process.env.REACT_APP_API_KEY

  useEffect(() => {
    console.log('updating country data', newCountry);

    if (countryData !== null) {
      setCountryNames(extractCountryNames(countryData));
      console.log('countryNames', countryNames)
    }
  }, [countryData]);

  useEffect(() => {
    console.log('updating filter array', newCountry);

    if (countryData !== null) {
      setFilteredCountryNames(countryNames.filter((item) => item.toLowerCase().includes(newCountry.toLowerCase())))
    }

    if (filteredCountryNames.length === 1) {
      console.log('fetching weather data')
      const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${filteredCountryNames[0]}&appid=${api_key}`
      const fetchData = async () => {
        try {
          const response = await axios.get(weatherURL);
          console.log('response', response)
          setWeatherData(response.data);
        } catch (error) {
          console.log('Error fetching weather data', error)
        }
      };

      fetchData()
    }

    console.log('filteredCountryNames', filteredCountryNames)
  }, [newCountry]);

  useEffect(() => {
    console.log('fetching country data', newCountry)

    const url = 'https://studies.cs.helsinki.fi/restcountries/api/all'

    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setCountryData(response.data);
      } catch (error) {
        console.log('Error fetching country data', error)
      }
    };

    fetchData();

    console.log('countryData', countryData)
  }, [])

  const handleShowCountry = (event) => {
    event.preventDefault();
    console.log('event', event.target.value)
    setFilteredCountryNames(countryNames.filter((item) => item.toLowerCase().includes(event.target.value.toLowerCase())))
    setNewCountry(event.target.value)
  }

  const onSearch = (event) => {
    setNewCountry(event.target.value)
  }

  return (
    <div>
    <FindCountries newCountry={newCountry} onSearch={onSearch}/>

    <CountryInformation newCountry={newCountry} countryData={countryData}
      countryNames={countryNames} filteredCountryNames={filteredCountryNames}
      handleShowCountry={handleShowCountry} weatherData={weatherData}/>
    </div>
  );
}

export default App;
