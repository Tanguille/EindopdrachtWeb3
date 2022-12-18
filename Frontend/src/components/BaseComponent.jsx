import React from 'react';
import { useQuery } from "@tanstack/react-query";
import LoadingComponent from './LoadingComponent';
import ErrorScreen from '../screens/ErrorScreen';
import { Axios } from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const BaseComponent = (queryKey, component) => {
    const { isLoading, isError, error } = useQuery({
        queryKey: queryKey,
        cacheTime: 1000,
        refetchInterval: 5 * 60 * 1000,
        queryFn: async () => {
            const response = await Axios.get(API_URL + queryKey);
            console.log(API_URL + queryKey);
            return response.data;
        }
    });

    if (isLoading) {
        return <LoadingComponent loadingMessage={isLoading.valueOf} />;
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