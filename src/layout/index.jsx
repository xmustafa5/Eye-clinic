import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';

export default function Layout({ children, hideNavbarAndFooter }) {
  return (
    <>
      {!hideNavbarAndFooter && <Navbar />}
      {children}
      {!hideNavbarAndFooter && <Footer />}
    </>
  );
}
