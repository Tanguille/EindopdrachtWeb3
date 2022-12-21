import Axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import BaseComponent from '../components/BaseComponent';
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
                email: values.email,
                pinCode: values.pinCode,
            },
                { withCredentials: true }
            );
            console.log("response", response);

            if (response.status === 200) {
                navigate('/student');
            }
            else toast("Uw email of pincode is incorrect.")
        } catch (error) {
            toast(error.message);
        }
    }

    //BaseComponent("login", LoginScreen);
    return (
        <form onSubmit={handleSubmit}>
            <div className="flex w-full justify-center h-screen items-center">
                <div>
                    <div className="mb-6 w-full">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email addres</label>
                        <input
                            onChange={handleChange}
                            //error={errors?.name !== undefined}
                            //helperText={errors?.name}
                            name="email"
                            type="email"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="jean.janssens@student.hogent.be"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="pinCode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pincode</label>
                        <input
                            onChange={handleChange}
                            // error={errors?.name !== undefined}
                            // helperText={errors?.name}
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