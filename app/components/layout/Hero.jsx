"use client"
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Zap, Home, Settings, Tag, LayoutGrid, Mail,
  ArrowRight, Menu, X, Globe, ChevronRight,
  Gauge, Smartphone, Search, Star, Play,
  CheckCircle2, TrendingUp, Shield
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const NAV_LINKS = [
  { label: "Home",      href: "#home",      icon: Home },
  { label: "Services",  href: "#services",  icon: Settings },
  { label: "Pricing",   href: "#pricing",   icon: Tag },
  { label: "Portfolio", href: "#portfolio", icon: LayoutGrid },
  { label: "Contact",   href: "#contact",   icon: Mail },
];

const TRUST = [
  { icon: Gauge,      label: "Fast",            sub: "99/100 PageSpeed" },
  { icon: Smartphone, label: "Mobile Friendly",  sub: "Responsive Design" },
  { icon: Search,     label: "SEO Ready",        sub: "Built to Rank" },
];

const BROWSER_CONTENT = [
  { y: 18, h: 7,  w: 55, rx: 4, color: "#036083", opacity: 1 },
  { y: 32, h: 4,  w: 80, rx: 3, color: "#047fab", opacity: 0.5 },
  { y: 40, h: 4,  w: 65, rx: 3, color: "#047fab", opacity: 0.3 },
  { y: 52, h: 28, w: 100, rx: 6, color: "#e0f2f9", opacity: 1, isCard: true },
];

