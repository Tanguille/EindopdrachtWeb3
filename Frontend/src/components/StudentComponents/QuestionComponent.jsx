import React, { useState } from "react";
import Axios from "axios";
import config from "../../config";


const QuestionComponent = ({ rapport, setVisible }) => {
	const [question, setQuestion] = useState("");
	const API_URL = config.API_URL;

	const handleSubmit = () => {
		console.log(rapport);

		Axios.post(`${API_URL}/vraag`, {
			beschrijving: question,
			rapportId: rapport.id,
		}, { withCredentials: true })
			.then(function (response) {
				console.log(response);
			})
			.catch(function (error) {
				console.log(error);
			});

		setQuestion("");
	};

	const hideModal = () => {
		setVisible(false);
	};

	return (
		<div className="opacity-100 fixed inset-0 z-50">
			<div className="flex h-screen justify-center items-center">
				<div className="flex-col justify-center bg-white py-8 px-16 border-2 border-gray-900/10 shadow rounded-xl relative">
					<button className="absolute top-0 right-2 p-4 text-3xl font-bold text-red-500 hover:text-red-800" onClick={hideModal} >
						&times;
					</button>
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
						disabled={!question}
					>
						Submit
					</button>
				</div>
			</div>
		</div>
	);
};

export default QuestionComponent;
