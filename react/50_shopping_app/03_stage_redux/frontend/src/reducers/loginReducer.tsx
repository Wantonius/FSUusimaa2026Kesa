import * as actionConstants from '../types/actionConstants';
import type {Reducer} from 'redux';
import type {LoginState,Action} from '../types/states';

const getInitialState = ():LoginState => {
	const temp = sessionStorage.getItem("loginstate");
	if(temp) {
		const state:LoginState = JSON.parse(temp) as LoginState;
		return state;
	} else {
		return {
			isLogged:false,
			loading:false,
			token:"",
			user:"",
			error:""
		}
	}
}

const initialState:LoginState = getInitialState();

const saveToStorage = (state:LoginState) => {
	sessionStorage.setItem("loginstate",JSON.stringify(state));
}

const loginReducer:Reducer<LoginState,Action> = (state = initialState,action):LoginState => {
	console.log("LoginReducer, action",action.type);
	switch(action.type) {
		case actionConstants.LOADING: {
			return {
				...state,
				loading:true,
				error:""
			}
		}
		case actionConstants.STOP_LOADING: {
			return {
				...state,
				loading:false
			}
		}
		case actionConstants.REGISTER_SUCCESS: {
			const temp:LoginState = {
				...state,
				error:"Register Success"
			}
			saveToStorage(temp);
			return temp;
		}
		case actionConstants.REGISTER_FAILED:
		case actionConstants.LOGIN_FAILED: {
			let temp = "";
			if(action.payload) {
				temp = action.payload as string;
			}
			const tempState:LoginState = {
				...state,
				error:temp
			}
			saveToStorage(tempState);
			return tempState;
		}
		case actionConstants.LOGIN_SUCCESS: {
			let temp = "";
			if(action.payload) {
				temp = action.payload as string;
			}
			const tempState:LoginState = {
				...state,
				isLogged:true,
				token:temp
			}
			saveToStorage(tempState);
			return tempState;
		}
		case actionConstants.LOGOUT_SUCCESS: {
			const tempState:LoginState = {
				loading:false,
				isLogged:false,
				token:"",
				user:"",
				error:""
			}
			saveToStorage(tempState);
			return tempState;
		}
		case actionConstants.LOGOUT_FAILED: {
			let temp = "";
			if(action.payload) {
				temp = action.payload as string;
			}
			const tempState:LoginState = {
				loading:false,
				isLogged:false,
				token:"",
				user:"",
				error:temp
			}
			saveToStorage(tempState);
			return tempState;
		}
		case actionConstants.SET_USER: {
			let temp = "";
			if(action.payload) {
				temp = action.payload as string;
			}
			const tempState:LoginState = {
				...state,
				user:temp
			}
			saveToStorage(tempState);
			return tempState;
		}
		default: {
			return state;
		}
	}
}

export default loginReducer;