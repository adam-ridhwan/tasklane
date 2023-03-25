import { SORT_TITLES } from '/src/constants/constants.js';

import './styles.css';

const Dropdown = () => {
  const renderCheckmark = i => {
    if (0 !== i) return <div className='SortTitlesDropdown-spacer' />;
    return <CheckMarkIcon />;
  };

  return (
    <>
      <div className='SortTitlesDropdown'>
        {SORT_TITLES.map((title, i) => {
          return (
            <div key={i} className='SortTitlesDropdown-item'>
              {renderCheckmark(i)}
              <span>{title}</span>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Dropdown;

const CheckMarkIcon = () => {
  return (
    <>
      <svg
        className='SortTitlesDropdown-checkMarkIcon'
        viewBox='0 0 32 32'
        aria-hidden='true'
        focusable='false'
      >
        <path d='M10.9,26.2c-0.5,0-1-0.2-1.4-0.6l-6.9-6.9c-0.8-0.8-0.8-2,0-2.8s2-0.8,2.8,0l5.4,5.4l16-15.9c0.8-0.8,2-0.8,2.8,0s0.8,2,0,2.8L12.3,25.6C11.9,26,11.4,26.2,10.9,26.2z'></path>
      </svg>
    </>
  );
};
