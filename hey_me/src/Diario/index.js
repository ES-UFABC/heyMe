import React, { useState, useEffect } from "react";
import { callApi } from './main';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

function Diario() {
	var validate = 2;
	const navigate = useNavigate();

	const callNavigate = useEffect(() => {
		if (validate != 0) {
			callApi();
		}
	}, []);

	const callLogin = useEffect(() => {
		if (validate == 0) {
			navigate('/login');
		}
	}, []);
	
	validate = 1;
	if (!localStorage.getItem('token')) {
		validate = 0;
	}
	console.log('validate',validate);
	if (validate == 1) {
		return (
			<div>
			<div>
				<Header />
			</div>
			<br/><br/><br/>
			<div>
				<div className="notes" id="app">
					{callNavigate}
				</div>
			</div>
		</div>
		);
	}
	else if (validate == 0) {
		return (
			<div>
				{callLogin}
			</div>
		);
	}
	else {
		return null;
	}

}

export default Diario;