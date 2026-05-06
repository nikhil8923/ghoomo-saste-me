import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import {
  ShieldCheck, Users, Wallet, Headphones,
  ChevronLeft, ChevronRight, MapPin,
  Award, ArrowRight
} from 'lucide-react';

import Hero from '../components/Hero';
import Categories from '../components/Categories';
import UpcomingTrips from '../components/UpcomingTrips';
import Reels from '../components/Reels';
import Reviews from '../components/Reviews';
import FAQ from '../components/FAQ';
import ImageGallery from '../components/ImageGallery';
import TravelerReviews from "../components/TravelerReviews";

/* ─────────────────────────────────────────
   GLOBAL STYLES
───────────────────────────────────────── */
const GlobalStyles = () => (
  <style>{`
    :root {
      --navy:   #0D1B3E;
      --navy-2: #162347;
      --gold:   #C9A84C;
      --gold-l: #E8C97A;
      --gold-xl:#FDF3D8;
      --cream:  #FAF7F0;
      --text-1: #0D1B3E;
      --text-2: #4A5568;
      --text-3: #9AA5B1;
    }

    .scrollbar-hide::-webkit-scrollbar { display: none; }
    .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }

    .gold-line {
      display: inline-block; width: 48px; height: 3px;
      background: var(--gold); border-radius: 99px; vertical-align: middle;
    }

    .lux-heading {
      font-family: 'Georgia', 'Times New Roman', serif;
      font-weight: 700; letter-spacing: -0.02em;
      color: var(--navy); line-height: 1.15;
    }

    /* ── Feature card ── */
    .feat-card {
      position: relative; background: #fff;
      border: 1px solid #EDE8DC; border-radius: 20px;
      padding: 28px 24px 24px;
      transition: box-shadow 0.25s, transform 0.25s; overflow: hidden;
    }
    .feat-card::before {
      content: ''; position: absolute; inset: 0; border-radius: 20px;
      border: 1.5px solid transparent;
      background: linear-gradient(135deg, var(--gold-l), transparent 60%) border-box;
      -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
      -webkit-mask-composite: destination-out; mask-composite: exclude;
      opacity: 0; transition: opacity 0.25s;
    }
    .feat-card:hover { box-shadow: 0 20px 60px rgba(201,168,76,0.12); transform: translateY(-4px); }
    .feat-card:hover::before { opacity: 1; }

    /* ── DESKTOP ── */
    @media (min-width: 768px) {
      .feat-cards-mobile  { display: none !important; }
      .feat-cards-desktop {
        display: grid !important;
        grid-template-columns: repeat(auto-fill, minmax(min(100%, 280px), 1fr));
        gap: 16px; margin-bottom: 52px; padding: 0 20px;
      }
      .feat-scroll-dots   { display: none !important; }
      .stats-row {
        display: grid !important;
        grid-template-columns: repeat(3, 1fr);
        gap: 12px; max-width: 640px;
        margin: 0 auto 52px !important;
        overflow-x: visible !important;
        padding: 0 20px !important;
      }
      .how-steps-mobile   { display: none !important; }
      .how-steps-desktop  { display: flex !important; }
      /* Fixed card width on desktop — show 4 cards with slight overflow hint */
      .dest-card-wrap     {
        min-width: 260px !important;
        max-width: 280px !important;
        flex: 1 1 260px !important;
      }
      .dest-dots          { display: none !important; }
    }

    /* ── MOBILE ── */
    @media (max-width: 767px) {
      .feat-cards-desktop { display: none !important; }
      .feat-cards-mobile {
        display: flex; gap: 12px; overflow-x: auto;
        scroll-snap-type: x mandatory;
        -webkit-overflow-scrolling: touch;
        padding: 4px 20px 12px;
      }
      .feat-cards-mobile .feat-card {
        flex-shrink: 0; scroll-snap-align: start;
        width: calc(80vw - 32px); max-width: 280px; min-width: 220px;
        padding: 20px 18px 18px; border-radius: 16px;
      }
      .how-steps-desktop  { display: none !important; }
      .how-steps-mobile   { display: flex !important; }
      .stats-row {
        display: flex !important; overflow-x: auto; gap: 10px;
        padding: 0 20px !important; margin-bottom: 32px !important;
        -webkit-overflow-scrolling: touch;
      }
      .stats-row .stat-pill { flex: 0 0 auto; min-width: 120px; }
      .dest-card-wrap {
        min-width: calc(82vw - 40px) !important;
        max-width: 300px !important;
        flex-shrink: 0 !important;
      }
    }

    /* ── Stat pill ── */
    .stat-pill {
      background: var(--cream); border: 1px solid #EDE8DC;
      border-radius: 16px; padding: 18px 16px; text-align: center;
    }

    /* ── Step connectors ── */
    .step-line-h {
      flex: 1; height: 1px;
      background: linear-gradient(to right, var(--gold), #EDE8DC);
      margin-top: 22px;
    }
    .step-line-v {
      width: 1px; min-height: 20px;
      background: linear-gradient(to bottom, var(--gold), #EDE8DC);
      margin-left: 21px;
    }

    /* ── Scroll dots ── */
    .scroll-dots { display: flex; justify-content: center; gap: 6px; margin-top: 16px; }
    .scroll-dot {
      width: 6px; height: 6px; border-radius: 50%;
      background: rgba(255,255,255,0.25);
      transition: background 0.2s, width 0.2s;
    }
    .scroll-dot.active       { background: var(--gold); width: 18px; border-radius: 3px; }
    .scroll-dot.dark-bg      { background: #EDE8DC; }
    .scroll-dot.dark-bg.active { background: var(--gold); }

    /* ── Trust marquee ── */
    @keyframes marquee {
      0%   { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    .trust-track { display: flex; gap: 40px; width: max-content; animation: marquee 22s linear infinite; }
    .trust-outer { overflow: hidden; }

    /* ── Luxury destination card ── */
    .dest-card {
      position: relative; border-radius: 20px; overflow: hidden;
      display: block; height: 380px;
      transition: transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94);
    }
    @media (max-width: 767px) { .dest-card { height: 300px; } }
    .dest-card:hover { transform: translateY(-6px); }
    .dest-card img   { width: 100%; height: 100%; object-fit: cover; transition: transform 0.7s ease; display: block; }
    .dest-card:hover img { transform: scale(1.07); }

    /* Gold shimmer border on hover */
    .dest-card::after {
      content: ''; position: absolute; inset: 0; border-radius: 20px;
      border: 2px solid transparent;
      background: linear-gradient(150deg, rgba(201,168,76,0.9), transparent 55%) border-box;
      -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
      -webkit-mask-composite: destination-out; mask-composite: exclude;
      opacity: 0; transition: opacity 0.4s;
    }
    .dest-card:hover::after { opacity: 1; }

    /* CTA pill slides up on hover */
    .dest-pill {
      display: inline-flex; align-items: center; gap: 6px;
      background: var(--gold); color: var(--navy);
      font-size: 11px; font-weight: 700; letter-spacing: 0.06em;
      text-transform: uppercase; padding: 7px 14px; border-radius: 99px;
      transform: translateY(10px); opacity: 0;
      transition: transform 0.35s, opacity 0.35s; text-decoration: none;
    }
    .dest-card:hover .dest-pill { transform: translateY(0); opacity: 1; }

    /* Tag badge */
    .dest-badge {
      position: absolute; top: 16px; right: 16px;
      background: rgba(13,27,62,0.65); backdrop-filter: blur(8px);
      border: 1px solid rgba(201,168,76,0.45);
      border-radius: 8px; padding: 5px 11px;
      font-size: 10px; font-weight: 700; color: var(--gold);
      letter-spacing: 0.08em; text-transform: uppercase;
    }
  `}</style>
);

