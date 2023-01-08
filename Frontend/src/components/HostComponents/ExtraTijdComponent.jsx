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
    });

    return (
        <div>
            {averageExtraTime.extraTijd || 0} {<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 m-2 rounded">Pas toe</button>}
        </div>
    )
}

export default ExtraTijdComponent