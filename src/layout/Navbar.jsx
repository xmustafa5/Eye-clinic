import { Link, useNavigate } from 'react-router-dom';
import { links } from '../utils/data';
import BurgerMenu from '../assets/menu.png';
import { useState } from 'react';

import { Button } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import ddd from '../assets/LASIK-Self-Test_NY.png'
export default function Navbar() {
  const [isActive, setIsActive] = useState(false);
  const [error, setError] = useState("");
  const { logout, currentUser } = useAuth(); // Include currentUser from your AuthContext
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
  return (
    <header className='navbar'>
            <div className='image_login absolute top-20 left-4 '>

<button id="dropdownUserAvatarButton" onClick={() => setIsActive(current => !current)}  data-dropdown-toggle="dropdownAvatar" class="flex mx-3 text-sm  mb-2 bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" type="button">
    <span class="sr-only">Open user menu</span>
    {currentUser.photoURL && <img src={currentUser.photoURL} alt="User" className="w-12 h-12 rounded-full mt-2" />}
</button>


<div id="dropdownAvatar" class=
 {`z-10 ${isActive ? '' : 'hidden'} bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600`}>
 <div class="px-4 py-3 text-sm text-gray-900 dark:text-white">
 <div>{currentUser.displayName}</div> {/* Display user's full name */}
 <div className="font-medium truncate">{currentUser.email}</div>
    </div>

    <div class="py-2">
      <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
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
