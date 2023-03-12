import LockClosedIcon from '/src/assets/svg/lockClosedIcon';

import './styles.css';

const ShareButton = () => {
  return (
    <>
      <div className='ShareButton'>
        <div>
          <LockClosedIcon />
        </div>
        <p>Share</p>
      </div>
    </>
  );
};
export default ShareButton;
