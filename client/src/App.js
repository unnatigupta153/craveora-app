import { Navigate, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import './styles.css';

export default function App() {
  const [authenticated, setAuthenticated] = useState(Boolean(localStorage.getItem('token')));
  return <Routes>
    <Route path="/" element={<Navigate to={authenticated ? '/home' : '/login'} replace />} />
    <Route path="/login" element={<Login onLogin={() => setAuthenticated(true)} />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/home" element={authenticated ? <Home onLogout={() => setAuthenticated(false)} /> : <Navigate to="/login" replace />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>;
}
