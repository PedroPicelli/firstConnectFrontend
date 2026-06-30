
const API = import.meta.env.VITE_API_URL;


export async function registerRequest(email, displayName, username, password) {

    const request = await fetch(`${API}/auth/register`, {
        method: "POST",
        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify({
            email: email,
            displayName: displayName,
            username: username,
            password: password
        })
    })


    if(request.status == 200) {
        return request.json()
    }

    if(request.status == 409) {
        throw new Error("Conflict")
    }

    throw new Error("Internal Error")

}


export async function loginRequest(loginIdentifier, loginIdentifierType, password) {
    
    const request = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify({

            loginIdentifier: loginIdentifier,
            loginIdentifierType: loginIdentifierType,
            password: password

        })
    })

    if(request.status == 200) {
        return request.json()
    }

    if(request.status == 401) {
        throw new Error("Unauthorized")
    }

    if(request.status == 400) {
        throw new Error("Bad Request")
    }

    throw new Error("Internal Error")

}
