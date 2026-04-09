import { useState } from 'react'
import './App.css'
import Searchbar from './components/Searchbar'
import CurrentWeatherCard from './components/CurrentWeather';

function App() {
  const [city, setCity] = useState("");

  return (
    <>
      <Searchbar onSearch={setCity} />
      <div>
        <CurrentWeatherCard city = {city}></CurrentWeatherCard>
      </div>
    </>
  )
}

export default App
