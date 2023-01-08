import React, { useState, useEffect } from 'react';

const TimerComponent = ({ deadline, isRunning }) => {
    const [timeLeftInSec, setTimeLeftinSec] = useState(
        parseInt(deadline) * 60  // countdown from `deadline` minutes to seconds
    );

    useEffect(() => {
        let interval = null;
        if (isRunning) {
            interval = setInterval(() => {
                setTimeLeftinSec((prevTime) => prevTime - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isRunning]);

    const convertSeconds = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;
        return {
            hours,
            minutes,
            seconds: remainingSeconds,
        };
    };

    const remainingTime = convertSeconds(timeLeftInSec);

    if (timeLeftInSec === 0) {
        return (
            <div className="flex justify-center items-center">
                <div className="text-xl text-red-700">
                    Tijd is om
                </div>
            </div>
        )
    }

    if (remainingTime.hours < 1) {
        return (
            <div className="flex justify-center items-center">
                <div className="text-2xl text-red-700">
                    {remainingTime.minutes}m : {remainingTime.seconds}s
                </div>
            </div>
        );
    } else if (remainingTime.minutes < 1) {
        return (
            <div className="flex justify-center items-center">
                <div className="text-2xl text-red-700">
                    {remainingTime.seconds}s
                </div>
            </div>
        )
    } else {
        return (
            <div className="flex justify-center items-center">
                <div className="text-xl text-red-700">
                    {remainingTime.hours}u : {remainingTime.minutes}m : {remainingTime.seconds}s
                </div>
            </div>
        );
    }
};

export default TimerComponent;
