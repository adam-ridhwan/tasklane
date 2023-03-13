import React from 'react';
import { CookiesProvider } from 'react-cookie';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

import { AuthProvider } from './context/authContext.jsx';
import { TodosProvider } from './context/todoContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <TodosProvider>
        <BrowserRouter>
          <CookiesProvider>
            <App />
          </CookiesProvider>
        </BrowserRouter>
      </TodosProvider>
    </AuthProvider>
  </React.StrictMode>
);
