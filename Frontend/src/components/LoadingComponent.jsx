import React from 'react'

const LoadingComponent = ({ loadingMessage }) => {
    return (
        <div>
            <div>
                {/* Display a spinning loading indicator */}
                <i className="fas fa-spinner fa-spin fa-3x">loading</i>
            </div>
            <div>
                {/* Display the current loading message */}
                <p>{loadingMessage}</p>
            </div>
        </div>
    )
}

export default LoadingComponent