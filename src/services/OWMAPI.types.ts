export interface weatherTypes {
    name: String;
    main: {
        temp: Number;
        feels_like: Number;
        Humidity: Number;
    }
    weather: [
        {
            main: String;
        }
    ]
    wind: {
        speed: Number;
    }
    dt: Number,
    sys: {
      id: Number;
      country: String;
      sunrise: Number;
      sunset: Number;
}
}