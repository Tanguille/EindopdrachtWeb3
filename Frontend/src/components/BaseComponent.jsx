import React from 'react';
import { useQuery } from "@tanstack/react-query";
import LoadingComponent from './LoadingComponent';
import Navbar from './Navbar.jsx';



const BaseComponent = () => {
    // const { isLoading, isError, error } = useQuery({
    //     queryKey: "base",
    //     cacheTime: 1000,
    //     refetchInterval: 5 * 60 * 1000,
    // });

    // if (isLoading) {
    //     return <LoadingComponent />;
    // } else if (isError) {
    //     return <div>{error.message}</div>;
    // } else {
    return (
        <div>
            <Navbar />
        </div>
    )
}

export default BaseComponent;