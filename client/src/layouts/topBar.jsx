import { useEffect, useReducer } from 'react';
import { useCookies } from 'react-cookie';

import './topBar.styles.css';

const TopBar = () => {
  const [cookies, setCookie] = useCookies(['tab']);

  setCookie('tab', 'LIST', { path: '/' });

  const initialState = {
    activeTab: 'LIST',
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case 'SET_ACTIVE_TAB':
        return { ...state, activeTab: action.payload };
      default:
        throw new Error();
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const tabClickHandler = tab => {
    dispatch({ type: 'SET_ACTIVE_TAB', payload: tab });
  };

  useEffect(() => {
    console.log('state.activeTab', state.activeTab);
  }, [state]);

  return (
    <>
      <div className='topbar-container'>
        <div className='Bars3Icon'>{Bars3Icon}</div>

        <div className='Avatar'>AR</div>

        <div className='TopBarPageHeaderStructure-titleAndNavMenuRow'>
          <h1 className='TopBarPageHeaderStructure-title'>My Tasks</h1>

          <div className='TopBarPageHeaderStructure-navMenuRow'>
            <ul className='TabNavigation-list'>
              <li
                className={`TabNavigationBar-tab
                  ${
                    state.activeTab === 'LIST' && 'TabNavigationBar-tab-active'
                  }`}
              >
                <span onClick={() => tabClickHandler('LIST')}>List</span>
              </li>
              <li
                className={`TabNavigationBar-tab
                  ${
                    state.activeTab === 'BOARD' && 'TabNavigationBar-tab-active'
                  }`}
              >
                <span onClick={() => tabClickHandler('BOARD')}>Board</span>
              </li>
              <li
                className={`TabNavigationBar-tab
                  ${
                    state.activeTab === 'CALENDAR' &&
                    'TabNavigationBar-tab-active'
                  }`}
              >
                <span onClick={() => tabClickHandler('CALENDAR')}>
                  Calendar
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className='ShareButton'>
          <div>{LockClosedIcon}</div>
          <p>Share</p>
        </div>

        <div className='TopBarPageHeaderGlobalActions'>
          <div className='TopBarPageHeaderGlobalActions-input'>
            <div>{MagnifyingGlassIcon}</div>
            <input className='' placeholder='Search' />
          </div>

          <div className='PlusCircleIcon'>{PlusCricleIcon}</div>
        </div>
      </div>

      <div className='Topbar-borderOnly'></div>
    </>
  );
};

export default TopBar;

const Bars3Icon = (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    strokeWidth={1}
    stroke='#6d6e6f'
    height='2rem'
    width='2rem'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
    />
  </svg>
);

const PlusCricleIcon = (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='#f06a6a'
    height='32px'
    width='32px'
  >
    <path
      fillRule='evenodd'
      d='M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z'
      clipRule='evenodd'
    />
  </svg>
);

const LockClosedIcon = (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 28 28'
    fill='#6d6e6f'
    height='1rem'
    width='1rem'
  >
    <path
      fillRule='evenodd'
      d='M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z'
      clipRule='evenodd'
    />
  </svg>
);

const MagnifyingGlassIcon = (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 26 26'
    fill='#6d6e6f'
    height='1.1rem'
    width='1.1rem'
  >
    <path
      fillRule='evenodd'
      d='M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z'
      clipRule='evenodd'
    />
  </svg>
);
