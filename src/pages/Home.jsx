import React from 'react';

import Card from '../components/Card';
import { useState } from 'react';
import Basket from '../components/Basket';
import { Link } from 'react-router-dom';
import TodoList from './../components/TodoList';
import { useEffect } from 'react';
import { db } from '../components/firebase';
import cart from '../img/cart1.png'
export default function Home() {
  const [basketItems, setBasketItems] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [cards, setCards] = useState([]);
  const [products, setProducts] = useState([]);
  const [basketItemCount, setBasketItemCount] = useState(0);
  const handlePopupToggle = () => {
    setIsPopupOpen(!isPopupOpen);
    setIsOverlayVisible(!isOverlayVisible);
  };
  const handleRemoveFromBasket = (index) => {
    setBasketItems((prevBasketItems) =>
      prevBasketItems.filter((item, i) => i !== index)
    );
  };
  useEffect(() => {
    const unsubscribe = db.collection('products').onSnapshot((snapshot) => {
      const productList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
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
      setPopupMessage('Item added to the basket!');
    } else {
      setPopupMessage('Item already in the basket!');
      
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
        const snapshot = await db.collection('basket').get();
        const items = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBasketItems(items);
  
      } catch (error) {
        console.error('Error fetching basket items:', error);
      }
    };
  
    fetchBasketItems();
  }, []);
  useEffect(() => {
    setBasketItemCount(basketItems.length);
  }, [basketItems]);
  return (
    <>
    <div className="app">
      <div className='r'>
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
/>
))}

</div>  
      
      {showPopup && (
          <div className="popup">
          <div className="popup1">
            <h1 className='massage'>{popupMessage}</h1>
          </div>
          </div>
        )}
    </div>
    <div className='conn'>
    <div className='contt'>

    <Link to={{
  pathname: "/Baskett",
  state: {
    basketItems: basketItems,
    handleRemoveFromBasket: handleRemoveFromBasket
  }
}}>   
<div className='cartfex'>
  <h3 className='titlecart'>basket</h3>
<img src={cart} alt="" className='cartimg' />
  <div className='contercart'><h1>{basketItemCount}</h1></div>

</div>
</Link> 
</div>
</div>
  <Link to="/Dashboard">Dashboard</Link>
   
    </>
  );
}

