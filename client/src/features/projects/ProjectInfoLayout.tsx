import { ReactNode, useState } from 'react';
import { HiOutlineBars3 } from 'react-icons/hi2';

import Navbar from '../../components/Navbar';

const Project = ({ children }: { children: ReactNode }) => {
  return (
    <main className='flex min-h-screen w-full overflow-hidden'>{children}</main>
  );
};

const Sidebar = ({ children }: { children: ReactNode }) => {
  return (
    <aside
      className={`absolute h-full top-0 left-0 lg:relative lg:h-screen bg-bg-light-contrast dark:bg-bg-dark-2 w-[12vw] min-w-[275px]
    `}
    >
      {children}
    </aside>
  );
};

const Content = ({
  includeLogo,
  children,
}: {
  includeLogo?: boolean;
  children: ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section
      className={`flex flex-col flex-1 max-h-screen overflow-y-scroll bg-bg-light-1 dark:bg-bg-dark-1 z-20 ${
        isOpen ? 'translate-x-[275px]' : 'translate-x-0'
      } transition-transform`}
    >
      <Navbar includeLogo={includeLogo} />
      <button
        className='absolute top-3 left-3 z-40 lg:hidden'
        onClick={() => setIsOpen(prev => !prev)}
      >
        <HiOutlineBars3 size={25} />
      </button>
      <div
        className={`h-full w-full flex flex-col items-center pb-4 pt-2 px-6 lg:px-20 transition-all`}
      >
        {children}
      </div>
      {isOpen ? (
        <div
          className='w-full h-full absolute bg-[#d4d2d20e] backdrop-blur-[1px]'
          onClick={() => setIsOpen(false)}
        ></div>
      ) : null}
    </section>
  );
};

Project.Sidebar = Sidebar;
Project.Content = Content;

export default Project;
