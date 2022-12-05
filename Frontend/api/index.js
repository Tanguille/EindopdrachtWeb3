import Axios from 'axios';

const API_URL = 'http://localhost:5050';

export const getStudents = async () => {
    const response = await Axios({
        url: API_URL + '/students',
        method: 'GET',
    });
    return response.data;
}