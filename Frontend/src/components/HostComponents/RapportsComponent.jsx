import React, { useEffect, useState } from 'react';
import Axios from "axios";
import config from "../../config";
import { getData } from '../../api/rest';
import { useQuery } from '@tanstack/react-query';
import ErrorScreen from "../../screens/ErrorScreen";
import LoadingComponent from "../LoadingComponent";
import io from 'socket.io-client';
import { useParams } from 'react-router-dom';

const RapportsComponent = () => {
    // Dynamische parameter uit de url te halen
    const { subAssignmentId } = useParams();
    const [rapports, setRapports] = useState();

    const socket = io.connect(config.API_URL);
    const API_URL = config.API_URL;

    const queryKey = "rapport";
    const { isLoading, isError, error, data: rapporten } = useQuery({
        queryKey: [queryKey],
        cacheTime: 1000,
        refetchInterval: 5 * 60 * 1000,
        queryFn: async () => await getData(queryKey)
    });

    isLoading && <LoadingComponent />;
    isError && <ErrorScreen error={error} />;

    useEffect(() => {
        if (rapporten) {
            const gefilterdeRapporten = rapporten.data.filter(rapport => parseInt(rapport.opdrachtElementId) === parseInt(subAssignmentId));
            setRapports(gefilterdeRapporten);
        }
    }, [rapporten, subAssignmentId]);

    useEffect(() => {
        socket.on("receiveQuestion", (data) => {
            console.log(data);
        });
        return () => socket.off();
    });

    const findRapporten = (subAssignmentId) => {
        Axios.post(`${API_URL}/rapport`, {
            opdrachtElementId: subAssignmentId,
        }, { withCredentials: true })
            .then(function (response) {
                console.log(response);
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    return (
        <table className="table-auto w-full text-center text-gray-700 mx-auto p-8 bg-gray-200 rounded-lg shadow-md">
            <thead>
                <tr>
                    <th className="px-4 py-2">Student ID</th>
                    <th className="px-4 py-2">Status</th>
                    <th className="px-6 py-2">Extra tijd</th>
                </tr>
            </thead>
            <tbody>
                {rapports &&
                    rapports.map((rapport, index) => {
                        return (
                            <tr key={index}>
                                <td className="border px-4 py-2">{rapport.studentId}</td>
                                <td className="border px-4 py-2">{rapport.status}</td>
                                <td className="border px-4 py-2">{rapport.extraMinuten}</td>
                            </tr>
                        );
                    })}
            </tbody>
        </table>
    );

}

export default RapportsComponent;