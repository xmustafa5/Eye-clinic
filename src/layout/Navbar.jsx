import { Link, useNavigate } from 'react-router-dom';
import { links } from '../utils/data';
import BurgerMenu from '../assets/menu.png';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import ddd from '../assets/LASIK-Self-Test_NY.png'
export default function Navbar() {
  const [isActive, setIsActive] = useState(false);
  const [isActive1, setIsActive1] = useState(false);
  const [error, setError] = useState("");
  const { currentUser,logout  } = useAuth(); // Include currentUser from your AuthContext
  const naviagte = useNavigate();
  console.log(currentUser); // Add this line for debugging

  const handleClick = event => {
    // 👇️ toggle isActive state on click
    setIsActive(current => !current);
  };
  const handleButtonClick = () => {
    const section = document.getElementById("shop");
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
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
           <div className='image_login absolute top-20 left-4 drop'>
  <button
    id="dropdownUserAvatarButton"
    onClick={() => setIsActive1(current => !current)}
    data-dropdown-toggle="dropdownAvatar"
    className="flex mx-3 text-sm  mb-2 bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
    type="button"
  >
    <span className="sr-only">Open user menu</span>
    <img src={ddd} alt="d" className="w-8 h-8 rounded-full" />
  </button>

  <div
    id="dropdownAvatar"
    className={`z-10 ${isActive1 ? '' : 'hidden'} bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600`}
  >
    {currentUser ? (
      <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
        <div>{currentUser.displayName || "user"}</div> {/* Display user's full name */}
        <div className="font-medium truncate">{currentUser.email}</div>
      </div>
    ) : null}

    <div className="py-2">
      <a
        onClick={handleLogout}
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
      >
        Sign out
      </a>
    </div>
  </div>
</div>
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
