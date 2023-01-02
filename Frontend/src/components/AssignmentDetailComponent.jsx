import { useQuery } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ErrorScreen from "../screens/ErrorScreen";
import { getData } from "../utils/rest";
import LoadingComponent from "./LoadingComponent";
import StudentNavbar from "./StudentComponents/StudentNavbar";

const AssignmentDetailComponent = () => {
	const [subAssignments, setSubAssignments] = useState();
	const queryKey = "opdrachtElement";

	// Dynamische parameter uit de url te halen
	const { assignmentId } = useParams();

	const { isLoading, isError, error, data: assignment } = useQuery({
		queryKey: [queryKey],
		cacheTime: 1000,
		refetchInterval: 5 * 60 * 1000,
		queryFn: async () => await getData(`${queryKey}/${assignmentId}`)
	});

	isLoading && <LoadingComponent />;
	isError && <ErrorScreen error={error} />;

	assignment && (console.log(assignment))

	useEffect(() => {
		console.log(assignment);
		setSubAssignments(assignment.data.opdrachtElementen)
	}, [assignment]);

	const handleStatusChange = (id, newStatus) => {
		// Find the subAssignment with the matching id and update its status
		const updatedSubAssignments = subAssignments.map((subAssignment) => {
			if (subAssignment.id === id) {
				return {
					...subAssignment,
					status: newStatus,
				};
			}
			return subAssignment;
		});
		// Set the state with the updated subAssignments
		setSubAssignments(updatedSubAssignments);
	};


	return subAssignments && (
		<>
			<StudentNavbar />
			<div className="mx-auto p-8 bg-white rounded-lg shadow-md">
				<h1 className="text-2xl font-bold text-gray-800 mb-4">
					{assignment.naam}
				</h1>
				<table className="w-full text-left table-collapse class=w-1/2 mx-auto p-8 bg-white rounded-lg shadow-md">
					<thead>
						<tr>
							<th className="px-4 py-2">Beschrijving</th>
							<th className="px-6 py-2">Resterende tijd</th>
							<th className="px-4 py-2">Status</th>
							<th className="px-4 py-2">Vraag meer tijd</th>
						</tr>
					</thead>
					<tbody>
						{subAssignments.map((subAssignment, index) => (
							<tr key={index}>
								<td className="w-1/2 whitespace-normal text-justify px-8 py-2">{subAssignment.beschrijving}</td>
								<td className="text-center text-gray-600 mb-1 px-4 py-2">{subAssignment.minuten}</td>
								<td className="px-4 py-2">
									<select
										className="w-60 m-2 bg-gray-200 px-4 py-2 rounded-lg shadow-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
										//Default value is "Bezig"
										value={subAssignment.status || "Bezig"}
										onChange={(e) => handleStatusChange(subAssignment.id, e.target.value)}>
										<option value="in progress">Bezig</option>
										<option value="ready">Klaar</option>
										<option value="not participating">Doe niet mee</option>
										<option value="gave up">Opgegeven</option>
									</select>
								</td>
								<td className="px-4 py-2">
									<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Vraag meer tijd</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	);
};

export default AssignmentDetailComponent;
