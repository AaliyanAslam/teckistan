"use client"
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Sparkles, ArrowRight, Globe } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// ── SWAP IMAGE URLs HERE ──────────────────────────────────────────────────────
const PROJECTS = [
  {
    title: "Project One",
    category: "Landing Page",
    tags: ["React", "Startup"],
    image: "https://res.cloudinary.com/dlyidp2yt/image/upload/v1772817912/nextripf_acwtsr.png",   // 👈 paste your image URL here
  },
  {
    title: "Project Two",
    category: "E-Commerce",
    tags: ["Shopify", "Store"],
    image: "https://res.cloudinary.com/dlyidp2yt/image/upload/v1772818125/mobeef_op7xye.png",   // 👈 paste your image URL here
  },
  {
    title: "Project Three",
    category: "Business Website",
    tags: ["5 Pages", "Corporate"],
    image: "https://res.cloudinary.com/dlyidp2yt/image/upload/v1772817899/magf_ovewjn.png",   // 👈 paste your image URL here
  },
  {
    title: "Project Four",
    category: "Landing Page",
    tags: ["SaaS", "Conversion"],
    image: "https://res.cloudinary.com/dlyidp2yt/image/upload/v1772817890/javef_hltnnh.png",   // 👈 paste your image URL here
  },
  {
    title: "Project Five",
    category: "Advanced Website",
    tags: ["Custom", "10+ Pages"],
    image: "https://res.cloudinary.com/dlyidp2yt/image/upload/v1772818099/primesuppsf_xnp2oz.png",   // 👈 paste your image URL here
  },
  {
    title: "Project Six",
    category: "Website Redesign",
    tags: ["Redesign", "Modern UI"],
    image: "https://res.cloudinary.com/dlyidp2yt/image/upload/v1772817903/tmgf_xjwsnp.png",   // 👈 paste your image URL here
  },
];
// ─────────────────────────────────────────────────────────────────────────────

