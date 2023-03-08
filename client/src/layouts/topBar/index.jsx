import AvatarPhotoImage from './components/avatarPhotoImage/avatarPhotoImage';
import ExpandSideBarButton from './components/expandSideBarButton/expandSideBarButton';
import GlobalActionsHeader from './components/globalActionsHeader/globalActionsHeader';
import ShareButton from './components/shareButton/shareButton';
import TabList from './components/tabList/tabList';

import './index.css';

const TopBar = () => {
  return (
    <>
      <div className='topbar-container'>
        <ExpandSideBarButton />
        <AvatarPhotoImage />
        <TabList />
        <ShareButton />
        <GlobalActionsHeader />
      </div>

      <div className='Topbar-borderOnly'></div>
    </>
  );
};

export default TopBar;
