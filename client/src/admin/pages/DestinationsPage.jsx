import React, { useState, useEffect } from 'react';
import { getDestinations, addDestination, deleteDestination } from '../adminApi';

const STATE_OPTIONS = [
  { value: 'uttarakhand', label: 'Uttarakhand' },
  { value: 'himachal', label: 'Himachal Pradesh' },
  { value: 'rajasthan', label: 'Rajasthan' },
  { value: 'kashmir', label: 'Kashmir' },
  { value: 'other', label: 'Other' },
];

const CATEGORY_OPTIONS = [
  { value: 'adventure', label: 'Adventure' },
  { value: 'weekend', label: 'Weekend Trip' },
  { value: 'leisure', label: 'Leisure' },
  { value: 'spiritual', label: 'Spiritual' },
  { value: 'backpacking', label: 'Backpacking' },
  { value: 'corporate', label: 'Corporate' },
  { value: 'uttarakhand', label: 'Uttarakhand Special' },
];

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');

  @keyframes dst-fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
  @keyframes dst-shimmer { 0%{left:-120%} 100%{left:200%} }
  @keyframes dst-spin { to{transform:rotate(360deg)} }
  @keyframes dst-pop { from{opacity:0;transform:scale(0.95) translateY(10px)} to{opacity:1;transform:scale(1) translateY(0)} }
  @keyframes dst-pulse { 0%,100%{box-shadow:0 0 0 0 rgba(255,107,0,0.45)} 60%{box-shadow:0 0 0 8px rgba(255,107,0,0)} }

  .dst-wrap { font-family:'Plus Jakarta Sans',sans-serif; color:#1a0800; min-height:100vh; background:#fff7ed; padding:32px 28px 56px; box-sizing:border-box; }

  .dst-page-header { display:flex; align-items:flex-start; justify-content:space-between; gap:16px; flex-wrap:wrap; margin-bottom:36px; animation:dst-fadeUp 0.6s ease both; }
  .dst-eyebrow { display:flex; align-items:center; gap:8px; font-size:9px; font-weight:600; color:#e8420a; letter-spacing:0.2em; text-transform:uppercase; margin-bottom:7px; }
  .dst-eyebrow::before { content:''; display:inline-block; width:18px; height:1.5px; background:#e8420a; border-radius:2px; }
  .dst-page-title { font-family:'Playfair Display',serif; font-size:clamp(28px,3vw,40px); font-weight:700; color:#1a0800; line-height:1.1; margin:0 0 5px; }
  .dst-page-title span { color:#e8420a; font-style:italic; }
  .dst-page-sub { font-size:12px; font-weight:300; color:#a08060; margin:0; }
  .dst-stat-pill { display:flex; align-items:center; gap:7px; background:#fff; border:1.5px solid #f0e0d0; border-radius:999px; padding:8px 18px; font-size:12px; font-weight:600; color:#e8420a; box-shadow:0 2px 12px rgba(232,66,10,0.08); align-self:center; white-space:nowrap; }

  .dst-card { background:#ffffff; border-radius:22px; padding:34px 30px; margin-bottom:24px; box-shadow:0 2px 6px rgba(0,0,0,0.04),0 10px 34px rgba(232,66,10,0.09); position:relative; overflow:hidden; animation:dst-fadeUp 0.65s ease both; }
  .dst-card:nth-of-type(2){animation-delay:0.08s} .dst-card:nth-of-type(3){animation-delay:0.15s}
  .dst-card-shimmer { position:absolute; top:0; left:-120%; width:55%; height:3px; background:linear-gradient(90deg,transparent,rgba(255,107,0,0.55),transparent); animation:dst-shimmer 3.4s ease infinite; pointer-events:none; }
  .dst-card::before { content:''; position:absolute; top:18px; left:0; width:3px; height:48px; border-radius:0 3px 3px 0; background:linear-gradient(180deg,#ff9040,#e8420a); }

  .dst-section-title { font-family:'Playfair Display',serif; font-size:17px; font-weight:700; color:#1a0800; margin-bottom:22px; display:flex; align-items:center; gap:10px; }
  .dst-section-icon { width:30px; height:30px; border-radius:9px; background:linear-gradient(135deg,#ff9040,#e8420a); display:flex; align-items:center; justify-content:center; flex-shrink:0; box-shadow:0 3px 10px rgba(232,66,10,0.28); }
  .dst-section-icon svg { width:14px; height:14px; stroke:#fff; }

  .dst-alert { display:flex; align-items:center; gap:9px; border-radius:11px; padding:11px 15px; margin-bottom:20px; font-size:12px; animation:dst-pop 0.3s ease both; }
  .dst-alert-error { background:#fff3f0; border:1px solid #ffd0c0; color:#c0392b; }
  .dst-alert-success { background:#f0fff4; border:1px solid #b2f5c8; color:#1a7a3a; }

  .dst-form-grid { display:grid; grid-template-columns:1fr 1fr; gap:0 18px; }
  @media(max-width:600px){ .dst-form-grid{grid-template-columns:1fr} }

  .dst-field { margin-bottom:18px; }
  .dst-label { font-size:10px; font-weight:600; color:#8a7060; letter-spacing:0.1em; text-transform:uppercase; display:block; margin-bottom:7px; }

  .dst-input-wrap { position:relative; }
  .dst-input-wrap > svg { position:absolute; left:13px; top:50%; transform:translateY(-50%); width:14px; height:14px; color:#c0a898; pointer-events:none; }

  .dst-input, .dst-select, .dst-textarea {
    width:100%; box-sizing:border-box; padding:12px 13px 12px 38px;
    border:1.5px solid #f0e0d0; border-radius:11px; background:#fff9f5;
    font-family:'Plus Jakarta Sans',sans-serif; font-size:13px; color:#1a0800; outline:none;
    transition:border-color 0.2s,box-shadow 0.2s,background 0.2s;
  }
  .dst-input::placeholder,.dst-textarea::placeholder { color:#d0b8a8; }
  .dst-input:focus,.dst-select:focus,.dst-textarea:focus { border-color:#e8420a; background:#fff; box-shadow:0 0 0 4px rgba(232,66,10,0.09); }
  .dst-select { appearance:none; cursor:pointer; }
  .dst-textarea { min-height:90px; resize:vertical; line-height:1.65; }

  .dst-preview { width:100%; height:160px; object-fit:cover; border-radius:12px; margin-bottom:18px; display:block; border:1.5px solid #f0e0d0; box-shadow:0 6px 20px rgba(0,0,0,0.07); animation:dst-pop 0.35s ease both; }

  .dst-btn-primary { display:inline-flex; align-items:center; gap:8px; background:linear-gradient(135deg,#e8420a,#ff6b00,#ff9040); color:#fff; border:none; border-radius:11px; padding:13px 26px; font-family:'Plus Jakarta Sans',sans-serif; font-size:13px; font-weight:600; cursor:pointer; box-shadow:0 4px 18px rgba(232,66,10,0.32); transition:transform 0.15s,box-shadow 0.18s; animation:dst-pulse 2.4s ease-out infinite; }
  .dst-btn-primary:hover:not(:disabled) { transform:translateY(-2px); box-shadow:0 10px 30px rgba(232,66,10,0.42); }
  .dst-btn-primary:disabled { opacity:0.6; cursor:not-allowed; animation:none; }

  .dst-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(260px,1fr)); gap:18px; }

  .dst-dest-card { border-radius:16px; border:1.5px solid #f0e0d0; overflow:hidden; background:#fffaf5; display:flex; flex-direction:column; transition:transform 0.22s,box-shadow 0.22s; animation:dst-pop 0.45s ease both; }
  .dst-dest-card:hover { transform:translateY(-5px); box-shadow:0 14px 40px rgba(232,66,10,0.15); border-color:#e8c4a8; }

  .dst-dest-img-wrap { position:relative; overflow:hidden; height:150px; flex-shrink:0; }
  .dst-dest-img { width:100%; height:100%; object-fit:cover; display:block; transition:transform 0.4s ease; background:#f5e8d8; }
  .dst-dest-card:hover .dst-dest-img { transform:scale(1.05); }
  .dst-dest-img-placeholder { width:100%; height:150px; background:linear-gradient(135deg,#fff0e4,#ffe0c8); display:flex; align-items:center; justify-content:center; }

  .dst-badge-row { position:absolute; top:8px; left:8px; display:flex; gap:5px; flex-wrap:wrap; }
  .dst-badge { font-size:8px; font-weight:700; padding:3px 8px; border-radius:999px; text-transform:uppercase; letter-spacing:0.08em; }
  .dst-badge-cat { background:#e8420a; color:#fff; }
  .dst-badge-state { background:rgba(255,255,255,0.9); color:#e8420a; border:1px solid rgba(232,66,10,0.2); }

  .dst-dest-body { padding:12px 14px 14px; display:flex; flex-direction:column; gap:5px; flex:1; }
  .dst-dest-name { font-family:'Playfair Display',serif; font-size:15px; font-weight:700; color:#1a0800; }
  .dst-dest-location { font-size:10px; color:#b09080; display:flex; align-items:center; gap:4px; }
  .dst-dest-desc { font-size:11px; font-weight:300; color:#906050; line-height:1.55; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }

  .dst-dest-meta { display:flex; gap:10px; flex-wrap:wrap; margin-top:4px; }
  .dst-meta-pill { background:#fff3ee; border:1px solid #f0d8c8; border-radius:999px; padding:3px 10px; font-size:10px; font-weight:600; color:#e8420a; }

  .dst-dest-footer { display:flex; align-items:center; justify-content:space-between; margin-top:auto; padding-top:10px; border-top:1px solid #f5ede3; }
  .dst-dest-price { font-family:'Playfair Display',serif; font-size:16px; font-weight:700; color:#1a0800; }
  .dst-dest-price span { font-size:10px; font-weight:400; color:#b09080; font-family:'Plus Jakarta Sans',sans-serif; }

  .dst-btn-delete { display:inline-flex; align-items:center; gap:4px; background:rgba(232,66,10,0.06); color:#e8420a; border:1px solid rgba(232,66,10,0.2); border-radius:7px; padding:5px 10px; font-size:11px; font-weight:600; cursor:pointer; transition:background 0.15s,transform 0.12s; }
  .dst-btn-delete:hover { background:rgba(232,66,10,0.13); transform:scale(1.04); }

  .dst-spinner { width:14px; height:14px; border:2px solid rgba(255,255,255,0.3); border-top-color:#fff; border-radius:50%; animation:dst-spin 0.7s linear infinite; }

  .dst-empty { display:flex; flex-direction:column; align-items:center; padding:44px 20px; gap:14px; color:#c0a898; font-size:13px; text-align:center; }
  .dst-empty-icon { width:60px; height:60px; border-radius:18px; background:#fff7ed; border:1.5px dashed #e0c8b0; display:flex; align-items:center; justify-content:center; }

  .dst-divider { display:flex; align-items:center; gap:12px; margin:26px 0 0; }
  .dst-divider-line { flex:1; height:1px; background:#f0e8e0; }
  .dst-divider-text { font-size:9px; color:#c0a898; letter-spacing:0.12em; text-transform:uppercase; white-space:nowrap; }
`;

const EMPTY_FORM = {
  name: '', state_id: '', category: '', location: '',
  duration: '', price: '', original_price: '',
  rating: '', description: '', image_url: '',
};

export default function DestinationsPage() {
  const [destinations, setDestinations] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ type: '', text: '' });

  const load = async () => {
    const { data, error } = await getDestinations();
    if (error) setMsg({ type: 'error', text: 'Failed to load: ' + error.message });
    else setDestinations(data || []);
  };

  useEffect(() => {
    const el = document.createElement('style');
    el.textContent = styles;
    document.head.appendChild(el);
    return () => document.head.removeChild(el);
  }, []);

  useEffect(() => { load(); }, []);

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const handleAdd = async () => {
    if (!form.name.trim()) return setMsg({ type: 'error', text: 'Destination name is required.' });
    setLoading(true);
    setMsg({ type: '', text: '' });
    const payload = {
      name: form.name,
      state_id: form.state_id || null,
      category: form.category || null,
      location: form.location || null,
      duration: form.duration || null,
      price: form.price ? parseInt(form.price) : null,
      original_price: form.original_price ? parseInt(form.original_price) : null,
      rating: form.rating ? parseFloat(form.rating) : null,
      description: form.description || null,
      image_url: form.image_url || null,
    };
    const { error } = await addDestination(payload);
    setLoading(false);
    if (error) setMsg({ type: 'error', text: 'Error: ' + error.message });
    else {
      setMsg({ type: 'success', text: '✅ Destination added! It will now appear in All Trips.' });
      setForm(EMPTY_FORM);
      load();
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this destination?')) return;
    const { error } = await deleteDestination(id);
    if (error) setMsg({ type: 'error', text: 'Delete failed: ' + error.message });
    else { setMsg({ type: 'success', text: 'Deleted.' }); load(); }
  };

  return (
    <div className="dst-wrap">
      <div className="dst-page-header">
        <div>
          <div className="dst-eyebrow">Destination Manager</div>
          <h1 className="dst-page-title">Explore <span>India</span></h1>
          <p className="dst-page-sub">Add destinations — they appear live in All Trips page</p>
        </div>
        <div className="dst-stat-pill">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:13,height:13}}>
            <circle cx="12" cy="10" r="3"/><path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 14 8 14s8-8.75 8-14a8 8 0 0 0-8-8z"/>
          </svg>
          {destinations.length} destination{destinations.length !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Add Form */}
      <div className="dst-card">
        <div className="dst-card-shimmer" />
        <div className="dst-section-title">
          <div className="dst-section-icon">
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
          </div>
          Add New Destination
        </div>

        {msg.text && (
          <div className={`dst-alert ${msg.type === 'error' ? 'dst-alert-error' : 'dst-alert-success'}`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:14,height:14,flexShrink:0}}>
              {msg.type === 'error'
                ? <><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></>
                : <polyline points="20 6 9 17 4 12"/>}
            </svg>
            {msg.text}
          </div>
        )}

        <div className="dst-form-grid">
          {/* Name */}
          <div className="dst-field" style={{gridColumn:'1/-1'}}>
            <label className="dst-label">Destination Name *</label>
            <div className="dst-input-wrap">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="10" r="3"/><path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 14 8 14s8-8.75 8-14a8 8 0 0 0-8-8z"/>
              </svg>
              <input className="dst-input" placeholder="e.g. Chopta & Tungnath Trek" value={form.name} onChange={e => set('name', e.target.value)} />
            </div>
          </div>

          {/* State */}
          <div className="dst-field">
            <label className="dst-label">State</label>
            <div className="dst-input-wrap">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
              <select className="dst-select" value={form.state_id} onChange={e => set('state_id', e.target.value)}>
                <option value="">Select State</option>
                {STATE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
          </div>

          {/* Category */}
          <div className="dst-field">
            <label className="dst-label">Category</label>
            <div className="dst-input-wrap">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/>
              </svg>
              <select className="dst-select" value={form.category} onChange={e => set('category', e.target.value)}>
                <option value="">Select Category</option>
                {CATEGORY_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
          </div>

          {/* Location */}
          <div className="dst-field">
            <label className="dst-label">Location</label>
            <div className="dst-input-wrap">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="10" r="3"/><path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 14 8 14s8-8.75 8-14a8 8 0 0 0-8-8z"/>
              </svg>
              <input className="dst-input" placeholder="e.g. Uttarakhand, India" value={form.location} onChange={e => set('location', e.target.value)} />
            </div>
          </div>

          {/* Duration */}
          <div className="dst-field">
            <label className="dst-label">Duration</label>
            <div className="dst-input-wrap">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
              <input className="dst-input" placeholder="e.g. 3 Days / 2 Nights" value={form.duration} onChange={e => set('duration', e.target.value)} />
            </div>
          </div>

          {/* Price */}
          <div className="dst-field">
            <label className="dst-label">Price (₹)</label>
            <div className="dst-input-wrap">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
              </svg>
              <input className="dst-input" type="number" placeholder="e.g. 5000" value={form.price} onChange={e => set('price', e.target.value)} />
            </div>
          </div>

          {/* Original Price */}
          <div className="dst-field">
            <label className="dst-label">Original Price (₹) <span style={{fontWeight:300,textTransform:'none'}}>(for discount)</span></label>
            <div className="dst-input-wrap">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
              </svg>
              <input className="dst-input" type="number" placeholder="e.g. 9000" value={form.original_price} onChange={e => set('original_price', e.target.value)} />
            </div>
          </div>

          {/* Rating */}
          <div className="dst-field">
            <label className="dst-label">Rating (out of 5)</label>
            <div className="dst-input-wrap">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
              <input className="dst-input" type="number" step="0.1" min="0" max="5" placeholder="e.g. 4.8" value={form.rating} onChange={e => set('rating', e.target.value)} />
            </div>
          </div>

          {/* Description */}
          <div className="dst-field" style={{gridColumn:'1/-1'}}>
            <label className="dst-label">Description</label>
            <div className="dst-input-wrap">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{top:16,transform:'none'}}>
                <line x1="17" y1="10" x2="3" y2="10"/><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="14" x2="3" y2="14"/><line x1="17" y1="18" x2="3" y2="18"/>
              </svg>
              <textarea className="dst-textarea" placeholder="Short description of the trip/destination…" value={form.description} onChange={e => set('description', e.target.value)} />
            </div>
          </div>

          {/* Image URL */}
          <div className="dst-field" style={{gridColumn:'1/-1'}}>
            <label className="dst-label">Cover Image URL</label>
            <div className="dst-input-wrap">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
              </svg>
              <input className="dst-input" type="url" placeholder="https://example.com/image.jpg" value={form.image_url} onChange={e => set('image_url', e.target.value)} />
            </div>
          </div>
        </div>

        {form.image_url && (
          <img src={form.image_url} alt="preview" className="dst-preview" onError={e => { e.target.style.display='none'; }} />
        )}

        <button className="dst-btn-primary" onClick={handleAdd} disabled={loading}>
          {loading ? <><div className="dst-spinner" /> Adding…</> : <>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="10" r="3"/><path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 14 8 14s8-8.75 8-14a8 8 0 0 0-8-8z"/>
            </svg>
            Add Destination
          </>}
        </button>
      </div>

      {/* List */}
      <div className="dst-card">
        <div className="dst-card-shimmer" />
        <div className="dst-section-title">
          <div className="dst-section-icon">
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="3 11 22 2 13 21 11 13 3 11"/>
            </svg>
          </div>
          All Destinations ({destinations.length})
        </div>

        {destinations.length === 0 ? (
          <div className="dst-empty">
            <div className="dst-empty-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="#d0a888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{width:26,height:26}}>
                <circle cx="12" cy="10" r="3"/><path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 14 8 14s8-8.75 8-14a8 8 0 0 0-8-8z"/>
              </svg>
            </div>
            <strong style={{color:'#a08060'}}>No destinations yet</strong>
            Add your first destination above — it will appear in All Trips.
          </div>
        ) : (
          <div className="dst-grid">
            {destinations.map((d, i) => (
              <div key={d.id} className="dst-dest-card" style={{animationDelay:`${i*0.05}s`}}>
                {d.image_url ? (
                  <div className="dst-dest-img-wrap">
                    <div className="dst-badge-row">
                      {d.category && <span className="dst-badge dst-badge-cat">{d.category}</span>}
                      {d.state_id && <span className="dst-badge dst-badge-state">{d.state_id}</span>}
                    </div>
                    <img src={d.image_url} alt={d.name} className="dst-dest-img" onError={e=>{e.target.parentElement.style.display='none'}} />
                  </div>
                ) : (
                  <div className="dst-dest-img-placeholder">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#e8b090" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" style={{width:32,height:32,opacity:0.6}}>
                      <circle cx="12" cy="10" r="3"/><path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 14 8 14s8-8.75 8-14a8 8 0 0 0-8-8z"/>
                    </svg>
                  </div>
                )}

                <div className="dst-dest-body">
                  <div className="dst-dest-name">{d.name}</div>
                  {d.location && <div className="dst-dest-location">📍 {d.location}</div>}
                  {d.description && <div className="dst-dest-desc">{d.description}</div>}
                  <div className="dst-dest-meta">
                    {d.duration && <span className="dst-meta-pill">⏱ {d.duration}</span>}
                    {d.rating && <span className="dst-meta-pill">⭐ {d.rating}</span>}
                  </div>
                  <div className="dst-dest-footer">
                    <div className="dst-dest-price">
                      {d.price ? <>₹{d.price.toLocaleString()} <span>/ person</span></> : <span style={{fontSize:11}}>Price TBD</span>}
                    </div>
                    <button className="dst-btn-delete" onClick={() => handleDelete(d.id)}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{width:11,height:11}}>
                        <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/>
                      </svg>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="dst-divider">
          <div className="dst-divider-line" />
          <span className="dst-divider-text">GhoomoSasteMe · Destinations</span>
          <div className="dst-divider-line" />
        </div>
      </div>
    </div>
  );
}