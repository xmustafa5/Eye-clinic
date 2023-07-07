import { Input,Button } from "@material-tailwind/react";
import React from "react";

const ProductDetails = ({
  handlePopupToggle,
  handleInput1Change,
  handleInput2Change,
  handleInput3Change,
  handleByNowClick,
}) => {
  return (
    <>
      <div className="modal">
        <div onClick={handlePopupToggle} className="overlay"></div>
        <div className="modal-content">
          <div className="flex">
          <div className="flex flex-col w-96 mt-4 mb-4 items-start gap-8">
      <Input size="lg" label="name" onChange={handleInput1Change} />
      <Input size="lg" label="location" onChange={handleInput2Change} />
      <Input size="lg" label="phone number" onChange={handleInput3Change} />
      <div className="flex items-center ">
        <div className=" ffff">
           <a href="#buttons-with-link">
        <Button onClick={handleByNowClick}>By Now</Button>
      </a>
        </div>
     
      
   
      
    </div>
    </div>
            {/* <input type="text" name="input1" onChange={handleInput1Change} />
            <input type="text" name="input2" onChange={handleInput2Change} />
            <input type="text" name="input3"  onChange={handleInput3Change} /> */}
            {/* <button onClick={handleByNowClick}>By Now</button> */}
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
