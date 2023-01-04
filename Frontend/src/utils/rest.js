import Axios from "axios";
import config from "../config.json";

const API_URL = config.API_URL;

export const getData = async (queryKey) => {
    const response = await Axios.get(`${API_URL}/${queryKey}`, {
        withCredentials: true,
    });

    console.log(`${API_URL}/${queryKey}`);
    return response;
};

export const putData = async (queryKey, data) => {
    const response = await Axios.put(`${API_URL}/${queryKey}`, data, {
        withCredentials: true,
    });

    return response;
};

