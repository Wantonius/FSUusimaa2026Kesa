import React,{useReducer} from 'react';
import AppStateContext from './AppStateContext';
import ActionContext from './ActionContext';
import type {Action,AppState} from '../types/states';
import * as actionConstants from '../types/actionConstants';
import Hotel from '../models/Hotel';
import type {Reducer} from 'react';

interface Props {
	children:React.ReactNode;
}

const hotelReducer:Reducer<AppState,Action> = (state:AppState,action:Action):AppState => {
	switch(action.type) {
		case actionConstants.ADD_HOTEL: {
			let hotel = action.payload as Hotel;
			hotel.id = state.id;
			return {
				list:state.list.concat(hotel),
				id:state.id+1
			}
		}
		case actionConstants.REMOVE_HOTEL: {
			const tempId = action.payload as number;
			const tempList = state.list.filter(hotel => hotel.id !== tempId);
			return {
				...state,
				list:tempList
			}
		}
		case actionConstants.EDIT_HOTEL: {
			const temp = action.payload as Hotel;
			for(let i=0;i<state.list.length;i++) {
				if(state.list[i].id === temp.id) {
					const tempList = state.list.toSpliced(i,1,temp);
					return {
						...state,
						list:tempList
					}
				}
			}
			return state;
		}
		default: {
			return state;
		}
	}
}

const initialState:AppState = {
	list:[],
	id:100
}

const StateManager = (props:Props) => {
	
	const [state,dispatch] = useReducer(hotelReducer,initialState);

	return(
		<AppStateContext.Provider value={state}>
			<ActionContext.Provider value={dispatch:dispatch}>
				{props.children}
			</ActionContext.Provider>
		</AppStateContext.Provider>
	)
}

export default StateManager;