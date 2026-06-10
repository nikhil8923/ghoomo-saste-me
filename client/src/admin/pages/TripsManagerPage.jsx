import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../supabaseClient';
import { tripsData } from '../../data/trips';

const styles = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,600;0,9..144,700;1,9..144,400;1,9..144,600&family=DM+Sans:wght@300;400;500;600&display=swap');

*, *::before, *::after { box-sizing: border-box; }

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
  --card:        #ffffff;
  --serif:       'Fraunces', Georgia, serif;
  --sans:        'DM Sans', sans-serif;
  --radius:      14px;
  --shadow-sm:   0 1px 6px rgba(26,8,0,0.06);
  --shadow-md:   0 4px 24px rgba(26,8,0,0.10);
  --tr:          0.2s cubic-bezier(0.4,0,0.2,1);
  --red:         #ef4444;
  --green:       #16a34a;
}

@keyframes tm-fadeUp   { from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)} }
@keyframes tm-spin     { to{transform:rotate(360deg)} }
@keyframes tm-pulse    { 0%,100%{opacity:1}50%{opacity:.4} }
@keyframes tm-toast    { from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)} }
@keyframes tm-scaleIn  { from{opacity:0;transform:scale(.96)}to{opacity:1;transform:scale(1)} }

.tm-root {
  min-height:100vh; font-family:var(--sans); background:var(--bg);
  color:var(--ink); overflow-x:hidden;
}

.tm-nav {
  position:sticky; top:0; z-index:50;
  background:rgba(253,248,245,0.94); backdrop-filter:blur(16px);
  border-bottom:1px solid var(--line);
  padding:0 20px; height:56px;
  display:flex; align-items:center; justify-content:space-between;
}
.tm-nav-left { display:flex; align-items:center; gap:10px; }
.tm-nav-logo {
  width:34px; height:34px; border-radius:50%;
  background:linear-gradient(135deg,var(--brand-mid),var(--brand));
  display:flex; align-items:center; justify-content:center;
  color:#fff; font-family:var(--serif); font-weight:700; font-size:13px;
}
.tm-nav-title { font-family:var(--serif); font-size:15px; font-weight:700; color:var(--ink); letter-spacing:-.02em; }
.tm-nav-sub   { font-size:9px; font-weight:500; color:var(--brand); letter-spacing:.1em; text-transform:uppercase; margin-top:1px; }
.tm-count-pill {
  background:var(--brand-light); border:1px solid rgba(232,66,10,.2);
  border-radius:999px; padding:4px 13px; font-size:11px; font-weight:600; color:var(--brand);
}

