import React, { useEffect, useState, useRef } from 'react';
import { supabase } from '../supabaseClient';

const CSS = `
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
  --white:       #ffffff;
  --bg:          #fdf8f5;
  --card-bg:     #ffffff;
  --serif:       'Fraunces', Georgia, serif;
  --sans:        'DM Sans', sans-serif;
  --radius:      14px;
  --shadow-sm:   0 1px 6px rgba(26,8,0,0.06);
  --shadow-md:   0 4px 24px rgba(26,8,0,0.09);
  --shadow-lg:   0 12px 48px rgba(26,8,0,0.13);
  --transition:  0.22s cubic-bezier(0.4, 0, 0.2, 1);
}

body { background: var(--bg); }

@keyframes fade-up   { from { opacity:0; transform:translateY(22px); } to { opacity:1; transform:translateY(0); } }
@keyframes shimmer   { 0%{left:-100%} 100%{left:200%} }
@keyframes spin      { to { transform: rotate(360deg); } }
@keyframes pulse-dot { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.5);opacity:0.7} }
@keyframes modal-in  { from { opacity:0; transform:scale(0.94) translateY(10px); } to { opacity:1; transform:scale(1) translateY(0); } }

.gsm-root {
  min-height: 100vh;
  font-family: var(--sans);
  background: var(--bg);
  color: var(--ink);
  overflow-x: hidden;
}

/* NAV */
.gsm-nav {
  position: sticky; top: 0; z-index: 100;
  background: rgba(253,248,245,0.92);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--line);
  padding: 0 24px;
  height: 60px;
  display: flex; align-items: center; justify-content: space-between;
}
.gsm-nav-brand { display: flex; align-items: center; gap: 10px; }
.gsm-nav-logo {
  width: 38px; height: 38px; border-radius: 50%;
  background: linear-gradient(135deg, var(--brand-mid), var(--brand));
  display: flex; align-items: center; justify-content: center;
  color: #fff; font-family: var(--serif); font-weight: 700; font-size: 15px;
  flex-shrink: 0;
}
.gsm-nav-name { font-family: var(--serif); font-weight: 700; font-size: 16px; color: var(--ink); letter-spacing: -0.02em; line-height: 1; }
.gsm-nav-sub { font-size: 10px; font-weight: 500; color: var(--brand); letter-spacing: 0.1em; text-transform: uppercase; }
.gsm-nav-pill {
  background: var(--brand-light); border: 1px solid rgba(232,66,10,0.25);
  border-radius: 999px; padding: 5px 14px;
  font-size: 11px; font-weight: 600; color: var(--brand); letter-spacing: 0.04em; cursor: pointer;
  display: flex; align-items: center; gap: 6px;
  transition: background var(--transition);
  -webkit-appearance: none; touch-action: manipulation;
}
.gsm-nav-pill:hover { background: rgba(232,66,10,0.12); }

/* HERO */
.gsm-hero {
  background: linear-gradient(135deg, #1a0800 0%, #3d1400 45%, #1a0800 100%);
  padding: 52px 24px 64px; text-align: center;
  position: relative; overflow: hidden;
}
.gsm-hero::before {
  content:''; position:absolute; inset:0;
  background-image: radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px);
  background-size: 28px 28px;
}
.gsm-hero::after {
  content:''; position: absolute; bottom: -1px; left: 0; right: 0;
  height: 36px; background: var(--bg);
  clip-path: ellipse(55% 100% at 50% 100%);
}
.gsm-hero-eyebrow {
  display: inline-flex; align-items: center; gap: 8px;
  background: rgba(255,190,0,0.12); border: 1px solid rgba(255,190,0,0.3);
  border-radius: 999px; padding: 5px 16px;
  font-size: 10px; font-weight: 600; color: var(--gold);
  letter-spacing: 0.14em; text-transform: uppercase;
  margin-bottom: 18px; position: relative; z-index: 1;
}
.gsm-hero-title {
  font-family: var(--serif); font-size: clamp(28px, 7vw, 52px);
  font-weight: 700; color: #fff; line-height: 1.1; letter-spacing: -0.02em;
  position: relative; z-index: 1; margin-bottom: 12px;
}
.gsm-hero-title em { color: var(--brand-mid); font-style: italic; }
.gsm-hero-desc {
  font-size: 14px; font-weight: 300; color: rgba(255,255,255,0.55);
  max-width: 400px; margin: 0 auto 28px; line-height: 1.7;
  position: relative; z-index: 1;
}
.gsm-hero-stats { display: flex; justify-content: center; gap: 32px; position: relative; z-index: 1; }
.gsm-hero-stat { text-align: center; }
.gsm-hero-stat-n { font-family: var(--serif); font-size: 22px; font-weight: 700; color: var(--gold); line-height: 1; }
.gsm-hero-stat-l { font-size: 10px; color: rgba(255,255,255,0.4); letter-spacing: 0.08em; text-transform: uppercase; margin-top: 3px; }

/* CATEGORY CHIPS */
.gsm-cats {
  display: flex; align-items: center; gap: 8px;
  overflow-x: auto; padding: 20px 24px 4px;
  -webkit-overflow-scrolling: touch; scrollbar-width: none;
}
.gsm-cats::-webkit-scrollbar { display: none; }
.gsm-cat-btn {
  display: flex; align-items: center; gap: 6px;
  background: var(--card-bg); border: 1.5px solid var(--line);
  border-radius: 999px; padding: 7px 16px;
  font-family: var(--sans); font-size: 12px; font-weight: 500; color: var(--muted);
  cursor: pointer; white-space: nowrap; flex-shrink: 0;
  transition: all var(--transition);
  -webkit-appearance: none; touch-action: manipulation;
}
.gsm-cat-btn:hover { border-color: var(--brand); color: var(--brand); }
.gsm-cat-btn.active { background: var(--brand); border-color: var(--brand); color: #fff; }
.gsm-cat-dot { width: 6px; height: 6px; border-radius: 50%; background: currentColor; opacity: 0.6; }

/* LAYOUT */
.gsm-layout {
  max-width: 1100px; margin: 0 auto;
  padding: 28px 16px 60px;
  display: grid; grid-template-columns: 1fr 320px;
  gap: 32px; align-items: start;
}
@media (max-width: 860px) {
  .gsm-layout { grid-template-columns: 1fr; }
  .gsm-sidebar-desktop { display: none; }
}

/* SECTION LABEL */
.gsm-section-label { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
.gsm-section-title { font-family: var(--serif); font-size: 18px; font-weight: 600; color: var(--ink); letter-spacing: -0.02em; }
.gsm-section-count {
  background: var(--brand-light); border: 1px solid rgba(232,66,10,0.2);
  border-radius: 999px; padding: 3px 12px;
  font-size: 11px; font-weight: 600; color: var(--brand);
}

/* FEATURED CARD */
.gsm-featured {
  background: var(--card-bg); border-radius: 20px;
  border: 0.5px solid var(--line); overflow: hidden;
  box-shadow: var(--shadow-md); margin-bottom: 20px;
  animation: fade-up 0.55s ease both; cursor: pointer;
  transition: box-shadow var(--transition), transform var(--transition);
}
.gsm-featured:hover { box-shadow: var(--shadow-lg); transform: translateY(-2px); }
.gsm-featured-img-wrap { position: relative; overflow: hidden; height: 260px; }
@media (max-width: 600px) { .gsm-featured-img-wrap { height: 200px; } }
.gsm-featured-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; display: block; }
.gsm-featured:hover .gsm-featured-img { transform: scale(1.04); }
.gsm-featured-img-ph {
  width: 100%; height: 100%;
  background: linear-gradient(135deg, #ffe0cc, #ffd0b0);
  display: flex; align-items: center; justify-content: center; font-size: 52px;
}
.gsm-featured-badge {
  position: absolute; top: 16px; left: 16px;
  background: var(--brand); color: #fff;
  border-radius: 999px; padding: 5px 14px;
  font-size: 10px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
}
.gsm-featured-body { padding: 24px 24px 20px; }
.gsm-featured-meta { display: flex; align-items: center; gap: 12px; margin-bottom: 10px; }
.gsm-featured-tag { font-size: 10px; font-weight: 700; color: var(--brand); letter-spacing: 0.1em; text-transform: uppercase; }
.gsm-featured-sep { width: 3px; height: 3px; border-radius: 50%; background: var(--muted); opacity: 0.4; }
.gsm-featured-date { font-size: 11px; color: var(--muted); }
.gsm-featured-title {
  font-family: var(--serif); font-size: clamp(18px, 4vw, 24px);
  font-weight: 700; color: var(--ink); line-height: 1.25; letter-spacing: -0.02em; margin-bottom: 10px;
  word-break: break-word;
}
.gsm-featured-excerpt {
  font-size: 13px; color: var(--muted); font-weight: 300; line-height: 1.7; margin-bottom: 16px;
  display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;
}
.gsm-featured-footer { display: flex; align-items: center; justify-content: space-between; }
.gsm-read-btn {
  display: inline-flex; align-items: center; gap: 6px;
  background: var(--ink); color: #fff; border: none; border-radius: 10px;
  padding: 9px 18px; cursor: pointer; font-family: var(--sans); font-size: 12px; font-weight: 600;
  transition: background var(--transition), transform var(--transition);
  -webkit-appearance: none; touch-action: manipulation;
}
.gsm-read-btn:hover { background: var(--brand); transform: translateX(2px); }
.gsm-del-btn {
  display: inline-flex; align-items: center; gap: 5px;
  background: rgba(232,66,10,0.07); color: var(--brand);
  border: 1px solid rgba(232,66,10,0.2); border-radius: 8px; padding: 7px 14px; cursor: pointer;
  font-family: var(--sans); font-size: 11px; font-weight: 600;
  transition: background var(--transition), border-color var(--transition);
  -webkit-appearance: none; touch-action: manipulation;
}
.gsm-del-btn:hover { background: rgba(232,66,10,0.14); border-color: rgba(232,66,10,0.4); }

/* REGULAR CARD */
.gsm-cards-list { display: flex; flex-direction: column; gap: 16px; }
.gsm-card {
  background: var(--card-bg); border-radius: var(--radius); border: 0.5px solid var(--line);
  overflow: hidden; box-shadow: var(--shadow-sm); display: flex;
  transition: box-shadow var(--transition), border-color var(--transition), transform var(--transition);
  animation: fade-up 0.45s ease both; cursor: pointer;
}
.gsm-card:hover { box-shadow: var(--shadow-md); border-color: rgba(232,66,10,0.25); transform: translateY(-1px); }
.gsm-card-img-wrap { width: 130px; flex-shrink: 0; overflow: hidden; position: relative; }
.gsm-card-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.45s ease; display: block; }
.gsm-card:hover .gsm-card-img { transform: scale(1.06); }
.gsm-card-img-ph { width: 100%; height: 100%; min-height: 110px; background: linear-gradient(135deg, #fff0e6, #ffddc4); display: flex; align-items: center; justify-content: center; font-size: 28px; }
.gsm-card-body { flex: 1; padding: 16px 16px 14px; display: flex; flex-direction: column; min-width: 0; }
.gsm-card-meta { display: flex; align-items: center; gap: 8px; margin-bottom: 6px; }
.gsm-card-tag { font-size: 9px; font-weight: 700; color: var(--brand); letter-spacing: 0.1em; text-transform: uppercase; }
.gsm-card-sep { width: 3px; height: 3px; border-radius: 50%; background: var(--muted); opacity: 0.35; }
.gsm-card-date { font-size: 10px; color: var(--muted); }
.gsm-card-title { font-family: var(--serif); font-size: 14px; font-weight: 600; color: var(--ink); line-height: 1.35; letter-spacing: -0.01em; margin-bottom: 6px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; word-break: break-word; }
.gsm-card-excerpt { font-size: 11.5px; color: var(--muted); font-weight: 300; line-height: 1.6; flex: 1; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; word-break: break-word; margin-bottom: 10px; }
.gsm-card-footer { display: flex; align-items: center; justify-content: space-between; margin-top: auto; }
.gsm-card-readtime { display: flex; align-items: center; gap: 4px; font-size: 10px; color: var(--muted); }

@media (max-width: 560px) {
  .gsm-card { flex-direction: column; }
  .gsm-card-img-wrap { width: 100%; height: 170px; }
  .gsm-card-img-ph { min-height: 130px; font-size: 38px; }
  .gsm-card-title { font-size: 15px; -webkit-line-clamp: 3; }
}

/* EMPTY */
.gsm-empty { background: var(--card-bg); border-radius: 20px; border: 1.5px dashed rgba(232,66,10,0.2); padding: 64px 24px; text-align: center; }
.gsm-empty-icon { font-size: 44px; margin-bottom: 12px; }
.gsm-empty-title { font-family: var(--serif); font-size: 18px; font-weight: 600; color: var(--ink); margin-bottom: 6px; }
.gsm-empty-text { font-size: 13px; color: var(--muted); font-weight: 300; }

/* MOBILE ADD FORM (shown below feed on small screens) */
.gsm-mobile-form-wrap { display: none; margin-bottom: 24px; }
@media (max-width: 860px) { .gsm-mobile-form-wrap { display: block; } }

/* SIDEBAR */
.gsm-sidebar { display: flex; flex-direction: column; gap: 20px; }
.gsm-write-card {
  background: linear-gradient(135deg, #1a0800, #3d1500);
  border-radius: 18px; padding: 24px; position: relative; overflow: hidden;
}
.gsm-write-card::before { content:''; position: absolute; inset: 0; background-image: radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px); background-size: 18px 18px; }
.gsm-write-card-title { font-family: var(--serif); font-size: 18px; font-weight: 700; color: #fff; line-height: 1.2; margin-bottom: 6px; position: relative; z-index: 1; }
.gsm-write-card-title em { color: var(--brand-mid); font-style: italic; }
.gsm-write-card-sub { font-size: 12px; color: rgba(255,255,255,0.42); font-weight: 300; margin-bottom: 18px; position: relative; z-index: 1; }
.gsm-write-btn {
  background: var(--brand); color: #fff; border: none; border-radius: 10px;
  padding: 10px 20px; font-family: var(--sans); font-size: 12px; font-weight: 600;
  cursor: pointer; display: flex; align-items: center; gap: 7px;
  position: relative; z-index: 1;
  transition: background var(--transition), transform var(--transition);
  -webkit-appearance: none; touch-action: manipulation;
}
.gsm-write-btn:hover { background: var(--brand-mid); transform: translateY(-1px); }

.gsm-form-card {
  background: var(--card-bg); border: 0.5px solid var(--line);
  border-radius: 18px; padding: 22px; box-shadow: var(--shadow-sm);
  position: relative; overflow: hidden;
}
.gsm-form-shimmer {
  position: absolute; top: 0; left: -100%; width: 50%; height: 2px;
  background: linear-gradient(90deg, transparent, var(--brand-mid), transparent);
  animation: shimmer 3s ease infinite;
}
.gsm-form-title { font-family: var(--serif); font-size: 15px; font-weight: 700; color: var(--ink); margin-bottom: 16px; }
.gsm-form-title em { color: var(--brand); font-style: italic; }
.gsm-field { margin-bottom: 12px; }
.gsm-label { display: block; font-size: 9px; font-weight: 700; color: var(--muted); letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 5px; }
.gsm-input-wrap { position: relative; }
.gsm-icon-mid { position: absolute; left: 11px; top: 50%; transform: translateY(-50%); pointer-events: none; color: #d0a888; }
.gsm-icon-top { position: absolute; left: 11px; top: 13px; pointer-events: none; color: #d0a888; }
.gsm-input {
  width: 100%; padding: 10px 11px 10px 34px;
  border: 1.5px solid #f0e0d0; border-radius: 10px; background: #fff9f5;
  font-family: var(--sans); font-size: 13px; color: var(--ink); outline: none;
  box-sizing: border-box; -webkit-text-size-adjust: 100%;
  transition: border-color var(--transition), box-shadow var(--transition);
}
@media (max-width: 640px) { .gsm-input { font-size: 16px; } }
.gsm-input::placeholder { color: #d0b8a8; }
.gsm-input:focus { border-color: var(--brand); background: #fff; box-shadow: 0 0 0 4px rgba(232,66,10,0.08); }
.gsm-textarea {
  width: 100%; padding: 10px 11px 10px 12px;
  border: 1.5px solid #f0e0d0; border-radius: 10px; background: #fff9f5;
  font-family: var(--sans); font-size: 13px; color: var(--ink); outline: none;
  box-sizing: border-box; min-height: 120px; line-height: 1.6; resize: vertical;
  -webkit-text-size-adjust: 100%;
  transition: border-color var(--transition), box-shadow var(--transition);
}
@media (max-width: 640px) { .gsm-textarea { font-size: 16px; } }
.gsm-textarea::placeholder { color: #d0b8a8; }
.gsm-textarea:focus { border-color: var(--brand); background: #fff; box-shadow: 0 0 0 4px rgba(232,66,10,0.08); }
.gsm-img-preview { width: 100%; height: 110px; object-fit: cover; border-radius: 8px; margin-bottom: 12px; display: block; }
.gsm-submit-btn {
  width: 100%; background: linear-gradient(135deg, var(--brand), var(--brand-mid));
  color: #fff; border: none; border-radius: 10px; padding: 11px 18px;
  font-family: var(--sans); font-size: 13px; font-weight: 600; cursor: pointer;
  display: flex; align-items: center; justify-content: center; gap: 7px;
  box-shadow: 0 4px 16px rgba(232,66,10,0.3);
  transition: transform var(--transition), box-shadow var(--transition), opacity var(--transition);
  -webkit-appearance: none; touch-action: manipulation;
}
.gsm-submit-btn:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 6px 22px rgba(232,66,10,0.4); }
.gsm-submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }
.gsm-spinner { width: 13px; height: 13px; border: 2px solid rgba(255,255,255,0.3); border-top-color: #fff; border-radius: 50%; animation: spin 0.65s linear infinite; }

.gsm-dest-card { background: var(--card-bg); border: 0.5px solid var(--line); border-radius: 18px; padding: 20px; box-shadow: var(--shadow-sm); }
.gsm-dest-title { font-family: var(--serif); font-size: 15px; font-weight: 700; color: var(--ink); margin-bottom: 14px; }
.gsm-dest-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.gsm-dest-chip {
  display: flex; align-items: center; gap: 6px;
  background: var(--brand-light); border: 1px solid rgba(232,66,10,0.15);
  border-radius: 10px; padding: 8px 10px;
  font-size: 12px; font-weight: 500; color: var(--ink); cursor: pointer;
  transition: background var(--transition), border-color var(--transition);
  -webkit-appearance: none; touch-action: manipulation;
}
.gsm-dest-chip:hover { background: rgba(232,66,10,0.12); border-color: var(--brand); }

.gsm-secure { display: flex; align-items: center; justify-content: center; gap: 6px; padding: 28px 0 16px; font-size: 10px; color: var(--muted); letter-spacing: 0.04em; }
.gsm-sdot { width: 6px; height: 6px; border-radius: 50%; background: #27ae60; animation: pulse-dot 2.4s ease-out infinite; }

@media (max-width: 640px) {
  .gsm-hero { padding: 40px 20px 56px; }
  .gsm-hero-stats { gap: 20px; }
  .gsm-layout { padding: 20px 12px 80px; }
}

/* ── RICH TEXT TOOLBAR ── */
.gsm-toolbar {
  display: flex; align-items: center; flex-wrap: wrap; gap: 4px;
  background: #fff9f5; border: 1.5px solid #f0e0d0;
  border-bottom: none;
  border-radius: 10px 10px 0 0;
  padding: 6px 8px;
}
.gsm-toolbar-btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 4px;
  background: transparent; border: 1px solid transparent;
  border-radius: 7px; padding: 5px 8px;
  font-family: var(--sans); font-size: 10px; font-weight: 600;
  color: var(--muted); cursor: pointer; white-space: nowrap;
  transition: background var(--transition), color var(--transition), border-color var(--transition);
  -webkit-appearance: none; touch-action: manipulation;
  line-height: 1;
}
.gsm-toolbar-btn:hover {
  background: var(--brand-light); color: var(--brand); border-color: rgba(232,66,10,0.25);
}
.gsm-toolbar-sep { width: 1px; height: 18px; background: var(--line); margin: 0 2px; flex-shrink: 0; }
.gsm-toolbar-label {
  font-size: 9px; font-weight: 700; color: #c4a090;
  letter-spacing: 0.1em; text-transform: uppercase;
  padding: 0 4px 0 2px; align-self: center;
}
/* textarea when toolbar is present — no top radius */
.gsm-toolbar + .gsm-input-wrap .gsm-textarea,
.gsm-textarea-below {
  border-radius: 0 0 10px 10px !important;
  border-top: none !important;
  padding-left: 12px !important;
}

/* ── MODAL OVERLAY ── */
.gsm-modal-overlay {
  position: fixed; inset: 0; z-index: 1000;
  background: rgba(26,8,0,0.55);
  backdrop-filter: blur(4px);
  display: flex; align-items: center; justify-content: center;
  padding: 20px;
}
.gsm-modal {
  background: var(--card-bg); border-radius: 18px;
  box-shadow: var(--shadow-lg); padding: 28px 24px 22px;
  width: 100%; max-width: 400px;
  animation: modal-in 0.2s ease both;
}
.gsm-modal-title {
  font-family: var(--serif); font-size: 16px; font-weight: 700; color: var(--ink);
  margin-bottom: 4px;
}
.gsm-modal-sub { font-size: 11.5px; color: var(--muted); font-weight: 300; margin-bottom: 20px; line-height: 1.5; }
.gsm-modal-field { margin-bottom: 12px; }
.gsm-modal-label { display: block; font-size: 9px; font-weight: 700; color: var(--muted); letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 5px; }
.gsm-modal-input {
  width: 100%; padding: 10px 12px;
  border: 1.5px solid #f0e0d0; border-radius: 10px; background: #fff9f5;
  font-family: var(--sans); font-size: 13px; color: var(--ink); outline: none;
  box-sizing: border-box; -webkit-text-size-adjust: 100%;
  transition: border-color var(--transition), box-shadow var(--transition);
}
.gsm-modal-input:focus { border-color: var(--brand); background: #fff; box-shadow: 0 0 0 4px rgba(232,66,10,0.08); }
.gsm-modal-actions { display: flex; gap: 8px; margin-top: 18px; }
.gsm-modal-cancel {
  flex: 1; background: var(--brand-light); color: var(--brand); border: 1px solid rgba(232,66,10,0.2);
  border-radius: 10px; padding: 10px; font-family: var(--sans); font-size: 12px; font-weight: 600;
  cursor: pointer; -webkit-appearance: none; touch-action: manipulation;
  transition: background var(--transition);
}
.gsm-modal-cancel:hover { background: rgba(232,66,10,0.12); }
.gsm-modal-confirm {
  flex: 2; background: linear-gradient(135deg, var(--brand), var(--brand-mid));
  color: #fff; border: none; border-radius: 10px; padding: 10px;
  font-family: var(--sans); font-size: 12px; font-weight: 600;
  cursor: pointer; -webkit-appearance: none; touch-action: manipulation;
  box-shadow: 0 3px 12px rgba(232,66,10,0.28);
  transition: transform var(--transition), box-shadow var(--transition);
}
.gsm-modal-confirm:hover { transform: translateY(-1px); box-shadow: 0 5px 18px rgba(232,66,10,0.38); }

/* inline inserted image chip in textarea preview */
.gsm-inline-hint {
  font-size: 10px; color: var(--muted); font-style: italic;
  margin-top: 4px; padding-left: 2px;
}

/* ── EDIT BUTTON ── */
.gsm-edit-btn {
  display: inline-flex; align-items: center; gap: 5px;
  background: rgba(26,8,0,0.05); color: var(--ink);
  border: 1px solid rgba(26,8,0,0.12); border-radius: 8px; padding: 7px 14px; cursor: pointer;
  font-family: var(--sans); font-size: 11px; font-weight: 600;
  transition: background var(--transition), border-color var(--transition);
  -webkit-appearance: none; touch-action: manipulation;
}
.gsm-edit-btn:hover { background: rgba(26,8,0,0.1); border-color: rgba(26,8,0,0.25); }

/* ── EDIT DRAWER OVERLAY ── */
.gsm-edit-overlay {
  position: fixed; inset: 0; z-index: 200;
  background: rgba(26,8,0,0.6);
  backdrop-filter: blur(6px);
  display: flex; align-items: flex-end; justify-content: center;
  padding: 0;
}
@media (min-width: 640px) {
  .gsm-edit-overlay { align-items: center; padding: 24px; }
}
.gsm-edit-drawer {
  background: var(--card-bg);
  width: 100%; max-width: 620px;
  border-radius: 24px 24px 0 0;
  max-height: 92vh; overflow-y: auto;
  box-shadow: var(--shadow-lg);
  animation: modal-in 0.25s ease both;
  display: flex; flex-direction: column;
}
@media (min-width: 640px) {
  .gsm-edit-drawer { border-radius: 20px; max-height: 88vh; }
}
.gsm-edit-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 20px 24px 0; flex-shrink: 0;
}
.gsm-edit-header-left { display: flex; flex-direction: column; gap: 2px; }
.gsm-edit-header-title {
  font-family: var(--serif); font-size: 17px; font-weight: 700; color: var(--ink); letter-spacing: -0.02em;
}
.gsm-edit-header-title em { color: var(--brand); font-style: italic; }
.gsm-edit-header-sub { font-size: 11px; color: var(--muted); font-weight: 300; }
.gsm-edit-close {
  width: 32px; height: 32px; border-radius: 50%;
  background: var(--brand-light); border: 1px solid rgba(232,66,10,0.2);
  display: flex; align-items: center; justify-content: center;
  color: var(--brand); cursor: pointer; font-size: 16px; line-height: 1;
  transition: background var(--transition);
  -webkit-appearance: none; touch-action: manipulation; flex-shrink: 0;
}
.gsm-edit-close:hover { background: rgba(232,66,10,0.15); }
.gsm-edit-body { padding: 20px 24px 24px; flex: 1; overflow-y: auto; }
.gsm-edit-actions { display: flex; gap: 8px; margin-top: 18px; }
.gsm-edit-cancel {
  flex: 1; background: var(--brand-light); color: var(--brand);
  border: 1px solid rgba(232,66,10,0.2); border-radius: 10px; padding: 11px;
  font-family: var(--sans); font-size: 12px; font-weight: 600; cursor: pointer;
  -webkit-appearance: none; touch-action: manipulation;
  transition: background var(--transition);
}
.gsm-edit-cancel:hover { background: rgba(232,66,10,0.12); }
.gsm-edit-save {
  flex: 2; background: linear-gradient(135deg, var(--brand), var(--brand-mid));
  color: #fff; border: none; border-radius: 10px; padding: 11px;
  font-family: var(--sans); font-size: 13px; font-weight: 600; cursor: pointer;
  display: flex; align-items: center; justify-content: center; gap: 7px;
  box-shadow: 0 4px 16px rgba(232,66,10,0.3);
  transition: transform var(--transition), box-shadow var(--transition), opacity var(--transition);
  -webkit-appearance: none; touch-action: manipulation;
}
.gsm-edit-save:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 6px 22px rgba(232,66,10,0.4); }
.gsm-edit-save:disabled { opacity: 0.6; cursor: not-allowed; }
.gsm-edit-saved-badge {
  display: inline-flex; align-items: center; gap: 5px;
  background: #e6f9ee; border: 1px solid #52c97a; border-radius: 999px;
  padding: 4px 12px; font-size: 11px; font-weight: 600; color: #1a7a3a;
  margin-bottom: 14px;
}
/* card footer row with edit + delete */
.gsm-card-actions { display: flex; align-items: center; gap: 6px; }
`;

