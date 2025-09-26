import { Loader2 } from "lucide-react";

export function Spinner({ className = "w-5 h-5 animate-spin" }: { className?: string }) {
    return <Loader2 className={className} />;
}
