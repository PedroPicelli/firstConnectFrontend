const API = import.meta.env.VITE_API_URL

export async function usernameAvailabilityRequest(username) {

    const request = await fetch(`${API}/auth/availability/username?username=${encodeURIComponent(username)}`)


    if(!request.ok) {
        return false
    }

    return true

}

export async function emailAvailabilityRequest(email) {

    const request = await fetch(`${API}/auth/availability/email?email=${encodeURIComponent(email)}`)


    if(!request.ok) {
        return false
    }

    return true

}
