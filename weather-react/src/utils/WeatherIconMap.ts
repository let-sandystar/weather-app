type WeatherMain =
  | "Clear"
  | "Clouds"
  | "Rain"
  | "Drizzle"
  | "Thunderstorm"
  | "Snow"
  | "Mist"
  | "Fog"
  | "Haze";

export function getWeatherIcon(main: WeatherMain, isNight: boolean): string {

    const map: Record<WeatherMain, { day: string; night: string}> = {
        Clear: {
            day: "weather-icons/clear-day.svg",
            night: "/weather-icons/clear-night.svg",
        },
        Clouds: {
            day: "/weather-icons/partly-cloudy-day.svg",
            night: "/weather-icons/partly-cloudy-night.svg",
        },
        Rain: {
            day: "/weather-icons/rain.svg",
            night: "/weather-icons/partly-cloudy-night-rain.svg",
        },
        Drizzle: {
            day: "/weather-icons/partly-cloudy-day-drizzle.svg",
            night: "/weather-icons/partly-cloudy-night-drizzle.svg",
        },
        Thunderstorm: {
            day: "/weather-icons/thunderstorms-day-rain.svg",
            night: "/weather-icons/thunderstorms-night-rain.svg",
        },
        Snow: {
            day: "/weather-icons/snow.svg",
            night: "/weather-icons/partly-cloudy-night-snow.svg",
        },
        Mist: {
            day: "/weather-icons/mist.svg",
            night: "/weather-icons/mist.svg",
        },
        Fog: {
            day: "/weather-icons/fog-day.svg",
            night: "/weather-icons/fog-night.svg",
        },
        Haze: {
            day: "/weather-icons/haze-day.svg",
            night: "/weather-icons/haze-night.svg",
        },
    };

    const weather = map[main];

    if (!weather) return "/weather-icons/partly-cloudy-day.svg";

    return isNight ? weather.night : weather.day;
}