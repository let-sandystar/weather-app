export interface weatherTypes {
    name: String;
    main: {
        temp: Number;
        feels_like: Number;
        humidity: Number;
    }
    weather: 
        {
            main: String;
            description: String;
            id: Number;
            icon: String;
        }[];
    wind: {
        speed: Number;
    };
    dt: Number;
    sys: {
      id: Number;
      country: String;
      sunrise: Number;
      sunset: Number;
    }
}