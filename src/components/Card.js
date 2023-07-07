import React, { useState, useEffect } from "react";
import "./Card.css";
import "../Modal.css";
import { db } from "./firebase";
import { useAuth } from "../context/AuthContext";
import ProductDetails from "../ProductDetalis";
const Card = ({ title, color1, color2, imageUrl1, imageUrl2, price, addToBasket, basketItems, setPopupMessage, setShowPopup }) => {
  const [selectedOption, setSelectedOption] = useState("option1");
  const [imageSource, setImageSource] = useState(imageUrl1);
  const { currentUser, handlePopupToggle ,isOverlayVisible,isPopupOpen} = useAuth();

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
      // handlePopupToggle()
      
  if(currentUser){
    handlePopupToggle()
}
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
          } else {
            addToBasket({ ...item, userId: currentUser.uid }); // Add the selected item with userId to the basket
    
            // Add item to the 'basket' collection in Firestore
            db.collection("basket")
              .add({ ...item, userId: currentUser.uid }) // Add userId to the basket item
              .then(() => {
                setPopupMessage("Item added to the basket!");
                setShowPopup(true);
              })
              .catch((error) => {
                setPopupMessage("Failed to add item to the basket.");
                setShowPopup(true);
              });
          }
        });
    };
 
    
  
  const myStyle = {
    backgroundImage: `url(${imageSource})`,
  };

  return (
    <>        

      <ul className="content">
        <li>
          <div className="projcard">
            <div className="projimg" style={myStyle}> 
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
            <div className="prices"><p className="iopp">{price}$</p></div>  
            </div>
            <div className="fexbtn">
              
              <button className="button-29" onClick={handleAddToBasket}>
                Add to Basket
              </button>
              <button className="button-29" onClick={handlePopupToggle}>
                Add to Basket
              </button>
            </div>
           
          </div>
        </li>
        
      </ul>
    </>
  );
};

export default Card;
