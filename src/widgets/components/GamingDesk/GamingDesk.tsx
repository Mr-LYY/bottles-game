import React, { useEffect } from 'react';
import { Bottle } from '../../../shared';
import { Button } from '../../../shared';
import { DevPanel } from '../DevPanel/DevPanel';
import { useBottleStore } from '../../../pocesseses/zustandStores/bottleStore';
import { useGameSettingsStore } from '../../../pocesseses/zustandStores/gameSettingsStore';

const colorList = ['#ff7f50', '#32cd32', '#6495ed', '#cd5c5c', '#ffa500', '#40e0d0'];

function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const getRandomColor = (colorList: string[]) => {
  return colorList[Math.floor(Math.random() * colorList.length)];
};

const getLimitedColorsArray = (colorList: string[], totalColorsLimit: number) => {
  const localColorList: string[] = [];
  const getUniqueColor = (colorList: string[]): string => {
    const color = getRandomColor(colorList);

    if (localColorList.includes(color)) {
      return getUniqueColor(colorList);
    }

    return color;
  };

  for (let i = 0; i < totalColorsLimit; i++) {
    localColorList.push(getUniqueColor(colorList));
  }

  return localColorList;
};

type TFillBottlesSettings = {
  colorsList: string[];
  bottlesLimit: number;
  oneBottleMax: number;
  oneBottleMin: number;
};

function getShuffledArray(array: string[]) {
  const shuffledArray = [...array];

  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return shuffledArray;
}

const prepareColorsForFill = (
  colorsList: string[],
  bottlesLimit: number,
  oneBottleMax: number,
  oneBottleMin: number
) => {
  const limitedColorsArray = getLimitedColorsArray(colorsList, bottlesLimit);
  const bottlesWithColors = [];

  for (let i = 0; i < bottlesLimit; i++) {
    bottlesWithColors.push(...Array(randomIntFromInterval(oneBottleMin, oneBottleMax)).fill(limitedColorsArray[i]));
  }

  return getShuffledArray(bottlesWithColors);
};

const fillBottles = (settings: TFillBottlesSettings) => {
  const { colorsList, bottlesLimit, oneBottleMax, oneBottleMin } = settings;
  const preparedColors = prepareColorsForFill(colorsList, bottlesLimit, oneBottleMax, oneBottleMin);
  const bottlesWithColors = Array(bottlesLimit).fill([]);

  for (let i = 0, bottleNumber = 0; i < preparedColors.length; i++) {
    bottlesWithColors[bottleNumber] = bottlesWithColors[bottleNumber].concat(preparedColors.slice(i, i + 1));
    bottleNumber = bottleNumber === bottlesLimit - 1 ? 0 : bottleNumber + 1;
  }

  return bottlesWithColors;
};

const startTheGame = (colorsList: string[], bottlesCount: number) => {
  const filledBottles = fillBottles({
    colorsList,
    bottlesLimit: bottlesCount,
    oneBottleMax: 2,
    oneBottleMin: 1,
  });
  localStorage.setItem('filledBottles', JSON.stringify(filledBottles));
  return filledBottles;
};

const checkIfGameIsWon = (filledBottles: string[][]) => {
  return filledBottles.every((bottle) => {
    if (!bottle.length) return false;

    return bottle.every((color) => color === bottle[0]);
  });
};

type TGamingDeskSettings = {
  bottlesCount?: number;
};

export const GamingDesk = (settings: TGamingDeskSettings) => {
  const { bottlesCount = 3 } = settings;
  const defaultBottlesCount = Array(bottlesCount).fill([]);
  const { filledBottles, setFilledBottles, chosenBottle, setChosenBottle } = useBottleStore();
  const { isGameActive, setIsGameActive } = useGameSettingsStore();

  useEffect(() => {
    if (!isGameActive) return;

    if (checkIfGameIsWon(filledBottles)) {
      setTimeout(() => {
        setIsGameActive(false);
        alert('You won!');
      }, 500);
    }
  }, [filledBottles, isGameActive, setIsGameActive]);

  const handleChooseBottle = (bottleNumber: number) => {
    if (chosenBottle === null) {
      setChosenBottle(bottleNumber);
    } else {
      const newFilledBottles = [...filledBottles];
      const pickedColor = newFilledBottles[chosenBottle].pop();

      setChosenBottle(null);

      if (pickedColor) {
        newFilledBottles[bottleNumber].push(pickedColor);
        return setFilledBottles(newFilledBottles);
      }
    }
  };

  const handleStartTheGame = (colorList: string[]) => {
    setIsGameActive(true);
    setChosenBottle(null);
    setFilledBottles(startTheGame(colorList, bottlesCount));
  };

  const handleClearAllBottles = () => {
    setChosenBottle(null);
    setFilledBottles(defaultBottlesCount);
    localStorage.removeItem('filledBottles');
  };

  const handleIsChosen = (bottleNumber: number) => {
    return chosenBottle === bottleNumber;
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 600,
        margin: 'auto',
      }}
    >
      <div style={{ display: 'flex', marginTop: 200 }}>
        {filledBottles.map((bottle: string[], index: number) => {
          return (
            <div key={index} onClick={() => handleChooseBottle(index)}>
              <Bottle isChosen={handleIsChosen(index)} colorsArray={bottle} />
            </div>
          );
        })}
      </div>
      <div>
        <DevPanel>
          <div>
            <h3>This is dev panel</h3>
            <div style={{ display: 'flex' }}>
              Filled bottles: {'  '}
              {filledBottles.map((colors: string[], index: number) => {
                return <span key={index}>[{colors.length}]</span>;
              })}
            </div>
            <div>First bottle: {chosenBottle || 'null'}</div>
          </div>
        </DevPanel>
        <div style={{ display: 'flex' }}>
          <Button onClick={() => handleStartTheGame(colorList)}>Start the game</Button>
          <Button style={{ padding: 0, marginLeft: 0 }} onClick={() => handleClearAllBottles()}>
            <img style={{ width: 34, margin: '8px 16px 0px' }} src={'./icons/ResetArrows.svg'} alt={''} />
          </Button>
        </div>
      </div>
    </div>
  );
};
