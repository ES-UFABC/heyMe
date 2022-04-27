import {BrowserRouter as Router, Link, 
	Routes, Route} from 'react-router-dom'
  import './App.css';
  import Login from './Login';
  import Register from './Register';
  import Welcome from './Welcome';
  import Diario from './Diario';
  import Chat from './Chat';
	
  function App() {
	// amazon: https://cors-everywhere.herokuapp.com/http://heymeapi-env-1.eba-5rahmizp.us-east-1.elasticbeanstalk.com
	localStorage.setItem("api-endpoint","https://cors-everywhere.herokuapp.com/http://heymeapi-env-1.eba-5rahmizp.us-east-1.elasticbeanstalk.com");
	localStorage.setItem("api-origin", "https://main.d1w1cxbdfenujy.amplifyapp.com");
	// amazon: "https://main.d1w1cxbdfenujy.amplifyapp.com"
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
		  </Routes>
	   </Router>
	  </div>
	);
  }
	
  export default App;