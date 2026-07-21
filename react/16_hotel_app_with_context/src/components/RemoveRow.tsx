import Hotel from '../models/Hotel';

interface Props {
	hotel:Hotel;
	remove(id:number):void;
	changeMode(mode:string,index:number):void;
}

const RemoveRow = (props:Props) => {
	
	return(
		<tr>
			<td>{props.hotel.hname}</td>
			<td>{props.hotel.address}</td>
			<td>{props.hotel.city}</td>
			<td>{props.hotel.stars}</td>
			<td>{props.hotel.roomprice}</td>
			<td><button className="btn btn-secondary" onClick={() => props.changeMode("cancel",0)}>Cancel</button></td>
			<td><button className="btn btn-danger" onClick={() => props.remove(props.hotel.id)}>Remove</button></td>
		</tr>
	)
}

export default RemoveRow;