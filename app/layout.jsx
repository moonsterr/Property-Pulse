import React from 'react';
import '@/app/index.css';
import Navbar from '@/components/Navbar';

export const metadate = {
  title: 'PropertyPulse | Find the Perfect Rental',
  description: 'Find your dream rental property',
  keywords: 'rental, find rentals, properties, property, house, apartment',
};
const MainLayout = ({ children }) => {
  return (
    <html>
      <body>
        <Navbar />
        <main>{children}</main>;
      </body>
    </html>
  );
};

export default MainLayout;
