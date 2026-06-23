const validatingClasses = {

    LOADING: "input-validating",
    AVAILABLE: "input-validated-available",
    NOT_AVAILABLE: "input-validated-not-available"

}


export function validateInput(cond) {
    const validatingClass = cond
        ? validatingClasses.AVAILABLE
        : validatingClasses.NOT_AVAILABLE;

    return validatingClass;
}