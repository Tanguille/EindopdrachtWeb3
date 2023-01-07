import React from "react";
import { Routes, Route } from "react-router-dom";
import CSVFileInput from "../components/AdminComponents/CSVReaderComponent";
import AssignmentDetailComponent from "../components/StudentComponents/AssignmentDetailComponent";
import AdminScreen from "../screens/AdminScreen";
import ErrorScreen from "../screens/ErrorScreen";
import HostScreen from "../screens/HostScreen";
import LoginScreen from "../screens/LoginScreen";
import StudentScreen from "../screens/StudentScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import HostAssignmentDetailComponent from "../components/HostComponents/HostAssignmentDetailComponent";
import RapportsComponent from "../components/HostComponents/RapportsComponent";

const RootNavigator = () => {
	return (
		<Routes>
			<Route path="/" element={<WelcomeScreen />} />

			<Route path="/admin" element={<AdminScreen />} />
			<Route path="/admin/csv" element={<CSVFileInput />} />

			<Route path="/host" element={<HostScreen />} />
			<Route path="/host/opdracht/:assignmentId"
				element={<HostAssignmentDetailComponent />} />
			<Route path="/host/opdracht/:assignmentId/rapporten/:subAssignmentId"
				element={<RapportsComponent />} />

			<Route path="/student" element={<StudentScreen />} />
			<Route path="/student/opdracht/:assignmentId"
				element={<AssignmentDetailComponent />} />

			<Route path="/login" element={<LoginScreen />} />

			<Route path="*" element={<ErrorScreen />} />
		</Routes>
	);
};

export default RootNavigator;
