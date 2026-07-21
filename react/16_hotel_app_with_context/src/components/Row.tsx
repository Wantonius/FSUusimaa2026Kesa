import Hotel from '../models/Hotel';

interface Props {
	hotel:Hotel;
	index:number;
	changeMode(mode:string,index:number):void;
}

const Row = (props:Props) => {
	
	return(
		<tr>
			<td>{props.hotel.hname}</td>
			<td>{props.hotel.address}</td>
			<td>{props.hotel.city}</td>
			<td>{props.hotel.stars}</td>
			<td>{props.hotel.roomprice}</td>
			<td><button className="btn btn-danger" onClick={() => props.changeMode("remove",props.index)}>Remove</button></td>
			<td><button className="btn btn-secondary" onClick={() => props.changeMode("edit",props.index)}>Edit</button></td>
		</tr>
	)
}

export default Row;