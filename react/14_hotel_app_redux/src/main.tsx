import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router';
import App from './App.tsx'
import {Provider} from 'react-redux';
import type {AppState,Action} from './types/states';
import {createStore} from 'redux';
import type {Store} from 'redux';
import hotelReducer from './reducers/hotelReducer';

const store:Store<AppState,Action> = createStore(hotelReducer);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
  <BrowserRouter>
  <Provider store={store}>
    <App />
  </Provider>
  </BrowserRouter>
  </StrictMode>,
)
