import React from 'react';
import { useLocation } from 'react-router-dom';
import Basket from "../components/Basket";

const Baskett = () => {
  const location = useLocation();
  const { basketItems, handleRemoveFromBasket } = location.state || {};

  return (
    <div>
      <Basket basketItems={basketItems || []} handleRemoveFromBasket={handleRemoveFromBasket || (() => {})} />
    </div>
  );
};

export default Baskett;
