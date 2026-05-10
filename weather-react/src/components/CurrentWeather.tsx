import { useEffect, useState } from "react";
import { fetchWeather } from "../lib/api";
import { getWeatherIcon } from "../utils/WeatherIconMap";
import { fetchUV } from "../lib/uv";
import type { CurrentWeather } from "../lib/api.types";
import LoadingWeather from "./LoadingWeather";
import ExpandButton from "./ExpandButton";
import ExpandedSection from "./ExpandedSection";

type CurrentWeatherProps = {
    city: string;
};

export const CurrentWeatherCard: React.FC<CurrentWeatherProps> = ({ city }) => {
    const [weather, setWeather] = useState<CurrentWeather | null>(null);
    const [uv, setUv] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        if (!city) return;
        const load = async () => {
            setLoading(true);
            setError(null);

            try {
                const data = await fetchWeather(city);
                setWeather(data);

                const { lat, lon } = data.coord;
                const uvValue = await fetchUV(lat, lon);
                setUv(uvValue);
            } catch (err) {
                setError("City not found");
                setWeather(null);
                setUv(null);
                console.error(`Failed to fetch city, ${err}`);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [city]);

    const weatherItem = weather?.weather?.[0];
    const main = weatherItem?.main!;
    const description = weatherItem?.description ?? "";
    const isNight = weather
        ? weather.dt < weather.sys.sunrise || weather.dt > weather.sys.sunset
        : false;
    const iconPath = getWeatherIcon(main, isNight);
    const rain = weather?.rain?.["1h"] ?? 0;

    return (
        <>
            {error && (
                <div role="alert">
                    <div className="mt-8 rounded-t bg-red-500 px-4 py-2 font-bold text-white">
                        Error
                    </div>
                    <div className="rounded-b border border-t-0 border-red-400 bg-red-100 px-4 py-3 text-red-700">
                        <p>Can't find "{city}", try again</p>
                    </div>
                </div>
            )}

            {loading && (
                <div className="mt-10 flex items-center justify-center">
                    <LoadingWeather />
                </div>
            )}

            {!error && !loading && weather && (
                <div className="glass-card border-outline-variant/10 relative mt-5 overflow-hidden rounded-xl border p-10 text-center shadow-[0_0_40px_rgba(59,191,250,0.06)]">
                    <h2 className="font-headline mb-2 text-2xl text-white">
                        {weather.name}, {weather.sys.country}
                    </h2>
                    <img
                        src={iconPath}
                        alt={main}
                        className="weather-glow mx-auto h-40 w-40"
                    />
                    <p className="text-5xl font-bold text-white">
                        {Math.round(weather.main.temp)}&deg;C
                    </p>
                    <p className="mt-1 text-lg font-medium text-white">
                        Feels like: {Math.round(weather.main.feels_like)}&deg;C
                    </p>
                    <p className="mt-2 text-sm tracking-widest text-white uppercase">
                        {description}
                    </p>
                    <div className="mt-10 flex justify-center gap-15">
                        <div className="text-center">
                            <img
                                className="mx-auto h-10 w-10"
                                src="/weather-icons/static/wind.svg"
                                alt="wind"
                            />
                            <p className="mt-1 font-light text-white">
                                {Math.round(weather.wind.speed)} m/s
                            </p>
                        </div>

                        {uv !== null && (
                            <div className="text-center">
                                <img
                                    className="mx-auto h-10 w-10"
                                    src="/weather-icons/static/uv-index.svg"
                                    alt="uv"
                                />
                                <p className="mt-1 font-light text-white">
                                    {Math.round(uv)} UV
                                </p>
                            </div>
                        )}

                        {rain > 0 && (
                            <div className="text-center">
                                <img
                                    className="mx-auto h-10 w-10"
                                    src="/weather-icons/static/rain.svg"
                                    alt="rain"
                                />
                                <p className="mt-1 font-light text-white">
                                    {Math.round(rain)} mm
                                </p>
                            </div>
                        )}
                    </div>
                    <div className="mt-4 flex justify-center">
                        <ExpandButton
                            expanded={expanded}
                            onToggle={() => setExpanded(prev => !prev)}
                        />
                    </div>
                    {expanded && <ExpandedSection />};
                </div>
            )}
        </>
    );
};

export default CurrentWeatherCard;
