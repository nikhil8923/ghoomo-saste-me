import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,700;1,500&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap');

  @keyframes gsm-fadeUp {
    from { opacity:0; transform:translateY(20px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes gsm-drift {
    0%,100% { transform:translateY(0) rotate(0deg); }
    33%      { transform:translateY(-12px) rotate(1.5deg); }
    66%      { transform:translateY(7px) rotate(-1deg); }
  }
  @keyframes gsm-shimmer {
    0%   { left:-120%; }
    100% { left:200%; }
  }
  @keyframes gsm-pulse {
    0%,100% { box-shadow:0 0 0 0 rgba(255,107,0,0.5); }
    60%      { box-shadow:0 0 0 8px rgba(255,107,0,0); }
  }
  @keyframes gsm-spin { to { transform:rotate(360deg); } }

  .gsm-root {
    position:fixed; top:0; left:0;
    width:100vw; height:100vh;
    display:flex; align-items:stretch;
    font-family:'Plus Jakarta Sans',sans-serif;
    background:#fff7ed;
    z-index:9999;
    overflow:hidden;
  }

  /* LEFT */
  .gsm-left {
    width:46%;
    position:relative;
    display:flex;
    flex-direction:column;
    justify-content:flex-end;
    overflow:hidden;
    flex-shrink:0;
  }

  .gsm-left-bg {
    position:absolute; inset:0;
    background:linear-gradient(160deg,#ff6b00 0%,#e8420a 45%,#b22800 100%);
  }

  .gsm-left-bg::after {
    content:''; position:absolute; inset:0;
    background-image:radial-gradient(circle,rgba(255,255,255,0.12) 1px,transparent 1px);
    background-size:24px 24px;
  }

  .gsm-orb {
    position:absolute;
    border-radius:50%;
    filter:blur(55px);
    pointer-events:none;
  }

  .gsm-orb1 {
    width:280px; height:280px;
    background:rgba(255,180,80,0.22);
    top:-50px; left:10px;
    animation:gsm-drift 9s ease-in-out infinite;
  }

  .gsm-orb2 {
    width:200px; height:200px;
    background:rgba(180,40,0,0.28);
    bottom:20px; right:-20px;
    animation:gsm-drift 7s ease-in-out infinite;
    animation-delay:-4s;
  }

  .gsm-plane {
    position:absolute;
    z-index:2;
    animation:gsm-drift 7s ease-in-out infinite;
  }

  .gsm-overlay {
    position:absolute; inset:0;
    background:linear-gradient(to top,rgba(0,0,0,0.55) 0%,transparent 55%);
    z-index:1;
  }

  .gsm-left-content {
    position:relative; z-index:2;
    padding:36px 32px;
  }

  .gsm-brand {
    display:flex; align-items:center; gap:10px;
    margin-bottom:40px;
    animation:gsm-fadeUp 0.65s ease both;
  }

  .gsm-brand-pill {
    background:rgba(255,255,255,0.15);
    border:1px solid rgba(255,255,255,0.25);
    border-radius:999px;
    padding:5px 16px;
    font-size:11px; font-weight:600;
    color:#fff; letter-spacing:0.08em;
    text-transform:uppercase;
    backdrop-filter:blur(6px);
  }

  .gsm-brand-badge {
    background:#fff;
    border-radius:999px;
    padding:5px 12px;
    font-size:10px; font-weight:700;
    color:#e8420a; letter-spacing:0.08em;
    text-transform:uppercase;
  }

  .gsm-headline {
    font-family:'Playfair Display',serif;
    font-size:clamp(32px,3.5vw,50px);
    font-weight:700; color:#ffffff;
    line-height:1.18;
    margin-bottom:12px;
    animation:gsm-fadeUp 0.65s 0.1s ease both;
  }

  .gsm-headline em { font-style:italic; color:#ffd48a; }

  .gsm-sub {
    font-size:13px; font-weight:300;
    color:rgba(255,255,255,0.5);
    line-height:1.65;
    margin-bottom:32px;
    animation:gsm-fadeUp 0.65s 0.18s ease both;
  }

  .gsm-dest-strip {
    display:flex; gap:8px; flex-wrap:wrap;
    animation:gsm-fadeUp 0.65s 0.26s ease both;
  }

  .gsm-chip {
    display:flex; align-items:center; gap:5px;
    background:rgba(255,255,255,0.12);
    border:1px solid rgba(255,255,255,0.22);
    border-radius:999px;
    padding:5px 12px;
    font-size:10px; font-weight:500;
    color:rgba(255,255,255,0.88);
    backdrop-filter:blur(4px);
  }

  /* RIGHT */
  .gsm-right {
    flex:1;
    display:flex; align-items:center; justify-content:center;
    padding:32px 24px;
    background:#fff7ed;
  }

  .gsm-card {
    background:#ffffff;
    border-radius:22px;
    padding:42px 38px;
    width:100%; max-width:400px;
    box-sizing:border-box;
    box-shadow:
      0 2px 6px rgba(0,0,0,0.04),
      0 12px 36px rgba(232,66,10,0.10),
      0 32px 64px rgba(232,66,10,0.06);
    position:relative; overflow:hidden;
    animation:gsm-fadeUp 0.75s 0.14s ease both;
  }

  .gsm-card-shimmer {
    position:absolute; top:0; left:-120%;
    width:55%; height:3px;
    background:linear-gradient(90deg,transparent,rgba(255,107,0,0.55),transparent);
    animation:gsm-shimmer 3.2s ease infinite;
  }

  .gsm-eyebrow {
    display:flex; align-items:center; gap:8px;
    font-size:9px; font-weight:600;
    color:#e8420a; letter-spacing:0.18em;
    text-transform:uppercase; margin-bottom:8px;
  }
  .gsm-eyebrow::before {
    content:''; display:inline-block;
    width:16px; height:1.5px;
    background:#e8420a; border-radius:2px;
  }

  .gsm-card-title {
    font-family:'Playfair Display',serif;
    font-size:32px; font-weight:700;
    color:#1a0800; line-height:1.1;
    margin-bottom:4px;
  }

  .gsm-card-title span { color:#e8420a; font-style:italic; }

  .gsm-card-sub {
    font-size:12px; font-weight:300;
    color:#a08060; margin-bottom:28px; line-height:1.5;
  }

  .gsm-err {
    display:flex; align-items:center; gap:8px;
    background:#fff3f0; border:1px solid #ffd0c0;
    border-radius:9px; padding:10px 14px;
    margin-bottom:18px;
    font-size:12px; color:#c0392b;
  }

  .gsm-label {
    font-size:10px; font-weight:600;
    color:#8a7060; letter-spacing:0.08em;
    text-transform:uppercase; display:block; margin-bottom:6px;
  }

  .gsm-field { margin-bottom:16px; }

  .gsm-input-wrap { position:relative; }

  .gsm-input-wrap svg {
    position:absolute; left:13px; top:50%; transform:translateY(-50%);
    width:15px; height:15px; color:#c0a898; pointer-events:none;
  }

  .gsm-input {
    width:100%; box-sizing:border-box;
    padding:12px 13px 12px 40px;
    border:1.5px solid #f0e0d0; border-radius:10px;
    background:#fff9f5;
    font-family:'Plus Jakarta Sans',sans-serif;
    font-size:13px; color:#1a0800; outline:none;
    transition:border-color 0.2s, box-shadow 0.2s, background 0.2s;
  }
  .gsm-input::placeholder { color:#d0b8a8; }
  .gsm-input:focus {
    border-color:#e8420a;
    background:#ffffff;
    box-shadow:0 0 0 4px rgba(232,66,10,0.09);
  }
  .gsm-input.gsm-err-input { border-color:#e05252; background:#fff8f8; }

  .gsm-pw-row {
    display:flex; justify-content:space-between; align-items:center;
    margin-bottom:6px;
  }

  .gsm-forgot {
    font-size:10px; font-weight:500; color:#e8420a;
    background:none; border:none; cursor:pointer; padding:0;
    transition:opacity 0.15s;
  }
  .gsm-forgot:hover { opacity:0.7; }

  .gsm-btn {
    width:100%; padding:13px;
    background:linear-gradient(135deg,#e8420a,#ff6b00,#ff9040);
    color:#fff; border:none; border-radius:11px;
    font-family:'Plus Jakarta Sans',sans-serif;
    font-size:14px; font-weight:600; letter-spacing:0.04em;
    cursor:pointer;
    box-shadow:0 4px 18px rgba(232,66,10,0.32);
    transition:transform 0.15s, box-shadow 0.18s, opacity 0.18s;
    display:flex; align-items:center; justify-content:center; gap:8px;
    margin-top:8px;
  }
  .gsm-btn:hover:not(:disabled) {
    transform:translateY(-1.5px);
    box-shadow:0 8px 28px rgba(232,66,10,0.42);
  }
  .gsm-btn:active:not(:disabled) { transform:translateY(0); }
  .gsm-btn:disabled { opacity:0.62; cursor:not-allowed; }

  .gsm-spinner {
    width:15px; height:15px;
    border:2px solid rgba(255,255,255,0.3);
    border-top-color:#fff; border-radius:50%;
    animation:gsm-spin 0.7s linear infinite;
  }

  .gsm-secure {
    display:flex; align-items:center; justify-content:center; gap:6px;
    margin-top:18px;
    font-size:10px; color:#b09080; letter-spacing:0.04em;
  }
  .gsm-secure svg { width:12px; height:12px; }
  .gsm-sdot {
    width:6px; height:6px; border-radius:50%;
    background:#27ae60;
    animation:gsm-pulse 2.2s ease-out infinite;
  }

  .gsm-footer {
    display:flex; align-items:center; gap:10px;
    margin-top:24px;
  }
  .gsm-fline { flex:1; height:1px; background:#f0e8e0; }
  .gsm-ftext { font-size:10px; color:#c0a898; letter-spacing:0.06em; white-space:nowrap; }
`;

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const el = document.createElement('style');
    el.textContent = styles;
    document.head.appendChild(el);
    return () => document.head.removeChild(el);
  }, []);

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    else navigate('/admin');
    setLoading(false);
  };

  const PlaneIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="rgba(255,255,255,0.9)" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z"/>
    </svg>
  );

  const destinations = ['Goa', 'Manali', 'Rajasthan', 'Kerala', 'Ladakh'];

  return (
    <div className="gsm-root" data-admin="true">

      {/* ── LEFT PANEL ── */}
      <div className="gsm-left">
        <div className="gsm-left-bg" />
        <div className="gsm-orb gsm-orb1" />
        <div className="gsm-orb gsm-orb2" />

        <div className="gsm-plane" style={{ top: 48, left: 36 }}>
          <svg width="56" height="56" viewBox="0 0 24 24" fill="none"
            stroke="rgba(255,255,255,0.5)" strokeWidth="1.2"
            strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z"/>
          </svg>
        </div>
        <div className="gsm-plane" style={{ top: 180, right: 28, animationDelay: '-3s', opacity: 0.3 }}>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none"
            stroke="rgba(255,255,255,0.8)" strokeWidth="1.3"
            strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z"/>
          </svg>
        </div>

        <div className="gsm-overlay" />

        <div className="gsm-left-content">
          <div className="gsm-brand">
            <span className="gsm-brand-pill">GhoomoSasteMe</span>
            <span className="gsm-brand-badge">Admin</span>
          </div>

          <h1 className="gsm-headline">
            India ka<br /><em>safar,</em> aapke<br />haath mein.
          </h1>
          <p className="gsm-sub">
            Manage bookings, tours & travellers<br />
            from your command centre.
          </p>

          <div className="gsm-dest-strip">
            {destinations.map(d => (
              <div className="gsm-chip" key={d}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.2"
                  strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="10" r="3"/>
                  <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 14 8 14s8-8.75 8-14a8 8 0 0 0-8-8z"/>
                </svg>
                {d}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="gsm-right">
        <div className="gsm-card">
          <div className="gsm-card-shimmer" />

          <div className="gsm-eyebrow">Admin Portal</div>
          <h2 className="gsm-card-title">Namaste, <span>boss.</span></h2>
          <p className="gsm-card-sub">Sign in to manage your travel empire</p>

          {error && (
            <div className="gsm-err">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              {error}
            </div>
          )}

          {/* Email */}
          <div className="gsm-field">
            <label className="gsm-label">Email address</label>
            <div className="gsm-input-wrap">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              <input
                className={`gsm-input${error ? ' gsm-err-input' : ''}`}
                type="email"
                placeholder="admin@ghoomosasteme.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>
          </div>

          {/* Password */}
          <div className="gsm-field">
            <div className="gsm-pw-row">
              <label className="gsm-label" style={{ margin: 0 }}>Password</label>
              <button className="gsm-forgot" type="button">Forgot password?</button>
            </div>
            <div className="gsm-input-wrap">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              <input
                className={`gsm-input${error ? ' gsm-err-input' : ''}`}
                type="password"
                placeholder="••••••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
                autoComplete="current-password"
              />
            </div>
          </div>

          <button className="gsm-btn" onClick={handleLogin} disabled={loading}>
            {loading ? (
              <>
                <div className="gsm-spinner" />
                Authenticating…
              </>
            ) : (
              <>
                <PlaneIcon />
                Sign in to Dashboard
              </>
            )}
          </button>

          <div className="gsm-secure">
            <div className="gsm-sdot" />
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            SSL Secured · ghoomosasteme.com
          </div>

          <div className="gsm-footer">
            <div className="gsm-fline" />
            <span className="gsm-ftext">GhoomoSasteMe Admin v2</span>
            <div className="gsm-fline" />
          </div>
        </div>
      </div>
    </div>
  );
}