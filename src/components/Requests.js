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
  };
  
  
  
  

  return (
    <section className='pro'>
      <div className="fex titles">
      <h1>Requests</h1>   </div>
      {requestItems.length > 0 ? (
        <ul className="content d">
          {requestItems.map((request) => (
            <li className="borditem" key={request.id}>
              <div className="fex inputs">
                <p className="pcolor">namt: {request.input1}</p>
              <p>location: {request.input2}</p>
              <p>number: {request.input3}</p>
              <p>prudect:</p>
              </div>
              
              {request.items && request.items.length > 0 ? (
                <ul className="content">
                  {request.items.map((item) => (
                    // <li key={item.id}>
                    //   <p>Title: {item.title}</p>
                    //   <p>Color: {item.color}</p>
                    //   <p>Price: {item.price}</p>
                    //   <img src={item.imageUrl} alt="" width={300} />
                    //   <button onClick={() => removeItemFromRequest(request.id ,item.id)}>Remove Request</button>

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
                        
                        <button className="button-29" onClick={() => removeItemFromRequest(request.id ,item.id)}>
                          remove 
                        </button>
                        </div>
                      </div>
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
        
       <div className="noitem"> <h1> No requests available.</h1></div>
      )}
    </section>
  );
};

export default Requests;
