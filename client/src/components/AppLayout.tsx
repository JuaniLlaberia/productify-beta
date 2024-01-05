import { ReactNode, useState } from 'react';
import Navbar from './Navbar';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className='flex h-screen w-full bg-bg-light-1 dark:bg-bg-dark-1'>
      {children}
    </main>
  );
};

const Sidebar = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <aside className=' bg-bg-light-contrast dark:bg-bg-dark-2 w-[12vw] min-w-[225px]'>
      {children}
    </aside>
  );
};

const Content = ({ children }: { children: ReactNode }) => {
  return (
    <section className='flex flex-col flex-1'>
      <Navbar />
      <div className='h-full p-6 px-6 lg:px-20'>{children}</div>
    </section>
  );
};

Layout.Sidebar = Sidebar;
Layout.Content = Content;

export default Layout;
