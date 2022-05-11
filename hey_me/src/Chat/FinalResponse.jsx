import React from "react";

import "./LearningOptions.css";

const addPatient = () => {
	// e.preventDefault();
	const options = {
		method: "POST",
		headers: {
		  appId: "209080691110ce73",
		  apiKey: "922eb4fd0f54e17af971463c5f124e20fee2119f",
		  "Content-Type": "application/json",
		  Accept: "application/json",
		},
		body: JSON.stringify({ accepted: [localStorage.getItem("userid")] }),
	  };
	
	  fetch(`https://api-us.cometchat.io/v3.0/users/Terapeuta/friends`, options)
		.then((response) => response.json())
		.then((response) => {
		  console.log(response);
		  // alert("Friend Added Successfully!");
		})
		.catch((err) => {
		  console.error(err);
		  // alert("Adding Friend Failed!");
		});
};


const FinalResponse = (props) => {
	const options = [
		{ text: "Sim", handler: () => {addPatient(); props.actionProvider.handleJavascriptList("sim_final")}, id: 1 },
		{ text: "Não", handler: () => {props.actionProvider.handleJavascriptList("nao_final")}, id: 2 },
	];

  	const optionsMarkup = options.map((option) => (
		<button
			className="learning-option-button"
			key={option.id}
			onClick={option.handler}
		>
			{option.text}
		</button>
	));

	return <div className="learning-options-container">{optionsMarkup}</div>;
};

export default FinalResponse;