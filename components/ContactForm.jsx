import React from 'react';
import { FaPaperPlane } from 'react-icons/fa6';

const ContactForm = () => {
  return (
    <div className="property-contact-card">
      <h3 className="property-contact-heading">Contact Property Manager</h3>
      <form>
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
          ></textarea>
        </div>
        <div>
          <button className="property-contact-btn" type="submit">
            <FaPaperPlane className="property-sidebar-btn-icon" /> Send Message
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
