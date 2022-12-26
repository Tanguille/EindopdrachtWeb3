import React from "react";
import { Routes, Route } from "react-router-dom";
import CSVFileInput from "../components/AdminComponents/CSVReaderComponent";
import AssignmentDetailComponent from "../components/AssignmentDetailComponent";
import AdminScreen from "../screens/AdminScreen";
import ErrorScreen from "../screens/ErrorScreen";
import HostScreen from "../screens/HostScreen";
import LoginScreen from "../screens/LoginScreen";
import StudentScreen from "../screens/StudentScreen";
import WelcomeScreen from "../screens/WelcomeScreen";

const RootNavigator = () => {
	return (
		<Routes>
			<Route path="/" element={<WelcomeScreen />} />

			<Route path="/admin" element={<AdminScreen />} />
			<Route path="/admin/csv" element={<CSVFileInput />} />

			<Route path="/host" element={<HostScreen />} />

			<Route path="/student" element={<StudentScreen />} />
			<Route
				path="/student/assignments"
				element={<AssignmentDetailComponent />}
			/>
			<Route path="/login" element={<LoginScreen />} />

			<Route path="*" element={<ErrorScreen />} />
		</Routes>
	);
};

export default RootNavigator;
