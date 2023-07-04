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

  return (
    <div>
      <h1>Requests</h1>
      {requestItems.length > 0 ? (
        <ul>
          {requestItems.map((item) => (
            <li key={item.id}>
              <p>Input 1: {item.input1}</p>
              <p>Input 2: {item.input2}</p>
              <p>Items:</p>
              {item.items && item.items.length > 0 ? (
                <ul>
                  {item.items.map((subItem, index) => (
                    <li key={index}>
                      <p>Title: {subItem.title}</p>
                      <p>Color: {subItem.color}</p>
                      <p>Price: {subItem.price}</p>
                      <img src={subItem.imageUrl} alt="" width={300} />
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
