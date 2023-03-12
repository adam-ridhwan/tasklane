import { Route, Routes } from 'react-router-dom';
import DashboardPage from './pages/dashboardPage';
import HomePage from './pages/homePage';
import LoginPage from './pages/loginPage';
import RegisterPage from './pages/registerPage';

import './App.css';

const App = () => {
  return (
    <>
      <div className='App'>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/dashboard' element={<DashboardPage />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
