import React, { useState } from "react";
import AdminNavbar from "./AdminNavbar";
import Axios from "axios";
import config from "../../config.json";
import ErrorScreen from "../../screens/ErrorScreen";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = config.API_URL;

const CSVFileInput = () => {
    const [selectedOption, setSelectedOption] = useState("");
    const [file, setFile] = useState(null);
    const [data, setData] = useState([]);

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async () => {
        // Check if a file has been selected
        if (!file) {
            toast.info("No file selected");
            return;
        }

        // Check if the file is a CSV
        if (file.type !== "text/csv") {
            toast.info("Please select a CSV file");
            return;
        }

        // Read the file
        const reader = new FileReader();
        reader.onerror = () => {
            console.error(reader.error);
        };

        reader.onload = async (event) => {
            try {

                const csvData = event.target.result;
                const rows = csvData.split("\n");

                // Parse the CSV data and send it to the database
                rows.forEach(async (row) => {
                    const values = row.split(",");

                    if (selectedOption === "student") {
                        const newStudent = {
                            id: values[0],
                            name: values[1],
                            gebruikersNaam: values[2],
                            familieNaam: values[3],
                            voorNaam: values[4],
                            email: values[6],
                        };

                        const newGroup = {
                            groepId: values[10],
                        };

                        // push the data to the array
                        setData((prevData) => [...prevData, newStudent, newGroup]);
                    } else if (selectedOption === "opdracht") {
                        const newOpdracht = {
                            id: parseInt(values[1].slice(-1), 10),
                            naam: values[0],
                        };

                        const newOpdrachtElement = {
                            beschrijving: values[2],
                            minuten: values[3],
                        };

                        // push the data to the array
                        setData((prevData) => [...prevData, newOpdracht, newOpdrachtElement]);
                    }
                });

                reader.readAsText(file);

                // Send the data to the backend
                if (data.length > 0) {
                    console.log(reader.result);
                    // send the data to the backend
                    console.log(`${API_URL}/csv`);
                    Axios.post(`${API_URL}/csv`, data)
                        .then((res) => {
                            // handle the response
                            toast.success(res.data.message, "success");
                        })
                        .catch((error) => {
                            // handle the error
                            <ErrorScreen error={error} />;
                        });
                }
            } catch (error) {
                console.log(error)
                error.response && toast.error(error.response.data.message, "error");
            }
        };
    };

    return (
        <div>
            <AdminNavbar />
            <div className="flex w-full justify-center h-screen items-center">
                <select
                    className="w-60 m-2 bg-gray-200 px-4 py-2 rounded-lg shadow-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={handleChange}
                    value={selectedOption}>
                    <option value="student">Studenten en groepen</option>
                    <option value="opdracht">Opdracht</option>
                </select>

                <input
                    type="file"
                    onChange={handleFileChange}
                    className="m-2 bg-gray-200 px-4 py-2 rounded-lg shadow-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={handleSubmit}
                    className="ml-4 bg-blue-500 px-4 py-2 rounded-lg shadow-md text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    Submit
                </button>
            </div>
            <ToastContainer />
        </div>
    );
};

export default CSVFileInput;
