import React,{useState} from 'react';
import Hotel from '../models/Hotel';
import useAction from '../hooks/useAction';

interface State {
	hname:string;
	address:string;
	city:string;
	stars:0 | 1 | 2 | 3 | 4 | 5;
	roomprice:number;
}

const HotelForm = () => {
	
	const [state,setState] = useState<State>({
		hname:"",
		address:"",
		city:"",
		stars:0,
		roomprice:0
	})
	
	const {addHotel} = useAction();
	
	const onChange = (event:React.ChangeEvent<HTMLInputElement>) => {
		setState((state) => {
			return {
				...state,
				[event.target.name]:event.target.value
			}
		});
	}
	
	const onSubmit = (event:React.SyntheticEvent) => {
		event.preventDefault();
		const hotel = new Hotel(state.hname,state.address,state.city,state.stars,state.roomprice,0);
		addHotel(hotel);
		setState({
			hname:"",
			address:"",
			city:"",
			stars:0,
			roomprice:0
		})
	}
	
	return(
		<div style={{"maxWidth":"40%",
					"margin":"auto",
					"textAlign":"center",
					"backgroundColor":"lightgreen"}}>
			<form onSubmit={onSubmit} className="m-3">
				<label htmlFor="hname" className="form-label">Hotel Name</label>
				<input type="text"
						name="hname"
						id="hname"
						className="form-control"
						onChange={onChange}
						value={state.hname}/>
				<label htmlFor="address" className="form-label">Address</label>
				<input type="text"
						name="address"
						id="address"
						className="form-control"
						onChange={onChange}
						value={state.address}/>
				<label htmlFor="city" className="form-label">City</label>
				<input type="text"
						name="city"
						id="city"
						className="form-control"
						onChange={onChange}
						value={state.city}/>
				<label htmlFor="stars" className="form-label">Stars</label>
				<input type="number"
						name="stars"
						id="stars"
						className="form-control"
						min="0"
						max="5"
						onChange={onChange}
						value={state.stars}/>
				<label htmlFor="roomprice" className="form-label">Room Price</label>
				<input type="number"
						name="roomprice"
						id="roomprice"
						className="form-control"
						onChange={onChange}
						value={state.roomprice}/>
				<input type="submit" className="btn btn-primary" value="Add"/>
			</form>
		</div>
	)
}

export default HotelForm;