const fmtDate = (iso) =>
  new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

const readTime = (text = '') => Math.max(1, Math.ceil(text.trim().split(/\s+/).length / 200));

const destinations = [
  { label: 'Goa', icon: '🌴' },
  { label: 'Manali', icon: '🏔️' },
  { label: 'Rajasthan', icon: '🏯' },
  { label: 'Kerala', icon: '🌿' },
  { label: 'Ladakh', icon: '❄️' },
  { label: 'Spiti', icon: '🗻' },
];

const categories = ['All', 'Mountains', 'Beaches', 'Heritage', 'Budget', 'Solo'];

/* ── Icons ── */
const IcoArrow  = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>;
const IcoPlus   = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;
const IcoTrash  = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6M9 6V4h6v2"/></svg>;
const IcoClock  = () => <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
const IcoEdit   = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>;
const IcoLines  = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="21" y1="10" x2="3" y2="10"/><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="14" x2="3" y2="14"/><line x1="21" y1="18" x2="3" y2="18"/></svg>;
const IcoImg    = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>;
const IcoLock   = () => <svg style={{width:11,height:11}} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
const IcoCal    = () => <svg style={{width:10,height:10,verticalAlign:'middle'}} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
const IcoLink   = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>;
const IcoAnchor = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="5" r="3"/><line x1="12" y1="8" x2="12" y2="21"/><path d="M5 16H2a10 10 0 0 0 20 0h-3"/></svg>;
const IcoPen    = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>;
const IcoCheck  = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;

