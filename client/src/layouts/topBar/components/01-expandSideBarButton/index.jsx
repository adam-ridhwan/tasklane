import './styles.css';

const ExpandSideBarButton = () => {
  return (
    <>
      <div className='Bars3Icon'>{Bars3Icon}</div>
    </>
  );
};

export default ExpandSideBarButton;

const Bars3Icon = (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 -0.5 24 24'
    strokeWidth={1}
    stroke='#6d6e6f'
    height='1.7rem'
    width='1.7rem'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
    />
  </svg>
);
