import Axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import config from '../config.json';

const LoginScreen = () => {
    const navigate = useNavigate();

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Required'),
        pinCode: Yup.number().required('Required'),
    });

    const { handleChange, handleSubmit, errors } = useFormik({
        initialValues: {
            email: '',
            pinCode: '',
        },
        validationSchema: validationSchema,
        onSubmit: values => {
            handleLogin(values);
        },
    });

    const handleLogin = async (values) => {
        try {
            const response = await Axios.post(`${config.API_URL}/login`, {
                withCredentials: true,
                email: values.email,
                pinCode: values.pinCode,
            },
                { withCredentials: true }
            );

            if (response.status === 200) {
                navigate('/student');
            }
            else toast.info("Uw email of pincode is incorrect.")
        } catch (error) {
            toast.error(errors.message);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex w-full justify-center h-screen items-center">
                <div>
                    <h1 className='text-4xl font-bold text-gray-800 mb-4'>Welkom Student!</h1>
                    <div className="mb-6 w-full">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email adres</label>
                        <input
                            onChange={handleChange}
                            name="email"
                            type="email"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="jan.janssens@student.hogent.be"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="pinCode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pincode</label>
                        <input
                            onChange={handleChange}
                            name="pinCode" type="password"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="••••"
                            required
                        />
                    </div>

                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Inloggen</button>
                </div>
            </div>
        </form>
    )
}

export default LoginScreen