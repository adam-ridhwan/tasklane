import React from 'react';
import { CookiesProvider } from 'react-cookie';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

import { AuthProvider } from './context/authContext.jsx';
import { TodosProvider } from './context/todoContext';
import { ToolBarProvider } from './context/toolBarContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <ToolBarProvider>
        <TodosProvider>
          <BrowserRouter>
            <CookiesProvider>
              <App />
            </CookiesProvider>
          </BrowserRouter>
        </TodosProvider>
      </ToolBarProvider>
    </AuthProvider>
  </React.StrictMode>
);
