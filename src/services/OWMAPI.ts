const BASE_URL = "https://api.openweathermap.org/data/2.5";
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY ?? import.meta.env.WEATHER_API_KEY;

export const fetchWeather = async (city: string) => {
    if (!city) throw new Error("City is required");
    if (!API_KEY) throw new Error("Missing OpenWeatherMap API key. Add VITE_WEATHER_API_KEY to your .env file and restart the dev server.");

    const encoded = encodeURIComponent(city);
    const url = `${BASE_URL}/weather?q=${encoded}&units=metric&appid=${API_KEY}`;

    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`${res.status}`);
    }

    const data = await res.json();

    return data;
};