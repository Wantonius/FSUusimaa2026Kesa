import {useState,useEffect} from 'react';
import ShoppingItem from '../models/ShoppingItem';
import User from '../models/User';

interface State {
	list:ShoppingItem[];
	isLogged:boolean;
	loading:boolean;
	error:string;
	token:string;
	user:string;	
}

interface UrlRequest {
	request:Request;
	action:string;
}

interface Token {
	token:string;
}

const useAction = ():{state:State,
					  add:(item:ShoppingItem) => void,
					  remove:(id:string) => void,
					  edit:(item:ShoppingItem) => void,
					  register:(user:User) => void,
					  login:(user:User) => void,
					  logout:() => void} => {
	
	const [state,setState] = useState<State>({
		list:[],
		isLogged:false,
		loading:false,
		error:"",
		token:"",
		user:""
	})
	
	const [urlRequest,setUrlRequest] = useState<UrlRequest>({
		request:new Request("",{}),
		action:""
	})
	
	//HELPER FUNCTIONS TO CONTROL State
	
	const saveToStorage = (state:State) => {
		sessionStorage.setItem("state",JSON.stringify(state));
	}
	
	const setLoading = (loading:boolean) => {
		setState((state) => {
			return {
				...state,
				error:"",
				loading:loading
			}
		})
	}
	
	const setError = (error:string) => {
		setState((state) => {
			const tempState:State = {
				...state,
				error:error
			}
			saveToStorage(tempState);
			return tempState;
		})
	}
	
	const setUser = (user:string) => {
		setState((state) => {
			const tempState:State = {
				...state,
				user:user
			}
			saveToStorage(tempState);
			return tempState;
		})
	}
	
	const clearState = (error:string) => {
		const tempState:State = {
			list:[],
			isLogged:false,
			loading:false,
			error:error,
			token:"",
			user:""
		}
		saveToStorage(tempState);
		setState(tempState);
	}
	
	useEffect(() => {
		const temp = sessionStorage.getItem("state");
		if(temp) {
			const state:State = JSON.parse(temp);
			setState(state);
			if(state.isLogged) {
				getList(state.token);
			}
		}
	},[]);
	
	useEffect(() => {
		
		const fetchData = async () => {
			setLoading(true);
			const response = await fetch(urlRequest.request);
			setLoading(false);
			if(!response) {
				setError("Server did not respond");
				return;
			}
			if(response.ok) {
				switch(urlRequest.action) {
					case "getlist": {
						const temp = await response.json();
						if(!temp) {
							setError("Failed to parse shopping list. Try again later.");
							return;
						}
						const list = temp as ShoppingItem[];
						setState((state) => {
							const tempState:State = {
								...state,
								list:list
							}
							saveToStorage(tempState);
							return tempState;
						})
						return;
					}
					case "additem": 
					case "removeitem": 
					case "edititem": {
						getList(state.token);
						return;
					}
					case "register": {
						setError("Register success");
						return;
					}
					case "login": {
						const token = await response.json();
						if(!token) {
							setError("Failed to parse login information. Try again later.");
							return;
						}
						const data = token as Token;
						setState((state) => {
							const tempState:State = {
								...state,
								isLogged:true,
								token:data.token
							}
							saveToStorage(tempState);
							return tempState;
						})
						getList(data.token);
						return;
					}
					case "logout": {
						clearState("");
						return;
					}
					default:{
						return;
					}
				}
			} else {
				if(response.status === 403) {
					clearState("Your session has expired");
					return;
				}
				const errorMessage = " Server responded with a status "+response.status+" "+response.statusText
				switch(urlRequest.action) {
					case "getlist":
						setError("Failed to fetch shopping list."+errorMessage);
						return;
					case "additem":
						setError("Failed to add new item."+errorMessage);
						return;
					case "removeitem":
						setError("Failed to remove item."+errorMessage);
						return;
					case "edititem":
						setError("Failed to update item."+errorMessage);
						return;
					case "register":
						if(response.status === 409) {
							setError("Register failed. Username already in use");
							return;
						}
						setError("Register failed."+errorMessage);
						return;
					case "login":
						setError("Login failed."+errorMessage);
						return;
					case "logout":
						clearState("Server responded with an error. Logging you out.");
						return;
					default:
						return;
				}
			}
			
		}
		
		fetchData();
		
	},[urlRequest])

	const getList = (token:string) => {
		setUrlRequest({
			request:new Request("/api/shopping",{
				headers:{
					"token":token
				}
			}),
			action:"getlist"
		})
	}
	
	const add = (item:ShoppingItem) => {
		setUrlRequest({
			request:new Request("/api/shopping",{
				"method":"POST",
				"headers":{
					"Content-Type":"application/json",
					"token":state.token
				},
				"body":JSON.stringify(item)
			}),
			action:"additem"
		})
	}
	
	const remove = (id:string) => {
		setUrlRequest({
			request:new Request("/api/shopping/"+id,{
				"method":"DELETE",
				"headers":{
					"token":state.token
				}
			}),
			action:"removeitem"
		})
	}
	
	const edit = (item:ShoppingItem) => {
		setUrlRequest({
			request:new Request("/api/shopping/"+item.id,{
				"method":"PUT",
				"headers":{
					"Content-Type":"application/json",
					"token":state.token
				},
				"body":JSON.stringify(item)
			}),
			action:"edititem"
		})
	}
	
	const register = (user:User) => {
		setUrlRequest({
			request: new Request("/register",{
				"method":"POST",
				"headers":{
					"Content-Type":"application/json"
				},
				"body":JSON.stringify(user)
			}),
			action:"register"
		})
	}
	
	const login = (user:User) => {
		setUser(user.username);
		setUrlRequest({
			request: new Request("/login",{
				"method":"POST",
				"headers":{
					"Content-Type":"application/json"
				},
				"body":JSON.stringify(user)
			}),
			action:"login"
		})
	}
	
	const logout = () => {
		setUrlRequest({
			request:new Request("/logout",{
				"method":"POST",
				"headers":{
					"token":state.token
				}
			}),
			action:"logout"
		})
	}
	
	return {state,add,remove,edit,register,login,logout};
}

export default useAction;