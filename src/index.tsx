import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import './index.scss';
import router from './router';


const container = document.getElementById('root');
if (!container) {
  throw new Error('Root element not found');
}
const root = createRoot(container);

root.render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
);
