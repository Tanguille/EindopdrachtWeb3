import { useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import StudentScreen from "../screens/StudentScreen";
import BaseComponent from "./BaseComponent";

const AssignmentComponent = () => {
	const client = useQueryClient();

	const queryData = client.getQueryData(["opdracht"]);

	const [assignments, setAssignments] = useState();

	const handleStatusChange = (index, newStatus) => {
		const newAssignments = data.data;
		newAssignments[index].status = newStatus;
		setAssignments(newAssignments);
	};

	return (
		// dataX && (
		<div className="w-3/4 mx-auto px-4 py-2 bg-white rounded-lg shadow-md">
			<BaseComponent queryKey={["opdracht"]} component={StudentScreen} />
			<h1 className="text-2xl font-bold text-gray-800 mb-4">Taken</h1>
			<table className="w-full text-left table-collapse">
				<thead>
					<tr>
						<th className="px-4 py-2">Naam</th>
						<th className="px-4 py-2">Beschrijving</th>
						<th className="px-4 py-2">Resterende tijd</th>
						<th className="px-4 py-2">Status</th>
					</tr>
				</thead>
				<tbody>
					{assignments.map((assignment, index) => (
						<tr key={assignment.name}>
							<td className="px-4 py-2">
								<Link to={`student/opdracht/${assignment}`}>
									{assignment.name}
								</Link>
							</td>
							<td className="px-4 py-2">{assignment.description}</td>
							<td className="px-4 py-2">{assignment.timeLeft}</td>
							<td className="px-4 py-2 cursor-pointer">
								<select
									className="w-60 m-2 bg-gray-200 px-4 py-2 rounded-lg shadow-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
									value={assignment.status || "Bezig"}
									onChange={(e) => handleStatusChange(index, e.target.value)}>
									<option value="in progress">Bezig</option>
									<option value="ready">Klaar</option>
									<option value="not participating">Doe niet mee</option>
									<option value="gave up">Opgegeven</option>
								</select>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
	//);
};

export default AssignmentComponent;
