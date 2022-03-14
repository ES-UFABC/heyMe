import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
	const [currentTime, setCurrentTime] = useState(0);
	const [date, setDate] = useState();

	async function getTime() {
        const time = await fetch('/time').then(res => res.json()).then(data => {
			return data.time;
		});
		return time;
	}

	useEffect(() => {
		const fetchTime = async () => {
			const data = await getTime();
			setCurrentTime(data);
		}

		fetchTime();
		setTimeout(function (){
			fetchTime();
		}, 1000);
	});

	return (
		<div className="App">
		<header className="App-header">
			<img src={logo} className="App-logo" alt="logo" />
			<p>
			heyMe is still under development, meanwhile, the page will only show the current time.
			<br/>
			Sorry for any inconveniences.
			</p>
			<p>Current Time = {currentTime}</p>
		</header>
		</div>
	);
}

export default App;
