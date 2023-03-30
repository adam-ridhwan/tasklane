import { createRef, useRef, useState } from 'react';
import { SORT_TITLES } from '/src/constants/constants.js';

import Button from './components/button';
import Dropdown from './components/dropdown';

import './styles.css';

const SortButton = () => {
  const [selectedOption, setSelectedOption] = useState(SORT_TITLES[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <>
      <div className='ThemeableButton-container'>
        <Button {...{ selectedOption }} />

        <Dropdown />
      </div>
    </>
  );
};

export default SortButton;
