import React,{useReducer} from 'react';
import ActionContext from './ActionContext';
import AppStateContext from './AppStateContext';
import type {AppState,Action} from '../types/states';
import * as actionConstants from '../types/actionConstants';
import ShoppingItem from '../models/ShoppingItem';

interface Props {
	children:React.ReactNode;
}

const getInitialState = ():AppState => {
	let state = sessionStorage.getItem("state");
	if(state) {
		return JSON.parse(state);
	} else {
		return {
			list:[],
			isLogged:false,
			loading:false,
			error:"",
			token:""
			user:""
		}
	}
}

const initialState = getInitialState();

const saveToStorage = (state:AppState) => {
	sessionStorage.setItem("state",JSON.stringify(state));
}

const listReducer = (state:AppState, action:Action):AppState => {
	switch(action.type) {
		case actionConstants.LOADING:{
			return {
				...state,
				loading:true,
				error:""
			}
		}
		case actionConstants.STOP_LOADING:{
			return {
				...state,
				loading:false
			}
		}
		case actionConstants.FETCH_LIST_SUCCESS:{
			let list:ShoppingItem[] = [];
			if(action.payload) {
				list = action.payload as ShoppingItem[];
			}
			const tempState:AppState = {
				...state,
				list:list
			}
			saveToStorage(tempState);
			return tempState;
		}
		case actionConstants.REGISTER_SUCCESS:{
			const tempState:AppState = {
				...state,
				error:"Register success"
			}
			saveToStorage(tempState);
			return tempState;
		}
		case actionConstants.LOGIN_SUCCESS: {
			let token = "";
			if(action.payload) {
				token = action.payload as string;
			}
			const tempState:AppState = {
				...state,
				isLogged:true,
				token:token
			}
			saveToStorage(tempState);
			return tempState;
		}
		case actionConstants.LOGOUT_SUCCESS: {
			const tempState:AppState = {
				list:[],
				isLogged:false,
				loading:false,
				error:"",
				user:"",
				token:""
			}
			saveToStorage(tempState);
			return tempState;
		}
		case actionConstants.LOGOUT_FAILED: {
			let error = "";
			if(action.payload) {
				error = action.payload as string;
			}
			const tempState:AppState = {
				list:[],
				isLogged:false,
				loading:false,
				error:error,
				token:"",
				user:""
			}
			saveToStorage(tempState);
			return tempState;
		}
		case actionConstants.SET_USER: {
			let user = "";
			if(action.payload) {
				user = action.payload as string;
			}
			const tempState:AppState = {
				...state,
				user:user
			}
			saveToStorage(tempState);
			return tempState;
		}
		case actionConstants.ADD_ITEM_SUCCESS:
		case actionConstants.REMOVE_ITEM_SUCCESS:
		case actionConstants.EDIT_ITEM_SUCCESS:{
			return state;
		}
		case actionConstants.FETCH_LIST_FAILED:
		case actionConstants.REGISTER_FAILED:
		case actionConstants.LOGIN_FAILED:
		case actionConstants.ADD_ITEM_FAILED:
		case actionConstants.REMOVE_ITEM_FAILED:
		case actionConstants.EDIT_ITEM_FAILED: {
			let error = "";
			if(action.payload) {
				error = action.payload as string;
			}
			const tempState:AppState = {
				...state,
				error:error
			}
			saveToStorage(tempState);
			return tempState;
		}
		default:{
			return state;
		}
	}
}

const StateManager = (props:Props) => {
	
	const [state,dispatch] = useReducer(listReducer,initialState);
	
	return(
		<AppStateContext.Provider value={state}>
			<ActionContext.Provider value={{dispatch:dispatch}}>
				{props.children}
			</ActionContext.Provider>
		</AppStateContext.Provider>
	)
}

export default StateManager;