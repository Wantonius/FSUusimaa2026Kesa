import React,{useState} from 'react';
import Hotel from '../models/Hotel';

interface Props {
	hotel:Hotel;
	changeMode(mode:string,index:number):void;
	edit(hotel:Hotel):void;
}

interface State {
	hname:string;
	address:string;
	city:string;
	stars:0 | 1 | 2 | 3 | 4 | 5;
	roomprice:number;
}

const EditRow = (props:Props) => {
	
	const [state,setState] = useState<State>({
		hname:props.hotel.hname,
		address:props.hotel.address,
		city:props.hotel.city,
		stars:props.hotel.stars,
		roomprice:props.hotel.roomprice
	})
	
	const onChange = (event:React.ChangeEvent<HTMLInputElement>) => {
		setState((state) => {
			return {
				...state,
				[event.target.name]:event.target.value
			}
		})
	}

	const edit = () => {
		const hotel = new Hotel(state.hname,state.address,state.city,state.stars,state.roomprice,props.hotel.id);
		props.edit(hotel);
	}
	
	return(
		<tr>
			<td><input type="text"
						name="hname"
						id="hname"
						className="form-control"
						onChange={onChange}
						value={state.hname}/></td>
			<td><input type="text"
						name="address"
						id="address"
						className="form-control"
						onChange={onChange}
						value={state.address}/></td>
			<td><input type="text"
						name="city"
						id="city"
						className="form-control"
						onChange={onChange}
						value={state.city}/></td>
			<td><input type="number"
						name="stars"
						id="stars"
						className="form-control"
						min="0"
						max="5"
						onChange={onChange}
						value={state.stars}/></td>
			<td><input type="number"
						name="roomprice"
						id="roomprice"
						className="form-control"
						onChange={onChange}
						value={state.roomprice}/></td>
			<td><button onClick={edit} className="btn btn-success">Save</button></td>
			<td><button onClick={() => props.changeMode("cancel",0)} className="btn btn-secondary">Cancel</button></td>
		</tr>
	)
}

export default EditRow;