import React, { useState } from "react";

const AssignmentDetailComponent = ({ assignment }) => {
	//Avoid error when undefined
	const { name = "", subAssignments = [] } = assignment || {};

	console.log(name);
	const [subAssignmentsState, setSubAssignments] = useState([]);
	const [status, setStatus] = useState("Bezig");

	const handleStatusChange = (index, newStatus) => {
		const newAssignments = subAssignments.slice();
		newAssignments[index].status = newStatus;
		setSubAssignments(subAssignments);
	};
	return (
		<div>
			<h1 className="text-2xl font-bold text-gray-800 mb-4">{name}</h1>
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
					{subAssignmentsState.map((subAssignment) => (
						<tr>
							<td className="px-4 py-2">{subAssignment.description}</td>
							<td className="px-4 py-2">{subAssignment.timeLeft}</td>
							<td className="px-4 py-2 cursor-pointer">
								<select
									className="w-60 m-2 bg-gray-200 px-4 py-2 rounded-lg shadow-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
									//Default value is "Bezig"
									value={subAssignment.status || "Bezig"}
									onChange={(e) => handleStatusChange(index, e.target.value)}>
									<option value="in progress">Bezig</option>
									<option value="ready">Klaar</option>
									<option value="not participating">Doe niet mee</option>
									<option value="gave up">Opgegeven</option>
								</select>
							</td>
							<div key={subAssignment.id} className="mb-4">
								<p className="text-lg font-bold mb-1">
									{subAssignment.beschrijving}
								</p>
								<p className="text-base text-gray-600 mb-1">
									Minuten over: {subAssignment.minuten}
								</p>
							</div>
						</tr>
					))}
				</tbody>
			</table>
			<button className="btn btn-blue mt-4">Vraag om meer minuten</button>
		</div>
	);
};

export default AssignmentDetailComponent;
