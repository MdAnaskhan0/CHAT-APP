import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

// Pages
import Auth from './pages/auth/Auth'
import Chat from './pages/chat/Chat'
import Profile from './pages/profile/Profile'

const App = () => {
  return (
    <Routes>
      {/* Redirect all unknown routes to /auth */}
      <Route path="*" element={<Navigate to="/auth" replace />} />

      <Route path="/auth" element={<Auth />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  )
}

export default App
