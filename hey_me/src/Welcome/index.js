import React, { useState, useEffect } from "react";
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Welcome() {
	var validate = 2;
	const navigate = useNavigate();
	var patient_load = 2;
	var isTherapist = localStorage.getItem('isTherapist');

	const callNavigate = useEffect(() => {
		if (validate == 0) {
			navigate('/login');
		}
	}, []);

	const callList = useEffect(() => {
	if (terapistload == 2) {
		if (isTherapist) {
			let res = {};
			let config = {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`,
						"Origin": localStorage.getItem('api-origin')
				}
			};

			axios.get(`${localStorage.getItem("api-endpoint")}/patients`, config)
						.then(function(response) {
							res = response.data;
							console.log(res['success']);

							if (res['success'] == true) {
								console.log('patients = ', res['patients']);
								isTherapist = 1;
							}
				//Perform action based on response
					})
					.catch(function(error){
						console.log(error);
				//Perform action based on error
					});
		}
		setterapistload(1);

	}
	}, []);
	
	  if (!localStorage.getItem('token')) {
		validate = 0;
		console.log('validate', validate, 'token = ', localStorage.getItem('token'));
	  }

	const [terapistload, setterapistload] = useState(2);

		return (validate) ? (
			<div className="welcome">
				<Header />
				<h1>Bem-Vindo ao heyMe!</h1>
				{callList}
			</div>
		) : (
			<div>
				{callNavigate}
			</div>
		);
}

export default Welcome;