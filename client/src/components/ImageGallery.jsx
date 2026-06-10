import React, { useState, useEffect } from "react";
import { realTripGallery } from "../data/trips";
import { ChevronLeft, ChevronRight, X, Camera, Plus } from "lucide-react";
import { supabase } from "../admin/supabaseClient";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";
const INITIAL_COUNT = 4;

const ImageGallery = () => {
  const [gallery, setGallery] = useState(realTripGallery);
  const [previewIndex, setPreviewIndex] = useState(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const fetchSupabase = supabase
      .from("gallery")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (!error && data && data.length > 0) {
          return data.map(d => ({
            src: d.image_url,
            alt: d.caption || "",
            fromDB: true,
          }));
        }
        return [];
      })
      .catch(() => []);

    const fetchBackend = fetch(`${API}/api/gallery`)
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          return data.map(d => ({
            src: d.url,
            alt: d.alt_text || "",
            fromBackend: true,
          }));
        }
        return [];
      })
      .catch(() => []);

    Promise.all([fetchSupabase, fetchBackend]).then(([supabasePhotos, backendPhotos]) => {
      const allExtra = [...supabasePhotos, ...backendPhotos];
      if (allExtra.length > 0) {
        setGallery([...allExtra, ...realTripGallery]);
      }
    });
  }, []);

  const visibleImages = expanded ? gallery : gallery.slice(0, INITIAL_COUNT);

  const nextImage = () => setPreviewIndex(prev => (prev + 1) % gallery.length);
  const prevImage = () => setPreviewIndex(prev => prev === 0 ? gallery.length - 1 : prev - 1);

  useEffect(() => {
    const handleKey = e => {
      if (previewIndex === null) return;
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "Escape") setPreviewIndex(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [previewIndex]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;1,300&family=Montserrat:wght@300;400;500&display=swap');

        .gal-section { background:#0c0c0c; padding:48px 0 40px; }

        .gal-eyebrow {
          font-family:'Montserrat',sans-serif; font-size:0.58rem;
          font-weight:500; letter-spacing:0.38em;
          text-transform:uppercase; color:#b49146;
        }
        .gal-rule {
          display:inline-block; width:28px; height:1px;
          background:linear-gradient(90deg,transparent,#b49146,transparent);
          vertical-align:middle; margin:0 8px;
        }
        .gal-heading {
          font-family:'Cormorant Garamond',serif; font-weight:300;
          font-size:clamp(1.6rem,3.5vw,2.4rem); line-height:1.15;
          color:#f0ede6; margin:6px 0 4px;
        }
        .gal-heading em { font-style:italic; color:#b49146; }
        .gal-sub {
          font-family:'Montserrat',sans-serif; font-size:0.65rem;
          font-weight:300; letter-spacing:0.1em;
          color:rgba(240,237,230,0.35);
        }

        .gal-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:8px; }
        @media (max-width:640px) {
          .gal-grid { grid-template-columns:repeat(2,1fr); gap:5px; }
          .gal-section { padding:36px 0 32px; }
        }

        .gal-item {
          position:relative; overflow:hidden;
          border-radius:3px; cursor:pointer; aspect-ratio:3/4;
        }
        .gal-item img {
          width:100%; height:100%; object-fit:cover; display:block;
          filter:brightness(0.88) saturate(0.85);
          transition:transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94),filter 0.5s ease;
        }
        .gal-item:hover img { transform:scale(1.08); filter:brightness(1) saturate(1.05); }

        .gal-overlay {
          position:absolute; inset:0;
          background:linear-gradient(to top,rgba(0,0,0,0.55) 0%,transparent 55%);
          opacity:0; transition:opacity 0.35s ease;
        }
        .gal-item:hover .gal-overlay { opacity:1; }

        .gal-caption-overlay {
          position:absolute; bottom:0; left:0; right:0;
          padding:8px 10px;
          font-family:'Montserrat',sans-serif; font-size:0.6rem;
          color:rgba(240,237,230,0.85); letter-spacing:0.06em;
          opacity:0; transition:opacity 0.3s ease;
          background:linear-gradient(to top,rgba(0,0,0,0.6),transparent);
        }
        .gal-item:hover .gal-caption-overlay { opacity:1; }

        .gal-new-badge {
          position:absolute; top:8px; left:8px;
          background:#e8420a; color:#fff;
          font-family:'Montserrat',sans-serif; font-size:0.48rem;
          font-weight:600; letter-spacing:0.14em; text-transform:uppercase;
          padding:3px 8px; border-radius:999px;
        }

        .gal-num {
          position:absolute; bottom:8px; right:10px;
          font-family:'Cormorant Garamond',serif; font-size:0.85rem;
          color:rgba(180,145,70,0.85); opacity:0; transition:opacity 0.3s ease;
        }
        .gal-item:hover .gal-num { opacity:1; }

        .gal-more-tile {
          border-radius:3px; cursor:pointer; aspect-ratio:3/4;
          background:rgba(180,145,70,0.05);
          border:1px solid rgba(180,145,70,0.18);
          display:flex; flex-direction:column;
          align-items:center; justify-content:center; gap:6px;
          transition:background 0.3s,border-color 0.3s;
        }
        .gal-more-tile:hover { background:rgba(180,145,70,0.1); border-color:rgba(180,145,70,0.45); }
        .gal-more-label {
          font-family:'Montserrat',sans-serif; font-size:0.58rem;
          letter-spacing:0.22em; text-transform:uppercase; color:#b49146;
        }
        .gal-more-count {
          font-family:'Cormorant Garamond',serif; font-size:1.5rem;
          color:rgba(240,237,230,0.65); line-height:1;
        }

        .gal-btn {
          font-family:'Montserrat',sans-serif; font-size:0.6rem;
          font-weight:500; letter-spacing:0.22em; text-transform:uppercase;
          color:#b49146; border:1px solid rgba(180,145,70,0.3);
          padding:9px 26px; background:transparent; cursor:pointer;
          transition:border-color 0.3s,background 0.3s,color 0.3s;
        }
        .gal-btn:hover { border-color:rgba(180,145,70,0.65); background:rgba(180,145,70,0.06); color:#d4b96a; }

        .lb-wrap {
          position:fixed; inset:0; background:rgba(4,4,4,0.97);
          backdrop-filter:blur(10px); z-index:9999;
          display:flex; align-items:center; justify-content:center;
          animation:lbIn 0.25s ease;
        }
        @keyframes lbIn { from{opacity:0} to{opacity:1} }
        .lb-img {
          max-height:84vh; max-width:90vw; object-fit:contain;
          border-radius:2px; box-shadow:0 24px 64px rgba(0,0,0,0.7);
          animation:lbZoom 0.3s cubic-bezier(0.25,0.46,0.45,0.94);
        }
        @keyframes lbZoom { from{opacity:0;transform:scale(0.96)} to{opacity:1;transform:scale(1)} }

        .lb-close {
          position:absolute; top:14px; right:14px;
          width:34px; height:34px; border-radius:50%;
          border:1px solid rgba(255,255,255,0.15); background:none;
          color:rgba(240,237,230,0.6);
          display:flex; align-items:center; justify-content:center;
          cursor:pointer; transition:all 0.2s;
        }
        .lb-close:hover { color:#f0ede6; border-color:rgba(180,145,70,0.5); background:rgba(180,145,70,0.08); }

        .lb-nav {
          position:absolute; top:50%; transform:translateY(-50%);
          width:36px; height:36px; border:1px solid rgba(255,255,255,0.12);
          border-radius:2px; background:none; color:rgba(240,237,230,0.5);
          display:flex; align-items:center; justify-content:center;
          cursor:pointer; transition:all 0.2s;
        }
        .lb-nav:hover { color:#b49146; border-color:rgba(180,145,70,0.5); background:rgba(180,145,70,0.06); }
        .lb-prev { left:clamp(6px,2vw,20px); }
        .lb-next { right:clamp(6px,2vw,20px); }

        .lb-caption {
          position:absolute; bottom:40px; left:50%; transform:translateX(-50%);
          font-family:'Montserrat',sans-serif; font-size:0.65rem;
          letter-spacing:0.1em; color:rgba(240,237,230,0.6); white-space:nowrap;
        }
        .lb-counter {
          position:absolute; bottom:14px; left:50%; transform:translateX(-50%);
          font-family:'Montserrat',sans-serif; font-size:0.57rem;
          letter-spacing:0.28em; color:rgba(240,237,230,0.25); white-space:nowrap;
        }
        .lb-counter b { color:#b49146; font-weight:400; }
      `}</style>

      <section className="gal-section">
        <div style={{ maxWidth:"960px", margin:"0 auto", padding:"0 14px" }}>

          <div style={{ textAlign:"center", marginBottom:"20px" }}>
            <p className="gal-eyebrow">
              <span className="gal-rule" />
              <Camera size={9} color="#b49146" style={{ display:"inline", verticalAlign:"middle" }} />
              <span className="gal-rule" />
            </p>
            <h2 className="gal-heading">Our <em>Community</em> Gallery</h2>
            <p className="gal-sub">Real moments captured by our travelers</p>
          </div>

          <div className="gal-grid">
            {visibleImages.map((img, i) => (
              <div key={`${img.src}-${i}`} className="gal-item" onClick={() => setPreviewIndex(i)}>
                <img
                  src={img.src}
                  alt={img.alt || `trip-${i + 1}`}
                  loading="lazy"
                  onError={e => { e.target.style.display = "none"; }}
                />
                <div className="gal-overlay" />
                {(img.fromDB || img.fromBackend) && <span className="gal-new-badge">New</span>}
                {img.alt && <div className="gal-caption-overlay">{img.alt}</div>}
                <span className="gal-num">0{i + 1}</span>
              </div>
            ))}

            {!expanded && gallery.length > INITIAL_COUNT && (
              <div className="gal-more-tile" onClick={() => setExpanded(true)}>
                <Plus size={16} color="#b49146" />
                <span className="gal-more-count">+{gallery.length - INITIAL_COUNT}</span>
                <span className="gal-more-label">More</span>
              </div>
            )}
          </div>

          {expanded && (
            <div style={{ display:"flex", justifyContent:"center", marginTop:"14px" }}>
              <button className="gal-btn" onClick={() => setExpanded(false)}>Show Less</button>
            </div>
          )}
        </div>
      </section>

      {previewIndex !== null && (
        <div className="lb-wrap" onClick={() => setPreviewIndex(null)}>
          <button className="lb-close" onClick={() => setPreviewIndex(null)}>
            <X size={13} />
          </button>
          <button className="lb-nav lb-prev" onClick={e => { e.stopPropagation(); prevImage(); }}>
            <ChevronLeft size={15} />
          </button>
          <img
            key={previewIndex}
            src={gallery[previewIndex]?.src}
            className="lb-img"
            alt={gallery[previewIndex]?.alt || `preview-${previewIndex + 1}`}
            onClick={e => e.stopPropagation()}
          />
          <button className="lb-nav lb-next" onClick={e => { e.stopPropagation(); nextImage(); }}>
            <ChevronRight size={15} />
          </button>
          {gallery[previewIndex]?.alt && (
            <p className="lb-caption">{gallery[previewIndex].alt}</p>
          )}
          <p className="lb-counter">
            <b>{String(previewIndex + 1).padStart(2, "0")}</b>
            {" / "}
            {String(gallery.length).padStart(2, "0")}
          </p>
        </div>
      )}
    </>
  );
};

export default ImageGallery;