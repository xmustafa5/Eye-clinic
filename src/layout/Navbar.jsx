import { Link, useNavigate } from 'react-router-dom';
import { links } from '../utils/data';
import BurgerMenu from '../assets/menu.png';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import ddd from '../assets/LASIK-Self-Test_NY.png'
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
export default function Navbar() {
  const [isActive, setIsActive] = useState(false);
  const [isActive1, setIsActive1] = useState(false);
  const [error, setError] = useState("");
  const { currentUser,logout  } = useAuth(); // Include currentUser from your AuthContext
  const naviagte = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [crop, setCrop] = useState({ aspect: 1 / 1 }); // Adjust aspect ratio as needed
const [croppedImage, setCroppedImage] = useState(null);
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
  const handleEditAvatar = () => {
    setIsPopupOpen(!isPopupOpen);
    setIsOverlayVisible(!isOverlayVisible);

    // Reset cropping values when opening the popup
    setCrop({ x: 0, y: 0 });
    setZoom(1);
  };
  const getCroppedImg = (image, crop) => {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width * scaleX;
    canvas.height = crop.height * scaleY;
    const ctx = canvas.getContext('2d');
  
    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );
  
    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            console.error('Error cropping image');
            reject();
            return;
          }
          const croppedImageUrl = URL.createObjectURL(blob);
          resolve(croppedImageUrl);
        },
        'image/jpeg',
        1
      );
    });
  };
  const handleImageCrop = async () => {
    try {
      const croppedImageUrl = await getCroppedImg(selectedImage, crop);
      setCroppedImage(croppedImageUrl);
    } catch (error) {
      console.error('Error cropping image:', error);
    }
  
    // Close the popup after cropping
    handlePopupToggle();
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

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const handlePopupToggle = () => {
    setIsPopupOpen(!isPopupOpen);
    setIsOverlayVisible(!isOverlayVisible);
  };
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
  <button
    onClick={handlePopupToggle} // Add a new function for handling avatar editing
    className="block absolute top-11 dddder left-32  px-4 py-2 text-sm text-gray-700  dark:text-gray-200 "
  >
    Edit
  </button>
  {isPopupOpen && (
    <div className="popuplog ">
      <div className="modal">
        <div onClick={handlePopupToggle} className="overlay"></div>
        <div className="modal-content">
          <div className="gtre">
            <input
              type="file"
              onChange={(e) => setSelectedImage(e.target.files[0])}
            />
            {selectedImage && (
  <div className="crop-container">
    <ReactCrop
  src={URL.createObjectURL(selectedImage)}
  crop={crop}
  onImageLoaded={(image) => {
    const aspectRatio = image.naturalWidth / image.naturalHeight;
    setCrop({ aspect: aspectRatio });
  }}
  onChange={(newCrop) => setCrop(newCrop)}
/>

  </div>
)}
            <Button onClick={handleImageCrop}>Crop and Save</Button>
          </div>
        </div>
      </div>
    </div>
  )}
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
