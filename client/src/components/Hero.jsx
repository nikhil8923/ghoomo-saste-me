import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ShieldCheck, ChevronLeft, ChevronRight } from "lucide-react";

/* ─────────────────────────────────────────
   🔢 LIVE COUNT-UP HOOK — re-triggers every time element enters viewport
───────────────────────────────────────── */
const useCountUp = (target, duration = 1800) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const runAnimation = () => {
      // Cancel any existing animation
      if (animRef.current) cancelAnimationFrame(animRef.current);
      setCount(0);
      const startTime = performance.now();
      const tick = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.round(eased * target));
        if (progress < 1) {
          animRef.current = requestAnimationFrame(tick);
        }
      };
      animRef.current = requestAnimationFrame(tick);
    };

    // Re-trigger every time it enters the viewport (not just once)
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          runAnimation();
        } else {
          // Reset to 0 when out of view so it counts up fresh next time
          if (animRef.current) cancelAnimationFrame(animRef.current);
          setCount(0);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [target, duration]);

  return { count, ref };
};

/* ── Inline SVG logos ── */
const GoogleLogo = ({ size = 26 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
    <path fill="#4285F4" d="M24 9.5c3.1 0 5.8 1.1 8 2.9l6-6C34.5 3.1 29.6 1 24 1 14.8 1 7 6.7 3.7 14.6l7 5.4C12.4 13.8 17.7 9.5 24 9.5z"/>
    <path fill="#34A853" d="M46.1 24.6c0-1.6-.1-3.1-.4-4.6H24v8.7h12.4c-.5 2.8-2.1 5.1-4.5 6.7l7 5.4C43.1 37 46.1 31.3 46.1 24.6z"/>
    <path fill="#FBBC05" d="M10.7 28.5A14.5 14.5 0 0 1 9.5 24c0-1.6.3-3.1.8-4.5l-7-5.4A23.9 23.9 0 0 0 0 24c0 3.9.9 7.5 2.6 10.8l8.1-6.3z"/>
    <path fill="#EA4335" d="M24 47c5.6 0 10.3-1.8 13.8-5l-7-5.4c-1.8 1.2-4.1 2-6.8 2-6.3 0-11.6-4.3-13.3-10.1l-8.1 6.3C7 40.3 14.8 47 24 47z"/>
  </svg>
);

const TripAdvisorLogo = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
    <circle cx="30" cy="30" r="29" fill="#34E0A1"/>
    <circle cx="18" cy="30" r="8" fill="white"/>
    <circle cx="42" cy="30" r="8" fill="white"/>
    <circle cx="18" cy="30" r="4" fill="#161616"/>
    <circle cx="42" cy="30" r="4" fill="#161616"/>
    <circle cx="19.5" cy="28.5" r="1.5" fill="white"/>
    <circle cx="43.5" cy="28.5" r="1.5" fill="white"/>
  </svg>
);

const FacebookLogo = ({ size = 26 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path fill="#1877F2" d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
  </svg>
);

/* ── Stars ── */
const Stars = ({ rating, size = 12 }) => {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
      {Array.from({ length: 5 }).map((_, i) => {
        const color = i < full ? "#F59E0B" : (i === full && half ? "#F59E0B" : "#FDE68A");
        return (
          <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill={color} stroke="none">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        );
      })}
    </div>
  );
};

