import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://iwlfokdsbfrpprxnzvju.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml3bGZva2RzYmZycHByeG56dmp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk1NjYxMjQsImV4cCI6MjA5NTE0MjEyNH0.TdBJ-z7EUn89W3bsU3-RyG1qUdGg6EQeIxOWaeLX_Mk'
);

const FALLBACKS = [
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',
  'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=800&q=80',
  'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80',
  'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=800&q=80',
  'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80',
];

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric'
  });
}

function readTime(content) {
  if (!content) return '1 min read';
  const mins = Math.max(1, Math.round(content.trim().split(/\s+/).length / 200));
  return `${mins} min read`;
}

function BlogCard({ blog, index }) {
  const img = blog.image_url || FALLBACKS[index % FALLBACKS.length];

  return (
    <div className="blog-card">
      <div className="blog-card-img-wrap">
        <img
          src={img}
          alt={blog.title}
          className="blog-card-img"
          onError={e => { e.target.src = FALLBACKS[index % FALLBACKS.length]; }}
        />
        <div className="blog-card-overlay" />
        <span className="blog-card-badge">{readTime(blog.content)}</span>
      </div>
      <div className="blog-card-body">
        <span className="blog-card-date">{formatDate(blog.created_at)}</span>
        <h3 className="blog-card-title">{blog.title}</h3>
        {blog.content && (
          <p className="blog-card-excerpt">{blog.content}</p>
        )}
        <div className="blog-card-readmore">
          Read More
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12 5 19 12 12 19"/>
          </svg>
        </div>
      </div>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="blog-skeleton">
      <div className="blog-skeleton-img" />
      <div className="blog-skeleton-body">
        <div className="blog-skeleton-line" style={{width:'40%', height:10}} />
        <div className="blog-skeleton-line" style={{width:'85%', height:18, marginTop:8}} />
        <div className="blog-skeleton-line" style={{width:'100%', height:12, marginTop:10}} />
        <div className="blog-skeleton-line" style={{width:'70%', height:12, marginTop:6}} />
      </div>
    </div>
  );
}

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Inject styles
    const styleEl = document.createElement('style');
    styleEl.id = 'blogs-page-styles';
    styleEl.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap');

      .blogs-page {
        background: #f8f9fa;
        min-height: 100vh;
        padding: 100px 16px 80px;
        font-family: 'DM Sans', sans-serif;
        box-sizing: border-box;
      }

      .blogs-inner {
        max-width: 1200px;
        margin: 0 auto;
      }

      /* ── Header ── */
      .blogs-header {
        margin-bottom: 40px;
      }
      .blogs-eyebrow {
        display: inline-flex;
        align-items: center;
        gap: 7px;
        background: #fff3ee;
        border: 1px solid #fdd0b0;
        border-radius: 999px;
        padding: 5px 14px;
        font-size: 10px;
        font-weight: 700;
        color: #e8420a;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        margin-bottom: 14px;
      }
      .blogs-eyebrow-dot {
        width: 6px; height: 6px;
        border-radius: 50%;
        background: #e8420a;
        flex-shrink: 0;
      }
      .blogs-title {
        font-family: 'Playfair Display', Georgia, serif;
        font-size: clamp(26px, 4vw, 42px);
        font-weight: 800;
        color: #111827;
        margin: 0 0 6px;
        line-height: 1.1;
        letter-spacing: -0.02em;
      }
      .blogs-subtitle {
        font-size: 14px;
        color: #6b7280;
        margin: 0;
        font-weight: 400;
      }
      .blogs-divider {
        height: 3px;
        background: linear-gradient(90deg, #e8420a, #ff9040, transparent);
        border-radius: 2px;
        margin-top: 22px;
      }

      /* ── Grid ── */
      .blogs-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 24px;
      }
      @media (max-width: 900px) {
        .blogs-grid { grid-template-columns: repeat(2, 1fr); gap: 16px; }
      }
      @media (max-width: 560px) {
        .blogs-grid { grid-template-columns: 1fr; gap: 16px; }
        .blogs-page { padding-top: 90px; }
      }

      /* ── Card ── */
      .blog-card {
        background: #ffffff;
        border-radius: 16px;
        overflow: hidden;
        box-shadow: 0 2px 12px rgba(0,0,0,0.06);
        transition: transform 0.28s ease, box-shadow 0.28s ease;
        display: flex;
        flex-direction: column;
        cursor: pointer;
      }
      .blog-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 18px 48px rgba(0,0,0,0.13);
      }

      .blog-card-img-wrap {
        position: relative;
        height: 210px;
        overflow: hidden;
        flex-shrink: 0;
      }
      @media (max-width: 560px) {
        .blog-card-img-wrap { height: 200px; }
      }

      .blog-card-img {
        width: 100%; height: 100%;
        object-fit: cover;
        display: block;
        transition: transform 0.5s ease;
      }
      .blog-card:hover .blog-card-img {
        transform: scale(1.06);
      }

      .blog-card-overlay {
        position: absolute; inset: 0;
        background: linear-gradient(to top, rgba(0,0,0,0.18), transparent 60%);
        pointer-events: none;
      }

      .blog-card-badge {
        position: absolute;
        top: 12px; right: 12px;
        background: rgba(0,0,0,0.48);
        backdrop-filter: blur(6px);
        color: #fff;
        font-size: 10px;
        font-weight: 600;
        padding: 4px 10px;
        border-radius: 999px;
        letter-spacing: 0.04em;
      }

      .blog-card-body {
        padding: 18px 20px 22px;
        display: flex;
        flex-direction: column;
        flex: 1;
      }

      .blog-card-date {
        font-size: 10px;
        font-weight: 700;
        color: #e8420a;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        margin-bottom: 8px;
      }

      .blog-card-title {
        font-family: 'Playfair Display', Georgia, serif;
        font-size: clamp(15px, 1.6vw, 18px);
        font-weight: 700;
        color: #111827;
        margin: 0 0 10px;
        line-height: 1.3;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        transition: color 0.2s;
      }
      .blog-card:hover .blog-card-title { color: #e8420a; }

      .blog-card-excerpt {
        font-size: 12px;
        color: #6b7280;
        line-height: 1.65;
        margin: 0 0 14px;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        flex: 1;
        font-weight: 400;
      }

      .blog-card-readmore {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 12px;
        font-weight: 700;
        color: #e8420a;
        margin-top: auto;
        transition: gap 0.2s;
      }
      .blog-card:hover .blog-card-readmore { gap: 10px; }

      /* ── Skeleton ── */
      .blog-skeleton {
        background: #fff;
        border-radius: 16px;
        overflow: hidden;
        box-shadow: 0 2px 12px rgba(0,0,0,0.05);
      }
      .blog-skeleton-img {
        height: 210px;
        background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
        background-size: 200% 100%;
        animation: shimmer 1.4s infinite;
      }
      .blog-skeleton-body { padding: 18px 20px 22px; }
      .blog-skeleton-line {
        border-radius: 6px;
        background: linear-gradient(90deg, #f0f0f0 25%, #e8e8e8 50%, #f0f0f0 75%);
        background-size: 200% 100%;
        animation: shimmer 1.4s infinite;
      }

      @keyframes shimmer {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
      }

      /* ── Empty ── */
      .blogs-empty {
        grid-column: 1/-1;
        text-align: center;
        padding: 72px 20px;
      }
      .blogs-empty-icon {
        width: 72px; height: 72px;
        border-radius: 20px;
        background: #fff3ee;
        border: 2px dashed #fdd0b0;
        display: flex; align-items: center; justify-content: center;
        margin: 0 auto 18px;
      }
      .blogs-empty h3 {
        font-size: 18px; font-weight: 700;
        color: #374151; margin: 0 0 8px;
        font-family: 'Playfair Display', serif;
      }
      .blogs-empty p {
        font-size: 13px; color: #9ca3af; margin: 0;
      }
    `;
    document.head.appendChild(styleEl);

    return () => {
      const el = document.getElementById('blogs-page-styles');
      if (el) el.remove();
    };
  }, []);

  useEffect(() => {
    supabase
      .from('blogs')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (!error) setBlogs(data || []);
        setLoading(false);
      });
  }, []);

  return (
    <div className="blogs-page">
      <div className="blogs-inner">

        {/* Header */}
        <div className="blogs-header">
          <div className="blogs-eyebrow">
            <span className="blogs-eyebrow-dot" />
            Travel Stories
          </div>
          <h1 className="blogs-title">Our Blog</h1>
          <p className="blogs-subtitle">
            {loading
              ? 'Loading stories…'
              : blogs.length === 0
              ? 'Stories coming soon'
              : `${blogs.length} stor${blogs.length === 1 ? 'y' : 'ies'} from the mountains & beyond`}
          </p>
          <div className="blogs-divider" />
        </div>

        {/* Grid */}
        <div className="blogs-grid">
          {loading && [1,2,3,4,5,6].map(i => <SkeletonCard key={i} />)}

          {!loading && blogs.length === 0 && (
            <div className="blogs-empty">
              <div className="blogs-empty-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
                  stroke="#e8420a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                </svg>
              </div>
              <h3>No stories yet</h3>
              <p>Check back soon for travel stories, tips and destination guides.</p>
            </div>
          )}

          {!loading && blogs.map((blog, i) => (
            <BlogCard key={blog.id} blog={blog} index={i} />
          ))}
        </div>

      </div>
    </div>
  );
}