import { Outlet } from 'react-router-dom';

import AppLayout from '../wrappers/AppLayout';
import MainSidebar from '../features/home/MainSidebar';

const HomeWrapper = () => {
  return (
    <AppLayout>
      <AppLayout.Sidebar>
        <MainSidebar />
      </AppLayout.Sidebar>
      <AppLayout.Content>
        <Outlet />
      </AppLayout.Content>
    </AppLayout>
  );
};

export default HomeWrapper;
