import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Overview from './pages/Overview';
import Tour from './pages/Tour';
import Login from './pages/Login';
import Account from './pages/Account';
import MyTours from './pages/MyTours';
import Alert from './components/Alert';
import { useAlert } from './context/AuthContext';

function App() {
  const { alert } = useAlert();

  return (
    <div className="min-h-screen flex flex-col">
      {alert && <Alert type={alert.type} message={alert.message} />}
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/tour/:slug" element={<Tour />} />
          <Route path="/login" element={<Login />} />
          <Route path="/me" element={<Account />} />
          <Route path="/my-tours" element={<MyTours />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
