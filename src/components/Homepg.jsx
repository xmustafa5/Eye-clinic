import React from 'react';
import img from "../pec-hero-banner.jpg"
const Homepg = () => {
  return (
    <div className='eye'>
        {/* <img src={img} alt="" /> */}
        <div className="wrapper">
      <div className="containerr">
        <div className="grid-cols-2">
          <div className="grid-item-1">
            <h1 className="main-heading">
              Welcome to our <span>Clinic.</span>
            </h1>
            <p className="info-text">
              At our Vision Eye Clinic <br/>
              we take the time to get to know you, <br/>
              your eye care history <br/>
              and your vision needs.
            </p>
            <a href="indexx.html">
              <div className="btn_wrapper">
                {/* <button className="btn view_more_btn">
                  Visit our store <i className="ri-arrow-right-line"></i>
                </button> */}
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Homepg;
