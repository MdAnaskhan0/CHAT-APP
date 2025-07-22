import { Navigate, Outlet } from 'react-router-dom';
import { useAppStore } from '../store/index.js';

const PrivateRoutes = () => {
  const { userInfo } = useAppStore();
  return userInfo ? <Outlet /> : <Navigate to="/auth" replace />;
};

export default PrivateRoutes;