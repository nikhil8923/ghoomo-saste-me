import React, { useState, useEffect, useRef } from "react";

/* ─── Instagram embed URL builder ─────────────────────────── */
const getEmbedUrl = (url, muted) => {
  const base = url.endsWith("/") ? url : `${url}/`;
  return `${base}embed/?autoplay=1&muted=${muted ? 1 : 0}`;
};

/* ─── Reel data ────────────────────────────────────────────── */
const REELS = [
  { id: 1, url: "https://www.instagram.com/reel/DYHzwTyRxXr/", caption: "Hampta Pass Trek",  tag: "Adventure"   },
  { id: 2, url: "https://www.instagram.com/reel/DX9PJLMxEhm/", caption: "Client Feedback",   tag: "Community"   },
  { id: 3, url: "https://www.instagram.com/reel/DX1xiEbxkjY/", caption: "Jibhi Valley",       tag: "Hidden Gems" },
  { id: 4, url: "https://www.instagram.com/reel/DXtrsmnEVnE/", caption: "Do Dham Yatra",      tag: "Pilgrimage"  },
  { id: 5, url: "https://www.instagram.com/reel/DXmT65NxDcn/", caption: "Kasol Diaries",      tag: "Backpacking" },
];

/* ─── Single Reel Card ─────────────────────────────────────── */
const ReelCard = ({ reel, index, globalMuted, isVisible }) => {
  const [loaded, setLoaded] = useState(false);
  const [src, setSrc]       = useState("");

  useEffect(() => {
    if (isVisible) setSrc(getEmbedUrl(reel.url, globalMuted));
  }, [isVisible]);

  useEffect(() => {
    if (isVisible && src) setSrc(getEmbedUrl(reel.url, globalMuted));
  }, [globalMuted]);

  return (
    <div className="reel-card" style={{ "--delay": `${index * 0.07}s` }}>
      <div className="card-accent-top" />
      <div className="reel-gradient" />

      {!loaded && (
        <div className="reel-skeleton">
          <div className="skeleton-shimmer" />
          <div className="skeleton-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none"/>
            </svg>
          </div>
          <p className="skeleton-label">{reel.caption}</p>
        </div>
      )}

      {src && (
        <iframe
          src={src}
          className="reel-iframe"
          style={{ opacity: loaded ? 1 : 0 }}
          frameBorder="0"
          scrolling="no"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          title={`Ghoomo Reel — ${reel.caption}`}
          onLoad={() => setLoaded(true)}
        />
      )}

      <div className="reel-tag">{reel.tag}</div>

      <div className="reel-caption">
        <span className="reel-caption-dot" />
        <span>{reel.caption}</span>
      </div>

      <div className="reel-number">{String(index + 1).padStart(2, "0")}</div>
    </div>
  );
};

