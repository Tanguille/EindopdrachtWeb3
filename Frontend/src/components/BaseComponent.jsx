import React from 'react';
import { useQuery } from "@tanstack/react-query";
import LoadingComponent from './LoadingComponent';
import ErrorScreen from '../screens/ErrorScreen';
import Axios from 'axios';
import config from '../config.json';

const API_URL = config.API_URL;

const BaseComponent = (queryKey, component) => {
    const { isLoading, isError, error } = useQuery({
        queryKey: [queryKey],
        cacheTime: 1000,
        refetchInterval: 5 * 60 * 1000,
        queryFn: async () => {
            try {
                //TODO: POST response toevoegen indien login
                if (queryKey !== "login") {
                    const response = await Axios.get(`${API_URL}{queryKey}`);
                    console.log("response", response.data)
                    return response.data;
                } else {
                    return queryKey;
                }
            } catch (error) {
                console.log(API_URL + queryKey);
                console.log(error);
            }
        }
    });

    if (isLoading) {
        return <LoadingComponent loadingMessage={isLoading} />;
    } else if (isError) {
        return <ErrorScreen error={error} />;
    } else {
        return (
            <div>
                {component}
            </div>
        )
    }
}

export default BaseComponent;