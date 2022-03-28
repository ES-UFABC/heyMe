import React, { useState, useEffect } from "react";
import { callApi } from './main';
import Header from '../components/Header';

function Diario() {
	const callNavigate = useEffect(() => {
		callApi();
	}, []);

	return (
			<div>
				<div>
					<Header />
				</div>
				<br/><br/><br/>
				<div>
					<div className="notes" id="app">
					{callNavigate}
				</div>
				</div>
			</div>
	);
}

export default Diario;