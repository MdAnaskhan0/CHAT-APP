import { Navigate, Outlet } from 'react-router-dom';
import { useAppStore } from '../store/index.js';

const AuthRoutes = () => {
  const { userInfo } = useAppStore();
  return !userInfo ? <Outlet /> : <Navigate to="/chat" replace />;
};

export default AuthRoutes;