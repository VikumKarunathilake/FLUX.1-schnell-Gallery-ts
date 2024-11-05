import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Gallery } from './pages/Gallery';
import { LoginPage } from './pages/Login';
import { Navbar } from './components/Navbar';
import Footer from './components/Footer';
import ReactGA from 'react-ga4';
import { useEffect } from 'react';

ReactGA.initialize('G-G7B98KCPYM'); // Replace with your Measurement ID


function App() {
  useEffect(() => {
    ReactGA.send("pageview");
}, []);
  return (
    <div className="App">
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<Gallery />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
    <Footer/>
    </div>
  );
}

export default App;