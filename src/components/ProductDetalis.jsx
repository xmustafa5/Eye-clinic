import { Input, Button, Select, Option } from "@material-tailwind/react";
import React, { useState } from "react";
import Items from "./authlogin/Items";

const ProductDetails = ({
  handlePopupToggle,
  handleInput1Change,
  handleInput2Change,
  handleInput3Change,
  handleInput4Change,
  handleInput5Change,
  handleInput6Change,
  handleInput7Change,
  handleInput8Change,
  handleInput9Change,
  handleLensTypeChange,
  selectedLensType,
  setSelectedLensType,
  handleByNowClick,
}) => {
  const options = [
    { value: "", text: "Lens Type" },
    { value: "M.C", text: "M.C" },
    { value: "B.C", text: "B.C" },
    { value: "PH.MC", text: "PH.MC" },
    { value: "PH.BC", text: "PH.BC" },
    { value: "Biofca M.C", text: "Biofca M.C" },
    { value: "Biofca B.C", text: "Biofca B.C" },
    { value: "Biofca PH.MC", text: "Biofca PH.MC" },
    { value: "Biofca PH.BC", text: "Biofca PH.BC" },
    { value: "Progressive M.C", text: "Progressive M.C" },
    { value: "Progressive B.C", text: "Progressive B.C" },
    { value: "Progressive PH.MC", text: "Progressive PH.MC" },
    { value: "Progressive PH.BC", text: "Progressive PH.BC" },
  ];

  
  const [selected, setSelected] = useState(options[0].value);
    
  const handleChange = (event) => {
    console.log(event.target.value);
    setSelected(event.target.value);
  };
  return (
    <>
      <div className="modal">
        <div onClick={handlePopupToggle} className="overlay"></div>
        <div className="modal-content">
          <div className="flex ">
            <div className="flex erwq  flex-col w-96 mt-4 mb-4 items-start gap-8">
            <div class="relative z-0 w-full mb-2 group">
                <input
                onChange={handleInput1Change} 
                  type="email"
                  name="floating_email"
                  id="floating_email"
                  class="block py-2.5 px-0 w-full input33 text-gray-800 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-y-cyan-400 peer"
                  placeholder=" "
                  required
                />
                <label
                  for="floating_email"
                  class="peer-focus:font-medium absolute text-sm text-gray-600 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-300 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  name
                </label>
              </div>
              <div class="relative z-0 w-full mb-2 group">
                <input
                onChange={handleInput2Change}
                  type="email"
                  name="floating_email"
                  id="floating_email"
                  class="block py-2.5 px-0 w-full input33 text-gray-800 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-y-cyan-400 peer"
                  placeholder=" "
                  required
                />
                <label
                  for="floating_email"
                  class="peer-focus:font-medium absolute text-sm text-gray-600 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-300 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  location
                </label>
              </div>
              <div class="relative z-0 w-full mb-2 group">
                <input
                onChange={handleInput3Change}
                  type="email"
                  name="floating_email"
                  id="floating_email"
                  class="block py-2.5 px-0 w-full input33 text-gray-800 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-y-cyan-400 peer"
                  placeholder=" "
                  required
                />
                <label
                  for="floating_email"
                  class="peer-focus:font-medium absolute text-sm text-gray-600 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-300 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  phone number
                </label>
              </div>
              {/* <Input className="input33" size="lg" label="name" onChange={handleInput1Change} /> */}
              {/* <Input className="input33" size="lg" label="location" onChange={handleInput2Change} />
              <Input className="input33"
                size="lg"
                label="phone number"
                onChange={handleInput3Change}
              /> */}
              {/* <div class="grid gap-5 mb-3 md:grid-cols-3">
        <div>
            <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First name</label>
            <input  type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-14 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" />
        </div>
        <div>
            <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First name</label>
            <input  type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-14 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" />
        </div>
        <div>
            <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First name</label>
            <input  type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-14 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" />
        </div>
        </div> */}
        <div className="downselec">
              <div className="w-full flex justify-center  align-Items-center ">
                <label
                  for="first_name"
                  class="block labol mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  right eye
                </label>
              </div>
              <div className="downselect">
                {/* <div className="w-20 mr-2 inp ">
                  <Input
                    size="md"
                    className="inputsr "
                    label="SPH"
                    onChange={handleInput4Change}
                  />
                </div> */}
                <div class="relative z-0 w-full group">
                <input
                onChange={handleInput4Change}
                  type="text"
                  name="floating_email"
                  id="floating_email"
                  class="block py-2.5 px-0 w-full inputsr text-gray-800 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-y-cyan-400 peer"
                  placeholder=" "
                  required
                />
                <label
                  for="floating_email"
                  class="peer-focus:font-medium absolute text-sm text-gray-600 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-300 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  SPH
                </label>
              </div>



                {/* <div className="w-20 mr-2  inp  ">
                  <Input
                    size="md"
                    className="w-20 inputsr "
                    label="CYL "
                    onChange={handleInput5Change}
                  />
                </div> */}
                <div class="relative z-0 w-full group">
                <input
                onChange={handleInput5Change}
                  type="text"
                  name="floating_email"
                  id="floating_email"
                  class="block py-2.5 px-0 w-full inputsr text-gray-800 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-y-cyan-400 peer"
                  placeholder=" "
                  required
                />
                <label
                  for="floating_email"
                  class="peer-focus:font-medium absolute text-sm text-gray-600 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-300 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  CYL
                </label>
              </div>
                {/* <div className="w-20  mr-2 inp ">
                  <Input
                    size="md"
                    className="w-20 inputsr "
                    label="AIX"
                    onChange={handleInput6Change}
                  />
                </div> */}
                <div class="relative z-0 ">
                <input
                onChange={handleInput6Change}
                  type="text"
                  name="floating_email"
                  id="floating_email"
                  class="block py-2.5 px-0 w-full inputsr text-gray-800 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-y-cyan-400 peer"
                  placeholder=" "
                  required
                />
                <label
                  for="floating_email"
                  class="peer-focus:font-medium absolute text-sm text-gray-600 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-300 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  AIX
                </label>
              </div>
              </div>
              </div>
              <div className="downselec">
              <div className="w-full flex justify-center  align-Items-center ">
                <label
                  for="first_name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  left eye
                </label>
              </div>
              <div className="downselect">
                {/* <div className="w-20 mr-2 inp ">
                  <Input
                    size="md"
                    className="inputsr "
                    label="SPH"
                    onChange={handleInput4Change}
                  />
                </div> */}
                <div class="relative z-0 w-full  group">
                <input
                onChange={handleInput7Change}
                  type="text"
                  name="floating_email"
                  id="floating_email"
                  class="block py-2.5 px-0 w-full inputsr text-gray-800 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-y-cyan-400 peer"
                  placeholder=" "
                  required
                />
                <label
                  for="floating_email"
                  class="peer-focus:font-medium absolute text-sm text-gray-600 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-300 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  SPH
                </label>
              </div>



                {/* <div className="w-20 mr-2  inp  ">
                  <Input
                    size="md"
                    className="w-20 inputsr "
                    label="CYL "
                    onChange={handleInput5Change}
                  />
                </div> */}
                <div class="relative z-0 w-full  group">
                <input
                onChange={handleInput8Change}
                  type="text"
                  name="floating_email"
                  id="floating_email"
                  class="block py-2.5 px-0 w-full inputsr text-gray-800 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-y-cyan-400 peer"
                  placeholder=" "
                  required
                />
                <label
                  for="floating_email"
                  class="peer-focus:font-medium absolute text-sm text-gray-600 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-300 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  CYL
                </label>
              </div>
                {/* <div className="w-20  mr-2 inp ">
                  <Input
                    size="md"
                    className="w-20 inputsr "
                    label="AIX"
                    onChange={handleInput6Change}
                  />
                </div> */}
                <div class="relative z-0 ">
                <input
                onChange={handleInput9Change}
                  type="text"
                  name="floating_email"
                  id="floating_email"
                  class="block py-2.5 px-0 w-full inputsr text-gray-800 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-y-cyan-400 peer"
                  placeholder=" "
                  required
                />
                <label
                  for="floating_email"
                  class="peer-focus:font-medium absolute text-sm text-gray-600 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-300 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  AIX
                </label>
              </div>
              </div>
              </div>
              <select
                value={selectedLensType}
                onChange={handleLensTypeChange}
                className="bg-gray-50 border sels border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.text}
                  </option>
                ))}
              </select>
              <div className="flex items-center ">
                <div className=" ffff">
                    <Button onClick={handleByNowClick}>By Now</Button>
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