import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
	const navigate = useNavigate();
	function handleClick() {
		let res = {};
		let sendData = {
			'email': document.getElementById('email').value,
			'password': document.getElementById('password').value,
			'username': document.getElementById('username').value
		};
		let config = {
			header:{
				"Origin": "https://main.d1w1cxbdfenujy.amplifyapp.com/"
			}
		};
		const article = { title: 'React POST Request Example' };
		axios.post(`${localStorage.getItem("api-endpoint")}/register_back`, sendData, config)
			.then(function(response) {
				//Perform action based on response
				// alert(response.data);
				res = response.data;
				console.log(res['success']);
				if (res['success'] == true) {
					navigate('/welcome');
				}
		})
		.catch(function(error){
			//Perform action based on error
			window.confirm('Dados incorretos! Por favor, verifique novamente');
		    console.log(error);
		});
		
	}
	return (
		<div className="register">
			<h1>Registrar-se</h1>
			<div className="links">
				<a href="/login">Logar</a>
				<a href="/register" className="active">Registrar</a>
			</div>
			<form>
				<label for="username">
					<i className="fas fa-user"></i>
				</label>
				<input type="text" name="username" placeholder="Nome" id="username" required/>
				
				<label for="email">
					<i className="fas fa-envelope"></i>
				</label>
				<input type="email" name="email" placeholder="E-mail" id="email" required/>

				<label for="password">
					<i className="fas fa-lock"></i>
				</label>
				<input type="password" name="password" placeholder="Senha" id="password" required/>

				
				<button type="button" name="btnRegister" onClick={handleClick}>Registrar</button>
			</form>
		</div>
	);
}

export default Register;
