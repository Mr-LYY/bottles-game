import React, { useState } from 'react';
import { Link, useMatch } from 'react-router-dom';

import { Button } from '../Button/Button';
import styles from './Header.module.css';

export const Header = () => {
  const isGamePage = useMatch('/game');
  const [audio] = useState(new Audio('./sounds/common.mp3'));
  const [isMusicOn, setIsMusicOn] = useState(false);

  const handleMusicButtonClick = () => {
    if (isMusicOn) {
      audio.pause();
      setIsMusicOn(false);
    } else {
      audio.currentTime = 0;
      audio
        .play()
        .then(() => setIsMusicOn(true))
        .catch(() => setIsMusicOn(false));
    }
  };

  return (
    <div className={styles.wrapper}>
      {!isGamePage && <div />}
      {isGamePage && (
        <Link to={'/'}>
          <Button className={styles.backButton}>
            <img className={styles.backButtonIcon} src={'./icons/BackArrow.svg'} alt={''} /> Back
          </Button>
        </Link>
      )}
      <Button onClick={handleMusicButtonClick} className={styles.musicButton}>
        <img className={styles.musicButtonIcon} src={`./icons/Music${isMusicOn ? 'Off' : 'On'}.svg`} alt={''} />
      </Button>
    </div>
  );
};
