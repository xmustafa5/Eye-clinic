import { Link, useNavigate } from 'react-router-dom';
import { links } from '../utils/data';
import BurgerMenu from '../assets/menu.png';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [isActive, setIsActive] = useState(false);
  const [error, setError] = useState("");
  const { logout } = useAuth();
  const naviagte = useNavigate();

  const handleClick = event => {
    // 👇️ toggle isActive state on click
    setIsActive(current => !current);
  };
  const handleLogout = async ()=>{
    setError("")
    try{
      await logout();
      naviagte("/login")
    }catch{
      setError("felid to logout")
    }
  }
  return (
    <header className='navbar'>
      <h1 className='logo' >Eye clinic</h1>
      <nav id='mune' className={isActive ? 'active ': ''} >
        {links.map((link, i) => (
          <Link key={i} to={link.link}>
            {link.name}
          </Link>
        ))}
    
      </nav>
      <img
        className='burger'
        src={BurgerMenu}
        onClick={handleClick}
        width={30}
        height={30}
        alt='buger menu'
      />
    </header>
  );
}
