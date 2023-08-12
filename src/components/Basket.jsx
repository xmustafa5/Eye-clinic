import React, { useState, useEffect } from "react";
import { db } from "../components/firebase";

import ProductDetails from "./ProductDetalis";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import { useAuth } from "../context/AuthContext";

const Basket = () => {
  const [basketItems, setBasketItems] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [inputValue1, setInputValue1] = useState("");
  const [inputValue2, setInputValue2] = useState("");
  const [inputValue3, setInputValue3] = useState("");
  const [inputValue4, setInputValue4] = useState("");
  const [inputValue5, setInputValue5] = useState("");
  const [inputValue6, setInputValue6] = useState("");
  const [inputValue7, setInputValue7] = useState("");
  const [inputValue8, setInputValue8] = useState("");
  const [inputValue9, setInputValue9] = useState("");
  const [selectedLensType, setSelectedLensType] = useState("");
  const [validationMessage, setValidationMessage] = useState("");
  const [error, setError] = useState("");

  const [popupMessage, setPopupMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchBasketItems = async () => {
      try {
        const snapshot = await db
          .collection("basket")
          .where("userId", "==", currentUser.uid) // Add the user's ID as a filter
          .get();
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
  }, [currentUser]);
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
    return <Loading />;
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
    setError(""); // Clear the error message
    setIsPopupOpen(!isPopupOpen);
    setIsOverlayVisible(!isOverlayVisible);
  };

  const handleInput1Change = (e) => {
    setInputValue1(e.target.value);
    const inputValue = e.target.value;
    if (!inputValue) {
      setError("name is empty");
      return; // Exit the function to prevent further processing
    } else {
      setError(""); // Clear the error message since the condition is false
    }
    
  };

  const handleInput2Change = (e) => {
    setInputValue2(e.target.value);
    const inputValue = e.target.value;

    if (!inputValue) {
      setError("location is empty");
      return; // Exit the function to prevent further processing
    } else {
      setError(""); // Clear the error message since the condition is false
    }
    
  };

  const handleInput3Change = (e) => {
    setInputValue3(e.target.value);
     const inputValue = e.target.value;
     const numericValue = inputValue.replace(/\D/g, ''); // Remove non-numeric characters
  
     if (numericValue !== inputValue) {
       setInputValue3(numericValue);
       setError("Please enter numbers only.");
     }else if(numericValue.length > 11 || numericValue.length < 11){
       setInputValue3(inputValue);

       setError("Please enter 11 numbers .");

     } else {
       setInputValue3(inputValue);
       setError(""); // Clear validation message
     }
    
  };

  const handleInput4Change = (e) => {
    setInputValue4(e.target.value);
  };

  const handleInput5Change = (e) => {
    setInputValue5(e.target.value);
  };

  const handleInput6Change = (e) => {
    setInputValue6(e.target.value);
  };

  const handleInput7Change = (e) => {
    setInputValue7(e.target.value);
  };

  const handleInput8Change = (e) => {
    setInputValue8(e.target.value);
  };

  const handleInput9Change = (e) => {
    setInputValue9(e.target.value);
  };

  const handleLensTypeChange = (e) => {
    setSelectedLensType(e.target.value);
  };
  const handleByNowClick = async () => {
    setError("");


    if (!inputValue1) {
      setError("name is empty");
      return; // Exit the function to prevent further processing
    } 
    if (!inputValue2) {
      setError("location is empty");
      return; // Exit the function to prevent further processing
    }
    if (!inputValue3) {
      setError("number is empty");
      return; // Exit the function to prevent further processing
    }  
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
        input4: inputValue4,
        input5: inputValue5,
        input6: inputValue6,
        input7: inputValue7,
        input8: inputValue8,
        input9: inputValue9,
        lensType: selectedLensType,
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
  if (isPopupOpen) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }
  return (
    <section className="pro ff">
      <div className="fex titles">
        <h1>Basket</h1>
      </div>
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
              <div className="projcard boxs">
                <div className="ssss">
                  <div className="projimg">
                    <img src={item.imageUrl} alt="Selected Option" />
                  </div>
                  {/* <img src={imageSource} alt="Selected Option"  /> */}
                </div>
                <div className="projinfo">
                  <strong className="projtitle">
                    <span className="titlecard">{item.title}</span>
                    <div className="gggl">
                      {item.color && (
                        <button className={`radio-buttone bg-cyan-500 `}>
                          <p className="btntext2  "> {item.color}</p>
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
                  <div className="prices">
                    <p className="iopp">{item.price}$</p>
                  </div>
                </div>
                <div className="fexbtn">
                  <div className={"homebtngroup1"}>
                    <button
                      className={"btnbtnprimary"}
                      onClick={() => removeFromBasket(item.id)}
                    >
                      <p className={"btntext1"}>remove</p>
                      <span className={"square"}></span>
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}

          {/* dd */}
        </ul>
      ) : (
        <section className="noitem">
          <p>No items in the basket.</p>
        </section>
      )}
      <div className="fex bynow">
      <div className={"homebtngroup1"}>
                <button className={"btnbtnprimary "} onClick={handlePopupToggle}>
                  <p className={"btntext  hover:bg-sky-700"}>Buy</p>
                  <span className={"square"}></span>
                </button>
              </div>
      </div>
      {isOverlayVisible && <div className="overlay"></div>}
      {isPopupOpen && (
        <div className="popuplog ">
          <ProductDetails
            handlePopupToggle={handlePopupToggle}
            handleInput1Change={handleInput1Change}
            handleInput2Change={handleInput2Change}
            handleInput3Change={handleInput3Change}
            handleInput4Change={handleInput4Change}
            handleInput5Change={handleInput5Change}
            handleInput6Change={handleInput6Change}
            handleInput7Change={handleInput7Change}
            handleInput8Change={handleInput8Change}
            handleInput9Change={handleInput9Change}
            handleLensTypeChange={handleLensTypeChange}
            inputValue3={inputValue3}
            inputValue1={inputValue1}
            validationMessage={validationMessage}
            handleByNowClick={handleByNowClick}
            selectedLensType={selectedLensType} // Pass selectedLensType as a prop
            setSelectedLensType={setSelectedLensType}
            showPopup={showPopup}
            error={error}
          />
        </div>
      )}
      {/* <Link to="/requests">View Requests</Link> */}
      {showPopup && (
        <div className="popup">
          <div className="popup1">
            <h1 className="massage">{popupMessage}</h1>
          </div>
        </div>
      )}
    </section>
  );
};

export default Basket;
