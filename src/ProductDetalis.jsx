import { Input, Button, Select,Option  } from "@material-tailwind/react";
import React from "react";
const ProductDetails = ({
  handlePopupToggle,
  handleInput1Change,
  handleInput2Change,
  handleInput3Change,
  handleInput4Change,
  handleInput5Change,
  handleInput6Change,
  handleLensTypeChange,
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
              <Input
                size="lg"
                label="phone number"
                onChange={handleInput3Change}
              />
              <div className="downselect">
                
              
              <Input size="lg" label="Input 4" onChange={handleInput4Change} />
              <Input size="lg" label="Input 5" onChange={handleInput5Change} />
              <Input size="lg" label="Input 6" onChange={handleInput6Change} />
              <Select label="Lens Type" onChange={handleLensTypeChange}>
                <Option> M.C </Option>
                <Option> B.C </Option>
                <Option> Ph.MC </Option>
                <Option> Ph.BC </Option>
                <Option> Biofca M.C" </Option>
                <Option> Biofca B.C" </Option>
                <Option> Biofca Ph.MC " </Option>
                <Option> Biofca Ph.BC  </Option>
              </Select>
              </div>
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
