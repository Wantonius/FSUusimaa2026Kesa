import {useContext} from 'react';
import AppStateContext from '../context/AppStateContext';
import type {AppState} from '../types/states';

const useAppState = ():AppState => {
	return useContext(AppStateContext);
}

export default useAppState;