import React from "react";

const ProductDetails = ({
  handlePopupToggle,
  handleInput1Change,
  handleInput2Change,
  handleByNowClick,
}) => {
  return (
    <>
      <div className="modal">
        <div onClick={handlePopupToggle} className="overlay"></div>
        <div className="modal-content">
          <div className="flex">
            <input type="text" name="input1" onChange={handleInput1Change} />
            <input type="text" name="input2" onChange={handleInput2Change} />
            <button onClick={handleByNowClick}>By Now</button>
          </div>
          {/* <button className="close-modal" onClick={handlePopupToggle}>
            CLOSE
          </button> */}
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
