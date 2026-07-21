import ShoppingItem from '../models/ShoppingItem';
import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import type {ShoppingState,FetchItem,Message} from '../types/states';
import {logout,loading,stopLoading} from './loginSlice';

const getInitialState = ():ShoppingState => {
	const state = sessionStorage.getItem("shoppingstate");
	if(state) {
		return JSON.parse(state);
	} else {
		return {
			list:[],
			error:""
		}
	}
}

const saveToStorage = (state:ShoppingState) =>  {
	sessionStorage.setItem("shoppingstate",JSON.stringify(state));
}

//ASYNC THUNKS

export const getList = createAsyncThunk("getlist",async (token:string,thunkAPI) => {
	const request = new Request("/api/shopping",{
		"headers":{
			"token":token
		}
	})
	thunkAPI.dispatch(loading());
	const response = await fetch(request);
	thunkAPI.dispatch(stopLoading());
	if(response.ok) {
		const temp = await response.json();
		const list = temp as ShoppingItem[];
		return list;
	} else {
		if(response.status === 403) {
			thunkAPI.dispatch(logout({
				"message":"Your session has expired",
				"token":token
			}))
			return {"message":"","token":""}
		}
		return {"message":"Server responded with a status "+response.status+" "+response.statusText,"token":""}
	}
})

export const addItem = createAsyncThunk("additem",async (data:FetchItem,thunkAPI) => {
	const request = new Request("/api/shopping",{
		"method":"POST",
		"headers":{
			"Content-Type":"application/json",
			"token":data.token
		},
		"body":JSON.stringify(data.item)
	})
	thunkAPI.dispatch(loading());
	const response = await fetch(request);
	thunkAPI.dispatch(stopLoading());
	if(response.ok) {
		thunkAPI.dispatch(getList(data.token));
		return {"message":"","token":""}
	} else {
		if(response.status === 403) {
			thunkAPI.dispatch(logout({
				"message":"Your session has expired",
				"token":data.token
			}))
			return {"message":"","token":""}
		} 
		return {"message":"Server responded with a status "+response.status+" "+response.statusText,"token":""}
	}
})

export const removeItem = createAsyncThunk("removeitem", async (data:Message,thunkAPI) => {
	const request = new Request("/api/shopping/"+data.message,{
		"method":"DELETE",
		"headers":{
			"token":data.token
		}
	})
	thunkAPI.dispatch(loading());
	const response = await fetch(request);
	thunkAPI.dispatch(stopLoading());
	if(response.ok) {
		thunkAPI.dispatch(getList(data.token));
		return {"message":"","token":""}
	} else {
		if(response.status === 403) {
			thunkAPI.dispatch(logout({
				"message":"Your session has expired",
				"token":data.token
			}))
			return {"message":"","token":""}
		} 
		return {"message":"Server responded with a status "+response.status+" "+response.statusText,"token":""}
	}
})

export const editItem = createAsyncThunk("edititem", async (data:FetchItem,thunkAPI) => {
	const request = new Request("/api/shopping/"+data.item.id,{
		"method":"PUT",
		"headers":{
			"Content-Type":"application/json",
			"token":data.token
		},
		"body":JSON.stringify(data.item)
	})
	thunkAPI.dispatch(loading());
	const response = await fetch(request);
	thunkAPI.dispatch(stopLoading());
	if(response.ok) {
		thunkAPI.dispatch(getList(data.token));
		return {"message":"","token":""}
	} else {
		if(response.status === 403) {
			thunkAPI.dispatch(logout({
				"message":"Your session has expired",
				"token":data.token
			}))
			return {"message":"","token":""}
		} 
		return {"message":"Server responded with a status "+response.status+" "+response.statusText,"token":""}
	}	
})