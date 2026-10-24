'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { validateLogin } from '../lib/validation.mjs';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);

  function handleLogin(event) {
    event.preventDefault();
    const nextErrors = validateLogin(email, password);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    try {
      // A demo session only. Never save the password in browser storage.
      sessionStorage.setItem('noted-user', email.trim().toLowerCase());
      setBusy(true);
      router.replace('/notes');
    } catch {
      setErrors({ storage: 'Allow browser storage to continue.' });
    }
  }

  return <main className="login-shell">
    <section className="intro">
      <a className="brand" href="/" aria-label="Noted home"><span className="brand-icon">n.</span> noted<span className="brand-dot">®</span></a>
      <div className="intro-copy"><p className="eyebrow">LESS NOISE. MORE IDEAS.</p><h1>A little space<br />for your<br /><em>big ideas.</em></h1><p>From passing thoughts to your next big thing.<br />Keep it all together, one note at a time.</p></div>
      <div className="paper-preview" aria-hidden="true"><span>✦ &nbsp; NOTE TO SELF</span><h3>Make room for<br />a fresh start.</h3><p>Good things begin with an idea.</p><div className="paper-lines" /></div>
      <p className="intro-footer">A clear mind starts with a blank page. <span>↗</span></p>
    </section>
    <section className="login-panel"><div className="login-card">
      <p className="eyebrow">YOUR PERSONAL THINKING SPACE</p><h2>Welcome in.</h2><p className="muted">Sign in and pick up where your mind left off.</p>
      <form onSubmit={handleLogin} noValidate>
        <label htmlFor="email">Email address</label>
        <input id="email" type="email" autoComplete="username" placeholder="you@gmail.com" value={email} onChange={e => setEmail(e.target.value)} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'login-errors' : 'email-hint'} required />
        <small id="email-hint">Use your @gmail.com email address.</small>
        <label htmlFor="password">Password</label>
        <div className="password-wrap"><input id="password" type={showPassword ? 'text' : 'password'} autoComplete="current-password" placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} aria-invalid={Boolean(errors.password)} aria-describedby={errors.password ? 'login-errors' : 'password-hint'} required /><button type="button" className="show-password" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? 'Hide' : 'Show'}</button></div>
        <small id="password-hint">At least 7 characters.</small>
        <button type="submit" className="primary login-button" disabled={busy}>{busy ? 'Opening your notes…' : <>Log in <span>↗</span></>}</button>
        <div id="login-errors" className="login-errors" aria-live="polite" aria-atomic="true">{Object.keys(errors).length > 0 && <div role="alert">{Object.values(errors).map(message => <p key={message}>{message}</p>)}</div>}</div>
      </form>
      <div className="login-footnote"><span>✧</span><p>A simple place to collect your thoughts.<br /><strong>Make yourself at home.</strong></p></div>
    </div><p className="demo-caption">CLASSROOM DEMO · FORM VALIDATION ONLY</p></section>
  </main>;
}
