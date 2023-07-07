import React, {  useState } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Items from './Items';
const Dashboard = () => {
  const { currentUser } = useAuth();
  const { logout } = useAuth();
  const [error, setError] = useState("");
  const naviagte = useNavigate();
  const handleLogout = async ()=>{
    setError("")
    try{
      await logout();
      naviagte("/login")
    }catch{
      setError("felid to logout")
    }
  }
  return (
    <>
      <Items/>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email:</strong> {currentUser && currentUser.email}
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
            UpdateProfile
          </Link>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button className="btn btn-primary" onClick={handleLogout}>log out</Button>
      </div>
    </>
  );
};

export default Dashboard;
