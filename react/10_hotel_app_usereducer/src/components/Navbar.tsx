import {Link} from 'react-router';

const Navbar = () => {
	
	return(
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
			<a className="navbar-brand" style={{marginLeft:10}}>Hotels</a>
			<ul className="navbar-nav">
				<li className="nav-item" style={{marginLeft:10}}>
					<Link to="/" className="nav-link">Hotels</Link>
				</li>
				<li className="nav-item" style={{marginLeft:10}}>
					<Link to="/form" className="nav-link">Add new hotel</Link>
				</li>
			</ul>
		</nav>
	)
}

export default Navbar;