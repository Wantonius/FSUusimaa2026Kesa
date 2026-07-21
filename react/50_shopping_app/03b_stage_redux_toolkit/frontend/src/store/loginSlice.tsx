import User from '../models/User';
import type {LoginState,Token,Message} from '../types/states';
import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import {getList} from './shoppingSlice';

const getInitialState = ():LoginState => {
	const temp = sessionStorage.getItem("loginstate");
	if(temp) {
		return JSON.parse(temp)
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

const initialState = getInitialState();

const saveToStorage = (state:LoginState) => {
	sessionStorage.setItem("loginstate",JSON.stringify(state));
}

//ASYNC THUNKS!

export const register = createAsyncThunk("register", async (user:User) => {
	const request = new Request("/register",{
		"method":"POST",
		"headers":{
			"Content-Type":"application/json"
		},
		"body":JSON.stringify(user)
	})
	const response = await fetch(request);
	if(response.ok) {
		return {"message":"Register Success","token":""};
	} else {
		if(response.status === 409) {
			return {"message":"Username already in use","token":""};
		}
		return {"message":"Server responded with a status "+response.status+" "+response.statusText,"token":""}
	}
})

export const login = createAsyncThunk("login", async (user:User,thunkAPI) => {
	const request = new Request("/login",{
		"method":"POST",
		"headers":{
			"Content-Type":"application/json"
		},
		"body":JSON.stringify(user)
	})
	const response = await fetch(request);
	if(response.ok) {
		thunkAPI.dispatch(setUser(user.username));
		const temp = await response.json();
		const data = temp as Token;
		thunkAPI.dispatch(getList(data.token));
		return {
			"message":"Success",
			"token":data.token
		}
	} else {
		return {"message":"Server responded with a status "+response.status+" "+response.statusText,token:""}
	}
})

export const logout = createAsyncThunk("/logout", async(data:Token) => {
	const request = new Request("/logout",{
		"method":"POST",
		"headers":{
			"token":data.token
		}
	})
	const response = await fetch(request);
	if(response.ok) {
		return {"message":"","token":""}
	} else {
		return {"message":"Server responded with an error. Logging you out.","token":""}
	}
})

const loginSlice = createSlice({
	name:"login",
	initialState,
	reducers:{
		setUser:(state,action) => {
			state.user = action.payload as string;
		},
		setError:(state,action) => {
			state.error = action.payload as string;
		},	
		loading:(state,action) => {
			state.loading = true;
		},
		stopLoading:(state,action) => {
			state.loading = false;
		}
	},
	extraReducers:(builder) => {
		builder.addCase(register.pending,(state,action) => {
			state.loading = true
		})
		builder.addCase(register.fulfilled,(state,action) => {
			const message = action.payload as Message;
			state.error = message.message;
			state.loading = false;
			saveToStorage(state);
		})
		builder.addCase(login.pending,(state,action) => {
			state.loading = true
		})
		builder.addCase(login.fulfilled,(state,action) => {
			const message = action.payload as Message;
			state.loading = false;
			if(message.token) {
				state.token = message.token;
				state.isLogged = true;
			} else {
				state.error = message.message
			}
			saveToStorage(state);
		})
		builder.addCase(logout.pending,(state,action) => {
			state.loading = true;
		})
		builder.addCase(logout.fulfilled,(state,action) => {
			const message = action.payload as Message;
			state.error = message.message;
			state.loading = false;
			state.isLogged = false;
			state.token = "";
			state.user = "";
			saveToStorage(state);
		})
	}
})

export const {loading,stopLoading,setError,setUser} = loginSlice.actions;
export default loginSlice.reducer;