import { useState } from 'react';

import './globalSettingsButton.styles.css';

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
          <div className='TopBarPageHeaderGlobalActions-settingsMenuAvatarSpeechBubble'>
            Adam Ridhwan Amir Hamzah
          </div>
        )}
      </div>
    </>
  );
};
export default GlobalSettingsButton;
