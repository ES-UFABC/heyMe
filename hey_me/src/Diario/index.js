import React, { useState, useEffect } from 'react';
// import logo from './logo.svg';
// import './App.css';
// import { Routes, Route, Link } from "react-router-dom";

import { Routes, Route, Link } from "react-router-dom";

function Diario() {
	const [currentTime, setCurrentTime] = useState(0);

	// async function getTime() {
    //     const time = await fetch('/time').then(res => res.json()).then(data => {
	// 		console.log("from the server", data);
	// 		return data.time;
	// 	});
	// 	return time;
	// }

	// function getTeste() {
    //     const time = fetch('/teste').then(res => res.json()).then(data => {
	// 		console.log("from the test", data);
	// 	});
	// }

	// const callTime = useEffect(() => {
	// 	const fetchTime = async () => {
	// 		const data = await getTime();
	// 		console.log('data', data);
	// 		setCurrentTime(data);
	// 	}

	// 	console.log(currentTime);
	// });

	return (
		<div className="Diario">
		<header className="Diario-header">
		<div className="login">
			<h1>Login</h1>
			<div className="links">
				{/* <a href="{{ url_for('login') }}" class="active">Login</a> */}
				<a href="/login" className="active">Login</a>
				<a href="#">Register</a>
			</div>
			{/* <form action="{{ url_for('login') }}" method="post"> */}
			<form action="/login" method="post">
			<label id="iemail">
					<i className="fas fa-user"></i>
				</label>
				<input type="text" name="email" placeholder="Email" id="email" required/>
				<label id="ipassword">
					<i className="fas fa-lock"></i>
				</label>
				<input type="password" name="password" placeholder="Password" id="password" required/>
				{/* <div class="msg">{{ msg }}</div> */}
				{/* {callTime}
				{currentTime != 0 &&
					<input type="text" name="teste time" placeholder={currentTime} id="timetest" required/>
				} */}
				<input type="submit" value="Login"></input>
			</form>
			</div>
		</header>
		</div>
	);
}

export default Diario;