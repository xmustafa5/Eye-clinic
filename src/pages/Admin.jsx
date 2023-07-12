import React from "react";
import { Link } from "react-router-dom";
import "./Admin.css";
import Items from "./../components/authlogin/Items";
const Admin = () => {
  const handleLogout = () => {
    // Clear the authentication status in localStorage
    localStorage.removeItem("isLoggedIn");
    // Redirect to the login page
    window.location.href = "/logadmin";
  };
  return (
    <section className="pro colorize">
      <div className="rr ccc">
       
        <div className="dddde">
           <div className="dddd">
            <div className="ddddd">

           
          <div class="containeroo">
            <div class="shapeW">
              <h1 className="admitt">Admin</h1>
            </div> </div>
          </div>
        </div>
          <div className={"homebtngroup mb-4 "}>
            <Link to="/requests">
              <button
                className={"btnbtnprimary"}
                data-aos="zoom-in"
                data-aos-duration="1400"
              >
                <p className={"btntext3"}>Requests</p>
                <span className={"square"}></span>
              </button>
            </Link>
            <Link to="/Dashboard">
              <button
                className={"btnbtnsecondary"}
                data-aos="zoom-in"
                data-aos-duration="1400"
              >
                <p className={"btntext3"}>Add item</p>
                <span className={"square"}></span>
              </button>
            </Link>
          </div>
          <div className="flex justify-center align-Items-center">
            <button className="colse_admin" onClick={handleLogout}>
              Close Admin
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Admin;
