import { useEffect, useState } from 'react';
import './App.css';
import Login from './controllers/auth/login.jsx';

const App = () => {
  return (
    <div className='App'>
      <Login />
    </div>
  );
};

export default App;
