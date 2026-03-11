import { useState } from "react";

type SearchbarProps = {
    onSearch: (city: string) => void;
};

export default function Searchbar({ onSearch }: SearchbarProps) {
    const [value, setValue] = useState("");

    const handleSearch = () => {
        if (!value.trim()) return;
        onSearch(value);
        setValue("");
    }

    return (
        <div className="flex items-center gap-2">
            <input type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Search for city"
            className="rounded-md bg-white/5 px-3 py-1.5 mr-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-400"
             />
             <button className="px-3 py-1.5 text-white bg-transparent hover:bg-gray-800 outline-1 outline-gray-500 rounded-md focus:-outline-offset-2 focus:outline-gray-600" onClick={handleSearch}>Search</button>
        </div>
    );
}