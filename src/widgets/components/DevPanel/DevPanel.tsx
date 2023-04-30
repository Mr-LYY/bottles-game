import React from 'react';
import { Button } from '../../../shared';
import { useDevPanelStore } from '../../../pocesseses/zustandStores/devPanel';
import styles from './DevPanel.module.css';
import classnames from 'classnames';

type TDevPanelProps = {
  children: React.ReactNode;
};

export const DevPanel = ({ children }: TDevPanelProps) => {
  const { isDevPanelOpen, toggleDevPanel } = useDevPanelStore();

  return (
    <div className={classnames(styles.wrapper, isDevPanelOpen && styles.wrapper_open)}>
      <div className={styles.content}>
        <Button
          style={{ margin: 0, left: 20, top: -70, width: 'fit-content', position: 'absolute' }}
          onClick={() => toggleDevPanel()}
        >
          dev panel
        </Button>
        {children}
      </div>
    </div>
  );
};
