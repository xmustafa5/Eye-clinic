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
  if (isLoading) {
    return <p>Loading...</p>;
  }
  const removeFromBasket = (itemId) => {
    db.collection("basket")
      .doc(itemId)
      .delete()
      .then(() => {
        console.log("Item successfully removed from basket");
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
    setInputValue4(e.target.value);
  };
  const handleByNowClick = async () => {
    // Check if the data already exists in the requests collection
    const existingRequestsSnapshot = await db
      .collection("requests")
      .where("input1", "==", inputValue1) // Replace input1Value with your actual value
      .where("input2", "==", inputValue2) // Replace input2Value with your actual value
      .get();

    if (!existingRequestsSnapshot.empty) {
      console.log("Data already exists in requests collection");
      return; // Exit the function to prevent adding duplicate data
    }

    try {
      // Add the data to the requests collection
      await db.collection("requests").add({
        input1: inputValue1, // Replace input1Value with your actual value
        input2: inputValue2, // Replace input2Value with your actual value
        items: basketItems,
      });

      // Clear the basket or perform any other necessary actions
      setBasketItems([]);
      console.log("Data added to requests collection");
    } catch (error) {
      console.error("Error adding data to requests collection:", error);
    }
  };

  return (
    <div>
      <h1>Basket</h1>
      {basketItems.length > 0 ? (
        <ul>
          {basketItems.map((item, index) => (
            <li key={index}>
              <p>{item.title}</p>
              <p>{item.color}</p>
              <p>{item.price}</p>
              <img src={item.imageUrl} alt="" width={300} />
              <button onClick={() => removeFromBasket(item.id)}>Remove</button>
            </li>
          ))}
          <button className="button-29" onClick={handlePopupToggle}>
            Button 29
          </button>
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
            handleByNowClick={handleByNowClick}
          />
        </div>
      )}
            <Link to="/requests">View Requests</Link>
    </div>
  );
};

export default Basket;
