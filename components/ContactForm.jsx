'use client';
import { useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa6';
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';

const ContactForm = ({ property }) => {
  const { data: session } = useSession();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [wasSubmitted, setWasSubmitted] = useState(false);

  async function handleSubmit() {
    const data = {
      name,
      email,
      phone,
      message,
      recipient: property.owner,
      property: property._id,
    };
    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const recieved = res.json();
      if (res.status === 200) {
        toast.success('Mssage sent succesfuly');
        setWasSubmitted(true);
      } else if (res.status === 400 || res.status === 401) {
        toast.error(recieved.message);
      } else {
        toast.error('An error occured');
      }
    } catch (error) {
      console.log(error);
      toast.error('Error sending form');
    }
  }
  if (!session) {
    return (
      <div className="property-contact-card">
        <h3 className="property-contact-heading">Contact Property Manager</h3>
        <p>Please Log in to send a message</p>
      </div>
    );
  }
  return (
    <div className="property-contact-card">
      <h3 className="property-contact-heading">Contact Property Manager</h3>

      {wasSubmitted ? (
        <p className="was-submitted-paragraph">
          Your Message has been sent succesfuly
        </p>
      ) : (
        <form action={handleSubmit}>
          <div className="property-form-group">
            <label className="property-form-label" htmlFor="name">
              Name:
            </label>
            <input
              className="property-form-input"
              id="name"
              name="name"
              type="text"
              placeholder="Enter your name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="property-form-group">
            <label className="property-form-label" htmlFor="email">
              Email:
            </label>
            <input
              className="property-form-input"
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="property-form-group">
            <label className="property-form-label" htmlFor="phone">
              Phone:
            </label>
            <input
              className="property-form-input"
              id="phone"
              name="phone"
              type="text"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="property-form-group">
            <label className="property-form-label" htmlFor="message">
              Message:
            </label>
            <textarea
              className="property-form-input property-form-textarea"
              id="message"
              name="message"
              placeholder="Enter your message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>
          <div>
            <button className="property-contact-btn" type="submit">
              <FaPaperPlane className="property-sidebar-btn-icon" /> Send
              Message
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ContactForm;
