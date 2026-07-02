import { authFetch } from "../authGeneralRequests";


const API = import.meta.env.VITE_API_URL;




export async function toggleLikeRequest(postId) {

    const request = await authFetch(`${API}/posts/${postId}/like`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        }

    });


    if(request.status == 200) {

        return request.json()

    }

    if(request.status == 404) {
        throw new Error("Not Found")
    }

    throw new Error("Internal Server Error")

}
