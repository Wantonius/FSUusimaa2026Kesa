import ShoppingItem from '../models/ShoppingItem';

export interface LoginState {
	isLogged:boolean;
	loading:boolean;
	token:string;
	user:string;
	error:string;
}

export interface ShoppingState {
	list:ShoppingItem[];
	error:string;
}

export interface AppState {
	shopping:ShoppingState;
	login:LoginState;
}

export interface Message {
	message:string;
	token:string;
}

export interface Token {
	token:string;
}

export interface FetchItem {
	item:ShoppingItem;
	token:string;
}