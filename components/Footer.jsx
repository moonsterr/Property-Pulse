import React from 'react';
import Image from 'next/image';
import logo from '@/assets/images/logo.png'; // Adjust path if needed

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <Image src={logo} alt="Logo" width={100} height={32} />
        </div>
        <div className="footer-links">
          <ul>
            <li>
              <a href="/properties.html">Properties</a>
            </li>
            <li>
              <a href="/terms.html">Terms of Service</a>
            </li>
          </ul>
        </div>
        <div className="footer-copy">
          <p>&copy; 2024 PropertyPulse. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
