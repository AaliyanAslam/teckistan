"use client"
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Rocket, Globe, Paintbrush, ArrowRight, Sparkles, CheckCircle } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    icon: Rocket,
    tag: "Most Popular",
    title: "Landing Page Development",
    desc: "High converting landing pages for startups and businesses — designed to turn visitors into paying customers.",
    bullets: ["Conversion-optimized layout", "Fast load under 2s", "Mobile-first design"],
    accent: "#036083",
    glow: "rgba(3,96,131,.13)",
    badge: true,
  },
  {
    icon: Globe,
    tag: "Full Package",
    title: "Business Website",
    desc: "Full professional websites with multiple pages — built to establish your brand and grow online.",
    bullets: ["Multi-page architecture", "CMS integration", "SEO foundation built-in"],
    accent: "#047fab",
    glow: "rgba(4,127,171,.11)",
    badge: false,
  },
  {
    icon: Paintbrush,
    tag: "Upgrade",
    title: "Website Redesign",
    desc: "Upgrade your old website to a modern UI — fresher look, better UX, and higher engagement.",
    bullets: ["Modern UI overhaul", "Performance boost", "Brand consistency"],
    accent: "#025e7a",
    glow: "rgba(2,94,122,.11)",
    badge: false,
  },
];

export default function ServicesSection() {
  const sectionRef  = useRef(null);
  const headRef     = useRef(null);
  const subRef      = useRef(null);
  const badgeRef    = useRef(null);
  const cardsRef    = useRef([]);
  const lineRef     = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Section badge + heading reveal
      gsap.fromTo([badgeRef.current, headRef.current, subRef.current],
        { y: 32, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.13, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" }
        }
      );

      // Accent line width expand
      gsap.fromTo(lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1, duration: 0.7, ease: "power3.out", transformOrigin: "left",
          scrollTrigger: { trigger: sectionRef.current, start: "top 78%" }
        }
      );

      // Cards stagger up
      gsap.fromTo(cardsRef.current,
        { y: 56, opacity: 0 },
        {
          y: 0, opacity: 1,
          stagger: 0.14, duration: 0.75, ease: "power3.out",
          scrollTrigger: { trigger: cardsRef.current[0], start: "top 85%" }
        }
      );

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Card hover — GSAP
  const handleEnter = (el, glowEl, iconEl) => {
    gsap.to(el,     { y: -8, scale: 1.018, duration: 0.3, ease: "power2.out",
                      boxShadow: "0 20px 60px rgba(3,96,131,.15), 0 4px 16px rgba(0,0,0,.07)" });
    gsap.to(glowEl, { opacity: 1, scale: 1.08, duration: 0.4, ease: "power2.out" });
    gsap.to(iconEl, { scale: 1.12, rotate: -6, duration: 0.28, ease: "back.out(1.6)" });
  };
  const handleLeave = (el, glowEl, iconEl) => {
    gsap.to(el,     { y: 0, scale: 1, duration: 0.28, ease: "power2.inOut",
                      boxShadow: "0 4px 24px rgba(3,96,131,.07), 0 1px 4px rgba(0,0,0,.04)" });
    gsap.to(glowEl, { opacity: 0, scale: 1, duration: 0.35, ease: "power2.inOut" });
    gsap.to(iconEl, { scale: 1, rotate: 0, duration: 0.24, ease: "power2.inOut" });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Urbanist:wght@400;500;600;700;800;900&display=swap');
        *, *::before, *::after { font-family: 'Urbanist', sans-serif; box-sizing: border-box; }
        a { text-decoration: none; }

        .service-card {
          position: relative;
          background: #ffffff;
          border: 1px solid rgba(3,96,131,.11);
          border-radius: 20px;
          padding: 36px 32px 32px;
          cursor: default;
          overflow: hidden;
          box-shadow: 0 4px 24px rgba(3,96,131,.07), 0 1px 4px rgba(0,0,0,.04);
          transition: border-color .25s;
          will-change: transform;
        }
        .service-card:hover { border-color: rgba(3,96,131,.3); }

        .card-glow {
          position: absolute;
          top: -40px; right: -40px;
          width: 200px; height: 200px;
          border-radius: 50%;
          pointer-events: none;
          opacity: 0;
        }

        .card-tag {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 4px 11px;
          border-radius: 99px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: .06em;
          text-transform: uppercase;
          background: #e8f5fa;
          color: #036083;
          border: 1px solid rgba(3,96,131,.18);
          margin-bottom: 20px;
        }

        .popular-tag {
          background: linear-gradient(135deg,#036083,#047fab);
          color: #fff;
          border: none;
          box-shadow: 0 2px 10px rgba(3,96,131,.28);
        }

        .icon-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 52px; height: 52px;
          border-radius: 14px;
          margin-bottom: 22px;
          position: relative;
          z-index: 1;
        }

        .icon-wrap::after {
          content: '';
          position: absolute; inset: 0;
          border-radius: inherit;
          background: linear-gradient(135deg,rgba(255,255,255,.22) 0%,transparent 60%);
        }

        .bullet-row {
          display: flex;
          align-items: center;
          gap: 9px;
          font-size: 13px;
          font-weight: 600;
          color: #475569;
          padding: 6px 0;
          border-bottom: 1px solid rgba(3,96,131,.06);
        }
        .bullet-row:last-child { border-bottom: none; }

        .cta-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 13.5px;
          font-weight: 700;
          color: #036083;
          margin-top: 22px;
          padding: 8px 0;
          border: none;
          background: none;
          cursor: pointer;
          letter-spacing: .01em;
          transition: gap .2s, opacity .2s;
        }
        .cta-link:hover { gap: 10px; opacity: .8; }

        /* Decorative corner mesh */
        .corner-mesh {
          position: absolute;
          bottom: 0; right: 0;
          width: 110px; height: 110px;
          opacity: .045;
          pointer-events: none;
        }

        /* Grid bg for section */
        .section-grid {
          background-image:
            linear-gradient(rgba(3,96,131,.045) 1px, transparent 1px),
            linear-gradient(90deg, rgba(3,96,131,.045) 1px, transparent 1px);
          background-size: 44px 44px;
        }

        @keyframes float-dot {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-6px); }
        }
        .float-dot { animation: float-dot 3s ease-in-out infinite; }

        .divider-line {
          height: 3px;
          border-radius: 3px;
          background: linear-gradient(90deg, #036083, #047fab, transparent);
          transform-origin: left;
          margin-bottom: 14px;
          width: 56px;
        }
      `}</style>

      <section
        ref={sectionRef}
        id="services"
        className="section-grid relative py-24 px-5 sm:px-8 overflow-hidden"
        style={{ background: "#f7fbfd" }}
      >
        {/* Ambient blobs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
             style={{ width: 700, height: 280,
               background: "radial-gradient(ellipse, rgba(3,96,131,.07) 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 right-0 pointer-events-none"
             style={{ width: 380, height: 380,
               background: "radial-gradient(circle, rgba(3,96,131,.05) 0%, transparent 70%)" }} />

        <div className="max-w-290 mx-auto relative z-10">

          {/* ── HEADER ──────────────────────────── */}
          <div className="text-center mb-16">

            <div ref={badgeRef} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5 font-bold text-[11.5px] tracking-[.09em] uppercase"
                 style={{ background: "#e8f5fa", color: "#036083", border: "1px solid rgba(3,96,131,.2)" }}>
              <span className="float-dot w-1.5 h-1.5 rounded-full" style={{ background: "#036083" }} />
              What We Build
              <Sparkles size={12} color="#036083" />
            </div>

            <div ref={lineRef} className="divider-line mx-auto" />

            <h2
              ref={headRef}
              className="font-black text-gray-950 mb-4"
              style={{ fontSize: "clamp(30px,5vw,52px)", letterSpacing: "-1.5px", lineHeight: 1.08 }}
            >
              Our Core <span style={{ color: "#036083" }}>Services</span>
            </h2>

            <p
              ref={subRef}
              className="text-gray-500 font-[450] max-w-120 mx-auto"
              style={{ fontSize: "clamp(14px,1.8vw,16.5px)", lineHeight: 1.7 }}
            >
              Everything you need to launch, grow, or refresh your online presence — built with precision.
            </p>
          </div>

          {/* ── CARDS GRID ──────────────────────── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SERVICES.map(({ icon: Icon, tag, title, desc, bullets, accent, glow, badge }, i) => {
              const cardEl  = useRef(null);
              const glowEl  = useRef(null);
              const iconEl  = useRef(null);

              return (
                <div
                  key={title}
                  ref={el => { cardsRef.current[i] = el; cardEl.current = el; }}
                  className="service-card group"
                  onMouseEnter={() => handleEnter(cardEl.current, glowEl.current, iconEl.current)}
                  onMouseLeave={() => handleLeave(cardEl.current, glowEl.current, iconEl.current)}
                >
                  {/* Glow orb */}
                  <div
                    ref={glowEl}
                    className="card-glow"
                    style={{ background: `radial-gradient(circle, ${glow} 0%, transparent 70%)` }}
                  />

                  {/* Corner mesh SVG */}
                  <svg className="corner-mesh" viewBox="0 0 110 110" fill="none">
                    {[0,1,2,3,4].map(r =>
                      [0,1,2,3,4].map(c => (
                        <circle key={`${r}-${c}`} cx={10 + c*22} cy={10 + r*22} r="1.5" fill={accent} />
                      ))
                    )}
                  </svg>

                  {/* Tag */}
                  <div className={`card-tag ${badge ? "popular-tag" : ""}`}>
                    {badge && <span className="w-1.5 h-1.5 rounded-full bg-white opacity-80 animate-pulse" />}
                    {tag}
                  </div>

                  {/* Icon */}
                  <div
                    ref={iconEl}
                    className="icon-wrap"
                    style={{ background: `linear-gradient(135deg, ${accent} 0%, ${accent}cc 100%)` }}
                  >
                    <Icon size={24} color="#fff" strokeWidth={2} />
                  </div>

                  {/* Title */}
                  <h3
                    className="font-bold text-gray-900 mb-3 leading-tight"
                    style={{ fontSize: "clamp(17px,2vw,20px)", letterSpacing: "-0.4px" }}
                  >
                    {title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-500 font-[450] leading-relaxed mb-5" style={{ fontSize: 14 }}>
                    {desc}
                  </p>

                  {/* Divider */}
                  <div className="mb-4" style={{ height: 1, background: "rgba(3,96,131,.09)" }} />

                  {/* Bullets */}
                  <div className="flex flex-col">
                    {bullets.map(b => (
                      <div key={b} className="bullet-row">
                        <CheckCircle size={14} color={accent} strokeWidth={2.5} style={{ flexShrink: 0 }} />
                        {b}
                      </div>
                    ))}
                  </div>

                  {/* CTA link */}
                  <a href="https://wa.me/923477071276?text=Hello%20Teckistan!%20I%20am%20interested%20in%20your%20web%20design%20services."
                     target="_blank"
                     rel="noopener noreferrer"
                     className="cta-link" style={{ color: accent }}>
                    Get Started
                    <ArrowRight size={14} strokeWidth={2.5} />
                  </a>
                </div>
              );
            })}
          </div>

          {/* ── BOTTOM STRIP ─────────────────── */}
          <div
            className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-5 px-7 py-5 rounded-2xl"
            style={{
              background: "linear-gradient(135deg,#036083 0%,#047fab 100%)",
              boxShadow: "0 8px 40px rgba(3,96,131,.28)"
            }}
          >
            <div>
              <p className="font-bold text-white text-[17px] leading-tight" style={{ letterSpacing: "-0.3px" }}>
                Not sure which service fits you?
              </p>
              <p className="text-white/70 font-medium text-[13.5px] mt-0.5">
                Book a free 15-min consultation — zero commitment.
              </p>
            </div>
            <a
           href="https://wa.me/923477071276?text=Hello%20Teckistan!%20I%20am%20interested%20in%20your%20web%20design%20services."
              target="_blank" 
              className="shrink-0 inline-flex items-center gap-2 bg-white font-bold text-[13.5px] px-6 py-3 rounded-[11px] transition-all duration-200 hover:scale-105 hover:shadow-lg"
              style={{ color: "#036083", boxShadow: "0 2px 12px rgba(0,0,0,.12)" }}
            >
              Book Free Call
              <ArrowRight size={14} strokeWidth={2.6} />
            </a>
          </div>

        </div>
      </section>
    </>
  );
}