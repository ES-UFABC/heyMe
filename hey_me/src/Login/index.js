import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CometChat } from "@cometchat-pro/chat";


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