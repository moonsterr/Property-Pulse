import React from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useGlobalContext } from '@/context/GlobalContext';
const Message = ({ message }) => {
  const [isRead, setIsRead] = useState(message.read);
  const [isDeleted, setIsDeleted] = useState(false);
  const { setUnreadCount } = useGlobalContext();
  const handleReadClick = async () => {
    try {
      const res = await fetch(`/api/messages/${message._id}`, {
        method: 'PUT',
      });

      if (res.status === 200) {
        const { read } = await res.json();
        setIsRead(read);
        setUnreadCount((prevCount) => (read ? prevCount - 1 : prevCount + 1));
        if (read) {
          toast.success('Marked as read');
        } else {
          toast.success('Marked as new');
        }
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  const handleDeleteClick = async () => {
    try {
      const res = await fetch(`/api/messages/${message._id}`, {
        method: 'DELETE',
      });

      if (res.status === 200) {
        setIsDeleted(true);
        setUnreadCount((prevCount) => prevCount - 1);
        toast.success('Message Deleted');
      }
    } catch (error) {
      console.log(error);
      toast.error('Message was not deleted');
    }
  };
  if (isDeleted) return;
  return (
    <div className="message-card">
      <h2 className="message-subtitle">
        <span className="bold">Property Inquiry:</span>{' '}
        {message?.property?.name}
      </h2>

      <p className="message-body">{message?.body}</p>

      <ul className="message-info">
        <li>
          <strong>Name:</strong> {message?.sender?.username}
        </li>
        <li>
          <strong>Reply Email:</strong>
          <a href={`mailto:${message?.email}`}>{message?.email}</a>
        </li>
        <li>
          <strong>Reply Phone:</strong>
          <a href={`tel:${message?.phone}`}>{message?.phone}</a>
        </li>
        <li>
          <strong>Received:</strong>{' '}
          {new Date(message?.createdAt).toLocaleString()}
        </li>
      </ul>

      <button
        onClick={handleReadClick}
        className={`mark-read-btn ${isRead && 'read-btn-new'}`}
      >
        {isRead ? 'Mark As New' : 'Mark As Read'}
      </button>
      <button onClick={handleDeleteClick} className="delete-btn">
        Delete
      </button>
    </div>
  );
};

export default Message;
