import {Link} from 'react-router';
import {useDispatch,useSelector} from 'react-redux';
import type {ThunkDispatch} from 'redux-thunk';
import type {AppState,Action} from '../types/states';
import {logout} from '../actions/loginActions';


const Navbar = () => {
	
	const dispatch:ThunkDispatch<AppState,any,Action> = useDispatch();
	
	const stateSelector = (state:AppState) => {
		return {
			isLogged:state.login.isLogged,
			token:state.login.token,
			user:state.login.user
		}
	}
	
	const {isLogged,token,user} = useSelector(stateSelector);
	
	if(isLogged) {
		return(
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
				<a className="navbar-brand" style={{marginLeft:10}}>Shopping App</a>
				<ul className="navbar-nav">
					<li className="nav-item" style={{marginLeft:10}}>
						<Link to="/" className="nav-link">Shopping List</Link>
					</li>
					<li className="nav-item" style={{marginLeft:10}}>
						<Link to="/form" className="nav-link">Add new item</Link>
					</li>
					<li className="nav-item" style={{marginLeft:10}}>
						<p style={{"color":"blue"}} className="nav-link">Logged in as {user}</p>
					</li>
					<li className="nav-item" style={{marginLeft:10}}>
						<Link to="/" className="nav-link" onClick={() => dispatch(logout(token))}>Logout</Link>
					</li>
				</ul>
			</nav>
		)
	} else {
		return(
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
				<a className="navbar-brand" style={{marginLeft:10}}>Shopping App</a>
			</nav>
		)
	}
	
}

export default Navbar;