import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

const RequireAuth = ({ children }) => {
  const { currentUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
 useEffect(() => {
    // Check if the user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (!isLoggedIn) {
      // Redirect to the login page if not logged in
      navigate('/logadmin', { replace: true });
    }
  }, []);
  if (!currentUser) {
    return <Navigate to="/login" state={{ path: location.pathname }} />;
  }
  if (!currentUser) {
    return <Navigate to="/Logadmin" state={{ path: location.pathname }} />;
  }
 


  return children;
};

export default RequireAuth;
