import React from "react";
import { CircleLoader } from "react-spinners";

const LoadingComponent = ({ loadingMessage }) => {
	return (
		<div>
			<div>
				<CircleLoader />
			</div>
			<div>
				{/* Display the current loading message */}
				<p>{loadingMessage}</p>
			</div>
		</div>
	);
};

export default LoadingComponent;
