import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import configureStore from './store';
import AppProvider from './context/AppContext';

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <Provider store={store}>
          <App />
        </Provider>
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

//test
