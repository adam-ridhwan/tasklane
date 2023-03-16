import { useEffect, useRef, useState } from 'react';

import MiniArrowDownIcon from '/src/assets/svg/miniArrowDownIcon';
import MiniPlusIcon from '/src/assets/svg/miniPlusIcon';

import './styles.css';

const AddTaskButton = () => {
  const [isDropdownActive, setIsDropdownActive] = useState(false);

  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const clickHandler = e => {
      // if dropdown is clicked, dont close it
      if (dropdownRef.current.contains(e.target)) return;

      // if arrow down button is clicked, toggle dropdown
      if (buttonRef.current.contains(e.target)) {
        return setIsDropdownActive(isDropdownActive => !isDropdownActive);
      }

      // if anywhere else is clicked, close dropdown
      if (!buttonRef.current.contains(e.target)) {
        return setIsDropdownActive(false);
      }
    };

    document.addEventListener('mousedown', clickHandler);
    return () => {
      document.removeEventListener('mousedown', clickHandler);
    };
  });

  const openDropdown = () => {
    const dropdown = dropdownRef.current;
    dropdown.classList.add('active');
  };

  const closeDropdown = () => {
    const dropdown = dropdownRef.current;
    dropdown.classList.remove('active');
  };

  useEffect(() => {
    isDropdownActive ? openDropdown() : closeDropdown();
  }, [isDropdownActive]);

  return (
    <>
      <div className='AddTaskButton-container'>
        <div className='AddTaskButton-button'>
          <div>
            <MiniPlusIcon />
          </div>
          <div>Add task</div>
        </div>

        <div ref={buttonRef} className='AddTaskButton-arrowDown'>
          <MiniArrowDownIcon />

          <div
            ref={dropdownRef}
            className='AddTaskButton-dropdown'
            role='button'
          >
            <div onClick={() => console.log('add section')}>Add section</div>
            <div onClick={() => console.log('add milestone')}>
              Add milestone
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AddTaskButton;
