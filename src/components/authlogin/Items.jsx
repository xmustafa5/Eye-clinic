import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, where } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import { firestore } from '../firebase';

const Items = () => {
  const { currentUser } = useAuth();
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');

  useEffect(() => {
    const fetchItems = async () => {
      if (!currentUser) {
        setItems([]);
        return;
      }

      const userItemsQuery = query(
        collection(firestore, 'items'),
        where('userId', '==', currentUser.uid)
      );
      const querySnapshot = await getDocs(userItemsQuery);
      const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setItems(data);
    };

    fetchItems();
  }, [currentUser]);

  const handleAddItem = async () => {
    try {
      const item = { name: newItem, userId: currentUser.uid };
      const docRef = await addDoc(collection(firestore, 'items'), item);
      setItems((prevItems) => [...prevItems, { id: docRef.id, ...item }]);
      setNewItem('');
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const handleUpdateItem = async (itemId, newName) => {
    try {
      const itemDoc = doc(firestore, 'items', itemId);
      await updateDoc(itemDoc, { name: newName });
      setItems((prevItems) =>
        prevItems.map((item) => (item.id === itemId ? { ...item, name: newName } : item))
      );
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      const itemDoc = doc(firestore, 'items', itemId);
      await deleteDoc(itemDoc);
      setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <div>
      <h2>Items</h2>
      <input
        type="text"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        placeholder="Enter item name"
      />
      <button onClick={handleAddItem}>Add Item</button>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <input
              type="text"
              value={item.name}
              onChange={(e) => handleUpdateItem(item.id, e.target.value)}
            />
            <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Items;
