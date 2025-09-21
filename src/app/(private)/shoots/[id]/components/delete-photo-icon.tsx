export function DeletePhotoIcon({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ef4444"
            strokeWidth={2}
            className={className || "w-5 h-5 cursor-pointer"}
        >
            <rect x="6" y="7" width="12" height="12" rx="2" />
            <path d="M9 7V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v3" />
            <line x1="3" y1="7" x2="21" y2="7" />
            <line x1="10" y1="11" x2="10" y2="17" />
            <line x1="14" y1="11" x2="14" y2="17" />
        </svg>
    );
}
