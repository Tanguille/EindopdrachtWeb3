import React from "react";
import AssignmentComponent from "../components/AssignmentComponent";
import StudentNavbar from "../components/StudentComponents/StudentNavbar";

const StudentScreen = () => {
	return (
		<div>
			<StudentNavbar />
			<AssignmentComponent />
		</div>
	);
};

export default StudentScreen;
