import React, { useState, useEffect } from "react";
import Chatbot from 'react-chatbot-kit';
import './chatbot.css';
import Header from '../components/Header';
import { useNavigate } from "react-router-dom";

import ActionProvider from './ActionProvider';
import MessageParser from './MessageParser.js';
import config from './config';


function Chat() {
	// var validate = 2;
	// const navigate = useNavigate();

	// const callLogin = useEffect(() => {
	// 	if (validate == 0) {
	// 		navigate('/login');
	// 	}
	// }, []);
	
	// validate = 1;
	// if (!localStorage.getItem('token')) {
	// 	validate = 0;
	// }
	return (
		<div className="App">
			<div>
				<Header />
			</div>
			<header className="App-header">
				<Chatbot config={config} actionProvider={ActionProvider} messageParser={MessageParser} />
			</header>
		</div>
		)
}

export default Chat;