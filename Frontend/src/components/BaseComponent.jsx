import React from "react";
import { useQuery } from "@tanstack/react-query";
import LoadingComponent from "./LoadingComponent";
import ErrorScreen from "../screens/ErrorScreen";
import Axios from "axios";
import config from "../config.json";

const API_URL = config.API_URL;

const getData = async (queryKey) => {
	try {
		const response = await Axios.post(`${API_URL}/${queryKey}`, {
			withCredentials: true,
		});

		return { ...response.data };
	} catch (error) {
		console.log(error);
		return <ErrorScreen error={error.message} />;
	}
};

const BaseComponent = ({ queryKey, component }) => {
	console.log("querykey: ", queryKey);
	const { isLoading, isError, error, data } = useQuery({
		queryKey: [queryKey],
		cacheTime: 1000,
		refetchInterval: 5 * 60 * 1000,
		queryFn: () => getData(queryKey),
	});

	if (isLoading) {
		return <LoadingComponent />;
	} else if (isError) {
		return <ErrorScreen error={error} />;
	} else {
		console.log(data[0]);
		return <div className="w-full">{component}</div>;
	}
};

export default BaseComponent;
