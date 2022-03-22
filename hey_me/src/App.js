import {BrowserRouter as Router, Link, 
	Routes, Route} from 'react-router-dom'
  import './App.css';
  import Login from './Login';
  import Register from './Register';
	
  function App() {
	return (
	  <div className="App">
		<Router>
		  <nav>
			<Link to="/">Login</Link>
		  </nav>
		  <Routes>
			<Route path="/" element={<Login />} />
			<Route path="/login" element={<Login />} />
			<Route path="/register" element={<Register />} />
		  </Routes>
	   </Router>
	  </div>
	);
  }
	
  export default App;