import React, { useState } from "react";
import { db, storage } from "../components/firebase";

const Dashboard = () => {
  const [imageFile1, setImageFile1] = useState(null);
  const [imageFile2, setImageFile2] = useState(null);
  const [title, setTitle] = useState("");
  const [color1, setColor1] = useState("");
  const [color2, setColor2] = useState("");
  const [price, setPrice] = useState("");

  const handleImageChange = (e, setImageFile) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const handleUpload = (file) => {
    return new Promise((resolve, reject) => {
      const storageRef = storage.ref(`images/${file.name}`);
      const uploadTask = storageRef.put(file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Track progress if needed
        },
        (error) => {
          reject(error);
        },
        () => {
          // Upload completed successfully
          storageRef
            .getDownloadURL()
            .then((url) => {
              resolve(url);
            })
            .catch((error) => {
              reject(error);
            });
        }
      );
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Upload image files to Firebase Storage
      const imageUrl1 = await handleUpload(imageFile1);
      const imageUrl2 = await handleUpload(imageFile2);

      const item = {
        imageUrl1,
        imageUrl2,
        title,
        color1,
        color2,
        price,
      };

      // Add item to the "products" collection in Firestore
      await db.collection("products").add(item);

      console.log("Item added successfully!");
      // Reset the form after successful submission
      setImageFile1(null);
      setImageFile2(null);
      setTitle("");
      setColor1("");
      setColor2("");
      setPrice("");
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <form onSubmit={handleSubmit}>
        <label>Image 1:</label>
        <input type="file" onChange={(e) => handleImageChange(e, setImageFile1)} />

        <label>Image 2:</label>
        <input type="file" onChange={(e) => handleImageChange(e, setImageFile2)} />

        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Color 1:</label>
        <input
          type="text"
          value={color1}
          onChange={(e) => setColor1(e.target.value)}
        />

        <label>Color 2:</label>
        <input
          type="text"
          value={color2}
          onChange={(e) => setColor2(e.target.value)}
        />

        <label>Price:</label>
        <input
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Dashboard;
