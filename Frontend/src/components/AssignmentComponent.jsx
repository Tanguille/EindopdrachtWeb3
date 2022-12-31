import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import getData from "../utils/rest";
import AssignmentDetailComponent from "./AssignmentDetailComponent";
import LoadingComponent from "./LoadingComponent";

const AssignmentComponent = () => {
	const [assignments, setAssignments] = useState([]);

	useEffect(() => {
		async function fetchData() {
			try {
				const queryData = await getData("opdracht");
				setAssignments(queryData);
			} catch (error) {
				console.error(error);
			}
		}
		fetchData();
	}, []);

	if (!assignments) {
		return <LoadingComponent />;
	}

	return assignments.length > 0 && (
		<div className="w-1/2 mx-auto p-8 bg-white rounded-lg shadow-md">
			<h1 className="text-2xl font-bold text-gray-800 mb-4">Taken</h1>
			<table className="w-full text-left table-collapse">
				<thead>
					<tr>
						<th className="px-4 py-2 font-bold text-xl text-gray-800">Naam</th>
					</tr>
				</thead>
				<tbody>
					{assignments.map((assignment, index) => {
						console.log(assignment.naam);
						return (
							<tr key={index}>
								<td className="px-4 py-2 text-xl text-gray-800">
									<Link to={`opdracht/${assignment.id}`}>
										{assignment.naam}
										<div className="hidden"><AssignmentDetailComponent assignment={assignment} /></div>
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