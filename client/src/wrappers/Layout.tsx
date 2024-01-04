import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <main className='flex h-screen'>
      <Outlet />
    </main>
  );
};

export default Layout;
