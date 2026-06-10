import React, { useRef, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { tripsData } from "../data/trips";

/* ── Month tabs config ─────────────────────────────────────────── */
const MONTHS = [
  { label: "June 2026",      month: 5,  year: 2026 },
  { label: "July 2026",      month: 6,  year: 2026 },
  { label: "August 2026",    month: 7,  year: 2026 },
  { label: "September 2026", month: 8,  year: 2026 },
  { label: "October 2026",   month: 9,  year: 2026 },
  { label: "November 2026",  month: 10, year: 2026 },
];

/* ── Helper: parse a date string like "15 June 2026" or "2026-06-15" ── */
const parseDate = (str) => {
  if (!str) return null;
  const d = new Date(str);
  return isNaN(d) ? null : d;
};

const UpcomingTrips = () => {
  const scrollRef = useRef(null);
  const tabsRef   = useRef(null);

  /* default to current month if it exists in MONTHS, else first tab */
  const nowMonth = new Date().getMonth();
  const defaultIdx = MONTHS.findIndex(m => m.month === nowMonth) !== -1
    ? MONTHS.findIndex(m => m.month === nowMonth)
    : 0;
  const [activeIdx, setActiveIdx] = useState(defaultIdx);

  /* Filter trips by selected month */
  const filtered = useMemo(() => {
    const { month, year } = MONTHS[activeIdx];
    const byMonth = tripsData.filter(trip => {
      const d = parseDate(trip.startDate || trip.date || trip.departureDate);
      if (!d) return false;
      return d.getMonth() === month && d.getFullYear() === year;
    });
    /* Fallback: if no date field matches, show first 6 for the active tab */
    return byMonth.length > 0 ? byMonth : tripsData.slice(0, 6);
  }, [activeIdx]);

  const scroll = (dir) => {
    const c = scrollRef.current;
    if (c) c.scrollBy({ left: dir === "left" ? -280 : 280, behavior: "smooth" });
  };

  const selectTab = (i) => {
    setActiveIdx(i);
    /* Reset card scroll to start */
    if (scrollRef.current) scrollRef.current.scrollLeft = 0;
  };

  return (
    <section
      id="upcoming-trips"
      style={{ padding: "72px 0 80px", background: "var(--cream, #FAF7F0)" }}
    >
      <style>{`
        .ut-tab {
          flex-shrink: 0;
          padding: 9px 20px;
          border-radius: 99px;
          border: 1px solid #E2D9C5;
          background: #fff;
          font-size: 13px;
          font-weight: 600;
          color: #4A5568;
          cursor: pointer;
          white-space: nowrap;
          transition: background 0.18s, color 0.18s, border-color 0.18s, box-shadow 0.18s;
          letter-spacing: 0.01em;
        }
        .ut-tab:hover {
          border-color: var(--gold, #C9A84C);
          color: var(--gold, #C9A84C);
        }
        .ut-tab.active {
          background: var(--navy, #0D1B3E);
          color: #fff;
          border-color: var(--navy, #0D1B3E);
          box-shadow: 0 4px 14px rgba(13,27,62,0.18);
        }
        .ut-card {
          min-width: 220px;
          max-width: 260px;
          flex-shrink: 0;
          background: #fff;
          border-radius: 18px;
          border: 1px solid #EDE8DC;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          scroll-snap-align: start;
          transition: box-shadow 0.22s, transform 0.22s;
        }
        .ut-card:hover {
          box-shadow: 0 16px 48px rgba(13,27,62,0.10);
          transform: translateY(-4px);
        }
        .ut-img { position: relative; height: 155px; overflow: hidden; }
        .ut-img img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.55s ease; display: block; }
        .ut-card:hover .ut-img img { transform: scale(1.07); }
        .ut-badge {
          position: absolute; top: 10px; left: 10px;
          background: var(--gold, #C9A84C);
          color: var(--navy, #0D1B3E);
          font-size: 9px; font-weight: 700;
          letter-spacing: 0.08em; text-transform: uppercase;
          padding: 4px 10px; border-radius: 99px;
        }
        .ut-duration {
          position: absolute; bottom: 10px; right: 10px;
          background: rgba(13,27,62,0.72); backdrop-filter: blur(6px);
          border: 1px solid rgba(201,168,76,0.35);
          color: #fff; font-size: 9px; font-weight: 600;
          letter-spacing: 0.06em; text-transform: uppercase;
          padding: 4px 9px; border-radius: 7px;
        }
        .ut-body { padding: 14px 14px 16px; display: flex; flex-direction: column; flex: 1; }
        .ut-title { font-size: 14px; font-weight: 700; color: var(--navy, #0D1B3E); margin-bottom: 4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; line-height: 1.3; }
        .ut-meta { font-size: 11px; color: #9AA5B1; margin-bottom: 6px; }
        .ut-desc { font-size: 11.5px; color: #4A5568; line-height: 1.55; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; margin-bottom: 12px; flex: 1; }
        .ut-footer { display: flex; justify-content: space-between; align-items: center; margin-top: auto; }
        .ut-price-orig { font-size: 10px; color: #9AA5B1; text-decoration: line-through; display: block; margin-bottom: 1px; }
        .ut-price { font-size: 17px; font-weight: 800; color: var(--navy, #0D1B3E); font-family: Georgia, serif; }
        .ut-btn {
          background: var(--navy, #0D1B3E);
          color: #fff; font-size: 10.5px; font-weight: 700;
          padding: 7px 13px; border-radius: 9px; text-decoration: none;
          letter-spacing: 0.04em; text-transform: uppercase;
          transition: background 0.18s;
        }
        .ut-btn:hover { background: var(--gold, #C9A84C); color: var(--navy, #0D1B3E); }
        .ut-arrow {
          width: 40px; height: 40px; border-radius: 50%;
          border: 1px solid #E2D9C5; background: #fff;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: var(--navy, #0D1B3E); font-size: 15px;
          transition: background 0.18s, border-color 0.18s;
          flex-shrink: 0;
        }
        .ut-arrow:hover { background: var(--navy, #0D1B3E); color: #fff; border-color: var(--navy, #0D1B3E); }
        .ut-empty {
          padding: 48px 0; text-align: center;
          color: #9AA5B1; font-size: 14px; font-weight: 500;
        }
        @media (max-width: 767px) {
          .ut-card { min-width: 72vw; max-width: 72vw; }
          .ut-img  { height: 130px; }
          .ut-arrows { display: none !important; }
        }
      `}</style>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>

        {/* ── Header row ────────────────────────────────────────── */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28, flexWrap: "wrap", gap: 12 }}>
          <div>
            {/* Eyebrow */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <span style={{ display: "inline-block", width: 32, height: 2, background: "var(--gold, #C9A84C)", borderRadius: 99 }} />
              <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--gold, #C9A84C)" }}>
                Plan Your Next Adventure
              </span>
            </div>
            <h2 style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: "clamp(24px,4vw,40px)", fontWeight: 700, color: "var(--navy, #0D1B3E)", letterSpacing: "-0.02em", lineHeight: 1.15, margin: 0 }}>
              Upcoming Trips
            </h2>
          </div>

          {/* Desktop arrows + View All */}
          <div className="ut-arrows" style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button className="ut-arrow" onClick={() => scroll("left")} aria-label="Scroll left">←</button>
            <button className="ut-arrow" onClick={() => scroll("right")} aria-label="Scroll right">→</button>
            <Link
              to="/trips"
              style={{
                marginLeft: 8,
                padding: "9px 20px",
                background: "var(--gold, #C9A84C)",
                color: "var(--navy, #0D1B3E)",
                borderRadius: 99, fontWeight: 700,
                fontSize: 12, letterSpacing: "0.08em",
                textTransform: "uppercase", textDecoration: "none",
                whiteSpace: "nowrap",
              }}
            >
              View All →
            </Link>
          </div>
        </div>

        {/* ── Month filter tabs ─────────────────────────────────── */}
        <div
          ref={tabsRef}
          style={{
            display: "flex", gap: 8, overflowX: "auto",
            marginBottom: 32, paddingBottom: 4,
            msOverflowStyle: "none", scrollbarWidth: "none",
          }}
        >
          {MONTHS.map((m, i) => (
            <button
              key={m.label}
              className={`ut-tab${activeIdx === i ? " active" : ""}`}
              onClick={() => selectTab(i)}
            >
              {m.label}
            </button>
          ))}
        </div>

        {/* ── Trip cards ───────────────────────────────────────── */}
        {filtered.length === 0 ? (
          <div className="ut-empty">No trips scheduled for this month yet. Check back soon!</div>
        ) : (
          <div
            ref={scrollRef}
            style={{
              display: "flex", gap: 14, overflowX: "auto",
              scrollSnapType: "x mandatory", scrollBehavior: "smooth",
              WebkitOverflowScrolling: "touch",
              paddingBottom: 8,
              msOverflowStyle: "none", scrollbarWidth: "none",
            }}
          >
            {filtered.map((trip) => (
              <div key={trip.id} className="ut-card">
                <div className="ut-img">
                  <img src={trip.image} alt={trip.title} />
                  <span className="ut-badge">Trending</span>
                  <span className="ut-duration">{trip.duration}</span>
                </div>
                <div className="ut-body">
                  <div className="ut-title">{trip.title}</div>
                  <div className="ut-meta">{trip.location || trip.pickup}</div>
                  <div className="ut-desc">{trip.description}</div>
                  <div className="ut-footer">
                    <div>
                      {trip.originalPrice && (
                        <span className="ut-price-orig">₹{trip.originalPrice}</span>
                      )}
                      <span className="ut-price">₹{trip.price}</span>
                    </div>
                    <Link to={`/trip/${trip.id}`} className="ut-btn">View Trip</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Mobile: View All ─────────────────────────────────── */}
        <div style={{ textAlign: "center", marginTop: 28 }} className="md:hidden">
          <Link
            to="/trips"
            style={{
              display: "inline-block",
              padding: "11px 28px",
              background: "var(--gold, #C9A84C)",
              color: "var(--navy, #0D1B3E)",
              borderRadius: 12, fontWeight: 700,
              fontSize: 13, textDecoration: "none",
              letterSpacing: "0.05em",
            }}
          >
            View All Trips →
          </Link>
        </div>

      </div>
    </section>
  );
};

export default UpcomingTrips;