/* ─────────────────────────────────────────
   EYEBROW
───────────────────────────────────────── */
const Eyebrow = ({ children, light }) => (
  <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'10px', marginBottom:'12px' }}>
    <span className="gold-line" />
    <span style={{ fontSize:'11px', fontWeight:600, letterSpacing:'0.12em', textTransform:'uppercase', color: light ? 'rgba(201,168,76,0.85)' : 'var(--gold)' }}>
      {children}
    </span>
    <span className="gold-line" />
  </div>
);

/* ─────────────────────────────────────────
   WHY GHOOMO
───────────────────────────────────────── */
const features = [
  { num:'01', Icon:Wallet,      bg:'linear-gradient(135deg,#F6D365,#C9A84C)', title:'Pocket Friendly', desc:'Premium travel without the premium price tag. Budget travel, beautifully reimagined.' },
  { num:'02', Icon:ShieldCheck, bg:'linear-gradient(135deg,#667EEA,#4F5FC9)', title:'Safe & Secure',    desc:'Your safety is our priority. Female-friendly trips and 24/7 comprehensive support.' },
  { num:'03', Icon:Users,       bg:'linear-gradient(135deg,#43E97B,#1A9E56)', title:'Expert Guides',   desc:'Local leaders who reveal hidden gems and authentic spots no tourist map will show.' },
  { num:'04', Icon:Headphones,  bg:'linear-gradient(135deg,#F857A6,#C0396A)', title:'Always Online',   desc:'One WhatsApp message away from help, any time, any day, any query.' },
  { num:'05', Icon:MapPin,      bg:'linear-gradient(135deg,#4FACFE,#0878D4)', title:'Curated Routes',  desc:'Off-the-beaten-path itineraries crafted by travellers, for travellers.' },
  { num:'06', Icon:Award,       bg:'linear-gradient(135deg,#FA8231,#E04010)', title:'100% Verified',   desc:'Every hotel, vehicle and activity hand-verified before it reaches your itinerary.' },
];