.tm-hero {
  background:linear-gradient(135deg,#1a0800 0%,#3d1400 45%,#1a0800 100%);
  padding:32px 20px 48px; text-align:center; position:relative; overflow:hidden;
}
.tm-hero::before {
  content:''; position:absolute; inset:0;
  background-image:radial-gradient(circle,rgba(255,255,255,.04) 1px,transparent 1px);
  background-size:28px 28px; pointer-events:none;
}
.tm-hero::after {
  content:''; position:absolute; bottom:-1px; left:0; right:0;
  height:30px; background:var(--bg); clip-path:ellipse(55% 100% at 50% 100%);
}
.tm-hero-eyebrow {
  display:inline-flex; align-items:center; gap:7px;
  background:rgba(255,190,0,.12); border:1px solid rgba(255,190,0,.3);
  border-radius:999px; padding:4px 14px;
  font-size:9px; font-weight:600; color:var(--gold);
  letter-spacing:.14em; text-transform:uppercase;
  margin-bottom:12px; position:relative; z-index:1;
}
.tm-hero-title {
  font-family:var(--serif); font-size:clamp(20px,5vw,38px);
  font-weight:700; color:#fff; line-height:1.12; letter-spacing:-.02em;
  position:relative; z-index:1; margin-bottom:6px;
}
.tm-hero-title em { color:var(--brand-mid); font-style:italic; }
.tm-hero-sub {
  font-size:12px; font-weight:300; color:rgba(255,255,255,.4);
  position:relative; z-index:1; margin:0;
}

.tm-bar {
  display:flex; gap:10px; align-items:center;
  padding:16px 20px; background:var(--bg);
  border-bottom:1px solid var(--line); flex-wrap:wrap;
}
.tm-search-wrap {
  flex:1; min-width:200px; position:relative; display:flex; align-items:center;
}
.tm-search-icon { position:absolute; left:12px; color:var(--muted); width:15px; height:15px; }
.tm-search {
  width:100%; padding:9px 12px 9px 36px;
  border:1.5px solid rgba(232,66,10,.18); border-radius:10px;
  background:#fff; font-family:var(--sans); font-size:13px; color:var(--ink);
  outline:none; transition:border-color var(--tr);
}
.tm-search:focus { border-color:var(--brand); }
.tm-filter-btn {
  padding:9px 16px; border-radius:10px; font-family:var(--sans);
  font-size:12px; font-weight:600; cursor:pointer;
  border:1.5px solid rgba(232,66,10,.2); background:#fff; color:var(--muted);
  transition:all var(--tr); white-space:nowrap;
}
.tm-filter-btn.active { background:var(--brand); color:#fff; border-color:var(--brand); }

.tm-grid {
  display:grid; grid-template-columns:repeat(auto-fill,minmax(280px,1fr));
  gap:16px; padding:20px;
}

.tm-card {
  background:var(--card); border-radius:18px;
  border:1px solid var(--line); box-shadow:var(--shadow-sm);
  overflow:hidden; cursor:pointer;
  transition:box-shadow var(--tr), transform var(--tr), border-color var(--tr);
  animation:tm-fadeUp .35s ease both;
}
.tm-card:hover { box-shadow:var(--shadow-md); transform:translateY(-2px); border-color:rgba(232,66,10,.3); }
.tm-card-img-wrap { position:relative; height:148px; overflow:hidden; }
.tm-card-img { width:100%; height:100%; object-fit:cover; display:block; transition:transform .4s; }
.tm-card:hover .tm-card-img { transform:scale(1.04); }
.tm-card-img-overlay {
  position:absolute; inset:0;
  background:linear-gradient(to top,rgba(26,8,0,.55) 0%,transparent 60%);
  pointer-events:none;
}
.tm-card-duration {
  position:absolute; top:10px; left:10px;
  background:var(--gold); color:var(--ink);
  font-size:9px; font-weight:700; border-radius:999px; padding:3px 9px;
  letter-spacing:.05em; text-transform:uppercase;
}
.tm-card-gallery-count {
  position:absolute; top:10px; right:10px;
  background:rgba(0,0,0,.55); color:#fff;
  font-size:10px; font-weight:600; border-radius:8px;
  padding:3px 8px; display:flex; align-items:center; gap:4px;
}
.tm-card-body { padding:14px; }
.tm-card-location {
  display:flex; align-items:center; gap:4px;
  font-size:10px; color:var(--brand); font-weight:600;
  letter-spacing:.05em; text-transform:uppercase; margin-bottom:4px;
}
.tm-card-title {
  font-family:var(--serif); font-size:15px; font-weight:700;
  color:var(--ink); line-height:1.3; margin-bottom:8px;
  display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;
}
.tm-card-footer {
  display:flex; align-items:center; justify-content:space-between;
  border-top:1px solid var(--line); padding-top:10px; margin-top:4px;
}
.tm-card-price { font-family:var(--serif); font-size:17px; font-weight:700; color:var(--ink); }
.tm-card-price span { font-family:var(--sans); font-size:10px; font-weight:400; color:var(--muted); margin-left:2px; }
.tm-edit-btn {
  display:flex; align-items:center; gap:5px;
  background:var(--brand-light); border:1px solid rgba(232,66,10,.25);
  color:var(--brand); font-size:11px; font-weight:700;
  padding:6px 13px; border-radius:8px; cursor:pointer;
  transition:all var(--tr); white-space:nowrap; font-family:var(--sans);
}
.tm-edit-btn:hover { background:var(--brand); color:#fff; }

.tm-backdrop {
  position:fixed; inset:0; z-index:1000;
  background:rgba(26,8,0,.65); backdrop-filter:blur(6px);
  display:flex; align-items:flex-start; justify-content:center;
  padding:20px 12px; overflow-y:auto;
}

.tm-modal {
  background:var(--bg); border-radius:24px;
  width:100%; max-width:820px;
  box-shadow:0 20px 60px rgba(26,8,0,.22);
  animation:tm-scaleIn .25s ease;
  overflow:hidden; flex-shrink:0;
}
.tm-modal-head {
  background:linear-gradient(135deg,#1a0800,#3d1400);
  padding:22px 24px; display:flex; align-items:flex-start; justify-content:space-between; gap:12px;
}
.tm-modal-head-title { font-family:var(--serif); font-size:20px; font-weight:700; color:#fff; line-height:1.2; }
.tm-modal-head-sub   { font-size:11px; color:rgba(255,255,255,.45); margin-top:3px; }
.tm-modal-close {
  width:32px; height:32px; border-radius:50%;
  background:rgba(255,255,255,.12); border:1px solid rgba(255,255,255,.18);
  color:#fff; font-size:18px; cursor:pointer;
  display:flex; align-items:center; justify-content:center;
  flex-shrink:0; transition:background var(--tr); line-height:1;
  font-family:var(--sans);
}
.tm-modal-close:hover { background:rgba(255,255,255,.22); }

.tm-tabs {
  display:flex; background:var(--card);
  border-bottom:1px solid var(--line); padding:0 20px; gap:2px;
  overflow-x:auto; scrollbar-width:none;
}
.tm-tabs::-webkit-scrollbar { display:none; }
.tm-tab {
  padding:13px 16px; font-size:12px; font-weight:600;
  color:var(--muted); cursor:pointer; border:none; background:none;
  border-bottom:2px solid transparent; font-family:var(--sans);
  transition:all var(--tr); white-space:nowrap;
}
.tm-tab.active { color:var(--brand); border-bottom-color:var(--brand); }
.tm-tab:hover:not(.active) { color:var(--ink); }

.tm-modal-body { padding:22px 24px; }

.tm-sec-hd {
  display:flex; align-items:center; justify-content:space-between;
  margin-bottom:14px;
}
.tm-sec-title {
  font-family:var(--serif); font-size:15px; font-weight:700; color:var(--ink);
}
.tm-sec-sub { font-size:11px; color:var(--muted); margin-top:2px; }
.tm-badge {
  font-size:10px; font-weight:700; background:var(--brand-light);
  color:var(--brand); border:1px solid rgba(232,66,10,.2);
  border-radius:999px; padding:3px 11px;
}
.tm-badge.green { background:#f0fdf4; color:var(--green); border-color:rgba(22,163,74,.2); }

.tm-gal-grid {
  display:grid; grid-template-columns:repeat(auto-fill,minmax(130px,1fr)); gap:10px;
  margin-bottom:16px;
}
.tm-gal-item {
  position:relative; aspect-ratio:4/3; border-radius:12px;
  overflow:hidden; border:2px solid transparent;
  transition:border-color var(--tr);
}
.tm-gal-item:hover { border-color:var(--red); }
.tm-gal-img { width:100%; height:100%; object-fit:cover; display:block; }
.tm-gal-del {
  position:absolute; inset:0; background:rgba(0,0,0,.45);
  display:flex; flex-direction:column; align-items:center; justify-content:center; gap:4px;
  opacity:0; transition:opacity var(--tr);
}
.tm-gal-item:hover .tm-gal-del { opacity:1; }
.tm-gal-del-btn {
  background:var(--red); color:#fff; border:none; border-radius:7px;
  padding:5px 12px; font-size:11px; font-weight:700; cursor:pointer;
  font-family:var(--sans); display:flex; align-items:center; gap:4px;
}
.tm-gal-src-tag {
  position:absolute; bottom:5px; left:5px;
  font-size:8px; font-weight:700; letter-spacing:.06em; text-transform:uppercase;
  border-radius:5px; padding:2px 6px; color:#fff;
}
.tm-gal-src-tag.local    { background:rgba(37,99,235,.8); }
.tm-gal-src-tag.uploaded { background:rgba(15,118,110,.8); }

.tm-add-row {
  display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-top:4px;
}
@media(max-width:540px) { .tm-add-row { grid-template-columns:1fr; } }

.tm-upload-zone {
  border:2px dashed rgba(232,66,10,.25); border-radius:12px;
  padding:24px 16px; text-align:center; cursor:pointer;
  background:var(--brand-light); transition:all var(--tr);
}
.tm-upload-zone:hover { border-color:var(--brand); background:rgba(232,66,10,.08); }
.tm-upload-icon { font-size:22px; margin-bottom:6px; display:block; }
.tm-upload-label { font-size:12px; color:var(--muted); margin:0; }

.tm-url-box { display:flex; flex-direction:column; gap:8px; }
.tm-url-preview { border-radius:10px; overflow:hidden; height:72px; border:1px solid var(--line); }
.tm-url-preview img { width:100%; height:100%; object-fit:cover; display:block; }

.tm-input, .tm-textarea {
  width:100%; padding:10px 13px; border-radius:10px;
  border:1.5px solid rgba(232,66,10,.18); background:#fff;
  font-family:var(--sans); font-size:13px; color:var(--ink); outline:none;
  transition:border-color var(--tr);
}
.tm-input:focus, .tm-textarea:focus { border-color:var(--brand); }
.tm-textarea { resize:vertical; min-height:100px; line-height:1.6; }
.tm-label {
  font-size:10px; font-weight:700; color:var(--muted);
  text-transform:uppercase; letter-spacing:.08em;
  display:block; margin-bottom:5px;
}

.tm-day-list { display:flex; flex-direction:column; gap:12px; }
.tm-day-card {
  background:var(--card); border:1px solid var(--line);
  border-radius:14px; overflow:hidden;
  transition:box-shadow var(--tr);
}
.tm-day-card:hover { box-shadow:var(--shadow-sm); }
.tm-day-head {
  display:flex; align-items:center; gap:10px;
  padding:12px 14px; cursor:pointer; user-select:none;
  background:var(--brand-light);
}
.tm-day-num {
  width:32px; height:32px; border-radius:9px;
  background:var(--brand); color:#fff;
  display:flex; align-items:center; justify-content:center;
  font-size:11px; font-weight:700; flex-shrink:0; font-family:var(--sans);
}
.tm-day-title-text { font-family:var(--serif); font-size:13px; font-weight:600; color:var(--ink); flex:1; }
.tm-day-chevron { color:var(--muted); transition:transform var(--tr); font-size:14px; }
.tm-day-chevron.open { transform:rotate(180deg); }
.tm-day-body { padding:14px; display:flex; flex-direction:column; gap:10px; }

.tm-btn {
  display:inline-flex; align-items:center; gap:6px;
  padding:10px 20px; border-radius:10px; font-family:var(--sans);
  font-size:12px; font-weight:700; cursor:pointer; border:none;
  transition:all var(--tr); white-space:nowrap;
}
.tm-btn.primary   { background:var(--brand); color:#fff; }
.tm-btn.primary:hover { background:var(--brand-deep); }
.tm-btn.secondary { background:var(--brand-light); color:var(--brand); border:1px solid rgba(232,66,10,.25); }
.tm-btn.secondary:hover { background:rgba(232,66,10,.12); }
.tm-btn.danger    { background:#fef2f2; color:var(--red); border:1px solid rgba(239,68,68,.2); }
.tm-btn.danger:hover { background:var(--red); color:#fff; }
.tm-btn:disabled  { opacity:.45; cursor:not-allowed; }

.tm-spin { animation:tm-spin 0.7s linear infinite; }

.tm-empty {
  padding:40px 20px; text-align:center;
  background:var(--card); border-radius:16px;
  border:1.5px dashed rgba(232,66,10,.2);
}
.tm-empty-icon  { font-size:30px; margin-bottom:8px; display:block; }
.tm-empty-title { font-family:var(--serif); font-size:15px; font-weight:600; color:var(--ink); margin-bottom:4px; }
.tm-empty-sub   { font-size:11px; color:var(--muted); }

.tm-save-bar {
  display:flex; align-items:center; justify-content:flex-end; gap:10px;
  padding:14px 24px; background:rgba(253,248,245,.95);
  border-top:1px solid var(--line); backdrop-filter:blur(8px);
  position:sticky; bottom:0;
}
.tm-save-note { font-size:11px; color:var(--muted); flex:1; }

.tm-toast {
  position:fixed; bottom:28px; right:22px; z-index:9999;
  padding:11px 18px; border-radius:12px; font-size:13px; font-weight:600;
  color:#fff; display:flex; align-items:center; gap:8px;
  box-shadow:0 4px 20px rgba(0,0,0,.18); animation:tm-toast .25s ease;
  font-family:var(--sans);
}
.tm-toast.success { background:var(--green); }
.tm-toast.error   { background:var(--red);   }

.tm-chips { display:flex; gap:6px; flex-wrap:wrap; margin-bottom:14px; }
.tm-chip {
  font-size:10px; font-weight:700; padding:3px 10px; border-radius:999px;
  letter-spacing:.05em; text-transform:uppercase;
  background:var(--brand-light); color:var(--brand);
  border:1px solid rgba(232,66,10,.2);
}
.tm-chip.alt { background:#f0f9ff; color:#0369a1; border-color:rgba(3,105,161,.2); }

.tm-no-results {
  text-align:center; padding:48px 20px; color:var(--muted); font-size:14px;
}

/* ── PRICING TAB ── */
.tm-price-grid {
  display:grid; grid-template-columns:repeat(auto-fill,minmax(180px,1fr));
  gap:12px; margin-bottom:20px;
}
.tm-price-card {
  background:var(--card); border:1.5px solid var(--line);
  border-radius:14px; padding:16px;
  transition:border-color var(--tr), box-shadow var(--tr);
}
.tm-price-card:focus-within { border-color:var(--brand); box-shadow:0 0 0 3px rgba(232,66,10,.08); }
.tm-price-card-label {
  font-size:10px; font-weight:700; color:var(--muted);
  text-transform:uppercase; letter-spacing:.08em; margin-bottom:8px;
  display:flex; align-items:center; gap:5px;
}
.tm-price-card-label span { font-size:15px; }
.tm-price-input-wrap { position:relative; display:flex; align-items:center; }
.tm-price-rupee {
  position:absolute; left:11px; font-family:var(--serif);
  font-size:14px; font-weight:700; color:var(--muted); pointer-events:none;
}
.tm-price-input {
  width:100%; padding:9px 10px 9px 26px;
  border:1.5px solid rgba(232,66,10,.18); border-radius:10px;
  background:#fff; font-family:var(--serif); font-size:16px;
  font-weight:700; color:var(--ink); outline:none;
  transition:border-color var(--tr);
}
.tm-price-input:focus { border-color:var(--brand); }
.tm-price-note { font-size:9px; color:var(--muted); margin-top:5px; }
.tm-price-info-box {
  background:var(--brand-light); border:1px solid rgba(232,66,10,.18);
  border-radius:12px; padding:14px 16px; margin-bottom:20px;
  font-size:11px; color:var(--muted); line-height:1.6;
}
.tm-price-info-box strong { color:var(--brand); }
`;

const STORAGE_BUCKET = 'trip-gallery';

const IcoSearch = () => (
  <svg className="tm-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);
const IcoImg = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8.5" cy="8.5" r="1.5"/>
    <polyline points="21 15 16 10 5 21"/>
  </svg>
);
const IcoPlus = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);
const IcoTrash = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/>
  </svg>
);
const IcoChevron = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);
const IcoSave = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/>
  </svg>
);
const IcoSpinner = () => (
  <svg className="tm-spin" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
    <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
  </svg>
);

const CATEGORIES = ['all', 'adventure', 'leisure', 'spiritual', 'weekend', 'backpacking', 'corporate'];

const Toast = ({ msg, type }) => {
  if (!msg) return null;
  return (
    <div className={`tm-toast ${type}`}>
      {type === 'success' ? '✓' : '✕'} {msg}
    </div>
  );
};

const TripCard = ({ trip, dbCount, onEdit, index }) => {
  const price = trip.occupancy?.quad || trip.price;
  const totalImgs = 1 + (trip.gallery?.length || 0) + dbCount;
  return (
    <div className="tm-card" style={{ animationDelay: `${index * 0.04}s` }} onClick={() => onEdit(trip)}>
      <div className="tm-card-img-wrap">
        <img src={trip.image} alt={trip.title} className="tm-card-img" />
        <div className="tm-card-img-overlay" />
        <div className="tm-card-duration">{trip.duration}</div>
        <div className="tm-card-gallery-count"><IcoImg /> {totalImgs}</div>
      </div>
      <div className="tm-card-body">
        <div className="tm-card-location">📍 {trip.location?.split(',')[0] || trip.stateId}</div>
        <div className="tm-card-title">{trip.title}</div>
        <div className="tm-card-footer">
          <div className="tm-card-price">₹{price}<span>/ person</span></div>
          <button className="tm-edit-btn" onClick={e => { e.stopPropagation(); onEdit(trip); }}>✎ Manage</button>
        </div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════
   GALLERY TAB
══════════════════════════════════════════════════════════════ */
const GalleryTab = ({ trip, dbImages, setDbImages, showToast }) => {
  const [urlInput, setUrlInput] = useState('');
  const [preview, setPreview]   = useState('');
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef(null);

  const hardcoded = [
    { id: 'hc-main', src: trip.image, isLocal: true },
    ...(trip.gallery || []).map((g, i) => ({ id: `hc-${i}`, src: g.src || g, isLocal: true })),
  ];
  const allImages = [...hardcoded, ...dbImages];

  const handleDelete = async id => {
    if (id.startsWith('hc-')) { showToast('Hardcoded images must be edited in trips.js', 'error'); return; }
    const { error } = await supabase.from('trip_gallery').delete().eq('id', id);
    if (error) { showToast('Delete failed', 'error'); return; }
    setDbImages(prev => prev.filter(r => r.id !== id));
    showToast('Image removed');
  };

  const handleAddUrl = async () => {
    const url = urlInput.trim(); if (!url) return;
    const { data, error } = await supabase.from('trip_gallery').insert({ trip_id: trip.id, src: url }).select().single();
    if (error) { showToast('Failed to add image', 'error'); return; }
    setDbImages(prev => [...prev, data]);
    setUrlInput(''); setPreview('');
    showToast('Image added ✓');
  };

  const handleFile = async e => {
    const file = e.target.files?.[0]; if (!file) return;
    setUploading(true);
    const ext = file.name.split('.').pop();
    const path = `${trip.id}/${Date.now()}.${ext}`;
    const { error: upErr } = await supabase.storage.from(STORAGE_BUCKET).upload(path, file, { upsert: false });
    if (upErr) { showToast('Upload failed: ' + upErr.message, 'error'); setUploading(false); return; }
    const { data: urlData } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(path);
    const { data, error: dbErr } = await supabase.from('trip_gallery').insert({ trip_id: trip.id, src: urlData.publicUrl }).select().single();
    setUploading(false);
    if (dbErr) { showToast('Uploaded but DB save failed', 'error'); return; }
    setDbImages(prev => [...prev, data]);
    showToast('Image uploaded ✓');
    e.target.value = '';
  };

  return (
    <div>
      <div className="tm-sec-hd" style={{ marginBottom: 12 }}>
        <div>
          <div className="tm-sec-title">All images</div>
          <div className="tm-sec-sub">{allImages.length} total · {dbImages.length} via admin · {hardcoded.length} hardcoded</div>
        </div>
        <span className="tm-badge">{allImages.length} photos</span>
      </div>

      {allImages.length === 0 ? (
        <div className="tm-empty">
          <span className="tm-empty-icon">🖼️</span>
          <div className="tm-empty-title">No images yet</div>
          <p className="tm-empty-sub">Upload from your device or paste a URL below.</p>
        </div>
      ) : (
        <div className="tm-gal-grid">
          {allImages.map(img => (
            <div key={img.id} className="tm-gal-item">
              <img src={img.src} alt="" className="tm-gal-img" onError={e => { e.target.style.opacity = '0.2'; }} />
              <div className="tm-gal-del">
                <button className="tm-gal-del-btn" onClick={() => handleDelete(img.id)}><IcoTrash /> Remove</button>
              </div>
              <span className={`tm-gal-src-tag ${img.isLocal ? 'local' : 'uploaded'}`}>
                {img.isLocal ? 'hardcoded' : 'uploaded'}
              </span>
            </div>
          ))}
        </div>
      )}

      <div style={{ borderTop: '1px solid var(--line)', paddingTop: 16, marginTop: 4 }}>
        <div className="tm-sec-title" style={{ fontSize: 13, marginBottom: 12 }}>Add more images</div>
        <div className="tm-add-row">
          <div>
            <label className="tm-label">Upload from device</label>
            <div className="tm-upload-zone" onClick={() => fileRef.current?.click()}>
              {uploading
                ? <><IcoSpinner /><p className="tm-upload-label" style={{ marginTop: 8 }}>Uploading…</p></>
                : <><span className="tm-upload-icon">📁</span><p className="tm-upload-label">Click to upload JPG / PNG / WEBP</p></>
              }
            </div>
            <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFile} />
          </div>
          <div className="tm-url-box">
            <label className="tm-label">Paste image URL</label>
            <input
              className="tm-input" type="url" placeholder="https://example.com/photo.jpg"
              value={urlInput}
              onChange={e => { setUrlInput(e.target.value); setPreview(e.target.value.trim()); }}
              onKeyDown={e => e.key === 'Enter' && handleAddUrl()}
            />
            {preview && (
              <div className="tm-url-preview">
                <img src={preview} alt="preview" onError={e => e.target.style.opacity = '0.2'} />
              </div>
            )}
            <button className="tm-btn primary" onClick={handleAddUrl} disabled={!urlInput.trim()}>
              <IcoPlus /> Add Image
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════
   ITINERARY TAB
══════════════════════════════════════════════════════════════ */
const ItineraryTab = ({ trip, dbItinerary, setDbItinerary, showToast }) => {
  const [days, setDays]       = useState([]);
  const [openDay, setOpenDay] = useState(0);
  const [saving, setSaving]   = useState(false);
  const [dirty, setDirty]     = useState(false);

  useEffect(() => {
    const base = (trip.itinerary || []).map(d => ({
      day: d.day, title: d.title,
      description: d.description || d.desc || '',
      dbId: null, modified: false,
    }));
    (dbItinerary || []).forEach(row => {
      const idx = base.findIndex(d => d.day === row.day_number);
      if (idx >= 0) {
        base[idx].title = row.title;
        base[idx].description = row.description;
        base[idx].dbId = row.id;
        base[idx].modified = false;
      }
    });
    setDays(base); setDirty(false);
  }, [trip, dbItinerary]);

  const update = (dayIdx, field, value) => {
    setDays(prev => prev.map((d, i) => i === dayIdx ? { ...d, [field]: value, modified: true } : d));
    setDirty(true);
  };

  const saveAll = async () => {
    setSaving(true);
    const modified = days.filter(d => d.modified);
    for (const d of modified) {
      const payload = { trip_id: trip.id, day_number: d.day, title: d.title, description: d.description };
      if (d.dbId) {
        await supabase.from('trip_itinerary').update(payload).eq('id', d.dbId);
      } else {
        const { data } = await supabase.from('trip_itinerary').insert(payload).select().single();
        if (data) {
          setDays(prev => prev.map(x => x.day === d.day ? { ...x, dbId: data.id, modified: false } : x));
          setDbItinerary(prev => [...prev, data]);
        }
      }
    }
    setSaving(false); setDirty(false);
    setDays(prev => prev.map(d => ({ ...d, modified: false })));
    showToast('Itinerary saved ✓');
  };

  const resetDay = async (dayIdx) => {
    const d = days[dayIdx];
    const original = trip.itinerary?.[dayIdx];
    if (!original) return;
    if (d.dbId) {
      await supabase.from('trip_itinerary').delete().eq('id', d.dbId);
      setDbItinerary(prev => prev.filter(r => r.id !== d.dbId));
    }
    setDays(prev => prev.map((x, i) => i === dayIdx ? {
      ...x, title: original.title,
      description: original.description || original.desc || '',
      dbId: null, modified: false,
    } : x));
    showToast('Day reset to original');
  };

  return (
    <div>
      <div className="tm-sec-hd" style={{ marginBottom: 14 }}>
        <div>
          <div className="tm-sec-title">Day-by-day itinerary</div>
          <div className="tm-sec-sub">Changes are saved to Supabase and override hardcoded text on the live site.</div>
        </div>
        {dirty && <span className="tm-badge" style={{ background: '#fffbeb', color: '#b45309', borderColor: 'rgba(180,83,9,.2)' }}>Unsaved changes</span>}
      </div>

      <div className="tm-day-list">
        {days.map((d, i) => (
          <div key={d.day} className="tm-day-card">
            <div className="tm-day-head" onClick={() => setOpenDay(openDay === i ? -1 : i)}>
              <div className="tm-day-num">D{d.day}</div>
              <div className="tm-day-title-text">{d.title}</div>
              {d.dbId && (
                <span style={{ fontSize: 9, fontWeight: 700, background: '#f0fdf4', color: '#16a34a', border: '1px solid rgba(22,163,74,.2)', borderRadius: 999, padding: '2px 8px', marginRight: 6, whiteSpace: 'nowrap' }}>
                  edited
                </span>
              )}
              <span className={`tm-day-chevron ${openDay === i ? 'open' : ''}`}><IcoChevron /></span>
            </div>
            {openDay === i && (
              <div className="tm-day-body">
                <div>
                  <label className="tm-label">Day title</label>
                  <input className="tm-input" value={d.title} onChange={e => update(i, 'title', e.target.value)} placeholder="Day title" />
                </div>
                <div>
                  <label className="tm-label">Description</label>
                  <textarea className="tm-textarea" value={d.description} onChange={e => update(i, 'description', e.target.value)} placeholder="Detailed description…" style={{ minHeight: 120 }} />
                </div>
                {d.dbId && (
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button className="tm-btn danger" style={{ fontSize: 11, padding: '6px 12px' }} onClick={() => resetDay(i)}>↩ Reset to original</button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {days.length === 0 && (
        <div className="tm-empty">
          <span className="tm-empty-icon">🗓️</span>
          <div className="tm-empty-title">No itinerary data</div>
          <p className="tm-empty-sub">This trip doesn't have itinerary days defined in trips.js yet.</p>
        </div>
      )}

      {days.length > 0 && (
        <div className="tm-save-bar" style={{ position: 'static', marginTop: 16, borderRadius: 12 }}>
          <span className="tm-save-note">{dirty ? 'You have unsaved changes.' : 'All changes saved.'}</span>
          <button className="tm-btn primary" onClick={saveAll} disabled={!dirty || saving}>
            {saving ? <><IcoSpinner /> Saving…</> : <><IcoSave /> Save itinerary</>}
          </button>
        </div>
      )}
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════
   DETAILS TAB
══════════════════════════════════════════════════════════════ */
const DetailsTab = ({ trip, showToast }) => {
  const listToText = arr => (arr || []).join('\n');
  const [inclusions, setInclusions] = useState(listToText(trip.inclusions));
  const [exclusions, setExclusions] = useState(listToText(trip.exclusions));
  const [tips, setTips]             = useState(listToText(trip.travelTips));
  const [saving, setSaving]         = useState(false);

  const save = async () => {
    setSaving(true);
    const payload = {
      trip_id:    trip.id,
      inclusions: inclusions.split('\n').map(s => s.trim()).filter(Boolean),
      exclusions: exclusions.split('\n').map(s => s.trim()).filter(Boolean),
      travel_tips: tips.split('\n').map(s => s.trim()).filter(Boolean),
    };
    const { error } = await supabase.from('trip_details').upsert(payload, { onConflict: 'trip_id' });
    setSaving(false);
    if (error) { showToast('Save failed: ' + error.message, 'error'); return; }
    showToast('Details saved ✓');
  };

  const field = (label, value, setter, placeholder) => (
    <div style={{ marginBottom: 16 }}>
      <label className="tm-label">{label} <span style={{ fontWeight: 400, textTransform: 'none', letterSpacing: 0, color: '#b0927a', fontSize: 9 }}>(one per line)</span></label>
      <textarea className="tm-textarea" value={value} onChange={e => setter(e.target.value)} placeholder={placeholder} style={{ minHeight: 90 }} />
    </div>
  );

  return (
    <div>
      <div className="tm-sec-hd" style={{ marginBottom: 14 }}>
        <div>
          <div className="tm-sec-title">Trip details</div>
          <div className="tm-sec-sub">Edits here override hardcoded values on the live site.</div>
        </div>
      </div>
      {field('Inclusions', inclusions, setInclusions, 'AC transport\nMeals included\n...')}
      {field('Exclusions', exclusions, setExclusions, 'Lunches\nPersonal expenses\n...')}
      {field('Travel tips', tips, setTips, 'Carry valid ID\nWear warm clothes\n...')}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 4 }}>
        <button className="tm-btn primary" onClick={save} disabled={saving}>
          {saving ? <><IcoSpinner /> Saving…</> : <><IcoSave /> Save details</>}
        </button>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════
   PRICING TAB
══════════════════════════════════════════════════════════════ */
const PricingTab = ({ trip, showToast }) => {
  // Occupancy tiers — use existing trip data as defaults
  const occ = trip.occupancy || {};
  const [prices, setPrices] = useState({
    single:  String(occ.single  || trip.price || ''),
    double:  String(occ.double  || ''),
    triple:  String(occ.triple  || ''),
    quad:    String(occ.quad    || ''),
    extra:   String(occ.extra   || trip.extraBedPrice || ''),
  });
  const [saving, setSaving] = useState(false);

  const tiers = [
    { key: 'single', label: 'Single',    icon: '👤', note: '1 person / room' },
    { key: 'double', label: 'Double',    icon: '👥', note: '2 persons / room' },
    { key: 'triple', label: 'Triple',    icon: '👨‍👩‍👦', note: '3 persons / room' },
    { key: 'quad',   label: 'Quad',      icon: '👨‍👩‍👧‍👦', note: '4 persons / room' },
    { key: 'extra',  label: 'Extra Bed', icon: '🛏️', note: 'Per extra bed' },
  ];

  const save = async () => {
    setSaving(true);
    // Build occupancy object — only include tiers that have a value
    const occupancy = {};
    tiers.forEach(t => {
      const val = parseInt(prices[t.key]);
      if (!isNaN(val) && val > 0) occupancy[t.key] = val;
    });

    const payload = {
      trip_id:   trip.id,
      occupancy: occupancy,
      // Also save a flat "price" as the quad (most common) or first available tier
      price: occupancy.quad || occupancy.triple || occupancy.double || occupancy.single || null,
    };

    const { error } = await supabase
      .from('trip_pricing')
      .upsert(payload, { onConflict: 'trip_id' });

    setSaving(false);
    if (error) { showToast('Save failed: ' + error.message, 'error'); return; }
    showToast('Prices saved ✓');
  };

  return (
    <div>
      <div className="tm-sec-hd" style={{ marginBottom: 14 }}>
        <div>
          <div className="tm-sec-title">Trip pricing</div>
          <div className="tm-sec-sub">Set per-person prices by occupancy type.</div>
        </div>
      </div>

      <div className="tm-price-info-box">
        <strong>How it works:</strong> Prices saved here are stored in Supabase (<code>trip_pricing</code> table) and override the hardcoded values in <code>trips.js</code> on the live site. Leave a field empty to keep the hardcoded default.
      </div>

      <div className="tm-price-grid">
        {tiers.map(t => (
          <div key={t.key} className="tm-price-card">
            <div className="tm-price-card-label">
              <span>{t.icon}</span> {t.label}
            </div>
            <div className="tm-price-input-wrap">
              <span className="tm-price-rupee">₹</span>
              <input
                className="tm-price-input"
                type="number"
                min="0"
                placeholder="—"
                value={prices[t.key]}
                onChange={e => setPrices(prev => ({ ...prev, [t.key]: e.target.value }))}
              />
            </div>
            <div className="tm-price-note">{t.note}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 4 }}>
        <button className="tm-btn primary" onClick={save} disabled={saving}>
          {saving ? <><IcoSpinner /> Saving…</> : <><IcoSave /> Save prices</>}
        </button>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════
   MODAL
══════════════════════════════════════════════════════════════ */
const TripModal = ({ trip, onClose, showToast }) => {
  const [activeTab, setActiveTab]     = useState('gallery');
  const [dbImages, setDbImages]       = useState([]);
  const [dbItinerary, setDbItinerary] = useState([]);
  const [loading, setLoading]         = useState(true);

  useEffect(() => {
    if (!trip) return;
    (async () => {
      setLoading(true);
      const [gal, itin] = await Promise.all([
        supabase.from('trip_gallery').select('*').eq('trip_id', trip.id).order('created_at'),
        supabase.from('trip_itinerary').select('*').eq('trip_id', trip.id).order('day_number'),
      ]);
      setDbImages(gal.data || []);
      setDbItinerary(itin.data || []);
      setLoading(false);
    })();
  }, [trip]);

  if (!trip) return null;

  const tabs = [
    { id: 'gallery',   label: '🖼️  Gallery'   },
    { id: 'itinerary', label: '🗓️  Itinerary' },
    { id: 'details',   label: '📋  Details'   },
    { id: 'pricing',   label: '💰  Pricing'   },
  ];

  return (
    <div className="tm-backdrop" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="tm-modal">
        <div className="tm-modal-head">
          <div>
            <div className="tm-modal-head-title">{trip.title}</div>
            <div className="tm-modal-head-sub">{trip.location} · {trip.duration}</div>
          </div>
          <button className="tm-modal-close" onClick={onClose}>×</button>
        </div>

        <div className="tm-tabs">
          {tabs.map(t => (
            <button key={t.id} className={`tm-tab ${activeTab === t.id ? 'active' : ''}`}
              onClick={() => setActiveTab(t.id)}>
              {t.label}
            </button>
          ))}
        </div>

        <div className="tm-modal-body">
          {loading ? (
            <div style={{ textAlign: 'center', padding: '48px 0', color: 'var(--muted)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
              <IcoSpinner /> Loading data…
            </div>
          ) : (
            <>
              {activeTab === 'gallery'   && <GalleryTab   trip={trip} dbImages={dbImages}       setDbImages={setDbImages}         showToast={showToast} />}
              {activeTab === 'itinerary' && <ItineraryTab trip={trip} dbItinerary={dbItinerary} setDbItinerary={setDbItinerary}   showToast={showToast} />}
              {activeTab === 'details'   && <DetailsTab   trip={trip} showToast={showToast} />}
              {activeTab === 'pricing'   && <PricingTab   trip={trip} showToast={showToast} />}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════════════════════ */
export default function TripsManagerPage() {
  const [search,   setSearch]   = useState('');
  const [category, setCategory] = useState('all');
  const [editTrip, setEditTrip] = useState(null);
  const [dbCounts, setDbCounts] = useState({});
  const [toast,    setToast]    = useState({ msg: '', type: 'success' });

  useEffect(() => {
    const el = document.createElement('style');
    el.textContent = styles;
    document.head.appendChild(el);
    return () => document.head.removeChild(el);
  }, []);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from('trip_gallery').select('trip_id');
      if (!data) return;
      const counts = {};
      data.forEach(r => { counts[r.trip_id] = (counts[r.trip_id] || 0) + 1; });
      setDbCounts(counts);
    })();
  }, []);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast({ msg: '', type: 'success' }), 3000);
  };

  const filtered = tripsData.filter(t => {
    const matchSearch = !search ||
      t.title?.toLowerCase().includes(search.toLowerCase()) ||
      t.location?.toLowerCase().includes(search.toLowerCase()) ||
      t.stateId?.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === 'all' || t.category === category || t.stateId === category;
    return matchSearch && matchCat;
  });

  return (
    <div className="tm-root">
      <nav className="tm-nav">
        <div className="tm-nav-left">
          <div className="tm-nav-logo">G</div>
          <div>
            <div className="tm-nav-title">Trips Manager</div>
            <div className="tm-nav-sub">GhoomoSasteMe · Admin</div>
          </div>
        </div>
        <span className="tm-count-pill">{tripsData.length} trips</span>
      </nav>

      <div className="tm-hero">
        <div className="tm-hero-eyebrow">✦ &nbsp;Content Management</div>
        <h1 className="tm-hero-title">Manage <em>your trips</em></h1>
        <p className="tm-hero-sub">Add gallery images, edit itinerary days, update details and prices — all from here.</p>
      </div>

      <div className="tm-bar">
        <div className="tm-search-wrap">
          <IcoSearch />
          <input
            className="tm-search"
            placeholder="Search by name, location or state…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {CATEGORIES.map(c => (
            <button key={c} className={`tm-filter-btn ${category === c ? 'active' : ''}`}
              onClick={() => setCategory(c)}>
              {c.charAt(0).toUpperCase() + c.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="tm-no-results">
          <span style={{ fontSize: 28, display: 'block', marginBottom: 8 }}>🔍</span>
          No trips match "{search}"
        </div>
      ) : (
        <div className="tm-grid">
          {filtered.map((trip, i) => (
            <TripCard key={trip.id} trip={trip} dbCount={dbCounts[trip.id] || 0} onEdit={setEditTrip} index={i} />
          ))}
        </div>
      )}

      {editTrip && (
        <TripModal trip={editTrip} onClose={() => setEditTrip(null)} showToast={showToast} />
      )}

      <Toast msg={toast.msg} type={toast.type} />
    </div>
  );
}