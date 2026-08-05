import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { apiRequest } from '../api';

function GoogleIcon() {
  return <svg className="google-icon" viewBox="0 0 24 24" aria-hidden="true"><path fill="#4285F4" d="M21.35 12.23c0-.71-.06-1.4-.18-2.05H12v3.88h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.7 2.91-4.2 2.91-7.22Z"/><path fill="#34A853" d="M12 21.72c2.63 0 4.84-.87 6.45-2.37l-3.14-2.45c-.87.58-1.98.92-3.31.92-2.55 0-4.71-1.72-5.49-4.03H3.27v2.53A9.74 9.74 0 0 0 12 21.72Z"/><path fill="#FBBC05" d="M6.51 13.79A5.85 5.85 0 0 1 6.2 12c0-.62.11-1.22.31-1.79V7.68H3.27A9.75 9.75 0 0 0 2.25 12c0 1.57.38 3.05 1.02 4.32l3.24-2.53Z"/><path fill="#EA4335" d="M12 6.18c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.84 3.27 14.63 2.28 12 2.28a9.74 9.74 0 0 0-8.73 5.4l3.24 2.53c.78-2.31 2.94-4.03 5.49-4.03Z"/></svg>;
}

export default function Login({ onLogin }) {
  const [mode, setMode] = useState('password');
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const navigate = useNavigate();
  const submit = async (event) => {
    event.preventDefault(); setError('');
    try { const result = await apiRequest('/auth/login', { method: 'POST', body: JSON.stringify(form) });
      localStorage.setItem('token', result.jwtToken); localStorage.setItem('loggedInUser', result.name); onLogin(); navigate('/home');
    } catch (err) { setError(err.message); }
  };
  const showOtpNotice = () => { setError(''); setNotice('OTP login needs an email/SMS provider to be configured on the server.'); };
  return <main className="login-page"><section className="login-hero"><div className="hero-mark">✦</div><p className="eyebrow light">SECURE ACCESS</p><h1>Welcome back<br />to your space.</h1><p>One calm place for your account, products and everything that matters.</p><div className="hero-foot"><span className="status-dot" /> Protected by MERN authentication</div></section>
    <section className="login-panel"><div className="login-heading"><p className="eyebrow">CRAVEORA</p><h2>Sign in</h2><p className="muted">Good food is only a few clicks away.</p></div>
      <button type="button" className="social-button" onClick={() => setNotice('Google OAuth needs a configured Google Client ID on the server.')}><GoogleIcon /> Continue with Google</button>
      <div className="divider"><span>or continue with email</span></div>
      <div className="auth-tabs"><button type="button" className={mode === 'password' ? 'tab active' : 'tab'} onClick={() => { setMode('password'); setNotice(''); }}>Password</button><button type="button" className={mode === 'otp' ? 'tab active' : 'tab'} onClick={() => { setMode('otp'); setError(''); }}>Email OTP</button></div>
      {mode === 'password' ? <form onSubmit={submit}><label>Email<input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></label><label>Password<div className="password-field"><input type="password" required minLength="4" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} /><span>•••</span></div></label>{error && <p className="error">{error}</p>}<button type="submit" className="primary-button">Login</button></form> : <div className="otp-box"><label>Email<input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" /></label><div className="otp-input-row"><input aria-label="One time password" inputMode="numeric" maxLength="6" placeholder="Enter 6-digit OTP" disabled /><button type="button" className="secondary-button" onClick={showOtpNotice}>Send OTP</button></div><p className="otp-help">We’ll send a one-time code to your email.</p>{notice && <p className="notice">{notice}</p>}</div>}
      {mode === 'password' && notice && <p className="notice">{notice}</p>}<p className="switch">Don't have an account? <Link to="/signup">Create one</Link></p></section></main>;
}
