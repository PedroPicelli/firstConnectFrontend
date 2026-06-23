import { useRef, useState, useEffect } from "react"
import { isValidEmail } from "../../utils/validation/emailValidation"

const validatingClasses = {

    LOADING: "input-validating",
    AVAILABLE: "input-validated-available",
    NOT_AVAILABLE: "input-validated-not-available"

}

export function useDynamicValidation(availabilityFunction) {

    const usernameTimeoutRef = useRef(null)
    const [validatingClass, setValidatingClass] = useState("")
    const validationIdRef = useRef(0)
    const controllerRef = useRef(null);
    const [availability, setAvailability] = useState(false)


    useEffect(() => {
        return () => {
            clearTimeout(usernameTimeoutRef.current);
            controllerRef.current?.abort();
        };
    }, []);

    function triggerDynamicValidation(userNormalized) {

        clearTimeout(usernameTimeoutRef.current)
        controllerRef.current?.abort();

        if(userNormalized.length < 3) {
            setValidatingClass("")
            return
        }

        setValidatingClass(validatingClasses.LOADING)

        usernameTimeoutRef.current = setTimeout(async () => {

            const currentValidationId = ++validationIdRef.current
            controllerRef.current = new AbortController();
            const signal = controllerRef.current.signal;
            setAvailability(false)

            const available = await availabilityFunction(userNormalized, signal)

            if(currentValidationId !== validationIdRef.current)
                return;

            if(available) {
                setValidatingClass(validatingClasses.AVAILABLE)
                setAvailability(true)
            } else {
                setValidatingClass(validatingClasses.NOT_AVAILABLE)
            }
            

        }, 1000)
    }


    return [
        triggerDynamicValidation,
        validatingClass,
        setValidatingClass,
        availability
    ]

}


export function useEmailAddressValidation(emailNormalized) {

    if(emailNormalized.length < 3) {
        return null
    }   


    return isValidEmail(emailNormalized)
        

}



