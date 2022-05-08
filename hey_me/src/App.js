import {BrowserRouter as Router, Link, 
	Routes, Route} from 'react-router-dom'
import './App.css';
import Login from './Login';
import Register from './Register';
import Welcome from './Welcome';
import Diario from './Diario';
import Chat from './Chat';
import Messages from './Messages';
import { CometChat } from "@cometchat-pro/chat";

	
function App() {
	const appID = "209080691110ce73";
	const region = "us";
	const appSetting = new CometChat.AppSettingsBuilder()
	  .subscribePresenceForAllUsers()
	  .setRegion(region)
	  .build();
	CometChat.init(appID, appSetting).then(
	  () => {
		console.log("Initialization completed successfully");
		// You can now call login function.
	  },
	  (error) => {
		console.log("Initialization failed with error:", error);
		// Check the reason for error and take appropriate action.
	  }
	);
	// amazon: https://cors-everywhere.herokuapp.com/http://heymeapi-env-1.eba-5rahmizp.us-east-1.elasticbeanstalk.com
	localStorage.setItem("api-endpoint","http://localhost:5000");
	localStorage.setItem("api-origin", "http://localhost:3000");
	// amazon: "https://main.d1w1cxbdfenujy.amplifyapp.com/"
	// local: http://localhost:3000
	return (
	  <div className="App">
		<Router>
		  <Routes>
			<Route path="/" element={<Login />} />
			<Route path="/login" element={<Login />} />
			<Route path="/register" element={<Register />} />
			<Route path="/welcome" element={<Welcome />} />
			<Route path="/diario" element={<Diario />} />
			<Route path="/chat" element={<Chat />} />
			<Route path="/messages" element={<Messages />} />
		  </Routes>
	   </Router>
	  </div>
	);
}
	
  export default App;