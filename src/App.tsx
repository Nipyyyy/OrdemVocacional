import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './components/NotificationContainer';
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Profile from './pages/Profile';
import About from './pages/About';
import Test from './pages/Test';
import Results from './pages/Results';
import RPGInfo from './pages/RPGInfo';
import TokensAndMaps from './pages/TokensAndMaps';
import NotFound from './pages/NotFound';
import './index.css';

function App() {
  return (
    <NotificationProvider>
      <AuthProvider>
        <Router>
          <div className="flex flex-col min-h-screen bg-gradient-to-br from-dark-blue to-dark-purple text-white">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/cadastro" element={<Register />} />
                <Route path="/esqueci-senha" element={<ForgotPassword />} />
                <Route path="/sobre" element={<About />} />
                <Route path="/teste" element={
                  <ProtectedRoute>
                    <Test />
                  </ProtectedRoute>
                } />
                <Route path="/resultados" element={
                  <ProtectedRoute>
                    <Results />
                  </ProtectedRoute>
                } />
                <Route path="/perfil" element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } />
                <Route path="/rpg" element={<RPGInfo />} />
                <Route path="/tokens-e-mapas" element={<TokensAndMaps />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </NotificationProvider>
  );
}

export default App