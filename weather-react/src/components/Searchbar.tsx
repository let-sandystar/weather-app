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
        <div>
            <input type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Search for city"
             />
             <button onClick={handleSearch}>Search</button>
        </div>
    );
}