export default function TeckistanHero() {
  const [scrolled,   setScrolled]   = useState(false);
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [activeLink, setActiveLink] = useState("Home");

  const navRef      = useRef(null);
  const logoRef     = useRef(null);
  const linksRef    = useRef([]);
  const ctaRef      = useRef(null);
  const drawerRef   = useRef(null);
  const overlayRef  = useRef(null);
  const drawerItems = useRef([]);

  // Hero refs
  const badgeRef    = useRef(null);
  const headRef     = useRef(null);
  const subRef      = useRef(null);
  const btnsRef     = useRef(null);
  const trustRef    = useRef(null);
  const mockupRef   = useRef(null);
  const glowRef     = useRef(null);
  const statsRef    = useRef([]);

  // ── Nav entrance ──────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: "power3.out" } })
        .fromTo(navRef.current,     { y: -72, opacity: 0 }, { y: 0, opacity: 1, duration: 0.65 })
        .fromTo(logoRef.current,    { x: -20, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5 }, "-=0.3")
        .fromTo(linksRef.current,   { y: -14, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.06, duration: 0.4 }, "-=0.3")
        .fromTo(ctaRef.current,     { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.8)" }, "-=0.2");
    });
    return () => ctx.revert();
  }, []);

  // ── Hero entrance ──────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.5, defaults: { ease: "power3.out" } });
      tl.fromTo(badgeRef.current,  { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 })
        .fromTo(headRef.current,   { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.65 }, "-=0.25")
        .fromTo(subRef.current,    { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5  }, "-=0.35")
        .fromTo(btnsRef.current,   { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45 }, "-=0.3")
        .fromTo(trustRef.current,  { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4  }, "-=0.25")
        .fromTo(mockupRef.current, { x: 60, opacity: 0, rotateY: -12 }, { x: 0, opacity: 1, rotateY: 0, duration: 0.85, ease: "power4.out" }, "-=0.7")
        .fromTo(statsRef.current,  { y: 20, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, duration: 0.4, ease: "back.out(1.5)" }, "-=0.4");

      // Floating mockup
      gsap.to(mockupRef.current, {
        y: -10, duration: 3, yoyo: true, repeat: -1, ease: "sine.inOut"
      });

      // Glow pulse
      gsap.to(glowRef.current, {
        scale: 1.08, opacity: 0.55, duration: 2.4, yoyo: true, repeat: -1, ease: "sine.inOut"
      });
    });
    return () => ctx.revert();
  }, []);

  // ── Scroll shadow ──────────────────────────────────
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // ── Drawer animation ───────────────────────────────
  useEffect(() => {
    if (!drawerRef.current) return;
    if (menuOpen) {
      gsap.set(drawerRef.current, { display: "flex" });
      gsap.fromTo(drawerRef.current,  { y: -16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3, ease: "power3.out" });
      gsap.fromTo(drawerItems.current,{ x: -18, opacity: 0 }, { x: 0, opacity: 1, stagger: 0.055, duration: 0.28, delay: 0.1, ease: "power2.out" });
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.25 });
      document.body.style.overflow = "hidden";
    } else {
      gsap.to(drawerRef.current,  { y: -10, opacity: 0, duration: 0.2, ease: "power2.in", onComplete: () => gsap.set(drawerRef.current, { display: "none" }) });
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.2 });
      document.body.style.overflow = "";
    }
  }, [menuOpen]);

  const hoverCta  = (e, el) => gsap.to(el, { scale: e === "in" ? 1.04 : 1, duration: 0.18, ease: "power2.out" });
  const hoverLink = (i, dir) => gsap.to(linksRef.current[i], { y: dir === "in" ? -2 : 0, duration: 0.16 });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Urbanist:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400&display=swap');
        *, *::before, *::after { font-family: 'Urbanist', sans-serif; box-sizing: border-box; }
        :root { --b: #036083; --bd: #024d69; --bl: #e0f2f9; --bg: #f7fbfd; }
        a { text-decoration: none; }

        .link-dot {
          width: 4px; height: 4px; background: var(--b);
          border-radius: 50%; opacity: 0; transform: scale(0);
          transition: opacity .2s, transform .2s;
          position: absolute; bottom: 2px; left: 50%; translate: -50% 0;
        }
        .nav-link:hover .link-dot { opacity: .45; transform: scale(1); }
        .active-link { color: var(--b) !important; background: var(--bl) !important; }
        .active-link .link-dot { opacity: 1 !important; transform: scale(1) !important; }

        @keyframes pulse-ring { to { transform: scale(1.6); opacity: 0; } }
        .pulse-ring { animation: pulse-ring 2s ease-out infinite; }

        @keyframes float-badge { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-3px)} }
        .float-badge { animation: float-badge 3s ease-in-out infinite; }

        .cta-primary {
          background: linear-gradient(135deg, #036083 0%, #047fab 100%);
          box-shadow: 0 4px 24px rgba(3,96,131,.32);
          transition: transform .18s, box-shadow .18s;
        }
        .cta-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 36px rgba(3,96,131,.42); }
        .cta-primary::before {
          content:''; position:absolute; inset:0; border-radius:inherit;
          background: linear-gradient(120deg,rgba(255,255,255,.18) 0%,transparent 55%);
          pointer-events:none;
        }

        .cta-secondary {
          border: 1.5px solid rgba(3,96,131,.22);
          color: #036083;
          background: rgba(224,242,249,.35);
          transition: background .18s, border-color .18s, transform .18s;
        }
        .cta-secondary:hover { background: var(--bl); border-color: #036083; transform: translateY(-1px); }

        .trust-pill {
          border: 1px solid rgba(3,96,131,.14);
          background: rgba(255,255,255,.9);
          backdrop-filter: blur(8px);
          transition: border-color .2s, box-shadow .2s, transform .2s;
        }
        .trust-pill:hover { border-color: rgba(3,96,131,.4); box-shadow: 0 4px 18px rgba(3,96,131,.1); transform: translateY(-2px); }

        .stat-card {
          background: rgba(255,255,255,.92);
          border: 1px solid rgba(3,96,131,.12);
          backdrop-filter: blur(12px);
          box-shadow: 0 4px 20px rgba(3,96,131,.08);
        }

        .browser-shadow { filter: drop-shadow(0 24px 60px rgba(3,96,131,.22)) drop-shadow(0 4px 16px rgba(0,0,0,.1)); }

        .drawer-link { transition: background .15s, color .15s, padding-left .15s; }
        .drawer-link:hover { background: var(--bl); color: var(--b); padding-left: 20px; }

        @keyframes grid-move { to { transform: translate(40px, 40px); } }

        .hero-grid {
          background-image:
            linear-gradient(rgba(3,96,131,.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(3,96,131,.06) 1px, transparent 1px);
          background-size: 40px 40px;
        }

        @keyframes spin-slow { to { transform: rotate(360deg); } }
        .spin-slow { animation: spin-slow 22s linear infinite; }

        @keyframes shimmer-line {
          0% { left: -60%; }
          100% { left: 110%; }
        }
        .shimmer-btn::after {
          content: '';
          position: absolute;
          top: 0; bottom: 0; left: -60%;
          width: 50%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,.22), transparent);
          animation: shimmer-line 2.8s ease-in-out infinite;
        }

        /* Screen inner UI */
        .screen-bar { border-radius: 3px; }
        @keyframes blink-cur { 0%,100%{opacity:1} 50%{opacity:0} }
        .blink { animation: blink-cur 1s ease infinite; }
      `}</style>



      {/* ════ HERO ════════════════════════════════════ */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-white" style={{ paddingTop: 68 }}>

        {/* Grid background */}
        <div className="hero-grid absolute inset-0 pointer-events-none" />

        {/* Radial glow center */}
        <div ref={glowRef} className="absolute pointer-events-none"
             style={{ top: "30%", left: "50%", translate: "-50% -50%", width: 700, height: 700,
               background: "radial-gradient(circle, rgba(3,96,131,.1) 0%, transparent 70%)", opacity: .7 }} />

        {/* Decorative orbit ring */}
        <div className="spin-slow absolute pointer-events-none hidden xl:block"
             style={{ top: "8%", right: "-8%", width: 520, height: 520, borderRadius: "50%",
               border: "1.5px dashed rgba(3,96,131,.12)" }} />
        <div className="absolute pointer-events-none hidden xl:block"
             style={{ top: "18%", right: "-3%", width: 320, height: 320, borderRadius: "50%",
               border: "1px solid rgba(3,96,131,.07)" }} />

        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-0.5 pointer-events-none"
             style={{ background: "linear-gradient(90deg, transparent, #036083, transparent)" }} />

        <div className="relative z-10 max-w-310 mx-auto px-6 py-20 w-full">
          <div className="flex flex-col xl:flex-row items-center gap-16 xl:gap-12">

            {/* ── LEFT COPY ─────────────────────────── */}
            <div className="flex-1 max-w-150 xl:max-w-none">

              {/* Badge */}
              <div ref={badgeRef} className="float-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-7 font-bold text-[12px] tracking-widest uppercase"
                   style={{ background: "linear-gradient(135deg, #e0f2f9 0%, #cceaf5 100%)", color: "#036083",
                     border: "1px solid rgba(3,96,131,.2)", boxShadow: "0 2px 12px rgba(3,96,131,.1)" }}>
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#036083" }} />
                Web Design Agency · Est. 2020
                <Star size={11} fill="#036083" color="#036083" />
              </div>

              {/* Headline */}
              <h1 ref={headRef} className="font-black leading-[1.04] text-gray-950 mb-6"
                  style={{ fontSize: "clamp(36px, 5.5vw, 68px)", letterSpacing: "-2.5px" }}>
                Launch Your Business<br />
                with a{" "}
                <span className="relative inline-block" style={{ color: "#036083" }}>
                  Professional
                  {/* Underline squiggle */}
                  <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 260 8" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                    <path d="M2 5.5 Q32 1 65 5.5 Q98 10 130 5.5 Q162 1 195 5.5 Q225 10 258 5.5" stroke="#036083" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity=".5"/>
                  </svg>
                </span>
                {" "}Website
              </h1>

              {/* Subheadline */}
              <p ref={subRef} className="text-gray-500 font-[450] leading-relaxed mb-10 max-w-125"
                 style={{ fontSize: "clamp(15px, 2vw, 18px)" }}>
                We design <strong className="font-bold text-gray-700">modern, fast</strong> and{" "}
                <strong className="font-bold text-gray-700">high-converting</strong> websites for businesses worldwide —
                built to grow your revenue from day one.
              </p>

              {/* CTAs */}
              <div ref={btnsRef} className="flex flex-wrap items-center gap-4 mb-12">
            <a 
href="https://wa.me/923477071276?text=Hello%20Teckistan!%20I%20am%20interested%20in%20your%20web%20design%20services."
target="_blank" 
rel="noopener noreferrer"
className="cta-primary shimmer-btn inline-flex items-center gap-1 text-white font-extrabold px-5 py-4 rounded-[13px] relative overflow-hidden"
style={{ fontSize: 16 }}
>
<Globe size={18} />
Get Landing Page — 12,000 PKR
<ArrowRight size={16} strokeWidth={2.8} />
</a>
                <a href="#portfolio"
                   className="cta-secondary inline-flex items-center gap-2 font-bold px-6 py-3 rounded-[13px]"
                   style={{ fontSize: 15 }}>
                  <Play size={15} fill="#036083" />
                  View Portfolio
                </a>
              </div>

              {/* Trust pills */}
              <div ref={trustRef} className="flex flex-wrap gap-3">
                {TRUST.map(({ icon: Icon, label, sub }) => (
                  <div key={label} className="trust-pill flex items-center gap-2.5 px-4 py-2.5 rounded-[10px]">
                    <span className="flex items-center justify-center w-7 h-7 rounded-[7px]"
                          style={{ background: "linear-gradient(135deg, #e0f2f9, #cceaf5)" }}>
                      <Icon size={14} color="#036083" strokeWidth={2.2} />
                    </span>
                    <div>
                      <div className="font-bold text-[13px] text-gray-800 leading-none mb-0.5">{label}</div>
                      <div className="text-[11px] font-medium text-gray-400">{sub}</div>
                    </div>
                    <CheckCircle2 size={14} color="#036083" className="ml-1 opacity-70" />
                  </div>
                ))}
              </div>
            </div>

            {/* ── RIGHT VISUAL ──────────────────────── */}
            <div className="flex-1 flex items-center justify-center relative w-full xl:max-w-140">

              {/* Glow behind laptop */}
              <div className="absolute inset-0 pointer-events-none"
                   style={{ background: "radial-gradient(ellipse 70% 55% at 50% 55%, rgba(3,96,131,.12) 0%, transparent 75%)" }} />

              {/* Stat cards — floating */}
              <div ref={el => statsRef.current[0] = el}
                   className="stat-card absolute  items-center gap-2.5 px-3.5 py-2.5 rounded-xl z-20 hidden sm:flex"
                   style={{ top: "8%", left: "-4%" }}>
                <div className="w-8 h-8 font-extrabold flex items-center justify-center" style={{ background: "#e0f2f9" }}>
                  <TrendingUp size={16} color="#036083" />
                </div>
                <div>
                  <div className="font-extrabold text-[15px] text-gray-900 leading-none">+340%</div>
                  <div className="text-[11px] font-medium text-gray-400 mt-0.5">Avg. Traffic Boost</div>
                </div>
              </div>

              <div ref={el => statsRef.current[1] = el}
                   className="stat-card absolute  items-center gap-2.5 px-3.5 py-2.5 rounded-xl z-20 hidden sm:flex"
                   style={{ bottom: "14%", right: "-2%" }}>
                <div className="w-8 h-8 font-extrabold flex items-center justify-center" style={{ background: "#e0f2f9" }}>
                  <Shield size={16} color="#036083" />
                </div>
                <div>
                  <div className="font-extrabold text-[15px] text-gray-900 leading-none">500+</div>
                  <div className="text-[11px] font-medium text-gray-400 mt-0.5">Sites Delivered</div>
                </div>
              </div>

              <div ref={el => statsRef.current[2] = el}
                   className="stat-card absolute  items-center gap-2 px-3 py-2 rounded-[10px] z-20 hidden md:flex"
                   style={{ bottom: "40%", left: "-6%" }}>
                <div className="flex -space-x-1.5">
                  {["#036083","#047fab","#059dc5"].map((c,i) => (
                    <div key={i} className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center text-white font-bold text-[9px]"
                         style={{ background: c }}>
                      {["A","B","C"][i]}
                    </div>
                  ))}
                </div>
                <div className="text-[11px] font-bold text-gray-700">
                  4.9 <Star size={9} fill="#f59e0b" color="#f59e0b" className="inline" /> (128 reviews)
                </div>
              </div>

              {/* ── LAPTOP MOCKUP (SVG) ─────────────── */}
              <div ref={mockupRef} className="relative z-10 w-full browser-shadow" style={{ maxWidth: 520, perspective: 1000 }}>
                <svg viewBox="0 0 520 360" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
                  {/* Laptop base */}
                  <rect x="30" y="310" width="460" height="24" rx="6" fill="#d1d5db"/>
                  <rect x="50" y="306" width="420" height="8" rx="3" fill="#e5e7eb"/>
                  {/* Notch */}
                  <rect x="240" y="306" width="40" height="6" rx="3" fill="#9ca3af"/>

                  {/* Screen bezel */}
                  <rect x="40" y="18" width="440" height="292" rx="14" fill="#1f2937"/>
                  <rect x="40" y="18" width="440" height="292" rx="14" fill="url(#bezel-grad)"/>

                  {/* Screen */}
                  <rect x="52" y="28" width="416" height="272" rx="8" fill="#f8fafc"/>

                  {/* Browser chrome */}
                  <rect x="52" y="28" width="416" height="36" rx="8" fill="#f1f5f9"/>
                  <rect x="52" y="52" width="416" height="12" fill="#f1f5f9"/>
                  {/* Traffic lights */}
                  <circle cx="70" cy="46" r="5" fill="#ef4444" opacity=".7"/>
                  <circle cx="84" cy="46" r="5" fill="#f59e0b" opacity=".7"/>
                  <circle cx="98" cy="46" r="5" fill="#22c55e" opacity=".7"/>
                  {/* URL bar */}
                  <rect x="116" y="40" width="220" height="12" rx="6" fill="#e2e8f0"/>
                  <text x="122" y="50" fontSize="7" fill="#64748b" fontFamily="Urbanist,sans-serif" fontWeight="600">teckistan.com</text>
                  {/* Reload icon */}
                  <circle cx="352" cy="46" r="5" fill="#e2e8f0"/>

                  {/* ── WEBSITE CONTENT INSIDE SCREEN ── */}
                  {/* Hero bar (nav) */}
                  <rect x="52" y="64" width="416" height="18" fill="#036083" opacity=".08"/>
                  <rect x="62" y="69" width="30" height="6" rx="3" fill="#036083" opacity=".6"/>
                  <rect x="100" y="70" width="18" height="4" rx="2" fill="#94a3b8"/>
                  <rect x="124" y="70" width="18" height="4" rx="2" fill="#94a3b8"/>
                  <rect x="148" y="70" width="18" height="4" rx="2" fill="#94a3b8"/>
                  <rect x="390" y="68" width="42" height="8" rx="4" fill="#036083" opacity=".85"/>

                  {/* Hero headline area */}
                  <rect x="62" y="92" width="130" height="10" rx="4" fill="#1e293b"/>
                  <rect x="62" y="106" width="108" height="10" rx="4" fill="#1e293b"/>
                  <rect x="62" y="122" width="90" height="6" rx="3" fill="#94a3b8" opacity=".6"/>
                  <rect x="62" y="132" width="80" height="6" rx="3" fill="#94a3b8" opacity=".4"/>
                  {/* CTA in mockup */}
                  <rect x="62" y="146" width="68" height="16" rx="6" fill="#036083"/>
                  <text x="78" y="157" fontSize="6" fill="white" fontFamily="Urbanist,sans-serif" fontWeight="700" textAnchor="middle">Get Started</text>
                  <rect x="138" y="146" width="52" height="16" rx="6" fill="white" stroke="#036083" strokeWidth="1" opacity=".7"/>
                  <text x="164" y="157" fontSize="6" fill="#036083" fontFamily="Urbanist,sans-serif" fontWeight="700" textAnchor="middle">Portfolio</text>

                  {/* Right image placeholder */}
                  <rect x="280" y="85" width="175" height="120" rx="8" fill="#e0f2f9"/>
                  <rect x="296" y="100" width="143" height="8" rx="4" fill="#036083" opacity=".25"/>
                  <rect x="296" y="114" width="120" height="6" rx="3" fill="#047fab" opacity=".18"/>
                  <rect x="296" y="124" width="100" height="6" rx="3" fill="#047fab" opacity=".12"/>
                  {/* Mini chart in mockup */}
                  <polyline points="296,175 316,162 336,168 356,155 376,160 396,148 416,153 436,145" stroke="#036083" strokeWidth="2" fill="none" opacity=".6" strokeLinecap="round"/>
                  <polyline points="296,180 436,180" stroke="#e2e8f0" strokeWidth="1"/>
                  {/* Area under chart */}
                  <polygon points="296,175 316,162 336,168 356,155 376,160 396,148 416,153 436,145 436,180 296,180" fill="#036083" opacity=".07"/>

                  {/* Divider */}
                  <line x1="52" y1="215" x2="468" y2="215" stroke="#e2e8f0" strokeWidth="0.75"/>

                  {/* Feature cards row */}
                  {[0,1,2].map(i => (
                    <g key={i}>
                      <rect x={62 + i*135} y="222" width="120" height="58" rx="6" fill="white" stroke="#e2e8f0" strokeWidth="0.75"/>
                      <rect x={72 + i*135} y="230" width="18" height="18" rx="4" fill="#e0f2f9"/>
                      <rect x={76 + i*135} y="234" width="10" height="10" rx="2" fill="#036083" opacity=".5"/>
                      <rect x={72 + i*135} y="254" width="70" height="5" rx="2.5" fill="#1e293b" opacity=".6"/>
                      <rect x={72 + i*135} y="263" width="55" height="4" rx="2" fill="#94a3b8" opacity=".5"/>
                      <rect x={72 + i*135} y="271" width="42" height="4" rx="2" fill="#94a3b8" opacity=".3"/>
                    </g>
                  ))}

                  {/* Gradient overlays on screen edges */}
                  <defs>
                    <linearGradient id="bezel-grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#374151" stopOpacity=".3"/>
                      <stop offset="100%" stopColor="#111827" stopOpacity=".1"/>
                    </linearGradient>
                    <linearGradient id="screen-fade" x1="0" y1="0.7" x2="0" y2="1">
                      <stop offset="0%" stopColor="white" stopOpacity="0"/>
                      <stop offset="100%" stopColor="white" stopOpacity=".7"/>
                    </linearGradient>
                  </defs>
                  {/* Screen bottom fade */}
                  <rect x="52" y="200" width="416" height="100" rx="0" fill="url(#screen-fade)"/>

                  {/* Webcam dot */}
                  <circle cx="260" cy="23" r="3" fill="#374151"/>
                  <circle cx="260" cy="23" r="1.5" fill="#4b5563"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
             style={{ background: "linear-gradient(to bottom, transparent, rgba(255,255,255,.9))" }} />
      </section>

 
    </>
  );
}