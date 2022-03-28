import {BrowserRouter as Router, Link, 
	Routes, Route} from 'react-router-dom'
  import './App.css';
  import Login from './Login';
  import Register from './Register';
  import Welcome from './Welcome';
  import Diario from './Diario';
	
  function App() {
	return (
	  <div className="App">
		<Router>
		  <Routes>
			<Route path="/" element={<Login />} />
			<Route path="/login" element={<Login />} />
			<Route path="/register" element={<Register />} />
			<Route path="/welcome" element={<Welcome />} />
			<Route path="/diario" element={<Diario />} />
		  </Routes>
	   </Router>
	  </div>
	);
  }
	
  export default App;