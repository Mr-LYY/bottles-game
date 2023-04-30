import React from 'react';
import { Button } from '../../../shared';
import './Menu.module.css';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Menu.module.css';
import { useGameSettingsStore } from '../../../pocesseses/zustandStores/gameSettingsStore';
import { useBottleStore } from '../../../pocesseses/zustandStores/bottleStore';

export const Menu = () => {
  const defaultBottlesCount = Array(5).fill([]);
  const dispatch = useNavigate();
  const { isGameActive, setIsGameActive } = useGameSettingsStore();
  const { setChosenBottle, setFilledBottles } = useBottleStore();

  const handleNewGame = () => {
    setFilledBottles(defaultBottlesCount);
    setChosenBottle(null);
    setIsGameActive(true);
    dispatch('/game');
  };

  return (
    <ul className={styles.menu}>
      <li>
        <Button onClick={handleNewGame} className={styles.button}>
          New Game
        </Button>
      </li>
      {isGameActive && (
        <Link to={'/game'}>
          <li>
            <Button className={styles.button}>Continue</Button>
          </li>
        </Link>
      )}
      <li>
        <Button className={styles.button}>Settings</Button>
      </li>
      <li>
        <Button className={styles.button}>Quit</Button>
      </li>
    </ul>
  );
};
