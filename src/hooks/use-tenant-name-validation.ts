import { useState, useRef, useEffect } from "react";
import { isNameAvailable } from "@/app/actions/users";

export function useTenantNameValidation() {
    const [name, setName] = useState("");
    const [isValid, setIsValid] = useState(true);
    const [isAvailable, setIsAvailable] = useState(false);
    const [checking, setChecking] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const debounceRef = useRef<NodeJS.Timeout | null>(null);

    function validateSubdomain(name: string) {
        // Only allow lowercase letters, numbers, and hyphens, at least 3 chars
        return /^[a-z0-9-]{3,}$/.test(name);
    }

    useEffect(() => {
        if (!name) {
            setIsValid(true);
            setIsAvailable(false);
            setError(null);
            return;
        }
        if (!validateSubdomain(name)) {
            setIsValid(false);
            setIsAvailable(false);
            setError("Name must be at least 3 characters and contain only lowercase letters, numbers, or hyphens.");
            return;
        }
        setIsValid(true);
        setChecking(true);
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(async () => {
            const { data: isAvailable, error } = await isNameAvailable(name);
            if (error) {
                setError("Error checking name. Try again.");
                setIsAvailable(false);
            } else {
                setIsAvailable(isAvailable);
                setError(!isAvailable ? "This name is already taken." : null);
            }
            setChecking(false);
        }, 400);
        return () => {
            if (debounceRef.current) clearTimeout(debounceRef.current);
        };
    }, [name]);

    return {
        name,
        setName,
        isValid,
        isAvailable,
        checking,
        error,
    };
}
