import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
	function handleClick() {
		let res = {};
		let sendData = {
			'email': document.getElementById('email').value,
			'password': document.getElementById('password').value
		};
		const article = { title: 'React POST Request Example' };
		axios.post('/login_back', sendData)
            .then(function(response){
				alert(response.data);
				res = response.data;
                console.log(res['success']);
				if (res['success'] == true) {
					navigate('/welcome');
				}
       //Perform action based on response
        })
        .catch(function(error){
            console.log(error);
       //Perform action based on error
        });
		
	}
	const navigate = useNavigate();
	return (
		<div className="Login">
			<header className="Login-header">
				<div className="login">
					<h1>Logar</h1>
					<div className="links">
						<a href="/login" className="active">Logar</a>
						<a href="/register">Registrar-se</a>
					</div>
					<form>
						<label id="iemail">
							<i className="fas fa-envelope"></i>
						</label>
							<input type="text" name="email" placeholder="E-mail" id="email" required/>
							<label id="ipassword">
								<i className="fas fa-lock"></i>
							</label>
							<input type="password" name="password" placeholder="Senha" id="password" required/>
							<button type="button" name="btnLogin" onClick={handleClick}>Logar</button>
					</form>
				</div>
			</header>
		</div>
	);
}

export default Login;