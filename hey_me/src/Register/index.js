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
		const article = { title: 'React POST Request Example' };
		axios.post('/register_back', sendData)
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
			console.log(error);
		});
		
	}
	return (
		<div class="register">
			<h1>Registrar-se</h1>
			<div class="links">
				<a href="/login">Logar</a>
				<a href="/register" class="active">Registrar</a>
			</div>
			<form>
				<label for="username">
					<i className="fas fa-user"></i>
				</label>
				<input type="text" name="username" placeholder="Nome de usuário" id="username" required/>
				<label for="password">
					<i className="fas fa-lock"></i>
				</label>
				<input type="password" name="password" placeholder="Senha" id="password" required/>
				<label for="email">
					<i className="fas fa-envelope"></i>
				</label>
				<input type="email" name="email" placeholder="E-mail" id="email" required/>
				<button type="button" name="btnRegister" onClick={handleClick}>Registrar</button>
			</form>
		</div>
	);
}

export default Register;
