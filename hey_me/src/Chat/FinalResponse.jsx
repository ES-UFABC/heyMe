import React from "react";

import "./LearningOptions.css";

const FinalResponse = (props) => {
	const options = [
		{ text: "Sim", handler: () => {props.actionProvider.handleJavascriptList("sim_final")}, id: 1 },
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