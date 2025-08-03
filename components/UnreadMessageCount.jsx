'use client';
import { useState, useEffect } from 'react';
import { useGlobalContext } from '@/context/GlobalContext';

const UnreadMessageCount = ({ session }) => {
  const { unreadCount, setUnreadCount } = useGlobalContext();

  useEffect(() => {
    if (!session) return;

    const fetchUnreadMessages = async () => {
      try {
        const res = await fetch('/api/messages/unread-count');

        if (res.status === 200) {
          const data = await res.json();
          setUnreadCount(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUnreadMessages();
  }, [session]);

  return (
    unreadCount > 0 && <span className="notification-count">{unreadCount}</span>
  );
};
export default UnreadMessageCount;
