import React from "react";
import { Link } from "react-router-dom";
import "./Admin.css"
const Admin = () => {
    const handleLogout = () => {
        // Clear the authentication status in localStorage
        localStorage.removeItem('isLoggedIn');
        // Redirect to the login page
        window.location.href = '/logadmin';
      };
  return (
    <section className="pro "> 
    
   <div className="w-full flex justify-end ">
    <div >
    {/* <h1 className="text-lg m-5 text-whit " >Welcome to the Admin Page</h1> */}
    <div className="w-full flex justify-center mr-10">

   
      <button
                className={"btnbtnprimary"}
                data-aos="zoom-in"
                data-aos-duration="1400"
              >
                <p className={"btntext"}>Logout</p>
                <span className={"square"}></span>
              </button> </div> </div> </div>
      <div className="r ccc">
      <div className={"homebtngroup"}>
      <div>
     
                 </div>
            <Link to="/requests">
              <button
                className={"btnbtnprimary"}
                data-aos="zoom-in"
                data-aos-duration="1400"
              >
                <p className={"btntext"}>Requests</p>
                <span className={"square"}></span>
              </button>
            </Link>
            <Link to="/Dashboard">
              <button
                className={"btnbtnsecondary"}
                data-aos="zoom-in"
                data-aos-duration="1400"
              >
                <p className={"btntext"}>Dashboard</p>
                <span className={"square"}></span>
              </button>
            </Link>
          </div>
      </div>
    </section>
  );
};

export default Admin;
