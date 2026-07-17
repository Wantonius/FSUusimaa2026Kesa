import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import type {Store} from 'redux';
import type {State,Action} from './reducers/countReducer';
import countReducer from './reducers/countReducer';
import App from './App.tsx'

const store:Store<State,Action> = createStore(countReducer);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  </StrictMode>,
)
