import {useSelector} from 'react-redux';
import type {AppState} from './types/states';
import ShoppingForm from './components/ShoppingForm';
import ShoppingList from './components/ShoppingList';
import Navbar from './components/Navbar';
import LoginPage from './components/LoginPage';
import {Routes,Route,Navigate} from 'react-router';
function App() {
	
	const stateSelector = (state:AppState) => {
		let error = state.shopping.error;
		if(state.login.error) {
			error = state.login.error;
		}
		return {
			error:error,
			isLogged:state.login.isLogged,
			loading:state.login.loading
		}
	}
	
	const {error,isLogged,loading} = useSelector(stateSelector);

	let messageArea = <h4 style={{"height":"20px","textAlign":"center"}}></h4>
	if(loading) {
		messageArea = <h4 style={{"height":"20px","textAlign":"center"}}>Loading...</h4>
	}
	if(error) {
		messageArea = <h4 style={{"height":"20px","textAlign":"center"}}>{error}</h4>
	}
	if(isLogged) {
		return (
			<>
				<Navbar />
				{messageArea}
				<Routes>
				<Route path="/" element={<ShoppingList />}/>
				<Route path="/form" element={<ShoppingForm />}/>
				<Route path="*" element={<Navigate to="/"/>}/>
				</Routes>
			</>
		)
	} else {
		return(
			<>
				<Navbar />
				{messageArea}	
				<Routes>
					<Route path="/" element={<LoginPage />}/>
					<Route path="*" element={<Navigate to="/"/>}/>
				</Routes>
			</>
		)
	}
}

export default App
