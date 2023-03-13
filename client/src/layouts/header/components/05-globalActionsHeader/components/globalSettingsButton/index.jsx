import { useState } from 'react';

import './styles.css';

const GlobalSettingsButton = () => {
  const [isSettingsAvatarHovered, setIsSettingsAvatarHovered] = useState(false);

  return (
    <>
      <div
        className='TopBarPageHeaderGlobalActions-settingsMenuAvatar'
        onMouseEnter={() => setIsSettingsAvatarHovered(true)}
        onMouseLeave={() => setIsSettingsAvatarHovered(false)}
      >
        AR
        {isSettingsAvatarHovered && (
          <div>
            <div className='TopBarPageHeaderGlobalActions-settingsMenuAvatarSpeechBubble'>
              <div>Adam Ridhwan Amir Hamzah</div>
              <div>bu.edu</div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default GlobalSettingsButton;
