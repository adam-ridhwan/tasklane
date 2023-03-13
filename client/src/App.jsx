import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/homePage';
import LandingPage from './pages/landingPage';
import LoginPage from './pages/loginPage';
import RegisterPage from './pages/registerPage';

import './App.css';

const App = () => {
  return (
    <>
      <div className='App'>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />

          <Route path='/home' element={<HomePage />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
