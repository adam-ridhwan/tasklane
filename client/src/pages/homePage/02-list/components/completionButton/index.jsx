import { createRef, useEffect, useRef, useState } from 'react';

import './styles.css';

const COMPLETION_TITLES = ['Incomplete tasks', 'Completed tasks', 'All tasks'];
const COMPLETED_SINCE_TITLES = [
  'All completed tasks',
  'Today',
  'Yesterday',
  '1 week',
  '2 weeks',
  '3 weeks',
];

const CompletionButton = () => {
  const [activeTitleIndex, setActiveTitleIndex] = useState(2);
  const [activeCompletedSinceIndex, setActiveCompletedSinceIndex] = useState();
  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const [hoveredTitleIndex, setHoveredTitleIndex] = useState(activeTitleIndex);

  // first level dropdown
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);
  const completionButtonRef = useRef([]);
  completionButtonRef.current = COMPLETION_TITLES.map(
    (_, i) => completionButtonRef.current[i] ?? createRef()
  );

  // second level dropdown
  const completedSinceDropdownRef = useRef(null);
  const completedSinceButtonRef = useRef([]);
  const labelRef = useRef(null);

  completedSinceButtonRef.current = COMPLETED_SINCE_TITLES.map(
    (_, i) => completedSinceButtonRef.current[i] ?? createRef()
  );

  // set active title when completion menu button is clicked
  const handleSetActiveTitle = (e, i) => {
    const { current: label } = labelRef;
    const { current: completedSinceDropdown } = completedSinceDropdownRef;

    if (label.contains(e.target)) return;

    setActiveTitleIndex(i);
    setIsDropdownActive(false);

    if (i !== 1) return setActiveCompletedSinceIndex(null);

    if (!completedSinceDropdown.contains(e.target))
      setActiveCompletedSinceIndex(0);
  };

  // toggling dropdown functionality
  useEffect(() => {
    const clickDropdownHandler = e => {
      const { current: label } = labelRef;
      const { current: dropdown } = dropdownRef;
      const { current: button } = buttonRef;

      if (label.contains(e.target) || dropdown.contains(e.target)) return;

      if (button.contains(e.target)) return setIsDropdownActive(prev => !prev);

      setHoveredTitleIndex(activeTitleIndex);
      setIsDropdownActive(false);
    };

    document.addEventListener('mousedown', clickDropdownHandler);
    return () => {
      document.removeEventListener('mousedown', clickDropdownHandler);
    };
  });

  const openDropdown = () => {
    const dropdown = dropdownRef.current;
    const button = buttonRef.current;

    dropdown.classList.add('active');
    button.classList.add('active');
    button.classList.remove('Completion-button-hover');
  };

  const closeDropdown = () => {
    const dropdown = dropdownRef.current;
    const button = buttonRef.current;

    dropdown.classList.remove('active');
    button.classList.remove('active');
    button.classList.add('Completion-button-hover');
    closeCompletedSinceDropdown();
  };

  const openCompletedSinceDropdown = () => {
    completedSinceDropdownRef.current.classList.add(
      activeTitleIndex === 1 ? 'position-right' : 'position-left'
    );
  };

  const closeCompletedSinceDropdown = () => {
    const completedSinceDropdown = completedSinceDropdownRef.current;
    completedSinceDropdown.classList.remove('position-right', 'position-left');
  };

  // toggle dropdown
  useEffect(() => {
    isDropdownActive ? openDropdown() : closeDropdown();
  }, [isDropdownActive]);

  // set active title when completion menu button is hovered
  const handleHoverTitle = i => {
    setHoveredTitleIndex(i);

    // if 'completed task' menu button is hovered, toggle completed since dropdown
    i === 1 ? openCompletedSinceDropdown() : closeCompletedSinceDropdown();
  };

  // hover effects on completion menu buttons
  useEffect(() => {
    const { current: completionButton } = completionButtonRef;
    completionButton.forEach((ref, i) => {
      ref.current.style.backgroundColor =
        i === hoveredTitleIndex
          ? i === 1
            ? '#f1f1f1'
            : 'rgba(55, 23, 23, 0.03)'
          : 'white';
    });
  }, [hoveredTitleIndex]);

  // render checkmark icon if title is selected
  const renderTitlesCheckMark = i => {
    // if title is not selected, return empty div
    if (activeTitleIndex !== i) {
      return <div className='Completion-button-spacer' />;
    }
    return <CheckMarkIcon />;
  };

  const renderCompletedSinceCheckMark = i => {
    // if title is not selected, return empty div
    if (activeCompletedSinceIndex !== i) {
      return <div className='Completion-button-spacer' />;
    }
    return <CheckMarkIcon />;
  };

  useEffect(() => {
    // console.log('completed since index: ', activeCompletedSinceIndex);
  }, [activeCompletedSinceIndex]);

  return (
    <>
      <div className='ThemeableButton-container'>
        <div
          ref={buttonRef}
          className='Completion-button Completion-button-hover'
        >
          <div>
            <MiniCheckIcon />
          </div>

          <div>{COMPLETION_TITLES[activeTitleIndex]}</div>
        </div>

        <div ref={dropdownRef} className='Completion-button-dropdown'>
          {COMPLETION_TITLES.map((title, i) => {
            return (
              <div
                key={i}
                ref={completionButtonRef.current[i]}
                onClick={e => handleSetActiveTitle(e, i)}
                onMouseEnter={() => handleHoverTitle(i)}
                className='Completion-button-dropdown-item'
              >
                {renderTitlesCheckMark(i)}
                <span>{title}</span>
                {title === 'Completed tasks' && <ArrowRightIcon />}

                {title === 'Completed tasks' && (
                  <div
                    ref={completedSinceDropdownRef}
                    className='Completion-button-dropdown-completed'
                  >
                    {COMPLETED_SINCE_TITLES.map((title, i) => {
                      return (
                        <div key={i}>
                          <div
                            ref={completedSinceButtonRef.current[i]}
                            onClick={() => setActiveCompletedSinceIndex(i)}
                            className='Completion-button-dropdown-completed-item'
                          >
                            {renderCompletedSinceCheckMark(i)}
                            <span>{title}</span>
                          </div>

                          {i === 0 && (
                            <div ref={labelRef}>Marked complete since:</div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
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
        className='Completion-button-arrowRightIcon'
        viewBox='0 0 32 32'
        aria-hidden='true'
        focusable='false'
      >
        <path d='M23.2,16c0,0.3-0.1,0.7-0.3,0.9l-9,11c-0.5,0.6-1.5,0.7-2.1,0.2s-0.7-1.5-0.2-2.1l8.2-10L11.6,6c-0.5-0.6-0.4-1.6,0.2-2.1s1.6-0.4,2.1,0.2l9,11C23.1,15.3,23.2,15.7,23.2,16z'></path>
      </svg>
    </>
  );
};
