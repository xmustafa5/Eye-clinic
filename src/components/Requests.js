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

  const removeItemFromRequest = async (requestId, itemId, length) => {
    try {
      // Remove the item from the request document
      await db
        .collection("requests")
        .doc(requestId)
        .update({
          items: requestItems
            .find((item) => item.id === requestId)
            .items.filter((item) => item.id !== itemId),
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
    if (length == 1) {
      removeRequest(requestId);
    }
  };

  const removeRequest = async (requestId) => {
    try {
      // Remove the request document from the collection
      await db.collection("requests").doc(requestId).delete();

      // Update the local state by filtering out the removed request
      setRequestItems((prevRequestItems) => {
        return prevRequestItems.filter((item) => item.id !== requestId);
      });

      console.log("Request successfully removed");
    } catch (error) {
      console.error("Error removing request:", error);
    }
  };

  return (
    <section className="pro">
      <div className="fex titles">
        <h1>Requests</h1>
      </div>
      {requestItems.length > 0 ? (
        <ul className="content d">
          {requestItems.map((request) => (
            <li className="borditem " key={request.id}>
              <div className="">

            
              <div className="fex inputs">
                <p>name: {request.input1}</p>
                <p>location: {request.input2}</p>
                <p>number: {request.input3}</p>
                <p>lensType: {request.lensType}</p>
                <p>products:</p>
              </div>

              {request.items && request.items.length > 0 ? (
                <ul className="contento">
                  {request.items.map((item) => (
                    <li key={item.id}>
                      <div className="projcardo">
                      <div className="sssso">
                  <div className="projimg">
                    <img src={item.imageUrl} alt="Selected Option" />
                  </div>
                  {/* <img src={imageSource} alt="Selected Option"  /> */}
                </div>
                        <div className="projinfo">
                          <strong className="projtitle">
                            <span className="titlecard">{item.title}</span>
                            <div className="centerbrn"> 
                              {item.color && (
                                <button className={`radio-buttono`}>
                                  {item.color}
                                </button>
                              )}
                            </div>
                          </strong>
                          <div className="prices">
                            <p className="iopp">{item.price}$</p>
                          </div>
                          <div className="fexbtn">
                          <button
                            className="button-29"
                            onClick={() =>
                              removeItemFromRequest(
                                request.id,
                                item.id,
                                request.items.length
                              )
                            }
                          >
                            Remove
                          </button>
                        </div>
                        </div>
                     
                      </div>
                    </li>
                  ))}
                </ul> 
              ) : (
                <p>No items in the request.</p>
              )}
 </div>
              <div className="fexbtn">
                <button
                  className="button-29"
                  onClick={() => removeRequest(request.id)}
                >
                  Remove Request
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="noitem">
          <h1>No requests available.</h1>
        </div>
      )}
    </section>
  );
};

export default Requests;
