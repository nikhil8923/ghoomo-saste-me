import React, { useState, useEffect } from 'react';
import { getBlogs, getGallery, getDestinations } from '../adminApi';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,500&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap');

  @keyframes gsm-ov-fadeUp {
    from { opacity:0; transform:translateY(16px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes gsm-ov-countUp {
    from { opacity:0; transform:translateY(8px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes gsm-ov-pulse {
    0%,100% { box-shadow:0 0 0 0 rgba(39,174,96,0.5); }
    60%      { box-shadow:0 0 0 6px rgba(39,174,96,0); }
  }

  .gsm-ov-root {
    font-family:'Plus Jakarta Sans',sans-serif;
    background:#fff7ed;
    min-height:100vh;
    padding:28px 28px;
  }

  /* TOP BAR */
  .gsm-ov-topbar {
    display:flex; align-items:center; justify-content:space-between;
    margin-bottom:28px;
    animation:gsm-ov-fadeUp 0.5s ease both;
  }

  .gsm-ov-topbar-left { display:flex; align-items:center; gap:12px; }

  .gsm-ov-brand-dot {
    width:40px; height:40px; border-radius:11px;
    background:linear-gradient(135deg,#e8420a,#ff8c38);
    display:flex; align-items:center; justify-content:center;
    flex-shrink:0;
  }

  .gsm-ov-brand-dot svg { width:20px; height:20px; }

  .gsm-ov-page-title {
    font-family:'Playfair Display',serif;
    font-size:22px; font-weight:700; color:#1a0800;
    line-height:1.1;
  }

  .gsm-ov-page-title span { font-style:italic; color:#e8420a; }

  .gsm-ov-page-sub {
    font-size:11px; color:#b09080; margin-top:2px; font-weight:300;
  }

  .gsm-ov-topbar-right { display:flex; align-items:center; gap:10px; }

  .gsm-ov-badge {
    display:flex; align-items:center; gap:6px;
    background:#ffffff; border:1px solid #f0d8c8;
    border-radius:999px; padding:6px 14px;
    font-size:11px; font-weight:500; color:#a06040;
  }

  .gsm-ov-live-dot {
    width:6px; height:6px; border-radius:50%; background:#27ae60;
    animation:gsm-ov-pulse 2.2s ease-out infinite;
  }

  /* STATS */
  .gsm-ov-stat-grid {
    display:grid; grid-template-columns:repeat(3,minmax(0,1fr));
    gap:14px; margin-bottom:20px;
    animation:gsm-ov-fadeUp 0.55s 0.07s ease both;
  }

  .gsm-ov-stat {
    background:#ffffff; border-radius:14px;
    padding:22px 20px; border:1px solid #f0e0d0;
    position:relative; overflow:hidden;
  }

  .gsm-ov-stat-bar {
    position:absolute; top:0; left:0; right:0; height:3px; border-radius:0;
  }

  .gsm-ov-stat.s-orange .gsm-ov-stat-bar { background:linear-gradient(90deg,#e8420a,#ff8c38); }
  .gsm-ov-stat.s-teal   .gsm-ov-stat-bar { background:linear-gradient(90deg,#0f6e56,#1d9e75); }
  .gsm-ov-stat.s-blue   .gsm-ov-stat-bar { background:linear-gradient(90deg,#185fa5,#378add); }

  .gsm-ov-stat-icon {
    width:38px; height:38px; border-radius:10px;
    display:flex; align-items:center; justify-content:center;
    margin-bottom:16px;
  }

  .gsm-ov-stat.s-orange .gsm-ov-stat-icon { background:#fff3ee; }
  .gsm-ov-stat.s-teal   .gsm-ov-stat-icon { background:#e1f5ee; }
  .gsm-ov-stat.s-blue   .gsm-ov-stat-icon { background:#e6f1fb; }

  .gsm-ov-stat-num {
    font-family:'Playfair Display',serif;
    font-size:40px; font-weight:700; color:#1a0800;
    line-height:1; margin-bottom:4px;
    animation:gsm-ov-countUp 0.6s 0.2s ease both;
  }

  .gsm-ov-stat-label {
    font-size:11px; font-weight:500; color:#a08070;
    letter-spacing:0.06em; text-transform:uppercase;
  }

  .gsm-ov-stat-trend {
    font-size:10px; color:#27ae60; margin-top:10px;
    display:flex; align-items:center; gap:3px;
  }

  /* TWO COL */
  .gsm-ov-two-col {
    display:grid; grid-template-columns:minmax(0,1.6fr) minmax(0,1fr);
    gap:14px;
    animation:gsm-ov-fadeUp 0.55s 0.13s ease both;
  }

  .gsm-ov-card {
    background:#ffffff; border-radius:14px;
    border:1px solid #f0e0d0; padding:20px 18px;
  }

  .gsm-ov-card-head {
    display:flex; align-items:center; justify-content:space-between;
    margin-bottom:16px;
  }

  .gsm-ov-card-title {
    font-size:13px; font-weight:600; color:#1a0800;
    display:flex; align-items:center; gap:7px;
  }

  .gsm-ov-view-all {
    font-size:10px; font-weight:500; color:#e8420a;
    letter-spacing:0.04em; text-transform:uppercase;
    cursor:pointer; background:none; border:none; padding:0;
    display:flex; align-items:center; gap:3px;
  }

  /* BLOG ITEMS */
  .gsm-ov-blog-item {
    display:flex; align-items:center; justify-content:space-between;
    padding:10px 12px; border-radius:9px;
    background:#fff9f5; border:1px solid #f5e8dc;
    margin-bottom:8px;
  }

  .gsm-ov-blog-item:last-child { margin-bottom:0; }

  .gsm-ov-blog-left { display:flex; align-items:center; gap:10px; }

  .gsm-ov-blog-num {
    width:26px; height:26px; border-radius:7px;
    background:#fff3ee; display:flex; align-items:center; justify-content:center;
    font-size:10px; font-weight:600; color:#e8420a; flex-shrink:0;
  }

  .gsm-ov-blog-title {
    font-size:12px; font-weight:500; color:#2a1000;
    white-space:nowrap; overflow:hidden; text-overflow:ellipsis;
    max-width:240px;
  }

  .gsm-ov-blog-date { font-size:10px; color:#b09080; margin-top:1px; }

  .gsm-ov-blog-pill {
    font-size:10px; font-weight:500; padding:3px 9px;
    border-radius:999px; background:#fff3ee;
    color:#c0390a; border:1px solid #f5d0c0; white-space:nowrap;
  }

  /* DEST ITEMS */
  .gsm-ov-dest-item {
    display:flex; align-items:center; justify-content:space-between;
    padding:10px 0; border-bottom:1px solid #f5ece4;
  }

  .gsm-ov-dest-item:last-child { border-bottom:none; }

  .gsm-ov-dest-left { display:flex; align-items:center; gap:9px; }

  .gsm-ov-dest-pin {
    width:30px; height:30px; border-radius:8px;
    background:#fff3ee; display:flex; align-items:center; justify-content:center;
  }

  .gsm-ov-dest-name { font-size:12px; font-weight:500; color:#2a1000; }
  .gsm-ov-dest-sub  { font-size:10px; color:#b09080; }

  .gsm-ov-dest-count {
    font-size:11px; font-weight:600; color:#0f6e56;
    background:#e1f5ee; border-radius:999px; padding:2px 10px;
  }

  /* EMPTY / LOADING */
  .gsm-ov-empty { font-size:12px; color:#b09080; padding:12px 0; }

  .gsm-ov-loading {
    display:flex; align-items:center; justify-content:center;
    min-height:200px; font-size:13px; color:#b09080;
  }

  @media (max-width:768px) {
    .gsm-ov-stat-grid { grid-template-columns:repeat(2,minmax(0,1fr)); }
    .gsm-ov-two-col   { grid-template-columns:minmax(0,1fr); }
    .gsm-ov-topbar    { flex-direction:column; align-items:flex-start; gap:12px; }
  }
`;

const MapIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.6"
    strokeLinecap="round" strokeLinejoin="round">
    <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/>
    <line x1="9" y1="3" x2="9" y2="18"/>
    <line x1="15" y1="6" x2="15" y2="21"/>
  </svg>
);

const TrendUpIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
    <polyline points="17 6 23 6 23 12"/>
  </svg>
);

const ArticleIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#e8420a"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
  </svg>
);

const PinIcon = ({ color = '#e8420a' }) => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={color}
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="10" r="3"/>
    <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 14 8 14s8-8.75 8-14a8 8 0 0 0-8-8z"/>
  </svg>
);

const ArrowRight = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
);

const StatIcons = {
  blogs: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#e8420a"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
    </svg>
  ),
  gallery: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0f6e56"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
      <polyline points="21 15 16 10 5 21"/>
    </svg>
  ),
  destinations: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#185fa5"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="10" r="3"/>
      <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 14 8 14s8-8.75 8-14a8 8 0 0 0-8-8z"/>
    </svg>
  ),
};

export default function OverviewPage() {
  const [stats, setStats] = useState({ blogs: 0, gallery: 0, destinations: 0 });
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const el = document.createElement('style');
    el.textContent = styles;
    document.head.appendChild(el);
    return () => document.head.removeChild(el);
  }, []);

  useEffect(() => {
    const load = async () => {
      const [b, g, d] = await Promise.all([getBlogs(), getGallery(), getDestinations()]);
      setStats({
        blogs: b.data?.length || 0,
        gallery: g.data?.length || 0,
        destinations: d.data?.length || 0,
      });
      setRecentBlogs((b.data || []).slice(0, 5));
      setLoading(false);
    };
    load();
  }, []);

  const statItems = [
    { key: 'blogs',        label: 'Blogs published',  value: stats.blogs,        colorClass: 's-orange', trend: '+3 this week'  },
    { key: 'gallery',      label: 'Gallery photos',    value: stats.gallery,      colorClass: 's-teal',   trend: '+12 this week' },
    { key: 'destinations', label: 'Destinations',      value: stats.destinations, colorClass: 's-blue',   trend: '+2 this month' },
  ];

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning,';
    if (h < 17) return 'Good afternoon,';
    return 'Good evening,';
  };

  if (loading) {
    return (
      <div className="gsm-ov-root">
        <div className="gsm-ov-loading">Loading your dashboard…</div>
      </div>
    );
  }

  return (
    <div className="gsm-ov-root">

      {/* TOP BAR */}
      <div className="gsm-ov-topbar">
        <div className="gsm-ov-topbar-left">
          <div className="gsm-ov-brand-dot"><MapIcon /></div>
          <div>
            <div className="gsm-ov-page-title">
              {greeting()} <span>Admin.</span>
            </div>
            <div className="gsm-ov-page-sub">
              Here's what's happening on GhoomoSasteMe today
            </div>
          </div>
        </div>
        <div className="gsm-ov-topbar-right">
          <div className="gsm-ov-badge">
            <div className="gsm-ov-live-dot" />
            Live
          </div>
          <div className="gsm-ov-badge">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
            Last synced just now
          </div>
        </div>
      </div>

      {/* STAT CARDS */}
      <div className="gsm-ov-stat-grid">
        {statItems.map(s => (
          <div key={s.key} className={`gsm-ov-stat ${s.colorClass}`}>
            <div className="gsm-ov-stat-bar" />
            <div className="gsm-ov-stat-icon">{StatIcons[s.key]}</div>
            <div className="gsm-ov-stat-num">{s.value}</div>
            <div className="gsm-ov-stat-label">{s.label}</div>
            <div className="gsm-ov-stat-trend">
              <TrendUpIcon />{s.trend}
            </div>
          </div>
        ))}
      </div>

      {/* TWO COLUMNS */}
      <div className="gsm-ov-two-col">

        {/* RECENT BLOGS */}
        <div className="gsm-ov-card">
          <div className="gsm-ov-card-head">
            <div className="gsm-ov-card-title">
              <ArticleIcon />
              Recent blogs
            </div>
            <button className="gsm-ov-view-all" type="button">
              View all <ArrowRight />
            </button>
          </div>

          {recentBlogs.length === 0 ? (
            <div className="gsm-ov-empty">No blogs published yet.</div>
          ) : (
            recentBlogs.map((b, i) => (
              <div key={b.id} className="gsm-ov-blog-item">
                <div className="gsm-ov-blog-left">
                  <div className="gsm-ov-blog-num">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div>
                    <div className="gsm-ov-blog-title">{b.title}</div>
                    <div className="gsm-ov-blog-date">
                      {new Date(b.created_at).toLocaleDateString('en-IN', {
                        day: 'numeric', month: 'short', year: 'numeric'
                      })}
                    </div>
                  </div>
                </div>
                <div className="gsm-ov-blog-pill">Published</div>
              </div>
            ))
          )}
        </div>

        {/* TOP DESTINATIONS — placeholder; wire to getDestinations() data as needed */}
        <div className="gsm-ov-card">
          <div className="gsm-ov-card-head">
            <div className="gsm-ov-card-title">
              <PinIcon />
              Top destinations
            </div>
            <button className="gsm-ov-view-all" type="button">
              All <ArrowRight />
            </button>
          </div>

          {[
            { name: 'Goa',     sub: 'Maharashtra coast', tours: 38 },
            { name: 'Manali',  sub: 'Himachal Pradesh',  tours: 29 },
            { name: 'Jaipur',  sub: 'Rajasthan',         tours: 22 },
            { name: 'Munnar',  sub: 'Kerala',             tours: 17 },
            { name: 'Leh',     sub: 'Ladakh',             tours: 14 },
          ].map(d => (
            <div key={d.name} className="gsm-ov-dest-item">
              <div className="gsm-ov-dest-left">
                <div className="gsm-ov-dest-pin"><PinIcon /></div>
                <div>
                  <div className="gsm-ov-dest-name">{d.name}</div>
                  <div className="gsm-ov-dest-sub">{d.sub}</div>
                </div>
              </div>
              <div className="gsm-ov-dest-count">{d.tours} tours</div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}