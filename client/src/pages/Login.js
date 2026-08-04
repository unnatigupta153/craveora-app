import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { apiRequest } from '../api';

export default function Login({ onLogin }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const submit = async (event) => {
    event.preventDefault(); setError('');
    try { const result = await apiRequest('/auth/login', { method: 'POST', body: JSON.stringify(form) });
      localStorage.setItem('token', result.jwtToken); localStorage.setItem('loggedInUser', result.name); onLogin(); navigate('/home');
    } catch (err) { setError(err.message); }
  };
  return <main className="auth-card"><p className="eyebrow">MERN AUTH</p><h1>Welcome back</h1><p className="muted">Sign in to continue to your dashboard.</p>
    <form onSubmit={submit}><label>Email<input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></label><label>Password<input type="password" required minLength="4" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} /></label>{error && <p className="error">{error}</p>}<button type="submit">Login</button></form>
    <p className="switch">Don't have an account? <Link to="/signup">Create one</Link></p></main>;
}
