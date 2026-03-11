interface WeatherCondition {
    main: string;
    description: string;
    id: number;
    icon: string;
}

export interface CurrentWeather {
    dt: number;
    main: {
        temp: number;
        feels_like: number;
        humidity: number;
    }
    name: string;
    sys: {
        country: string;
        sunrise: number;
        sunset: number;
    }
    weather: WeatherCondition[];
    wind: {
        deg: number;
        speed: number;
    }
    clouds: {
        all: number;
    }
}