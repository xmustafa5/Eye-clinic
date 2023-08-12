import { Route, Routes, useLocation } from 'react-router-dom';
import Layout from './layout';
import Home from './pages/Home';
import Loading from './components/Loading';
import Baskett from './pages/Baskett';
import Requests from './components/Requests';
import Dashboard from './components/Dashboard';
import Logadmin from './pages/Logadmin';
import Login from './components/authlogin/Login';
import Singup from './components/authlogin/Singup';
import ForgotPassword from './components/authlogin/ForgotPassword';
import AuthProvider from './context/AuthContext';
import RequireAuth from './context/RequirAuth';
import Dashboardd from './components/authlogin/Dashboardd';
import Admin from './pages/Admin';
import AuthContextAdmin from './context/AuthContextAdmin';
import Crop from './components/Crop';

function App() {
  const location = useLocation();
  const hideNavbarAndFooterPaths = ['/login'];
  const hideNavbarAndFooterPaths1 = ['/Singup'];

  const shouldHideNavbarAndFooter = hideNavbarAndFooterPaths.includes(location.pathname) || hideNavbarAndFooterPaths1.includes(location.pathname)

  return (
    <>
      <AuthProvider>
        <Layout hideNavbarAndFooter={shouldHideNavbarAndFooter}>
          <Routes>
            <Route path="/login" element={<Login />} />

            <Route path='/' element={<RequireAuth><Home/></RequireAuth>} />
            <Route path='/Baskett' element={<RequireAuth><Baskett /></RequireAuth>} />
            <Route path='/Loading' element={<Loading />} />
            <Route path="/requests" element={<AuthContextAdmin><Requests/></AuthContextAdmin>} />
            <Route path="/Dashboard" element={<AuthContextAdmin><Dashboard/></AuthContextAdmin>} />
            <Route path="/admin" element={<AuthContextAdmin><Admin/></AuthContextAdmin>} />
            <Route path="/Logadmin" element={<Logadmin />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path='/Singup' element={<Singup />} />
            <Route path='/Dashboardd' element={<RequireAuth><Dashboardd /></RequireAuth>} />
            <Route path='/crop' element={<RequireAuth><Crop /></RequireAuth>} />
          </Routes>
        </Layout>
      </AuthProvider>
    </>
  );
}

export default App;
