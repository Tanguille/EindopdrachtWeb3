import React from "react";

const AssignmentDetailComponent = () => {
	const AssignmentDetail = ({ assignment }) => {
		const { name, subAssignments } = assignment;

		return (
			<div>
				<div className="w-full max-w-md mx-auto rounded shadow-lg p-6 bg-white">
					<h1 className="text-2xl font-bold text-gray-800 mb-4">{name}</h1>
					{subAssignments.map((subAssignment) => (
						<div key={subAssignment.id} className="mb-4">
							<p className="text-lg font-bold mb-1">
								{subAssignment.beschrijving}
							</p>
							<p className="text-base text-gray-600 mb-1">
								Minuten over: {subAssignment.minuten}
							</p>
						</div>
					))}
					<button className="btn btn-blue mt-4">Vraag om meer minuten</button>
				</div>
			</div>
		);
	};
};

export default AssignmentDetailComponent;
