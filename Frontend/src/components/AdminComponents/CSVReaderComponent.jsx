import React, { useState } from "react";
import Axios from "axios";
import config from "../../config.json";
import ErrorScreen from "../../screens/ErrorScreen";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Papa from "papaparse";

const API_URL = config.API_URL;

const CSVFileInput = () => {
    const [file, setFile] = useState(null);

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
        Papa.parse(file, {
            worker: true, // Don't bog down the main thread if its a big file
            header: true, // use the first row of the CSV as the header
            complete: (result) => {
                // Send the data to the backend
                if (result.data.length > 0) {
                    const csvData = result.data;
                    // send the data to the backend
                    console.log(`${API_URL}/csv`);
                    try {
                        Axios.post(`${API_URL}/csv`, csvData,
                            { withCredentials: true }, {
                            headers: {
                                "Content-Type": "application/json",
                                Accept: "application/json",
                            },
                        }
                        )
                            .then((res) => {
                                // handle the response
                                console.log(res.data)
                                toast.success(res.data.message, "success");
                            })
                            .catch((error) => {
                                console.log(error);
                                // handle the error
                                <ErrorScreen error={error} />;
                            });
                    } catch (error) {
                        console.log(error);
                        error.response && toast.error(error.response.data.message, "error");
                    }
                }
            }
        });
    };

    return (
        <div>
            <div className="flex w-full justify-center h-screen items-center">
                <input
                    type="file"
                    onChange={handleFileChange}
                    className="m-2 bg-gray-200 px-4 py-2 rounded-lg shadow-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="button"
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
