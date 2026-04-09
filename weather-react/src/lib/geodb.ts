const BASE_URL = import.meta.env.VITE_GEODB_URL;
const HOST = import.meta.env.VITE_GEODB_HOST;
const API_KEY = import.meta.env.VITE_GEODB_API_KEY;

export const fetchCitySuggestions = async (query: string ) => {
    if (!query) return [];

    const url = `${BASE_URL}?namePrefix=${query}&types=CITY&minPopulation=5000&limit=4`;
    console.log("url", url);

    const options = {
        method: "GET",
        headers: {
            'X-RapidAPI-Key': API_KEY,
            'X-RapidAPI-Host': HOST,
        },
    };

    try {
        const res = await fetch(url, options);
        const data = await res.json();

        if (res.status === 429) {
            console.warn("Rate limited - returning empty list");
            return [];
        }

        return data.data?.map((city: any) => city.city) ?? [];
    } catch (err) {
        console.error("geodb fetch failed:", err);
        return [];
    }
}