import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../store/index.js';

const Chat = () => {
  const navigate = useNavigate();
  const { userInfo } = useAppStore();

  useEffect(() => {
    if (!userInfo) {
      navigate('/auth');
    } else if (!userInfo.profileSetUp) {
      navigate('/profile');
    }
  }, [userInfo, navigate]);

  return <div>Chat</div>;
};

export default Chat;