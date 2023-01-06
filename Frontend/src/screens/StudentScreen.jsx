import React from "react";
import AssignmentComponent from "../components/AssignmentComponent";
import QuestionComponent from "../components/StudentComponents/QuestionComponent";
import StudentNavbar from "../components/StudentComponents/StudentNavbar";

const StudentScreen = () => {
	return (
		<div>
			<StudentNavbar />
			<div className="flex flex-col md:flex-row md:justify-between">
				<AssignmentComponent className="w-full md:w-1/2" />
			</div>
		</div>
	);
};

export default StudentScreen;
