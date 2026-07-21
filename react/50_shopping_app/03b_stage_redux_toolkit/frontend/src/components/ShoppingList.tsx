import {useState} from 'react';
import ShoppingItem from '../models/ShoppingItem';
import Row from './Row';
import RemoveRow from './RemoveRow';
import EditRow from './EditRow';
import {removeItem,editItem} from '../actions/shoppingActions';
import {useDispatch,useSelector} from 'react-redux';
import type {AppState,Action} from '../types/states';
import type {ThunkDispatch} from 'redux-thunk';

interface State {
	removeIndex:number;
	editIndex:number;
}

const ShoppingList = () => {
	
	const dispatch:ThunkDispatch<AppState,any,Action> = useDispatch();
	
	const stateSelector = (state:AppState) => {
		return {
			list:state.shopping.list,
			token:state.login.token
		}
	}
	
	const {list,token} = useSelector(stateSelector);
	
	const [state,setState] = useState<State>({
		removeIndex:-1,
		editIndex:-1
	})
	
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
			default:{
				return;
			}
		}
	}
	
	const remove = (id:string) => {
		dispatch(removeItem(token,id));
		changeMode("cancel",0);
	}
	
	const edit = (item:ShoppingItem) => {
		dispatch(editItem(token,item));
		changeMode("cancel",0);
	}
	
	const shoppingItems = list.map((item,index) => {
		if(state.removeIndex === index) {
			return (
				<RemoveRow key={item.id} item={item} 
				changeMode={changeMode} remove={remove}/>
			)
		}
		if(state.editIndex === index) {
			return(
				<EditRow key={item.id} item={item} 
				changeMode={changeMode} edit={edit}/>
			)
		}
		return(
			<Row key={item.id} item={item} index={index} changeMode={changeMode}/>
		)
	})
	return(
		<table className="table table-striped">
			<thead>
				<tr>
					<th>Type</th>
					<th>Count</th>
					<th>Price</th>
					<th>Remove</th>
					<th>Edit</th>
				</tr>
			</thead>
			<tbody>
			{shoppingItems}
			</tbody>
		</table>
	)
}

export default ShoppingList;