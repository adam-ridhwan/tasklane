import ExpandSideBarButton from './components/01-expandSideBarButton';
import AvatarPhotoImage from './components/02-avatarPhotoImage';
import TabList from './components/03-tabNavigationList';
import ShareButton from './components/04-shareButton';
import GlobalActionsHeader from './components/05-globalActionsHeader';

import './styles.css';

const TopBar = () => {
  return (
    <>
      <div className='topbar-container'>
        <ExpandSideBarButton />
        <AvatarPhotoImage />
        <TabList />
        {/* <ShareButton /> //? Not sure if i want to implement this yet */}
        <GlobalActionsHeader />
      </div>

      <div className='Topbar-borderOnly'></div>
    </>
  );
};

export default TopBar;
