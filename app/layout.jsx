import React from 'react';
import '@/app/index.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuthProvider from '@/components/AuthProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const dynamic = 'force-dynamic';
import { GlobalProvider } from '@/context/GlobalContext';

export const metadata = {
  title: 'PropertyPulse | Find the Perfect Rental',
  description: 'Find your dream rental property',
  keywords: 'rental, find rentals, properties, property, house, apartment',
};

const MainLayout = ({ children }) => {
  return (
    <GlobalProvider>
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
    </GlobalProvider>
  );
};

export default MainLayout;
