import { useState } from 'react'
import ContactForm from './components/ContactForm';
import Contact from './models/Contact';
import ContactList from './components/ContactList';
import Navbar from './components/Navbar';
import {Routes,Route,Navigate} from 'react-router';

interface State {
	list:Contact[];
	id:number;
}

function App() {
 
	const [state,setState] = useState<State>({
		list:[],
		id:100
	}) 

	const addContact = (contact:Contact) => {
		contact.id = state.id;
		setState((state) => {
			return {
				list:state.list.concat(contact),
				id:state.id+1
			}
		})
	}
	
	const removeContact = (id:number) => {
		setState((state) => {
			const tempList = state.list.filter(contact => contact.id !== id);
			return {
				...state,
				list:tempList
			}
		})
	}	
	
	const editContact = (contact:Contact) => {
		for(let i=0;i<state.list.length;i++) {
			if(state.list[i].id === contact.id) {
				setState((state) => {
					const tempList = state.list.toSpliced(i,1,contact);
					return {
						...state,
						list:tempList
					}
				})
			}
		}
	}

	return (
		<>
			<Navbar/>
			<Routes>
				<Route path="/" element={<ContactList list={state.list} editContact={editContact} removeContact={removeContact}/>}/>
				<Route path="/form" element={<ContactForm addContact={addContact}/>}/>
				<Route path="*" element={<Navigate to="/"/>}/>
			</Routes>
		</>
	)
}

export default App
