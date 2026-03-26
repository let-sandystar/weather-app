import { useState } from 'react'
import './App.css'
import Searchbar from './components/Searchbar'

function App() {
  const [city, setCity] = useState("Halmstad");

  return (
    <>
      <Searchbar onSearch={setCity} />
    </>
  )
}

export default App
