import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminScreen from '../screens/AdminScreen';
import ErrorScreen from '../screens/ErrorScreen';
import HostScreen from '../screens/HostScreen';
import LoginScreen from '../screens/LoginScreen';
import StudentScreen from '../screens/StudentScreen';
import WelcomeScreen from '../screens/WelcomeScreen';

const RootNavigator = () => {
    return <Routes>
        <Route path="/" element={<WelcomeScreen />} />
        <Route path="/admin" element={<AdminScreen />} />
        <Route path="/host" element={<HostScreen />} />
        <Route path="/student" element={<StudentScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/host" element={<HostScreen />} />
        <Route path="/admin" element={<AdminScreen />} />
        <Route path="*" element={<ErrorScreen />} />
    </Routes>
}

export default RootNavigator