import React, { useState, useEffect } from "react";
import { db } from "../components/firebase";

import ProductDetails from "../ProductDetalis";
import { Link } from "react-router-dom";
const Basket = () => {
  const [basketItems, setBasketItems] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [inputValue1, setInputValue1] = useState("");
  const [inputValue2, setInputValue2] = useState("");
  const [inputValue3, setInputValue3] = useState("");
  const [popupMessage, setPopupMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  useEffect(() => {
    const fetchBasketItems = async () => {
      try {
        const snapshot = await db.collection("basket").get();
        const items = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBasketItems(items);

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching basket items:", error);
      }
    };
    
    fetchBasketItems();
  }, []);
  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => {
        setShowPopup(false);
      }, 1500);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [showPopup]);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  const removeFromBasket = (itemId) => {
    db.collection("basket")
      .doc(itemId)
      .delete()
      .then(() => {
        setPopupMessage("Item successfully removed from basket");
        setShowPopup(true);
        setBasketItems((prevItems) =>
          prevItems.filter((item) => item.id !== itemId)
        );
      })
      .catch((error) => {
        console.error("Error removing item from basket:", error);
      });
  };

  const handlePopupToggle = () => {
    setIsPopupOpen(!isPopupOpen);
    setIsOverlayVisible(!isOverlayVisible);
  };

  const handleInput1Change = (e) => {
    setInputValue1(e.target.value);
  };

  const handleInput2Change = (e) => {
    setInputValue2(e.target.value);
  };

  const handleInput3Change = (e) => {
    setInputValue3(e.target.value);
  };
  const handleByNowClick = async () => {
    // Check if the data already exists in the requests collection
    const existingRequestsSnapshot = await db
      .collection("requests")
      .where("input1", "==", inputValue1)
      .where("input2", "==", inputValue2)
      .where("input3", "==", inputValue3)
      .get();

    if (!existingRequestsSnapshot.empty) {
      setPopupMessage("Data already exists in requests collection");
      setShowPopup(true);
      return; // Exit the function to prevent adding duplicate data
    }

    try {
      // Add the data to the requests collection
      await db.collection("requests").add({
        input1: inputValue1,
        input2: inputValue2,
        input3: inputValue3,
        items: basketItems,
      });

      // Clear the basket by removing all items
      const batch = db.batch();
      basketItems.forEach((item) => {
        const itemRef = db.collection("basket").doc(item.id);
        batch.delete(itemRef);
      });
      await batch.commit();

      // Clear the local state of basketItems
      setBasketItems([]);

      setPopupMessage("Data added to requests collection");
      setShowPopup(true);
      setIsPopupOpen(false); // Close the popup
      setIsOverlayVisible(false); // Close the overlay
    } catch (error) {
      console.error("Error adding data to requests collection:", error);
    }
  };
  const myStyle = {
    backgroundImage: `url(${basketItems})`
  };
  return (
    <section className='pro'>
      <h1>Basket</h1>
      {basketItems.length > 0 ? (
        <ul className="content">
          {basketItems.map((item, index) => (
            // <li key={index}>
            //   <p>{item.title}</p>
            //   <p>{item.color}</p>
            //   <p>{item.price}</p>
            //   <img src={item.imageUrl} alt="" width={300} />
            //   <button onClick={() => removeFromBasket(item.id)}>Remove</button>
            // </li>
            <li>
            <div className="projcard">
              <div className="projimg" style={  {  backgroundImage: `url(${item.imageUrl})`}}> 
                {/* <img src={imageSource} alt="Selected Option"  /> */}
              </div>
              <div className="projinfo">
                <strong className="projtitle">
                  <span className="titlecard">{item.title}</span>
                  <div>
                    {item.color && (
                      <button
                        className={`radio-button`}
                      >
                        {item.color}
                      </button>
                    )}
                    {/* {color2 && (
                      <button
                        className={`radio-button ${
                          selectedOption === "option2" ? "active" : ""
                        }`}
                        onClick={() => handleOptionClick("option2")}
                      >
                        {color2}
                      </button>
                    )} */}
                  </div>
                </strong>
              <div className="prices"><p className="iopp">{item.price}$</p></div>  
              </div>
              <div className="fexbtn">
                
                <button className="button-29" onClick={() => removeFromBasket(item.id)}>
                  remove 
                </button>
              </div>
            </div>
          </li>
          ))}
          <button className="button-29" onClick={handlePopupToggle}>
            Button 29
          </button>
          {/* dd */}
          
        </ul>
      ) : (
        <p>No items in the basket.</p>
      )}
      {isOverlayVisible && <div className="overlay"></div>}
      {isPopupOpen && (
        <div className="popup">
          <ProductDetails
            handlePopupToggle={handlePopupToggle}
            handleInput1Change={handleInput1Change}
            handleInput2Change={handleInput2Change}
            handleInput3Change={handleInput3Change}
            handleByNowClick={handleByNowClick}
            showPopup={showPopup}
          />
        </div>
      )}
            <Link to="/requests">View Requests</Link>
            {showPopup && (
          <div className="popup">
          <div className="popup1">
            <h1 className='massage'>{popupMessage}</h1>
          </div>
          </div>
        )}
    </section>
  );
};

export default Basket;
