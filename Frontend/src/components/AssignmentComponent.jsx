import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";
import ErrorScreen from "../screens/ErrorScreen";
import { getData } from "../api/rest";
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

	const timeCalculator = (assignment) => {
		if (assignment.OpdrachtElement !== undefined) {
			// Optellen van de tijd van alle opdrachtElementen		
			const sumMinutes = assignment.OpdrachtElement.reduce((sum, subAssignment) => {
				return sum + subAssignment.minuten;
			}, 0)
			return parseInt(sumMinutes);
		}
	}

	return assignments && (
		<div className="w-1/2 mx-auto p-8 m-8 bg-white rounded-lg shadow-md">
			<h1 className="text-2xl font-bold text-gray-800 mb-4">Taken</h1>
			<table className="w-full text-left table-collapse">
				<thead>
					<tr>
						<th className="px-4 py-2 font-bold text-xl text-gray-800">Naam</th>
						<th className="px-4 py-2 font-bold text-xl text-gray-800">Resterende tijd</th>
					</tr>
				</thead>
				<tbody>
					{assignments.data.map((assignment, index) => {
						return (
							<tr key={index}>
								<td className="px-4 py-2 text-xl text-gray-800">
									<Link to={`opdracht/${assignment.id}`}>{assignment.naam}</Link>
								</td>
								<td className="px-4 py-2 text-xl text-gray-800">
									{timeCalculator(assignment) + " minuten"}
								</td>
								<td className="px-4 py-2">
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