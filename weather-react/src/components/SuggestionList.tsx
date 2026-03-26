type SuggestionProps = {
    suggestions: String[];
    onSelect: (city: String) => void;
}

export default function SuggestionList( {suggestions, onSelect}: SuggestionProps) {
    if (suggestions.length === 0) return null;

    return (
        <div>
             {suggestions.length > 0 && (
                <ul className="absolute mt-12 w-full max-w-md bg-white text-black rounded-md shadow-lg z-10">
                    {suggestions.map((city, index) => (
                        <li
                            key={index}
                            onClick={() => onSelect(city)}
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