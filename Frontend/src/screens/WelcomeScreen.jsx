import React from 'react';
import { Link } from 'react-router-dom';

const WelcomePage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Welkom!</h1>
            <p className="text-gray-700 mb-8">Gelieve uw rol te selecteren:</p>
            <div className="flex flex-col md:flex-row md:justify-around">
                <Link to='/login' className="px-4 py-2 mr-4 rounded-full bg-blue-500 text-white font-bold hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800">
                    Student
                </Link>
                <Link to='/host' className="px-4 py-2 mr-4 rounded-full bg-green-500 text-white font-bold hover:bg-green-700 focus:outline-none focus:shadow-outline-green active:bg-green-800">
                    Docent
                </Link>
                <Link to='/admin' className="px-4 py-2 rounded-full bg-purple-500 text-white font-bold hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple active:bg-purple-800">
                    Administrator
                </Link>
            </div>
        </div>
    );
};

export default WelcomePage;
