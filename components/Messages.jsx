'use client';
import { useState, useEffect } from 'react';
import Spinner from '@/components/Spinner';
import { toast } from 'react-toastify';
import Message from '@/components/Message';
const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await fetch('/api/messages');
        if (res.status !== 200) {
          return toast.error('something went wrong');
        }
        const data = await res.json();
        setMessages(data);
        console.log('this is data', data);
      } catch (error) {
        console.log(error);
        toast.error('Error occured, error.message');
      } finally {
        setLoading(false);
      }
    };
    getMessages();
  }, []);
  if (loading) {
    return <Spinner />;
  }
  return (
    <section className="messages-section">
      <div className="messages-container">
        <div className="message-box">
          <h1 className="message-title">Your Messages</h1>

          <div className="messages-list">
            {messages.length === 0 ? (
              <p>You have no messages.</p>
            ) : (
              messages.map((message) => (
                <Message key={message._id} message={message} />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Messages;