/* ─────────────────────────────────────────
   RATING CARD — used in both desktop row & mobile carousel
───────────────────────────────────────── */
const RatingCard = ({ Logo, platform, rating, reviewTarget, delay = 0, mobile = false }) => {
  const { count, ref } = useCountUp(reviewTarget, 1800 + delay);

  if (mobile) {
    /* ── MOBILE: tall card style ── */
    return (
      <div
        ref={ref}
        style={{
          flex: "0 0 auto",
          width: "clamp(130px, 38vw, 180px)",
          background: "#fff",
          borderRadius: "16px",
          border: "1px solid #e5e7eb",
          boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
          padding: "16px 14px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
          scrollSnapAlign: "start",
          textAlign: "center",
        }}
      >
        {/* Logo circle */}
        <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: "#f9fafb", border: "1px solid #f0f0f0", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Logo size={24} />
        </div>
        {/* Platform name */}
        <span style={{ fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#9CA3AF" }}>
          {platform}
        </span>
        {/* Rating number */}
        <div style={{ fontSize: "28px", fontWeight: 800, color: "#111827", lineHeight: 1 }}>
          {rating.toFixed(1)}
        </div>
        {/* Stars */}
        <Stars rating={rating} size={13} />
        {/* Count */}
        <span style={{ fontSize: "11px", color: "#9CA3AF", fontWeight: 500 }}>
          {count.toLocaleString()}+ reviews
        </span>
      </div>
    );
  }

  /* ── DESKTOP: horizontal row item ── */
  return (
    <div
      ref={ref}
      style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "12px",
        padding: "16px 20px",
      }}
    >
      <Logo size={28} />
      <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "22px", fontWeight: 700, color: "#111827", lineHeight: 1 }}>
            {rating.toFixed(1)}
          </span>
          <Stars rating={rating} size={14} />
        </div>
        <span style={{ fontSize: "12px", color: "#6B7280", whiteSpace: "nowrap" }}>
          ({count.toLocaleString()} reviews)
        </span>
      </div>
    </div>
  );
};

const RATINGS = [
  { Logo: GoogleLogo,      platform: "Google",      rating: 4.9, reviewTarget: 4800, delay: 0   },
  { Logo: TripAdvisorLogo, platform: "TripAdvisor", rating: 5.0, reviewTarget: 3850, delay: 150 },
  { Logo: FacebookLogo,    platform: "Facebook",    rating: 4.9, reviewTarget: 1031, delay: 300 },
];

/* ─────────────────────────────────────────
   BANNER CAROUSEL
───────────────────────────────────────── */
const BANNERS = [
  { src: "/banner/banner1.gif", alt: "WhatsApp support – Hi, I am available anytime" },
  { src: "/banner/banner2.gif", alt: "Budget ₹5000. Memories Unlimited." },
];

const BannerCarousel = () => {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef(null);

  const resetTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setCurrent((c) => (c + 1) % BANNERS.length), 4000);
  };

  const goTo = (index) => { setCurrent(index); resetTimer(); };
  const prev = () => goTo((current - 1 + BANNERS.length) % BANNERS.length);
  const next = () => goTo((current + 1) % BANNERS.length);

  useEffect(() => {
    timerRef.current = setInterval(() => setCurrent((c) => (c + 1) % BANNERS.length), 4000);
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", maxWidth: "1400px", margin: "10px auto 0", borderRadius: "clamp(10px,2vw,16px)", overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.10)", background: "#f0f0f0" }}>
      <div style={{ position: "relative", width: "100%" }}>
        {BANNERS.map((banner, i) => (
          <div
            key={i}
            style={{ position: i === 0 ? "relative" : "absolute", top: 0, left: 0, width: "100%", opacity: i === current ? 1 : 0, transition: "opacity 0.5s ease", pointerEvents: i === current ? "auto" : "none" }}
          >
            <img src={banner.src} alt={banner.alt} style={{ width: "100%", display: "block", height: "auto" }}
              onError={(e) => { e.currentTarget.style.minHeight = "120px"; e.currentTarget.style.background = "#ddd"; }} />
          </div>
        ))}
      </div>

      {[{ fn: prev, side: "left", Icon: ChevronLeft }, { fn: next, side: "right", Icon: ChevronRight }].map(({ fn, side, Icon }) => (
        <button key={side} onClick={fn} aria-label={side}
          style={{ position: "absolute", [side]: "12px", top: "50%", transform: "translateY(-50%)", width: "36px", height: "36px", borderRadius: "50%", background: "rgba(255,255,255,0.9)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 10px rgba(0,0,0,0.25)", zIndex: 10, transition: "transform 0.15s" }}
          onMouseEnter={e => e.currentTarget.style.transform = "translateY(-50%) scale(1.08)"}
          onMouseLeave={e => e.currentTarget.style.transform = "translateY(-50%) scale(1)"}
        >
          <Icon size={20} color="#111" />
        </button>
      ))}

      <div style={{ position: "absolute", bottom: "10px", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "6px", zIndex: 10 }}>
        {BANNERS.map((_, i) => (
          <button key={i} onClick={() => goTo(i)}
            style={{ width: i === current ? "24px" : "8px", height: "8px", borderRadius: "999px", background: i === current ? "#fff" : "rgba(255,255,255,0.55)", border: "none", cursor: "pointer", padding: 0, transition: "all 0.35s ease", boxShadow: "0 1px 3px rgba(0,0,0,0.3)" }}
          />
        ))}
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════
   MAIN HERO COMPONENT
