import './styles.css';

const GlobalDropdown = props => {
  const { dropdownRef, recentItemsRef, savedSearchesRef } = props;

  const recents = [
    { id: '7170', name: 'BU projects' },
    { id: '7172', name: 'Scrum tasks' },
    { id: '7176', name: 'Cat sitting list' },
  ];

  const savedSearches = [
    { id: '7175', name: 'Tasks I created', icon: NewTaskIcon },
    { id: '0875', name: 'Tasks I assigned to others', icon: AssignedTasksIcon },
    { id: '3640', name: 'Recently completed tasks', icon: CheckMarkIcon },
  ];

  return (
    <>
      <div
        ref={dropdownRef}
        className='TopBarPageHeaderGlobalActions-dropdownContainer'
      >
        <div className='TopBarPageHeaderGlobalActions-title'>Recents</div>

        <div
          ref={recentItemsRef}
          className='TopBarPageHeaderGlobalActions-recentItemsContainer'
        >
          {recents.map(recent => {
            return (
              <div
                key={recent.id}
                className='TopBarPageHeaderGlobalActions-recentItems'
              >
                <div>{MiniSquareIcon}</div>

                <div>
                  <div>{recent.name}</div>
                  <div>Adam's First Team</div>
                </div>
              </div>
            );
          })}
        </div>

        <div
          ref={savedSearchesRef}
          className='TopBarPageHeaderGlobalActions-savedSearchesContainer'
        >
          <div className='TopBarPageHeaderGlobalActions-title'>
            Saved searches
          </div>
          {savedSearches.map(savedSearch => {
            return (
              <div
                key={savedSearch.id}
                className='TopBarPageHeaderGlobalActions-savedSearchesItems'
              >
                <div>{savedSearch.icon}</div>
                <div>{savedSearch.name}</div>
              </div>
            );
          })}
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default GlobalDropdown;

const MiniSquareIcon = (
  <svg
    viewBox='0 0 24 24'
    // aria-hidden='true'
    focusable='false'
    height='0.7rem'
    width='0.7rem'
    fill='#f26fb2'
  >
    <path d='M0 12C0 6.34315 0 3.51472 1.75736 1.75736 3.51472 0 6.34315 0 12 0c5.6569 0 8.4853 0 10.2426 1.75736C24 3.51472 24 6.34315 24 12c0 5.6569 0 8.4853-1.7574 10.2426C20.4853 24 17.6569 24 12 24c-5.65685 0-8.48528 0-10.24264-1.7574C0 20.4853 0 17.6569 0 12Z'></path>
  </svg>
);

const NewTaskIcon = (
  <svg
    viewBox='0 0 32 32'
    aria-hidden='true'
    focusable='false'
    height='1.1rem'
    width='1.1rem'
    fill='#6d6e6f'
  >
    <path d='M15,2L15,2c0.6,0,1,0.4,1,1v4c0,0.6-0.4,1-1,1l0,0c-0.6,0-1-0.4-1-1V3C14,2.4,14.4,2,15,2z M15,26L15,26c0.6,0,1,0.4,1,1v4c0,0.6-0.4,1-1,1l0,0c-0.6,0-1-0.4-1-1v-4C14,26.4,14.4,26,15,26z M24,17L24,17c0-0.6,0.4-1,1-1h4c0.6,0,1,0.4,1,1l0,0c0,0.6-0.4,1-1,1h-4C24.4,18,24,17.6,24,17z M0,17L0,17c0-0.6,0.4-1,1-1h4c0.6,0,1,0.4,1,1l0,0c0,0.6-0.4,1-1,1H1C0.4,18,0,17.6,0,17z M25.6,6.4L25.6,6.4c0.4,0.4,0.4,1,0,1.4l-2.8,2.8c-0.4,0.4-1,0.4-1.4,0l0,0c-0.4-0.4-0.4-1,0-1.4l2.8-2.8C24.6,6,25.2,6,25.6,6.4z M8.6,23.4L8.6,23.4c0.4,0.4,0.4,1,0,1.4l-2.8,2.8c-0.4,0.4-1,0.4-1.4,0l0,0c-0.4-0.4-0.4-1,0-1.4l2.8-2.8C7.6,23,8.2,23,8.6,23.4z M21.4,23.4L21.4,23.4c0.4-0.4,1-0.4,1.4,0l2.8,2.8c0.4,0.4,0.4,1,0,1.4l0,0c-0.4,0.4-1,0.4-1.4,0l-2.8-2.8C21,24.4,21,23.8,21.4,23.4z M4.4,6.4L4.4,6.4c0.4-0.4,1-0.4,1.4,0l2.8,2.8c0.4,0.4,0.4,1,0,1.4l0,0c-0.4,0.4-1,0.4-1.4,0L4.4,7.8C4,7.4,4,6.8,4.4,6.4z'></path>
  </svg>
);

const AssignedTasksIcon = (
  <svg
    viewBox='0 0 32 32'
    aria-hidden='true'
    focusable='false'
    height='1.1rem'
    width='1.1rem'
    fill='#6d6e6f'
  >
    <path d='M16,18c4.4,0,8-3.6,8-8s-3.6-8-8-8s-8,3.6-8,8S11.6,18,16,18z M16,4c3.3,0,6,2.7,6,6s-2.7,6-6,6s-6-2.7-6-6S12.7,4,16,4z M29,25.8c-0.6,0-1,0.4-1,1V31c0,0.6,0.4,1,1,1s1-0.4,1-1v-4.2C30,26.2,29.6,25.8,29,25.8z M24.2,21c0-0.6-0.4-1-1-1H8.8C5,20,2,23,2,26.8V31c0,0.6,0.4,1,1,1s1-0.4,1-1v-4.2C4,24.2,6.2,22,8.8,22h14.4C23.8,22,24.2,21.6,24.2,21z M29.8,20.2c-0.4-0.4-1-0.4-1.4,0l-8.1,8.1l-2.7-2.7c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l3.4,3.4c0.2,0.2,0.4,0.3,0.7,0.3s0.5-0.1,0.7-0.3l8.8-8.8C30.2,21.2,30.2,20.6,29.8,20.2z'></path>
  </svg>
);

const CheckMarkIcon = (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    strokeWidth={1.5}
    stroke='#6d6e6f'
    height='1.2rem'
    width='1.2rem'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
    />
  </svg>
);
