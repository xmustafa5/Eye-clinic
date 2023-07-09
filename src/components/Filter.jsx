import React, { useState, useEffect } from "react";
import bannerline from "../assets/images/banner-line.png"
import bannerimgbg from "../assets/images/banner-img-bg.png"
import bannerimg from "../assets/images/100.png"
import banneralimenticon1 from "../assets/images/banner-aliment-icon-1.png"
import banneralimenticon2 from "../assets/images/banner-aliment-icon-2.png"
import banneralimenticon3 from "../assets/images/banner-aliment-icon-3.png"
import banneralimenticon4 from "../assets/images/banner-aliment-icon-4.png"
import shape3 from "../assets/images/shape-3.png";
import shape1 from "../assets/images/shape-1.png";
import shape2 from "../assets/images/shape-2.png";
import shape4 from "../assets/images/shape-4.png";
import "./Home4.css"
import "./footer.css"
import { Link } from 'react-router-dom';
import { db } from "../components/firebase";
// import AOS from 'aos';
// import 'aos/dist/aos.css';
const Filter = () => {
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
    <div className={"er"}  >

    <section className={"contactsssss"}>
      <div className={"contactcard"} >
        <div className='block'>

        
          <div className={"contactcardbg"}><img src={"cta"} alt="jk" /></div>
          <div class={"griditem"}>
        <h2 className={"contactcardh2"} >Start Your Best Online Classes With Us</h2>
        <div class={"wrapperrr"} data-aos="fade-left" data-aos-duration="900">
          <input type="text"   placeholder="Email Address"  className={"input"} />
         
          </div>
      </div> 
       </div>
       <div className="flexo ">
       {filteredItems.length > 0 ? (
            <div>
              {filteredItems.map((item, index) => (
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
     ))}   </div>
      
     ) : (
      <></>
      )}
      </div>
      </div>
     
    </section>
    </div>
  )
}




export default Filter