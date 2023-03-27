import { createRef, useContext, useEffect, useRef, useState } from 'react';
import { COMPLETION_TITLES, RANGE_TITLES } from '/src/constants/constants.js';
import { ToolBarContext } from '/src/context/toolBarContext.jsx';

import Button from './components/button';
import Dropdown from './components/dropdown';

import './styles.css';

const CompletionButton = () => {
  const {
    activeCompletionTitle,
    setActiveCompletionTitle,
    setActiveRangeTitle,
  } = useContext(ToolBarContext);

  const [isDropdownActive, setIsDropdownActive] = useState(false);

  const buttonRef = useRef(null); // button that toggles dropdown

  // FIRST LEVEL DROPDOWN
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
  const handleSetActiveCompletionTitle = (e, i) => {
    const { current: label } = labelRef;
    const { current: rangeTitlesDropdown } = rangeTitlesDropdownRef;

    if (label.contains(e.target)) return;

    setActiveCompletionTitle(i);
    setIsDropdownActive(false);

    if (i !== 1) return setActiveRangeTitle(null);

    if (!rangeTitlesDropdown.contains(e.target)) return setActiveRangeTitle(0);
  };

  // click handler for toggling dropdown
  useEffect(() => {
    const clickDropdownHandler = e => {
      const { current: button } = buttonRef;
      const { current: completionTitlesDropdown } = completionTitlesDropdownRef;

      if (completionTitlesDropdown.contains(e.target)) return;

      if (!button.contains(e.target)) return setIsDropdownActive(false);
    };

    document.addEventListener('mousedown', clickDropdownHandler);
    return () => {
      document.removeEventListener('mousedown', clickDropdownHandler);
    };
  });

  // toggling dropdown functionality
  useEffect(() => {
    isDropdownActive ? openOptionsDropdown() : closeOptionsDropdown();
  }, [isDropdownActive]);

  const openOptionsDropdown = () => {
    const { current: button } = buttonRef;
    const { current: completionTitlesDropdown } = completionTitlesDropdownRef;
    const { current: completionTitlesItems } = completionTitlesItemsRef;

    button.classList.add('active');
    button.classList.remove('CompletionButton-hover');
    completionTitlesDropdown.classList.add('active');
    completionTitlesItems[activeCompletionTitle].current.style.backgroundColor =
      'rgba(55, 23, 23, 0.03)';
  };

  const closeOptionsDropdown = () => {
    const { current: button } = buttonRef;
    const { current: completionTitlesDropdown } = completionTitlesDropdownRef;
    const { current: completionTitlesItems } = completionTitlesItemsRef;

    button.classList.remove('active');
    button.classList.add('CompletionButton-hover');
    completionTitlesDropdown.classList.remove('active');
    completionTitlesItems.forEach(ref => {
      ref.current.style.backgroundColor = 'white';
    });
    closeRangesDropdown();
  };

  const openRangesDropdown = () => {
    const { current: rangeTitlesDropdown } = rangeTitlesDropdownRef;

    rangeTitlesDropdown.classList.add(
      activeCompletionTitle === 1 ? 'position-right' : 'position-left'
    );
  };

  const closeRangesDropdown = () => {
    const { current: rangeTitlesDropdown } = rangeTitlesDropdownRef;

    rangeTitlesDropdown.classList.remove('position-right', 'position-left');
  };

  // set active option when OPTIONS' items hovered hovered
  const handleHoverOnCompletionTitle = i => {
    const { current: completionTitlesItems } = completionTitlesItemsRef;

    completionTitlesItems.forEach(ref => {
      ref.current.style.backgroundColor = 'white';
    });

    completionTitlesItems[i].current.style.backgroundColor =
      i === 1 ? '#f1f1f1' : 'rgba(55, 23, 23, 0.03)';

    i === 1 ? openRangesDropdown() : closeRangesDropdown();

    return;
  };

  return (
    <>
      <div className='ThemeableButton-container'>
        <Button
          {...{
            buttonRef,
            setIsDropdownActive,
          }}
        />

        <Dropdown
          {...{
            completionTitlesDropdownRef,
            completionTitlesItemsRef,
            rangeTitlesDropdownRef,
            rangeTitlesItemsRef,
            labelRef,
            handleSetActiveCompletionTitle,
            handleHoverOnCompletionTitle,
          }}
        />
      </div>
    </>
  );
};

export default CompletionButton;
