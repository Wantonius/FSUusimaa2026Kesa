import React from 'react';
import type {AppState} from '../types/states';

const AppStateContext = React.createContext<AppState>({
	list:[],
	id:100
})

AppStateContext.displayName = "AppStateContext";

export default AppStateContext;