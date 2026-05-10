import { useState } from "react";
import Searchbar from "./components/Searchbar";
import CurrentWeatherCard from "./components/CurrentWeather";
import "./index.css";

function App() {
    const [city, setCity] = useState("");

    return (
        <div className="atmospheric-bg flex min-h-screen w-full flex-col items-center p-6">
            <div className="w-full max-w-md">
                <Searchbar onSearch={setCity} />
                <CurrentWeatherCard city={city} />
            </div>
        </div>
    );
}

export default App;
