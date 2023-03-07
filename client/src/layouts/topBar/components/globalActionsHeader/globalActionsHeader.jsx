import { useRef, useState } from 'react';

import './globalActionsHeader.styles.css';

const GlobalActionsHeader = () => {
  const [isCreateNewHovered, setIsCreateNewHovered] = useState(false);
  const [isSettingsAvatarHovered, setIsSettingsAvatarHovered] = useState(false);

  const expandInputWidthHandler = globalActionsInputRef => {
    globalActionsInputRef.current.style.width = '480px';
    globalActionsInputRef.current.style.border = '2px solid #3f6ac4';
  };

  const shrinkInputWidthHandler = globalActionsInputRef => {
    globalActionsInputRef.current.style.width = '140px';
    globalActionsInputRef.current.style.border = '1px solid #cfcbcb';
  };

  const globalActionsInputRef = useRef(null);
  return (
    <>
      <div className='TopBarPageHeaderGlobalActions'>
        <div className='TopBarPageHeaderGlobalActions-textInputBase'>
          <div
            ref={globalActionsInputRef}
            className='TopBarPageHeaderGlobalActions-inputContainer'
          >
            <div className='TopBarPageHeaderGlobalActions-icon'>
              {MagnifyingGlassIcon}
            </div>

            <input
              placeholder='Search'
              onFocus={() => expandInputWidthHandler(globalActionsInputRef)}
              onBlur={() => shrinkInputWidthHandler(globalActionsInputRef)}
            />
          </div>
        </div>

        <div
          className='PlusCircleIcon'
          onMouseEnter={() => setIsCreateNewHovered(true)}
          onMouseLeave={() => setIsCreateNewHovered(false)}
        >
          {PlusCricleIcon}
          {isCreateNewHovered && (
            <div className='PlusCircleIcon-speechBubble'>Create new</div>
          )}
        </div>

        <div
          className='TopBarPageHeaderGlobalActions-settingsMenuAvatar'
          onMouseEnter={() => setIsSettingsAvatarHovered(true)}
          onMouseLeave={() => setIsSettingsAvatarHovered(false)}
        >
          AR
          {isSettingsAvatarHovered && (
            <div className='TopBarPageHeaderGlobalActions-speechBubble'>
              Adam Ridhwan Amir Hamzah
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default GlobalActionsHeader;

const PlusCricleIcon = (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='#f06a6a'
    height='35px'
    width='35px'
  >
    <path
      fillRule='evenodd'
      d='M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z'
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
