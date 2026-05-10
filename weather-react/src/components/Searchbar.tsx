import { useEffect, useRef, useState } from "react";
import { fetchCitySuggestions } from "../lib/geodb";
import SuggestionList from "./SuggestionList";

type SearchbarProps = {
    onSearch: (city: string) => void;
};

const Searchbar: React.FC<SearchbarProps> = ({ onSearch }) => {
    const [value, setValue] = useState("");
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const isSelected = useRef(false);

    useEffect(() => {
        const timeout = setTimeout(async () => {
            if (isSelected.current) {
                isSelected.current = false;
                return;
            }

            if (!value) {
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
    };

    const handleSelect = (city: String) => {
        isSelected.current = true;
        onSearch(String(city));
        setValue("");
        setSuggestions([]);
        console.log("selected city", city);
    };

    return (
        <div className="relative flex w-full max-w-md flex-col">
            <div className="flex items-center gap-0.5">
                <input
                    type="text"
                    name="search"
                    value={value}
                    onChange={e => {
                        setValue(e.target.value);
                        console.log("Input value", e.target.value);
                    }}
                    onKeyDown={e => e.key === "Enter" && handleSearch()}
                    placeholder="Search for city"
                    autoFocus
                    className="placeholder:text-grey-400 w-full rounded-full bg-white/5 px-1 py-1 pl-5 text-base text-white outline-1 -outline-offset-1 outline-white/10 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-400 md:px-2 md:py-2 md:pl-5"
                />
            </div>
            <SuggestionList suggestions={suggestions} onSelect={handleSelect} />
        </div>
    );
};

export default Searchbar;
