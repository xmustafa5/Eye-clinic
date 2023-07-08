import React, { useState,useEffect } from "react";
import { db, storage } from "../components/firebase";

const Dashboard = () => {
  const [imageFile1, setImageFile1] = useState(null);
  const [imageFile2, setImageFile2] = useState(null);
  const [title, setTitle] = useState("");
  const [color1, setColor1] = useState("");
  const [color2, setColor2] = useState("");
  const [price, setPrice] = useState("");
  const [products, setProducts] = useState([]);

  const handleImageChange = (e, setImageFile) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const uploadTasks = [];
   
    if (imageFile1) {
      const uploadTask1 = storage.ref(`images/${imageFile1.name}`).put(imageFile1);
      uploadTasks.push(uploadTask1);
    }

    if (imageFile2) {
      const uploadTask2 = storage.ref(`images/${imageFile2.name}`).put(imageFile2);
      uploadTasks.push(uploadTask2);
    }

    Promise.all(uploadTasks)
      .then(() => {
        const imageUrlPromises = [];

        if (imageFile1) {
          const imageUrl1Promise = storage
            .ref("images")
            .child(imageFile1.name)
            .getDownloadURL();
          imageUrlPromises.push(imageUrl1Promise);
        }

        if (imageFile2) {
          const imageUrl2Promise = storage
            .ref("images")
            .child(imageFile2.name)
            .getDownloadURL();
          imageUrlPromises.push(imageUrl2Promise);
        }

        return Promise.all(imageUrlPromises);
      })
      .then((imageUrls) => {
        const item = {
          imageUrl1: imageUrls[0] || "",
          imageUrl2: imageUrls[1] || "",
          title,
          color1,
          color2,
          price,
        };

        return db.collection("products").add(item);

        
      })
      .then(() => {
        console.log("Item added successfully!");
        setImageFile1(null);
        setImageFile2(null);
        setTitle("");
        setColor1("");
        setColor2("");
        setPrice("");
      })
      .catch((error) => {
        console.error("Error adding item:", error);
      });
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

  const handleRemoveProduct = (productId) => {
    db.collection("products")
      .doc(productId)
      .delete()
      .then(() => {
        console.log("Product removed successfully!");
      })
      .catch((error) => {
        console.error("Error removing product:", error);
      });
  };

  return (
    <section className='pro'>
    <h1 className="fex titles">Dashboard</h1>
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
      <div>
      <h1>Dashboard</h1>
      <h2>Products:</h2>
      {products.map((product) => (
        <div key={product.id}>
          <h3>{product.title}</h3>
          { product.color1 &&<p>Color 1: {product.color1}</p>}
        { product.color2 && <p>Color 2: {product.color2}</p>} 
          <p>Price: {product.price}</p>
          <button onClick={() => handleRemoveProduct(product.id)}>
            Remove Product
          </button>
          <hr />
        </div>
      ))}
    </div>
    </section>
  );
};

export default Dashboard;
