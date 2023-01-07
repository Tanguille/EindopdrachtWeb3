import { useQuery } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ErrorScreen from "../../screens/ErrorScreen";
import { getData } from "../../api/rest";
import LoadingComponent from "../LoadingComponent";
import StudentNavbar from "./StudentNavbar";
import Axios from "axios";
import config from "../../config";
import QuestionComponent from "./QuestionComponent";

const AssignmentDetailComponent = () => {
	const [subAssignments, setSubAssignments] = useState();
	const [visible, setVisible] = useState(false)
	const [rapports, setRapports] = useState();
	const [vraagRapport, setVraagRapport] = useState();

	const API_URL = config.API_URL;
	const queryKey1 = "opdrachtElement";
	const queryKey2 = "rapport";
	// Dynamische parameter uit de url te halen
	const { assignmentId } = useParams();

	const { isLoading, isError, error, data: assignment } = useQuery({
		queryKey: [queryKey1],
		cacheTime: 1000,
		refetchInterval: 5 * 60 * 1000,
		queryFn: async () => await getData(`${queryKey1}/${assignmentId}`)
	});

	const { data: rapporten } = useQuery({
		queryKey: [queryKey2],
		cacheTime: 1000,
		refetchInterval: 5 * 60 * 1000,
		queryFn: async () => await getData(queryKey2)
	});

	isLoading && <LoadingComponent />;
	isError && <ErrorScreen error={error} />;

	useEffect(() => {
		if (rapporten) {
			setRapports(rapporten.data);
		}
	}, [rapporten]);

	useEffect(() => {
		if (assignment && rapports) {
			const subAssignmentsData = assignment.data.OpdrachtElement;
			const updatedSubAssignments = subAssignmentsData.map((subAssignment) => {
				// Find the matching rapport for this subAssignment
				const matchingRapports = rapports.filter((rapport) => rapport.opdrachtElementId === subAssignment.id);
				const rapport = matchingRapports[0];

				// Add the status field to the subAssignment object
				return {
					...subAssignment,
					//Als er een rapport voor is status gebruiken, anders bezig					
					status: rapport ? rapport.status : "bezig",
				}
			});

			// Set the state with the updated subAssignments
			setSubAssignments(updatedSubAssignments);
		}
	}, [rapports, assignment]);

	const handleStatusChange = (id, newStatus) => {
		// Find the subAssignment with the matching id and update its status
		const updatedSubAssignments = subAssignments.map((subAssignment) => {
			if (subAssignment.id === id) {
				return {
					...subAssignment,
					status: newStatus,
				};
			}
			console.log(subAssignment)
			return subAssignment;
		});

		// Set the state with the updated subAssignments
		setSubAssignments(updatedSubAssignments);

		Axios.post(`${API_URL}/rapport`, {
			opdrachtElementId: id,
			status: newStatus,
		}, { withCredentials: true })
			.then(function (response) {
				console.log(response);
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	const handleTimeRequest = (subAssignmentId, increment) => {
		//Find the rapport
		const rapport = rapports.find((rapport) => rapport.opdrachtElementId === subAssignmentId) || {};

		// Update the timeLeft of the subAssignment
		rapport.extraMinuten += increment;

		// Update the state with the modified subAssignments array
		setRapports([...rapports]);

		// Send the updated rapport to the backend
		Axios.post(`${API_URL}/rapport`, {
			opdrachtElementId: subAssignmentId,
			status: rapport.status,
			extraMinuten: rapport.extraMinuten,
		}, { withCredentials: true })
			.then(function (response) {
				console.log(response);
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	const showQuestionInput = (subAssignmentId) => {
		setVisible(!visible);
		setVraagRapport(findRapport(subAssignmentId));
	};

	const findRapport = (subAssignmentId) => {
		//returned leeg object als er nog geen rapport is. db maakt id aan dan		
		const rapport = rapports.find((rapport) => rapport.opdrachtElementId === subAssignmentId);
		console.log(rapport)

		if (rapport === undefined) {
			Axios.post(`${API_URL}/rapport`, {
				opdrachtElementId: subAssignmentId,
			}, { withCredentials: true })
				.then(function (response) {
					console.log(response.data);
					return response.data;
				})
				.catch(function (error) {
					console.log(error);
				});

		} else return rapport;
	};

	return subAssignments && (
		<>
			<StudentNavbar />
			<div className="mx-auto p-8 bg-gray-200 rounded-lg shadow-md flex flex-col">
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
						{subAssignments && subAssignments.map((subAssignment, index) => (
							<tr key={index}>
								<td className="w-1/2 whitespace-normal text-justify px-8 py-2" > {subAssignment.beschrijving}</td>
								<td className="text-center text-gray-600 mb-1 px-4 py-2">{subAssignment.minuten}</td>
								<td className="px-4 py-2">
									<select
										className="w-50 m-2 bg-gray-200 px-4 py-2 rounded-lg shadow-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
										//Default value is "Bezig"
										value={subAssignment.status}
										onChange={(e) => handleStatusChange(subAssignment.id, e.target.value)}>
										<option value="bezig">Bezig</option>
										<option value="klaar">Klaar</option>
										<option value="doet niet mee">Doet niet mee</option>
										<option value="opgegeven">Opgegeven</option>
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
									<button onClick={() => showQuestionInput(subAssignment.id)}>
										<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
											<path strokeLinecap="round" strokeLinejoin="round" d="M10.05 4.575a1.575 1.575 0 10-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 013.15 0v1.5m-3.15 0l.075 5.925m3.075.75V4.575m0 0a1.575 1.575 0 013.15 0V15M6.9 7.575a1.575 1.575 0 10-3.15 0v8.175a6.75 6.75 0 006.75 6.75h2.018a5.25 5.25 0 003.712-1.538l1.732-1.732a5.25 5.25 0 001.538-3.712l.003-2.024a.668.668 0 01.198-.471 1.575 1.575 0 10-2.228-2.228 3.818 3.818 0 00-1.12 2.687M6.9 7.575V12m6.27 4.318A4.49 4.49 0 0116.35 15m.002 0h-.002" />
										</svg>
									</button>
									{visible && <QuestionComponent setVisible={setVisible} rapport={vraagRapport} />}
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
