import React from 'react';
import styles from './Button.module.css';
import classnames from 'classnames';

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export const Button = (props: IButtonProps) => {
  const { children, className, ...restProps } = props;
  return (
    <button className={classnames(styles.button, className)} {...restProps}>
      {children}
    </button>
  );
};
