import React,{useState} from 'react';
import Contact from '../models/Contact';

interface Props {
	contact:Contact;
	changeMode(mode:string,index:number):void;
	editContact(contact:Contact):void;
}

interface State {
	firstname:string;
	lastname:string;
	email:string;
	phone:string;
}

const EditRow = (props:Props) => {
	
	const [state,setState] = useState<State>({
		firstname:props.contact.firstname,
		lastname:props.contact.lastname,
		email:props.contact.email,
		phone:props.contact.phone
	})
	
	const onChange = (event:React.ChangeEvent<HTMLInputElement>) => {
		setState((state) => {
			return {
				...state,
				[event.target.name]:event.target.value
			}
		})
	}
	
	const editContact = () => {
		const contact = new Contact(state.firstname,state.lastname,state.email,state.phone,props.contact.id);
		props.editContact(contact);
	}
	
	return(
		<tr>
			<td><input type="text"
						name="firstname"
						id="firstname"
						className="form-control"
						value={state.firstname}
						onChange={onChange}/></td>
			<td><input type="text"
						name="lastname"
						id="lastname"
						className="form-control"
						value={state.lastname}
						onChange={onChange}/></td>
			<td><input type="email"
						name="email"
						id="email"
						className="form-control"
						value={state.email}
						onChange={onChange}/></td>
			<td><input type="tel"
						name="phone"
						id="phone"
						className="form-control"
						value={state.phone}
						onChange={onChange}/></td>
			<td><button className="btn btn-success" onClick={editContact}>Save</button></td>
			<td><button className="btn btn-secondary" onClick={() => props.changeMode("cancel",0)}>Cancel</button></td>
		</tr>
	)
}

export default EditRow;