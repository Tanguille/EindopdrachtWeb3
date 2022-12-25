import React from 'react'
import AssignmentComponent from '../components/AssignmentComponent';
import BaseComponent from '../components/BaseComponent'
import StudentNavbar from '../components/StudentComponents/StudentNavbar'

const StudentScreen = () => {
    const student = "student";
    BaseComponent(student, StudentScreen);

    return (
        <div>
            <StudentNavbar />
            <AssignmentComponent />
        </div>
    )
}

export default StudentScreen