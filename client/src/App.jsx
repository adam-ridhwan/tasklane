import { Route, Routes } from 'react-router-dom';

import Overview from './pages/homePage/01-overview';
import List from './pages/homePage/02-list';
import Board from './pages/homePage/03-board';
import Timeline from './pages/homePage/04-timeline';
import Calendar from './pages/homePage/05-calendar';
import Workflow from './pages/homePage/06-workflow';
import Dashboard from './pages/homePage/07-dashboard';

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

          <Route path='/home/overview' element={<Overview />} />
          <Route path='/home/list' element={<List />} />
          <Route path='/home/board' element={<Board />} />
          <Route path='/home/timeline' element={<Timeline />} />
          <Route path='/home/calendar' element={<Calendar />} />
          <Route path='/home/workflow' element={<Workflow />} />
          <Route path='/home/dashboard' element={<Dashboard />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
