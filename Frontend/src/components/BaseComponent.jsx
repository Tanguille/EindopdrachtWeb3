import React from "react";
import { useQuery } from "@tanstack/react-query";
import LoadingComponent from "./LoadingComponent";
import ErrorScreen from "../screens/ErrorScreen";
import getData from "../utils/rest";

//Deprecated
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
