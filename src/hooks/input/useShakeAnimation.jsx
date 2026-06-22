import { useRef, useState, useEffect } from "react";



export function useShakeAnimation() {

    const shakeTimeoutRef = useRef(null)
    const [shakeClassName, setShakeClassName] = useState("")

    useEffect(() => {
        return () => {
            clearTimeout(shakeTimeoutRef.current);
        };
    }, []);

    function triggerShake() {

        clearTimeout(shakeTimeoutRef.current);

        setShakeClassName("");

        requestAnimationFrame(() => {
            setShakeClassName("invalid-input-shake");
        });

        shakeTimeoutRef.current = setTimeout(() => {
            setShakeClassName("");
        }, 200);

    }
    
    return {
        triggerShake,
        shakeClassName
    }
}

