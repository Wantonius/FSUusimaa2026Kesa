import Contact from '../models/Contact';
import {useState} from 'react';
import Row from './Row';
import RemoveRow from './RemoveRow';
import EditRow from './EditRow';

interface Props {
	list:Contact[];
	removeContact(id:number):void;
	editContact(contact:Contact):void;
}

interface State {
	removeIndex:number;
	editIndex:number;
}

const ContactList = (props:Props) => {

	const [state,setState] = useState<State>({
		removeIndex:-1,
		editIndex:-1
	})
	
	const changeMode = (mode:string,index:number) => {
		switch(mode) {
			case "remove": {
				setState({
					removeIndex:index,
					editIndex:-1
				})
				return;
			}
			case "edit": {
				setState({
					removeIndex:-1,
					editIndex:index
				})
				return;
			}
			case "cancel": {
				setState({
					removeIndex:-1,
					editIndex:-1
				})
				return;
			}
			default: {
				return;
			}
		}
	}
	
	const removeContact = (id:number) => {
		props.removeContact(id);
		changeMode("cancel",0);
	}
	
	const editContact = (contact:Contact) => {
		props.editContact(contact);
		changeMode("cancel",0);
	}

	const contactList = props.list.map((contact,index) => {
		if(state.removeIndex === index) {
			return(
				<RemoveRow key={contact.id} contact={contact} changeMode={changeMode} removeContact={removeContact}/>
			)
		}
		if(state.editIndex === index) {
			return (
				<EditRow key={contact.id} contact={contact} changeMode={changeMode} editContact={editContact}/>
			)
		}
		return(
			<Row key={contact.id} contact={contact} index={index} changeMode={changeMode}/>
		)
	})
	return(
		<table className="table table-striped">
			<thead>
				<tr>
					<th>First Name</th>
					<th>Last Name</th>
					<th>Email</th>
					<th>Phone</th>
					<th>Remove</th>
				</tr>
			</thead>
			<tbody>
			{contactList}
			</tbody>
		</table>
	)

}

export default ContactList;