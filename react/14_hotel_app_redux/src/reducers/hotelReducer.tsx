import type {AppState,Action} from '../types/states';
import * as actionConstants from '../types/actionConstants';
import Hotel from '../models/Hotel';
import type {Reducer} from 'redux';

const initialState:AppState = {
	list:[],
	id:100
}

const hotelReducer:Reducer<AppState,Action> = (state = initialState,action):AppState => {
	switch(action.type) {
		case actionConstants.ADD_HOTEL: {
			const temp = action.payload as Hotel;
			temp.id = state.id;
			return {
				list:state.list.concat(temp),
				id:state.id+1
			}
		}
		case actionConstants.REMOVE_HOTEL: {
			const temp_id = action.payload as number;
			const tempList = state.list.filter(hotel => hotel.id !== temp_id);
			return {
				...state,
				list:tempList
			}
		}
		case actionConstants.EDIT_HOTEL: {
			const temp = action.payload as Hotel;
			for(let i=0;i<state.list.length;i++) {
				if(state.list[i].id === temp.id) {
					const tempList = state.list.toSpliced(i,1,temp)
					return {
						...state,
						list:tempList
					}
				}
			}
			return state;
		}
		default:{ 
			return state;
		}
	}
}

export default hotelReducer;