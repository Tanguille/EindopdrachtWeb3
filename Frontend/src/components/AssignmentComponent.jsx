import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import ErrorScreen from "../screens/ErrorScreen";
import { getData } from "../api/rest";
import LoadingComponent from "./LoadingComponent";
import QuestionComponent from "./StudentComponents/QuestionComponent";

const AssignmentComponent = () => {
	const [visible, setVisible] = useState(false)
	const queryKey = "opdracht";

	const { isLoading, isError, error, data: assignments } = useQuery({
		queryKey: [queryKey],
		cacheTime: 1000,
		refetchInterval: 5 * 60 * 1000,
		queryFn: async () => await getData(queryKey)
	});

	isLoading && <LoadingComponent />;
	isError && <ErrorScreen error={error} />;

	const showQuestionInput = () => {
		setVisible(!visible);
	}

	return assignments && (
		<div className="w-1/2 mx-auto p-8 m-8 bg-white rounded-lg shadow-md">
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
								<td className="px-4 py-2">
									<button onClick={showQuestionInput}>
										<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
											<path strokeLinecap="round" strokeLinejoin="round" d="M10.05 4.575a1.575 1.575 0 10-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 013.15 0v1.5m-3.15 0l.075 5.925m3.075.75V4.575m0 0a1.575 1.575 0 013.15 0V15M6.9 7.575a1.575 1.575 0 10-3.15 0v8.175a6.75 6.75 0 006.75 6.75h2.018a5.25 5.25 0 003.712-1.538l1.732-1.732a5.25 5.25 0 001.538-3.712l.003-2.024a.668.668 0 01.198-.471 1.575 1.575 0 10-2.228-2.228 3.818 3.818 0 00-1.12 2.687M6.9 7.575V12m6.27 4.318A4.49 4.49 0 0116.35 15m.002 0h-.002" />
										</svg>
									</button>
									{visible && <QuestionComponent setVisible={setVisible} />}
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