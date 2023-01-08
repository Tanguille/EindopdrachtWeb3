import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import ErrorScreen from "../../screens/ErrorScreen";
import { getData } from "../../api/rest";
import LoadingComponent from "../LoadingComponent";
import TimerComponent from "../TimerComponent";
import io from 'socket.io-client';
import config from "../../config";
import HostNavbar from "./HostNavbar";
import ExtraTijdComponent from "./ExtraTijdComponent";

const HostAssignmentDetailComponent = () => {
    const API_URL = config.API_URL;
    const socket = io.connect(API_URL);

    const [subAssignments, setSubAssignments] = useState();
    const [isTimerRunning, setIsTimerRunning] = useState({});

    const queryKey = "opdrachtElement";

    // Dynamische parameter uit de url te halen
    const { assignmentId } = useParams();

    const { isLoading, isError, error, data: subAssignment } = useQuery({
        queryKey: [queryKey],
        cacheTime: 1000,
        refetchInterval: 1 * 60 * 1000,
        queryFn: async () => await getData(`${queryKey}/${assignmentId}`)
    });

    isLoading && <LoadingComponent />;
    isError && <ErrorScreen error={error} />;

    useEffect(() => {
        if (subAssignment) {
            const subAssignmentsData = subAssignment.data;

            // Set the state with the updated subAssignments
            setSubAssignments(subAssignmentsData);
        }
    }, [subAssignment]);

    const updateIsRunning = (id) => {
        setIsTimerRunning((prevIsRunning) => ({
            ...prevIsRunning,
            [id]: !prevIsRunning[id], // toggle the value for the given id
        }));

        socket.emit("sendResterendeTijd", {
            timerRunning: isTimerRunning
        });
    };

    return subAssignments && (
        <>
            <HostNavbar />
            <div className="mx-auto p-8 bg-gray-200 rounded-lg shadow-md flex flex-col">
                <table className="w-full text-left table-collapse class=w-1/2 mx-auto p-8 bg-white rounded-lg shadow-md">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Beschrijving</th>
                            <th className="px-4 py-2"></th>
                            <th className="px-6 py-2">Resterende tijd</th>
                            <th className="px-4 py-2">Extra tijd</th>
                            <th className="px-4 py-2">Rapporten</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subAssignments.map((subAssignment, index) => (
                            <tr key={index}>
                                <td className="w-1/2 whitespace-normal text-justify px-8 py-2" > {subAssignment.beschrijving}</td>
                                <td className="text-center">
                                    <button className="px-4 py-2 rounded-lg bg-green-500 text-white font-bold hover:bg-green-700 focus:outline-none focus:shadow-outline-green active:bg-green-800 mr-2" onClick={() => updateIsRunning(subAssignment.id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                                        </svg>
                                    </button>
                                    <button className="px-4 py-2 rounded-lg bg-yellow-500 text-white font-bold hover:bg-yellow-700 focus:outline-none focus:shadow-outline-yellow active:bg-yellow-800 mr-2" onClick={() => updateIsRunning(subAssignment.id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
                                        </svg>
                                    </button>
                                </td>
                                <td className="text-center text-gray-600 mb-1 px-4 py-2">
                                    <TimerComponent
                                        deadline={subAssignment.minuten}
                                        isRunning={isTimerRunning[subAssignment.id]}
                                        onStartPause={() => updateIsRunning(subAssignment.id)}
                                        id={subAssignment.id}
                                    />
                                </td>
                                <td className="text-center text-gray-600 mb-1 px-4 py-2"><ExtraTijdComponent id={subAssignment.id} /></td>
                                <td className="px-4 py-2">
                                    <Link to={`rapporten/${subAssignment.id}`}>
                                        <button>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25M9 16.5v.75m3-3v3M15 12v5.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                            </svg>
                                        </button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div >
        </>
    );
};


export default HostAssignmentDetailComponent