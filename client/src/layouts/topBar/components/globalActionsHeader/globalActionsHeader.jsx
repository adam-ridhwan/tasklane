import { useEffect, useRef, useState } from 'react';

import GlobalDropdown from './globalDropdown/globalDropdown';
import GlobalPlusButton from './globalPlusButton/globalPlusButton';
import GlobalSettingsButton from './globalSettingsButton/globalSettingsButton';

import './globalActionsHeader.styles.css';

const recents = [
  { id: '7170', name: 'BU projects' },
  { id: '7172', name: 'Scrum tasks' },
  { id: '7176', name: 'Cat sitting list' },
];

const GlobalActionsHeader = () => {
  const [isInputActive, setIsInputActive] = useState(false);

  const inputRef = useRef(null);
  const divRef = useRef(null);
  const recentItemsRef = useRef(null);
  const dropdownRef = useRef(null);
  const savedSearchesRef = useRef(null);

  const expandInputWidthHandler = () => {
    divRef.current.style.width = '480px';
    divRef.current.style.border = '3px solid #3f6ac4';

    setTimeout(() => {
      recentItemsRef.current.style.top = '35px';
      recentItemsRef.current.style.height = `${recents.length * 60}px`;
      savedSearchesRef.current.style.top = `${recents.length * 60 + 35}px`;
      dropdownRef.current.style.opacity = '1';
      dropdownRef.current.style.pointerEvents = 'auto';
    }, 150);
  };

  const shrinkInputWidthHandler = () => {
    divRef.current.style.width = '140px';
    divRef.current.style.border = '1px solid #cfcbcb';
    recentItemsRef.current.style.top = '1px';
    recentItemsRef.current.style.height = '35px';
    savedSearchesRef.current.style.top = '0px';
    dropdownRef.current.style.opacity = '0';
    dropdownRef.current.style.pointerEvents = 'none';
  };

  const darkenBorderHandler = () => {
    if (document.activeElement === inputRef.current) return;
    divRef.current.style.border = '1px solid #afabac';
  };

  const lightenBorderHandler = () => {
    if (document.activeElement === inputRef.current) return;
    divRef.current.style.border = '1px solid #cfcbcb';
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

            <input
              ref={inputRef}
              placeholder='Search'
              onFocus={() => setIsInputActive(true)}
              onMouseEnter={() => darkenBorderHandler()}
              onMouseLeave={() => lightenBorderHandler()}
            />

            <GlobalDropdown
              recentItemsRef={recentItemsRef}
              dropdownRef={dropdownRef}
              savedSearchesRef={savedSearchesRef}
            />
          </div>
        </div>

        <GlobalPlusButton />

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
