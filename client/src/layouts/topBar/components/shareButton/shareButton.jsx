import './shareButton.styles.css';

const ShareButton = () => {
  return (
    <>
      <div className='ShareButton'>
        <div>{LockClosedIcon}</div>
        <p>Share</p>
      </div>
    </>
  );
};
export default ShareButton;

const LockClosedIcon = (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 28 28'
    fill='#6d6e6f'
    height='1rem'
    width='1rem'
  >
    <path
      fillRule='evenodd'
      d='M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z'
      clipRule='evenodd'
    />
  </svg>
);