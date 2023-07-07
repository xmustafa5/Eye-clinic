import { Route, Routes } from 'react-router-dom';
import Layout from './layout';
import Home from './pages/Home';
import Loading from './components/Loading';
import Baskett from './pages/Baskett';
import Requests from './components/Requests';
import Dashboard from './components/Dashboard';
import LoginPage from './components/LoginPage';
import Login from './components/authlogin/Login';
import Singup from './components/authlogin/Singup';
import ForgotPassword from './components/authlogin/ForgotPassword'

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route index element={<Home />} />
          <Route path='/Baskett' element={<Baskett />} />
          <Route path='/Loading' element={<Loading />} />
          <Route  path="/requests" element={<Requests/>} />
          <Route  path="/Dashboard" element={<Dashboard/>} />
          <Route  path="/LoginPage" element={<LoginPage />} />
          <Route  path="/login" element={<Login/>} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/Singup' element={<Singup />} />

        </Routes>
      </Layout>
    </>
  );
}
export default App;