/* ─── Main Reels Section ───────────────────────────────────── */
const Reels = () => {
  const [shuffled,    setShuffled]    = useState([]);
  const [muted,       setMuted]       = useState(true);
  const [isVisible,   setIsVisible]   = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef(null);
  const trackRef   = useRef(null);

  useEffect(() => {
    setShuffled([...REELS].sort(() => Math.random() - 0.5));
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const cardWidth = track.firstChild?.offsetWidth || 200;
      const gap = 16;
      const idx = Math.round(track.scrollLeft / (cardWidth + gap));
      setActiveIndex(Math.min(Math.max(idx, 0), shuffled.length - 1));
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, [shuffled]);

  const scrollTo = (idx) => {
    const track = trackRef.current;
    if (!track) return;
    const cardWidth = track.firstChild?.offsetWidth || 200;
    const gap = 16;
    track.scrollTo({ left: idx * (cardWidth + gap), behavior: "smooth" });
    setActiveIndex(idx);
  };

  const prev = () => scrollTo(Math.max(0, activeIndex - 1));
  const next = () => scrollTo(Math.min(shuffled.length - 1, activeIndex + 1));

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');

        :root {
          --yellow:     #FFD000;
          --yellow-lt:  #FFF3A3;
          --yellow-dim: rgba(255,208,0,0.12);
          --yellow-bdr: rgba(255,208,0,0.30);
          --blue:       #1B3FA0;
          --blue-lt:    #2F5FD4;
          --blue-dim:   rgba(27,63,160,0.15);
          --red:        #E8192C;
          --white:      #FFFFFF;
          --ink:        #080C18;
          --ink-2:      #0D1220;
          --ink-3:      #111826;
          --text-muted: rgba(255,255,255,0.40);
          --shadow:     0 20px 50px rgba(0,0,0,0.4), 0 4px 14px rgba(0,0,0,0.25);
        }

        /* ── Section ── */
        .reels-section {
          position: relative;
          padding: 3rem 0 2.5rem;
          background: var(--ink);
          overflow: hidden;
          font-family: 'DM Sans', sans-serif;
        }
        .reels-section::before {
          content: '';
          position: absolute;
          top: -60px; right: -80px;
          width: 480px; height: 480px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(27,63,160,0.18) 0%, transparent 65%);
          pointer-events: none; z-index: 0;
        }
        .reels-section::after {
          content: '';
          position: absolute;
          bottom: -40px; left: -60px;
          width: 320px; height: 320px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255,208,0,0.08) 0%, transparent 65%);
          pointer-events: none; z-index: 0;
        }

        .reels-inner {
          position: relative; z-index: 1;
          max-width: 1360px; margin: 0 auto; padding: 0 2rem;
        }

        /* ── Header ── */
        .reels-header {
          display: flex; align-items: flex-end; justify-content: space-between;
          gap: 1.5rem; margin-bottom: 1.5rem; flex-wrap: wrap;
        }

        .reels-eyebrow {
          display: inline-flex; align-items: center; gap: 0.5rem;
          margin-bottom: 0.6rem;
        }
        .eyebrow-pill {
          background: var(--blue); color: var(--white);
          font-size: 0.6rem; font-weight: 600; letter-spacing: 0.18em; text-transform: uppercase;
          padding: 3px 10px; border-radius: 999px;
        }
        .eyebrow-badge {
          display: flex; align-items: center; gap: 0.3rem;
          color: var(--yellow); font-size: 0.62rem; font-weight: 500;
          letter-spacing: 0.10em; text-transform: uppercase;
        }
        .live-dot {
          width: 6px; height: 6px; border-radius: 50%; background: var(--red);
          animation: pulse-red 1.5s ease-in-out infinite;
        }
        @keyframes pulse-red {
          0%,100% { box-shadow: 0 0 0 0 rgba(232,25,44,0.6); }
          50%      { box-shadow: 0 0 0 6px rgba(232,25,44,0); }
        }

        .reels-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.8rem, 4vw, 3rem);
          font-weight: 900; color: var(--white);
          line-height: 1.05; letter-spacing: -0.02em; margin: 0 0 0.4rem;
        }
        .reels-title em { font-style: italic; color: var(--yellow); }

        .reels-subtitle {
          color: var(--text-muted); font-size: 0.82rem; font-weight: 300; letter-spacing: 0.02em;
        }
        .reels-subtitle strong { color: rgba(255,255,255,0.75); font-weight: 500; }

        /* ── Mute button ── */
        .mute-btn {
          display: flex; align-items: center; gap: 0.4rem;
          background: transparent; color: var(--white);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 999px; padding: 0.45rem 1rem;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.75rem; font-weight: 500; letter-spacing: 0.05em;
          cursor: pointer; transition: all 0.2s; white-space: nowrap; flex-shrink: 0;
        }
        .mute-btn:hover {
          background: rgba(255,255,255,0.08);
          border-color: rgba(255,255,255,0.4);
          transform: translateY(-1px);
        }
        .mute-btn svg { width: 13px; height: 13px; }

        /* ── Divider ── */
        .reels-rule {
          width: 100%; height: 1px;
          background: linear-gradient(to right,
            transparent,
            rgba(27,63,160,0.5) 25%,
            rgba(255,208,0,0.3) 50%,
            rgba(27,63,160,0.5) 75%,
            transparent);
          margin-bottom: 1.5rem;
        }

        /* ── Track ── */
        .reels-track {
          display: flex; gap: 1rem;
          overflow-x: auto;
          padding: 0.4rem 0.25rem 1.2rem;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none; cursor: grab;
        }
        .reels-track:active { cursor: grabbing; }
        .reels-track::-webkit-scrollbar { display: none; }

        /* ── Card ── */
        .reel-card {
          position: relative;
          min-width: 200px; width: 200px;
          aspect-ratio: 9/16;
          border-radius: 16px;
          overflow: hidden;
          scroll-snap-align: start;
          flex-shrink: 0;
          background: var(--ink-2);
          box-shadow: var(--shadow);
          border: 1px solid rgba(255,255,255,0.07);
          transition: transform 0.35s cubic-bezier(0.22,1,0.36,1),
                      box-shadow 0.35s cubic-bezier(0.22,1,0.36,1),
                      border-color 0.25s;
          animation: card-rise 0.55s cubic-bezier(0.22,1,0.36,1) var(--delay,0s) both;
        }
        @keyframes card-rise {
          from { opacity: 0; transform: translateY(24px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .reel-card:hover {
          transform: translateY(-6px) scale(1.02);
          box-shadow: 0 36px 70px rgba(0,0,0,0.5),
                      0 0 0 1px rgba(255,208,0,0.25),
                      0 8px 20px rgba(27,63,160,0.2);
          border-color: rgba(255,208,0,0.3);
        }

        /* Brand accent stripe */
        .card-accent-top {
          position: absolute; top: 0; left: 0; right: 0;
          height: 3px; z-index: 5;
          background: linear-gradient(to right, var(--blue), var(--yellow), var(--red));
        }

        .reel-gradient {
          position: absolute; inset: 0; z-index: 2; border-radius: 16px;
          background: linear-gradient(to bottom,
            rgba(0,0,0,0.08) 0%,
            transparent 22%,
            transparent 42%,
            rgba(0,0,0,0.55) 70%,
            rgba(5,10,25,0.92) 100%);
          pointer-events: none;
        }

        /* ── Skeleton ── */
        .reel-skeleton {
          position: absolute; inset: 0; z-index: 1;
          background: linear-gradient(145deg, #0e1525 0%, #080c18 100%);
          display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.8rem;
        }
        .skeleton-shimmer {
          position: absolute; inset: 0;
          background: linear-gradient(105deg, transparent 35%, rgba(27,63,160,0.08) 50%, transparent 65%);
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
        }
        @keyframes shimmer {
          0%   { background-position: -200% 0; }
          100% { background-position:  200% 0; }
        }
        .skeleton-icon {
          color: rgba(255,208,0,0.3); z-index: 2;
          animation: sk-pulse 1.8s ease-in-out infinite;
        }
        .skeleton-icon svg { width: 36px; height: 36px; }
        @keyframes sk-pulse { 0%,100% { opacity: 0.3; } 50% { opacity: 0.8; } }
        .skeleton-label {
          z-index: 2; color: rgba(255,255,255,0.25);
          font-size: 0.65rem; font-weight: 400; letter-spacing: 0.1em; text-transform: uppercase; margin: 0;
        }

        .reel-iframe {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          border: none; border-radius: 16px;
          transition: opacity 0.4s ease; z-index: 2;
        }

        /* ── Tag ── */
        .reel-tag {
          position: absolute; top: 14px; left: 10px; z-index: 5;
          background: var(--blue); color: var(--white);
          font-size: 0.55rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase;
          padding: 3px 8px; border-radius: 4px;
        }

        /* ── Caption ── */
        .reel-caption {
          position: absolute; bottom: 10px; left: 10px; right: 10px; z-index: 5;
          display: flex; align-items: center; gap: 0.35rem;
          color: rgba(255,255,255,0.88); font-size: 0.7rem; font-weight: 500; letter-spacing: 0.01em;
        }
        .reel-caption-dot {
          width: 4px; height: 4px; border-radius: 50%;
          background: var(--yellow); flex-shrink: 0;
        }

        /* ── Number ── */
        .reel-number {
          position: absolute; bottom: 28px; right: 8px; z-index: 4;
          font-family: 'Playfair Display', serif;
          font-size: 1.8rem; font-weight: 700; color: rgba(255,255,255,0.05);
          line-height: 1; user-select: none;
        }

        /* ── Controls ── */
        .reels-controls {
          display: flex; align-items: center; justify-content: center;
          gap: 1rem; margin-top: 1.2rem;
        }
        .ctrl-btn {
          width: 34px; height: 34px; border-radius: 50%;
          border: 1px solid rgba(255,208,0,0.25);
          background: rgba(27,63,160,0.15); color: var(--yellow);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: all 0.2s; flex-shrink: 0;
        }
        .ctrl-btn:hover { background: var(--blue); border-color: var(--blue-lt); transform: scale(1.1); }
        .ctrl-btn:disabled { opacity: 0.2; cursor: not-allowed; transform: none; }
        .ctrl-btn svg { width: 14px; height: 14px; }

        .dots { display: flex; align-items: center; gap: 0.4rem; }
        .dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: rgba(255,255,255,0.2);
          border: none; cursor: pointer; padding: 0;
          transition: all 0.22s;
        }
        .dot.active { background: var(--yellow); transform: scale(1.5); }
        .dot:hover:not(.active) { background: rgba(255,208,0,0.4); }

        /* ── Footer ── */
        .reels-footer {
          display: flex; align-items: center; justify-content: space-between;
          flex-wrap: wrap; gap: 0.75rem;
          margin-top: 1.5rem; padding-top: 1.2rem;
          border-top: 1px solid rgba(255,255,255,0.06);
        }
        .footer-left { display: flex; align-items: center; gap: 0.6rem; }
        .footer-brand {
          font-family: 'Playfair Display', serif;
          color: var(--white); font-size: 1rem; font-weight: 700; letter-spacing: 0.02em;
        }
        .footer-brand span { color: var(--yellow); }
        .footer-sep { color: rgba(255,255,255,0.15); font-size: 1rem; }
        .footer-tagline {
          color: var(--text-muted); font-size: 0.7rem;
          letter-spacing: 0.08em; text-transform: uppercase;
        }
        .footer-ig-btn {
          display: flex; align-items: center; gap: 0.4rem;
          background: linear-gradient(135deg, #405DE6, #5851DB, #833AB4, #C13584, #E1306C, #FD1D1D);
          color: white; border: none; border-radius: 999px;
          padding: 0.4rem 1rem;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.72rem; font-weight: 600; letter-spacing: 0.05em;
          cursor: pointer; transition: opacity 0.2s, transform 0.15s;
        }
        .footer-ig-btn:hover { opacity: 0.88; transform: translateY(-1px); }
        .footer-ig-btn svg { width: 13px; height: 13px; }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .reels-section  { padding: 2rem 0 2rem; }
          .reels-inner    { padding: 0 1rem; }
          .reels-header   { margin-bottom: 1.2rem; }
          .reels-title    { font-size: clamp(1.5rem, 6vw, 2rem); }
          .reel-card      { min-width: 44vw; width: 44vw; border-radius: 12px; }
          .reels-track    { gap: 0.7rem; padding: 0.3rem 0.15rem 1rem; }
          .reels-footer   { flex-direction: column; align-items: flex-start; gap: 0.6rem; }
        }
        @media (max-width: 480px) {
          .reels-inner { padding: 0 0.75rem; }
          .reel-card   { min-width: 52vw; width: 52vw; border-radius: 10px; }
          .ctrl-btn    { width: 30px; height: 30px; }
          .mute-btn    { padding: 0.38rem 0.75rem; font-size: 0.7rem; }
        }
        @media (max-width: 360px) {
          .reel-card { min-width: 60vw; width: 60vw; }
        }
      `}</style>

      <section className="reels-section" ref={sectionRef}>
        <div className="reels-inner">

          {/* Header */}
          <div className="reels-header">
            <div>
              <div className="reels-eyebrow">
                <span className="eyebrow-pill">Ghoomo Community</span>
                <span className="eyebrow-badge">
                  <span className="live-dot" /> Live Reels
                </span>
              </div>
              <h2 className="reels-title">
                Fuel Your<br /><em>Wanderlust</em>
              </h2>
              <p className="reels-subtitle">
                Join <strong>5K+ explorers</strong> in the Ghoomo travel community
              </p>
            </div>

            <button
              className="mute-btn"
              onClick={() => setMuted((m) => !m)}
              aria-label={muted ? "Unmute reels" : "Mute reels"}
            >
              {muted ? (
                <>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                    <line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/>
                  </svg>
                  Unmute
                </>
              ) : (
                <>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
                  </svg>
                  Mute
                </>
              )}
            </button>
          </div>

          <div className="reels-rule" />

          {/* Carousel */}
          <div ref={trackRef} className="reels-track">
            {shuffled.map((reel, i) => (
              <ReelCard
                key={reel.id}
                reel={reel}
                index={i}
                globalMuted={muted}
                isVisible={isVisible}
              />
            ))}
          </div>

          {/* Controls: arrows + dots */}
          <div className="reels-controls">
            <button className="ctrl-btn" onClick={prev} disabled={activeIndex === 0} aria-label="Previous reel">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
            </button>

            <div className="dots">
              {shuffled.map((_, i) => (
                <button
                  key={i}
                  className={`dot${i === activeIndex ? " active" : ""}`}
                  onClick={() => scrollTo(i)}
                  aria-label={`Go to reel ${i + 1}`}
                />
              ))}
            </div>

            <button className="ctrl-btn" onClick={next} disabled={activeIndex === shuffled.length - 1} aria-label="Next reel">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button>
          </div>

          {/* Footer */}
          <div className="reels-footer">
            <div className="footer-left">
              <span className="footer-brand">Ghoo<span>mo</span></span>
              <span className="footer-sep">·</span>
              <span className="footer-tagline">Real Journeys, Real People</span>
            </div>
            <button className="footer-ig-btn" onClick={() => window.open("https://www.instagram.com/ghoomo_saste_me/", "_blank")}>
              <svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
              Follow @ghoomo_saste_me
            </button>
          </div>

        </div>
      </section>
    </>
  );
};

export default Reels;