import React from "react";

import "./LearningOptions.css";

const LearningOptions = (props) => {
	const options = [
		{ text: "Sim", handler: () => {props.actionProvider.handleJavascriptList("sim")}, id: 1 },
		{ text: "Não", handler: () => {props.actionProvider.handleJavascriptList("nao")}, id: 2 },
		{ text: "Já disse que sim", handler: () => {props.actionProvider.handleJavascriptList("ja sim")}, id: 3 },
		{ text: "Já disse que não", handler: () => {props.actionProvider.handleJavascriptList("ja nao")}, id: 4 },
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

export default LearningOptions;