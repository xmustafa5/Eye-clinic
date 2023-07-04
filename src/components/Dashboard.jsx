import React, { useState } from "react";
import { db } from "../components/firebase";


const Dashboard = () => {
    const [imageUrl1, setImageUrl1] = useState("");
    const [imageUrl2, setImageUrl2] = useState("");
    const [title, setTitle] = useState("");
    const [color1, setColor1] = useState("");
    const [color2, setColor2] = useState("");
    const [price, setPrice] = useState("");
  
    const handleInputChange = (e, setState) => {
      setState(e.target.value);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      const item = {
        imageUrl1,
        imageUrl2,
        title,
        color1,
        color2,
        price,
      };
  
      // Add item to the "products" collection in Firebase
      db.collection("products")
        .add(item)
        .then(() => {
          console.log("Item added successfully!");
          // Reset the form after successful submission
          setImageUrl1("");
          setImageUrl2("");
          setTitle("");
          setColor1("");
          setColor2("");
          setPrice("");
        })
        .catch((error) => {
          console.error("Error adding item:", error);
        });
    };
  
    return (
      <div>
        <h1>Dashboard</h1>
        <form onSubmit={handleSubmit}>
          <label>Image URL 1:</label>
          <input
            type="text"
            value={imageUrl1}
            onChange={(e) => handleInputChange(e, setImageUrl1)}
          />
  
          <label>Image URL 2:</label>
          <input
            type="text"
            value={imageUrl2}
            onChange={(e) => handleInputChange(e, setImageUrl2)}
          />
  
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => handleInputChange(e, setTitle)}
          />
  
          <label>Color 1:</label>
          <input
            type="text"
            value={color1}
            onChange={(e) => handleInputChange(e, setColor1)}
          />
  
          <label>Color 2:</label>
          <input
            type="text"
            value={color2}
            onChange={(e) => handleInputChange(e, setColor2)}
          />
  
          <label>Price:</label>
          <input
            type="text"
            value={price}
            onChange={(e) => handleInputChange(e, setPrice)}
          />
  
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  };
  
  export default Dashboard;
  