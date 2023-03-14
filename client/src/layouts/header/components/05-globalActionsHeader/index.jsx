import { useEffect, useRef, useState } from 'react';

import GlobalDropdown from './components/globalDropdown';
import GlobalPlusButton from './components/globalPlusButton';
import GlobalSearchBar from './components/globalSearchBar';
import GlobalSettingsButton from './components/globalSettingsButton';

import './styles.css';

const GlobalActionsHeader = () => {
  const recents = [
    { id: '7170', name: 'BU projects' },
    { id: '7172', name: 'Scrum tasks' },
    { id: '7176', name: 'Cat sitting list' },
  ];
  const savedSearches = [
    { id: '7175', name: 'Tasks I created' },
    { id: '0875', name: 'Tasks I assigned to others' },
    { id: '3640', name: 'Recently completed tasks' },
  ];

  const [isInputActive, setIsInputActive] = useState(false);

  const divRef = useRef(null);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);
  const recentItemsRef = useRef(null);
  const savedSearchesRef = useRef(null);

  const expandInputWidthHandler = () => {
    divRef.current.classList.add('active');

    setTimeout(() => {
      dropdownRef.current.classList.add('active');
      dropdownRef.current.style.height = `${
        recents.length * 60 + 35 + savedSearches.length * 40 + 37
      }px`;

      recentItemsRef.current.classList.add('active');

      savedSearchesRef.current.style.transform = `translateY(0px)`;
    }, 150);
  };

  const shrinkInputWidthHandler = () => {
    divRef.current.classList.remove('active');

    dropdownRef.current.classList.remove('active');
    dropdownRef.current.style.height = '35px';

    recentItemsRef.current.classList.remove('active');

    savedSearchesRef.current.style.transform = `translateY(${
      recents.length * -60 - 35
    }px)`;
  };

  useEffect(() => {
    const inputDropdownHandler = e => {
      if (inputRef.current.contains(e.target)) return;
      if (!dropdownRef.current.contains(e.target)) {
        return setIsInputActive(false);
      }
    };

    document.addEventListener('mousedown', inputDropdownHandler);
    return () => {
      document.removeEventListener('mousedown', inputDropdownHandler);
    };
  });

  useEffect(() => {
    isInputActive ? expandInputWidthHandler() : shrinkInputWidthHandler();
  }, [isInputActive]);

  return (
    <>
      <div className='TopBarPageHeaderGlobalActions'>
        <div className='TopBarPageHeaderGlobalActions-textInputBase'>
          <div
            ref={divRef}
            className='TopBarPageHeaderGlobalActions-inputContainer'
          >
            <div className='TopBarPageHeaderGlobalActions-icon'>
              {MagnifyingGlassIcon}
            </div>

            <GlobalSearchBar
              inputRef={inputRef}
              setIsInputActive={setIsInputActive}
            />

            <GlobalDropdown
              dropdownRef={dropdownRef}
              recentItemsRef={recentItemsRef}
              savedSearchesRef={savedSearchesRef}
              isInputActive={isInputActive}
            />
          </div>
        </div>
        {/* <GlobalPlusButton /> //? Not sure if i want to implement this yet */}
        <GlobalSettingsButton />
      </div>
    </>
  );
};

export default GlobalActionsHeader;

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
