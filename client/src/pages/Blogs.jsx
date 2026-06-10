import React, { useEffect, useState } from 'react';
import { supabase } from '../admin/supabaseClient';

function formatDate(d) {
  return new Date(d).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'long', year: 'numeric',
  });
}

function readTime(content = '') {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200)) + ' min read';
}

const CATEGORY_COLORS = {
  Adventure:   { bg: '#1B3FA0', text: '#fff' },
  Pilgrimage:  { bg: '#7C3D12', text: '#fff' },
  'Hidden Gems':{ bg: '#065F46', text: '#fff' },
  Community:   { bg: '#5B21B6', text: '#fff' },
  Backpacking: { bg: '#9D174D', text: '#fff' },
  General:     { bg: '#1f2937', text: '#fff' },
};
function catStyle(cat) {
  return CATEGORY_COLORS[cat] || CATEGORY_COLORS.General;
}

/* ── Full Article Modal ─────────────────────────────────────── */
function ArticleModal({ blog, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); };
  }, [onClose]);

  const cs = catStyle(blog.category || 'General');

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
        {/* Close */}
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        {/* Hero image */}
        {blog.image_url && (
          <div className="modal-hero">
            <img src={blog.image_url} alt={blog.title} className="modal-hero-img" />
            <div className="modal-hero-fade" />
          </div>
        )}

        <div className="modal-body">
          {/* Meta */}
          <div className="modal-meta-row">
            <span className="modal-cat-pill" style={{ background: cs.bg, color: cs.text }}>
              {blog.category || 'General'}
            </span>
            <span className="modal-date">{formatDate(blog.created_at)}</span>
            <span className="modal-rt">{readTime(blog.content)}</span>
          </div>

          {/* Title */}
          <h1 className="modal-title">{blog.title}</h1>

          {/* Divider */}
          <div className="modal-rule" />

          {/* Content */}
          <div className="modal-content">
            {(blog.content || '').split('\n').filter(Boolean).map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Blogs Page ─────────────────────────────────────────────── */
export default function Blogs() {
  const [blogs,   setBlogs]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [active,  setActive]  = useState(null);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false });
      setBlogs(data || []);
      setLoading(false);
    })();
  }, []);

  const [featured, ...rest] = blogs;

  return (
    <>
      <style>{CSS}</style>

      {active && <ArticleModal blog={active} onClose={() => setActive(null)} />}

      <section className="bl-section">
        <div className="bl-inner">

          {/* Header */}
          <div className="bl-header">
            <div className="bl-eyebrow">
              <span className="bl-eyebrow-line" />
              Our Journal
              <span className="bl-eyebrow-line" />
            </div>
            <h1 className="bl-title">Stories &amp; Insights</h1>
            <p className="bl-sub">Real journeys, honest experiences, practical travel guides</p>
          </div>

          {/* Loading */}
          {loading && (
            <div className="bl-loading">
              <div className="bl-spinner" />
              <span className="bl-loading-text">Loading articles</span>
            </div>
          )}

          {/* Empty */}
          {!loading && !blogs.length && (
            <div className="bl-empty">
              <div className="bl-empty-icon">✦</div>
              <h2 className="bl-empty-title">Articles coming soon</h2>
              <p className="bl-empty-sub">Check back soon for fresh stories and insights.</p>
            </div>
          )}

          {/* Featured */}
          {!loading && featured && (
            <article className="bl-featured" onClick={() => setActive(featured)}>
              <div className="bl-feat-img">
                {featured.image_url
                  ? <img src={featured.image_url} alt={featured.title} />
                  : <div className="bl-feat-placeholder"><span>✦</span></div>
                }
                <div className="bl-feat-img-overlay" />
                <span className="bl-feat-badge">Featured</span>
              </div>
              <div className="bl-feat-body">
                <div className="bl-feat-top">
                  <span className="bl-cat-pill" style={catStyle(featured.category || 'General')
                    ? { background: catStyle(featured.category || 'General').bg, color: catStyle(featured.category || 'General').text }
                    : {}}>
                    {featured.category || 'General'}
                  </span>
                  <span className="bl-feat-rt">{readTime(featured.content)}</span>
                </div>
                <h2 className="bl-feat-title">{featured.title}</h2>
                <p className="bl-feat-date">{formatDate(featured.created_at)}</p>
                <p className="bl-feat-excerpt">
                  {(featured.content || '').slice(0, 220)}{featured.content?.length > 220 ? '...' : ''}
                </p>
                <button className="bl-read-btn" onClick={(e) => { e.stopPropagation(); setActive(featured); }}>
                  Read Full Article
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
                    <line x1="5" y1="12" x2="19" y2="12"/>
                    <polyline points="12 5 19 12 12 19"/>
                  </svg>
                </button>
              </div>
            </article>
          )}

          {/* More articles */}
          {!loading && rest.length > 0 && (
            <>
              <div className="bl-section-label">
                <div className="bl-section-line" />
                <span>More Articles</span>
                <div className="bl-section-line" />
              </div>

              <div className="bl-grid">
                {rest.map((blog, i) => {
                  const cs = catStyle(blog.category || 'General');
                  return (
                    <article key={blog.id} className="bl-card" onClick={() => setActive(blog)}>
                      <div className="bl-card-img">
                        {blog.image_url
                          ? <img src={blog.image_url} alt={blog.title} />
                          : <div className="bl-card-placeholder"><span>✦</span></div>
                        }
                        <div className="bl-card-overlay" />
                        <span className="bl-card-cat-pill" style={{ background: cs.bg, color: cs.text }}>
                          {blog.category || 'General'}
                        </span>
                      </div>
                      <div className="bl-card-body">
                        <h3 className="bl-card-title">{blog.title}</h3>
                        <p className="bl-card-excerpt">
                          {(blog.content || '').slice(0, 100)}{blog.content?.length > 100 ? '...' : ''}
                        </p>
                        <div className="bl-card-footer">
                          <span className="bl-card-date">{formatDate(blog.created_at)}</span>
                          <button className="bl-card-read" onClick={(e) => { e.stopPropagation(); setActive(blog); }}>
                            Read
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                              strokeLinecap="round" strokeLinejoin="round" width="11" height="11">
                              <line x1="5" y1="12" x2="19" y2="12"/>
                              <polyline points="12 5 19 12 12 19"/>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </>
          )}

        </div>
      </section>
    </>
  );
}

/* ── Styles ─────────────────────────────────────────────────── */
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;900&family=DM+Sans:wght@300;400;500;600&display=swap');

  /* ── Section ── */
  .bl-section {
    background: #f9f7f4;
    padding: 4.5rem 0 5rem;
    padding-top: calc(160px + 3rem);
    font-family: 'DM Sans', sans-serif;
    min-height: 60vh;
  }
  .bl-inner {
    max-width: 1160px;
    margin: 0 auto;
    padding: 0 2.5rem;
  }

  /* ── Header ── */
  .bl-header {
    text-align: center;
    margin-bottom: 3rem;
  }
  .bl-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    font-size: 0.62rem;
    font-weight: 600;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #9a7c3a;
    margin-bottom: 1rem;
  }
  .bl-eyebrow-line {
    display: block;
    width: 32px;
    height: 1px;
    background: #c5a44a;
  }
  .bl-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 700;
    color: #111827;
    margin: 0 0 0.75rem;
    letter-spacing: -0.02em;
    line-height: 1.1;
  }
  .bl-sub {
    font-size: 0.9rem;
    color: #6b7280;
    font-weight: 300;
    margin: 0;
  }

  /* ── Loading ── */
  .bl-loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 5rem;
    gap: 1rem;
  }
  .bl-spinner {
    width: 30px; height: 30px;
    border: 1.5px solid #e8dfc4;
    border-top-color: #c5a44a;
    border-radius: 50%;
    animation: blspin 0.85s linear infinite;
  }
  @keyframes blspin { to { transform: rotate(360deg); } }
  .bl-loading-text {
    font-size: 0.65rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: #9a7c3a;
  }

  /* ── Empty ── */
  .bl-empty { text-align: center; padding: 5rem 2rem; }
  .bl-empty-icon { font-size: 2rem; color: #c5a44a; margin-bottom: 1rem; }
  .bl-empty-title { font-family: 'Playfair Display', serif; font-size: 1.4rem; color: #111827; margin-bottom: 0.5rem; }
  .bl-empty-sub { font-size: 0.85rem; color: #6b7280; }

  /* ── Featured ── */
  .bl-featured {
    display: grid;
    grid-template-columns: 1.1fr 1fr;
    background: #fff;
    border: 0.5px solid #e2d9c5;
    border-radius: 6px;
    overflow: hidden;
    margin-bottom: 3rem;
    cursor: pointer;
    transition: box-shadow 0.25s, transform 0.25s;
  }
  .bl-featured:hover {
    box-shadow: 0 12px 40px rgba(0,0,0,0.1);
    transform: translateY(-3px);
  }
  .bl-feat-img {
    position: relative;
    min-height: 360px;
    background: #0f2547;
    overflow: hidden;
  }
  .bl-feat-img img {
    position: absolute; inset: 0;
    width: 100%; height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  .bl-featured:hover .bl-feat-img img { transform: scale(1.04); }
  .bl-feat-img-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to right, rgba(10,25,60,0.35) 0%, transparent 60%);
    z-index: 1;
  }
  .bl-feat-badge {
    position: absolute; top: 18px; left: 18px; z-index: 2;
    font-size: 0.55rem; font-weight: 700; letter-spacing: 0.18em;
    text-transform: uppercase; color: #c5a44a;
    border: 0.5px solid #c5a44a;
    padding: 4px 10px; border-radius: 3px;
    background: rgba(0,0,0,0.35);
    backdrop-filter: blur(4px);
  }
  .bl-feat-placeholder {
    display: flex; align-items: center; justify-content: center;
    position: absolute; inset: 0;
    font-size: 2.5rem; color: rgba(197,164,74,0.25);
  }

  .bl-feat-body {
    padding: 2.5rem 2.5rem 2.5rem 2.2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-left: 0.5px solid #e2d9c5;
  }
  .bl-feat-top {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 1.1rem;
  }
  .bl-cat-pill {
    font-size: 0.55rem;
    font-weight: 700;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    padding: 4px 10px;
    border-radius: 3px;
  }
  .bl-feat-rt {
    font-size: 0.7rem;
    color: #9ca3af;
  }
  .bl-feat-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.25rem, 2.5vw, 1.65rem);
    font-weight: 700;
    color: #111827;
    line-height: 1.35;
    margin: 0 0 0.6rem;
    letter-spacing: -0.01em;
  }
  .bl-feat-date {
    font-size: 0.72rem;
    color: #9ca3af;
    margin: 0 0 1rem;
  }
  .bl-feat-excerpt {
    font-size: 0.85rem;
    color: #4b5563;
    line-height: 1.8;
    margin: 0 0 1.8rem;
    flex: 1;
  }
  .bl-read-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: #111827;
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 0.65rem 1.4rem;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    cursor: pointer;
    transition: background 0.2s, transform 0.15s;
    align-self: flex-start;
  }
  .bl-read-btn:hover { background: #1B3FA0; transform: translateX(2px); }

  /* ── Section label ── */
  .bl-section-label {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 2rem;
  }
  .bl-section-line { flex: 1; height: 0.5px; background: #d4c9b0; }
  .bl-section-label span {
    font-size: 0.6rem;
    font-weight: 700;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #9a7c3a;
    white-space: nowrap;
  }

  /* ── Grid ── */
  .bl-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
  }

  /* ── Card ── */
  .bl-card {
    background: #fff;
    border: 0.5px solid #e2d9c5;
    border-radius: 6px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    cursor: pointer;
    transition: box-shadow 0.25s, transform 0.25s;
  }
  .bl-card:hover {
    box-shadow: 0 8px 28px rgba(0,0,0,0.09);
    transform: translateY(-4px);
  }
  .bl-card-img {
    position: relative;
    height: 180px;
    background: #0f2547;
    overflow: hidden;
  }
  .bl-card-img img {
    width: 100%; height: 100%;
    object-fit: cover;
    transition: transform 0.45s ease;
  }
  .bl-card:hover .bl-card-img img { transform: scale(1.06); }
  .bl-card-overlay {
    position: absolute; inset: 0;
    background: rgba(10,25,60,0.28);
  }
  .bl-card-placeholder {
    display: flex; align-items: center; justify-content: center;
    height: 100%;
    font-size: 2rem;
    color: rgba(197,164,74,0.2);
  }
  .bl-card-cat-pill {
    position: absolute;
    bottom: 10px; left: 10px;
    font-size: 0.5rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    padding: 3px 8px;
    border-radius: 3px;
    z-index: 2;
  }
  .bl-card-body {
    padding: 1.25rem 1.25rem 1rem;
    flex: 1;
    display: flex;
    flex-direction: column;
    border-top: 0.5px solid #e8dfc4;
  }
  .bl-card-title {
    font-family: 'Playfair Display', serif;
    font-size: 1rem;
    font-weight: 600;
    color: #111827;
    line-height: 1.45;
    margin: 0 0 0.6rem;
  }
  .bl-card-excerpt {
    font-size: 0.78rem;
    color: #6b7280;
    line-height: 1.7;
    flex: 1;
    margin: 0 0 1rem;
  }
  .bl-card-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 0.75rem;
    border-top: 0.5px solid #f0e9d8;
  }
  .bl-card-date { font-size: 0.68rem; color: #9ca3af; }
  .bl-card-read {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 0.65rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #1B3FA0;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    transition: gap 0.18s;
  }
  .bl-card-read:hover { gap: 8px; }

  /* ── Modal backdrop ── */
  .modal-backdrop {
    position: fixed;
    inset: 0;
    z-index: 1000;
    background: rgba(7, 11, 23, 0.75);
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding: 2rem 1rem;
    overflow-y: auto;
    backdrop-filter: blur(4px);
    animation: fadeIn 0.2s ease;
  }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

  .modal-sheet {
    background: #fff;
    border-radius: 8px;
    width: 100%;
    max-width: 760px;
    overflow: hidden;
    position: relative;
    animation: slideUp 0.28s cubic-bezier(0.22,1,0.36,1);
    margin: auto;
  }
  @keyframes slideUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }

  .modal-close {
    position: absolute;
    top: 14px; right: 14px;
    z-index: 10;
    width: 36px; height: 36px;
    border-radius: 50%;
    background: rgba(0,0,0,0.5);
    border: none;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background 0.18s, transform 0.18s;
    backdrop-filter: blur(4px);
  }
  .modal-close:hover { background: rgba(0,0,0,0.8); transform: scale(1.08); }

  .modal-hero {
    position: relative;
    height: 280px;
    background: #0f2547;
    overflow: hidden;
  }
  .modal-hero-img {
    width: 100%; height: 100%;
    object-fit: cover;
  }
  .modal-hero-fade {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 80px;
    background: linear-gradient(to bottom, transparent, #fff);
  }

  .modal-body { padding: 2rem 2.5rem 2.5rem; }

  .modal-meta-row {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 1.1rem;
    flex-wrap: wrap;
  }
  .modal-cat-pill {
    font-size: 0.55rem;
    font-weight: 700;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    padding: 4px 10px;
    border-radius: 3px;
  }
  .modal-date, .modal-rt {
    font-size: 0.72rem;
    color: #9ca3af;
  }
  .modal-date::before { content: '·'; margin-right: 8px; color: #d1d5db; }

  .modal-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.5rem, 3.5vw, 2.1rem);
    font-weight: 700;
    color: #111827;
    line-height: 1.25;
    letter-spacing: -0.02em;
    margin: 0 0 1.2rem;
  }

  .modal-rule {
    height: 1px;
    background: linear-gradient(to right, #c5a44a 0%, #e2d9c5 50%, transparent 100%);
    margin-bottom: 1.5rem;
  }

  .modal-content p {
    font-size: 0.95rem;
    color: #374151;
    line-height: 1.85;
    margin: 0 0 1.2rem;
    font-family: Georgia, serif;
  }
  .modal-content p:last-child { margin-bottom: 0; }

  /* ── Responsive ── */
  @media (max-width: 768px) {
    .bl-inner { padding: 0 1.25rem; }
    .bl-section { padding: 3rem 0 3.5rem; padding-top: calc(140px + 2rem); }
    .bl-featured { grid-template-columns: 1fr; }
    .bl-feat-img { min-height: 220px; }
    .bl-feat-body { padding: 1.5rem; border-left: none; border-top: 0.5px solid #e2d9c5; }
    .bl-feat-title { font-size: 1.2rem; }
    .bl-grid { grid-template-columns: 1fr; gap: 1.1rem; }
    .modal-body { padding: 1.5rem; }
    .modal-hero { height: 200px; }
    .modal-title { font-size: 1.4rem; }
  }
  @media (max-width: 480px) {
    .bl-inner { padding: 0 1rem; }
    .bl-title { font-size: 1.6rem; }
    .modal-backdrop { padding: 1rem 0.5rem; }
  }
`;