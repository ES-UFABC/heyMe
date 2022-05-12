import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CometChat } from "@cometchat-pro/chat";

function handleClickLogin() {
	let res = {};
	let sendData = {
		'email': document.getElementById('email').value,
		'password': document.getElementById('password').value
	};
	let config = {
		header:{
			"Origin": localStorage.getItem("api-origin")
		}
	};

	var ustr = (document.getElementById('email').value);
	var UID =  ustr.substring(0, ustr.indexOf('@'));
	var authKey = "8f1ed710ae8fbed4da3f774ed784e1458c18f4a1";


	CometChat.login(UID, authKey).then(
	  (User) => {
		console.log("Login Successful:", { User });
		localStorage.setItem("userid", User.uid);
		localStorage.setItem("useremail", UID);
	  },
	  (error) => {
		console.log("Login failed with exception:", { error });
		// User login failed, check error and take appropriate action.
	  }
	);

	axios.post(`${localStorage.getItem("api-endpoint")}/login_back`, sendData, config)
		.then(function(response){
			res = response.data;
			console.log(res['success']);

			if (res['success'] == true) {
				localStorage.setItem('token', res['access_token']);
				localStorage.setItem('isTherapist', res['isTherapist']);
				console.log('login type', res['isTherapist']);
			}
   //Perform action based on response
	})
	.catch(function(error){
		console.log(error);
   //Perform action based on error
	});
	
}

function Switch({ isOn, handleToggle }) {
	return (
	  <>
		<input
		  checked={isOn}
		  onChange={handleToggle}
		  className="react-switch-checkbox"
		  id={`react-switch-new`}
		  type="checkbox"
		/>
		<label
		  style={{ background: isOn && '#06D6A0' }}
		  className="react-switch-label"
		  htmlFor={`react-switch-new`}
		>
		  <span className={`react-switch-button`} />
		</label>
	  </>
	);
  }

function Register() {
	const navigate = useNavigate();
	function handleClick() {
		let res = {};
		let sendData = {
			'email': document.getElementById('email').value,
			'password': document.getElementById('password').value,
			'username': document.getElementById('username').value,
			'is_therapist': (value) ? "True" : "False",
			'crp': (value) ? document.getElementById('crp').value : null
		};
		let config = {
			header:{
				"Origin": localStorage.getItem("api-origin")
			}
		};

		let authKey = "8f1ed710ae8fbed4da3f774ed784e1458c18f4a1";
		var ustr = (document.getElementById('email').value);
		var uid = ustr.substring(0, ustr.indexOf('@'));
		// var name = document.getElementById('username').value;

		var user = new CometChat.User(uid);

		user.setName(document.getElementById('username').value);

		CometChat.createUser(user, authKey).then(
			user1 => {
				console.log("user created", user1);
				localStorage.setItem("userid", user1.uid);
				localStorage.setItem("useremail", ustr);
			},error => {
				console.log("uid", uid, " user ", user);
				console.log("error", error);
			}
		)
		
		axios.post(`${localStorage.getItem("api-endpoint")}/register_back`, sendData, config)
			.then(function(response) {
				//Perform action based on response
				// alert(response.data);
				res = response.data;
				console.log(res['success']);
				if (res['success'] == true) {
					handleClickLogin();
					navigate('/welcome');
				}
		})
		.catch(function(error){
			//Perform action based on error
			window.confirm('Dados incorretos! Por favor, verifique novamente');
		    console.log(error);
		});

		
	}
	const [value, setValue] = useState(false);
	return (
		<div className="register">
			<table className="Logo2">
				<tbody>
				<tr>
					<td>
					<img src={require("../assets/psychology.png")} alt="logo_login"/>
					</td>
				</tr>
				<tr>
					<td style={{verticalAlign: 'top', borderTop: '400px', marginTop: 20}}>
						<h2 className='titulo'>
							<br style={{display: 'block', content: "", marginTop: 23}}
						/>&nbsp;HeyMe</h2>
					</td>
					</tr>
				</tbody>
			</table>
			<h1></h1>
			<div className="links">
				<a href="/login">Logar</a>
				<a href="/register" className="active">Registrar</a>
				<Switch
					isOn={value}
					handleToggle={() => setValue(!value)} />
				{!value && <a>Paciente</a>}
				{value && <a>Psicólogo(a)</a>}
			</div>
			<form>
				<label id="lusername">
					<i className="fas fa-user"></i>
				</label>
				<input type="text" name="username" placeholder="Nome" id="username" required/>
				
				<label id="lemail">
					<i className="fas fa-envelope"></i>
				</label>
				<input type="email" name="email" placeholder="E-mail" id="email" required/>

				{value && 
					<>
						<label id="lcrp">
							<i className="fa-solid fa-notes-medical"></i>
						</label>
						<input type="text" pattern="[0-9]*" name="crp" placeholder="CRP" id="crp" required/>
					</>
				}

				<label id="lpassword">
					<i className="fas fa-lock"></i>
				</label>
				<input type="password" name="password" placeholder="Senha" id="password" required/>
				
				<button type="button" name="btnRegister" onClick={handleClick}>Registrar</button>
			</form>
		</div>
	);
}

export default Register;
