import {useContext} from 'react';
import ActionContext from '../context/ActionContext';
import Hotel from '../models/Hotel';
import * as actionConstants from '../types/actionConstants';

const useAction = ():{addHotel:(hotel:Hotel) => void,
						removeHotel:(id:number) => void,
						editHotel:(hotel:Hotel) => void} => {
	
	const {dispatch} = useContext(ActionContext);
	
	const addHotel = (hotel:Hotel) => {
		dispatch({
			type:actionConstants.ADD_HOTEL,
			payload:hotel
		})
	};
	
	const removeHotel = (id:number) => {
		dispatch({
			type:actionConstants.REMOVE_HOTEL,
			payload:id
		})
	}
	
	const editHotel = (hotel:Hotel) => {
		dispatch({
			type:actionConstants.EDIT_HOTEL,
			payload:hotel
		})
	}
	
	return {addHotel,removeHotel,editHotel}
}

export default useAction;