function ProjectCard({ project, index, cardRefs }) {
  const cardRef    = useRef(null);
  const imgRef     = useRef(null);
  const overlayRef = useRef(null);
  const btnsRef    = useRef(null);

  const onEnter = () => {
    gsap.to(imgRef.current,     { scale: 1, duration: 0.5,  ease: "power2.out" });
    gsap.to(overlayRef.current, { opacity: 1,  duration: 0.28, ease: "none" });
    gsap.to(btnsRef.current,    { y: 0, opacity: 1, duration: 0.26, ease: "power2.out" });
    gsap.to(cardRef.current,    {
      y: -7, duration: 0.28, ease: "power2.out",
      boxShadow: "0 22px 64px rgba(3,96,131,.18), 0 4px 18px rgba(0,0,0,.1)"
    });
  };

  const onLeave = () => {
    gsap.to(imgRef.current,     { scale: 1,   duration: 0.45, ease: "power2.inOut" });
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.26, ease: "none" });
    gsap.to(btnsRef.current,    { y: 12, opacity: 0, duration: 0.2, ease: "power2.in" });
    gsap.to(cardRef.current,    {
      y: 0, duration: 0.28, ease: "power2.inOut",
      boxShadow: "0 4px 24px rgba(3,96,131,.07), 0 1px 4px rgba(0,0,0,.04)"
    });
  };

  // register ref for scroll animation
  const setRef = (el) => {
    cardRef.current = el;
    cardRefs.current[index] = el;
  };

  return (
    <div
      ref={setRef}
      className="port-card"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {/* ── IMAGE AREA ── */}
      <div className="img-wrap">
        <div ref={imgRef} className="img-inner">
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover object-top"
              draggable={false}
            />
          ) : (
            /* Black placeholder — replace image URL to fill this */
            <div className="w-full h-full flex flex-col items-center justify-center gap-3"
                 style={{ background: "#000" }}>
              <div className="flex items-center justify-center w-12 h-12 rounded-xl"
                   style={{ background: "rgba(3,96,131,.3)", border: "1px solid rgba(3,96,131,.4)" }}>
                <Globe size={22} color="rgba(3,96,131,.8)" strokeWidth={1.8} />
              </div>
              <span className="text-[11px] font-bold tracking-widest uppercase"
                    style={{ color: "rgba(255,255,255,.25)" }}>
                Add Image URL
              </span>
            </div>
          )}
        </div>

        {/* Hover overlay */}
        <div ref={overlayRef} className="img-overlay">
          <div ref={btnsRef} className="hover-btns">
            <a href="#contact" className="view-btn">
              <Globe size={14} />
              View Website
              <ExternalLink size={12} strokeWidth={2.5} />
            </a>
            <span className="text-[11.5px] font-bold tracking-wide"
                  style={{ color: "rgba(255,255,255,.7)" }}>
              {project.category}
            </span>
          </div>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <div className="port-footer">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-extrabold text-[15px] text-gray-900 leading-tight"
              style={{ letterSpacing: "-0.3px" }}>
            {project.title}
          </h3>
          <div className="cat-chip">{project.category}</div>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map(tag => (
            <span key={tag} className="tag-pill">{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function PortfolioSection() {
  const sectionRef = useRef(null);
  const badgeRef   = useRef(null);
  const headRef    = useRef(null);
  const subRef     = useRef(null);
  const lineRef    = useRef(null);
  const cardsRef   = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header reveal
      gsap.fromTo(
        [badgeRef.current, lineRef.current, headRef.current, subRef.current],
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.11, duration: 0.65, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" } }
      );

      // Cards stagger
      cardsRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(el,
          { y: 50, opacity: 0, scale: 0.96 },
          { y: 0, opacity: 1, scale: 1,
            duration: 0.65, ease: "power3.out",
            delay: (i % 3) * 0.1,
            scrollTrigger: { trigger: el, start: "top 90%" }
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Urbanist:wght@400;500;600;700;800;900&display=swap');
        *, *::before, *::after { font-family: 'Urbanist', sans-serif; box-sizing: border-box; }
        a { text-decoration: none; }

        .section-grid {
          background-image:
            linear-gradient(rgba(3,96,131,.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(3,96,131,.04) 1px, transparent 1px);
          background-size: 44px 44px;
        }

        .port-card {
          border-radius: 18px;
          overflow: hidden;
          background: #fff;
          border: 1px solid rgba(3,96,131,.1);
          box-shadow: 0 4px 24px rgba(3,96,131,.07), 0 1px 4px rgba(0,0,0,.04);
          cursor: pointer;
          will-change: transform, box-shadow;
          transition: border-color .22s;
        }
        .port-card:hover { border-color: rgba(3,96,131,.3); }

        .img-wrap {
          position: relative;
          overflow: hidden;
          aspect-ratio: 16 / 10;
          background: #000;
        }

        .img-inner {
          width: 100%; height: 100%;
          will-change: transform;
        }

        .img-overlay {
          position: absolute; inset: 0;
          background: rgba(3,96,131,.4);
          opacity: 0;
          display: flex; align-items: center; justify-content: center;
          backdrop-filter: blur(2px);
        }

        .hover-btns {
          display: flex; flex-direction: column; align-items: center; gap: 10px;
          transform: translateY(12px); opacity: 0;
        }

        .view-btn {
          display: inline-flex; align-items: center; gap: 7px;
          background: #fff; color: #036083;
          font-size: 13px; font-weight: 800;
          padding: 10px 22px; border-radius: 10px;
          box-shadow: 0 4px 18px rgba(0,0,0,.2);
          transition: transform .16s, box-shadow .16s;
          white-space: nowrap;
        }
        .view-btn:hover { transform: scale(1.05); box-shadow: 0 6px 26px rgba(0,0,0,.25); }

        .cat-chip {
          display: inline-flex; align-items: center;
          padding: 3px 10px; border-radius: 99px;
          font-size: 10.5px; font-weight: 700;
          letter-spacing: .05em; text-transform: uppercase;
          background: #e8f5fa; color: #036083;
          border: 1px solid rgba(3,96,131,.18);
          white-space: nowrap; flex-shrink: 0;
        }

        .tag-pill {
          display: inline-flex; align-items: center;
          padding: 2px 8px; border-radius: 99px;
          font-size: 10.5px; font-weight: 700;
          background: #f1f5f9; color: #64748b;
        }

        .port-footer {
          padding: 16px 18px 18px;
          display: flex; flex-direction: column; gap: 8px;
        }

        .divider-bar {
          height: 3px; width: 52px; border-radius: 3px;
          background: linear-gradient(90deg, #036083, #047fab, transparent);
          transform-origin: left;
        }

        @keyframes float-dot { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
        .float-dot { animation: float-dot 3s ease-in-out infinite; }

        .cta-strip {
          background: linear-gradient(135deg, #036083 0%, #047fab 100%);
          box-shadow: 0 8px 40px rgba(3,96,131,.28);
        }

        @keyframes shimmer { 0%{left:-60%} 100%{left:110%} }
        .shimmer-btn { position: relative; overflow: hidden; }
        .shimmer-btn::after {
          content: ''; position: absolute;
          top: 0; bottom: 0; left: -60%; width: 40%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,.22), transparent);
          animation: shimmer 2.8s ease-in-out infinite;
        }
      `}</style>

      <section
        ref={sectionRef}
        id="portfolio"
        className="section-grid relative py-24 px-5 sm:px-8 overflow-hidden"
        style={{ background: "#f7fbfd" }}
      >
        {/* Ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
             style={{ width: 800, height: 280,
               background: "radial-gradient(ellipse, rgba(3,96,131,.06) 0%, transparent 70%)" }} />

        <div className="max-w-300 mx-auto relative z-10">

          {/* ── HEADER ─────────────────────────────── */}
          <div className="text-center mb-16">
            <div ref={badgeRef}
                 className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5 font-bold text-[11.5px] tracking-[.09em] uppercase"
                 style={{ background: "#e8f5fa", color: "#036083", border: "1px solid rgba(3,96,131,.2)" }}>
              <span className="float-dot w-1.5 h-1.5 rounded-full" style={{ background: "#036083" }} />
              Our Work
              <Sparkles size={12} color="#036083" />
            </div>

            <div ref={lineRef} className="divider-bar mx-auto mb-4" />

            <h2 ref={headRef}
                className="font-black text-gray-950 mb-4"
                style={{ fontSize: "clamp(30px,5vw,54px)", letterSpacing: "-1.8px", lineHeight: 1.07 }}>
              Projects We're{" "}
              <span style={{ color: "#036083" }}>Proud Of</span>
            </h2>

            <p ref={subRef}
               className="text-gray-500 font-[450] max-w-115 mx-auto"
               style={{ fontSize: "clamp(14px,1.8vw,16.5px)", lineHeight: 1.7 }}>
              Real websites built for real businesses — each crafted to convert and impress.
            </p>
          </div>

          {/* ── GRID ────────────────────────────────── */}
          {/* Row 1: 2 wide cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
            {PROJECTS.slice(0, 2).map((project, i) => (
              <ProjectCard key={project.title} project={project} index={i} cardRefs={cardsRef} />
            ))}
          </div>

          {/* Row 2: 3 equal cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
            {PROJECTS.slice(2, 5).map((project, i) => (
              <ProjectCard key={project.title} project={project} index={i + 2} cardRefs={cardsRef} />
            ))}
          </div>

          {/* Row 3: 1 full-width card */}
          <div className="grid grid-cols-1 gap-5">
            {PROJECTS.slice(5, 6).map((project, i) => (
              <ProjectCard key={project.title} project={project} index={i + 5} cardRefs={cardsRef} />
            ))}
          </div>

          {/* ── CTA STRIP ───────────────────────────── */}
          <div className="mt-14 cta-strip rounded-[18px] flex flex-col sm:flex-row items-center justify-between gap-5 px-8 py-6">
            <div>
              <p className="font-extrabold text-white text-[18px] leading-tight" style={{ letterSpacing: "-0.3px" }}>
                Ready to be our next success story?
              </p>
              <p className="font-medium text-[13.5px] mt-1" style={{ color: "rgba(255,255,255,.65)" }}>
                We've delivered 500+ websites. Yours could be next.
              </p>
            </div>
            <a href="#contact"
               className="shimmer-btn shrink-0 inline-flex items-center gap-2.5 bg-white font-extrabold text-[14px] px-7 py-3.5 rounded-xl hover:scale-105 transition-transform duration-200"
               style={{ color: "#036083", boxShadow: "0 4px 18px rgba(0,0,0,.15)" }}>
              Start Your Project
              <ArrowRight size={15} strokeWidth={2.6} />
            </a>
          </div>

        </div>
      </section>
    </>
  );
}