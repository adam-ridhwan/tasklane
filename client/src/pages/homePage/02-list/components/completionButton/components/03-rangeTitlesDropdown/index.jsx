import { useContext } from 'react';
import { ToolBarContext } from '/src/context/toolBarContext.jsx';

import './styles.css';

const RangeTitlesDropdown = props => {
  const { rangeTitlesDropdownRef, rangeTitlesItemsRef, labelRef } = props;
  const { RANGE_TITLES, activeRange, setActiveRange } =
    useContext(ToolBarContext);

  const renderCheckmark = i => {
    if (activeRange !== i)
      return <div className='RangeTitlesDropdown-spacer' />;
    return <CheckMarkIcon />;
  };

  return (
    <>
      <div ref={rangeTitlesDropdownRef} className='RangeTitlesDropdown'>
        {RANGE_TITLES.map((range, i) => {
          return (
            <div key={i}>
              <div
                ref={rangeTitlesItemsRef.current[i]}
                onClick={() => setActiveRange(i)}
                className='RangeTitlesDropdown-item'
              >
                {renderCheckmark(i)}
                <span>{range}</span>
              </div>

              {i === 0 && (
                <div ref={labelRef} className='RangeTitlesDropdown-label'>
                  Marked complete since:
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default RangeTitlesDropdown;

const CheckMarkIcon = () => {
  return (
    <>
      <svg
        className='RangeTitlesDropdown-checkMarkIcon'
        viewBox='0 0 32 32'
        aria-hidden='true'
        focusable='false'
      >
        <path d='M10.9,26.2c-0.5,0-1-0.2-1.4-0.6l-6.9-6.9c-0.8-0.8-0.8-2,0-2.8s2-0.8,2.8,0l5.4,5.4l16-15.9c0.8-0.8,2-0.8,2.8,0s0.8,2,0,2.8L12.3,25.6C11.9,26,11.4,26.2,10.9,26.2z'></path>
      </svg>
    </>
  );
};
