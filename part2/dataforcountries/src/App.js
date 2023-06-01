import {useState, useEffect} from 'react'
import axios from 'axios'
import './App.css';

const FindCountries = ({newCountry, handleCountry}) => {
  return (
    <div>
      find countries <input value={newCountry} onChange={{handleCountry}} />
    </div>

  )
}

function App() {
  const [newCountry, setNewCountry] = useState('')


  const handleCountry = (event) => {
    setNewCountry(event.target.value)
  }


  return (
    <FindCountries newCountry={newCountry} handleCountry={handleCountry}/>
  );
}

export default App;
