export function normalizeUsername(value) {
    
    return value.toLowerCase().replace(/[^a -z0-9._]/g, "").slice(0, 32);
}

