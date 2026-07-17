import Hotel from '../models/Hotel'

export interface AppState {
	list:Hotel[];
	id:number;
}

export interface Action {
	type:string;
	payload: Hotel | number;
}