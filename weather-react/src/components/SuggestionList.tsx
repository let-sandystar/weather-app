type SuggestionProps = {
    suggestions: String[];
    onSelect: (city: String) => void;
};

export default function SuggestionList({
    suggestions,
    onSelect,
}: SuggestionProps) {
    if (suggestions.length === 0) return null;

    return (
        <div>
            {suggestions.length > 0 && (
                <ul className="absolute z-10 w-full max-w-md rounded-2xl bg-white text-black shadow-lg">
                    {suggestions.map((city, index) => (
                        <li
                            key={index}
                            onClick={() => onSelect(city)}
                            className="cursor-pointer px-3 py-2 hover:bg-gray-200"
                        >
                            {city}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
