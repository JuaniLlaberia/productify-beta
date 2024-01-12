import { ReactNode, createContext, useContext, useState } from 'react';
import Navbar from '../../components/Navbar';
import ProjectSidebar from './ProjectSidebar';

//Create context
const ProjectUIContext = createContext<{
  isOpen: boolean;
  open: () => void;
  close: () => void;
} | null>(null);

//UI Wrapper (Makes the layout and shares the state for the menu)
const Project = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return (
    <ProjectUIContext.Provider value={{ open, close, isOpen }}>
      <main className='flex min-h-screen w-full overflow-hidden'>
        {children}
      </main>
    </ProjectUIContext.Provider>
  );
};

//Sidebar
const Sidebar = () => {
  const { close } = useContext(ProjectUIContext)!;

  return (
    <aside
      className={`absolute h-full top-0 left-0 lg:relative lg:h-screen bg-bg-light-contrast dark:bg-bg-dark-2 w-[12vw] min-w-[275px]
    `}
    >
      <ProjectSidebar onClose={close} />
    </aside>
  );
};

//Content
const Content = ({
  children,
}: {
  includeLogo?: boolean;
  children: ReactNode;
}) => {
  const { isOpen, open, close } = useContext(ProjectUIContext)!;

  return (
    <section
      className={`w-full flex flex-col flex-1 max-h-screen bg-bg-light-1 dark:bg-bg-dark-1 ${
        isOpen ? 'translate-x-[275px]' : 'translate-x-0'
      } transition-transform`}
    >
      <Navbar toggleMenu={open} />
      <div
        className={`h-full w-full flex overflow-x-scroll overflow-y-scroll flex-col items-center pb-4 pt-2 px-6 lg:px-20 transition-all md:scrollbar md:scrollbar-thumb-scroll-light-hover hover:md:scrollbar-thumb-scroll-light`}
      >
        {children}
      </div>

      {isOpen ? (
        <div
          className='w-full h-full absolute z-50 bg-[#d4d2d20e] backdrop-blur-[1px] cursor-pointer'
          onClick={close}
        ></div>
      ) : null}
    </section>
  );
};

Project.Sidebar = Sidebar;
Project.Content = Content;

export default Project;
