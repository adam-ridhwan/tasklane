import { useContext } from 'react';
import { ToolBarContext } from '/src/context/toolBarContext.jsx';

import NestedDropdown from '../nestedDropdown';

import './styles.css';

const Dropdown = props => {
  const {
    completionTitlesDropdownRef,
    completionTitlesItemsRef,
    rangeTitlesDropdownRef,
    rangeTitlesItemsRef,
    labelRef,
    handleSetActiveCompletionTitle,
    handleHoverOnCompletionTitle,
  } = props;

  const { COMPLETION_TITLES, activeOption } = useContext(ToolBarContext);

  // render checkmark icon if title is selected
  const renderCheckmark = i => {
    if (activeOption !== i)
      return <div className='CompletionTitlesDropdown-spacer' />;
    return <CheckMarkIcon />;
  };

  return (
    <>
      <div
        ref={completionTitlesDropdownRef}
        className='CompletionTitlesDropdown'
      >
        {COMPLETION_TITLES.map((title, i) => {
          return (
            <div
              key={i}
              ref={completionTitlesItemsRef.current[i]}
              className='CompletionTitlesDropdown-item '
              onClick={e => handleSetActiveCompletionTitle(e, i)}
              onMouseEnter={() => handleHoverOnCompletionTitle(i)}
            >
              {renderCheckmark(i)}
              <span>{title}</span>
              {i === 1 && <ArrowRightIcon />}

              {i === 1 && (
                <NestedDropdown
                  rangeTitlesDropdownRef={rangeTitlesDropdownRef}
                  rangeTitlesItemsRef={rangeTitlesItemsRef}
                  labelRef={labelRef}
                />
              )}
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
        className='CompletionTitlesDropdown-checkMarkIcon'
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
        className='CompletionTitlesDropdown-arrowRightIcon'
        viewBox='0 0 32 32'
        aria-hidden='true'
        focusable='false'
      >
        <path d='M23.2,16c0,0.3-0.1,0.7-0.3,0.9l-9,11c-0.5,0.6-1.5,0.7-2.1,0.2s-0.7-1.5-0.2-2.1l8.2-10L11.6,6c-0.5-0.6-0.4-1.6,0.2-2.1s1.6-0.4,2.1,0.2l9,11C23.1,15.3,23.2,15.7,23.2,16z'></path>
      </svg>
    </>
  );
};
