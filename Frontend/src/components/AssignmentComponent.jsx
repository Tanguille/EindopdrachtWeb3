import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";
import ErrorScreen from "../screens/ErrorScreen";
import { getData } from "../utils/rest";
import LoadingComponent from "./LoadingComponent";

const AssignmentComponent = () => {
	const queryKey = "opdracht";

	const { isLoading, isError, error, data: assignments } = useQuery({
		queryKey: [queryKey],
		cacheTime: 1000,
		refetchInterval: 5 * 60 * 1000,
		queryFn: async () => await getData(queryKey)
	});

	isLoading && <LoadingComponent />;
	isError && <ErrorScreen error={error} />;

	return assignments && (
		<div className="w-1/2 mx-auto p-8 bg-white rounded-lg shadow-md">
			<h1 className="text-2xl font-bold text-gray-800 mb-4">Taken</h1>
			<table className="w-full text-left table-collapse">
				<thead>
					<tr>
						<th className="px-4 py-2 font-bold text-xl text-gray-800">Naam</th>
					</tr>
				</thead>
				<tbody>
					{assignments.data.map((assignment, index) => {
						return (
							<tr key={index}>
								<td className="px-4 py-2 text-xl text-gray-800">
									<Link to={`opdracht/${assignment.id}`}>
										{assignment.naam}
									</Link>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div >
	);
};

export default AssignmentComponent;