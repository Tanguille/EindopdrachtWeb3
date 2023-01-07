import React, { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import ErrorScreen from "../../screens/ErrorScreen";
import { getData } from "../../api/rest";
import LoadingComponent from "../LoadingComponent";
import Countdown, { zeroPad } from "react-countdown";
import io from 'socket.io-client';
import config from "../../config";
import Axios from "axios";
import HostNavbar from "./HostNavbar";

const HostAssignmentDetailComponent = () => {
    const API_URL = config.API_URL;
    const socket = io.connect(API_URL);
    const navigate = useNavigate();
    const countdownRef = useRef();
    const [subAssignments, setSubAssignments] = useState();

    const queryKey = "opdrachtElement";

    // Dynamische parameter uit de url te halen
    const { assignmentId } = useParams();

    const { isLoading, isError, error, data: assignment } = useQuery({
        queryKey: [queryKey],
        cacheTime: 1000,
        refetchInterval: 5 * 60 * 1000,
        queryFn: async () => await getData(`${queryKey}/${assignmentId}`)
    });


    isLoading && <LoadingComponent />;
    isError && <ErrorScreen error={error} />;


    useEffect(() => {
        if (assignment) {
            const subAssignmentsData = assignment.data.OpdrachtElement;

            // Set the state with the updated subAssignments
            setSubAssignments(subAssignmentsData);
        }
    }, [assignment]);

    async function updateSubAssignments() {
        if (subAssignments) {
            const updatedSubAssignments = [];
            for (let i = 0; i < subAssignments.length; i++) {
                const subAssignment = subAssignments[i];
                // Send the updated rapport to the backend
                const response = await sendUpdatedRapport(subAssignment.id);
                console.log(response.data);
                updatedSubAssignments.push({
                    ...subAssignment,
                    extraTijd: response.data.data || 0,
                });
            }
            setSubAssignments(updatedSubAssignments);
            console.log(subAssignments);
        }
    }

    async function sendUpdatedRapport(id) {
        return await Axios.post(`${API_URL}/rapport/extraTijd`, {
            opdrachtElementId: id,
        }, { withCredentials: true });
    }

    useEffect(() => {
        updateSubAssignments();
    });

    // Renderer callback with condition
    const renderer = ({ hours, minutes, seconds, }) => {
        return <span>{zeroPad(hours, 2)}:{zeroPad(minutes, 2)}:{zeroPad(seconds, 2)}</span>;
    };


    const handleStartClick = () => {
        console.log(countdownRef.current)
        countdownRef.current.start();
    };

    const handlePauseClick = () => {
        console.log(countdownRef.current)
        countdownRef.current.pause();
    };

    //TODO: Fix timer start & pauze! + Fix extra tijd berkenen
    return subAssignments && (
        <>
            <HostNavbar />
            <div className="mx-auto p-8 bg-gray-200 rounded-lg shadow-md flex flex-col">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">
                    {assignment.naam}
                </h1>
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
                                    <button className="px-4 py-2 rounded-lg bg-green-500 text-white font-bold hover:bg-green-700 focus:outline-none focus:shadow-outline-green active:bg-green-800 mr-2" onClick={handleStartClick}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                                        </svg>
                                    </button>
                                    <button className="px-4 py-2 rounded-lg bg-yellow-500 text-white font-bold hover:bg-yellow-700 focus:outline-none focus:shadow-outline-yellow active:bg-yellow-800 mr-2" onClick={handlePauseClick}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
                                        </svg>
                                    </button>
                                </td>
                                <td className="text-center text-gray-600 mb-1 px-4 py-2"><Countdown ref={countdownRef} date={Date.now() + (subAssignment.minuten * 1000 * 60)} autoStart={false} renderer={renderer} /></td>
                                <td className="text-center text-gray-600 mb-1 px-4 py-2">{subAssignment.extraTijd || 0} {<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Pas toe</button>}</td>
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