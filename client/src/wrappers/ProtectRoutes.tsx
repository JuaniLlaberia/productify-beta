import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';

const ProtectRoutes = () => {
  const navigate = useNavigate();
  const { user } = useUserContext();

  useEffect(() => {
    if (user?.status === 'failed') return navigate('/');
  }, [user, navigate]);

  if (user?.status === 'success') return <Outlet />;
};

export default ProtectRoutes;
