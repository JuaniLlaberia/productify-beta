import type { ReactNode } from 'react';

const BtnsContainer = ({ children }: { children: ReactNode }) => {
  return <div className='flex items-center justify-between'>{children}</div>;
};

export default BtnsContainer;