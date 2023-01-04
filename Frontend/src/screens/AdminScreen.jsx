import React from 'react'
import CSVReaderComponent from '../components/AdminComponents/CSVReaderComponent'

const AdminScreen = () => {
    return (
        <div className=' bg-gray-200'>
            <h1 className='w-1/2 mx-auto p-8 text-center text-2xl font-bold text-gray-800 mb-4'>Welkom admin!</h1>
            <CSVReaderComponent />
        </div>
    )
}

export default AdminScreen