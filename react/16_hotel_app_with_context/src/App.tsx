import HotelForm from './components/HotelForm';
import HotelList from './components/HotelList';
import Navbar from './components/Navbar';
import {Routes,Route,Navigate} from 'react-router';
function App() {
  

  return (
    <>
		<Navbar/>
		<hr/>
		<Routes>
			<Route path="/" element={<HotelList />}/>
			<Route path="/form" element={<HotelForm />}/>
			<Route path="*" element={<Navigate to="/"/>}/>
		</Routes>
   </>
  )
}

export default App
