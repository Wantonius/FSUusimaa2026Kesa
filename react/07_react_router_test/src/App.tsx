import Home from './components/Home';
import About from './components/About';
import Secret from './components/Secret';
import {Link,Routes,Route,Navigate} from 'react-router';

function App() {
 
	return (
		<>
			<ul style={{"listStyleType":"none"}}>
				<li><Link to="/">Home</Link></li>
				<li><Link to="/about">About</Link></li>
			</ul>
			<Routes>
				<Route path="/" element={<Home/>}/>
				<Route path="/about" element={<About/>}/>
				<Route path="/secret" element={<Secret/>}/>
				<Route path="*" element={<Navigate to="/"/>}/>
			</Routes>
		</>
	)
}

export default App
