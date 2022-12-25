import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AssignmentComponent = () => {
    const [assignments, setAssignments] = useState([
        //TODO: Get assignments from server
        {
            name: 'Assignment 1',
            description: 'Write an essay on the role of technology in education',
            timeLeft: '3 days',
            status: 'ready'
        },
        {
            name: 'Assignment 2',
            description: 'Design a website for a small business',
            timeLeft: '5 days',
            status: 'not participating'
        },
        {
            name: 'Assignment 3',
            description: 'Create a budget plan for a fictional company',
            timeLeft: '2 days',
            status: 'gave up'
        }
    ]);

    const handleStatusChange = (index, newStatus) => {
        const newAssignments = [...assignments];
        newAssignments[index].status = newStatus;
        setAssignments(newAssignments);
    };


    return (
        <div className="w-3/4 mx-auto px-4 py-2 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Taken</h1>
            <table className="w-full text-left table-collapse">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Naam</th>
                        <th className="px-4 py-2">Beschrijving</th>
                        <th className="px-4 py-2">Resterende tijd</th>
                        <th className="px-4 py-2">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {assignments.map((assignment, index) => (
                        <tr key={assignment.name}>
                            <td className="px-4 py-2">
                                <Link to={`/assignments/${assignment.name}`}>{assignment.name}</Link>
                            </td>
                            <td className="px-4 py-2">{assignment.description}</td>
                            <td className="px-4 py-2">{assignment.timeLeft}</td>
                            <td className="px-4 py-2 cursor-pointer">
                                <select
                                    className="px-2 py-1 rounded-lg text-white font-bold"
                                    value={assignment.status}
                                    onChange={(e) => handleStatusChange(index, e.target.value)}
                                >
                                    <option value="ready">Klaar</option>
                                    <option value="not participating">Doe niet mee</option>
                                    <option value="gave up">Opgegeven</option>
                                </select>
                                {/* {console.log("status:", assignment.status)} */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AssignmentComponent;

