import {useState} from 'react';
import Hotel from '../models/Hotel';
import Row from './Row';
import RemoveRow from './RemoveRow';
import EditRow from './EditRow';
import {useDispatch,useSelector} from 'react-redux';
import {removeHotel,editHotel} from '../actions/hotelActions';
import type {AppState} from '../types/states';

interface State {
	removeIndex:number;
	editIndex:number;
}

const HotelList = () => {
	
	const [state,setState] = useState<State>({
		removeIndex:-1,
		editIndex:-1
	})
	
	const dispatch = useDispatch();
	
	const listSelector = (state:AppState) => state.list
	
	const list = useSelector(listSelector);
	
	const changeMode = (mode:string,index:number) => {
		switch(mode) {
			case "remove":{
				setState({
					removeIndex:index,
					editIndex:-1
				})
				return;
			}
			case "edit":{
				setState({
					removeIndex:-1,
					editIndex:index
				})
				return;
			}
			case "cancel":{
				setState({
					removeIndex:-1,
					editIndex:-1
				})
				return;
			}
			default:
				return;
		}
	}
	
	const remove = (id:number) => {
		dispatch(removeHotel(id));
		changeMode("cancel",0);
	}
	
	const edit = (hotel:Hotel) => {
		dispatch(editHotel(hotel));
		changeMode("cancel",0);
	}
	
	const hotels = list.map((hotel,index) => {
		if(state.removeIndex === index) {
			return(
				<RemoveRow key={hotel.id} hotel={hotel} changeMode={changeMode} remove={remove}/>
			)
		}
		if(state.editIndex === index) {
			return(
				<EditRow key={hotel.id} hotel={hotel} changeMode={changeMode} edit={edit}/>
			)
		}
		return(
			<Row key={hotel.id} hotel={hotel} index={index} changeMode={changeMode}/>
		)
	})
	return(
		<table className="table table-striped">
			<thead>
				<tr>
					<th>Hotel Name</th>
					<th>Address</th>
					<th>City</th>
					<th>Stars</th>
					<th>Room Price</th>
					<th>Remove</th>
					<th>Edit</th>
				</tr>
			</thead>
			<tbody>
			{hotels}
			</tbody>
		</table>
	)
}

export default HotelList;