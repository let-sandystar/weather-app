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
        <div className="glass-card relative overflow-hidden rounded-xl p-10 shadow-[0_0_40px_rgba(59,191,250,0.06)] text-center border border-outline-variant/10 mt-5">
            <h2 className="text-2xl font-headline text-white mb-4">
                {weather.name}, {weather.sys.country}
            </h2>
            <img src={iconPath} alt={main} className="mx-auto h-28 w-28 weather-glow" />
            <p className="text-6xl font-bold text-white mt-4">
                {Math.round(weather.main.temp)}&deg;C
            </p>
            <p className="text-white text-lg font-medium mt-1">
               Feels like: {Math.round(weather.main.feels_like)}&deg;C
            </p>
            <p className="text-sm tracking-widest text-white uppercase mt-2">
               {description}
            </p>
            <div className="flex justify-center gap-15 mt-10">
                <div className="text-center">
                    <img className="h-10 w-10 mx-auto" src="/weather-icons/static/wind.svg" alt="wind" />
                    <p className="font-light text-white mt-1">{Math.round(weather.wind.speed)} m/s</p>
                </div>

                {uv !== null && (
                    <div className="text-center">
                        <img className="h-10 w-10 mx-auto" src="/weather-icons/static/uv-index.svg" alt="uv" />
                        <p className="font-light text-white mt-1">{Math.round(uv)} UV</p>
                    </div>
                )}

                <div className="text-center">
                    <img className="h-10 w-10 mx-auto" src="/weather-icons/static/rain.svg" alt="rain" />
                    <p className="font-light text-white mt-1">{Math.round(rain)} mm</p>
                </div>
            </div>
        </div>
    );
};