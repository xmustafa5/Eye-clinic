

  import { useState } from 'react';
import Basket from './components/Basket';
  const ProductDetails = ({ title, color1, color2, imageUrl1, imageUrl2, price , handlePopupToggle }) => {
    const [basketItems, setBasketItems] = useState([]);
    const handleAddToBasket = (item) => {
      const itemExists = basketItems.some(
        (basketItem) => basketItem.title === item.title
      );
  
      if (!itemExists) {
        setBasketItems((prevBasketItems) => [...prevBasketItems, item]);
      }
  
    };
  return (
    <>
     <div className="modal">
          <div onClick={handlePopupToggle} className="overlay"></div>
          <div className="modal-content">
            
            <button className="close-modal" onClick={handlePopupToggle}>
              CLOSE
            </button>
            <button onClick={handleAddToBasket} >fffff </button>
          </div>
        </div>
    </>
  );
}
export default ProductDetails;
