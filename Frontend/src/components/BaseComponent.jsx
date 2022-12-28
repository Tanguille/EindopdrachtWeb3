import React from "react";
import { useQuery } from "@tanstack/react-query";
import LoadingComponent from "./LoadingComponent";
import ErrorScreen from "../screens/ErrorScreen";
import Axios from "axios";
import config from "../config.json";

const API_URL = config.API_URL;

const BaseComponent = async ({ queryKey, component }) => {
	let data;
	console.log("querykey: ", queryKey);
	const { isLoading, isError, error } = useQuery({
		queryKey: [queryKey],
		cacheTime: 1000,
		refetchInterval: 5 * 60 * 1000,
		queryFn: async () => {
			if (queryKey !== "login") {
				if (queryKey === undefined) {
					return <ErrorScreen error="Query key is undefined" />;
				}
				try {
					data = await Axios.get(`${API_URL}/${queryKey}`, {
						withCredentials: true,
					});
					console.log(data.data);
					return data.data;
				} catch (err) {
					return <ErrorScreen error={err.message} />;
				}
			} else if (queryKey !== undefined) return queryKey;
		},
	});

	if (isLoading) {
		return <LoadingComponent loadingMessage={isLoading} />;
	} else if (isError) {
		return <ErrorScreen error={error} />;
	} else {
		return <div className="w-full">{component}</div>;
	}
};

export default BaseComponent;
