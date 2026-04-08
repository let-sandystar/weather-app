import { useState } from 'react'
import './App.css'
import Searchbar from './components/Searchbar'
import CurrentWeatherCard from './components/CurrentWeather';

function App() {
  const [city, setCity] = useState("");

  return (
    <>
      <Searchbar onSearch={setCity} />
      <div className="mt-6 text-center text-white text-2xl">
        Vald stad: {city}
      </div>
      <div>
        <CurrentWeatherCard city = {city}></CurrentWeatherCard>
      </div>
    </>
  )
}

export default App
