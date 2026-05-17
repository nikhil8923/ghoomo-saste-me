import React, { useState, useEffect } from 'react';
import { X, ExternalLink, Gift } from 'lucide-react';

const OfferPopup = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 1200);
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <style>{`
        @keyframes slideUpFade {
          from { opacity: 0; transform: translateY(16px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes shakeInfinite {
          0%,70%,100% { transform: rotate(0deg) translateX(0); }
          72%  { transform: rotate(-2deg) translateX(-2px); }
          74%  { transform: rotate(2deg)  translateX(2px);  }
          76%  { transform: rotate(-2deg) translateX(-2px); }
          78%  { transform: rotate(2deg)  translateX(2px);  }
          80%  { transform: rotate(-1deg) translateX(-1px); }
          82%  { transform: rotate(1deg)  translateX(1px);  }
          84%  { transform: rotate(0deg)  translateX(0);    }
        }
        @keyframes goldPulse {
          0%,100% { box-shadow: 0 0 0 0   rgba(201,168,76,0.0),  0 8px 24px rgba(4,10,28,0.5); }
          50%     { box-shadow: 0 0 0 4px rgba(201,168,76,0.2),  0 8px 24px rgba(4,10,28,0.5); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes dotBlink {
          0%,100% { opacity:1; transform:scale(1); }
          50%     { opacity:0.3; transform:scale(0.6); }
        }

        .offer-wrap {
          position: fixed;
          left: 10px;
          z-index: 9999;
          animation: slideUpFade 0.5s cubic-bezier(0.34,1.56,0.64,1) both;
        }

        /* Mobile: above bottom nav bar (70px) */
        @media (max-width: 639px) {
          .offer-wrap {
            bottom: 78px;
            width: 130px;
          }
        }

        /* Desktop: true bottom corner */
        @media (min-width: 640px) {
          .offer-wrap {
            bottom: 20px;
            width: 160px;
          }
        }

        .offer-shake {
          animation: shakeInfinite 8s ease-in-out infinite;
        }
        .offer-card {
          position: relative;
          background: linear-gradient(150deg, #0D1B3E 0%, #142050 60%, #0A1428 100%);
          border-radius: 14px;
          overflow: hidden;
          border: 1.5px solid rgba(201,168,76,0.5);
          animation: goldPulse 3s ease-in-out infinite;
          animation-delay: 2s;
        }
        .offer-top-line {
          position: absolute; top:0; left:0; right:0; height:2px;
          background: linear-gradient(90deg, transparent, #C9A84C 40%, #F5DC82 55%, #C9A84C 75%, transparent);
        }
        .offer-glow-tr {
          position: absolute; top:-18px; right:-18px;
          width:60px; height:60px; border-radius:50%;
          background: radial-gradient(circle, rgba(201,168,76,0.22) 0%, transparent 70%);
          pointer-events:none;
        }
        .offer-dots-bg {
          position:absolute; inset:0; opacity:0.04; pointer-events:none;
          background-image: radial-gradient(circle, #C9A84C 1px, transparent 1px);
          background-size: 11px 11px;
        }
        .offer-close {
          position:absolute; top:6px; right:6px;
          width:16px; height:16px; border-radius:50%;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(201,168,76,0.3);
          color: rgba(255,255,255,0.5);
          display:flex; align-items:center; justify-content:center;
          cursor:pointer; z-index:10; padding:0;
          transition: background 0.2s, color 0.2s;
        }
        .offer-close:hover {
          background: rgba(201,168,76,0.2);
          color: #C9A84C;
        }
        .offer-body { padding: 10px 10px 9px; }

        .offer-badge {
          display:inline-flex; align-items:center; gap:3px;
          background: linear-gradient(105deg,#C9A84C,#E8C97A);
          border-radius:99px; padding:2px 7px; margin-bottom:7px;
        }
        .offer-badge span {
          font-size:6.5px; font-weight:800;
          letter-spacing:0.1em; text-transform:uppercase; color:#0D1B3E;
        }

        .offer-title {
          font-size:12px; font-weight:900; line-height:1.1;
          color:#fff; text-transform:uppercase;
          letter-spacing:-0.01em; margin-bottom:5px;
          font-family:Georgia,serif;
        }
        .offer-title-gold {
          background: linear-gradient(105deg,#C9A84C 20%,#F5DC82 60%,#C9A84C 100%);
          -webkit-background-clip:text; -webkit-text-fill-color:transparent;
          background-clip:text;
        }

        .offer-divider {
          width:22px; height:1.5px; border-radius:99px;
          background: linear-gradient(90deg,#C9A84C,rgba(201,168,76,0.15));
          margin-bottom:7px;
        }

        .offer-price {
          font-size:8.5px; font-weight:600;
          color:rgba(255,255,255,0.65); line-height:1.5; margin-bottom:5px;
        }
        .offer-price-amt { color:#C9A84C; font-weight:800; font-size:9.5px; }

        .offer-dest-row {
          display:flex; align-items:center; gap:4px; margin-bottom:2px;
        }
        .offer-dest-dot {
          width:3px; height:3px; border-radius:50%;
          background:#C9A84C; flex-shrink:0;
        }
        .offer-dest-text {
          font-size:7.5px; color:rgba(255,255,255,0.5); font-weight:500;
        }

        .offer-urgency {
          display:inline-flex; align-items:center; gap:3px;
          margin-top:6px;
          background:rgba(201,168,76,0.1);
          border:1px solid rgba(201,168,76,0.28);
          border-radius:5px; padding:2px 6px;
        }
        .offer-urgency span {
          font-size:6px; font-weight:700; color:#C9A84C;
          letter-spacing:0.07em; text-transform:uppercase;
        }
        .offer-dot {
          width:3px; height:3px; border-radius:50%; background:#C9A84C;
          animation: dotBlink 1.5s ease-in-out infinite;
        }
        .offer-dot:nth-child(2){animation-delay:0.25s;}
        .offer-dot:nth-child(3){animation-delay:0.5s;}

        .offer-cta {
          display:flex; align-items:center; justify-content:center; gap:4px;
          width:100%; border-radius:99px; padding:6px 8px;
          font-weight:800; font-size:8.5px;
          text-transform:uppercase; letter-spacing:0.08em;
          font-style:italic; color:#0D1B3E; text-decoration:none;
          margin-top:8px;
          background-size:200% auto;
          background-image: linear-gradient(105deg,#C9A84C 0%,#F5DC82 38%,#EDD070 50%,#F5DC82 62%,#C9A84C 100%);
          animation: shimmer 2.6s linear infinite;
          transition: color 0.2s;
        }
        .offer-cta:hover {
          background-image: linear-gradient(105deg,#0D1B3E,#1a2d5a) !important;
          animation:none !important; color:#C9A84C !important;
        }
      `}</style>

      <div className="offer-wrap">
        <div className="offer-shake">
          <div className="offer-card">

            <div className="offer-top-line" />
            <div className="offer-glow-tr" />
            <div className="offer-dots-bg" />

            <button className="offer-close" onClick={() => setIsVisible(false)}>
              <X size={8} />
            </button>

            <div className="offer-body">

              <div className="offer-badge">
                <Gift size={7} color="#0D1B3E" strokeWidth={2.5} />
                <span>Budget Offer</span>
              </div>

              <div className="offer-title">
                Low Budget<br />
                <span className="offer-title-gold">High Adventure</span>
              </div>

              <div className="offer-divider" />

              <div className="offer-price">
                Explore India @{' '}
                <span className="offer-price-amt">₹5000</span>
              </div>

              <div>
                {['Manali • Kedarnath', 'Chopta • Rishikesh', 'Kasol'].map((d, i) => (
                  <div key={i} className="offer-dest-row">
                    <div className="offer-dest-dot" />
                    <span className="offer-dest-text">{d}</span>
                  </div>
                ))}

                <div className="offer-urgency">
                  <div className="offer-dot" />
                  <div className="offer-dot" />
                  <div className="offer-dot" />
                  <span>Limited Slots!</span>
                </div>
              </div>

              <a
                href="https://wa.me/917827372844"
                target="_blank"
                rel="noreferrer"
                className="offer-cta"
              >
                Book Now <ExternalLink size={8} strokeWidth={2.5} />
              </a>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OfferPopup;