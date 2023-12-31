import React, { useState, useEffect } from "react";
import bannerline from "../assets/images/banner-line-11.png"
import bannerimgbg from "../assets/images/banner-img-bg1.png"
import bannerimg from "../assets/images/100-min.png"
import banneralimenticon1 from "../assets/images/banner-aliment-icon-12.png"
import banneralimenticon2 from "../assets/images/banner-aliment-icon-23.png"
import banneralimenticon3 from "../assets/images/banner-aliment-icon-35.png"
import banneralimenticon4 from "../assets/images/banner-aliment-icon-4.png"
import shape3 from "../assets/images/shape-31.png";
import shape1 from "../assets/images/shape-11.png";
import shape2 from "../assets/images/shape-2.png";
import shape4 from "../assets/images/shape-4.png";
import cta from "../assets/images/cta-bg-img1.png";
import "./Home4.css"
import "./footer.css"
import { Link } from 'react-router-dom';
import { db } from "../components/firebase";
import Loading from "./Loading";
// import AOS from 'aos';
// import 'aos/dist/aos.css';
const Homepg = () => {
  const [searchInput, setSearchInput] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching filtered items:", error);
      }
    };

    fetchFilteredItems();
  }, [searchInput]);
  const contactcardnone = filteredItems.length > 0 ? "section-with-items items-visible" : "section-with-no-items";
  const flexoClass = filteredItems.length > 0 ? "flexo items-visible transition visible" : "flexo transition";
  const transformClass = filteredItems.length > 0 ? "transform-effect" : "";
    const contactcardn = filteredItems.length > 0 ? "section-with " : "section-with-not" ;
    const handleButtonClick = () => {
      const section = document.getElementById("shop");
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    };
    const handleButton1Click = () => {
      const sectionn = document.getElementById("v");
      if (sectionn) {
        sectionn.scrollIntoView({ behavior: 'smooth' });
      }
    };
    if (isLoading) {
      return <Loading />;
    }
    
  return (
    <div className='home pt-10 '>
      
    <div className={"home22"}>
        <div className={"shape"}>
          <div className={"shape1"}>
            <img src={shape1} alt="art shape1" width={70} />
          </div>
          <div className={"shape2"}>
            <img src={shape2} alt="art shape1" width={70} height={55} />
          </div>
          <div className={"shape3"}>
            <img src={shape3} alt="art shape" width={300} />
          </div>
          <div className={"shape4"}>
            <img src={shape4} alt="art shape" width={50} height={64} />
          </div>
        
        </div>
        <div className={"homeleft"}>
          <p className={"stitle"}>Welcome to our Clinic</p>

          <h1
            className={"mainheading"}
            data-aos="fade-right"
            data-aos-duration="900"
          >
            Get Your Glasses 
           
            <span className={"underlineimg"}>
            
              <span>
                <img
                  src={bannerline}
                  alt="line"
                  width="302px"
                  height="auto"
                  className='bannerline'
                />
              </span>
            </span>
          </h1>
          <p className={"sectiontext"}>
         
        -  with
the best quality  - <br/>  At our Vision Eye Clinic <br />
               we take the time to get to know you, <br/>your eye care history <br/> 
               and your vision needs. 
            </p>
          <div className={"homebtngroup"}>
            <Link to="/#shop">
              <button onClick={handleButtonClick}
                className={"btnbtnprimary"}
                data-aos="zoom-in"
                data-aos-duration="1400"
              >
                <p className={"btntext"} >Discover eyeglasses</p>
                <span className={"square"}></span>
              </button>
            </Link>
            <Link href="/aboutus">
              <button onClick={handleButton1Click}
                className={"btnbtnsecondary"}
                data-aos="zoom-in"
                data-aos-duration="1400"
              >
                <p className={"btntext"}>Discover your current vision</p>
                <span className={"square"}></span>
              </button>
            </Link>
          </div>
        </div>
        <div className={"homeright"}>
         

      
          <div className={'imgbox'}>
            {/* <img src={bannerimgbg} alt="colorful background shape" className={backgroundshape} /> */}
          <div className='rrr' >
            <div className='re'>

            
            <img
              // src={'https://firebasestorage.googleapis.com/v0/b/glassesd-cd48f.appspot.com/o/100.png?alt=media&token=46563ef2-7187-4aa3-9f52-ef13ecaea9a9'}
              src={bannerimg}
              alt="banner img"
              className="bannerimg"
             
            />
            </div>
            <div className={"icon"}>
              <div className={"icon11"}>
                <img
                  src={banneralimenticon1}
                  alt=""
                  className='icomimg1'
                /><img
                  src={banneralimenticon2}
                  alt=""
                  className='icomimg2'

                /> <img
                  src={banneralimenticon3}
                  alt=""
                  className='icomimg3'

                />
               
            
               <img src={banneralimenticon4} alt=""                   className='icomimg4'
 />
              
              </div>
              
            </div>   
              </div>
            <div className='sertc'>

         
        <div className={"sert"}>
          <img
            src={bannerimgbg}
            alt="colorful background shape"
            className={"backgroundshape1"}
          />
        </div>
        </div>
        </div>
          </div>
         
      </div> 
      <div className={"er"}   id="v">

      <section className={`contactsssss  ${contactcardn} ` }  >
        <div className={`contactcard   ${contactcardnone} `} >
          <div className='block'>
            <div className={"contactcardbg"}><img src={cta} alt="jk" /></div>
            <div class={"griditem"}>
          <h2 className={"contactcardh2"} >Discover your last current vision  </h2>
          <div class={"wrapperrr"} data-aos="fade-left" data-aos-duration="900">
            <input type="text" value={searchInput}
            onChange={handleSearchInputChange}  placeholder="Phone Number "  className={"input"} />
           
            </div>
        </div> 
          </div>
         <div className={` ${flexoClass} `} id="vsi">

         <div className={`flexo ${transformClass}`}>
  {filteredItems.length > 0 ? (
    <div>
      {filteredItems.map((item, index) => (
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="vvv  prth  px-6 py-3"> 
                  Product name
                </th>
                <th scope="col" class="vvv  prth px-6 py-3">
                  SPH
                </th>
                <th scope="col" class=" vvv prth px-6 py-3">
                  CYL
                </th>
                <th scope="col" class="vvv  prth px-6 py-3">
                  AIX
                </th>
                <th scope="col" class="vvv  prth px-6 py-3">
                  lens type
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <th
                  scope="row"
                  class="vvv px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Lift Eye
                </th>
                <td class="vvv px-6 py-4">{item.l_e_sph}</td>
                <td class="vvv px-6 py-4">{item.l_e_cyl}</td>
                <td class="vvv px-6 py-4">{item.l_e_axis}</td>
                <td class="vvv px-6 py-4">{item.lenstype}</td>
              </tr>
              <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <th
                  scope="row"
                  class="vvv px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Right Eye
                </th>
                <td class="vvv px-6 py-4">{item.r_e_sph}</td>
                <td class="vvv px-6 py-4">{item.r_e_cyl}</td>
                <td class="vvv px-6 py-4">{item.r_e_axis}</td>
                <td class="vvv px-6 py-4"></td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
    </div>
  ) : (
    <></>
  )}    
 </div></div>
  </div>
</section>
</div>
</div>
);

};

export default Homepg;
