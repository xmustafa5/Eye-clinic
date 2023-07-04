import React, { useState, useEffect } from "react";
import { db } from "../components/firebase";

const Requests = () => {
  const [requestItems, setRequestItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRequestItems = async () => {
      try {
        const snapshot = await db.collection("requests").get();
        const items = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRequestItems(items);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching request items:", error);
      }
    };

    fetchRequestItems();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const removeItemFromRequest = async (requestId, itemId) => {
    try {
      // Remove the item from the request document
      await db.collection("requests").doc(requestId).update({
        items: requestItems.find((item) => item.id === requestId).items.filter((item) => item.id !== itemId)
      });

      // Update the local state
      setRequestItems((prevRequestItems) => {
        return prevRequestItems.map((item) => {
          if (item.id === requestId) {
            return {
              ...item,
              items: item.items.filter((item) => item.id !== itemId),
            };
          }
          return item;
        });
      });

      console.log("Item successfully removed from the request");
    } catch (error) {
      console.error("Error removing item from the request:", error);
    }
  };

  return (
    <div>
      <h1>Requests</h1>
      {requestItems.length > 0 ? (
        <ul>
          {requestItems.map((request) => (
            <li key={request.id}>
              <p>Input 1: {request.input1}</p>
              <p>Input 2: {request.input2}</p>
              <p>Items:</p>
              {request.items && request.items.length > 0 ? (
                <ul>
                  {request.items.map((item) => (
                    <li key={item.id}>
                      <p>Title: {item.title}</p>
                      <p>Color: {item.color}</p>
                      <p>Price: {item.price}</p>
                      <img src={item.imageUrl} alt="" width={300} />
                      <button onClick={() => removeItemFromRequest(request.id, item.id)}>
                        Remove Item
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No items in the request.</p>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No requests available.</p>
      )}
    </div>
  );
};

export default Requests;
