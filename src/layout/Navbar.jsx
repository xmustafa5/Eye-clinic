import { Link, useNavigate } from "react-router-dom";
import { links } from "../utils/data";
import BurgerMenu from "../assets/menu.png";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { updateProfile } from "firebase/auth"; // Import the updateProfile function
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import ddd from "../assets/LASIK-Self-Test_NY.png";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
export default function Navbar() {
  const [isActive, setIsActive] = useState(false);
  const [isActive1, setIsActive1] = useState(false);
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth(); // Include currentUser from your AuthContext
  const naviagte = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [crop, setCrop] = useState({ aspect: 1 / 1 }); // Adjust aspect ratio as needed
  const [croppedImage, setCroppedImage] = useState(null);
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [newDisplayName, setNewDisplayName] = useState("");

  const handleClick = (event) => {
    // 👇️ toggle isActive state on click
    setIsActive((current) => !current);
  };
  const handleButtonClick = () => {
    const section = document.getElementById("shop");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
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
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width * scaleX;
    canvas.height = crop.height * scaleY;
    const ctx = canvas.getContext("2d");

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
            console.error("Error cropping image");
            reject();
            return;
          }
          const croppedImageUrl = URL.createObjectURL(blob);
          resolve(croppedImageUrl);
        },
        "image/jpeg",
        1
      );
    });
  };

  const handleImageCrop = async () => {
    try {
      if (newDisplayName && newDisplayName !== currentUser.displayName) {
        await updateProfile(currentUser, { displayName: newDisplayName });
      }

      if (selectedImageFile) {
        // Upload cropped image to Firebase Storage
        const storage = getStorage();
        const storageRef = ref(storage, `profile_images/${currentUser.uid}`);
        await uploadBytes(storageRef, selectedImageFile);

        // Get the URL of the uploaded image
        const imageUrl = await getDownloadURL(storageRef);

        // Update user's profile image URL in authentication system
        await updateProfile(currentUser, { photoURL: imageUrl });
      }

      console.log("Profile updated");
      handlePopupToggle();
    } catch (error) {
      console.error("Error cropping image:", error);
    }
  };

  const handleLogout = async () => {
    setError("");
    try {
      await logout();
      naviagte("/login");
    } catch {
      setError("felid to logout");
    }
  };
  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    setSelectedImageFile(imageFile);
  };
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const handlePopupToggle = () => {
    setIsPopupOpen(!isPopupOpen);
    setIsOverlayVisible(!isOverlayVisible);
  };
  return (
    <header className="navbar">
      <div className="image_login absolute top-20 left-4 drop">
        <button
          id="dropdownUserAvatarButton"
          onClick={() => setIsActive1((current) => !current)}
          data-dropdown-toggle="dropdownAvatar"
          className="flex mx-3 text-sm  mb-2 bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
          type="button"
        >
          <span className="sr-only">Open user menu</span>
          <img
            src={currentUser.photoURL || ddd} // Use currentUser's photoURL if available, otherwise use default image
            alt="Profile"
            className="w-8 h-8 rounded-full"
          />
        </button>

        <div
          id="dropdownAvatar"
          className={`z-10 ${
            isActive1 ? "" : "hidden"
          } bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600`}
        >
          {currentUser ? (
            <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
              <div>{currentUser.displayName || "user"}</div>
              {/* Display user's full name */}
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
              <div className="popuplog  ">
                <div className="modal">
                  <div onClick={handlePopupToggle} className="overlay"></div>
                  <div className="modal-content mo">
                    <div className="gtre">
                      <div class="relative z-0 w-full mb-6 group">
                        <input
                          type="text"
                          onChange={(e) => setNewDisplayName(e.target.value)}
                          name="floating_name"
                          id="floating_name"
                          class="block py-2.5 px-0 w-full text-gray-800 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-red-900 focus:outline-none focus:ring-0 focus:border-y-cyan-400 peer"
                          placeholder=" "
                          maxLength={20}
                          required
                        />
                        <label
                          for="floating_name"
                          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-light-blue-300 peer-focus:dark:text-red-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Full Name
                        </label>
                      </div>

                      <input
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                        onChange={handleImageChange}
                      />
                      {/* {selectedImageFile && (
                        <img
                          src={URL.createObjectURL(selectedImageFile)}
                          alt="Selected"
                          className="mx-auto mt-4"
                          style={{ maxWidth: "100%", maxHeight: "200px" }}
                        />
                      )} */}
                      <div className=" fde ">
                        <div className="fde">

                      
                        <img
                          src={
                            selectedImageFile
                              ? URL.createObjectURL(selectedImageFile)
                              : currentUser.photoURL || ddd
                          }
                          alt="Profile"
                          className="w-40  h-40  mt-4 rounded-full"
                        />   <div>
                          <label for="dropzone-file" class=" fde1 z-10 cursor-pointer">
                        <svg
                          for="dropzone-file"
                          xmlns="http://www.w3.org/2000/svg"
                          height="3em"
                          viewBox="0 0 512 512"
                        >
                          <path
                            d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"
                            fill='#a2a2d2'
                          />
                        </svg>
                      </label>
                        </div> </div>
                      
                         
                      </div>

                     
<div className="w-full grid place-content-center mt-8">
                        <button className="btntext4" onClick={handleImageCrop}>Change</button>

</div>
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
      <h1 className="logo">Eye clinic</h1>
      <nav id="mune" className={isActive ? "active " : ""}>
        {links.map((link, i) => (
          <Link key={i} to={link.link}  onClick={handleClick}>
            {link.name}
          </Link>
        ))}
      </nav>
      <img
        className="burger"
        src={BurgerMenu}
        onClick={handleClick}
        width={30}
        height={30}
        alt="buger menu"
      />
    </header>
  );
}
