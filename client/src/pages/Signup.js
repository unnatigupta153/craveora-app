import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { apiRequest } from '../api';

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' }); const [error, setError] = useState(''); const navigate = useNavigate();
  const submit = async (event) => { event.preventDefault(); setError(''); try { await apiRequest('/auth/signup', { method: 'POST', body: JSON.stringify(form) }); navigate('/login'); } catch (err) { setError(err.message); } };
  return <main className="auth-card"><p className="eyebrow">MERN AUTH</p><h1>Create account</h1><p className="muted">Start with a secure account in seconds.</p><form onSubmit={submit}><label>Name<input required minLength="3" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></label><label>Email<input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></label><label>Password<input type="password" required minLength="4" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} /></label>{error && <p className="error">{error}</p>}<button type="submit">Sign up</button></form><p className="switch">Already registered? <Link to="/login">Login</Link></p></main>;
}
