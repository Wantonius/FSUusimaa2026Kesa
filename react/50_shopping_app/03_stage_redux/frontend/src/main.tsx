import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router';
import App from './App.tsx'
import {createStore,combineReducers,applyMiddleware} from 'redux';
import type {Store} from 'redux';
import type {AppState,RootReducer,Action} from './types/states';
import loginReducer from './reducers/loginReducer';
import shoppingReducer from './reducers/shoppingReducer';
import {Provider} from 'react-redux';
import {thunk} from 'redux-thunk';

const rootReducer = combineReducers<RootReducer>({
	login:loginReducer,
	shopping:shoppingReducer
})

const store:Store<AppState,Action> = createStore(rootReducer,applyMiddleware(thunk));

createRoot(document.getElementById('root')!).render(
  <StrictMode>
  <BrowserRouter>
	<Provider store={store}>
    <App />
	</Provider>
  </BrowserRouter>
  </StrictMode>,
)
