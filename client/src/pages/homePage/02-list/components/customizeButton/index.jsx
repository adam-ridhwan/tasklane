import { useState } from 'react';

import './styles.css';

const SORT_TITLES = [
  'None',
  'Start Date',
  'Due Date',
  'Created by',
  'Created on',
  'Completed on',
  'Alphabetical',
];

const CustomizeButton = () => {
  const [selectedOption, setSelectedOption] = useState(SORT_TITLES[0]);

  return (
    <>
      <div className='ThemeableButton-container'>
        <div
          className='ThemeableButton-button CustomizeButton-button'
          role='button'
        >
          <div>
            <svg viewBox='0 0 12 12' height='12px' width='12px'>
              <path
                fill='#F06A6A'
                d='M5,1v3c0,0.6-0.4,1-1,1H1C0.4,5,0,4.6,0,4V1c0-0.6,0.4-1,1-1h3C4.6,0,5,0.4,5,1z'
              />
              <path
                fill='#F1BD6C'
                d='M12,1v3c0,0.6-0.4,1-1,1H8C7.4,5,7,4.6,7,4V1c0-0.6,0.4-1,1-1h3C11.6,0,12,0.4,12,1z'
              />
              <path
                fill='#5DA283'
                d='M5,8v3c0,0.6-0.4,1-1,1H1c-0.6,0-1-0.4-1-1V8c0-0.6,0.4-1,1-1h3C4.6,7,5,7.4,5,8z'
              />
              <path
                fill='#4573D2'
                d='M11,12H8c-0.6,0-1-0.4-1-1V8c0-0.6,0.4-1,1-1h3c0.6,0,1,0.4,1,1v3C12,11.6,11.6,12,11,12z M8,8v3h3V8H8z M8,7.5
	L8,8h0V7.5z'
              />
            </svg>
          </div>
          Customize
        </div>
      </div>
    </>
  );
};

export default CustomizeButton;
