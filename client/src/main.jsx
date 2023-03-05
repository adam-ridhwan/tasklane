import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

import { AuthProvider } from './context/authContext.jsx';
import { TodosProvider } from './context/todoContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <TodosProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </TodosProvider>
    </AuthProvider>
  </React.StrictMode>
);
