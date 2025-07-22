import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Route Guards
import AuthRoutes from './routes/authRoutes.jsx';
import PrivateRoutes from './routes/privateRoutes.jsx';

// Pages
import Auth from './pages/auth/Auth';
import Chat from './pages/chat/Chat';
import Profile from './pages/profile/Profile';

const App = () => {
  return (
    <Routes>
      {/* Redirect all unknown routes to /auth */}
      <Route path="*" element={<Navigate to="/auth" replace />} />

      {/* Auth Routes (Only accessible if NOT logged in) */}
      <Route element={<AuthRoutes />}>
        <Route path="/auth" element={<Auth />} />
      </Route>

      {/* Private Routes (Only accessible if logged in) */}
      <Route element={<PrivateRoutes />}>
        <Route path="/chat" element={<Chat />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
};

export default App;