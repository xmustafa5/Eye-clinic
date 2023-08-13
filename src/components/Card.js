import React, { useState, useEffect } from "react";
import "./Card.css";
import "../Modal.css";
import { db } from "./firebase";
import { useAuth } from "../context/AuthContext";
import ProductDetails from "./ProductDetalis";
import "./buttoncss.css";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css'; 
import Spinner from './Spinner'; // Import your spinner component

const Card = ({
  title,
  color1,
  color2,
  imageUrl1,
  imageUrl2,
  price,
  addToBasket,
  basketItems,
  setPopupMessage,
  setShowPopup,
}) => {
  const [selectedOption, setSelectedOption] = useState("option1");
  const [imageSource, setImageSource] = useState(imageUrl1);
  const [isLoading, setIsLoading] = useState(false); // Add a loading state
  const [isAddingToBasket, setIsAddingToBasket] = useState(false); // Add a state for the adding process
  
  const { currentUser, handlePopupToggle, isOverlayVisible, isPopupOpen } =
    useAuth();

  useEffect(() => {
    if (selectedOption === "option1") {
      setImageSource(imageUrl1);
    } else if (selectedOption === "option2") {
      setImageSource(imageUrl2);
    }
  }, [selectedOption]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleAddToBasket = () => {
    setIsAddingToBasket(true); // Start the adding process

    // handlePopupToggle()

    //   if(currentUser){
    //     handlePopupToggle()
    // }
    const item = {
      title,
      imageUrl: selectedOption === "option1" ? imageUrl1 : imageUrl2,
      color: selectedOption === "option1" ? color1 : color2,
      price,
    };

    // Check if the item already exists in the 'basket' collection in Firestore
    db.collection("basket")
      .where("userId", "==", currentUser.uid) // Add the user's ID as a filter
      .where("title", "==", item.title)
      .where("color", "==", item.color)
      .where("imageUrl", "==", item.imageUrl)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.size > 0) {
          setPopupMessage("Item already in the basket");
          setShowPopup(true);
          setIsAddingToBasket(false); // Finish the adding process
        } else {
          addToBasket({ ...item, userId: currentUser.uid }); // Add the selected item with userId to the basket

          // Add item to the 'basket' collection in Firestore
          db.collection("basket")
            .add({ ...item, userId: currentUser.uid }) // Add userId to the basket item
            .then(() => {
              setPopupMessage("Item added to the basket!");
              setShowPopup(true);
              setIsAddingToBasket(false); // Finish the adding process

            })
            .catch((error) => {
              setPopupMessage("Failed to add item to the basket.");
              setShowPopup(true);
            });
        }
      });
  };

  // const myStyle = {
  //   backgroundImage: `url(${imageSource})`,
  // };
 
  return (
    <>
      <ul className="content">
        <li className="">
          <div className="projcard boxs">
            <div className="ssss">
            <div className="projimg">
            {isLoading ? (
          <Spinner />
        ) : (
          // <LazyLoadImage
          <img
            src={imageSource}
            alt="Selected Option"
            effect="opacity"
            afterLoad={() => setIsLoading(false)}
          />
        )}
      </div>
              {/* <img src={imageSource} alt="Selected Option"  /> */}
            </div>
            <div className="projinfo">
              <strong className="projtitle">
                <span className="titlecard">{title}</span>
                <div>
                  {color1 && (
                    <button
                      className={`radio-button ${
                        selectedOption === "option1" ? "active" : ""
                      }`}
                      onClick={() => handleOptionClick("option1")}
                    >
                      <p className="btntext2 "> {color1}</p>
                    </button>
                  )}
                  {color2 && (
                    <button
                      className={`radio-button ${
                        selectedOption === "option2" ? "active" : ""
                      }`}
                      onClick={() => handleOptionClick("option2")}
                    >
                      <p className="btntext2"> {color2}</p>
                    </button>
                  )}
                </div>
              </strong>
              <div className="prices">
                <p className="iopp">{price}$</p>
              </div>
            </div>
            <div className="fexbtn">
              {/* <button className="button-5" onClick={handleAddToBasket}>
                Add to Basket
              </button> */}
              {/* <button className="button-29" onClick={handlePopupToggle}>
                Add to Basket
              </button> */}

              <div className={"homebtngroup1"}>
              <button
            className={"btnbtnprimary"}
            onClick={handleAddToBasket}
            disabled={isAddingToBasket} // Disable the button while adding is in progress
          >
            {isAddingToBasket ? (
                             <p className={"btntext1"}><Spinner /></p>
                              // Display spinner while adding is in progress
            ) : (
              <>
                <p className={"btntext1"}>Buy</p>
                <span className={"square"}></span>
              </>
            )}
          </button>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </>
  );
};

export default Card;
