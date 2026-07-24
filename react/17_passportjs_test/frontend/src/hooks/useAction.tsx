import {useState,useEffect} from 'react';

interface State {
	greeting:string;
	message:string;
	isLogged:boolean;
	loading:boolean;
}

interface UrlRequest {
	request:Request;
	action:string;
}

interface Message {
	message:string;
}

const useAction = ():{state:State,
					register:(username:string,password:string) => void,
					login:(username:string,password:string) => void,
					logout:() => void,
					getGreeting:() => void} => {
	
	const [state,setState] = useState<State>({
		greeting:"No greeting yet",
		message:"",
		isLogged:false,
		loading:false
	})
	
	const [urlRequest,setUrlRequest] = useState<UrlRequest>({
		request:new Request("",{}),
		action:""
	})
	
	const setLoading = (loading:boolean) => {
		setState((state) => {
			return {
				...state,
				loading:loading,
				message:""
			}
		})
	}
	
	const setMessage = (message:string) => {
		setState((state) => {
			return {
				...state,
				message:message
			}
		})
	}
	
	useEffect(() => {
		
		const fetchData = async () => {
			setLoading(true);
			const response = await fetch(urlRequest.request);
			setLoading(false);
			if(!response) {
				setState({
					greeting:"No greeting yet",
					isLogged:false,
					loading:false,
					message:"Server never responded. Logging you out."
				});
			}
			const temp = await response.json();
			const data = temp as Message;
			if(response.ok) {
				switch(urlRequest.action) {
					case "register":{
						setMessage(data.message);
						return;
					}
					case "login": {
						setState((state) => {
							return {
								...state,
								isLogged:true,
								message:data.message
							}
						})
						return;
					}
					case "logout": {
						setState({
							greeting:"No greeting yet",
							loading:false,
							isLogged:false,
							message:""
						})
						return;
					}
					case "getgreeting":{
						setState((state) => {
							return {
								...state,
								greeting:data.message
							}
						})
						return;
					}
					default:
						return;
				}
			} else {
				switch(urlRequest.action) {
					case "register":
					case "login":
					case "getgreeting": {
						setMessage(data.message);
						return;
					}
					case "logout":{
						setState((state) => {
							return {
								greeting:"No greeting yet",
								loading:false,
								isLogged:false,
								message:data.message
							}
						})
						return;
					}
					default:
						return;
				}
				
			}
		}
		
		fetchData();
		
	},[urlRequest]);

	const register = (username:string,password:string) => {
		const user = {
			"username":username,
			"password":password
		}
		setUrlRequest({
			request:new Request("/register",{
				method:"POST",
				headers:{
					"Content-Type":"application/json"
				},
				body:JSON.stringify(user)
			}),
			action:"register"
		})
	}
	
	const login = (username:string,password:string) => {
		const user = {
			"username":username,
			"password":password
		}
		setUrlRequest({
			request:new Request("/login",{
				method:"POST",
				headers:{
					"Content-Type":"application/json"
				},
				body:JSON.stringify(user)
			}),
			action:"login"
		})
	}	
	
	const logout = () => {
		setUrlRequest({
			request:new Request("/logout",{
				method:"POST"
			}),
			action:"logout"
		})
	}
	
	const getGreeting = () => {
		setUrlRequest({
			request:new Request("/api/greeting"),
			action:"getgreeting"
		})
	}
	
	return {state,register,login,logout,getGreeting}
}

export default useAction;