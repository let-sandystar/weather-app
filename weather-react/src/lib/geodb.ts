const BASE_URL = import.meta.env.VITE_GEODB_URL;
const HOST = import.meta.env.VITE_GEODB_HOST;
const API_KEY = import.meta.env.VITE_GEODB_API_KEY;

export const fetchCitySuggestions = async (query: string ) => {
    if (!query) return [];

    const url = `${BASE_URL}?namePrefix=${query}`;

    const options = {
        method: "GET",
        headers: {
            'x-rapidapi-key': API_KEY,
            'x-rapidapi-host': HOST,
        },
    };

    try {
        const res = await fetch(url, options);
        const data = await res.json();

        return data.data.map((city: any) => city.city);
    } catch (err) {
        console.error("geodb fetch failed:", err);
        return [];
    }
}