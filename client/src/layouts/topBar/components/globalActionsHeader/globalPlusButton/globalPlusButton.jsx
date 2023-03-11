import { useState } from 'react';

import './globalPlusButton.styles.css';

const GlobalPlusButton = () => {
  const [isCreateNewHovered, setIsCreateNewHovered] = useState(false);

  return (
    <>
      <div
        className='TopBarPageHeaderGlobalActions-plusCircleIcon'
        onMouseEnter={() => setIsCreateNewHovered(true)}
        onMouseLeave={() => setIsCreateNewHovered(false)}
        style={{ background: isCreateNewHovered ? '#df6064' : '#f06a6a' }}
      >
        <svg viewBox='0 0 32 32' aria-hidden='true' focusable='false'>
          <path d='M26,14h-8V6c0-1.1-0.9-2-2-2l0,0c-1.1,0-2,0.9-2,2v8H6c-1.1,0-2,0.9-2,2l0,0c0,1.1,0.9,2,2,2h8v8c0,1.1,0.9,2,2,2l0,0c1.1,0,2-0.9,2-2v-8h8c1.1,0,2-0.9,2-2l0,0C28,14.9,27.1,14,26,14z'></path>
        </svg>

        <div className='TopBarPageHeaderGlobalActions-plusCircleIconDropdown'></div>

        {isCreateNewHovered && (
          <div className='TopBarPageHeaderGlobalActions-plusCircleIconSpeechBubble'>
            Create new
          </div>
        )}
      </div>
    </>
  );
};

export default GlobalPlusButton;
