import { authFetch } from "../authGeneralRequests";


const API = import.meta.env.VITE_API_URL;




export async function createCommentRequest(content, postId) {

    const request = await authFetch(`${API}/posts/${postId}/comments`, {

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

    if(request.status == 404) {
        throw new Error("Not Found")
    }

    throw new Error("Internal Server Error")

}
