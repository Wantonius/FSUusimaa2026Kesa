import React,{useState} from 'react';
import ShoppingItem from '../models/ShoppingItem';

interface Props {
	item:ShoppingItem;
	changeMode(mode:string,index:number):void;
	edit(item:ShoppingItem):void;
}

interface State {
	type:string;
	count:number;
	price:number;
}

const EditRow = (props:Props) => {
	
	const [state,setState] = useState<State>({
		type:props.item.type,
		count:props.item.count,
		price:props.item.price
	})
	
	const onChange = (event:React.ChangeEvent<HTMLInputElement>) => {
		setState((state) => {
			return {
				...state,
				[event.target.name]:event.target.value
			}
		})
	}
	
	const editItem = () => {
		const item = new ShoppingItem(state.type,state.count,state.price,props.item.id);
		props.edit(item)
	}
	return(
		<tr>
			<td><input type="text"
						name="type"
						id="type"
						className="form-control"
						value={state.type}
						onChange={onChange}/></td>
			<td><input type="number"
						name="count"
						id="count"
						className="form-control"
						value={state.count}
						onChange={onChange}/></td>
			<td><input type="number"
						name="price"
						id="price"
						step="0.01"
						className="form-control"
						value={state.price}
						onChange={onChange}/></td>
			<td><button onClick={editItem} className="btn btn-success">
			Save</button></td>
			<td><button onClick={() => props.changeMode("cancel",0)} 
			className="btn btn-secondary">Cancel</button></td>
		</tr>
	)
}

export default EditRow;