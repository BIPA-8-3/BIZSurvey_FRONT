import axios from "axios";


const instance = axios.create({
    headers: {
        "Content-Type": "application/json",
    }
});

export default async function call(api, method, request) {
    try {
        const config = {
            url: api,
            method: method,
            headers: {},
        };

        if (method.toUpperCase() === 'GET') {
            config.params = request;
        } else {
            config.data = request;
        }

        // token 추가
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            config.headers.Authorization = "Bearer " + accessToken;
        }

        const response = await instance(config)
        return response.data;
    } catch (error) {
        throw error;
    }
}

