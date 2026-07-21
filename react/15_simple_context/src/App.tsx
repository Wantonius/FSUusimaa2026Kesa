import { useState } from 'react'
import ThemeContext from './context/ThemeContext';
import type {ThemeType} from './context/ThemeContext';
import {themes} from './context/themes';
import Headline from './components/Headline';
import Paragraph from './components/Paragraph';
import ThemeButton from './components/ThemeButton';

interface State {
	theme:ThemeType
}

function App() {
  
	const [state,setState] = useState<State>({
		theme:themes.dark
	})

	const toggleTheme = () => {
		if(state.theme === themes.dark) {
			setState({
				theme:themes.light
			})
		} else {
			setState({
				theme:themes.dark
			})
		}
	}

	return (
		<>
		<ThemeContext.Provider value={state.theme}>
			<Headline>Scaling Up with Reducer and Context</Headline>
			<Paragraph>
			Reducers let you consolidate a component’s state update logic. Context lets you pass information deep down to other components. You can combine reducers and context together to manage state of a complex screen.
			</Paragraph>
			<ThemeButton toggleTheme={toggleTheme}/>
		</ThemeContext.Provider>
		</>
	)
}

export default App
