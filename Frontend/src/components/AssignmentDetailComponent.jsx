import React, { useState } from "react";

const AssignmentDetailComponent = ({ assignment }) => {
	console.log(assignment);
	const [assignments, setAssignments] = useState(assignment.subAssignments);
	const { name, subAssignments } = assignment;

	const handleStatusChange = (index, newStatus) => {
		const newAssignments = subAssignments.slice();
		newAssignments[index].status = newStatus;
		setAssignments(subAssignments);
	};

	return (
		<div>
			<thead>
				<tr>
					<th className="px-4 py-2">Naam</th>
					<th className="px-4 py-2">Beschrijving</th>
					<th className="px-4 py-2">Resterende tijd</th>
					<th className="px-4 py-2">Status</th>
				</tr>
			</thead>
			<div className="w-full max-w-md mx-auto rounded shadow-lg p-6 bg-white">
				<h1 className="text-2xl font-bold text-gray-800 mb-4">{name}</h1>
				{subAssignments.map((subAssignment) => (
					<tr>
						<td className="px-4 py-2">{subAssignment.description}</td>
						<td className="px-4 py-2">{subAssignment.timeLeft}</td>
						<td className="px-4 py-2 cursor-pointer">
							<select
								className="w-60 m-2 bg-gray-200 px-4 py-2 rounded-lg shadow-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
								//Default value is "Bezig"
								value={subAssignment.status || "Bezig"}
								onChange={(e) => handleStatusChange(0, e.target.value)}>
								<option value="in progress">Bezig</option>
								<option value="ready">Klaar</option>
								<option value="not participating">Doe niet mee</option>
								<option value="gave up">Opgegeven</option>
							</select>
						</td>{" "}
						*/
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
				<button className="btn btn-blue mt-4">Vraag om meer minuten</button>
			</div>
		</div>
	);
};

export default AssignmentDetailComponent;
