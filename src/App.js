import { Route, Routes } from "react-router-dom";
import Layout from "./layout";
import Home from "./pages/Home";
import Loading from "./components/Loading";
import Baskett from "./pages/Baskett";
import Requests from "./components/Requests";
import Dashboard from "./components/Dashboard";
import LoginPage from "./components/LoginPage";
import Login from "./components/authlogin/Login";
import Singup from "./components/authlogin/Singup";
import ForgotPassword from "./components/authlogin/ForgotPassword";
import AuthProvider from "./context/AuthContext";
import RequireAuth from "./context/RequirAuth";
import Dashboardd from "./components/authlogin/Dashboardd";
function App() {
  return (
    <>
      <AuthProvider>
          <Routes>         
                 <Route path="/login" element={<Login />} />
                  <Route path="/Singup" element={<Singup />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />

            <Route element={<Layout />}>
            <Route element={<RequireAuth />}>
              <Route path="/" element={<Home />  }/>
              <Route path="/Baskett" element={ <Baskett /> }/>
              </Route>

              <Route path="/Loading" element={<Loading />} />
              <Route path="/requests" element={<Requests />} />
              <Route path="/Dashboard" element={<Dashboard />} />
              <Route path="/LoginPage" element={<LoginPage />} />
              <Route
                path="/Dashboardd"
                element={
                  <RequireAuth><Dashboardd /></RequireAuth>} />
            </Route>
          </Routes>
      </AuthProvider>
    </>
  );
}
export default App;
