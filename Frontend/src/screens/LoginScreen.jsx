import React, { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import StudentScreen from './StudentScreen';

const LoginScreen = () => {
    let email = useRef();
    let pinCode = useRef();
    const navigate = useNavigate();

    const loginValidator = (email, pinCode) => {
        if (true) navigate('/student');
        else alert.log("Uw email of pincode is incorrect.")
    }

    return (
        <div className="flex w-full justify-center h-screen items-center">
            <div>
                <div className="mb-6">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email addres</label>
                    <input type="email" ref={email} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john.doe@company.com" required />
                </div>
                <div className="mb-6">
                    <label htmlFor="pinCode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pincode</label>
                    <input type="pinCode" ref={pinCode} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="••••" required />
                </div>

                <button onClick={() => loginValidator(email, pinCode)} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Inloggen</button>
            </div>
        </div>
    )
}

export default LoginScreen