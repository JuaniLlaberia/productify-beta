import type { ReactNode } from 'react';

const ProjectWrapper = ({ children }: { children: ReactNode }) => {
  return <section className='flex w-full'>{children}</section>;
};

export default ProjectWrapper;
