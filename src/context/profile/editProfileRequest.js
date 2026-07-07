import { authFetch } from "../authGeneralRequests";


const API = import.meta.env.VITE_API_URL;




export async function editPostRequest(displayName, bio) {

    const request = await authFetch(`${API}/user/me`, {

        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            displayName: displayName,
            bio: bio

        })

    });



    if(request.status == 200) {

        return request.json()

    }

    if(request.status == 400) {
        throw new Error("Bad Request")
    }

    if(request.status == 404) {
        throw new Error("Not Found")
    }

    throw new Error("Internal Server Error")

}
