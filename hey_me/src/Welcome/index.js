import React, { useState, useEffect } from "react";
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './welcome.css';

var table_data = [];

function RenderTable () {
	// console.log("render table", table_data);
	return <> {
		table_data.map(
			(item)=>{
				return(
					<tr key={item['id']}>
						<td>{item['name']}</td>
						<td>{item['email']}</td>
						<td><i className="fa-solid fa-comment-dots fa-1.5x" style={{color:"rgb(220, 206, 206)"}}></i></td>
					</tr>
				)
			}
		)
	}
	</>
}

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
								table_data = res['patients'];
								isTherapist = 1;
								setterapistload(1);
							}
				//Perform action based on response
					})
					.catch(function(error){
						console.log(error);
				//Perform action based on error
					});
		}
	}
	}, []);
	
	  if (!localStorage.getItem('token')) {
		validate = 0;
		console.log('validate', validate, 'token = ', localStorage.getItem('token'));
	  }

	const [terapistload, setterapistload] = useState(2);

		return (validate) ? (
			<div>
				<div className="welcome">
					<Header />
					<h1>Bem-Vindo ao heyMe!</h1>
					{callList}
				</div>
				<br></br>
					{terapistload == 1 &&
					<div className="tbl-all">
						<div className="tbl-header">
							<table cellpadding="0" cellspacing="0" border="0">
								<thead>
									<tr>
										<th>
											Pacientes
										</th>
										<th>
											Email
										</th>
										<th>
											Chat
										</th>
									</tr>
								</thead>
							</table>
						</div>
  						<div className="tbl-content">
							<table cellpadding="0" cellspacing="0" border="0">
								<tbody>
								{/* <tr>
										<td>
											Pacientes
										</td>
										<td>
											Email
										</td>
										<td>
											Chat
										</td>
									</tr> */}
									<RenderTable/>
								</tbody>
							</table>
						</div>
					</div>				
					}
			</div>
		) : (
			<div>
				{callNavigate}
			</div>
		);
}

export default Welcome;