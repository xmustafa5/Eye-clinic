import React, { useState, useEffect } from 'react';
import { db } from '../components/firebase';

const FilterSize = () => {
  const [searchInput, setSearchInput] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  useEffect(() => {
    const fetchFilteredItems = async () => {
      try {
        const snapshot = await db
          .collection('items')
          .where('numberphone', '==', searchInput) // Filter by numberphone field
          .get();

        const itemsByNumberphone = snapshot.docs.map((doc) => doc.data());
        const groupedItems = itemsByNumberphone.reduce((acc, item) => {
          if (acc[item.numberphone]) {
            const currentDate = new Date(item.yeardate, item.monthdate, item.daydate);
            const storedDate = new Date(acc[item.numberphone].yeardate, acc[item.numberphone].monthdate, acc[item.numberphone].daydate);
            
            if (currentDate > storedDate) {
              acc[item.numberphone] = item;
            }
          } else {
            acc[item.numberphone] = item;
          }
          
          return acc;
        }, {});

        const items = Object.values(groupedItems);
        setFilteredItems(items);
      } catch (error) {
        console.error('Error fetching filtered items:', error);
      }
    };

    fetchFilteredItems();
  }, [searchInput]);

  return (
    <div>
      <input
        type="search"
        value={searchInput}
        onChange={handleSearchInputChange}
        placeholder="Search by numberphone"
      />
      {filteredItems.length > 0 ? (
        <div>
          {filteredItems.map((item) => (
            <div key={item.id}>
              <p>Name: {item.yeardate}-{item.monthdate}-{item.daydate}</p>
              <p>L_E_Axis: {item.l_e_axis}</p>
              <p>L_E_Cyl: {item.l_e_cyl}</p>
              <p>L_E_Sph: {item.l_e_sph}</p>
              <p>R_E_Axis: {item.r_e_axis}</p>
              <p>R_E_Cyl: {item.r_e_cyl}</p>
              <p>R_E_Sph: {item.r_e_sph}</p>
              <p>Lens Type: {item.lenstype}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default FilterSize;
