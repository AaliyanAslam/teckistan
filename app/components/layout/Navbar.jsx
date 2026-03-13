"use client"
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import {
  Home, Settings, Tag, LayoutGrid, Mail,
  ArrowRight, Menu, Globe, ChevronRight, X
} from "lucide-react";

const WA_LINK = "https://wa.me/923477071276?text=Hello%20Teckistan!%20I%20am%20interested%20in%20your%20web%20design%20services.";

const NAV_LINKS = [
  { label: "Home",      href: "#home",      icon: Home      },
  { label: "Services",  href: "#services",  icon: Settings  },
  { label: "Pricing",   href: "#pricing",   icon: Tag       },
  { label: "Portfolio", href: "#portfolio", icon: LayoutGrid },
  { label: "Contact",   href: "#contact",   icon: Mail      },
];

export default function TeckistanNav() {
  const [scrolled,   setScrolled]   = useState(false);
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [activeLink, setActiveLink] = useState("Home");

  const navRef        = useRef(null);
  const logoRef       = useRef(null);
  const linksRef      = useRef([]);
  const ctaRef        = useRef(null);
  const drawerRef     = useRef(null);
  const overlayRef    = useRef(null);
  const drawerItems   = useRef([]);
  const drawerFootRef = useRef(null);

  // ── Nav entrance ───────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: "power3.out" } })
        .fromTo(navRef.current,   { y: -72, opacity: 0 }, { y: 0, opacity: 1, duration: 0.65 })
        .fromTo(logoRef.current,  { x: -20, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5 }, "-=0.35")
        .fromTo(linksRef.current, { y: -14, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.07, duration: 0.4 }, "-=0.3")
        .fromTo(ctaRef.current,   { scale: 0.82, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.42, ease: "back.out(1.8)" }, "-=0.22");
    });
    return () => ctx.revert();
  }, []);

  // ── Scroll shadow ───────────────────────────────
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // ── Left-slide drawer ───────────────────────────
  useEffect(() => {
    if (!drawerRef.current) return;
    if (menuOpen) {
      gsap.set(overlayRef.current, { display: "block" });
      gsap.set(drawerRef.current,  { display: "flex" });
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "none" });
      gsap.fromTo(drawerRef.current,  { x: "-100%" }, { x: "0%", duration: 0.38, ease: "power3.out" });
      gsap.fromTo(drawerItems.current,{ x: -22, opacity: 0 }, { x: 0, opacity: 1, stagger: 0.06, duration: 0.3, delay: 0.2, ease: "power2.out" });
      gsap.fromTo(drawerFootRef.current, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.32, delay: 0.42, ease: "power2.out" });
      document.body.style.overflow = "hidden";
    } else {
      gsap.to(drawerRef.current,   { x: "-100%", duration: 0.3, ease: "power3.in", onComplete: () => gsap.set(drawerRef.current, { display: "none" }) });
      gsap.to(overlayRef.current,  { opacity: 0, duration: 0.25, onComplete: () => gsap.set(overlayRef.current, { display: "none" }) });
      document.body.style.overflow = "";
    }
  }, [menuOpen]);

  const hoverLink = (i, dir) => gsap.to(linksRef.current[i], { y: dir === "in" ? -2 : 0, duration: 0.16, ease: "power2.out" });
  const hoverCta  = (dir)    => gsap.to(ctaRef.current, { scale: dir === "in" ? 1.05 : 1, duration: 0.18, ease: "power2.out" });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Urbanist:wght@400;500;600;700;800;900&display=swap');
        *, *::before, *::after { font-family: 'Urbanist', sans-serif; box-sizing: border-box; }
        a { text-decoration: none; }

        .link-dot {
          position: absolute; bottom: 1px; left: 50%; translate: -50% 0;
          width: 4px; height: 4px; background: #036083; border-radius: 50%;
          opacity: 0; transform: scale(0); transition: opacity .18s, transform .18s;
        }
        .nav-link:hover .link-dot { opacity: .45; transform: scale(1); }
        .nav-link.is-active { color: #036083 !important; background: #e8f5fa !important; }
        .nav-link.is-active .link-dot { opacity: 1; transform: scale(1); }

        .nav-accent {
          position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, transparent 0%, #036083 50%, transparent 100%);
          opacity: 0; transition: opacity .3s;
        }
        nav.is-scrolled .nav-accent { opacity: 1; }

        @keyframes shimmer { 0%{left:-60%} 100%{left:110%} }
        .shimmer-sweep {
          position: absolute; top: 0; bottom: 0; left: -60%; width: 40%; border-radius: inherit;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,.22), transparent);
          animation: shimmer 2.6s ease-in-out infinite;
        }

        .cta-btn::before {
          content: ''; position: absolute; inset: 0; border-radius: inherit;
          background: linear-gradient(120deg, rgba(255,255,255,.16) 0%, transparent 55%);
          pointer-events: none;
        }

        .drawer-row { transition: background .15s, color .15s, transform .12s; border-radius: 12px; }
        .drawer-row:hover { background: #e8f5fa; color: #036083; transform: translateX(4px); }
        .drawer-row.is-active { background: #e8f5fa; color: #036083; }
        .drawer-row.is-active .drawer-icon { background: #036083 !important; }
      `}</style>

      {/* ════ NAVBAR ════════════════════════════════ */}
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 ${scrolled ? "is-scrolled" : ""}`}
        style={{
          height: 66,
          borderBottom: scrolled ? "none" : "1px solid rgba(3,96,131,.09)",
          boxShadow: scrolled ? "0 4px 32px rgba(3,96,131,.11), 0 1px 3px rgba(0,0,0,.05)" : "none",
        }}
      >
        <div className="nav-accent" />

        <div className="max-w-315 mx-auto h-full px-5 sm:px-8 flex items-center justify-between gap-6">

          {/* ── LOGO ───────────────────────────────── */}
          <a ref={logoRef} href="#home" className="flex items-center gap-3 shrink-0">
            {/*
              ┌─────────────────────────────────────────────┐
              │  LOGO IMAGE — replace src with your image   │
              └─────────────────────────────────────────────┘
            */}
            <div className="w-50 h-9 rounded-xl overflow-hidden shrink-0  flex items-center justify-center">
              <img
                src="/images/logo.png"
                alt="Teckistan Logo"
                className="w-full h-full object-cover"
                onError={e => { e.target.style.display = "none"; }}
              />
              {/* Fallback initials shown when no image */}
            
            </div>

            
          </a>

          {/* ── DESKTOP LINKS ──────────────────────── */}
          <ul className="hidden lg:flex items-center gap-0.5 list-none m-0 p-0 flex-1 justify-center">
            {NAV_LINKS.map(({ label, href }, i) => (
              <li key={label}>
                <a
                  ref={el => linksRef.current[i] = el}
                  href={href}
                  onClick={() => setActiveLink(label)}
                  onMouseEnter={() => hoverLink(i, "in")}
                  onMouseLeave={() => hoverLink(i, "out")}
                  className={`nav-link relative flex items-center px-3.5 py-2 rounded-[9px] text-[14px] font-semibold transition-colors duration-150
                    ${activeLink === label ? "is-active" : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"}`}
                >
                  {label}
                  <span className="link-dot" />
                </a>
              </li>
            ))}
          </ul>

          {/* ── RIGHT ──────────────────────────────── */}
          <div className="flex items-center gap-3 shrink-0">

            {/* CTA → WhatsApp */}
            <a
              ref={ctaRef}
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => hoverCta("in")}
              onMouseLeave={() => hoverCta("out")}
              className="cta-btn hidden sm:inline-flex items-center gap-2 text-white font-bold text-[13.5px] px-5 py-2.5 rounded-[10px] relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg,#036083 0%,#047fab 100%)",
                boxShadow: "0 2px 18px rgba(3,96,131,.3)",
              }}
            >
              <Globe size={14} />
              Get Website
              <ArrowRight size={13} strokeWidth={2.6} />
              <span className="shimmer-sweep" />
            </a>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(o => !o)}
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-[9px] bg-white border transition-colors duration-150 cursor-pointer"
              style={{ borderColor: menuOpen ? "#036083" : "rgba(3,96,131,.15)" }}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              {menuOpen
                ? <X size={19} color="#036083" strokeWidth={2.2} />
                : <Menu size={19} color="#374151" strokeWidth={2} />
              }
            </button>
          </div>
        </div>
      </nav>

      {/* ════ OVERLAY ═══════════════════════════════ */}
      <div
        ref={overlayRef}
        onClick={() => setMenuOpen(false)}
        className="fixed inset-0 z-40 lg:hidden"
        style={{ display: "none", background: "rgba(10,25,35,.35)", backdropFilter: "blur(3px)" }}
      />

      {/* ════ LEFT DRAWER ═══════════════════════════ */}
      <div
        ref={drawerRef}
        className="fixed top-0 left-0 bottom-0 z-50 flex-col lg:hidden bg-white overflow-y-auto"
        style={{
          width: "min(300px, 82vw)",
          display: "none",
          boxShadow: "4px 0 40px rgba(3,96,131,.13), 2px 0 8px rgba(0,0,0,.06)",
        }}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: "rgba(3,96,131,.09)" }}>
          <a href="#home" onClick={() => setMenuOpen(false)} className="flex items-center gap-3">
            {/* Logo image in drawer */}
            <div className="w-8 h-8 rounded-lg overflow-hidden shrink-0 bg-gray-100 flex items-center justify-center relative">
              <img
                src="images/logo.png"
                alt="Teckistan"
                className="w-full h-full object-contain"
                onError={e => { e.target.style.display = "none"; }}
              />
              <span className="absolute inset-0 flex items-center justify-center text-[11px] font-black text-white"
                    style={{ background: "linear-gradient(135deg,#036083,#047fab)", borderRadius: 8 }}>
                TS
              </span>
            </div>
            <div className="leading-none">
              <div className="font-black text-[15px] text-gray-900" style={{ letterSpacing: "-0.3px" }}>Teckistan</div>
              <div className="font-bold text-[9.5px] tracking-[0.13em] uppercase" style={{ color: "#036083", marginTop: 1 }}>Solutions</div>
            </div>
          </a>

          <button
            onClick={() => setMenuOpen(false)}
            className="flex items-center justify-center w-8 h-8 rounded-lg cursor-pointer transition-colors hover:bg-[#e8f5fa]"
            style={{ background: "rgba(3,96,131,.07)" }}
          >
            <X size={16} color="#036083" strokeWidth={2.2} />
          </button>
        </div>

        {/* Section label */}
        <div className="px-5 pt-5 pb-2">
          <p className="text-[10.5px] font-bold tracking-[0.12em] uppercase" style={{ color: "rgba(3,96,131,.45)" }}>
            Navigation
          </p>
        </div>

        {/* Links */}
        <ul className="list-none m-0 px-3 pb-3 flex flex-col gap-0.5">
          {NAV_LINKS.map(({ label, href, icon: Icon }, i) => (
            <li key={label} ref={el => drawerItems.current[i] = el}>
              <a
                href={href}
                onClick={() => { setActiveLink(label); setMenuOpen(false); }}
                className={`drawer-row flex items-center gap-3 px-3 py-3 cursor-pointer
                  ${activeLink === label ? "is-active text-[#036083]" : "text-gray-600"}`}
              >
                <span
                  className="drawer-icon flex items-center justify-center w-9 h-9 rounded-[9px] shrink-0 transition-colors"
                  style={{ background: activeLink === label ? "#036083" : "#f0f4f8" }}
                >
                  <Icon size={16} color={activeLink === label ? "#fff" : "#6b7280"} strokeWidth={2} />
                </span>
                <span className="font-semibold text-[15px]">{label}</span>
                <ChevronRight size={15} className="ml-auto opacity-30" />
              </a>
            </li>
          ))}
        </ul>

        {/* Divider */}
        <div className="mx-5 my-1 h-px" style={{ background: "rgba(3,96,131,.08)" }} />

        {/* Drawer footer CTA → WhatsApp */}
        <div ref={drawerFootRef} className="px-4 py-5 mt-auto">
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="cta-btn flex items-center justify-center gap-2.5 text-white font-bold text-[14.5px] py-3.5 rounded-[13px] relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg,#036083 0%,#047fab 100%)",
              boxShadow: "0 4px 24px rgba(3,96,131,.32)",
            }}
          >
            <Globe size={17} />
            Get Website
            <ArrowRight size={15} strokeWidth={2.6} />
            <span className="shimmer-sweep" />
          </a>

          <p className="text-center text-[11.5px] font-medium text-gray-400 mt-3">
            500+ websites delivered worldwide
          </p>
        </div>
      </div>
    </>
  );
}