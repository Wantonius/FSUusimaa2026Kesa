import {useState} from 'react';
import ContactCard from './components/ContactCard';
import ContactInfo from './components/ContactInfo';
import NamedChildren from './components/NamedChildren';

function App() {
	const [count,setCount] = useState(0);

	return (
		<>
			<ContactCard>
				<ContactInfo name="Matti Meikäläinen" profession="Koodari"/>
			</ContactCard>
			<ContactCard>
				<h2>Current count:{count}</h2>
				<button onClick={() => setCount(count => count+1)}> + </button>
			</ContactCard>
			<NamedChildren	
				header={<h2>Complex Card</h2>}
				media={<h2>Media Content</h2>}
				content={<h2>Card Content</h2>}/>
			<NamedChildren 
				header={<h2>No Media</h2>}
				content={<h2>Card Content</h2>}/>
		</>
	)
}

export default App