/* ──────────────────────────────────────────────
   MODAL COMPONENT
   mode: 'anchor' | 'url' | 'image'
────────────────────────────────────────────── */
function InsertModal({ mode, onConfirm, onCancel }) {
  const [anchorText, setAnchorText] = useState('');
  const [anchorHref, setAnchorHref] = useState('');
  const [url, setUrl]               = useState('');
  const [imgUrl, setImgUrl]         = useState('');
  const [imgAlt, setImgAlt]         = useState('');

  const configs = {
    anchor: {
      title: 'Insert Anchor Link',
      sub:   'Wraps selected (or typed) text as a clickable hyperlink.',
      confirm: 'Insert Link',
    },
    url: {
      title: 'Insert Raw URL',
      sub:   'Pastes a plain URL directly into the content.',
      confirm: 'Insert URL',
    },
    image: {
      title: 'Insert Inline Image',
      sub:   'Embeds an image tag inside the content body.',
      confirm: 'Insert Image',
    },
  };

  const cfg = configs[mode];

  const handleConfirm = () => {
    if (mode === 'anchor') {
      if (!anchorHref.trim()) return;
      const text = anchorText.trim() || anchorHref.trim();
      onConfirm(`[${text}](${anchorHref.trim()})`);
    } else if (mode === 'url') {
      if (!url.trim()) return;
      onConfirm(url.trim());
    } else if (mode === 'image') {
      if (!imgUrl.trim()) return;
      const alt = imgAlt.trim() || 'image';
      onConfirm(`![${alt}](${imgUrl.trim()})`);
    }
  };

  return (
    <div className="gsm-modal-overlay" onClick={e => { if (e.target === e.currentTarget) onCancel(); }}>
      <div className="gsm-modal">
        <div className="gsm-modal-title">{cfg.title}</div>
        <div className="gsm-modal-sub">{cfg.sub}</div>

        {mode === 'anchor' && (
          <>
            <div className="gsm-modal-field">
              <label className="gsm-modal-label">Display Text</label>
              <input className="gsm-modal-input" placeholder="e.g. Goa on ₹500/day"
                value={anchorText} onChange={e => setAnchorText(e.target.value)} autoFocus />
            </div>
            <div className="gsm-modal-field">
              <label className="gsm-modal-label">URL *</label>
              <input className="gsm-modal-input" placeholder="https://example.com"
                value={anchorHref} onChange={e => setAnchorHref(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') handleConfirm(); }} />
            </div>
          </>
        )}

        {mode === 'url' && (
          <div className="gsm-modal-field">
            <label className="gsm-modal-label">URL *</label>
            <input className="gsm-modal-input" placeholder="https://example.com"
              value={url} onChange={e => setUrl(e.target.value)} autoFocus
              onKeyDown={e => { if (e.key === 'Enter') handleConfirm(); }} />
          </div>
        )}

        {mode === 'image' && (
          <>
            <div className="gsm-modal-field">
              <label className="gsm-modal-label">Image URL *</label>
              <input className="gsm-modal-input" placeholder="https://example.com/photo.jpg"
                value={imgUrl} onChange={e => setImgUrl(e.target.value)} autoFocus />
            </div>
            <div className="gsm-modal-field">
              <label className="gsm-modal-label">Alt Text</label>
              <input className="gsm-modal-input" placeholder="Describe the image…"
                value={imgAlt} onChange={e => setImgAlt(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') handleConfirm(); }} />
            </div>
            {imgUrl && (
              <img src={imgUrl} alt="preview"
                style={{ width:'100%', height:90, objectFit:'cover', borderRadius:8, marginBottom:8 }}
                onError={e => { e.target.style.display='none'; }} />
            )}
          </>
        )}

        <div className="gsm-modal-actions">
          <button className="gsm-modal-cancel" onClick={onCancel}>Cancel</button>
          <button className="gsm-modal-confirm" onClick={handleConfirm}>{cfg.confirm}</button>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   EDIT BLOG DRAWER
────────────────────────────────────────────── */
function EditBlogDrawer({ blog, onSave, onClose }) {
  const [editForm, setEditForm] = useState({
    title:     blog.title     || '',
    content:   blog.content   || '',
    image_url: blog.image_url || '',
  });
  const [saving,  setSaving]  = useState(false);
  const [saved,   setSaved]   = useState(false);
  const [modal,   setModal]   = useState(null);
  const textareaRef = useRef(null);

  const insertAtCursor = (snippet) => {
    const el = textareaRef.current;
    if (!el) return;
    const start = el.selectionStart;
    const end   = el.selectionEnd;
    const before = editForm.content.slice(0, start);
    const after  = editForm.content.slice(end);
    setEditForm(f => ({ ...f, content: before + snippet + after }));
    setTimeout(() => {
      el.focus();
      const pos = start + snippet.length;
      el.setSelectionRange(pos, pos);
    }, 0);
  };

  const handleInsert = (snippet) => { insertAtCursor(snippet); setModal(null); };

  const handleSave = async () => {
    if (!editForm.title.trim()) return alert('Title is required');
    setSaving(true);
    const { error } = await supabase.from('blogs').update({
      title:     editForm.title.trim(),
      content:   editForm.content,
      image_url: editForm.image_url.trim() || null,
    }).eq('id', blog.id);
    setSaving(false);
    if (error) { alert('Error saving: ' + error.message); return; }
    setSaved(true);
    setTimeout(() => { onSave(); onClose(); }, 900);
  };

  return (
    <>
      {modal && <InsertModal mode={modal} onConfirm={handleInsert} onCancel={() => setModal(null)} />}

      <div className="gsm-edit-overlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
        <div className="gsm-edit-drawer">

          <div className="gsm-edit-header">
            <div className="gsm-edit-header-left">
              <div className="gsm-edit-header-title">Edit <em>story</em></div>
              <div className="gsm-edit-header-sub">Changes are saved directly to the database</div>
            </div>
            <button className="gsm-edit-close" onClick={onClose} aria-label="Close">✕</button>
          </div>

          <div className="gsm-edit-body">
            {saved && (
              <div className="gsm-edit-saved-badge"><IcoCheck /> Saved successfully!</div>
            )}

            <div className="gsm-field">
              <label className="gsm-label">Title *</label>
              <div className="gsm-input-wrap">
                <span className="gsm-icon-mid"><IcoEdit /></span>
                <input className="gsm-input" placeholder="Enter blog title"
                  value={editForm.title}
                  onChange={e => setEditForm(f => ({ ...f, title: e.target.value }))} />
              </div>
            </div>

            <div className="gsm-field">
              <label className="gsm-label">Content</label>
              <div className="gsm-toolbar">
                <span className="gsm-toolbar-label">Insert</span>
                <button type="button" className="gsm-toolbar-btn" title="Insert anchor / hyperlink" onClick={() => setModal('anchor')}>
                  <IcoAnchor /> Anchor
                </button>
                <div className="gsm-toolbar-sep" />
                <button type="button" className="gsm-toolbar-btn" title="Insert raw URL" onClick={() => setModal('url')}>
                  <IcoLink /> URL
                </button>
                <div className="gsm-toolbar-sep" />
                <button type="button" className="gsm-toolbar-btn" title="Embed inline image" onClick={() => setModal('image')}>
                  <IcoImg /> Image
                </button>
              </div>
              <textarea
                ref={textareaRef}
                className="gsm-textarea gsm-textarea-below"
                placeholder="Write your travel story…"
                value={editForm.content}
                onChange={e => setEditForm(f => ({ ...f, content: e.target.value }))}
              />
              <p className="gsm-inline-hint">
                Markdown links&nbsp;<code>[text](url)</code> · images&nbsp;<code>![alt](url)</code>
              </p>
            </div>

            <div className="gsm-field">
              <label className="gsm-label">Cover Image URL</label>
              <div className="gsm-input-wrap">
                <span className="gsm-icon-mid"><IcoImg /></span>
                <input className="gsm-input" placeholder="https://example.com/photo.jpg"
                  value={editForm.image_url}
                  onChange={e => setEditForm(f => ({ ...f, image_url: e.target.value }))} />
              </div>
            </div>
            {editForm.image_url && (
              <img src={editForm.image_url} alt="preview" className="gsm-img-preview"
                onError={e => { e.target.style.display = 'none'; }} />
            )}

            <div className="gsm-edit-actions">
              <button className="gsm-edit-cancel" onClick={onClose}>Cancel</button>
              <button className="gsm-edit-save" onClick={handleSave} disabled={saving || saved}>
                {saving ? <><div className="gsm-spinner" /> Saving…</>
                        : saved  ? <><IcoCheck /> Saved!</>
                        : <><IcoPen /> Save Changes</>}
              </button>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

/* ──────────────────────────────────────────────
   SHARED FORM COMPONENT  (with rich toolbar)
────────────────────────────────────────────── */
function AddBlogForm({ form, setForm, loading, handleAdd }) {
  const textareaRef = useRef(null);
  const [modal, setModal] = useState(null); // null | 'anchor' | 'url' | 'image'

  /* Insert a snippet at cursor position (or replace selection) */
  const insertAtCursor = (snippet) => {
    const el = textareaRef.current;
    if (!el) return;
    const start = el.selectionStart;
    const end   = el.selectionEnd;
    const before = form.content.slice(0, start);
    const after  = form.content.slice(end);
    const newContent = before + snippet + after;
    setForm(f => ({ ...f, content: newContent }));
    // Restore focus + move cursor after inserted snippet
    setTimeout(() => {
      el.focus();
      const pos = start + snippet.length;
      el.setSelectionRange(pos, pos);
    }, 0);
  };

  const openModal = (mode) => setModal(mode);
  const closeModal = () => setModal(null);

  const handleInsert = (snippet) => {
    insertAtCursor(snippet);
    closeModal();
  };

  return (
    <>
      {modal && <InsertModal mode={modal} onConfirm={handleInsert} onCancel={closeModal} />}

      <div className="gsm-form-card">
        <div className="gsm-form-shimmer" />
        <div className="gsm-form-title">Add a new <em>story</em></div>

        <div className="gsm-field">
          <label className="gsm-label">Title *</label>
          <div className="gsm-input-wrap">
            <span className="gsm-icon-mid"><IcoEdit /></span>
            <input className="gsm-input" placeholder="Enter blog title"
              value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
          </div>
        </div>

        <div className="gsm-field">
          <label className="gsm-label">Content</label>

          {/* ── RICH TOOLBAR ── */}
          <div className="gsm-toolbar">
            <span className="gsm-toolbar-label">Insert</span>

            <button
              type="button"
              className="gsm-toolbar-btn"
              title="Insert anchor / hyperlink"
              onClick={() => openModal('anchor')}
            >
              <IcoAnchor /> Anchor
            </button>

            <div className="gsm-toolbar-sep" />

            <button
              type="button"
              className="gsm-toolbar-btn"
              title="Insert raw URL"
              onClick={() => openModal('url')}
            >
              <IcoLink /> URL
            </button>

            <div className="gsm-toolbar-sep" />

            <button
              type="button"
              className="gsm-toolbar-btn"
              title="Embed inline image"
              onClick={() => openModal('image')}
            >
              <IcoImg /> Image
            </button>
          </div>

          {/* textarea — top border handled by toolbar */}
          <textarea
            ref={textareaRef}
            className="gsm-textarea gsm-textarea-below"
            placeholder="Write your travel story… Use the toolbar above to insert links and images."
            value={form.content}
            onChange={e => setForm({ ...form, content: e.target.value })}
          />
          <p className="gsm-inline-hint">
            Supports Markdown-style links&nbsp;<code>[text](url)</code> and images&nbsp;<code>![alt](url)</code>
          </p>
        </div>

        <div className="gsm-field">
          <label className="gsm-label">Cover Image URL</label>
          <div className="gsm-input-wrap">
            <span className="gsm-icon-mid"><IcoImg /></span>
            <input className="gsm-input" placeholder="https://example.com/photo.jpg"
              value={form.image_url} onChange={e => setForm({ ...form, image_url: e.target.value })} />
          </div>
        </div>

        {form.image_url && (
          <img src={form.image_url} alt="preview" className="gsm-img-preview"
            onError={e => { e.target.style.display = 'none'; }} />
        )}

        <button className="gsm-submit-btn" onClick={handleAdd} disabled={loading}>
          {loading ? <><div className="gsm-spinner" /> Adding…</> : <><IcoPlus /> Publish Blog</>}
        </button>
      </div>
    </>
  );
}

/* ── Main Page ── */
export default function BlogsPage() {
  const [blogs, setBlogs]     = useState([]);
  const [form, setForm]       = useState({ title: '', content: '', image_url: '' });
  const [loading, setLoading] = useState(false);
  const [activeCat, setActiveCat] = useState('All');
  const [editingBlog, setEditingBlog] = useState(null);
  const mobileFormRef = useRef(null);

  useEffect(() => {
    const el = document.createElement('style');
    el.textContent = CSS;
    document.head.appendChild(el);
    return () => document.head.removeChild(el);
  }, []);

  const fetchBlogs = async () => {
    const { data } = await supabase.from('blogs').select('*').order('created_at', { ascending: false });
    setBlogs(data || []);
  };

  useEffect(() => { fetchBlogs(); }, []);

  useEffect(() => {
    const ch = supabase
      .channel('gsm-blogs-rt')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'blogs' }, fetchBlogs)
      .subscribe();
    return () => supabase.removeChannel(ch);
  }, []);

  const handleAdd = async () => {
    if (!form.title.trim()) return alert('Title is required');
    setLoading(true);
    const { error } = await supabase.from('blogs').insert([{
      title: form.title,
      content: form.content,
      image_url: form.image_url || null,
    }]);
    if (error) alert('Error: ' + error.message);
    else {
      setForm({ title: '', content: '', image_url: '' });
      await fetchBlogs();
    }
    setLoading(false);
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (!window.confirm('Delete this blog post?')) return;
    await supabase.from('blogs').delete().eq('id', id);
    await fetchBlogs();
  };

  const handleEdit = (blog, e) => {
    e.stopPropagation();
    setEditingBlog(blog);
  };

  const [featured, ...rest] = blogs;

  return (
    <div className="gsm-root">

      {/* EDIT DRAWER */}
      {editingBlog && (
        <EditBlogDrawer
          blog={editingBlog}
          onSave={fetchBlogs}
          onClose={() => setEditingBlog(null)}
        />
      )}

      {/* NAV */}
      <nav className="gsm-nav">
        <div className="gsm-nav-brand">
          <div className="gsm-nav-logo">G</div>
          <div>
            <div className="gsm-nav-name">GhoomoSasteMe</div>
            <div className="gsm-nav-sub">Travel Blog</div>
          </div>
        </div>
        <button
          className="gsm-nav-pill"
          onClick={() => mobileFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
        >
          <IcoPlus /> Write
        </button>
      </nav>

      {/* HERO */}
      <div className="gsm-hero">
        <div className="gsm-hero-eyebrow">✈️ &nbsp;Real trips · Real savings</div>
        <h1 className="gsm-hero-title">India, One Story<br /><em>at a Time</em></h1>
        <p className="gsm-hero-desc">
          Budget travel guides, hidden gems &amp; honest itineraries written by explorers who actually went cheap.
        </p>
        <div className="gsm-hero-stats">
          <div className="gsm-hero-stat">
            <div className="gsm-hero-stat-n">{blogs.length}</div>
            <div className="gsm-hero-stat-l">Stories</div>
          </div>
          <div className="gsm-hero-stat">
            <div className="gsm-hero-stat-n">50+</div>
            <div className="gsm-hero-stat-l">Destinations</div>
          </div>
          <div className="gsm-hero-stat">
            <div className="gsm-hero-stat-n">₹0</div>
            <div className="gsm-hero-stat-l">Paywall</div>
          </div>
        </div>
      </div>

      {/* CATEGORIES */}
      <div className="gsm-cats">
        {categories.map(c => (
          <button key={c} className={`gsm-cat-btn${activeCat === c ? ' active' : ''}`} onClick={() => setActiveCat(c)}>
            <span className="gsm-cat-dot" />{c}
          </button>
        ))}
      </div>

      {/* LAYOUT */}
      <div className="gsm-layout">

        {/* FEED */}
        <div>
          <div className="gsm-section-label">
            <span className="gsm-section-title">Latest Stories</span>
            <span className="gsm-section-count">{blogs.length} post{blogs.length !== 1 ? 's' : ''}</span>
          </div>

          {/* Mobile: Add form appears here */}
          <div className="gsm-mobile-form-wrap" ref={mobileFormRef}>
            <AddBlogForm form={form} setForm={setForm} loading={loading} handleAdd={handleAdd} />
          </div>

          {blogs.length === 0 && (
            <div className="gsm-empty">
              <div className="gsm-empty-icon">✈️</div>
              <div className="gsm-empty-title">No stories yet</div>
              <p className="gsm-empty-text">Be the first to share a budget travel adventure!</p>
            </div>
          )}

          {/* Featured */}
          {featured && (
            <div className="gsm-featured">
              <div className="gsm-featured-img-wrap">
                {featured.image_url
                  ? <img src={featured.image_url} alt={featured.title} className="gsm-featured-img" onError={e => { e.target.style.display='none'; }} />
                  : null
                }
                <div className="gsm-featured-img-ph" style={{ display: featured.image_url ? 'none' : 'flex' }}>✈️</div>
                <div className="gsm-featured-badge">✦ Featured</div>
              </div>
              <div className="gsm-featured-body">
                <div className="gsm-featured-meta">
                  <span className="gsm-featured-tag">Travel Guide</span>
                  <span className="gsm-featured-sep" />
                  <span className="gsm-featured-date"><IcoCal /> &nbsp;{fmtDate(featured.created_at)}</span>
                </div>
                <h2 className="gsm-featured-title">{featured.title}</h2>
                {featured.content && <p className="gsm-featured-excerpt">{featured.content}</p>}
                <div className="gsm-featured-footer">
                  <button className="gsm-read-btn">Read story <IcoArrow /></button>
                  <div className="gsm-card-actions">
                    <button className="gsm-edit-btn" onClick={(e) => handleEdit(featured, e)}><IcoPen /> Edit</button>
                    <button className="gsm-del-btn" onClick={(e) => handleDelete(featured.id, e)}><IcoTrash /> Delete</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Rest */}
          {rest.length > 0 && (
            <div className="gsm-cards-list">
              {rest.map((blog, i) => (
                <div key={blog.id} className="gsm-card" style={{ animationDelay: `${(i + 1) * 0.06}s` }}>
                  <div className="gsm-card-img-wrap">
                    {blog.image_url
                      ? <img src={blog.image_url} alt={blog.title} className="gsm-card-img" onError={e => { e.target.style.display='none'; }} />
                      : null
                    }
                    <div className="gsm-card-img-ph" style={{ display: blog.image_url ? 'none' : 'flex' }}>✈️</div>
                  </div>
                  <div className="gsm-card-body">
                    <div className="gsm-card-meta">
                      <span className="gsm-card-tag">Travel</span>
                      <span className="gsm-card-sep" />
                      <span className="gsm-card-date">{fmtDate(blog.created_at)}</span>
                    </div>
                    <div className="gsm-card-title">{blog.title}</div>
                    {blog.content && <div className="gsm-card-excerpt">{blog.content}</div>}
                    <div className="gsm-card-footer">
                      <span className="gsm-card-readtime"><IcoClock />&nbsp;{readTime(blog.content)} min read</span>
                      <div className="gsm-card-actions">
                        <button className="gsm-edit-btn" onClick={(e) => handleEdit(blog, e)}><IcoPen /> Edit</button>
                        <button className="gsm-del-btn" onClick={(e) => handleDelete(blog.id, e)}><IcoTrash /> Delete</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="gsm-secure">
            <div className="gsm-sdot" />
            <IcoLock />
            SSL Secured · ghoomosasteme.com
          </div>
        </div>

        {/* SIDEBAR (desktop only) */}
        <aside className="gsm-sidebar gsm-sidebar-desktop">
          <div className="gsm-write-card">
            <div className="gsm-write-card-title">Share your<br /><em>travel story</em></div>
            <div className="gsm-write-card-sub">Help fellow budget travellers plan better trips</div>
            <button className="gsm-write-btn"><IcoEdit /> Write a blog</button>
          </div>

          <AddBlogForm form={form} setForm={setForm} loading={loading} handleAdd={handleAdd} />

          <div className="gsm-dest-card">
            <div className="gsm-dest-title">Top Destinations</div>
            <div className="gsm-dest-grid">
              {destinations.map(d => (
                <div key={d.label} className="gsm-dest-chip">
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