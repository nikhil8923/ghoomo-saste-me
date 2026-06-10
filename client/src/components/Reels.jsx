import React, { useState, useEffect, useRef } from "react";

/* ─── Reel data ──────────────────────────────────────────────────────────────
   videoSrc : path to your .mp4 inside client/public/
   poster   : thumbnail shown before video loads (optional)
   caption  : bottom label
   tag      : category pill
────────────────────────────────────────────────────────────────────────────── */
const REELS = [
  { id: 1, videoSrc: "/kedar1.mp4",     caption: "Kedarnath", tag: "Yatra"   },
  { id: 2, videoSrc: "/client1.mp4",     caption: "Explore",   tag: "Community"   },
  { id: 3, videoSrc: "/man-roh.mp4",     caption: "Manali-Rohtang",     tag: "Manali" },
  { id: 4, videoSrc: "/do-dham.mp4",        poster: "/do-dham.jpg",        caption: "Do Dham Yatra",    tag: "Pilgrimage"  },
  { id: 5, videoSrc: "/kedar2.mp4",                caption: "Kedarnath Dham",    tag: "Trek" },
];

/* ── SVG icons ── */
const IconMuted = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" width="15" height="15">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
    <line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/>
  </svg>
);
const IconUnmuted = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" width="15" height="15">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
  </svg>
);
const IconPlay = () => (
  <svg viewBox="0 0 24 24" fill="white" width="28" height="28">
    <polygon points="6 4 20 12 6 20 6 4"/>
  </svg>
);
const IconPause = () => (
  <svg viewBox="0 0 24 24" fill="white" width="28" height="28">
    <rect x="5" y="4" width="4" height="16" rx="1"/>
    <rect x="15" y="4" width="4" height="16" rx="1"/>
  </svg>
);
const IconIG = () => (
  <svg viewBox="0 0 24 24" fill="white" width="13" height="13">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);

/* ─── Single Reel Card ───────────────────────────────────────────────────── */
const ReelCard = ({ reel, index, isVisible }) => {
  const videoRef  = useRef(null);
  const cardRef   = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [muted,   setMuted]   = useState(true);
  const [hovered, setHovered] = useState(false);

  /* auto-play / pause on scroll visibility */
  useEffect(() => {
    if (!isVisible) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoRef.current?.play().catch(() => {});
          setPlaying(true);
        } else {
          videoRef.current?.pause();
          setPlaying(false);
        }
      },
      { threshold: 0.5 }
    );
    if (cardRef.current) obs.observe(cardRef.current);
    return () => obs.disconnect();
  }, [isVisible]);

  const togglePlay = (e) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); }
    else          { v.pause(); setPlaying(false); }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  return (
    <div
      className="reel-card"
      ref={cardRef}
      style={{ "--delay": `${index * 0.08}s` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Video */}
      <video
        ref={videoRef}
        className="reel-video"
        src={reel.videoSrc}
        poster={reel.poster}
        loop playsInline muted preload="metadata"
      />

      {/* Gradient overlay */}
      <div className="reel-mask" />

      {/* Top row: tag + mute btn */}
      <div className="reel-top-row">
        <div className="reel-tag">{reel.tag}</div>
        <button className="reel-icon-btn" onClick={toggleMute} aria-label="Toggle mute">
          {muted ? <IconMuted /> : <IconUnmuted />}
        </button>
      </div>

      {/* Centre play/pause — shows on hover or when paused */}
      <button
        className={`reel-play-btn${!playing || hovered ? " visible" : ""}`}
        onClick={togglePlay}
        aria-label={playing ? "Pause" : "Play"}
      >
        {playing ? <IconPause /> : <IconPlay />}
      </button>

      {/* Bottom: caption + index */}
      <div className="reel-bottom">
        <div className="reel-caption">
          <span className="reel-caption-dot" />
          <span>{reel.caption}</span>
        </div>
        <div className="reel-index">{String(index + 1).padStart(2, "0")}</div>
      </div>

      {/* Progress bar while playing */}
      <div className={`reel-progress-bar${playing ? " playing" : ""}`} />
    </div>
  );
};

