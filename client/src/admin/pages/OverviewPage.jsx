import React, { useState, useEffect } from 'react';
import { getBlogs, getGallery, getDestinations } from '../adminApi';

const styles = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,600;0,9..144,700;1,9..144,400;1,9..144,600&family=DM+Sans:wght@300;400;500;600&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --brand:       #E8420A;
  --brand-deep:  #b22800;
  --brand-light: #fff3ed;
  --brand-mid:   #ff6b00;
  --gold:        #FFBE00;
  --ink:         #1a0800;
  --muted:       #7a5c4a;
  --line:        rgba(232,66,10,0.12);
  --bg:          #fdf8f5;
  --card-bg:     #ffffff;
  --serif:       'Fraunces', Georgia, serif;
  --sans:        'DM Sans', sans-serif;
  --radius:      14px;
  --shadow-sm:   0 1px 6px rgba(26,8,0,0.06);
  --shadow-md:   0 4px 24px rgba(26,8,0,0.09);
  --transition:  0.22s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes fade-up   { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
@keyframes shimmer   { 0%{left:-100%} 100%{left:200%} }
@keyframes spin      { to { transform: rotate(360deg); } }
@keyframes pulse-dot { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.5);opacity:0.7} }
@keyframes count-up  { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }

.ov-root {
  min-height: 100vh;
  font-family: var(--sans);
  background: var(--bg);
  color: var(--ink);
  overflow-x: hidden;
}

/* ── NAV ── */
.ov-nav {
  position: sticky; top: 0; z-index: 100;
  background: rgba(253,248,245,0.93);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--line);
  padding: 0 20px;
  height: 56px;
  display: flex; align-items: center; justify-content: space-between;
}
.ov-nav-brand { display: flex; align-items: center; gap: 10px; }
.ov-nav-logo {
  width: 36px; height: 36px; border-radius: 50%;
  background: linear-gradient(135deg, var(--brand-mid), var(--brand));
  display: flex; align-items: center; justify-content: center;
  color: #fff; font-family: var(--serif); font-weight: 700; font-size: 14px;
  flex-shrink: 0;
}
.ov-nav-name { font-family: var(--serif); font-weight: 700; font-size: 15px; color: var(--ink); letter-spacing: -0.02em; line-height: 1; }
.ov-nav-sub  { font-size: 9px; font-weight: 500; color: var(--brand); letter-spacing: 0.1em; text-transform: uppercase; margin-top: 1px; }
.ov-live-badge {
  display: flex; align-items: center; gap: 5px;
  background: rgba(39,174,96,0.08); border: 1px solid rgba(39,174,96,0.25);
  border-radius: 999px; padding: 4px 12px;
  font-size: 11px; font-weight: 600; color: #1a6b3c;
}
.ov-live-dot {
  width: 6px; height: 6px; border-radius: 50%; background: #27ae60;
  animation: pulse-dot 2.2s ease-out infinite;
}

/* ── HERO ── */
.ov-hero {
  background: linear-gradient(135deg, #1a0800 0%, #3d1400 45%, #1a0800 100%);
  padding: 36px 20px 52px; text-align: center;
  position: relative; overflow: hidden;
}
.ov-hero::before {
  content:''; position:absolute; inset:0;
  background-image: radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px);
  background-size: 28px 28px; pointer-events:none;
}
.ov-hero::after {
  content:''; position:absolute; bottom:-1px; left:0; right:0;
  height:32px; background: var(--bg);
  clip-path: ellipse(55% 100% at 50% 100%);
}
.ov-hero-eyebrow {
  display: inline-flex; align-items: center; gap: 7px;
  background: rgba(255,190,0,0.12); border: 1px solid rgba(255,190,0,0.3);
  border-radius: 999px; padding: 4px 14px;
  font-size: 9px; font-weight: 600; color: var(--gold);
  letter-spacing: 0.14em; text-transform: uppercase;
  margin-bottom: 14px; position: relative; z-index: 1;
}
.ov-hero-greeting {
  font-size: 11px; font-weight: 400; color: rgba(255,255,255,0.38);
  letter-spacing: 0.07em; text-transform: uppercase;
  margin-bottom: 7px; position: relative; z-index: 1;
}
.ov-hero-title {
  font-family: var(--serif);
  font-size: clamp(22px, 5.5vw, 42px);
  font-weight: 700; color: #fff; line-height: 1.12; letter-spacing: -0.02em;
  position: relative; z-index: 1; margin-bottom: 8px;
}
.ov-hero-title em { color: var(--brand-mid); font-style: italic; }
.ov-hero-desc {
  font-size: 12px; font-weight: 300; color: rgba(255,255,255,0.42);
  max-width: 340px; margin: 0 auto 28px; line-height: 1.7;
  position: relative; z-index: 1;
}

