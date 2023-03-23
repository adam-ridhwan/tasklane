import { createRef, useContext, useEffect, useRef, useState } from 'react';
import { ToolBarContext } from '/src/context/toolBarContext.jsx';

import ToggleCompletionDropdownButton from './components/01-ToggleCompletionDropdownButton';
import CompletionTitlesDropdown from './components/02-completionTitlesDropdown';
import RangeTitlesDropdown from './components/03-rangeTitlesDropdown';

import './styles.css';

const CompletionButton = () => {
  const {
    activeOption,
    setActiveOption,
    setActiveRange,
    COMPLETION_TITLES,
    RANGE_TITLES,
  } = useContext(ToolBarContext);

  const [isDropdownActive, setIsDropdownActive] = useState(false);

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
  const handleSetActiveCompletionTitle = (e, i) => {
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

      if (label.contains(e.target)) return;

      if (completionTitlesDropdown.contains(e.target)) return;

      if (toggleDropdownButton.contains(e.target))
        return !isDropdownActive && openOptionsDropdown();

      closeOptionsDropdown();
      setIsDropdownActive(false);
      return;
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
    toggleDropdownButton.classList.remove('ToggleDropdownButton-hover');
    completionTitlesDropdown.classList.add('active');
    optionsItems[activeOption].current.style.backgroundColor =
      'rgba(55, 23, 23, 0.03)';
  };

  const closeOptionsDropdown = () => {
    const { current: toggleDropdownButton } = toggleDropdownButtonRef;
    const { current: completionTitlesDropdown } = completionTitlesDropdownRef;
    const { current: optionsItems } = completionTitlesItemsRef;

    toggleDropdownButton.classList.remove('active');
    toggleDropdownButton.classList.add('ToggleDropdownButton-hover');
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
  const handleHoverOnCompletionTitle = i => {
    const { current: optionsItems } = completionTitlesItemsRef;

    optionsItems.forEach(ref => {
      ref.current.style.backgroundColor = 'white';
    });

    optionsItems[i].current.style.backgroundColor =
      i === 1 ? '#f1f1f1' : 'rgba(55, 23, 23, 0.03)';

    i === 1 ? openRangesDropdown() : closeRangesDropdown();

    return;
  };

  return (
    <>
      <div className='ThemeableButton-container'>
        <ToggleCompletionDropdownButton
          toggleDropdownButtonRef={toggleDropdownButtonRef}
          setIsDropdownActive={setIsDropdownActive}
        />

        <CompletionTitlesDropdown
          completionTitlesDropdownRef={completionTitlesDropdownRef}
          completionTitlesItemsRef={completionTitlesItemsRef}
          rangeTitlesDropdownRef={rangeTitlesDropdownRef}
          rangeTitlesItemsRef={rangeTitlesItemsRef}
          handleSetActiveCompletionTitle={handleSetActiveCompletionTitle}
          handleHoverOnCompletionTitle={handleHoverOnCompletionTitle}
          labelRef={labelRef}
        />
      </div>
    </>
  );
};

export default CompletionButton;
