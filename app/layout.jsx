import React from 'react';
import '@/app/index.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuthProvider from '@/components/AuthProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const metadate = {
  title: 'PropertyPulse | Find the Perfect Rental',
  description: 'Find your dream rental property',
  keywords: 'rental, find rentals, properties, property, house, apartment',
};

const MainLayout = ({ children }) => {
  return (
    <AuthProvider>
      <html>
        <body>
          <Navbar />
          <main>{children}</main>;
          <Footer />
          <ToastContainer theme="colored" closeOnClick autoClose={3000} />
        </body>
      </html>
    </AuthProvider>
  );
};

export default MainLayout;
