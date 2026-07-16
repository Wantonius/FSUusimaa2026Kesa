import useAction from './hooks/useAction';
import HotelForm from './components/HotelForm';

function App() {
  
  const {list,addHotel,removeHotel} = useAction()

  return (
    <>
		<HotelForm addHotel={addHotel}/>
    </>
  )
}

export default App
