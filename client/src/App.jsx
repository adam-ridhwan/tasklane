import { useContext, useEffect, useLayoutEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard.jsx';
import Home from './components/Home.jsx';
import { AuthContext } from './context/authContext.jsx';
import Login from './controllers/auth/login.jsx';

const App = () => {
  return (
    <>
      <div className='App'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />

          <Route>
            <Route path='/dashboard' element={<Dashboard />} />
          </Route>
        </Routes>
      </div>
    </>
  );
};

export default App;
