import React from "react";
import Requests from "./../components/Requests";
import { Link } from "react-router-dom";
import "./Admin.css"
import Dashboard from './../components/Dashboard';
const Admin = () => {
    const handleLogout = () => {
        // Clear the authentication status in localStorage
        localStorage.removeItem('isLoggedIn');
        // Redirect to the login page
        window.location.href = '/logadmin';
      };
  return (
    <section className="pro ">
      <div className="r ccc">
      <div className={"homebtngroup"}>
      <div>
      <h1>Welcome to the Admin Page</h1>
      <button onClick={handleLogout}>Logout</button>
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
