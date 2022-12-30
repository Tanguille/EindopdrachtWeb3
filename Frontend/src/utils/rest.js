import Axios from "axios";
import config from "../config.json";
import ErrorScreen from "../screens/ErrorScreen";

const API_URL = config.API_URL;

const getData = async (queryKey) => {
    try {
        const response = await Axios.post(`${API_URL}/${queryKey}`, {
            withCredentials: true,
        });

        return [...response.data];
    } catch (error) {
        console.log(error);
        return <ErrorScreen error={error.message} />;
    }
};

export default getData;