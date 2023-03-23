import { useContext } from 'react';
import { ToolBarContext } from '/src/context/toolBarContext.jsx';

import './styles.css';

const ToggleCompletionDropdownButton = props => {
  const { toggleDropdownButtonRef, setIsDropdownActive } = props;
  const { activeOption, COMPLETION_TITLES } = useContext(ToolBarContext);

  return (
    <>
      <div
        ref={toggleDropdownButtonRef}
        onClick={() => setIsDropdownActive(prev => !prev)}
        className='ToggleCompletionDropdownButton ToggleCompletionDropdownButton-hover'
      >
        <div className='ToggleCompletionDropdownButton-miniCheckIconContainer'>
          <MiniCheckIcon />
        </div>

        <div>{COMPLETION_TITLES[activeOption]}</div>
      </div>
    </>
  );
};

export default ToggleCompletionDropdownButton;

const MiniCheckIcon = () => {
  return (
    <>
      <svg
        className='ToggleCompletionDropdownButton-miniCheckIcon'
        viewBox='0 0 24 24'
        aria-hidden='true'
        focusable='false'
      >
        <path d='M12,3c5,0,9,4,9,9s-4,9-9,9s-9-4-9-9S7,3,12,3 M12,1C5.9,1,1,5.9,1,12s4.9,11,11,11s11-4.9,11-11S18.1,1,12,1L12,1zM11.2,16.2l6-6c0.4-0.4,0.4-1,0-1.4s-1-0.4-1.4,0l-5.3,5.3l-2.3-2.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l3,3c0.2,0.2,0.5,0.3,0.7,0.3S11,16.4,11.2,16.2z'></path>
      </svg>
    </>
  );
};