import Axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const getStudents = async () => {
    const response = await Axios({
        url: API_URL + '/students',
        method: 'GET',
    });
    return response.data;
}