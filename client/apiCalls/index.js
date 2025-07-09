import axios from 'axios';

const token = localStorage.getItem("token")

export const axiosInstance = axios.create({
    baseURL: "http://localhost:8082",
    headers: {
        withCredential: true,
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
    }
});
