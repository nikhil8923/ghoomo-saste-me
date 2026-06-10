import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

/* ─── Design tokens ────────────────────────────────────────────── */
const T = {
  gold:    "#C9A84C",
  goldDim: "#8B6B2A",
  goldBg:  "rgba(201,168,76,0.08)",
  ink:     "#0A0A0F",
  panel:   "#111118",
  surface: "#18181F",
  line:    "rgba(201,168,76,0.18)",
  muted:   "rgba(255,255,255,0.35)",
  faint:   "rgba(255,255,255,0.12)",
  white:   "#FFFFFF",
  success: "#3DBE7A",
  danger:  "#EF4444",
  font:    "'DM Serif Display', Georgia, serif",
  sans:    "'DM Sans', system-ui, sans-serif",
};

const MAX_SPINS      = 3;
const ONE_MONTH_MS   = 30 * 24 * 60 * 60 * 1000;
const INSTA_URL      = "https://www.instagram.com/ghoomo_saste_me/";
const WHATSAPP_NUM   = "917827372844";
const WEBHOOK_URL    = "https://n8n.wakflow.com/webhook/LeadCapture";

/* ─── Wheel segments ───────────────────────────────────────────── */
const SEGMENTS = [
  { label: "₹100 Off",       sub: "Min bill ₹5,000",         fill: "#1B3A6B", prob: 20   },
  { label: "₹200 Off",       sub: "Min bill ₹5,000",         fill: "#1A4D35", prob: 18   },
  { label: "Better Luck",    sub: "Explore next adventure",  fill: "#1E1E28", prob: 22   },
  { label: "Water Bottle",   sub: "GSM branded gift",        fill: "#0C3545", prob: 10   },
  { label: "T-Shirt",        sub: "GSM merch",               fill: "#3B1F6A", prob: 10   },
  { label: "Snack Hamper",   sub: "Curated snack pack",      fill: "#5A3000", prob: 8    },
  { label: "Sunglasses",     sub: "GSM travel edition",      fill: "#2A1A4A", prob: 4    },
  { label: "Selfie Stick",   sub: "GSM branded",             fill: "#1A3A2A", prob: 3    },
  { label: "Watch",          sub: "GSM branded",             fill: "#3A2000", prob: 2    },
  { label: "Microphone",     sub: "GSM branded",             fill: "#0A2A3A", prob: 1.5  },
  { label: "Power Bank",     sub: "No chance!",              fill: "#1E1E28", prob: 0    },
  { label: "Sponsored Trip", sub: "1 lucky winner",          fill: "#4A1020", prob: 0.5  },
];

const TOTAL      = SEGMENTS.length;
const ARC        = (2 * Math.PI) / TOTAL;
const PROB_TOTAL = SEGMENTS.reduce((s, x) => s + x.prob, 0);
const NON_REWARDS = ["Better Luck", "Power Bank"];

/* ─── Unique ID generator ──────────────────────────────────────── */
function generateUserId() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const rand = (len) =>
    Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
  const timeBlock = (Date.now() % 1000000).toString(36).toUpperCase().padStart(6, "0");
  return `GSM-${timeBlock}-${rand(8)}`;
}

/* ─── Device fingerprint key ───────────────────────────────────── */
function getDeviceKey() {
  const raw = [
    navigator.userAgent,
    navigator.language,
    screen.width,
    screen.height,
    screen.colorDepth,
    new Date().getTimezoneOffset(),
    navigator.hardwareConcurrency || 0,
    navigator.platform || "",
  ].join("|");
  let h = 0;
  for (let i = 0; i < raw.length; i++) {
    h = ((h << 5) - h + raw.charCodeAt(i)) | 0;
  }
  return "gsm_spin_v7_" + Math.abs(h).toString(36);
}

/* ─── Phone-hash key ───────────────────────────────────────────── */
function getPhoneKey(phone) {
  const cleaned = phone.replace(/\D/g, "");
  let h = 0;
  for (let i = 0; i < cleaned.length; i++) {
    h = ((h << 5) - h + cleaned.charCodeAt(i)) | 0;
  }
  return "gsm_phone_v7_" + Math.abs(h).toString(36);
}

/* ─── Storage helpers ──────────────────────────────────────────── */
const EMPTY_REC = () => ({
  userId:        null,
  spinsUsed:     0,
  rewards:       [],
  user:          null,
  firstSpinTime: null,
  createdAt:     null,
});

