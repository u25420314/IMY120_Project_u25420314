import { API_URL } from "../config";

export async function apiRequest(path, method = "GET", body){
    const options = {
        method,
        headers: {"Content-Type": "application/json"}
    }

    if(body){
        options.body = JSON.stringify(body)
    }

    const response = await fetch(`${API_URL}${path}`, options)
    const data = await response.json()

    if(!response.ok){
        throw new Error(data.error || data.message || "Something went wrong")
    }

    return data
}