export function hasInvalidUsernameChars(value) {

    return /[^a-zA-Z0-9._]/.test(value);

}