═══════════════════════════════════════ */
const Hero = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [placeholder, setPlaceholder] = useState("");
  const navigate = useNavigate();

  const words = ["Himachal", "Kashmir", "Kedarnath", "Spiti Valley", "Goa"];
  useEffect(() => {
    let i = 0, j = 0, isDeleting = false;
    const type = () => {
      const currentWord = words[i];
      if (isDeleting) setPlaceholder(currentWord.substring(0, j--));
      else            setPlaceholder(currentWord.substring(0, j++));
      if (!isDeleting && j === currentWord.length + 1) { isDeleting = true; setTimeout(type, 1000); return; }
      if (isDeleting && j === 0) { isDeleting = false; i = (i + 1) % words.length; }
      setTimeout(type, isDeleting ? 50 : 100);
    };
    type();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const query = searchQuery.toLowerCase().trim();
    if (!query) return;
    if      (query.includes("himachal") || query.includes("manali"))       navigate("/state/himachal");
    else if (query.includes("kashmir"))                                     navigate("/state/kashmir");
    else if (query.includes("uttarakhand") || query.includes("kedarnath")) navigate("/state/uttarakhand");
    else if (query.includes("spiti"))                                       navigate("/trip/spiti-valley");
    else if (query.includes("ladakh"))                                      navigate("/trip/leh-ladakh");
    else if (query.includes("goa"))                                         navigate("/state/goa");
    else alert("No trips found. Try Himachal, Kashmir or Spiti");
  };

  return (
    <section style={{ width: "100%", padding: "clamp(12px,3vw,24px) clamp(12px,4vw,32px)", background: "#f9fafb", boxSizing: "border-box" }}>

      {/* ── VIDEO ── */}
      <div style={{ position: "relative", width: "100%", maxWidth: "1400px", margin: "0 auto", borderRadius: "clamp(16px,4vw,24px)", overflow: "hidden", height: "clamp(44vh,55vw,80vh)", boxShadow: "0 8px 40px rgba(0,0,0,0.18)" }}>
        <video autoPlay muted loop playsInline style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}>
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)" }} />

        <div style={{ position: "relative", zIndex: 20, width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "0 clamp(16px,5vw,48px)", textAlign: "center", boxSizing: "border-box" }}>
          <h1 style={{ fontSize: "clamp(18px,5.5vw,60px)", fontWeight: 800, fontStyle: "italic", color: "#fff", textTransform: "uppercase", lineHeight: 1.15, letterSpacing: "0.02em", textShadow: "0 2px 12px rgba(0,0,0,0.4)", marginBottom: "clamp(6px,1.5vw,16px)" }}>
            Pocket Friendly Trips<br />Unforgettable Memories
          </h1>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "clamp(10px,2.5vw,18px)", marginBottom: "clamp(12px,3vw,24px)", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.1em" }}>
            Explore India Like Never Before
          </p>

          <form onSubmit={handleSearch} style={{ background: "rgba(255,255,255,0.88)", backdropFilter: "blur(16px)", padding: "5px 5px 5px 16px", borderRadius: "999px", display: "flex", alignItems: "center", maxWidth: "min(100%, 560px)", width: "100%", border: "1px solid rgba(255,255,255,0.5)", boxSizing: "border-box", gap: "8px" }}>
            <Search size={17} color="#6B7280" style={{ flexShrink: 0 }} />
            <input
              type="text"
              placeholder={`Search ${placeholder}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ flex: 1, padding: "6px 0", color: "#1F2937", fontSize: "clamp(12px,3.5vw,15px)", outline: "none", background: "transparent", fontWeight: 500, border: "none", minWidth: 0 }}
            />
            <button type="submit" style={{ background: "#1e52bc", color: "#fff", padding: "8px clamp(12px,4vw,24px)", borderRadius: "999px", fontWeight: 600, textTransform: "uppercase", fontSize: "clamp(10px,2.5vw,13px)", letterSpacing: "0.05em", border: "none", cursor: "pointer", flexShrink: 0, whiteSpace: "nowrap" }}
              onMouseEnter={e => e.currentTarget.style.background = "#111"}
              onMouseLeave={e => e.currentTarget.style.background = "#1e52bc"}
            >Search</button>
          </form>

          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "6px", marginTop: "clamp(8px,2vw,14px)" }}>
            {["Kedarnath", "Manali", "Kasol", "Kashmir"].map((item) => (
              <button key={item} onClick={() => setSearchQuery(item)}
                style={{ fontSize: "clamp(10px,2.8vw,13px)", background: "rgba(255,255,255,0.18)", backdropFilter: "blur(8px)", color: "#fff", padding: "5px clamp(10px,3vw,14px)", borderRadius: "999px", border: "1px solid rgba(255,255,255,0.35)", cursor: "pointer" }}
                onMouseEnter={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = "#000"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.18)"; e.currentTarget.style.color = "#fff"; }}
              >{item}</button>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          RATINGS — desktop row / mobile cards
      ══════════════════════════════════════════ */}

      {/* DESKTOP: single bordered row */}
      <div className="ratings-desktop" style={{ width: "100%", maxWidth: "1400px", margin: "10px auto 0", background: "#fff", borderRadius: "14px", border: "1px solid #e5e7eb", boxShadow: "0 1px 6px rgba(0,0,0,0.06)", display: "flex", alignItems: "stretch", overflow: "hidden" }}>
        {RATINGS.map((item, idx) => (
          <React.Fragment key={item.platform}>
            <RatingCard {...item} mobile={false} />
            {idx < RATINGS.length - 1 && (
              <div style={{ width: "1px", background: "#e5e7eb", margin: "12px 0" }} />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* MOBILE: horizontal snap-scroll cards */}
      <div
        className="ratings-mobile scrollbar-hide"
        style={{
          display: "none",           /* shown via CSS below */
          gap: "10px",
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
          padding: "4px 2px 8px",
          width: "100%",
          maxWidth: "1400px",
          margin: "10px auto 0",
          boxSizing: "border-box",
        }}
      >
        {/* Verified badge as first card */}
        <div style={{ flex: "0 0 auto", width: "clamp(110px,32vw,150px)", background: "linear-gradient(135deg,#ECFDF5,#D1FAE5)", borderRadius: "16px", border: "1px solid #A7F3D0", padding: "16px 12px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "6px", scrollSnapAlign: "start", textAlign: "center" }}>
          <ShieldCheck size={28} color="#059669" />
          <span style={{ fontSize: "11px", fontWeight: 700, color: "#065F46", lineHeight: 1.3 }}>Verified<br/>Reviews</span>
        </div>

        {RATINGS.map((item) => (
          <RatingCard key={item.platform} {...item} mobile={true} />
        ))}
      </div>

      {/* ── BANNER CAROUSEL ── */}
      <BannerCarousel />

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }

        @media (max-width: 639px) {
          .ratings-desktop { display: none !important; }
          .ratings-mobile  { display: flex !important; }
        }
        @media (min-width: 640px) {
          .ratings-desktop { display: flex !important; }
          .ratings-mobile  { display: none !important; }
        }
      `}</style>
    </section>
  );
};

export default Hero;