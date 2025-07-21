import React from 'react';
import '@/app/index.css';

export const metadate = {
  title: 'PropertyPulse | Find the Perfect Rental',
  description: 'Find your dream rental property',
  keywords: 'rental, find rentals, properties, property, house, apartment',
};
const MainLayout = ({ children }) => {
  return (
    <html>
      <body>
        <div>{children}</div>;
      </body>
    </html>
  );
};

export default MainLayout;
