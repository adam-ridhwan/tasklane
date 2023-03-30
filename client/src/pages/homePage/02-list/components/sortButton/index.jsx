import { createRef, useContext, useEffect, useRef, useState } from 'react';
import { SORT_TITLES } from '/src/constants/constants.js';
import { ToolBarContext } from '/src/context/toolBarContext.jsx';

import Button from './components/button';
import Dropdown from './components/dropdown';

import './styles.css';

const SortButton = () => {
  const { activeSortTitle, setActiveSortTitle } = useContext(ToolBarContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const buttonRef = useRef(null);

  const sortTitlesDropdownRef = useRef(null); // SORT_TITLES dropdown
  const sortTitlesItemsRef = useRef([]); // SORT_TITLES dropdown items
  sortTitlesItemsRef.current = SORT_TITLES.map(
    (_, i) => sortTitlesItemsRef.current[i] ?? createRef()
  );

  const handleSetActiveSortTitle = i => {
    setActiveSortTitle(i);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const clickDropdownHandler = e => {
      const { current: button } = buttonRef;
      const { current: sortTitlesDropdown } = sortTitlesDropdownRef;

      if (sortTitlesDropdown.contains(e.target)) return;

      if (!button.contains(e.target)) return setIsDropdownOpen(false);
    };

    document.addEventListener('mousedown', clickDropdownHandler);
    return () => {
      document.removeEventListener('mousedown', clickDropdownHandler);
    };
  });

  useEffect(() => {
    isDropdownOpen ? openDropdown() : closeDropdown();
  }, [isDropdownOpen]);

  const openDropdown = () => {
    const { current: button } = buttonRef;
    const { current: sortTitlesDropdown } = sortTitlesDropdownRef;
    const { current: sortTitlesItems } = sortTitlesItemsRef;

    button.classList.add('active');
    button.classList.remove('SortButton-hover');
    sortTitlesDropdown.classList.add('active');
    sortTitlesItems[activeSortTitle].current.style.backgroundColor =
      'rgba(55, 23, 23, 0.03)';
  };

  const closeDropdown = () => {
    const { current: button } = buttonRef;
    const { current: sortTitlesDropdown } = sortTitlesDropdownRef;
    const { current: sortTitlesItems } = sortTitlesItemsRef;

    button.classList.remove('active');
    button.classList.add('SortButton-hover');
    sortTitlesDropdown.classList.remove('active');
    sortTitlesItems.forEach(ref => {
      ref.current.style.backgroundColor = 'white';
    });
  };

  const handleHoverOnSortTitle = i => {
    const { current: sortTitlesItems } = sortTitlesItemsRef;

    sortTitlesItems.forEach(
      ref => (ref.current.style.backgroundColor = 'white')
    );

    sortTitlesItems[i].current.style.backgroundColor = 'rgba(55, 23, 23, 0.03)';

    return;
  };

  return (
    <>
      <div className='ThemeableButton-container'>
        <Button
          {...{ buttonRef, activeSortTitle, isDropdownOpen, setIsDropdownOpen }}
        />

        <Dropdown
          {...{
            sortTitlesDropdownRef,
            sortTitlesItemsRef,
            handleSetActiveSortTitle,
            handleHoverOnSortTitle,
            setActiveSortTitle,
          }}
        />
      </div>
    </>
  );
};

export default SortButton;
