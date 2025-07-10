import { axiosInstance } from ".";

export const RegisterUser = async(payload) => {
    try {
        const response = await axiosInstance.post("api/users/register", payload);
        return response.data;
    } catch(error) {
        return error;
    }
}

export const loginUser = async(payload) => {
    try {
        const response = await axiosInstance.post("api/users/login", payload);
        return response.data;
    } catch(error) {
        return error;
    }
}

export const getCurrentUser = async() => {
    try {
        const response = await axiosInstance.get("api/users/current-user");
        return response.data;
    } catch(error) {
        return error;
    }
}