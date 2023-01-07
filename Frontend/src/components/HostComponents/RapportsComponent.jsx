import React, { useEffect, useState } from 'react';
import Axios from "axios";
import config from "../../config";
import { getData } from '../../api/rest';
import { useQuery } from '@tanstack/react-query';
import ErrorScreen from "../../screens/ErrorScreen";
import LoadingComponent from "../LoadingComponent";
import io from 'socket.io-client';

const RapportsComponent = () => {
    const [rapports, setRapports] = useState();

    const socket = io.connect(config.API_URL);
    const API_URL = config.API_URL;

    const queryKey = "rapport";
    const { isLoading, isError, error, data: rapporten } = useQuery({
        queryKey: [queryKey],
        cacheTime: 1000,
        refetchInterval: 5 * 60 * 1000,
        queryFn: async () => await getData(queryKey)
    });

    isLoading && <LoadingComponent />;
    isError && <ErrorScreen error={error} />;

    useEffect(() => {
        if (rapporten) {
            setRapports(rapporten.data);
        }
    }, [rapporten]);

    useEffect(() => {
        console.log('test');
        socket.on("receiveQuestion", (data) => {
            console.log(data);
        });
        return () => socket.off();
    });

    const findRapporten = (subAssignmentId) => {
        Axios.post(`${API_URL}/rapport`, {
            opdrachtElementId: subAssignmentId,
        }, { withCredentials: true })
            .then(function (response) {
                console.log(response);
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    return (
        <div>RapportsComponent</div>
    )
}

export default RapportsComponent;