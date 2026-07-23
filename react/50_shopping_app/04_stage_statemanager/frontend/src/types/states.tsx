import ShoppingItem from '../models/ShoppingItem';

export interface AppState {
	list:ShoppingItem[];
	error:string;
	token:string;
	user:string;
	loading:boolean;
	isLogged:boolean;
}

export interface Action {
	type:string;
	payload?: ShoppingItem[] | string;
}