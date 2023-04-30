import { ReactNode } from 'react';

import { Header } from '../Header/Header';

type TLayout = {
  children: ReactNode;
};

export const Layout = ({ children }: TLayout) => {
  return (
    <>
      <Header />
      {children}
      <ul className="circles">
        {Array(10)
          .fill('')
          .map((_, index) => (
            <li key={index}></li>
          ))}
      </ul>
    </>
  );
};
