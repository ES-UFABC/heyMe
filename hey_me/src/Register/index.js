import React from 'react';

function Register() {
	return (
		<div class="register">
			<h1>Registrar-se</h1>
			<div class="links">
				<a href="/login">Logar</a>
				<a href="/register" class="active">Registrar</a>
			</div>
			<form action="/register_back" method="post" autocomplete="off">
				<label for="username">
					<i class="fas fa-user"></i>
				</label>
				<input type="text" name="username" placeholder="Nome de usuário" id="username" required/>
				<label for="password">
					<i class="fas fa-lock"></i>
				</label>
				<input type="password" name="password" placeholder="Senha" id="password" required/>
				<label for="email">
					<i class="fas fa-envelope"></i>
				</label>
				<input type="email" name="email" placeholder="E-mail" id="email" required/>
				<input type="submit" value="Registrar"/>
			</form>
		</div>
	);
}

export default Register;
