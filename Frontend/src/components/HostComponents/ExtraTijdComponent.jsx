import React, { useEffect, useState } from 'react'
import config from "../../config";
import Axios from "axios";

const ExtraTijdComponent = ({ id }) => {
    const [averageExtraTime, setAverageExtraTime] = useState({});
    const API_URL = config.API_URL;

    const sendUpdatedRapport = async (id) => {
        Axios.post(`${API_URL}/rapport/extraTijd`, {
            opdrachtElementId: id,
        }, { withCredentials: true })
            .then(function (response) {
                setAverageExtraTime({
                    opdrachtElementId: id,
                    extraTijd: response.data || 0
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    useEffect(() => {
        sendUpdatedRapport(id);
    }, [id]);

    const handleExtraTijdToevoegen = (averageExtraTime) => {
        console.log(averageExtraTime);
        Axios.put(`${API_URL}/opdrachtElement/updateExtraTime/${averageExtraTime.opdrachtElementId}`, {
            time: averageExtraTime.extraTijd
        }, { withCredentials: true })
            .then(function (response) {
                console.log(response)
            })
            .catch(function (error) {
                console.log(error);
            });

        Axios.put(`${API_URL}/rapport/removeExtraTime/${averageExtraTime.opdrachtElementId}`, {
        }, { withCredentials: true })
            .then(function (response) {
                console.log(response)
            })
            .catch(function (error) {
                console.log(error);
            });

        //Refresh page to show latest data
        window.location.reload(false);
    }

    return (
        <div>
            {averageExtraTime.extraTijd || 0} {<button onClick={() => handleExtraTijdToevoegen(averageExtraTime)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 m-2 rounded">Pas toe</button>}
        </div>
    )
}

export default ExtraTijdComponent