import React, { useState, useEffect } from "react";
import "./Card.css";
import "../Modal.css";
import imgg from "../img/1g.jpg";
import imgg1 from "../img/1gc.png";
import ProductDetails from '../ProductDetalis';
import Basket from "./Basket";
import { db } from '../components/firebase';

const Card = ({ title, color1, color2, imageUrl1, imageUrl2, price, addToBasket, basketItems, setPopupMessage, setShowPopup }) => {
  const [selectedOption, setSelectedOption] = useState("option1");
  const [imageSource, setImageSource] = useState(imageUrl1);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
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

  const handlePopupToggle = () => {
    setIsPopupOpen(!isPopupOpen);
    setIsOverlayVisible(!isOverlayVisible);
  };

  const handleAddToBasket = () => {
    const item = {
      title,
      imageUrl: selectedOption === "option1" ? imageUrl1 : imageUrl2,
      color: selectedOption === "option1" ? color1 : color2,
      price,
    };
  
    // Check if the item already exists in the 'basket' collection in Firestore
    db.collection("basket")
      .where("title", "==", item.title)
      .where("color", "==", item.color)
      .where("imageUrl", "==", item.imageUrl)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.size > 0) {
          setPopupMessage("Item already in the basket");
          setShowPopup(true);
        } else {
          addToBasket(item); // Add the selected item to the basket
  
          // Add item to the 'basket' collection in Firestore
          db.collection("basket")
            .add(item)
            .then(() => {
              setPopupMessage("Item added to the basket!");
              setShowPopup(true);
            })
            .catch((error) => {
              setPopupMessage("Failed to add item to the basket.");
              setShowPopup(true);
            });
        }
      })
      
  };
  
 
  
  

  return (
    <>
      <ul className="content">
        <li>
          <div className="projcard">
            <div className="projimg">
              <img src={imageSource} alt="Selected Option" />
            </div>
            <div className="projinfo">
              <strong className="projtitle">
                <span>{title}</span>
                <div>
                  {color1 && (
                    <button
                      className={`radio-button ${
                        selectedOption === "option1" ? "active" : ""
                      }`}
                      onClick={() => handleOptionClick("option1")}
                    >
                      {color1}
                    </button>
                  )}
                  {color2 && (
                    <button
                      className={`radio-button ${
                        selectedOption === "option2" ? "active" : ""
                      }`}
                      onClick={() => handleOptionClick("option2")}
                    >
                      {color2}
                    </button>
                  )}
                </div>
              </strong>
              <p className="iopp">{price}$</p>
            </div>
            <div className="fexbtn">
              <button className="button-29" onClick={handlePopupToggle}>
                Button 29
              </button>
              <button className="add-to-basket-button" onClick={handleAddToBasket}>
                Add to Basket
              </button>
            </div>
          </div>
        </li>
        {/* {isOverlayVisible && <div className="overlay"></div>}
        {isPopupOpen && (
          <div className="popup">
            <ProductDetails
              handlePopupToggle={handlePopupToggle}
              price={price}
              color1={color1}
              color2={color2}
              imageUrl1={imageUrl1}
              selectedOption={selectedOption}
            />
          </div>
        )} */}
      </ul>
    </>
  );
};

export default Card;
