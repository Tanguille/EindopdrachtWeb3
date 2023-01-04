import { useQuery } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ErrorScreen from "../screens/ErrorScreen";
import { getData, putData } from "../utils/rest";
import LoadingComponent from "./LoadingComponent";
import StudentNavbar from "./StudentComponents/StudentNavbar";

const AssignmentDetailComponent = () => {
	const [subAssignments, setSubAssignments] = useState();
	const [showQuestionInput, setShowQuestionInput] = useState(false);

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

	useEffect(() => {
		if (assignment) {
			setSubAssignments(assignment.data.OpdrachtElement)
			putData(`${queryKey}/${assignmentId}`, assignment.data);
		}
	}, [assignment, assignmentId]);

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

	const handleTimeRequest = (subAssignmentId, increment) => {
		// Find the subAssignment that has the matching id
		const subAssignment = subAssignments.find(
			(subAssignment) => subAssignment.id === subAssignmentId
		);

		// Update the timeLeft of the subAssignment
		subAssignment.timeLeft += increment;

		// Update the state with the modified subAssignments array
		setSubAssignments([...subAssignments]);
	};

	const toggleQuestionInput = () => {
		setShowQuestionInput(!showQuestionInput);
	}


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
								<td className="w-1/2 whitespace-normal text-justify px-8 py-2" > {subAssignment.beschrijving}</td>
								<td className="text-center text-gray-600 mb-1 px-4 py-2">{subAssignment.minuten}</td>
								<td className="px-4 py-2">
									<select
										className="w-50 m-2 bg-gray-200 px-4 py-2 rounded-lg shadow-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
										//Default value is "Bezig"
										value={subAssignment.status || "Bezig"}
										onChange={(e) => handleStatusChange(subAssignment.id, e.target.value)}>
										<option value="in progress">Bezig</option>
										<option value="ready">Klaar</option>
										<option value="not participating">Doet niet mee</option>
										<option value="gave up">Opgegeven</option>
									</select>
								</td>
								<td className="px-4 py-2">
									<button
										className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
										onClick={() => handleTimeRequest(subAssignment.id, 1)}
									>
										+1 min
									</button>
									<button
										className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
										onClick={() => handleTimeRequest(subAssignment.id, 5)}
									>
										+5 min
									</button>
									<button
										className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
										onClick={() => handleTimeRequest(subAssignment.id, 10)}
									>
										+10 min
									</button>
								</td>
								<td className="px-4 py-2">
									<button>
										<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
											<path strokeLinecap="round" strokeLinejoin="round" d="M10.05 4.575a1.575 1.575 0 10-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 013.15 0v1.5m-3.15 0l.075 5.925m3.075.75V4.575m0 0a1.575 1.575 0 013.15 0V15M6.9 7.575a1.575 1.575 0 10-3.15 0v8.175a6.75 6.75 0 006.75 6.75h2.018a5.25 5.25 0 003.712-1.538l1.732-1.732a5.25 5.25 0 001.538-3.712l.003-2.024a.668.668 0 01.198-.471 1.575 1.575 0 10-2.228-2.228 3.818 3.818 0 00-1.12 2.687M6.9 7.575V12m6.27 4.318A4.49 4.49 0 0116.35 15m.002 0h-.002" />
										</svg>
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div >
		</>
	);
};

export default AssignmentDetailComponent;
