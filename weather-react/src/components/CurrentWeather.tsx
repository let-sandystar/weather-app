import { useEffect, useState } from "react";
import { fetchWeather } from "../lib/api";
import { getWeatherIcon } from "../utils/WeatherIconMap";
import { fetchUV } from "../lib/uv";

type CurrentWeatherProps = {
    city: string;
};

export default function CurrentWeatherCard({ city }: CurrentWeatherProps) {
    const [weather, setWeather] = useState<any>(null);
    const [uv, setUv] = useState(null);

    useEffect(() => {
        if (!city) return;
        const fetch = async () => {
            const data = await fetchWeather(city);
            setWeather(data);
        };
        fetch();
    }, [city]);

    useEffect(() => {
        if (!weather) return;

        const loadUV = async () => {
            const { lat, lon } = weather.coord;
            const uvValue = await fetchUV(lat, lon);
            setUv(uvValue);
        };
        loadUV();
    }, [weather]);

    if (!weather || !weather.main) return null;

    const { main, description } = weather.weather[0];
    const isNight = 
        weather.dt < weather.sys.sunrise ||
        weather.dt > weather.sys.sunset;
    const iconPath = getWeatherIcon(main, isNight);
    const rain = weather.rain?.["1h"] ?? 0;

    return (
        <div className="relative overflow-hidden rounded-xl p-10 text-white shadow-2xl">
            <h2 className="text-2xl">
                {weather.name}, {weather.sys.country}
            </h2>
            <img src={iconPath} alt={main} />
            <p className="text-5xl font-bold text-on-surface mb-2">
                {Math.round(weather.main.temp)}&deg;C
            </p>
            <p className="text-on-surface-variant text-lg font-medium">
               Feels like: {Math.round(weather.main.feels_like)}&deg;C
            </p>
            <p className="text-sm tracking-widest text-tertiary uppercase mt-1">
               {description}
            </p>
            <div className="flex gap-10 mt-4">
                <div className="text-center">
                    <img className="h-10 w-10" src="/weather-icons/static/wind.svg" alt="wind" />
                    <p className="font-semibold">{weather.wind.speed} m/s</p>
                </div>

                {uv !== null && (
                    <div className="text-center">
                        <img className="h-10 w-10" src="/weather-icons/static/uv-index.svg" alt="uv" />
                        <p className="font-semibold">{uv}</p>
                    </div>
                )}

                <div className="text-center">
                    <img className="h-10 w-10" src="/weather-icons/static/rain.svg" alt="rain" />
                    <p className="font-semibold">{rain} mm</p>
                </div>
            </div>
        </div>
    );
};