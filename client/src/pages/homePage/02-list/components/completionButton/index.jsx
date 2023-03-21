import { createRef, useEffect, useRef, useState } from 'react';

import './styles.css';

const COMPLETION_TITLES = ['Incomplete tasks', 'Completed tasks', 'All tasks'];
const RANGE_TITLES = [
  'All completed tasks',
  'Today',
  'Yesterday',
  '1 week',
  '2 weeks',
  '3 weeks',
];

const CompletionButton = () => {
  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const [activeOption, setActiveOption] = useState(2);
  const [activeRange, setActiveRange] = useState();

  // FIRST LEVEL DROPDOWN
  const toggleDropdownButtonRef = useRef(null); // button that toggles dropdown
  const completionTitlesDropdownRef = useRef(null); // COMPLETION_TITLES dropdown
  const completionTitlesItemsRef = useRef([]); // COMPLETION_TITLES dropdown items
  completionTitlesItemsRef.current = COMPLETION_TITLES.map(
    (_, i) => completionTitlesItemsRef.current[i] ?? createRef()
  );

  // SECOND LEVEL DROPDOWN
  const rangeTitlesDropdownRef = useRef(null); // RANGES_TITLES nested dropdown
  const rangeTitlesItemsRef = useRef([]); // RANGES_TITLES nested dropdown items
  const labelRef = useRef(null); // label: 'Marked completed since:'
  rangeTitlesItemsRef.current = RANGE_TITLES.map(
    (_, i) => rangeTitlesItemsRef.current[i] ?? createRef()
  );

  // set active option when OPTIONS button is clicked
  const handleSetActiveOption = (e, i) => {
    const { current: label } = labelRef;
    const { current: rangeTitlesDropdown } = rangeTitlesDropdownRef;

    if (label.contains(e.target)) return;

    setActiveOption(i);
    closeOptionsDropdown();
    setIsDropdownActive(false);

    if (i !== 1) return setActiveRange(null);

    if (!rangeTitlesDropdown.contains(e.target)) return setActiveRange(0);
  };

  // toggling dropdown functionality
  useEffect(() => {
    const clickDropdownHandler = e => {
      const { current: toggleDropdownButton } = toggleDropdownButtonRef;
      const { current: completionTitlesDropdown } = completionTitlesDropdownRef;
      const { current: label } = labelRef;

      if (
        label.contains(e.target) ||
        completionTitlesDropdown.contains(e.target)
      )
        return;

      if (toggleDropdownButton.contains(e.target)) {
        return !isDropdownActive && openOptionsDropdown();
      }

      closeOptionsDropdown();
      setIsDropdownActive(false);
    };

    document.addEventListener('mousedown', clickDropdownHandler);
    return () => {
      document.removeEventListener('mousedown', clickDropdownHandler);
    };
  });

  const openOptionsDropdown = () => {
    const { current: toggleDropdownButton } = toggleDropdownButtonRef;
    const { current: completionTitlesDropdown } = completionTitlesDropdownRef;
    const { current: optionsItems } = completionTitlesItemsRef;

    toggleDropdownButton.classList.add('active');
    toggleDropdownButton.classList.remove('Completion-button-hover');
    completionTitlesDropdown.classList.add('active');
    optionsItems[activeOption].current.style.backgroundColor =
      'rgba(55, 23, 23, 0.03)';
  };

  const closeOptionsDropdown = () => {
    const { current: toggleDropdownButton } = toggleDropdownButtonRef;
    const { current: completionTitlesDropdown } = completionTitlesDropdownRef;
    const { current: optionsItems } = completionTitlesItemsRef;

    toggleDropdownButton.classList.remove('active');
    toggleDropdownButton.classList.add('Completion-button-hover');
    completionTitlesDropdown.classList.remove('active');
    optionsItems.forEach(ref => {
      ref.current.style.backgroundColor = 'white';
    });
    closeRangesDropdown();
  };

  const openRangesDropdown = () => {
    const { current: rangeTitlesDropdown } = rangeTitlesDropdownRef;

    rangeTitlesDropdown.classList.add(
      activeOption === 1 ? 'position-right' : 'position-left'
    );
  };

  const closeRangesDropdown = () => {
    const { current: rangeTitlesDropdown } = rangeTitlesDropdownRef;

    rangeTitlesDropdown.classList.remove('position-right', 'position-left');
  };

  // set active option when OPTIONS' items hovered hovered
  const handleHoverOnOption = i => {
    const { current: optionsItems } = completionTitlesItemsRef;

    // reset background colors
    optionsItems.forEach(ref => {
      ref.current.style.backgroundColor = 'white';
    });

    // set background color for hovered item
    optionsItems[i].current.style.backgroundColor =
      i === 1 ? '#f1f1f1' : 'rgba(55, 23, 23, 0.03)';

    // open nested dropdown if hovered item is 'Completed tasks'
    i === 1 ? openRangesDropdown() : closeRangesDropdown();

    return;
  };

  // render checkmark icon if title is selected
  const renderOptionsCheckmark = i => {
    if (activeOption !== i) return <div className='Completion-button-spacer' />;
    return <CheckMarkIcon />;
  };

  const renderRangesCheckmark = i => {
    if (activeRange !== i) return <div className='Completion-button-spacer' />;
    return <CheckMarkIcon />;
  };

  return (
    <>
      <div className='ThemeableButton-container'>
        <div
          ref={toggleDropdownButtonRef}
          onClick={() => setIsDropdownActive(prev => !prev)}
          className='Completion-button Completion-button-hover'
        >
          <div>
            <MiniCheckIcon />
          </div>

          <div>{COMPLETION_TITLES[activeOption]}</div>
        </div>

        <div
          ref={completionTitlesDropdownRef}
          className='Completion-button-dropdown'
        >
          {COMPLETION_TITLES.map((option, i) => {
            return (
              <div
                key={i}
                ref={completionTitlesItemsRef.current[i]}
                className='Completion-button-dropdown-item'
                onClick={e => handleSetActiveOption(e, i)}
                onMouseEnter={() => handleHoverOnOption(i)}
              >
                {renderOptionsCheckmark(i)}
                <span>{option}</span>
                {i === 1 && <ArrowRightIcon />}

                {i === 1 && (
                  <div
                    ref={rangeTitlesDropdownRef}
                    className='Completion-button-dropdown-completed'
                  >
                    {RANGE_TITLES.map((range, i) => {
                      return (
                        <div key={i}>
                          <div
                            ref={rangeTitlesItemsRef.current[i]}
                            onClick={() => setActiveRange(i)}
                            className='Completion-button-dropdown-completed-item'
                          >
                            {renderRangesCheckmark(i)}
                            <span>{range}</span>
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
