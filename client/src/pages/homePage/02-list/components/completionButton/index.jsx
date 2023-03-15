import { createRef, useEffect, useRef, useState } from 'react';

import './styles.css';

const completionTitles = ['Incomplete tasks', 'Completed tasks', 'All tasks'];

const CompletionButton = () => {
  const [isActive, setIsActive] = useState(false);
  const [activeTitle, setActiveTitle] = useState(completionTitles[2]);
  const [hoveredTitle, setHoveredTitle] = useState(activeTitle);
  const [isDropdownActive, setIsDropdownActive] = useState(false);

  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);
  const menuButtonRef = useRef([]);
  menuButtonRef.current = completionTitles.map(
    (_, i) => menuButtonRef.current[i] ?? createRef()
  );

  const clickHandler = titleRef => {
    setActiveTitle(titleRef.current.textContent);
    setIsDropdownActive(false);
  };

  useEffect(() => {
    menuButtonRef.current.forEach(ref => {
      ref.current.textContent === hoveredTitle
        ? (ref.current.style.backgroundColor = 'rgba(55, 23, 23, 0.03)')
        : (ref.current.style.backgroundColor = 'white');
    });
  }, [hoveredTitle]);

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
    dropdownRef.current.classList.add('active');
    buttonRef.current.classList.add('active');
    buttonRef.current.classList.remove('Completion-button-hover');
  };

  const closeDropdown = () => {
    dropdownRef.current.classList.remove('active');
    buttonRef.current.classList.remove('active');
    buttonRef.current.classList.add('Completion-button-hover');
  };

  useEffect(() => {
    isDropdownActive ? openDropdown() : closeDropdown();
  }, [isDropdownActive]);

  return (
    <>
      <div className='ThemeableButton-container'>
        <div
          className='Completion-button Completion-button-hover'
          onClick={() => setIsActive(isActive => !isActive)}
          ref={buttonRef}
        >
          <div>
            <MiniCheckIcon />
          </div>

          <div>{activeTitle}</div>
        </div>

        <div ref={dropdownRef} className='Completion-button-dropdown'>
          {completionTitles.map((title, index) => {
            return (
              <div
                key={index}
                ref={menuButtonRef.current[index]}
                onClick={() => clickHandler(menuButtonRef.current[index])}
                onMouseEnter={() =>
                  setHoveredTitle(
                    menuButtonRef.current[index].current.textContent
                  )
                }
              >
                {activeTitle === title ? (
                  <CheckMarkIcon />
                ) : (
                  <div className='Completion-button-spacer' />
                )}
                <span>{title}</span>
                {title === 'Completed tasks' && <ArrowRightIcon />}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default CompletionButton;

const MiniCheckIcon = () => {
  return (
    <>
      <svg
        className='Completion-button-miniCheckIcon'
        viewBox='0 0 24 24'
        aria-hidden='true'
        focusable='false'
      >
        <path d='M12,3c5,0,9,4,9,9s-4,9-9,9s-9-4-9-9S7,3,12,3 M12,1C5.9,1,1,5.9,1,12s4.9,11,11,11s11-4.9,11-11S18.1,1,12,1L12,1zM11.2,16.2l6-6c0.4-0.4,0.4-1,0-1.4s-1-0.4-1.4,0l-5.3,5.3l-2.3-2.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l3,3c0.2,0.2,0.5,0.3,0.7,0.3S11,16.4,11.2,16.2z'></path>
      </svg>
    </>
  );
};

const CheckMarkIcon = () => {
  return (
    <>
      <svg
        className='Completion-button-checkMarkIcon'
        viewBox='0 0 32 32'
        aria-hidden='true'
        focusable='false'
      >
        <path d='M10.9,26.2c-0.5,0-1-0.2-1.4-0.6l-6.9-6.9c-0.8-0.8-0.8-2,0-2.8s2-0.8,2.8,0l5.4,5.4l16-15.9c0.8-0.8,2-0.8,2.8,0s0.8,2,0,2.8L12.3,25.6C11.9,26,11.4,26.2,10.9,26.2z'></path>
      </svg>
    </>
  );
};

const ArrowRightIcon = () => {
  return (
    <>
      <svg
        className='Completion-button-arrowRight'
        viewBox='0 0 32 32'
        aria-hidden='true'
        focusable='false'
        width='16px'
        height='16px'
        fill='#1e1f21'
      >
        <path d='M23.2,16c0,0.3-0.1,0.7-0.3,0.9l-9,11c-0.5,0.6-1.5,0.7-2.1,0.2s-0.7-1.5-0.2-2.1l8.2-10L11.6,6c-0.5-0.6-0.4-1.6,0.2-2.1s1.6-0.4,2.1,0.2l9,11C23.1,15.3,23.2,15.7,23.2,16z'></path>
      </svg>
    </>
  );
};