/* ─── Main Section ───────────────────────────────────────────────────────── */
const Reels = () => {
  const [isVisible,   setIsVisible]   = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef(null);
  const trackRef   = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const card = track.firstChild;
      if (!card) return;
      const cardW = card.offsetWidth;
      const gap   = parseInt(getComputedStyle(track).gap) || 16;
      const idx   = Math.round(track.scrollLeft / (cardW + gap));
      setActiveIndex(Math.min(Math.max(idx, 0), REELS.length - 1));
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (idx) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.firstChild;
    if (!card) return;
    const cardW = card.offsetWidth;
    const gap   = parseInt(getComputedStyle(track).gap) || 16;
    track.scrollTo({ left: idx * (cardW + gap), behavior: "smooth" });
    setActiveIndex(idx);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');

        :root {
          --yellow:  #FFD000;
          --blue:    #1B3FA0;
          --blue-lt: #2F5FD4;
          --red:     #E8192C;
          --white:   #FFFFFF;
          --ink:     #070B17;
          --ink-2:   #0C1122;
          --ink-3:   #111827;
          --muted:   rgba(255,255,255,0.38);
        }

        /* ── Section ── */
        .rs { position:relative; padding:5rem 0 4rem; background:var(--ink); overflow:hidden; font-family:'DM Sans',sans-serif; }

        /* decorative blobs */
        .rs-blob-1 { position:absolute; top:-120px; right:-100px; width:600px; height:600px; border-radius:50%;
          background:radial-gradient(circle, rgba(27,63,160,0.14) 0%, transparent 65%); pointer-events:none; z-index:0; }
        .rs-blob-2 { position:absolute; bottom:-80px; left:-80px; width:400px; height:400px; border-radius:50%;
          background:radial-gradient(circle, rgba(255,208,0,0.07) 0%, transparent 65%); pointer-events:none; z-index:0; }
        .rs-blob-3 { position:absolute; top:40%; left:40%; width:300px; height:300px; border-radius:50%;
          background:radial-gradient(circle, rgba(232,25,44,0.05) 0%, transparent 65%); pointer-events:none; z-index:0; }

        .rs-inner { position:relative; z-index:1; max-width:1400px; margin:0 auto; padding:0 3rem; }

        /* ── Header ── */
        .rs-header { display:flex; align-items:flex-end; justify-content:space-between; gap:2rem; margin-bottom:2.5rem; flex-wrap:wrap; }

        .rs-left {}
        .rs-eyebrow { display:inline-flex; align-items:center; gap:0.5rem; margin-bottom:0.8rem; }
        .rs-pill { background:var(--blue); color:#fff; font-size:0.6rem; font-weight:700;
          letter-spacing:0.18em; text-transform:uppercase; padding:4px 12px; border-radius:999px; }
        .rs-live { display:flex; align-items:center; gap:0.35rem; color:var(--yellow);
          font-size:0.6rem; font-weight:600; letter-spacing:0.12em; text-transform:uppercase; }
        .rs-dot { width:7px; height:7px; border-radius:50%; background:var(--red); animation:pulseDot 1.6s ease-in-out infinite; }
        @keyframes pulseDot { 0%,100%{box-shadow:0 0 0 0 rgba(232,25,44,0.6)} 50%{box-shadow:0 0 0 7px rgba(232,25,44,0)} }

        .rs-title { font-family:'Playfair Display',serif; font-size:clamp(2.2rem,4.5vw,3.6rem);
          font-weight:900; color:#fff; line-height:1.0; letter-spacing:-0.025em; margin:0 0 0.6rem; }
        .rs-title em { font-style:italic; color:var(--yellow); }
        .rs-sub { color:var(--muted); font-size:0.85rem; font-weight:300; }
        .rs-sub strong { color:rgba(255,255,255,0.8); font-weight:500; }

        /* ── Stats row ── */
        .rs-stats { display:flex; align-items:center; gap:2rem; }
        .rs-stat { text-align:center; }
        .rs-stat-num { font-family:'Playfair Display',serif; font-size:1.5rem; font-weight:700; color:#fff; line-height:1; }
        .rs-stat-num span { color:var(--yellow); }
        .rs-stat-label { font-size:0.62rem; font-weight:500; letter-spacing:0.12em; text-transform:uppercase; color:var(--muted); margin-top:2px; }
        .rs-stat-div { width:1px; height:32px; background:rgba(255,255,255,0.1); }

        /* ── Divider ── */
        .rs-rule { height:1px; margin:0 0 2.5rem;
          background:linear-gradient(to right, transparent, rgba(27,63,160,0.4) 25%, rgba(255,208,0,0.25) 50%, rgba(27,63,160,0.4) 75%, transparent); }

        /* ── Track ── */
        .rs-track { display:flex; gap:1.2rem; overflow-x:auto; padding:0.75rem 0.5rem 1.5rem;
          scroll-snap-type:x mandatory; -webkit-overflow-scrolling:touch; scrollbar-width:none; cursor:grab; }
        .rs-track:active { cursor:grabbing; }
        .rs-track::-webkit-scrollbar { display:none; }

        /* ── Card ── */
        .reel-card {
          position:relative;
          min-width:220px; width:220px;
          aspect-ratio:9/16;
          border-radius:20px;
          overflow:hidden;
          scroll-snap-align:start;
          flex-shrink:0;
          background:var(--ink-2);
          border:1px solid rgba(255,255,255,0.08);
          box-shadow:0 24px 60px rgba(0,0,0,0.45), 0 4px 16px rgba(0,0,0,0.3);
          transition:transform 0.38s cubic-bezier(0.22,1,0.36,1), box-shadow 0.38s cubic-bezier(0.22,1,0.36,1), border-color 0.25s;
          animation:cardRise 0.6s cubic-bezier(0.22,1,0.36,1) var(--delay,0s) both;
        }
        @keyframes cardRise { from{opacity:0;transform:translateY(30px) scale(0.96)} to{opacity:1;transform:translateY(0) scale(1)} }
        .reel-card:hover {
          transform:translateY(-10px) scale(1.03);
          box-shadow:0 40px 80px rgba(0,0,0,0.6), 0 0 0 1.5px rgba(255,208,0,0.35), 0 8px 24px rgba(27,63,160,0.25);
          border-color:rgba(255,208,0,0.35);
        }

        /* video */
        .reel-video { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; z-index:1; }

        /* gradient mask — cinematic vignette */
        .reel-mask {
          position:absolute; inset:0; z-index:2; border-radius:20px; pointer-events:none;
          background:linear-gradient(to bottom,
            rgba(4,8,20,0.72) 0%,
            rgba(4,8,20,0.15) 22%,
            rgba(0,0,0,0) 42%,
            rgba(0,0,0,0) 55%,
            rgba(4,8,20,0.35) 72%,
            rgba(4,8,20,0.88) 100%
          );
        }

        /* top row */
        .reel-top-row { position:absolute; top:0; left:0; right:0; z-index:6;
          display:flex; align-items:center; justify-content:space-between; padding:12px 12px 0; }

        .reel-tag { background:var(--blue); color:#fff; font-size:0.52rem; font-weight:700;
          letter-spacing:0.14em; text-transform:uppercase; padding:4px 10px; border-radius:5px;
          box-shadow:0 2px 8px rgba(0,0,0,0.4); }

        /* per-card mute button */
        .reel-icon-btn {
          width:30px; height:30px; border-radius:50%;
          background:rgba(0,0,0,0.45); border:1px solid rgba(255,255,255,0.18);
          color:#fff; display:flex; align-items:center; justify-content:center;
          cursor:pointer; transition:background 0.18s, border-color 0.18s, transform 0.18s;
          backdrop-filter:blur(6px);
        }
        .reel-icon-btn:hover { background:rgba(27,63,160,0.75); border-color:rgba(255,208,0,0.5); transform:scale(1.1); }

        /* centre play/pause */
        .reel-play-btn {
          position:absolute; inset:0; z-index:5;
          display:flex; align-items:center; justify-content:center;
          background:transparent; border:none; cursor:pointer;
          opacity:0; transition:opacity 0.22s;
          pointer-events:none;
        }
        .reel-play-btn.visible { opacity:1; pointer-events:all; }
        .reel-play-btn > svg { filter:drop-shadow(0 2px 12px rgba(0,0,0,0.7)); }

        /* bottom */
        .reel-bottom { position:absolute; bottom:0; left:0; right:0; z-index:6; padding:0 12px 14px; }
        .reel-caption { display:flex; align-items:center; gap:6px; color:rgba(255,255,255,0.95);
          font-size:0.72rem; font-weight:600; letter-spacing:0.01em; text-shadow:0 1px 8px rgba(0,0,0,0.8); }
        .reel-caption-dot { width:5px; height:5px; border-radius:50%; background:var(--yellow);
          flex-shrink:0; box-shadow:0 0 8px rgba(255,208,0,1); }
        .reel-index { font-family:'Playfair Display',serif; font-size:2.4rem; font-weight:700;
          color:rgba(255,255,255,0.05); line-height:1; user-select:none; pointer-events:none;
          text-align:right; margin-top:2px; }

        /* progress bar animation */
        .reel-progress-bar {
          position:absolute; bottom:0; left:0; height:3px; z-index:7; width:0%;
          background:linear-gradient(to right, var(--blue), var(--yellow));
          border-radius:0 0 20px 20px;
        }
        .reel-progress-bar.playing { animation:progress 15s linear infinite; }
        @keyframes progress { from{width:0%} to{width:100%} }

        /* accent top stripe */
        .reel-card::after {
          content:''; position:absolute; top:0; left:0; right:0; height:3px; z-index:8;
          background:linear-gradient(to right, var(--blue), var(--yellow), var(--red));
          border-radius:20px 20px 0 0;
        }

        /* ── Controls ── */
        .rs-controls { display:flex; align-items:center; justify-content:center; gap:1.2rem; margin-top:1.8rem; }
        .rs-ctrl-btn {
          width:40px; height:40px; border-radius:50%;
          border:1px solid rgba(255,208,0,0.25);
          background:rgba(27,63,160,0.15); color:var(--yellow);
          display:flex; align-items:center; justify-content:center;
          cursor:pointer; transition:all 0.22s;
        }
        .rs-ctrl-btn:hover { background:var(--blue); border-color:var(--blue-lt); transform:scale(1.12); }
        .rs-ctrl-btn:disabled { opacity:0.15; cursor:not-allowed; transform:none; }
        .rs-ctrl-btn svg { width:15px; height:15px; }

        .rs-dots { display:flex; align-items:center; gap:6px; }
        .rs-dot-btn { width:6px; height:6px; border-radius:50%; background:rgba(255,255,255,0.2);
          border:none; cursor:pointer; padding:0; transition:all 0.22s; }
        .rs-dot-btn.active { background:var(--yellow); transform:scale(1.7); width:18px; border-radius:3px; }
        .rs-dot-btn:hover:not(.active) { background:rgba(255,208,0,0.45); }

        /* ── Footer ── */
        .rs-footer { display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap;
          gap:1rem; margin-top:2.5rem; padding-top:1.8rem; border-top:1px solid rgba(255,255,255,0.06); }
        .rs-footer-left { display:flex; align-items:center; gap:0.75rem; }
        .rs-brand { font-family:'Playfair Display',serif; color:#fff; font-size:1.1rem; font-weight:700; }
        .rs-brand span { color:var(--yellow); }
        .rs-sep { color:rgba(255,255,255,0.1); font-size:1.2rem; }
        .rs-tagline { color:var(--muted); font-size:0.68rem; letter-spacing:0.1em; text-transform:uppercase; }
        .rs-ig-btn {
          display:flex; align-items:center; gap:0.45rem;
          background:linear-gradient(135deg,#405DE6,#5851DB,#833AB4,#C13584,#E1306C,#FD1D1D);
          color:#fff; border:none; border-radius:999px; padding:0.5rem 1.2rem;
          font-family:'DM Sans',sans-serif; font-size:0.73rem; font-weight:600;
          letter-spacing:0.05em; cursor:pointer; transition:opacity 0.2s, transform 0.18s;
        }
        .rs-ig-btn:hover { opacity:0.85; transform:translateY(-2px); }

        /* ── Responsive ── */
        @media (max-width:1024px) {
          .rs-inner { padding:0 2rem; }
          .reel-card { min-width:190px; width:190px; }
        }
        @media (max-width:768px) {
          .rs { padding:3rem 0 2.5rem; }
          .rs-inner { padding:0 1.25rem; }
          .rs-header { margin-bottom:1.5rem; gap:1rem; }
          .rs-title { font-size:clamp(1.6rem,6vw,2.2rem); }
          .rs-stats { gap:1.2rem; }
          .rs-stat-num { font-size:1.2rem; }
          .reel-card { min-width:38vw; width:38vw; border-radius:14px; }
          .reel-mask { border-radius:14px; }
          .reel-card::after { border-radius:14px 14px 0 0; }
          .rs-track { gap:0.85rem; }
          .rs-footer { flex-direction:column; align-items:flex-start; gap:0.75rem; }
          .reel-caption { font-size:0.65rem; }
          .reel-tag { font-size:0.48rem; }
          .reel-index { font-size:1.8rem; }
        }
        @media (max-width:480px) {
          .rs-inner { padding:0 1rem; }
          .reel-card { min-width:44vw; width:44vw; border-radius:12px; }
          .reel-mask { border-radius:12px; }
          .reel-card::after { border-radius:12px 12px 0 0; }
          .rs-ctrl-btn { width:34px; height:34px; }
          .reel-caption { font-size:0.6rem; }
          .reel-icon-btn { width:26px; height:26px; }
          .reel-icon-btn svg { width:12px; height:12px; }
          .rs-stats { gap:0.8rem; }
          .rs-stat-num { font-size:1rem; }
        }
        @media (max-width:360px) {
          .reel-card { min-width:50vw; width:50vw; }
        }
      `}</style>

      <section className="rs" ref={sectionRef}>
        <div className="rs-blob-1" /><div className="rs-blob-2" /><div className="rs-blob-3" />

        <div className="rs-inner">

          {/* Header */}
          <div className="rs-header">
            <div className="rs-left">
              <div className="rs-eyebrow">
                <span className="rs-pill">Ghoomo Community</span>
                <span className="rs-live"><span className="rs-dot" /> Live Reels</span>
              </div>
              <h2 className="rs-title">Fuel Your<br /><em>Wanderlust</em></h2>
              <p className="rs-sub">Real stories from <strong>real explorers</strong> across India</p>
            </div>

            <div className="rs-stats">
              <div className="rs-stat">
                <div className="rs-stat-num">5<span>K+</span></div>
                <div className="rs-stat-label">Explorers</div>
              </div>
              <div className="rs-stat-div" />
              <div className="rs-stat">
                <div className="rs-stat-num">200<span>+</span></div>
                <div className="rs-stat-label">Destinations</div>
              </div>
              <div className="rs-stat-div" />
              <div className="rs-stat">
                <div className="rs-stat-num">4.9<span>★</span></div>
                <div className="rs-stat-label">Rated</div>
              </div>
            </div>
          </div>

          <div className="rs-rule" />

          {/* Carousel */}
          <div ref={trackRef} className="rs-track">
            {REELS.map((reel, i) => (
              <ReelCard key={reel.id} reel={reel} index={i} isVisible={isVisible} />
            ))}
          </div>

          {/* Controls */}
          <div className="rs-controls">
            <button className="rs-ctrl-btn" onClick={() => scrollTo(Math.max(0, activeIndex - 1))}
              disabled={activeIndex === 0} aria-label="Previous">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"
                strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <div className="rs-dots">
              {REELS.map((_, i) => (
                <button key={i} className={`rs-dot-btn${i === activeIndex ? " active" : ""}`}
                  onClick={() => scrollTo(i)} aria-label={`Reel ${i + 1}`} />
              ))}
            </div>
            <button className="rs-ctrl-btn" onClick={() => scrollTo(Math.min(REELS.length - 1, activeIndex + 1))}
              disabled={activeIndex === REELS.length - 1} aria-label="Next">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"
                strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          </div>

          {/* Footer */}
          <div className="rs-footer">
            <div className="rs-footer-left">
              <span className="rs-brand">Ghoo<span>mo</span></span>
              <span className="rs-sep">·</span>
              <span className="rs-tagline">Real Journeys, Real People</span>
            </div>
            <button className="rs-ig-btn"
              onClick={() => window.open("https://www.instagram.com/ghoomo_saste_me/","_blank")}>
              <IconIG /> Follow @ghoomo_saste_me
            </button>
          </div>

        </div>
      </section>
    </>
  );
};

export default Reels;