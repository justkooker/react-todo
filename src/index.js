import React from 'react';
import ReactDOM from 'react-dom/client';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import Todo from './Todo';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter basename='/'>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Todo />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
