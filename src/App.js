import { Route, Routes } from 'react-router-dom';
import Layout from './layout';
import Home from './pages/Home';
import Loading from './components/Loading';
import Baskett from './pages/Baskett';
import Requests from './components/Requests';
import Dashboard from './components/Dashboard';

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

        </Routes>
      </Layout>
    </>
  );
}
export default App;
