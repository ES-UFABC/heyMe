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
		let config = {
			header:{
				"Origin": localStorage.getItem("api-origin")
			}
		};
		axios.post(`${localStorage.getItem("api-endpoint")}/login_back`, sendData, config)
            .then(function(response){
				res = response.data;
                console.log(res['success']);

				if (res['success'] == true) {
					localStorage.setItem('token', res['access_token']);
					localStorage.setItem('isTherapist', res['isTherapist']);
					console.log('token on login', res['access_token']);
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
				{/* <div className="LogoLR">
					<img src={require("../assets/psychology.png")}/>
					<h3>HeyMe</h3>
				</div> */}
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