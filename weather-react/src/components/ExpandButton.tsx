type ExpandButtonProps = {
    expanded: Boolean;
    onToggle: () => void;
};

const ExpandButton: React.FC<ExpandButtonProps> = ({ expanded, onToggle }) => {
    return (
        <button
            type="button"
            onClick={onToggle}
            className="mt-6 flex items-center gap-2 text-white/50 transition hover:text-white"
        >
            {expanded ? "Hide details" : "Show details"}
            <span
                className={`transition-transform ${expanded ? "rotate-180" : ""}`}
            >
                <svg
                    data-accordion-icon
                    className="h-5 w-5 shrink-0 rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m5 15 7-7 7 7"
                    />
                </svg>
            </span>
        </button>
    );
};

export default ExpandButton;