function loadByDeviceKey() {
  try {
    const raw = localStorage.getItem(getDeviceKey());
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function loadByPhoneKey(phone) {
  try {
    const key = getPhoneKey(phone);
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function saveRecord(rec) {
  try {
    const data = JSON.stringify(rec);
    localStorage.setItem(getDeviceKey(), data);
    if (rec.user?.phone) {
      localStorage.setItem(getPhoneKey(rec.user.phone), data);
    }
  } catch {}
}

function loadOrRestoreRecord(phone) {
  let rec = loadByDeviceKey();
  if (!rec && phone) {
    rec = loadByPhoneKey(phone);
    if (rec) saveRecord(rec);
  }
  return rec || EMPTY_REC();
}

/* ─── Timer helpers ────────────────────────────────────────────── */
function getTimeLeft(fromTimestamp) {
  if (!fromTimestamp) return null;
  const diff = fromTimestamp + ONE_MONTH_MS - Date.now();
  if (diff <= 0) return null;
  return {
    days:  Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    mins:  Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    secs:  Math.floor((diff % (1000 * 60)) / 1000),
    diff,
  };
}
const pad = (n) => String(n).padStart(2, "0");

/* ─── Wheel helpers ────────────────────────────────────────────── */
function pickSegment() {
  let rand;
  try {
    const buf = new Uint32Array(1);
    crypto.getRandomValues(buf);
    rand = buf[0] / (0xFFFFFFFF + 1);
  } catch { rand = Math.random(); }
  let r = rand * PROB_TOTAL;
  for (let i = 0; i < SEGMENTS.length; i++) {
    r -= SEGMENTS[i].prob;
    if (r <= 0) return i;
  }
  return SEGMENTS.length - 1;
}

function drawWheel(canvas, rotation) {
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const cx = 160, cy = 160, r = 150;
  ctx.clearRect(0, 0, 320, 320);
  SEGMENTS.forEach((s, i) => {
    const start = rotation + i * ARC - Math.PI / 2;
    const end   = start + ARC;
    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.arc(cx, cy, r, start, end); ctx.closePath();
    ctx.fillStyle = s.fill; ctx.fill();
    ctx.strokeStyle = "rgba(201,168,76,0.35)"; ctx.lineWidth = 1.5; ctx.stroke();
    ctx.save(); ctx.translate(cx, cy); ctx.rotate(start + ARC / 2);
    const labelR = r * 0.64;
    ctx.fillStyle = "rgba(255,255,255,0.92)";
    ctx.font = "bold 9px 'DM Sans', sans-serif";
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    const words = s.label.split(" ");
    if (words.length > 1 && s.label.length > 9) {
      const half = Math.ceil(words.length / 2);
      ctx.fillText(words.slice(0, half).join(" "), labelR, -6);
      ctx.fillText(words.slice(half).join(" "), labelR, 6);
    } else {
      ctx.fillText(s.label, labelR, 0);
    }
    ctx.strokeStyle = T.gold; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(r - 18, 0); ctx.lineTo(r - 8, 0); ctx.stroke();
    ctx.restore();
  });
  ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.strokeStyle = T.gold; ctx.lineWidth = 3; ctx.stroke();
  ctx.beginPath(); ctx.arc(cx, cy, r * 0.72, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(201,168,76,0.2)"; ctx.lineWidth = 1; ctx.stroke();
}

function resolveSegment(rotation) {
  const norm  = ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
  const angle = (2 * Math.PI - norm) % (2 * Math.PI);
  return Math.floor(angle / ARC) % TOTAL;
}

/* ─── Confetti ─────────────────────────────────────────────────── */
const Confetti = ({ active }) => {
  const ref = useRef(null);
  useEffect(() => {
    if (!active || !ref.current) return;
    const canvas = ref.current, ctx = canvas.getContext("2d");
    const pieces = Array.from({ length: 60 }, () => ({
      x: Math.random() * 360, y: -20 - Math.random() * 40,
      vx: (Math.random() - 0.5) * 3.5, vy: 2.5 + Math.random() * 2.5,
      color: [T.gold, "#FFF8DC", "#FFFFFF", T.goldDim, "#E0C878"][Math.floor(Math.random() * 5)],
      w: 5 + Math.random() * 5, h: 3 + Math.random() * 3,
      rot: Math.random() * 360, rs: (Math.random() - 0.5) * 5,
    }));
    let f = 0;
    const drop = () => {
      ctx.clearRect(0, 0, 360, 160);
      pieces.forEach(p => {
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot * Math.PI / 180);
        ctx.fillStyle = p.color; ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h); ctx.restore();
        p.x += p.vx; p.y += p.vy; p.rot += p.rs;
      });
      if (++f < 100) requestAnimationFrame(drop);
      else ctx.clearRect(0, 0, 360, 160);
    };
    requestAnimationFrame(drop);
  }, [active]);
  return (
    <canvas
      ref={ref} width={360} height={160}
      style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", pointerEvents: "none", zIndex: 10 }}
    />
  );
};

/* ─── Spin dots ────────────────────────────────────────────────── */
const SpinDots = ({ used, total }) => (
  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, margin: "4px 0 0" }}>
    {Array.from({ length: total }).map((_, i) => (
      <div key={i} style={{
        width: i < used ? 10 : 8, height: i < used ? 10 : 8, borderRadius: "50%",
        background: i < used ? T.gold : "rgba(201,168,76,0.2)",
        border: `1px solid ${i < used ? T.gold : "rgba(201,168,76,0.35)"}`,
        transition: "all 0.3s",
      }} />
    ))}
    <span style={{ fontSize: 10, color: T.muted, fontFamily: T.sans, marginLeft: 4, letterSpacing: "0.06em" }}>
      {total - used} spin{total - used !== 1 ? "s" : ""} left
    </span>
  </div>
);

/* ─── User ID badge ────────────────────────────────────────────── */
const UserIDBadge = ({ userId }) => {
  const [copied, setCopied] = useState(false);
  if (!userId) return null;
  const copy = () => {
    navigator.clipboard?.writeText(userId).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div
      onClick={copy}
      title="Tap to copy your User ID"
      style={{
        display: "inline-flex", alignItems: "center", gap: 6,
        background: T.surface, border: `1px solid ${T.line}`,
        borderRadius: 8, padding: "5px 10px", cursor: "pointer",
        transition: "border-color 0.2s",
      }}
    >
      <span style={{ fontSize: 9, color: T.goldDim, fontFamily: T.sans, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
        User ID
      </span>
      <span style={{ fontSize: 11, color: T.gold, fontFamily: "monospace", fontWeight: 700, letterSpacing: "0.06em" }}>
        {userId}
      </span>
      <span style={{ fontSize: 9, color: copied ? T.success : T.muted, fontFamily: T.sans, marginLeft: 2, transition: "color 0.3s" }}>
        {copied ? "✓ Copied" : "Copy"}
      </span>
    </div>
  );
};

/* ─── Countdown timer ──────────────────────────────────────────── */
const CountdownTimer = ({ firstSpinTime, onExpire }) => {
  const [tl, setTl] = useState(() => getTimeLeft(firstSpinTime));

  useEffect(() => {
    const id = setInterval(() => {
      const next = getTimeLeft(firstSpinTime);
      setTl(next);
      if (!next) { clearInterval(id); onExpire?.(); }
    }, 1000);
    return () => clearInterval(id);
  }, [firstSpinTime, onExpire]);

  if (!tl) return null;

  const unlockDate = new Date(firstSpinTime + ONE_MONTH_MS).toLocaleDateString("en-IN", {
    day: "numeric", month: "long", year: "numeric",
  });

  const cellStyle = {
    background: T.surface,
    border: `1px solid rgba(201,168,76,0.25)`,
    borderRadius: 10,
    padding: "14px 6px 10px",
    textAlign: "center",
    flex: 1,
  };

  return (
    <div style={{ width: "100%", background: "#0E0E16", border: `1px solid rgba(201,168,76,0.22)`, borderRadius: 14, padding: "16px 14px", boxSizing: "border-box" }}>
      <p style={{ fontSize: 9, color: T.goldDim, textTransform: "uppercase", letterSpacing: "0.14em", fontWeight: 700, fontFamily: T.sans, margin: "0 0 12px", textAlign: "center" }}>
        Next 3 spins unlock on {unlockDate}
      </p>
      <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
        {[["days", tl.days], ["hours", tl.hours], ["mins", tl.mins], ["secs", tl.secs]].map(([unit, val]) => (
          <div key={unit} style={cellStyle}>
            <span style={{ fontFamily: T.font, color: T.gold, fontSize: 28, fontWeight: 400, lineHeight: 1, display: "block" }}>
              {pad(val)}
            </span>
            <span style={{ fontSize: 9, color: T.muted, textTransform: "uppercase", letterSpacing: "0.1em", marginTop: 4, display: "block", fontFamily: T.sans }}>
              {unit}
            </span>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
        <div style={{
          width: 6, height: 6, borderRadius: "50%", background: T.gold, flexShrink: 0,
          animation: "gsmPulse 1.5s ease-in-out infinite",
        }} />
        <span style={{ fontSize: 10, color: T.muted, fontFamily: T.sans }}>Live countdown — resets automatically</span>
      </div>
    </div>
  );
};

/* ─── Instagram verification ───────────────────────────────────── */
const InstaCheck = ({ checked, onChange }) => {
  const [linkVisited, setLinkVisited] = useState(false);
  const [showHint,    setShowHint]    = useState(false);

  const handleLinkClick = () => {
    setLinkVisited(true);
    window.open(INSTA_URL, "_blank", "noopener,noreferrer");
  };

  const handleCheckboxClick = () => {
    if (!linkVisited) {
      setShowHint(true);
      setTimeout(() => setShowHint(false), 3000);
      return;
    }
    onChange(!checked);
  };

  const isActive = linkVisited && checked;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <div style={{
        display: "flex", alignItems: "center", gap: 10,
        background: linkVisited ? "rgba(61,190,122,0.06)" : T.surface,
        border: `1px solid ${linkVisited ? "rgba(61,190,122,0.4)" : T.line}`,
        borderRadius: 10, padding: "12px 14px", transition: "all 0.3s",
      }}>
        <div style={{
          width: 22, height: 22, borderRadius: "50%", flexShrink: 0,
          background: linkVisited ? T.success : "rgba(201,168,76,0.15)",
          border: `1.5px solid ${linkVisited ? T.success : T.goldDim}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 11, fontWeight: 700, color: linkVisited ? T.ink : T.gold,
          fontFamily: T.sans, transition: "all 0.3s",
        }}>
          {linkVisited ? "✓" : "1"}
        </div>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: 13, color: T.white, margin: "0 0 2px", fontFamily: T.sans }}>
            Visit{" "}
            <button onClick={handleLinkClick} style={{ background: "none", border: "none", padding: 0, cursor: "pointer", color: T.gold, fontSize: 13, fontFamily: T.sans, fontWeight: 600, textDecoration: "underline", textUnderlineOffset: 3 }}>
              @ghoomo_saste_me
            </button>{" "}
            on Instagram
          </p>
          <p style={{ fontSize: 11, color: T.muted, margin: 0, fontFamily: T.sans }}>
            {linkVisited ? "Profile opened — confirm below" : "Click the link to open our Instagram profile"}
          </p>
        </div>
        {!linkVisited && (
          <div style={{ fontSize: 10, color: T.gold, fontFamily: T.sans, fontWeight: 700, background: "rgba(201,168,76,0.1)", border: `1px solid ${T.line}`, borderRadius: 6, padding: "3px 8px", whiteSpace: "nowrap", letterSpacing: "0.06em", textTransform: "uppercase" }}>
            Required first
          </div>
        )}
      </div>

      <div onClick={handleCheckboxClick} style={{
        display: "flex", alignItems: "flex-start", gap: 10,
        background: isActive ? "rgba(201,168,76,0.06)" : T.surface,
        border: `1px solid ${isActive ? T.gold : T.line}`,
        borderRadius: 10, padding: "12px 14px",
        cursor: linkVisited ? "pointer" : "not-allowed",
        opacity: linkVisited ? 1 : 0.45, transition: "all 0.3s",
      }}>
        <div style={{
          width: 22, height: 22, borderRadius: 5, flexShrink: 0, marginTop: 1,
          border: `2px solid ${isActive ? T.gold : linkVisited ? "rgba(201,168,76,0.6)" : "rgba(201,168,76,0.25)"}`,
          background: isActive ? T.gold : "transparent",
          display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s",
        }}>
          {isActive
            ? <span style={{ color: T.ink, fontSize: 13, fontWeight: 700, lineHeight: 1 }}>✓</span>
            : <span style={{ color: T.muted, fontSize: 11, fontWeight: 700, lineHeight: 1 }}>2</span>
          }
        </div>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: 13, color: linkVisited ? T.white : T.muted, margin: "0 0 3px", fontFamily: T.sans }}>
            I have followed <span style={{ color: linkVisited ? T.gold : T.muted, fontWeight: 600 }}>@ghoomo_saste_me</span>
          </p>
          <p style={{ fontSize: 11, color: T.muted, margin: 0, fontFamily: T.sans }}>
            {linkVisited ? "Tap to confirm after following the page" : "Complete step 1 first"}
          </p>
        </div>
        {!linkVisited && <div style={{ fontSize: 16, color: T.muted, flexShrink: 0, marginTop: 2 }}>🔒</div>}
      </div>

      {showHint && (
        <div style={{ fontSize: 12, color: "#FCA5A5", background: "rgba(220,38,38,0.12)", border: "1px solid rgba(220,38,38,0.25)", padding: "9px 13px", borderRadius: 7, fontFamily: T.sans }}>
          Please click the Instagram link in Step 1 and follow the page before confirming.
        </div>
      )}
    </div>
  );
};

/* ─── Lead form ────────────────────────────────────────────────── */
const LeadForm = ({ onSubmit }) => {
  const [data,  setData]  = useState({ name: "", phone: "", email: "", city: "" });
  const [insta, setInsta] = useState(false);
  const [err,   setErr]   = useState("");
  const [checking, setChecking] = useState(false);

  const set = e => setData(d => ({ ...d, [e.target.name]: e.target.value }));

  const submit = () => {
    if (!data.name.trim())                 return setErr("Please enter your full name.");
    if (!/^[6-9]\d{9}$/.test(data.phone)) return setErr("Enter a valid 10-digit Indian mobile number (starts with 6–9).");
    if (!/\S+@\S+\.\S+/.test(data.email)) return setErr("Enter a valid email address.");
    if (!data.city.trim())                 return setErr("Please enter your city.");
    if (!insta)                            return setErr("Please open the Instagram link, follow @ghoomo_saste_me, and confirm in Step 2.");

    setChecking(true);
    setErr("");

    const phone = "+91" + data.phone;
    const existing = loadByPhoneKey(phone);
    if (existing && existing.userId) {
      setChecking(false);
      onSubmit({ ...data, phone }, existing);
    } else {
      setChecking(false);
      onSubmit({ ...data, phone }, null);
    }
  };

  const iStyle = {
    width: "100%", padding: "11px 14px", borderRadius: 8,
    border: `1px solid ${T.line}`, background: T.surface,
    color: T.white, fontSize: 14, fontFamily: T.sans,
    outline: "none", boxSizing: "border-box", transition: "border-color 0.2s, background 0.2s",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <p style={{ fontSize: 12.5, color: T.muted, margin: 0, lineHeight: 1.7, fontFamily: T.sans }}>
        Fill in your details to unlock <strong style={{ color: T.gold }}>3 free spins</strong>.
        A unique User ID will be assigned to you — keep it as proof of your rewards.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px 14px" }}>
        <div>
          <div style={{ fontSize: 10.5, color: T.goldDim, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 5, fontFamily: T.sans, fontWeight: 600 }}>Full Name</div>
          <input name="name" type="text" placeholder="Your full name" value={data.name} onChange={set} style={iStyle}
            onFocus={e => { e.target.style.borderColor = T.gold; e.target.style.background = "rgba(201,168,76,0.04)"; }}
            onBlur={e  => { e.target.style.borderColor = T.line;  e.target.style.background = T.surface; }} />
        </div>

        <div>
          <div style={{ fontSize: 10.5, color: T.goldDim, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 5, fontFamily: T.sans, fontWeight: 600 }}>Mobile Number</div>
          <div style={{ display: "flex", alignItems: "center", background: T.surface, border: `1px solid ${T.line}`, borderRadius: 8, overflow: "hidden" }}>
            <span style={{ padding: "11px 10px", fontSize: 14, color: T.gold, fontWeight: 600, fontFamily: T.sans, borderRight: `1px solid ${T.line}`, whiteSpace: "nowrap", flexShrink: 0 }}>+91</span>
            <input name="phone" type="tel" placeholder="10-digit number" maxLength={10} value={data.phone} onChange={set}
              style={{ ...iStyle, border: "none", borderRadius: 0, flex: 1, minWidth: 0 }}
              onFocus={e => e.target.style.outline = "none"}
              onBlur={e  => e.target.style.outline = "none"} />
          </div>
        </div>

        <div style={{ gridColumn: "1 / -1" }}>
          <div style={{ fontSize: 10.5, color: T.goldDim, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 5, fontFamily: T.sans, fontWeight: 600 }}>Email Address</div>
          <input name="email" type="email" placeholder="Your email address" value={data.email} onChange={set} style={iStyle}
            onFocus={e => { e.target.style.borderColor = T.gold; e.target.style.background = "rgba(201,168,76,0.04)"; }}
            onBlur={e  => { e.target.style.borderColor = T.line;  e.target.style.background = T.surface; }} />
        </div>

        <div style={{ gridColumn: "1 / -1" }}>
          <div style={{ fontSize: 10.5, color: T.goldDim, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 5, fontFamily: T.sans, fontWeight: 600 }}>City</div>
          <input name="city" type="text" placeholder="Your city" value={data.city} onChange={set} style={iStyle}
            onFocus={e => { e.target.style.borderColor = T.gold; e.target.style.background = "rgba(201,168,76,0.04)"; }}
            onBlur={e  => { e.target.style.borderColor = T.line;  e.target.style.background = T.surface; }} />
        </div>
      </div>

      <div>
        <div style={{ fontSize: 10.5, color: T.goldDim, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8, fontFamily: T.sans, fontWeight: 600 }}>Instagram Verification</div>
        <InstaCheck checked={insta} onChange={setInsta} />
      </div>

      {err && (
        <div style={{ fontSize: 12, color: "#FCA5A5", background: "rgba(220,38,38,0.1)", border: "1px solid rgba(220,38,38,0.2)", padding: "9px 13px", borderRadius: 7, fontFamily: T.sans }}>
          {err}
        </div>
      )}

      <button onClick={submit} disabled={checking}
        style={{ marginTop: 2, padding: "13px", background: checking ? "rgba(201,168,76,0.3)" : T.gold, color: T.ink, fontWeight: 700, fontSize: 13, fontFamily: T.sans, border: "none", borderRadius: 9, cursor: checking ? "not-allowed" : "pointer", textTransform: "uppercase", letterSpacing: "0.1em" }}
        onMouseEnter={e => { if (!checking) e.target.style.opacity = "0.88"; }}
        onMouseLeave={e => { e.target.style.opacity = "1"; }}>
        {checking ? "Verifying…" : "Unlock My 3 Spins →"}
      </button>

      <p style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", fontFamily: T.sans, textAlign: "center", margin: 0, letterSpacing: "0.04em" }}>
        3 spins per device & phone number · Results are final
      </p>
    </div>
  );
};

/* ─── Pick one reward ──────────────────────────────────────────── */
const PickOneReward = ({ list, selected, onSelect }) => {
  const claimable = (list || []).filter(r => !NON_REWARDS.includes(r.label));
  if (claimable.length === 0) {
    return (
      <div style={{ background: T.surface, border: `1px solid ${T.line}`, borderRadius: 10, padding: "16px 14px", textAlign: "center", width: "100%", boxSizing: "border-box" }}>
        <p style={{ fontSize: 13, color: T.muted, fontFamily: T.sans, margin: 0 }}>
          No claimable rewards this round. Better luck next time!
        </p>
      </div>
    );
  }
  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 8 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
        <span style={{ fontSize: 10, color: T.gold, fontFamily: T.sans, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>
          Pick 1 reward to claim
        </span>
        <span style={{ fontSize: 10, color: T.muted, fontFamily: T.sans }}>(tap to select)</span>
      </div>
      {claimable.map((r, i) => {
        const isSelected = selected && selected.label === r.label && selected.ts === r.ts;
        return (
          <div key={i} onClick={() => onSelect(r)} style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "13px 14px",
            background: isSelected ? "rgba(201,168,76,0.10)" : T.surface,
            border: `1.5px solid ${isSelected ? T.gold : T.line}`,
            borderRadius: 10, cursor: "pointer", transition: "all 0.2s",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{
                width: 18, height: 18, borderRadius: "50%", flexShrink: 0,
                border: `2px solid ${isSelected ? T.gold : "rgba(201,168,76,0.35)"}`,
                background: isSelected ? T.gold : "transparent",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {isSelected && <div style={{ width: 7, height: 7, borderRadius: "50%", background: T.ink }} />}
              </div>
              <span style={{ fontSize: 14, color: isSelected ? T.white : "rgba(255,255,255,0.75)", fontFamily: T.font }}>
                {r.label}
              </span>
            </div>
            <span style={{ fontSize: 11, color: T.muted, fontFamily: T.sans }}>{r.sub}</span>
          </div>
        );
      })}
      {claimable.length > 1 && (
        <p style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", fontFamily: T.sans, margin: "2px 0 0", letterSpacing: "0.03em" }}>
          You earned {claimable.length} rewards — only 1 can be redeemed.
        </p>
      )}
    </div>
  );
};

/* ═══════════════════ MAIN COMPONENT ═══════════════════════════════ */
const SpinWheel = () => {
  const [open,         setOpen]         = useState(false);
  const [step,         setStep]         = useState("form");
  const [user,         setUser]         = useState(null);
  const [userId,       setUserId]       = useState(null);
  const [spinning,     setSpinning]     = useState(false);
  const [result,       setResult]       = useState(null);
  const [confetti,     setConfetti]     = useState(false);
  const [spinsUsed,    setSpinsUsed]    = useState(0);
  const [rewards,      setRewards]      = useState([]);
  const [firstSpinTime,setFirstSpinTime]= useState(null);
  const [chosenReward, setChosenReward] = useState(null);

  const canvasRef = useRef(null);
  const rotRef    = useRef(0);
  const animRef   = useRef(null);

  /* ── Bootstrap ── */
  useEffect(() => {
    const rec = loadOrRestoreRecord(null);
    const used = rec.spinsUsed || 0;
    setSpinsUsed(used);
    setRewards(rec.rewards || []);
    setFirstSpinTime(rec.firstSpinTime || null);
    if (rec.user) { setUser(rec.user); setUserId(rec.userId); }

    if (used >= MAX_SPINS) {
      const tl = getTimeLeft(rec.firstSpinTime);
      setStep(tl ? "locked" : "spin");
      if (!tl && used >= MAX_SPINS) {
        const fresh = { ...rec, spinsUsed: 0, rewards: [], firstSpinTime: null };
        saveRecord(fresh);
        setSpinsUsed(0); setRewards([]); setFirstSpinTime(null);
        setStep(rec.user ? "spin" : "form");
      }
    } else if (rec.user) {
      setStep("spin");
    }

    const t = setTimeout(() => setOpen(true), 1800);
    return () => clearTimeout(t);
  }, []);

  /* ── Draw wheel when spin step opens ── */
  useEffect(() => {
    if (open && step === "spin") {
      const t = setTimeout(() => drawWheel(canvasRef.current, rotRef.current), 80);
      return () => clearTimeout(t);
    }
  }, [open, step]);

  /* ── Inject styles ── */
  useEffect(() => {
    const id = "gsm-spin-v7-styles";
    if (document.getElementById(id)) return;
    const s = document.createElement("style");
    s.id = id;
    s.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@400;500;600;700&display=swap');
      @keyframes gsmIn {
        0%   { opacity:0; transform:translate(-50%,-50%) scale(0.88) translateY(14px); }
        70%  { transform:translate(-50%,-50%) scale(1.015) translateY(0); }
        100% { opacity:1; transform:translate(-50%,-50%) scale(1); }
      }
      @keyframes gsmFadeIn  { from{opacity:0}to{opacity:1} }
      @keyframes gsmSlideUp { from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)} }
      @keyframes gsmTabGlow {
        0%,100% { box-shadow:-4px 0 16px rgba(201,168,76,0.25); }
        50%     { box-shadow:-4px 0 28px rgba(201,168,76,0.55); }
      }
      @keyframes gsmPulse {
        0%,100% { transform:scale(1); opacity:1; }
        50%     { transform:scale(1.5); opacity:0.6; }
      }
    `;
    document.head.appendChild(s);
  }, []);

  /* ─── n8n Webhook ──────────────────────────────────────────────── */
  const sendToWebhook = async (chosenRwd, currentRewards, currentUser, currentUserId) => {
    const payload = {
      timestamp:              new Date().toISOString(),
      userId:                 currentUserId,
      name:                   currentUser?.name  || null,
      phone:                  currentUser?.phone || null,
      email:                  currentUser?.email || null,
      city:                   currentUser?.city  || null,
      spin1:                  currentRewards[0]?.label || null,
      spin2:                  currentRewards[1]?.label || null,
      spin3:                  currentRewards[2]?.label || null,
      claimedReward:          chosenRwd?.label || null,
      claimedRewardCondition: chosenRwd?.sub   || null,
    };
    try {
      await fetch(WEBHOOK_URL, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(payload),
      });
    } catch (err) {
      console.warn("GSM webhook failed:", err);
    }
  };

  /* ── Helpers ── */
  const claimURL = (reward) => {
    const earnedRewards = rewards.filter(r => !NON_REWARDS.includes(r.label));
    const spinLog = rewards
      .map((r, i) => `• Spin ${i + 1}: ${r.label}`)
      .join("\n");
    const claimTime = new Date().toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });

    const msg = reward
      ? `🎉 *GSM Spin & Win — Reward Claim*\n\nHi team! I just completed my 3 spins and would like to claim my reward.\n\n━━━━━━━━━━━━━━━━━━━\n👤 *My Details*\n• Name: ${user?.name}\n• Phone: ${user?.phone}\n• City: ${user?.city || "—"}\n• User ID: ${userId}\n\n🎰 *My Spin Results*\n${spinLog}\n\n🏆 *Reward I Want to Claim*\n➡️ ${reward.label}\n   ${reward.sub}\n━━━━━━━━━━━━━━━━━━━\n\nThank you, Ghoomo Saste Me! 🙏\nClaimed at: ${claimTime}`
      : `🎉 *GSM Spin & Win — Reward Claim*\n\nHi team! I completed my spins and want to claim my reward.\n\n• Name: ${user?.name}\n• Phone: ${user?.phone}\n• User ID: ${userId}\n\nClaimed at: ${claimTime}`;

    return `https://wa.me/${WHATSAPP_NUM}?text=${encodeURIComponent(msg)}`;
  };

  const handleTimerExpire = () => {
    const rec = loadOrRestoreRecord(user?.phone);
    const fresh = { ...rec, spinsUsed: 0, rewards: [], firstSpinTime: null };
    saveRecord(fresh);
    setSpinsUsed(0); setRewards([]); setFirstSpinTime(null);
    setStep("spin");
    setTimeout(() => drawWheel(canvasRef.current, rotRef.current), 80);
  };

  /* ── Form submit ── */
  const handleForm = (userData, existingRec) => {
    let rec;
    if (existingRec && existingRec.userId) {
      rec = existingRec;
      setSpinsUsed(rec.spinsUsed || 0);
      setRewards(rec.rewards || []);
      setFirstSpinTime(rec.firstSpinTime || null);
      setUserId(rec.userId);
      setUser(userData);
      rec.user = userData;
      saveRecord(rec);
      const tl = getTimeLeft(rec.firstSpinTime);
      if ((rec.spinsUsed || 0) >= MAX_SPINS && tl) {
        setStep("locked");
      } else if ((rec.spinsUsed || 0) >= MAX_SPINS && !tl) {
        const fresh = { ...rec, spinsUsed: 0, rewards: [], firstSpinTime: null };
        saveRecord(fresh);
        setSpinsUsed(0); setRewards([]); setFirstSpinTime(null);
        setStep("spin");
      } else {
        setStep("spin");
      }
    } else {
      const newId = generateUserId();
      rec = {
        userId:        newId,
        spinsUsed:     0,
        rewards:       [],
        user:          userData,
        firstSpinTime: null,
        createdAt:     Date.now(),
      };
      setUserId(newId);
      setUser(userData);
      saveRecord(rec);
      setStep("spin");
    }
  };

  /* ── Spin ── */
  const doSpin = () => {
    if (spinning || spinsUsed >= MAX_SPINS) return;
    if (animRef.current) cancelAnimationFrame(animRef.current);
    setSpinning(true);

    const winIdx    = pickSegment();
    const segCentre = winIdx * ARC + ARC / 2;
    const jitter    = (Math.random() - 0.5) * 0.8 * ARC;
    const fullSpins = (5 + Math.floor(Math.random() * 4)) * 2 * Math.PI;
    const curMod    = ((rotRef.current % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
    const targetRot = rotRef.current - curMod + fullSpins
      + (2 * Math.PI - segCentre + jitter + 2 * Math.PI) % (2 * Math.PI);
    const duration  = 5000 + Math.random() * 800;
    const startTime = performance.now();
    const startRot  = rotRef.current;

    const animate = (now) => {
      const p    = Math.min((now - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 4);
      rotRef.current = startRot + (targetRot - startRot) * ease;
      drawWheel(canvasRef.current, rotRef.current);
      if (p < 1) { animRef.current = requestAnimationFrame(animate); return; }

      const actualIdx  = resolveSegment(rotRef.current);
      const won        = SEGMENTS[actualIdx];
      const newUsed    = spinsUsed + 1;
      const newRewards = [...rewards, { label: won.label, sub: won.sub, ts: Date.now() }];
      const now2       = Date.now();
      const newFirst   = firstSpinTime || (newUsed === 1 ? now2 : null);

      setSpinning(false);
      setResult(won);
      setSpinsUsed(newUsed);
      setRewards(newRewards);
      setFirstSpinTime(newFirst);
      setConfetti(true);
      setTimeout(() => setConfetti(false), 3600);

      const rec = loadOrRestoreRecord(user?.phone);
      saveRecord({
        ...rec,
        spinsUsed:     newUsed,
        rewards:       newRewards,
        firstSpinTime: newFirst,
      });

      setStep(newUsed >= MAX_SPINS ? "result_final" : "result");
    };
    animRef.current = requestAnimationFrame(animate);
  };

  const spinAgain = () => {
    setResult(null);
    setStep("spin");
    setTimeout(() => drawWheel(canvasRef.current, rotRef.current), 80);
  };

  /* ── Shared sub-components ── */
  const Header = () => (
    <div style={{ textAlign: "center", marginBottom: 20 }}>
      <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: T.goldBg, border: `1px solid ${T.line}`, borderRadius: 20, padding: "4px 12px", marginBottom: 10 }}>
        <span style={{ fontSize: 9, color: T.gold, fontFamily: T.sans, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" }}>Ghoomo Saste Me</span>
      </div>
      <h2 style={{ fontFamily: T.font, color: T.white, fontSize: 26, fontWeight: 400, margin: "0 0 4px" }}>
        Spin <span style={{ color: T.gold }}>&</span> Win
      </h2>
      <p style={{ fontSize: 12, color: T.muted, fontFamily: T.sans, margin: 0, letterSpacing: "0.04em" }}>Your exclusive travel reward awaits</p>
      <div style={{ width: 48, height: 1, background: `linear-gradient(90deg,transparent,${T.gold},transparent)`, margin: "12px auto 8px" }} />
      {userId && (
        <div style={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
          <UserIDBadge userId={userId} />
        </div>
      )}
    </div>
  );

  const panelStyle = {
    position: "fixed", top: "50%", left: "50%",
    transform: "translate(-50%,-50%)", zIndex: 99991,
    background: T.panel, border: `1px solid ${T.line}`,
    borderRadius: 20, padding: "32px 28px 28px",
    width: "min(96vw,440px)", maxHeight: "92vh", overflowY: "auto",
    animation: "gsmIn 0.5s cubic-bezier(0.22,1,0.36,1) both",
    boxSizing: "border-box", scrollbarWidth: "none",
  };

  const modalContent = (
    <>
      {/* Backdrop */}
      <div
        onClick={() => setOpen(false)}
        style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.72)", backdropFilter: "blur(6px)", zIndex: 99990, animation: "gsmFadeIn 0.3s ease" }}
      />

      <div style={panelStyle}>
        {/* Close */}
        <button onClick={() => setOpen(false)}
          style={{ position: "absolute", top: 14, right: 14, width: 32, height: 32, borderRadius: "50%", background: T.faint, border: `1px solid ${T.line}`, color: T.muted, fontSize: 20, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: T.sans, lineHeight: 1 }}
          onMouseEnter={e => e.target.style.background = "rgba(255,255,255,0.18)"}
          onMouseLeave={e => e.target.style.background = T.faint}>
          ×
        </button>

        <Header />

        {/* ── Form ── */}
        {step === "form" && <LeadForm onSubmit={handleForm} />}

        {/* ── Spin ── */}
        {step === "spin" && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
            <div style={{ textAlign: "center" }}>
              <p style={{ color: T.muted, fontSize: 13, fontFamily: T.sans, margin: "0 0 4px" }}>
                Welcome, <strong style={{ color: T.gold, fontFamily: T.font, fontWeight: 400, fontSize: 15 }}>{user?.name?.split(" ")[0]}</strong> — your moment is here.
              </p>
              <SpinDots used={spinsUsed} total={MAX_SPINS} />
            </div>

            <div style={{ position: "relative", display: "inline-block" }}>
              <div style={{ position: "absolute", inset: -10, borderRadius: "50%", border: `1px solid ${T.line}`, pointerEvents: "none" }} />
              <div style={{ position: "absolute", top: -18, left: "50%", transform: "translateX(-50%)", width: 0, height: 0, borderLeft: "11px solid transparent", borderRight: "11px solid transparent", borderTop: `24px solid ${T.gold}`, zIndex: 10, filter: "drop-shadow(0 2px 6px rgba(201,168,76,0.5))" }} />
              <canvas ref={canvasRef} width={320} height={320} style={{ borderRadius: "50%", display: "block" }} />
              <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 52, height: 52, background: T.panel, border: `2px solid ${T.gold}`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 5 }}>
                <span style={{ fontSize: 10, color: T.gold, fontFamily: T.sans, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>SPIN</span>
              </div>
            </div>

            <button onClick={doSpin} disabled={spinning}
              style={{ width: "100%", padding: "14px", background: spinning ? "rgba(201,168,76,0.25)" : T.gold, color: spinning ? T.goldDim : T.ink, fontWeight: 700, fontSize: 13, fontFamily: T.sans, border: `1px solid ${spinning ? T.goldDim : T.gold}`, borderRadius: 10, cursor: spinning ? "not-allowed" : "pointer", textTransform: "uppercase", letterSpacing: "0.1em", transition: "all 0.25s" }}>
              {spinning ? "Spinning…" : `Spin the Wheel → (${MAX_SPINS - spinsUsed} left)`}
            </button>

            <p style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", fontFamily: T.sans, textAlign: "center", margin: 0, letterSpacing: "0.04em" }}>
              {MAX_SPINS} spins per device · Each result is final
            </p>
          </div>
        )}

        {/* ── Mid-game result ── */}
        {step === "result" && result && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14, position: "relative", animation: "gsmSlideUp 0.4s ease" }}>
            <Confetti active={confetti} />
            <div style={{ width: "100%", background: T.surface, border: `1px solid ${T.gold}`, borderRadius: 14, padding: "22px 20px", textAlign: "center", boxSizing: "border-box", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,transparent,${T.gold},transparent)` }} />
              <p style={{ fontSize: 10, color: T.goldDim, fontFamily: T.sans, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", margin: "0 0 8px" }}>
                Spin {spinsUsed} of {MAX_SPINS} — You won
              </p>
              <p style={{ fontFamily: T.font, color: T.white, fontSize: 28, margin: "0 0 5px", lineHeight: 1.1 }}>{result.label}</p>
              <p style={{ fontSize: 13, color: T.muted, fontFamily: T.sans, margin: 0 }}>{result.sub}</p>
            </div>
            <SpinDots used={spinsUsed} total={MAX_SPINS} />
            <div style={{ width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <button onClick={spinAgain}
                style={{ padding: "13px", background: "transparent", color: T.gold, fontWeight: 700, fontSize: 12, fontFamily: T.sans, border: `1px solid ${T.gold}`, borderRadius: 10, cursor: "pointer", textTransform: "uppercase", letterSpacing: "0.08em", transition: "all 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.background = T.goldBg}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                Spin Again ({MAX_SPINS - spinsUsed} left)
              </button>
              <a href={claimURL(result)} target="_blank" rel="noreferrer"
                style={{ padding: "13px", background: T.success, color: T.ink, fontWeight: 700, fontSize: 12, fontFamily: T.sans, borderRadius: 10, textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center", textTransform: "uppercase", letterSpacing: "0.08em", boxSizing: "border-box" }}>
                Claim →
              </a>
            </div>
            <p style={{ fontSize: 11, color: "rgba(255,255,255,0.18)", fontFamily: T.sans, textAlign: "center", margin: 0, letterSpacing: "0.04em" }}>
              Screenshot as proof · T&amp;C apply
            </p>
          </div>
        )}

        {/* ── Final result (all spins done) ── */}
        {step === "result_final" && result && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14, position: "relative", animation: "gsmSlideUp 0.4s ease" }}>
            <Confetti active={confetti} />

            <div style={{ width: "100%", background: T.surface, border: `1px solid ${T.gold}`, borderRadius: 14, padding: "22px 20px", textAlign: "center", boxSizing: "border-box", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,transparent,${T.gold},transparent)` }} />
              <p style={{ fontSize: 10, color: T.goldDim, fontFamily: T.sans, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", margin: "0 0 8px" }}>
                Final spin — You won
              </p>
              <p style={{ fontFamily: T.font, color: T.white, fontSize: 28, margin: "0 0 5px", lineHeight: 1.1 }}>{result.label}</p>
              <p style={{ fontSize: 13, color: T.muted, fontFamily: T.sans, margin: 0 }}>{result.sub}</p>
            </div>

            <PickOneReward list={rewards} selected={chosenReward} onSelect={setChosenReward} />

            <div style={{ width: "100%", background: T.surface, border: `1px solid ${T.line}`, borderRadius: 10, padding: "12px 14px", boxSizing: "border-box" }}>
              <p style={{ fontSize: 11, color: T.gold, fontFamily: T.sans, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 5px" }}>What next?</p>
              <p style={{ fontSize: 13, color: T.muted, fontFamily: T.sans, lineHeight: 1.7, margin: 0 }}>
                Select 1 reward above, then tap Claim. Our team will contact you at{" "}
                <strong style={{ color: T.white }}>{user?.phone}</strong> within 24 hours.
              </p>
            </div>

            <CountdownTimer firstSpinTime={firstSpinTime} onExpire={handleTimerExpire} />

            <a
              href={claimURL(chosenReward)}
              target="_blank" rel="noreferrer"
              onClick={e => {
                if (!chosenReward) { e.preventDefault(); return; }
                sendToWebhook(chosenReward, rewards, user, userId);
              }}
              style={{
                width: "100%", padding: "13px",
                background: chosenReward ? T.success : "rgba(61,190,122,0.3)",
                color: T.ink, fontWeight: 700, fontSize: 13, fontFamily: T.sans,
                borderRadius: 10, textDecoration: "none", display: "block",
                textAlign: "center", letterSpacing: "0.07em", textTransform: "uppercase",
                boxSizing: "border-box", cursor: chosenReward ? "pointer" : "not-allowed",
                transition: "all 0.2s",
              }}>
              {chosenReward ? `Claim "${chosenReward.label}" on WhatsApp →` : "Select a reward to claim"}
            </a>

            <p style={{ fontSize: 11, color: "rgba(255,255,255,0.18)", fontFamily: T.sans, textAlign: "center", margin: 0, letterSpacing: "0.04em" }}>
              Screenshot this screen as proof · T&amp;C apply
            </p>
          </div>
        )}

        {/* ── Locked / timer screen ── */}
        {step === "locked" && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, animation: "gsmSlideUp 0.4s ease" }}>
            <div style={{ width: 64, height: 64, borderRadius: "50%", background: T.goldBg, border: `1px solid ${T.line}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26 }}>
              🔒
            </div>

            <div style={{ textAlign: "center" }}>
              <p style={{ color: T.white, fontFamily: T.font, fontSize: 20, margin: "0 0 6px" }}>All 3 spins used</p>
              <p style={{ color: T.muted, fontSize: 13, fontFamily: T.sans, lineHeight: 1.7, margin: 0 }}>
                Your spins are locked. The countdown below shows when your next 3 spins unlock.
              </p>
            </div>

            <CountdownTimer firstSpinTime={firstSpinTime} onExpire={handleTimerExpire} />

            <PickOneReward list={rewards} selected={chosenReward} onSelect={setChosenReward} />

            <a
              href={claimURL(chosenReward)}
              target="_blank" rel="noreferrer"
              onClick={e => {
                if (!chosenReward) { e.preventDefault(); return; }
                sendToWebhook(chosenReward, rewards, user, userId);
              }}
              style={{
                display: "block", width: "100%", padding: "13px", textAlign: "center",
                background: chosenReward ? T.success : "rgba(61,190,122,0.3)",
                color: T.ink, borderRadius: 10, textDecoration: "none",
                fontWeight: 700, fontSize: 13, fontFamily: T.sans,
                letterSpacing: "0.06em", textTransform: "uppercase",
                cursor: chosenReward ? "pointer" : "not-allowed",
                boxSizing: "border-box", transition: "all 0.2s",
              }}>
              {chosenReward ? `Claim "${chosenReward.label}" on WhatsApp →` : "Select a reward first"}
            </a>

            <p style={{ fontSize: 11, color: "rgba(255,255,255,0.18)", fontFamily: T.sans, textAlign: "center", margin: 0, letterSpacing: "0.04em" }}>
              User ID: <span style={{ fontFamily: "monospace", color: T.goldDim }}>{userId}</span>
            </p>
          </div>
        )}
      </div>
    </>
  );

  return (
    <>
      {/* Side tab */}
      <div
        onClick={() => setOpen(true)}
        style={{
          position: "fixed", right: 0, top: "50%", transform: "translateY(-50%)",
          zIndex: 99989, background: T.panel, border: `1px solid ${T.gold}`, borderRight: "none",
          color: T.gold, writingMode: "vertical-rl", padding: "18px 11px",
          borderRadius: "12px 0 0 12px", fontSize: 11.5, fontFamily: T.sans,
          fontWeight: 700, letterSpacing: "0.12em", cursor: "pointer",
          textTransform: "uppercase", userSelect: "none",
          animation: "gsmTabGlow 3s ease-in-out infinite",
        }}>
        Spin &amp; Win
      </div>

      {open && createPortal(modalContent, document.body)}
    </>
  );
};

export default SpinWheel;