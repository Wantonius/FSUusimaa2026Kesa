import React,{useState} from 'react';
import ShoppingItem from '../models/ShoppingItem';

interface Props {
	add(item:ShoppingItem):void;
}

interface State {
	type:string;
	count:number;
	price:number;
}

const ShoppingForm = (props:Props) => {

	const [state,setState] = useState<State>({
		type:"",
		count:0,
		price:0
	})
	
	const onChange = (event:React.ChangeEvent<HTMLInputElement>) => {
		setState((state) => {
			return {
				...state,
				[event.target.name]:event.target.value
			}
		})
	}
	
	const onSubmit = (event:React.SyntheticEvent) => {
		event.preventDefault();
		const item = new ShoppingItem(state.type,state.count,state.price,"");
		props.add(item);
		setState({
			type:"",
			count:0,
			price:0
		})
	}
	return(
		<div style={{"maxWidth":"40%",
					"margin":"auto",
					"textAlign":"center",
					"backgroundColor":"green"}}>
			<form className="m-3" onSubmit={onSubmit}>
				<label htmlFor="type" className="form-label">Type</label>
				<input type="text"
						name="type"
						id="type"
						className="form-control"
						value={state.type}
						onChange={onChange}/>
				<label htmlFor="count" className="form-label">Count</label>
				<input type="number"
						name="count"
						id="count"
						className="form-control"
						value={state.count}
						onChange={onChange}/>
				<label htmlFor="price" className="form-label">Price</label>
				<input type="number"
						name="price"
						id="price"
						step="0.01"
						className="form-control"
						value={state.price}
						onChange={onChange}/>
				<input type="submit" value="Add" className="btn btn-secondary"/>
			</form>
		</div>
	)
}

export default ShoppingForm;