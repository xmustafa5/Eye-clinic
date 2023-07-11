import React from "react";
import FilterSize from "../components/FilterSize";

import Card from "../components/Card";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { db } from "../components/firebase";
import cart from "../img/cart1.png";
import Homepg from "../components/Homepg";
import { useAuth } from "../context/AuthContext";
import ProductDetails from "../components/ProductDetalis";
import Login from "../components/authlogin/Login";
export default function Home() {
  const [basketItems, setBasketItems] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  // const [isPopupOpen, setIsPopupOpen] = useState(false);
  // const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [products, setProducts] = useState([]);
  const [basketItemCount, setBasketItemCount] = useState(0);
  const { currentUser, handlePopupToggle, isOverlayVisible, isPopupOpen } =
    useAuth();
  // const handlePopupToggle = () => {
  //   setIsPopupOpen(!isPopupOpen);
  //   setIsOverlayVisible(!isOverlayVisible);
  // };
  const handleRemoveFromBasket = (index) => {
    setBasketItems((prevBasketItems) =>
      prevBasketItems.filter((item, i) => i !== index)
    );
  };
  useEffect(() => {
    const unsubscribe = db.collection("products").onSnapshot((snapshot) => {
      const productList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productList);
    });

    return () => unsubscribe();
  }, []);

  const handleAddToBasket = (item) => {
    const itemExists = basketItems.some(
      (basketItem) =>
        basketItem.title === item.title && basketItem.color === item.color
    );

    if (!itemExists) {
      setBasketItems((prevBasketItems) => [...prevBasketItems, item]);
      setPopupMessage("Item add successfully.");
    } else {
      setPopupMessage("Item already in the basket!");
    }
  };

  // const cards = [
  //   {
  //     title: 'Card 1',
  //     color1: 'black',
  //     color2: 'red',
  //     imageUrl1: 'https://firebasestorage.googleapis.com/v0/b/dfgdg-7669e.appspot.com/o/1g.jpg?alt=media&token=2b725e48-a885-4674-b46c-3ddadc4cfa02',
  //     imageUrl2: 'https://firebasestorage.googleapis.com/v0/b/dfgdg-7669e.appspot.com/o/1gc.png?alt=media&token=e86bffb2-31db-42e4-a0c4-9dd0f2ebd7c1',
  //     price: 1000
  //   },
  //   {
  //     title: 'Card 2',
  //     color1: 'black',
  //     color2: 'red',
  //     imageUrl1: 'https://firebasestorage.googleapis.com/v0/b/dfgdg-7669e.appspot.com/o/1g.jpg?alt=media&token=2b725e48-a885-4674-b46c-3ddadc4cfa02',
  //     imageUrl2: 'https://firebasestorage.googleapis.com/v0/b/dfgdg-7669e.appspot.com/o/1gc.png?alt=media&token=e86bffb2-31db-42e4-a0c4-9dd0f2ebd7c1',
  //     price: 1000

  //   },
  //   {
  //     title: 'Card 3',
  //     color1: 'black',
  //     color2: 'red',
  //     imageUrl1: 'https://firebasestorage.googleapis.com/v0/b/dfgdg-7669e.appspot.com/o/1g.jpg?alt=media&token=2b725e48-a885-4674-b46c-3ddadc4cfa02',
  //     imageUrl2: 'https://firebasestorage.googleapis.com/v0/b/dfgdg-7669e.appspot.com/o/1gc.png?alt=media&token=e86bffb2-31db-42e4-a0c4-9dd0f2ebd7c1',
  //     price: 100
  //   }
  // ];

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
  useEffect(() => {
    const fetchBasketItems = async () => {
      try {
        const snapshot = await db
          .collection("basket")
          .where("userId", "==", currentUser.uid) // Filter by the user's ID
          .get();
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
  }, [currentUser.uid]);
  useEffect(() => {
    setBasketItemCount(basketItems.length);
  }, [basketItems]);
  return (
    <>
      <div className="app">
        <div className="z-100 ">
          <Homepg />
        </div>
        {/* <FilterSize/> */}
        <section className="pro" id="shop">
          <div className="fex titles">
            
            <h2>shapping</h2>
          </div>
          <div className="r">
            {products.map((product) => (
              <Card
                key={product.id}
                title={product.title}
                color1={product.color1}
                color2={product.color2}
                imageUrl1={product.imageUrl1}
                imageUrl2={product.imageUrl2}
                price={product.price}
                basketItems={basketItems}
                addToBasket={handleAddToBasket}
                setPopupMessage={setPopupMessage}
                setShowPopup={setShowPopup}
                handlePopupToggle={handlePopupToggle}
              />
            ))}
          </div>
        </section>
        {showPopup && (
          <div className="popup z-10">
            <div
              id="toast-success"
              class="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
              role="alert"
            >
              <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
                <svg
                  class="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                </svg>
                <span class="sr-only">Check icon</span>
              </div>
              <div class="ml-3 text-sm font-normal">{popupMessage}</div>
            </div>
          </div>
        )}
      </div>
      <div className="conn">
        <div className="contt">
          <Link
            to={{
              pathname: "/Baskett",
              state: {
                basketItems: basketItems,
                handleRemoveFromBasket: handleRemoveFromBasket,
              },
            }}
          >
            <div className="cartfex">
              <h3 className="titlecart">basket</h3>
              <img src={cart} alt="" className="cartimg" />
              <div className="contercart">
                <h1>{basketItemCount}</h1>
              </div>
            </div>
          </Link>
        </div>
      </div>
      {isOverlayVisible && <div className="overlay"></div>}
      {isPopupOpen && (
        <div className="popuplog">
          <Login />
        </div>
      )}
    </>
  );
}
