import { Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard.jsx';
import Home from './components/Home.jsx';
import Login from './controllers/auth/login.jsx';
import Register from './controllers/auth/register.jsx';

const App = () => {
  return (
    <>
      <div className='App'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />

          <Route>
            <Route path='/dashboard' element={<Dashboard />} />
          </Route>
        </Routes>
      </div>
    </>
  );
};

export default App;
