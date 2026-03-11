import type { CurrentWeather } from "./api.types";

const BASE_URL = "https://api.openweathermap.org/data/2.5";
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export const fetchWeather = async (city: string ) => {
    if (!API_KEY) {
        throw new Error("Missing OpenWeatherMap API key. Add VITE_WEATHER_API_KEY to your .env file and restart the dev server.");
    } 

    const url = `${BASE_URL}/weather?q=${city}&units=metric&appid=${API_KEY}`;

    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`);
    }

    const data = await res.json() as CurrentWeather;

    return data; 
}