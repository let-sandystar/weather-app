import { useEffect, useState } from "react";
import { fetchWeather } from "../lib/api";
import { getWeatherIcon } from "../utils/WeatherIconMap";

type CurrentWeatherProps = {
    city: string;
};

export default function CurrentWeatherCard({ city }: CurrentWeatherProps) {
    const [weather, setWeather] = useState<any>(null);

    useEffect(() => {
        if (!city) return;
        const fetch = async () => {
            const data = await fetchWeather(city);
            setWeather(data);
        };
        fetch();
    }, [city]);

    if (!weather || !weather.main) return null;

    const { main } = weather.weather[0];
    const isNight = 
        weather.dt < weather.sys.sunrise ||
        weather.dt > weather.sys.sunset;
    const iconPath = getWeatherIcon(main, isNight);

    return (
        <div className="relative overflow-hidden rounded-xl p-10 text-white shadow-2xl">
            <img src={iconPath} alt={main} />
            <h2 className="text-2xl font-bold">
                {weather.name}
            </h2>
            <p className="text-xl font-semibold">
                {Math.round(weather.main.temp)}&deg;C
            </p>
            <p className="text-lg">
               Feels like: {Math.round(weather.main.feels_like)}&deg;C
            </p>
        </div>
    );
};