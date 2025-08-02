'use client';
import { useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa6';

const ContactForm = ({ property }) => {
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
