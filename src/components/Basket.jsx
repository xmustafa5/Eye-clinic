import React, { useState, useEffect } from "react";
import { db } from "../components/firebase";
import ProductDetails from './../ProductDetalis';
const Basket = () => {
  const [basketItems, setBasketItems] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  useEffect(() => {
    const fetchBasketItems = async () => {
      try {
        const snapshot = await db.collection("basket").get();
        const items = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBasketItems(items);
      } catch (error) {
        console.error("Error fetching basket items:", error);
      }
    };

    fetchBasketItems();
  }, []);

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
              
            />
          </div>
        )}
    </div>
  );
};

export default Basket;
