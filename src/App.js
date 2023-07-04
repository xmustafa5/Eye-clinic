import { Route, Routes } from 'react-router-dom';
import Layout from './layout';
import Home from './pages/Home';
import Sighup from './pages/SingUp';
import Loading from './components/Loading';
import Baskett from './pages/Baskett';
import Requests from './components/Requests';
function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route index element={<Home />} />
          <Route path='/Baskett' element={<Baskett />} />
          <Route path='/Loading' element={<Loading />} />
          <Route  path="/requests" element={<Requests/>} />

        </Routes>
      </Layout>
    </>
  );
}
export default App;
