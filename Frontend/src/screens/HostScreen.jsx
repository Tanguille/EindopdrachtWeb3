import React from 'react'
import AssignmentComponent from '../components/AssignmentComponent'
import HostNavbar from '../components/HostComponents/HostNavbar'

const HostScreen = () => {
    return (
        <div>
            <HostNavbar />
            <div>
                <div className="flex flex-col md:flex-row">
                    <AssignmentComponent className="w-full md:w-1/2" />
                    <button className="m-4 rounded-md bg-blue-500 hover:bg-blue-700 text-white font-bold h-10 w-60 mt-8 ml-auto">Uitzetten verzoek extra tijd</button>
                </div>
            </div>
        </div>
    )
}

export default HostScreen;