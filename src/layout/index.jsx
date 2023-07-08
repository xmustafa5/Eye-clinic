import Footer from './Footer';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Outlet />

      <Footer />
    </>
  );
}