/* STAT STRIP */
.ov-stat-strip {
  display: flex; justify-content: center;
  position: relative; z-index: 1;
  max-width: 500px; margin: 0 auto;
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 14px; overflow: hidden;
}
.ov-stat-item {
  flex: 1; padding: 16px 8px;
  border-right: 1px solid rgba(255,255,255,0.07);
  animation: count-up 0.6s ease both;
}
.ov-stat-item:last-child { border-right: none; }
.ov-stat-num {
  font-family: var(--serif);
  font-size: clamp(24px, 5vw, 32px);
  font-weight: 700; line-height: 1; margin-bottom: 3px;
}
.ov-stat-item.s-orange .ov-stat-num { color: var(--brand-mid); }
.ov-stat-item.s-gold   .ov-stat-num { color: var(--gold); }
.ov-stat-item.s-blue   .ov-stat-num { color: #60b0ff; }
.ov-stat-label {
  font-size: 9px; color: rgba(255,255,255,0.35);
  letter-spacing: 0.1em; text-transform: uppercase;
}
.ov-stat-trend {
  font-size: 9px; color: #27ae60; margin-top: 4px;
  display: flex; align-items: center; justify-content: center; gap: 3px;
}

/* ── MOBILE STAT CARDS (shown only on mobile, below hero) ── */
.ov-mobile-stats {
  display: none;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  padding: 16px 16px 0;
}
@media (max-width: 640px) {
  .ov-mobile-stats { display: grid; }
}
.ov-mob-stat {
  background: var(--card-bg); border-radius: 12px;
  border: 0.5px solid var(--line); padding: 14px 12px;
  text-align: center; box-shadow: var(--shadow-sm);
  animation: fade-up 0.4s ease both;
}
.ov-mob-stat-icon { font-size: 20px; margin-bottom: 6px; display: block; }
.ov-mob-stat-num {
  font-family: var(--serif); font-size: 26px; font-weight: 700;
  color: var(--ink); line-height: 1; margin-bottom: 3px;
}
.ov-mob-stat-label { font-size: 9px; color: var(--muted); letter-spacing: 0.08em; text-transform: uppercase; }

/* ── LAYOUT ── */
.ov-layout {
  max-width: 1100px; margin: 0 auto;
  padding: 24px 16px 60px;
  display: grid; grid-template-columns: 1fr 300px;
  gap: 24px; align-items: start;
}
@media (max-width: 860px) {
  .ov-layout { grid-template-columns: 1fr; padding: 20px 12px 60px; }
  .ov-sidebar-desktop { display: none; }
}

/* ── SECTION LABEL ── */
.ov-section-label {
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 14px;
}
.ov-section-title {
  font-family: var(--serif); font-size: 17px; font-weight: 600;
  color: var(--ink); letter-spacing: -0.02em;
}
.ov-section-count {
  background: var(--brand-light); border: 1px solid rgba(232,66,10,0.2);
  border-radius: 999px; padding: 2px 11px;
  font-size: 10px; font-weight: 600; color: var(--brand);
}

/* ── BLOG CARDS ── */
.ov-blog-list { display: flex; flex-direction: column; gap: 10px; }
.ov-blog-card {
  background: var(--card-bg); border-radius: var(--radius);
  border: 0.5px solid var(--line); overflow: hidden;
  box-shadow: var(--shadow-sm); display: flex;
  transition: box-shadow var(--transition), border-color var(--transition), transform var(--transition);
  animation: fade-up 0.45s ease both;
}
.ov-blog-card:hover { box-shadow: var(--shadow-md); border-color: rgba(232,66,10,0.25); transform: translateY(-1px); }
.ov-blog-index {
  width: 44px; flex-shrink: 0;
  background: linear-gradient(180deg, var(--brand-light), #fff8f4);
  display: flex; align-items: center; justify-content: center;
  border-right: 0.5px solid var(--line);
}
.ov-blog-index-num {
  font-family: var(--serif); font-size: 15px; font-weight: 700;
  color: var(--brand); opacity: 0.5;
}
.ov-blog-body { flex: 1; padding: 12px 14px; min-width: 0; }
.ov-blog-title {
  font-family: var(--serif); font-size: 13px; font-weight: 600;
  color: var(--ink); line-height: 1.35; letter-spacing: -0.01em;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  margin-bottom: 5px;
}
.ov-blog-meta { display: flex; align-items: center; gap: 7px; flex-wrap: wrap; }
.ov-blog-date { font-size: 10px; color: var(--muted); }
.ov-blog-sep  { width: 3px; height: 3px; border-radius: 50%; background: var(--muted); opacity: 0.35; flex-shrink: 0; }
.ov-blog-pill {
  font-size: 9px; font-weight: 700; padding: 2px 7px;
  border-radius: 999px; background: rgba(39,174,96,0.1);
  color: #1a6b3c; border: 1px solid rgba(39,174,96,0.2);
  letter-spacing: 0.06em; text-transform: uppercase;
}
.ov-blog-img-wrap { width: 76px; flex-shrink: 0; overflow: hidden; }
.ov-blog-img      { width: 100%; height: 100%; object-fit: cover; display: block; }
.ov-blog-img-ph {
  width: 100%; height: 100%; min-height: 68px;
  background: linear-gradient(135deg, #fff0e6, #ffddc4);
  display: flex; align-items: center; justify-content: center; font-size: 20px;
}

/* hide thumbnail on very small screens so title has room */
@media (max-width: 400px) {
  .ov-blog-img-wrap { display: none; }
}

/* ── GALLERY STRIP ── */
.ov-gallery-strip {
  display: flex; gap: 8px;
  overflow-x: auto; padding-bottom: 6px;
  -webkit-overflow-scrolling: touch; scrollbar-width: none;
}
.ov-gallery-strip::-webkit-scrollbar { display: none; }
.ov-gallery-thumb {
  width: 80px; height: 80px; flex-shrink: 0;
  border-radius: 10px; overflow: hidden; border: 0.5px solid var(--line);
}
.ov-gallery-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }
.ov-gallery-thumb-ph {
  width: 100%; height: 100%;
  background: linear-gradient(135deg, #fff0e6, #ffddc4);
  display: flex; align-items: center; justify-content: center; font-size: 22px;
}

/* ── DEST CARDS ── */
.ov-dest-list { display: flex; flex-direction: column; gap: 8px; }
.ov-dest-card {
  background: var(--card-bg); border-radius: var(--radius);
  border: 0.5px solid var(--line); box-shadow: var(--shadow-sm);
  display: flex; align-items: center; justify-content: space-between;
  padding: 12px 16px;
  animation: fade-up 0.45s ease both;
  transition: box-shadow var(--transition), transform var(--transition);
}
.ov-dest-card:hover { box-shadow: var(--shadow-md); transform: translateY(-1px); }
.ov-dest-left { display: flex; align-items: center; gap: 11px; }
.ov-dest-pin {
  width: 34px; height: 34px; border-radius: 9px;
  background: var(--brand-light); border: 1px solid rgba(232,66,10,0.15);
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.ov-dest-name { font-family: var(--serif); font-size: 13px; font-weight: 600; color: var(--ink); }
.ov-dest-sub  { font-size: 10px; color: var(--muted); margin-top: 1px; }
.ov-dest-badge {
  font-size: 10px; font-weight: 600; color: #0f6e56;
  background: #e1f5ee; border-radius: 999px; padding: 3px 11px;
  border: 1px solid rgba(15,110,86,0.15); white-space: nowrap;
}

/* ── MOBILE DEST CHIPS (replaces sidebar section on mobile) ── */
.ov-mobile-dest-chips {
  display: none;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}
@media (max-width: 640px) {
  .ov-mobile-dest-chips { display: grid; }
}
.ov-dest-chip {
  display: flex; flex-direction: column; align-items: center; gap: 4px;
  background: var(--brand-light); border: 1px solid rgba(232,66,10,0.15);
  border-radius: 10px; padding: 10px 8px;
  font-size: 11px; font-weight: 500; color: var(--ink);
  transition: background var(--transition), border-color var(--transition);
}
.ov-dest-chip:hover { background: rgba(232,66,10,0.1); border-color: var(--brand); }
.ov-dest-chip-icon { font-size: 18px; }

/* ── SIDEBAR ── */
.ov-sidebar { display: flex; flex-direction: column; gap: 18px; }
.ov-sb-card {
  background: var(--card-bg); border: 0.5px solid var(--line);
  border-radius: 16px; padding: 18px; box-shadow: var(--shadow-sm);
  position: relative; overflow: hidden;
}
.ov-sb-shimmer {
  position: absolute; top: 0; left: -100%; width: 50%; height: 2px;
  background: linear-gradient(90deg, transparent, var(--brand-mid), transparent);
  animation: shimmer 3s ease infinite;
}
.ov-sb-title {
  font-family: var(--serif); font-size: 14px; font-weight: 700;
  color: var(--ink); margin-bottom: 14px;
}
.ov-sb-title em { color: var(--brand); font-style: italic; }
.ov-sb-stat-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 9px; }
.ov-sb-stat {
  background: var(--bg); border-radius: 11px; padding: 13px 10px;
  border: 0.5px solid var(--line); text-align: center;
  transition: transform var(--transition);
}
.ov-sb-stat:hover { transform: translateY(-2px); }
.ov-sb-stat-icon { font-size: 18px; margin-bottom: 5px; display: block; }
.ov-sb-stat-num {
  font-family: var(--serif); font-size: 22px; font-weight: 700;
  color: var(--ink); line-height: 1; margin-bottom: 3px;
}
.ov-sb-stat-label { font-size: 9px; color: var(--muted); letter-spacing: 0.08em; text-transform: uppercase; }
.ov-sb-dest-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 7px; }
.ov-sb-dest-chip {
  display: flex; align-items: center; gap: 6px;
  background: var(--brand-light); border: 1px solid rgba(232,66,10,0.15);
  border-radius: 9px; padding: 8px 9px;
  font-size: 11px; font-weight: 500; color: var(--ink);
  transition: background var(--transition), border-color var(--transition);
}
.ov-sb-dest-chip:hover { background: rgba(232,66,10,0.1); border-color: var(--brand); }

/* ── LOADING ── */
.ov-loading {
  display: flex; flex-direction: column; align-items: center;
  justify-content: center; min-height: 300px; gap: 14px;
}
.ov-spinner {
  width: 30px; height: 30px; border: 2px solid rgba(232,66,10,0.15);
  border-top-color: var(--brand); border-radius: 50%;
  animation: spin 0.7s linear infinite;
}
.ov-loading-text { font-size: 12px; color: var(--muted); font-weight: 300; }

/* ── EMPTY ── */
.ov-empty {
  background: var(--card-bg); border-radius: 18px;
  border: 1.5px dashed rgba(232,66,10,0.2); padding: 40px 20px; text-align: center;
}
.ov-empty-icon  { font-size: 32px; margin-bottom: 8px; }
.ov-empty-title { font-family: var(--serif); font-size: 15px; font-weight: 600; color: var(--ink); margin-bottom: 4px; }
.ov-empty-sub   { font-size: 11px; color: var(--muted); font-weight: 300; }

/* ── SECURE FOOTER ── */
.ov-secure {
  display: flex; align-items: center; justify-content: center;
  gap: 6px; padding: 24px 0 12px;
  font-size: 10px; color: var(--muted); letter-spacing: 0.04em;
}
.ov-sdot { width: 6px; height: 6px; border-radius: 50%; background: #27ae60; animation: pulse-dot 2.4s ease-out infinite; }
`;

/* ── Icons ── */
const IcoTrend = () => (
  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
    <polyline points="17 6 23 6 23 12"/>
  </svg>
);
const IcoPin = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#e8420a"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="10" r="3"/>
    <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 14 8 14s8-8.75 8-14a8 8 0 0 0-8-8z"/>
  </svg>
);
const IcoLock = () => (
  <svg style={{ width: 11, height: 11 }} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

const destinations = [
  { label: 'Goa',       icon: '🌴', sub: 'Maharashtra coast' },
  { label: 'Manali',    icon: '🏔️', sub: 'Himachal Pradesh'  },
  { label: 'Jaipur',    icon: '🏯', sub: 'Rajasthan'          },
  { label: 'Munnar',    icon: '🌿', sub: 'Kerala'             },
  { label: 'Leh',       icon: '❄️', sub: 'Ladakh'             },
];

const sidebarDestinations = [
  { label: 'Goa',       icon: '🌴' },
  { label: 'Manali',    icon: '🏔️' },
  { label: 'Rajasthan', icon: '🏯' },
  { label: 'Kerala',    icon: '🌿' },
  { label: 'Ladakh',    icon: '❄️' },
  { label: 'Spiti',     icon: '🗻' },
];

const greeting = () => {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
};

const fmtDate = (iso) =>
  new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

export default function OverviewPage() {
  const [stats, setStats]           = useState({ blogs: 0, gallery: 0, destinations: 0 });
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading]       = useState(true);

  useEffect(() => {
    const el = document.createElement('style');
    el.textContent = styles;
    document.head.appendChild(el);
    return () => document.head.removeChild(el);
  }, []);

  useEffect(() => {
    (async () => {
      const [b, g, d] = await Promise.all([getBlogs(), getGallery(), getDestinations()]);
      setStats({
        blogs:        b.data?.length || 0,
        gallery:      g.data?.length || 0,
        destinations: d.data?.length || 0,
      });
      setRecentBlogs((b.data || []).slice(0, 5));
      setGalleryItems((g.data || []).slice(0, 8));
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return (
      <div className="ov-root">
        <div className="ov-loading">
          <div className="ov-spinner" />
          <span className="ov-loading-text">Loading dashboard…</span>
        </div>
      </div>
    );
  }

  return (
    <div className="ov-root">

      {/* ── NAV ── */}
      <nav className="ov-nav">
        <div className="ov-nav-brand">
          <div className="ov-nav-logo">G</div>
          <div>
            <div className="ov-nav-name">GhoomoSasteMe</div>
            <div className="ov-nav-sub">Admin Dashboard</div>
          </div>
        </div>
        <div className="ov-live-badge">
          <div className="ov-live-dot" />
          Live
        </div>
      </nav>

      {/* ── HERO ── */}
      <div className="ov-hero">
        <div className="ov-hero-eyebrow">✦ &nbsp;Dashboard Overview</div>
        <div className="ov-hero-greeting">{greeting()}, Admin</div>
        <h1 className="ov-hero-title">
          Here's what's happening<br />
          <em>on GhoomoSasteMe</em>
        </h1>
        <p className="ov-hero-desc">A live snapshot of your content, gallery &amp; destinations.</p>

        <div className="ov-stat-strip">
          <div className="ov-stat-item s-orange" style={{ animationDelay: '0.1s' }}>
            <div className="ov-stat-num">{stats.blogs}</div>
            <div className="ov-stat-label">Blogs</div>
            <div className="ov-stat-trend"><IcoTrend /> +3 this week</div>
          </div>
          <div className="ov-stat-item s-gold" style={{ animationDelay: '0.2s' }}>
            <div className="ov-stat-num">{stats.gallery}</div>
            <div className="ov-stat-label">Gallery</div>
            <div className="ov-stat-trend"><IcoTrend /> +12 this week</div>
          </div>
          <div className="ov-stat-item s-blue" style={{ animationDelay: '0.3s' }}>
            <div className="ov-stat-num">{stats.destinations}</div>
            <div className="ov-stat-label">Destinations</div>
            <div className="ov-stat-trend"><IcoTrend /> +2 this month</div>
          </div>
        </div>
      </div>

      {/* ── MOBILE STAT CARDS (visible only ≤640px) ── */}
      <div className="ov-mobile-stats">
        {[
          { icon: '📝', num: stats.blogs,        label: 'Blogs',        delay: '0.05s' },
          { icon: '🖼️', num: stats.gallery,      label: 'Gallery',      delay: '0.10s' },
          { icon: '📍', num: stats.destinations, label: 'Destinations', delay: '0.15s' },
          { icon: '✈️', num: '50+',              label: 'Trips covered', delay: '0.20s' },
        ].map(s => (
          <div key={s.label} className="ov-mob-stat" style={{ animationDelay: s.delay }}>
            <span className="ov-mob-stat-icon">{s.icon}</span>
            <div className="ov-mob-stat-num">{s.num}</div>
            <div className="ov-mob-stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── LAYOUT ── */}
      <div className="ov-layout">

        {/* MAIN COLUMN */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

          {/* RECENT BLOGS */}
          <div>
            <div className="ov-section-label">
              <span className="ov-section-title">Recent blogs</span>
              <span className="ov-section-count">{stats.blogs} total</span>
            </div>

            {recentBlogs.length === 0 ? (
              <div className="ov-empty">
                <div className="ov-empty-icon">✈️</div>
                <div className="ov-empty-title">No blogs published yet</div>
                <p className="ov-empty-sub">Head to the Blogs section to publish your first story.</p>
              </div>
            ) : (
              <div className="ov-blog-list">
                {recentBlogs.map((b, i) => (
                  <div key={b.id} className="ov-blog-card" style={{ animationDelay: `${i * 0.06}s` }}>
                    <div className="ov-blog-index">
                      <span className="ov-blog-index-num">{String(i + 1).padStart(2, '0')}</span>
                    </div>
                    <div className="ov-blog-body">
                      <div className="ov-blog-title">{b.title}</div>
                      <div className="ov-blog-meta">
                        <span className="ov-blog-date">{fmtDate(b.created_at)}</span>
                        <span className="ov-blog-sep" />
                        <span className="ov-blog-pill">Published</span>
                      </div>
                    </div>
                    <div className="ov-blog-img-wrap">
                      {b.image_url
                        ? <img src={b.image_url} alt={b.title} className="ov-blog-img"
                            onError={e => { e.target.style.display = 'none'; }} />
                        : <div className="ov-blog-img-ph">✈️</div>
                      }
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* GALLERY PREVIEW */}
          {galleryItems.length > 0 && (
            <div>
              <div className="ov-section-label">
                <span className="ov-section-title">Gallery preview</span>
                <span className="ov-section-count">{stats.gallery} photos</span>
              </div>
              <div className="ov-gallery-strip">
                {galleryItems.map((g, i) => (
                  <div key={g.id || i} className="ov-gallery-thumb">
                    {g.image_url
                      ? <img src={g.image_url} alt=""
                          onError={e => { e.target.style.display = 'none'; }} />
                      : <div className="ov-gallery-thumb-ph">🖼️</div>
                    }
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TOP DESTINATIONS */}
          <div>
            <div className="ov-section-label">
              <span className="ov-section-title">Top destinations</span>
              <span className="ov-section-count">{stats.destinations} total</span>
            </div>
            <div className="ov-dest-list">
              {destinations.map((d, i) => (
                <div key={d.label} className="ov-dest-card" style={{ animationDelay: `${i * 0.07}s` }}>
                  <div className="ov-dest-left">
                    <div className="ov-dest-pin"><IcoPin /></div>
                    <div>
                      <div className="ov-dest-name">{d.label}</div>
                      <div className="ov-dest-sub">{d.sub}</div>
                    </div>
                  </div>
                  <span className="ov-dest-badge">{38 - i * 5} tours</span>
                </div>
              ))}
            </div>
          </div>

          {/* MOBILE DEST CHIPS (sidebar content surfaced on mobile) */}
          <div>
            <div className="ov-section-label">
              <span className="ov-section-title" style={{ fontSize: '15px' }}>Browse destinations</span>
            </div>
            <div className="ov-mobile-dest-chips">
              {sidebarDestinations.map(d => (
                <div key={d.label} className="ov-dest-chip">
                  <span className="ov-dest-chip-icon">{d.icon}</span>
                  {d.label}
                </div>
              ))}
            </div>
          </div>

          <div className="ov-secure">
            <div className="ov-sdot" />
            <IcoLock />
            SSL Secured · ghoomosasteme.com
          </div>
        </div>

        {/* ── SIDEBAR (desktop only) ── */}
        <aside className="ov-sidebar ov-sidebar-desktop">

          <div className="ov-sb-card">
            <div className="ov-sb-shimmer" />
            <div className="ov-sb-title">Content <em>at a glance</em></div>
            <div className="ov-sb-stat-grid">
              {[
                { icon: '📝', num: stats.blogs,        label: 'Blogs'        },
                { icon: '🖼️', num: stats.gallery,      label: 'Gallery'      },
                { icon: '📍', num: stats.destinations, label: 'Destinations' },
                { icon: '✈️', num: '50+',              label: 'Trips covered' },
              ].map(s => (
                <div key={s.label} className="ov-sb-stat">
                  <span className="ov-sb-stat-icon">{s.icon}</span>
                  <div className="ov-sb-stat-num">{s.num}</div>
                  <div className="ov-sb-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="ov-sb-card">
            <div className="ov-sb-title">Browse <em>destinations</em></div>
            <div className="ov-sb-dest-grid">
              {sidebarDestinations.map(d => (
                <div key={d.label} className="ov-sb-dest-chip">
                  <span>{d.icon}</span>{d.label}
                </div>
              ))}
            </div>
          </div>

        </aside>
      </div>
    </div>
  );
}