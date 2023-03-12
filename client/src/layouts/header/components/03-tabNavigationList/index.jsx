import { useEffect, useReducer, useRef, useState } from 'react';
import { useCookies } from 'react-cookie';
const tabNavigation = ['list', 'board', 'calendar'];

import './styles.css';

const capitalizeFirstLetter = string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const TabList = () => {
  const [cookies, setCookie] = useCookies(['activeTab']);
  const [hoveredTab, setHoveredTab] = useState(null);

  const initialState = {
    activeTab: `${cookies.activeTab || 'list'}`,
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
    setCookie('activeTab', tab, { path: '/' });
  };
  return (
    <>
      <div className='TopBarPageHeaderStructure-titleAndNavMenuRow'>
        <div className='TopBarPageHeaderStructure-title'>
          <h1>My Tasks</h1>
        </div>

        <div className='TopBarPageHeaderStructure-navMenuRow'>
          <ul className='TabNavigation-list'>
            {tabNavigation.map((tab, index) => (
              <li
                key={index}
                className={`TabNavigationBar-tab
                  ${state.activeTab === tab && 'TabNavigationBar-tab-active'}
                  ${hoveredTab === tab && 'TabNavigationBar-tab-active'}
                  `}
                onClick={() => tabClickHandler(tab)}
                onMouseEnter={() => setHoveredTab(tab)}
                onMouseLeave={() => setHoveredTab(null)}
              >
                <span>{capitalizeFirstLetter(tab)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default TabList;
