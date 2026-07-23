import AppStateContext from '../context/AppStateContext';
import type {AppState} from '../types/states';
import {useContext} from 'react';

const useAppState = ():AppState => {
	return useContext(AppStateContext);
}

export default useAppState;