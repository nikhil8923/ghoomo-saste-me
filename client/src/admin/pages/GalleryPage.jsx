import React, { useState, useEffect } from 'react';
import { getGallery, addPhoto, deletePhoto } from '../adminApi';

// ✅ Matches actual Supabase columns: id, image_url, caption, created_at

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,700;1,500&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap');

  @keyframes gal-fadeUp {
    from { opacity:0; transform:translateY(18px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes gal-shimmer {
    0%   { left:-120%; }
    100% { left:200%; }
  }
  @keyframes gal-spin { to { transform:rotate(360deg); } }
  @keyframes gal-pop {
    0%   { opacity:0; transform:scale(0.94) translateY(10px); }
    100% { opacity:1; transform:scale(1) translateY(0); }
  }
  @keyframes gal-pulse {
    0%,100% { box-shadow:0 0 0 0 rgba(255,107,0,0.45); }
    60%      { box-shadow:0 0 0 7px rgba(255,107,0,0); }
  }

  .gal-wrap {
    font-family:'Plus Jakarta Sans',sans-serif;
    color:#1a0800;
    min-height:100vh;
    background:#fff7ed;
    padding:32px 28px 48px;
    box-sizing:border-box;
  }

  /* ── Page header ── */
  .gal-page-header {
    display:flex; align-items:flex-start; justify-content:space-between;
    gap:16px; flex-wrap:wrap;
    margin-bottom:32px;
    animation:gal-fadeUp 0.6s ease both;
  }

  .gal-title-block {}

  .gal-eyebrow {
    display:flex; align-items:center; gap:8px;
    font-size:9px; font-weight:600;
    color:#e8420a; letter-spacing:0.18em;
    text-transform:uppercase; margin-bottom:6px;
  }
  .gal-eyebrow::before {
    content:''; display:inline-block;
    width:16px; height:1.5px;
    background:#e8420a; border-radius:2px;
  }

  .gal-page-title {
    font-family:'Playfair Display',serif;
    font-size:clamp(26px,3vw,38px);
    font-weight:700; color:#1a0800;
    line-height:1.12; margin:0 0 4px;
  }
  .gal-page-title span { color:#e8420a; font-style:italic; }

  .gal-page-sub {
    font-size:12px; font-weight:300;
    color:#a08060; margin:0;
  }

  .gal-count-badge {
    display:flex; align-items:center; gap:7px;
    background:#fff;
    border:1.5px solid #f0e0d0;
    border-radius:999px;
    padding:8px 18px;
    font-size:12px; font-weight:600;
    color:#e8420a;
    box-shadow:0 2px 10px rgba(232,66,10,0.08);
    align-self:center;
    white-space:nowrap;
  }

  /* ── Cards ── */
  .gal-card {
    background:#ffffff;
    border-radius:20px;
    padding:32px 28px;
    margin-bottom:24px;
    box-shadow:
      0 2px 6px rgba(0,0,0,0.04),
      0 10px 32px rgba(232,66,10,0.09),
      0 28px 56px rgba(232,66,10,0.05);
    position:relative; overflow:hidden;
    animation:gal-fadeUp 0.65s ease both;
  }

  .gal-card:nth-child(2) { animation-delay:0.08s; }
  .gal-card:nth-child(3) { animation-delay:0.15s; }

  .gal-card-shimmer {
    position:absolute; top:0; left:-120%;
    width:55%; height:3px;
    background:linear-gradient(90deg,transparent,rgba(255,107,0,0.5),transparent);
    animation:gal-shimmer 3.4s ease infinite;
  }

  .gal-section-title {
    font-family:'Playfair Display',serif;
    font-size:16px; font-weight:700;
    color:#1a0800; margin-bottom:20px;
    display:flex; align-items:center; gap:8px;
  }
  .gal-section-icon {
    width:28px; height:28px; border-radius:8px;
    background:linear-gradient(135deg,#ff6b00,#e8420a);
    display:flex; align-items:center; justify-content:center;
    flex-shrink:0;
  }
  .gal-section-icon svg { width:14px; height:14px; stroke:#fff; }

  /* ── Alerts ── */
  .gal-alert {
    display:flex; align-items:center; gap:9px;
    border-radius:10px; padding:10px 14px;
    margin-bottom:18px; font-size:12px;
    animation:gal-fadeUp 0.3s ease both;
  }
  .gal-alert-error  { background:#fff3f0; border:1px solid #ffd0c0; color:#c0392b; }
  .gal-alert-success{ background:#f0fff4; border:1px solid #b2f5c8; color:#1a7a3a; }
  .gal-alert svg { width:14px; height:14px; flex-shrink:0; }

  /* ── Form fields ── */
  .gal-field { margin-bottom:16px; }

  .gal-label {
    font-size:10px; font-weight:600;
    color:#8a7060; letter-spacing:0.08em;
    text-transform:uppercase; display:block; margin-bottom:6px;
  }

  .gal-input-wrap { position:relative; }
  .gal-input-wrap svg {
    position:absolute; left:13px; top:50%; transform:translateY(-50%);
    width:14px; height:14px; color:#c0a898; pointer-events:none;
  }

  .gal-input {
    width:100%; box-sizing:border-box;
    padding:11px 13px 11px 38px;
    border:1.5px solid #f0e0d0; border-radius:10px;
    background:#fff9f5;
    font-family:'Plus Jakarta Sans',sans-serif;
    font-size:13px; color:#1a0800; outline:none;
    transition:border-color 0.2s, box-shadow 0.2s, background 0.2s;
  }
  .gal-input::placeholder { color:#d0b8a8; }
  .gal-input:focus {
    border-color:#e8420a;
    background:#ffffff;
    box-shadow:0 0 0 4px rgba(232,66,10,0.09);
  }

  /* preview */
  .gal-preview {
    width:100%; max-height:180px; object-fit:cover;
    border-radius:10px; margin-bottom:16px; display:block;
    border:1.5px solid #f0e0d0;
    animation:gal-pop 0.35s ease both;
  }

  /* ── Buttons ── */
  .gal-btn-primary {
    display:inline-flex; align-items:center; gap:7px;
    background:linear-gradient(135deg,#e8420a,#ff6b00,#ff9040);
    color:#fff; border:none; border-radius:10px;
    padding:11px 22px;
    font-family:'Plus Jakarta Sans',sans-serif;
    font-size:13px; font-weight:600; letter-spacing:0.04em;
    cursor:pointer;
    box-shadow:0 4px 16px rgba(232,66,10,0.30);
    transition:transform 0.15s, box-shadow 0.18s, opacity 0.18s;
    animation:gal-pulse 2.4s ease-out infinite;
  }
  .gal-btn-primary:hover:not(:disabled) {
    transform:translateY(-1.5px);
    box-shadow:0 8px 26px rgba(232,66,10,0.40);
  }
  .gal-btn-primary:active:not(:disabled) { transform:translateY(0); }
  .gal-btn-primary:disabled { opacity:0.6; cursor:not-allowed; animation:none; }

  .gal-btn-delete {
    display:inline-flex; align-items:center; gap:4px;
    background:rgba(232,66,10,0.07);
    color:#e8420a;
    border:1px solid rgba(232,66,10,0.25);
    border-radius:7px;
    padding:5px 10px;
    font-family:'Plus Jakarta Sans',sans-serif;
    font-size:11px; font-weight:600;
    cursor:pointer;
    transition:background 0.15s, border-color 0.15s, transform 0.12s;
  }
  .gal-btn-delete:hover {
    background:rgba(232,66,10,0.14);
    border-color:rgba(232,66,10,0.45);
    transform:scale(1.03);
  }

  .gal-spinner {
    width:13px; height:13px;
    border:2px solid rgba(255,255,255,0.3);
    border-top-color:#fff; border-radius:50%;
    animation:gal-spin 0.7s linear infinite;
  }

  /* ── Photo grid ── */
  .gal-grid {
    display:grid;
    grid-template-columns:repeat(auto-fill, minmax(160px,1fr));
    gap:16px;
  }

  .gal-photo-card {
    border-radius:14px; overflow:hidden;
    border:1.5px solid #f0e0d0;
    display:flex; flex-direction:column;
    background:#fff9f5;
    transition:transform 0.2s, box-shadow 0.2s;
    animation:gal-pop 0.45s ease both;
  }
  .gal-photo-card:hover {
    transform:translateY(-3px);
    box-shadow:0 12px 32px rgba(232,66,10,0.14);
  }

  .gal-photo-img {
    width:100%; height:130px; object-fit:cover;
    display:block;
    background:#f5e8d8;
  }

  .gal-photo-body {
    padding:10px 10px 10px;
    display:flex; flex-direction:column; gap:5px;
    flex:1;
  }

  .gal-photo-caption {
    font-size:11.5px; font-weight:500; color:#3a1800;
    overflow:hidden; text-overflow:ellipsis; white-space:nowrap;
  }

  .gal-photo-date {
    font-size:10px; color:#b09080; font-weight:300;
  }

  /* ── Empty state ── */
  .gal-empty {
    display:flex; flex-direction:column; align-items:center;
    padding:40px 20px; gap:12px;
    color:#c0a898; font-size:13px; font-weight:300;
    text-align:center;
  }
  .gal-empty-icon {
    width:52px; height:52px; border-radius:14px;
    background:#fff7ed; border:1.5px dashed #e0c8b0;
    display:flex; align-items:center; justify-content:center;
  }
  .gal-empty-icon svg { width:22px; height:22px; stroke:#d0a888; }

  /* ── Divider ── */
  .gal-divider {
    display:flex; align-items:center; gap:10px;
    margin:24px 0;
  }
  .gal-divider-line { flex:1; height:1px; background:#f0e8e0; }
  .gal-divider-text { font-size:9px; color:#c0a898; letter-spacing:0.1em; text-transform:uppercase; white-space:nowrap; }
`;

export default function GalleryPage() {
  const [photos, setPhotos] = useState([]);
  const [form, setForm] = useState({ image_url: '', caption: '' });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ type: '', text: '' });

  const load = async () => {
    const { data, error } = await getGallery();
    if (error) setMsg({ type: 'error', text: 'Failed to load: ' + error.message });
    else setPhotos(data || []);
  };

  useEffect(() => {
    const el = document.createElement('style');
    el.textContent = styles;
    document.head.appendChild(el);
    return () => document.head.removeChild(el);
  }, []);

  useEffect(() => { load(); }, []);

  const handleAdd = async () => {
    if (!form.image_url.trim()) return setMsg({ type: 'error', text: 'Image URL is required.' });
    setLoading(true);
    setMsg({ type: '', text: '' });
    const { error } = await addPhoto({
      image_url: form.image_url,
      caption: form.caption || null,
    });
    setLoading(false);
    if (error) setMsg({ type: 'error', text: 'Error: ' + error.message });
    else {
      setMsg({ type: 'success', text: 'Photo added successfully!' });
      setForm({ image_url: '', caption: '' });
      load();
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this photo?')) return;
    const { error } = await deletePhoto(id);
    if (error) setMsg({ type: 'error', text: 'Delete failed: ' + error.message });
    else { setMsg({ type: 'success', text: 'Photo removed.' }); load(); }
  };

  return (
    <div className="gal-wrap">

      {/* Page Header */}
      <div className="gal-page-header">
        <div className="gal-title-block">
          <div className="gal-eyebrow">Media Manager</div>
          <h1 className="gal-page-title">Travel <span>Gallery</span></h1>
          <p className="gal-page-sub">Upload &amp; manage destination photography</p>
        </div>
        <div className="gal-count-badge">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2"/>
            <circle cx="8.5" cy="8.5" r="1.5"/>
            <polyline points="21 15 16 10 5 21"/>
          </svg>
          {photos.length} photo{photos.length !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Add Photo Card */}
      <div className="gal-card">
        <div className="gal-card-shimmer" />
        <div className="gal-section-title">
          <div className="gal-section-icon">
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
          </div>
          Add New Photo
        </div>

        {msg.text && (
          <div className={`gal-alert ${msg.type === 'error' ? 'gal-alert-error' : 'gal-alert-success'}`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round">
              {msg.type === 'error'
                ? <><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></>
                : <><polyline points="20 6 9 17 4 12"/></>
              }
            </svg>
            {msg.text}
          </div>
        )}

        {/* Image URL */}
        <div className="gal-field">
          <label className="gal-label">Image URL *</label>
          <div className="gal-input-wrap">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
              strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21 15 16 10 5 21"/>
            </svg>
            <input
              className="gal-input"
              type="url"
              placeholder="https://example.com/photo.jpg"
              value={form.image_url}
              onChange={e => setForm({ ...form, image_url: e.target.value })}
            />
          </div>
        </div>

        {form.image_url && (
          <img src={form.image_url} alt="preview" className="gal-preview"
            onError={e => { e.target.style.display = 'none'; }} />
        )}

        {/* Caption */}
        <div className="gal-field">
          <label className="gal-label">Caption</label>
          <div className="gal-input-wrap">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
              strokeLinecap="round" strokeLinejoin="round">
              <line x1="17" y1="10" x2="3" y2="10"/>
              <line x1="21" y1="6" x2="3" y2="6"/>
              <line x1="21" y1="14" x2="3" y2="14"/>
              <line x1="17" y1="18" x2="3" y2="18"/>
            </svg>
            <input
              className="gal-input"
              placeholder="e.g. Triund Trek, McLeodGanj"
              value={form.caption}
              onChange={e => setForm({ ...form, caption: e.target.value })}
              onKeyDown={e => e.key === 'Enter' && handleAdd()}
            />
          </div>
        </div>

        <button className="gal-btn-primary" onClick={handleAdd} disabled={loading}>
          {loading ? (
            <><div className="gal-spinner" /> Uploading…</>
          ) : (
            <>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              Add Photo
            </>
          )}
        </button>
      </div>

      {/* Gallery Grid Card */}
      <div className="gal-card">
        <div className="gal-card-shimmer" />
        <div className="gal-section-title">
          <div className="gal-section-icon">
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
              <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
            </svg>
          </div>
          All Photos
        </div>

        {photos.length === 0 ? (
          <div className="gal-empty">
            <div className="gal-empty-icon">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <polyline points="21 15 16 10 5 21"/>
              </svg>
            </div>
            No photos yet — add your first destination shot above.
          </div>
        ) : (
          <div className="gal-grid">
            {photos.map((p, i) => (
              <div key={p.id} className="gal-photo-card"
                style={{ animationDelay: `${i * 0.04}s` }}>
                <img
                  src={p.image_url}
                  alt={p.caption || ''}
                  className="gal-photo-img"
                  onError={e => { e.target.style.minHeight = '60px'; }}
                />
                <div className="gal-photo-body">
                  {p.caption && <div className="gal-photo-caption" title={p.caption}>{p.caption}</div>}
                  <div className="gal-photo-date">
                    {new Date(p.created_at).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' })}
                  </div>
                  <button className="gal-btn-delete" onClick={() => handleDelete(p.id)}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6"/>
                      <path d="M19 6l-1 14H6L5 6"/>
                      <path d="M10 11v6M14 11v6"/>
                      <path d="M9 6V4h6v2"/>
                    </svg>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="gal-divider">
          <div className="gal-divider-line" />
          <span className="gal-divider-text">GhoomoSasteMe Gallery</span>
          <div className="gal-divider-line" />
        </div>
      </div>

    </div>
  );
}