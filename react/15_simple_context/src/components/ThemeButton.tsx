import React,{useContext} from 'react';
import ThemeContext from '../context/ThemeContext';

interface Props {
	toggleTheme():void;
}

const ThemeButton = (props:Props) => {
	
	const theme = useContext(ThemeContext);
	
	return(
		<button onClick={props.toggleTheme} style={{
			color:theme.color,
			backgroundColor:theme.backgroundColor}}>Toggle Theme</button>
	)
}

export default ThemeButton;