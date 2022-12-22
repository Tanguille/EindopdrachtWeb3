import React from 'react'
import BaseComponent from '../components/BaseComponent'
import Navbar from '../components/Navbar'

const StudentScreen = () => {
    const student = ["student"];
    BaseComponent(student, StudentScreen);

    return (
        <div>
            <Navbar />
            <h1>StudentScreen</h1>
        </div>
    )
}

export default StudentScreen