import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { apiRequest } from '../api';

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const update = (field) => (event) => setForm({ ...form, [field]: event.target.value });
  const submit = async (event) => {
    event.preventDefault();
    setError('');
    try { await apiRequest('/auth/signup', { method: 'POST', body: JSON.stringify(form) }); navigate('/login'); }
    catch (err) { setError(err.message); }
  };

  return <main className="login-page signup-page"><section className="login-hero signup-hero"><div><div className="hero-mark">✦</div><p className="eyebrow light">JOIN THE TABLE</p><h1>Your next<br /><em>favourite</em> bite<br />is waiting.</h1><p>Make every meal a little more special with hand-picked places, fresh flavours and fast delivery.</p></div><div className="signup-benefits"><span>✓</span> Personalised food picks<br /><span>✓</span> Easy order tracking<br /><span>✓</span> Members-only offers</div></section>
    <section className="login-panel"><div className="login-heading"><p className="eyebrow">CRAVEORA</p><h2>Create account</h2><p className="muted">Join thousands of happy food lovers.</p></div><form onSubmit={submit}><label>Full name<input type="text" required minLength="3" placeholder="What should we call you?" value={form.name} onChange={update('name')} /></label><label>Email address<input type="email" required placeholder="you@example.com" value={form.email} onChange={update('email')} /></label><label>Create password<div className="password-field"><input type="password" required minLength="4" placeholder="At least 4 characters" value={form.password} onChange={update('password')} /><span>•••</span></div></label>{error && <p className="error">{error}</p>}<button type="submit" className="primary-button">Create my account <span>→</span></button></form><p className="legal-copy">By continuing, you agree to our Terms and Privacy Policy.</p><p className="switch">Already have an account? <Link to="/login">Sign in</Link></p></section></main>;
}
