import { axiosInstance } from ".";

export const addTheatre = async (payload) => {
    try {
        const response = await axiosInstance.post("/api/theatre/add-theatre", payload);
        return response.data;
    } catch (err) {
        console.log(err);
        return err;
    }

}

export const updateTheatre = async (theatreId, payload) => {
    try {
        const response = await axiosInstance.put(`/api/theatre/update-theatre/${theatreId}`, payload);
        return response.data
    } catch (err) {
        return err
    }
}

export const deleteTheatre = async (theatreId) => {
    try {
        const response = await axiosInstance.delete(`/api/theatre/delete-theatre/${theatreId}`);
        return response.data;
    } catch (err) {
        return err;
    }
}

export const getAllTheatres = async () => {
    try {
        const response = await axiosInstance.get(`/api/theatre/get-all-theatres`);
        return response.data;
    } catch (error) {
        return error
    }
}

export const getAllTheatresByAnOwner = async(ownerId) => {
    try {
        const response = await axiosInstance.get(`/api/theatre/get-all-theatres/${ownerId}`);
        return response.data;
    } catch (error) {
        return error
    }
    
}