import { authFetch } from "../authGeneralRequests";


const API = import.meta.env.VITE_API_URL;




export async function getPostsRequest() {

    const request = await authFetch(`${API}/posts`, {

        method: "GET",

        headers: {
            "Content-Type": "application/json"
        },

    });


    if(request.status == 200) {

        return request.json()

    }

    throw new Error("Internal Server Error")

}
