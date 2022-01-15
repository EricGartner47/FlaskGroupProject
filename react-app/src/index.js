import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import configureStore from './store';
import AppProvider from './context/AppContext';
import { ModalProvider } from './context/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <Provider store={store}>
        <ModalProvider>
          <App />
        </ModalProvider>
      </Provider>
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

//test
