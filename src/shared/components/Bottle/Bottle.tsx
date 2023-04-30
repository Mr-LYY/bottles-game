import React from 'react';
import styles from './Bottle.module.css';

type TBottle = {
  colorsArray: string[];
  isChosen: boolean;
};

export const Bottle = ({ colorsArray, isChosen }: TBottle) => {
  return (
    <div className={styles.wrapper}>
      <img
        style={{
          position: 'absolute',
          left: 0,
          bottom: 0,
          pointerEvents: 'none',
          zIndex: 1,
        }}
        src={isChosen ? './glass-outline.png' : './glass.png'}
        alt={''}
        width={200}
      />
      <div
        className={styles.mask}
        style={{
          position: 'absolute',
          left: 0,
          bottom: 0,
          display: 'flex',
          flexDirection: 'column-reverse',
          justifyContent: 'flex-start',
          width: 200,
          height: 223,
        }}
      >
        {colorsArray.map((color, index, self) => {
          return (
            <div
              key={color + index}
              style={{
                backgroundColor: color,
                borderTop: self[index + 1] === color ? '' : '2px  solid white',
                width: 200,
                height: index === 0 ? 60 : 30,
              }}
            ></div>
          );
        })}
      </div>
    </div>
  );
};
