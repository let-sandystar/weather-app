import { useEffect, useState } from "react";
import { fetchCitySuggestions } from "../lib/geodb";

type SearchbarProps = {
    onSearch: (city: string) => void;
};

export default function Searchbar({ onSearch }: SearchbarProps) {
    const [value, setValue] = useState("");
    const [suggestions, setSuggestions] = useState<string[]>([]);

    useEffect(() => {
        const timeout = setTimeout(async () => {
            if(!value) {
                setSuggestions([]);
                return;
            }

            const results = await fetchCitySuggestions(value);
            setSuggestions(results);
        }, 300);
        return () => clearTimeout(timeout);
    }, [value]);

    const handleSearch = () => {
        if (!value.trim()) return;
        onSearch(value);
        setValue("");
    }

    return (
        <div className="relative flex items-center gap-2">
            <input type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Search for city"
            className="rounded-md bg-white/5 px-3 py-1.5 mr-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-400"
             />
             <button className="px-3 py-1.5 text-white bg-transparent hover:bg-gray-800 outline-1 outline-gray-500 rounded-md focus:-outline-offset-2 focus:outline-gray-600" onClick={handleSearch}>Search</button>
             {suggestions.length > 0 && (
                <ul className="absolute mt-12 w-full max-w-md bg-white text-black rounded-md shadow-lg z-10">
                    {suggestions.map((city) => (
                        <li
                            key={city}
                            onClick={() => {
                            onSearch(city);
                            setValue("");
                            setSuggestions([]);
                            }}
                            className="px-3 py-2 hover:bg-gray-200 cursor-pointer"
                        >
                            {city}
                        </li>
                    ))}
                </ul>
                )}
        </div>
    );
}