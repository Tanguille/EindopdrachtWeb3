import React, { useState } from "react";

const QuestionComponent = () => {
	const [question, setQuestion] = useState("");

	const handleSubmit = () => {
		//TODO: Submit the question to the server or perform some other action
		console.log(question);
		setQuestion("");
	};

	return (
		<div className="w-1/3 p-8">
			<input
				className="w-full px-2 py-2 rounded-lg shadow-md"
				type="text"
				placeholder="Stel hier je vraag"
				value={question}
				onChange={(e) => setQuestion(e.target.value)}
				maxLength={255}
			/>
			<button
				className="mt-2 w-full px-4 py-2 rounded-lg bg-blue-500 text-white font-bold hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
				onClick={handleSubmit}
				disabled={!question}>
				Submit
			</button>
		</div>
	);
};

export default QuestionComponent;
