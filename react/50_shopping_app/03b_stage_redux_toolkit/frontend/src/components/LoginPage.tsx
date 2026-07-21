import React,{useState} from 'react';
import User from '../models/User';
import {useDispatch} from 'react-redux';
import type {ThunkDispatch,PayloadAction} from '@reduxjs/toolkit';
import {register,login,setError} from '../store/loginSlice';
import type {AppState} from '../types/states';

interface State {
	username:string;
	password:string;
}


const LoginPage = () => {
	
	const [state,setState] = useState<State>({
		username:"",
		password:""
	})

	const dispatch:ThunkDispatch<AppState,any,PayloadAction> = useDispatch();
	
	const onChange = (event:React.ChangeEvent<HTMLInputElement>) => {
		setState((state) => {
			return {
				...state,
				[event.target.name]:event.target.value
			}
		})
	}
	
	const onRegister = (event:React.SyntheticEvent) => {
		event.preventDefault();
		if(state.username.length < 4 || state.password.length < 8) {
			dispatch(setError("Username must be 4 and password 8 characters long"));
			return;
		}
		const user = new User(state.username,state.password);
		dispatch(register(user));
	}
	
	const onLogin = (event:React.SyntheticEvent) => {
		event.preventDefault();
		if(state.username.length < 4 || state.password.length < 8) {
			dispatch(setError("Username must be 4 and password 8 characters long"));
			return;
		}
		const user = new User(state.username,state.password);
		dispatch(login(user));
	}
	
	return(
		<div style={{"maxWidth":"40%",
					"textAlign":"center",
					"margin":"auto",
					"backgroundColor":"lightblue"}}>
			<form className="m-3">
				<label htmlFor="username" className="form-label">Username</label>
				<input type="text"
						name="username"
						id="username"
						className="form-control"
						onChange={onChange}
						value={state.username}/>
				<label htmlFor="password" className="form-label">Password</label>
				<input type="password"
						name="password"
						id="password"
						className="form-control"
						onChange={onChange}
						value={state.password}/>
				<button onClick={onRegister} className="btn btn-primary">Register</button>
				<button onClick={onLogin} className="btn btn-primary">Login</button>
			</form>
		</div>
	)
}

export default LoginPage;