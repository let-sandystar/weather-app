const API_KEY = import.meta.env.VITE_UV_API_KEY;

export const fetchUV = async (lat: number, lon: number) => {
    const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${lat},${lon}`;

    const res = await fetch(url);
    const data = await res.json();
    return data.current?.uv ?? null;
}