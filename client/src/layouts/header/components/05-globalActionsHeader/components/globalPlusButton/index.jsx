import { useState } from 'react';
import PlusIcon from '../../../../../../assets/svg/plusIcon';

import './styles.css';

const GlobalPlusButton = () => {
  const [isCreateNewHovered, setIsCreateNewHovered] = useState(true);

  return (
    <>
      <div
        className='TopBarPageHeaderGlobalActions-plusCircleIcon'
        onMouseEnter={() => setIsCreateNewHovered(true)}
        onMouseLeave={() => setIsCreateNewHovered(false)}
        style={{ background: isCreateNewHovered ? '#df6064' : '#f06a6a' }}
      >
        <div>
          <PlusIcon />
        </div>

        {/* <div className='TopBarPageHeaderGlobalActions-plusCircleIconDropdown'></div> */}

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
