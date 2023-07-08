import React, { useState, useEffect } from "react";
import { db } from "../components/firebase";

const FilterSize = () => {
  const [searchInput, setSearchInput] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  useEffect(() => {
    const fetchFilteredItems = async () => {
      try {
        const snapshot = await db
          .collection("items")
          .where("numberphone", "==", searchInput) // Filter by numberphone field
          .get();

        const itemsByNumberphone = snapshot.docs.map((doc) => doc.data());
        const groupedItems = itemsByNumberphone.reduce((acc, item) => {
          if (acc[item.numberphone]) {
            const currentDate = new Date(
              item.yeardate,
              item.monthdate,
              item.daydate
            );
            const storedDate = new Date(
              acc[item.numberphone].yeardate,
              acc[item.numberphone].monthdate,
              acc[item.numberphone].daydate
            );

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
        console.error("Error fetching filtered items:", error);
      }
    };

    fetchFilteredItems();
  }, [searchInput]);

  return (
    <div className="search">
      <div className="tables">
        <div className="searcho">

       
        <h1 className="titlefindmide">Find your made</h1>
        <div className="searchi  relative">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              class="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            value={searchInput}
            onChange={handleSearchInputChange}
            id="default-search"
            class="block w-96 p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter Your Number..."
          />
        </div>
         </div>
        <div className="tables">
          {filteredItems.length > 0 ? (
            <div>
              {filteredItems.map((item, index) => (
                // <div key={index}>
                //   <p>Name: {item.yeardate}-{item.monthdate}-{item.daydate}</p>
                //   <p>L_E_Axis: {item.l_e_axis}</p>
                //   <p>L_E_Cyl: {item.l_e_cyl}</p>
                //   <p>L_E_Sph: {item.l_e_sph}</p>
                //   <p>R_E_Axis: {item.r_e_axis}</p>
                //   <p>R_E_Cyl: {item.r_e_cyl}</p>
                //   <p>R_E_Sph: {item.r_e_sph}</p>
                //   <p>Lens Type: {item.lenstype}</p>
                // </div>

                <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                  <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" class="px-6 py-3">
                          Product name
                        </th>
                        <th scope="col" class="px-6 py-3">
                          SPH
                        </th>
                        <th scope="col" class="px-6 py-3">
                          CYL
                        </th>
                        <th scope="col" class="px-6 py-3">
                          AIX
                        </th>
                        <th scope="col" class="px-6 py-3">
                          lens type
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                        <th
                          scope="row"
                          class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          Lift Eye
                        </th>
                        <td class="px-6 py-4">{item.l_e_sph}</td>
                        <td class="px-6 py-4">{item.l_e_cyl}</td>
                        <td class="px-6 py-4">{item.l_e_axis}</td>
                        <td class="px-6 py-4">{item.lenstype}</td>
                      </tr>
                      <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                        <th
                          scope="row"
                          class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          Right Eye
                        </th>
                        <td class="px-6 py-4">{item.r_e_sph}</td>
                        <td class="px-6 py-4">{item.r_e_cyl}</td>
                        <td class="px-6 py-4">{item.r_e_axis}</td>
                        <td class="px-6 py-4"></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterSize;
