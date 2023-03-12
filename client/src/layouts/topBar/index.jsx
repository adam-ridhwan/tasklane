import ExpandSideBarButton from './components/01-expandSideBarButton';
import AvatarPhotoImage from './components/02-avatarPhotoImage';
import TabList from './components/03-tabNavigationList/tabList';
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
        <ShareButton />
        <GlobalActionsHeader />
      </div>

      <div className='Topbar-borderOnly'></div>
    </>
  );
};

export default TopBar;
