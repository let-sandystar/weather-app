import { useEffect, useRef, useState } from "react";
import { fetchCitySuggestions } from "../lib/geodb";
import SuggestionList from "./SuggestionList";

type SearchbarProps = {
    onSearch: (city: string) => void;
};

export default function Searchbar({ onSearch }: SearchbarProps) {
    const [value, setValue] = useState("");
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const isSelected = useRef(false);

    useEffect(() => {
        const timeout = setTimeout(async () => {
            if (isSelected.current) {
                isSelected.current = false;
                return;
            }

            if(!value) {
                setSuggestions([]);
                return;
            }

            if (value.length < 3) {
                setSuggestions([]);
                return;
            }
            
            console.log("Debounced value", value);
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

    const handleSelect = (city: String) => {
        isSelected.current = true;
        onSearch(String(city));
        setValue(String(city));
        setSuggestions([]);
        console.log("selected city", city);
    }

    return (
        <div className="relative flex flex-col w-full max-w-md">
            <div className="flex items-center gap-0.5">
                <input type="text"
                name="search"
                value={value}
                onChange={(e) => {
                    setValue(e.target.value);
                    console.log("Input value", e.target.value);
                }}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Search for city"
                className="w-full rounded-full bg-white/5 px-3 py-3 mr-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-400"
                />
                {/* <button className="px-3 py-1.5 text-white bg-transparent hover:bg-gray-800 outline-1 outline-gray-500 rounded-full focus:-outline-offset-2 focus:outline-gray-600" onClick={handleSearch}>Search</button> */}
            </div>
            <SuggestionList
                suggestions={suggestions}
                onSelect={handleSelect}
            />
        </div>
    );
}