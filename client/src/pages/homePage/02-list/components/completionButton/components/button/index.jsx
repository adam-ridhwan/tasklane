import { useContext } from 'react';
import { ToolBarContext } from '/src/context/toolBarContext.jsx';

import { COMPLETION_TITLES } from '/src/constants/constants.js';

import './styles.css';

const Button = props => {
  const { buttonRef, setIsDropdownActive } = props;
  const { activeCompletionTitle } = useContext(ToolBarContext);

  return (
    <>
      <div
        ref={buttonRef}
        onClick={() => setIsDropdownActive(prev => !prev)}
        className='CompletionButton CompletionButton-hover'
      >
        <div className='CompletionButton-miniCheckIconContainer'>
          <MiniCheckIcon />
        </div>

        <div>{COMPLETION_TITLES[activeCompletionTitle]}</div>
      </div>
    </>
  );
};

export default Button;

const MiniCheckIcon = () => {
  return (
    <>
      <svg
        className='CompletionButton-miniCheckIcon'
        viewBox='0 0 24 24'
        aria-hidden='true'
        focusable='false'
      >
        <path d='M12,3c5,0,9,4,9,9s-4,9-9,9s-9-4-9-9S7,3,12,3 M12,1C5.9,1,1,5.9,1,12s4.9,11,11,11s11-4.9,11-11S18.1,1,12,1L12,1zM11.2,16.2l6-6c0.4-0.4,0.4-1,0-1.4s-1-0.4-1.4,0l-5.3,5.3l-2.3-2.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l3,3c0.2,0.2,0.5,0.3,0.7,0.3S11,16.4,11.2,16.2z'></path>
      </svg>
    </>
  );
};