const howSteps = [
  { icon:'🔍', title:'Pick a trip',    desc:'Browse & choose your vibe' },
  { icon:'📅', title:'Book a slot',    desc:'Secure your spot easily' },
  { icon:'🎒', title:'Pack & go',      desc:'We handle the rest' },
  { icon:'❤️', title:'Make memories', desc:'Stories for a lifetime' },
];

const WhyGhoomo = () => {
  const mobileRef = React.useRef(null);
  const [activeIdx, setActiveIdx] = React.useState(0);

  const handleScroll = React.useCallback(() => {
    const el = mobileRef.current;
    if (!el) return;
    const cardW = (el.firstChild?.offsetWidth || 240) + 12;
    setActiveIdx(Math.round(el.scrollLeft / cardW));
  }, []);

  React.useEffect(() => {
    const el = mobileRef.current;
    if (el) el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el?.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const CardContent = ({ num, Icon, bg, title, desc }) => (
    <>
      <div style={{ position:'absolute', top:'16px', right:'18px', fontSize:'12px', fontWeight:700, color:'#EDE8DC', letterSpacing:'0.05em' }}>{num}</div>
      <div style={{ width:'48px', height:'48px', borderRadius:'14px', background:bg, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'16px', boxShadow:'0 6px 20px rgba(0,0,0,0.12)' }}>
        <Icon size={22} color="#fff" strokeWidth={2} />
      </div>
      <h3 style={{ fontSize:'15px', fontWeight:700, color:'var(--navy)', marginBottom:'6px' }}>{title}</h3>
      <p style={{ fontSize:'13px', color:'var(--text-2)', lineHeight:1.65 }}>{desc}</p>
    </>
  );

  return (
    <section style={{ background:'var(--cream)', padding:'72px 0 80px', position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', inset:0, opacity:0.04, pointerEvents:'none' }}>
        <svg width="100%" height="100%"><defs><pattern id="dots" width="28" height="28" patternUnits="userSpaceOnUse"><circle cx="1.5" cy="1.5" r="1.5" fill="#C9A84C"/></pattern></defs><rect width="100%" height="100%" fill="url(#dots)"/></svg>
      </div>

      <div style={{ maxWidth:'1200px', margin:'0 auto', position:'relative', zIndex:1 }}>

        <div style={{ padding:'0 20px' }}>
          <Eyebrow>India's most trusted travel squad</Eyebrow>
          <motion.h2
            initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
            transition={{ duration:0.6 }} viewport={{ once:true }}
            className="lux-heading"
            style={{ textAlign:'center', fontSize:'clamp(26px,5vw,48px)', marginBottom:'12px' }}
          >
            Why <span style={{ color:'var(--gold)' }}>Ghoomo</span> Saste Me?
          </motion.h2>
          <motion.p
            initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
            transition={{ duration:0.6, delay:0.1 }} viewport={{ once:true }}
            style={{ textAlign:'center', color:'var(--text-2)', fontSize:'clamp(13px,2.5vw,17px)', maxWidth:'540px', margin:'0 auto 48px', lineHeight:1.75 }}
          >
            We don't just sell trips — we craft unforgettable, budget-friendly journeys with premium experiences and guaranteed security.
          </motion.p>
        </div>

        {/* DESKTOP: 3-col grid */}
        <div className="feat-cards-desktop">
          {features.map(({ num, Icon, bg, title, desc }, i) => (
            <motion.div
              key={num} className="feat-card"
              initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }}
              transition={{ duration:0.5, delay: i * 0.08 }} viewport={{ once:true }}
            >
              <CardContent num={num} Icon={Icon} bg={bg} title={title} desc={desc} />
            </motion.div>
          ))}
        </div>

        {/* MOBILE: horizontal scroll */}
        <div ref={mobileRef} className="feat-cards-mobile scrollbar-hide">
          {features.map(({ num, Icon, bg, title, desc }, i) => (
            <motion.div
              key={num} className="feat-card"
              initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
              transition={{ duration:0.4, delay: i * 0.05 }} viewport={{ once:true }}
            >
              <CardContent num={num} Icon={Icon} bg={bg} title={title} desc={desc} />
            </motion.div>
          ))}
        </div>

        {/* Mobile dots */}
        <div className="scroll-dots feat-scroll-dots" style={{ marginBottom:'32px' }}>
          {features.map((_, i) => (
            <div key={i} className={`scroll-dot dark-bg${i === activeIdx ? ' active' : ''}`} />
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
          transition={{ duration:0.6 }} viewport={{ once:true }}
          className="stats-row scrollbar-hide"
        >
          {[['5,000+','Happy Travellers'],['120+','Destinations'],['4.9 ★','Avg Rating']].map(([val, lbl]) => (
            <div key={lbl} className="stat-pill">
              <div style={{ fontSize:'clamp(18px,4vw,26px)', fontWeight:700, color:'var(--navy)', fontFamily:'Georgia,serif' }}>{val}</div>
              <div style={{ fontSize:'11px', color:'var(--text-3)', textTransform:'uppercase', letterSpacing:'0.08em', marginTop:'4px' }}>{lbl}</div>
            </div>
          ))}
        </motion.div>

        {/* How it works */}
        <div style={{ padding:'0 20px' }}>
          <div style={{ background:'#fff', border:'1px solid #EDE8DC', borderRadius:'20px', padding:'28px 24px' }}>
            <p style={{ fontSize:'11px', fontWeight:600, letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--gold)', marginBottom:'24px', textAlign:'center' }}>How it works</p>

            {/* Desktop horizontal */}
            <div className="how-steps-desktop" style={{ alignItems:'flex-start', gap:0 }}>
              {howSteps.map((s, i, arr) => (
                <React.Fragment key={s.title}>
                  <div style={{ flex:1, textAlign:'center', padding:'0 4px' }}>
                    <div style={{ width:'42px', height:'42px', borderRadius:'50%', border:'1px solid #EDE8DC', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 10px', fontSize:'18px', background:'var(--cream)' }}>{s.icon}</div>
                    <div style={{ fontSize:'12px', fontWeight:600, color:'var(--navy)', marginBottom:'3px' }}>{s.title}</div>
                    <div style={{ fontSize:'11px', color:'var(--text-3)', lineHeight:1.5 }}>{s.desc}</div>
                  </div>
                  {i < arr.length - 1 && <div className="step-line-h" />}
                </React.Fragment>
              ))}
            </div>

            {/* Mobile vertical */}
            <div className="how-steps-mobile" style={{ flexDirection:'column' }}>
              {howSteps.map((s, i) => (
                <React.Fragment key={s.title}>
                  <div style={{ display:'flex', alignItems:'flex-start', gap:'16px', padding:'10px 0' }}>
                    <div style={{ width:'44px', height:'44px', borderRadius:'50%', border:'1px solid #EDE8DC', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'20px', background:'var(--cream)', flexShrink:0 }}>{s.icon}</div>
                    <div style={{ paddingTop:'8px' }}>
                      <div style={{ fontSize:'13px', fontWeight:600, color:'var(--navy)', marginBottom:'2px' }}>{s.title}</div>
                      <div style={{ fontSize:'12px', color:'var(--text-3)', lineHeight:1.5 }}>{s.desc}</div>
                    </div>
                  </div>
                  {i < howSteps.length - 1 && <div className="step-line-v" />}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

/* ─────────────────────────────────────────
   DESTINATIONS — LUXURY REDESIGN
───────────────────────────────────────── */
const destinations = [
  {
    to:'/state/himachal',
    img:'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&q=80',
    name:'Himachal Pradesh',
    subtitle:'Snow peaks & pine valleys',
    trips:'7 trips',
    tag:'Most Popular',
  },
  {
    to:'/state/uttarakhand',
    img:'/uttarakhand.png',
    name:'Uttarakhand',
    subtitle:'Temples, treks & rivers',
    trips:'10+ trips',
    tag:'Adventure',
  },
  {
    to:'/state/rajasthan',
    img:'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&q=80',
    name:'Rajasthan',
    subtitle:'Palaces, forts & desert dunes',
    trips:'6 trips',
    tag:'Cultural',
  },
  {
    to:'/state/kashmir',
    img:'/kashmir.png',
    name:'Kashmir',
    subtitle:'Heaven on earth',
    trips:'2 trips',
    tag:'Premium',
  },
];

const Destinations = () => {
  const sliderRef = React.useRef(null);
  const [activeIdx, setActiveIdx] = React.useState(0);

  const scrollLeft  = () => sliderRef.current?.scrollBy({ left:-300, behavior:'smooth' });
  const scrollRight = () => sliderRef.current?.scrollBy({ left: 300, behavior:'smooth' });

  const handleScroll = React.useCallback(() => {
    const el = sliderRef.current;
    if (!el) return;
    const cardW = (el.firstChild?.offsetWidth || 280) + 16;
    setActiveIdx(Math.round(el.scrollLeft / cardW));
  }, []);

  React.useEffect(() => {
    const el = sliderRef.current;
    if (el) el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el?.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <section style={{ background:'var(--navy)', padding:'80px 0 88px', position:'relative', overflow:'hidden' }}>

      {/* Subtle grid texture */}
      <div style={{ position:'absolute', inset:0, opacity:0.025, pointerEvents:'none' }}>
        <svg width="100%" height="100%"><defs><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="#C9A84C" strokeWidth="1"/></pattern></defs><rect width="100%" height="100%" fill="url(#grid)"/></svg>
      </div>

      <div style={{ maxWidth:'1200px', margin:'0 auto', position:'relative', zIndex:1 }}>

        {/* Header */}
        <motion.div
          initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
          transition={{ duration:0.6 }} viewport={{ once:true }}
          style={{ padding:'0 20px', marginBottom:'40px' }}
        >
          <Eyebrow light>Explore India</Eyebrow>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', flexWrap:'wrap', gap:'16px' }}>
            <div>
              <h2 className="lux-heading" style={{ color:'#fff', fontSize:'clamp(26px,5vw,48px)', marginBottom:'8px' }}>
                Explore by Destination
              </h2>
              <p style={{ color:'rgba(255,255,255,0.5)', fontSize:'15px', lineHeight:1.6 }}>
                Handpicked states for your next unforgettable adventure.
              </p>
            </div>
            {/* Nav arrows */}
            <div style={{ display:'flex', gap:'10px' }}>
              {[scrollLeft, scrollRight].map((fn, i) => (
                <button key={i} onClick={fn}
                  style={{ width:'44px', height:'44px', borderRadius:'50%', background:'rgba(255,255,255,0.06)', border:'1px solid rgba(201,168,76,0.3)', color:'var(--gold)', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', transition:'all 0.2s' }}
                  onMouseEnter={e=>{ e.currentTarget.style.background='rgba(201,168,76,0.15)'; e.currentTarget.style.borderColor='var(--gold)'; }}
                  onMouseLeave={e=>{ e.currentTarget.style.background='rgba(255,255,255,0.06)'; e.currentTarget.style.borderColor='rgba(201,168,76,0.3)'; }}
                >
                  {i===0 ? <ChevronLeft size={18}/> : <ChevronRight size={18}/>}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Cards */}
        <div
          ref={sliderRef}
          className="scrollbar-hide"
          style={{ display:'flex', gap:'16px', overflowX:'auto', scrollSnapType:'x mandatory', padding:'0 20px 8px', WebkitOverflowScrolling:'touch' }}
        >
          {destinations.map(({ to, img, name, subtitle, trips, tag }, i) => (
            <motion.div
              key={name}
              className="dest-card-wrap"
              initial={{ opacity:0, y:32 }} whileInView={{ opacity:1, y:0 }}
              transition={{ duration:0.55, delay: i * 0.1 }} viewport={{ once:true }}
              style={{ scrollSnapAlign:'start' }}
            >
              <Link to={to} className="dest-card">
                <img src={img} alt={name} />

                {/* Overlay */}
                <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(4,10,28,0.96) 0%, rgba(4,10,28,0.4) 50%, rgba(4,10,28,0.08) 100%)' }} />

                {/* Gold top line */}
                <div style={{ position:'absolute', top:0, left:0, right:0, height:'2px', background:'linear-gradient(to right, var(--gold), rgba(201,168,76,0.15) 70%, transparent)' }} />

                {/* Tag */}
                <div className="dest-badge">{tag}</div>

                {/* Bottom text */}
                <div style={{ position:'absolute', bottom:0, left:0, width:'100%', padding:'22px 20px', boxSizing:'border-box' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:'5px', marginBottom:'5px' }}>
                    <MapPin size={11} color="var(--gold)" />
                    <span style={{ fontSize:'10px', color:'var(--gold)', fontWeight:600, letterSpacing:'0.1em', textTransform:'uppercase' }}>{trips} available</span>
                  </div>
                  <h3 style={{ color:'#fff', fontSize:'21px', fontWeight:700, fontFamily:'Georgia,serif', lineHeight:1.2, marginBottom:'4px' }}>{name}</h3>
                  <p style={{ color:'rgba(255,255,255,0.52)', fontSize:'12px', marginBottom:'14px', lineHeight:1.5 }}>{subtitle}</p>
                  <div className="dest-pill">
                    View Trips <ArrowRight size={11} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Dots — mobile only */}
        <div className="scroll-dots dest-dots" style={{ marginTop:'22px' }}>
          {destinations.map((_, i) => (
            <div key={i} className={`scroll-dot${i === activeIdx ? ' active' : ''}`} />
          ))}
        </div>

        {/* View all CTA */}
        <motion.div
          initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
          transition={{ duration:0.5, delay:0.3 }} viewport={{ once:true }}
          style={{ display:'flex', justifyContent:'center', marginTop:'40px', padding:'0 20px' }}
        >
          <Link
            to="/trips"
            style={{ display:'inline-flex', alignItems:'center', gap:'8px', border:'1px solid rgba(201,168,76,0.4)', color:'var(--gold)', fontSize:'12px', fontWeight:600, letterSpacing:'0.1em', textTransform:'uppercase', padding:'12px 28px', borderRadius:'99px', transition:'all 0.25s', textDecoration:'none', background:'rgba(201,168,76,0.05)' }}
            onMouseEnter={e=>{ e.currentTarget.style.background='var(--gold)'; e.currentTarget.style.color='var(--navy)'; }}
            onMouseLeave={e=>{ e.currentTarget.style.background='rgba(201,168,76,0.05)'; e.currentTarget.style.color='var(--gold)'; }}
          >
            View All Destinations <ArrowRight size={13} />
          </Link>
        </motion.div>

      </div>
    </section>
  );
};

/* ─────────────────────────────────────────
   TRUST STRIP
───────────────────────────────────────── */
const trustItems = ['✦ 5,000+ Happy Travellers','✦ 100% Verified Stays','✦ 24/7 WhatsApp Support','✦ Female-Friendly Trips','✦ Zero Hidden Charges'];

const TrustStrip = () => (
  <div style={{ background:'var(--gold)', padding:'13px 0', overflow:'hidden' }}>
    <div className="trust-outer" style={{ overflow:'hidden' }}>
      <div className="trust-track">
        {[...trustItems, ...trustItems].map((t, i) => (
          <span key={i} style={{ fontSize:'11px', fontWeight:600, color:'var(--navy)', letterSpacing:'0.08em', whiteSpace:'nowrap' }}>{t}</span>
        ))}
      </div>
    </div>
  </div>
);

/* ─────────────────────────────────────────
   HOME
───────────────────────────────────────── */
const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <GlobalStyles />
      <main className="pt-[120px] flex-grow" style={{ background:'var(--cream)' }}>
        <Hero />
        <TrustStrip />
        <WhyGhoomo />
        <Destinations />
        <div style={{ background:'var(--cream)' }}>
          <Categories />
        </div>
        <UpcomingTrips />
        <TravelerReviews />
        <ImageGallery />
        <Reels />
        <Reviews />
        <FAQ />
      </main>
    </>
  );
};

export default Home;