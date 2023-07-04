import React, { useState, useEffect } from "react";
import { db } from "../components/firebase";

const Basket = () => {
  const [basketItems, setBasketItems] = useState([]);

  useEffect(() => {
    const fetchBasketItems = async () => {
      try {
        const snapshot = await db.collection("basket").get();
        const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
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
        setBasketItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
      })
      .catch((error) => {
        console.error("Error removing item from basket:", error);
      });
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
             <img src={item.imageUrl} alt="" width={300}/> 
              <button onClick={() => removeFromBasket(item.id)}>Remove</button>
            </li>
          ))}
          <button>by</button>
        </ul>
        
        ) : (
        <p>No items in the basket.</p>
      )}
    </div>
  );
};

export default Basket;
