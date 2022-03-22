import React from 'react';

function Login() {
	return (
		<div className="Login">
			<header className="Login-header">
				<div className="login">
					<h1>Logar</h1>
					<div className="links">
						<a href="/login" className="active">Logar</a>
						<a href="/register">Registrar-se</a>
					</div>
					<form action="/login_back" method="post">
						<label id="iemail">
							<i class="fas fa-envelope"></i>
						</label>
							<input type="text" name="email" placeholder="E-mail" id="email" required/>
							<label id="ipassword">
								<i className="fas fa-lock"></i>
							</label>
							<input type="password" name="password" placeholder="Senha" id="password" required/>
							<input type="submit" value="Logar"></input>
					</form>
				</div>
			</header>
		</div>
	);
}

export default Login;