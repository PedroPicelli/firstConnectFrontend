import { authFetch } from "../authGeneralRequests";


const API = import.meta.env.VITE_API_URL;




export async function createPostRequest(content) {

    const request = await authFetch(`${API}/posts`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            content: content

        })

    });



    if(request.status == 201) {

        return request.json()

    }

    if(request.status == 400) {
        throw new Error("Bad Request")
    }

    throw new Error("Internal Server Error")

}
