import Hotel from '../models/Hotel';
import * as actionConstants from '../types/actionConstants';

export const addHotel = (hotel:Hotel) => {
	return {
		type:actionConstants.ADD_HOTEL,
		payload:hotel
	}
}

export const removeHotel = (id:number) => {
	return {
		type:actionConstants.REMOVE_HOTEL,
		payload:id
	}
}

export const editHotel = (hotel:Hotel) => {
	return {
		type:actionConstants.EDIT_HOTEL,
		payload:hotel
	}
}