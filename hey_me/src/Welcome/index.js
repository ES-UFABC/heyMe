import React, { useState, useEffect } from "react";
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';

function Welcome() {
	var validate = 2;
	const navigate = useNavigate();

	const callNavigate = useEffect(() => {
		if (validate == 0) {
			navigate('/login');
		}
	}, []);
	
	validate = 1;
	  if (!localStorage.getItem('token')) {
		validate = 0;
		console.log('validate', validate, 'token = ', localStorage.getItem('token'));
	  }
	// if (validate) {
		// console.log('welcome page');
		return (validate) ? (
			<div className="welcome">
				<Header />
				<h1>Bem-Vindo ao heyMe!</h1>
			</div>
		) : (
			<div>
				{callNavigate}
			</div>
		);
	// }
	// else {
	// 	console.log("no token found!");
	// 	return (
	// 		<div>
	// 			{!validate && callNavigate}
	// 		</div>
	// 	);
	// }
}

export default Welcome;
