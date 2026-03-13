"use client"
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Sparkles, ArrowRight, Globe } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    title: "Nextrip",
    category: "Travel Website",
    tags: ["Next.js", "Travel", "Booking"],
    image: "https://res.cloudinary.com/dlyidp2yt/image/upload/v1772817912/nextripf_acwtsr.png",
    url: "https://nextripxar.vercel.app/",
    desc: "Tour & travel booking platform",
  },
  {
    title: "Mobee Medical",
    category: "Medical Website",
    tags: ["Next.js", "React", "Healthcare"],
    image: "https://res.cloudinary.com/dlyidp2yt/image/upload/v1772818125/mobeef_op7xye.png",
    url: "https://mobeemedical.vercel.app/",
    desc: "Professional medical services web",
  },
  {
    title: "Magnetik",
    category: "SaaS Landing Page",
    tags: ["Next.js", "SaaS", "Conversion"],
    image: "https://res.cloudinary.com/dlyidp2yt/image/upload/v1772817899/magf_ovewjn.png",
    url: "https://magnetik.vercel.app/",
    desc: "High-converting SaaS landing page",
  },
  {
    title: "Javexa",
    category: "E-Commerce Store",
    tags: ["Next.js", "E-Commerce", "Store"],
    image: "https://res.cloudinary.com/dlyidp2yt/image/upload/v1772817890/javef_hltnnh.png",
    url: "https://javexafterrender.vercel.app/",
    desc: "Full-featured e-commerce storefront",
  },
  {
    title: "Prime Supps",
    category: "Supplement Store",
    tags: ["Next.js", "Gym", "Supplements"],
    image: "https://res.cloudinary.com/dlyidp2yt/image/upload/v1772818099/primesuppsf_xnp2oz.png",
    url: "https://prime-supps.vercel.app/",
    desc: "Gym & supplement e-commerce store",
  },
  {
    title: "TMG Van",
    category: "Vehicle Sales",
    tags: ["Next.js", "Automotive", "Listings"],
    image: "https://res.cloudinary.com/dlyidp2yt/image/upload/v1772817903/tmgf_xjwsnp.png",
    url: "https://tmgvan.vercel.app/",
    desc: "Vehicle selling & listing website",
  },
];

function ProjectCard({ project, index, cardRefs }) {
  const cardRef    = useRef(null);
  const imgRef     = useRef(null);
  const overlayRef = useRef(null);
  const btnsRef    = useRef(null);

  const onEnter = () => {
    gsap.to(imgRef.current,     { scale: 1.06, duration: 0.5,  ease: "power2.out" });
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

  const setRef = (el) => {
    cardRef.current = el;
    cardRefs.current[index] = el;
  };

  return (
    <div ref={setRef} className="port-card" onMouseEnter={onEnter} onMouseLeave={onLeave}>

      {/* IMAGE */}
      <div className="img-wrap">
        <div ref={imgRef} className="img-inner">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover object-top"
            draggable={false}
          />
        </div>

        {/* Hover overlay */}
        <div ref={overlayRef} className="img-overlay">
          <div ref={btnsRef} className="hover-btns">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="view-btn"
              onClick={e => e.stopPropagation()}
            >
              <Globe size={14} />
              View Website
              <ExternalLink size={12} strokeWidth={2.5} />
            </a>
            <span style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,.75)", letterSpacing: ".04em" }}>
              {project.desc}
            </span>
          </div>
        </div>
      </div>

      {/* CARD FOOTER */}
      <div className="port-footer">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-extrabold text-[15px] text-gray-900 leading-tight" style={{ letterSpacing: "-0.3px" }}>
            {project.title}
          </h3>
          <div className="cat-chip">{project.category}</div>
        </div>

        {/* Live URL row */}
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="url-row"
          onClick={e => e.stopPropagation()}
        >
          <Globe size={11} style={{ flexShrink: 0 }} />
          <span>{project.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}</span>
          <ExternalLink size={10} strokeWidth={2.2} style={{ marginLeft: "auto", flexShrink: 0, opacity: 0.45 }} />
        </a>

        {/* Tags */}
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
      gsap.fromTo(
        [badgeRef.current, lineRef.current, headRef.current, subRef.current],
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.11, duration: 0.65, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" } }
      );
      cardsRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(el,
          { y: 50, opacity: 0, scale: 0.96 },
          { y: 0, opacity: 1, scale: 1, duration: 0.65, ease: "power3.out",
            delay: (i % 3) * 0.1,
            scrollTrigger: { trigger: el, start: "top 90%" } }
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
          border-radius: 18px; overflow: hidden; background: #fff;
          border: 1px solid rgba(3,96,131,.1);
          box-shadow: 0 4px 24px rgba(3,96,131,.07), 0 1px 4px rgba(0,0,0,.04);
          cursor: pointer; will-change: transform, box-shadow;
          transition: border-color .22s;
        }
        .port-card:hover { border-color: rgba(3,96,131,.3); }

        .img-wrap { position: relative; overflow: hidden; aspect-ratio: 16/10; background: #000; }
        .img-inner { width: 100%; height: 100%; will-change: transform; }

        .img-overlay {
          position: absolute; inset: 0;
          background: rgba(3,96,131,.45); opacity: 0;
          display: flex; align-items: center; justify-content: center;
          backdrop-filter: blur(3px);
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
          transition: transform .16s, box-shadow .16s; white-space: nowrap;
        }
        .view-btn:hover { transform: scale(1.05); box-shadow: 0 6px 26px rgba(0,0,0,.25); }

        .port-footer { padding: 14px 18px 16px; display: flex; flex-direction: column; gap: 8px; }

        .cat-chip {
          display: inline-flex; align-items: center;
          padding: 3px 10px; border-radius: 99px;
          font-size: 10.5px; font-weight: 700; letter-spacing: .05em; text-transform: uppercase;
          background: #e8f5fa; color: #036083; border: 1px solid rgba(3,96,131,.18);
          white-space: nowrap; flex-shrink: 0;
        }

        .url-row {
          display: flex; align-items: center; gap: 6px;
          font-size: 12px; font-weight: 650; color: #036083;
          background: #f0f9ff; border: 1px solid rgba(3,96,131,.15);
          border-radius: 8px; padding: 5px 10px;
          transition: background .18s, border-color .18s; overflow: hidden;
        }
        .url-row span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; flex: 1; }
        .url-row:hover { background: #e0f2fe; border-color: rgba(3,96,131,.32); }

        .tag-pill {
          display: inline-flex; align-items: center;
          padding: 2px 8px; border-radius: 99px;
          font-size: 10.5px; font-weight: 700;
          background: #f1f5f9; color: #64748b;
        }

        .divider-bar {
          height: 3px; width: 52px; border-radius: 3px;
          background: linear-gradient(90deg, #036083, #047fab, transparent);
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
        <div className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
             style={{ width: 800, height: 280,
               background: "radial-gradient(ellipse, rgba(3,96,131,.06) 0%, transparent 70%)" }} />

        <div className="max-w-[1260px] mx-auto relative z-10">

          {/* HEADER */}
          <div className="text-center mb-16">
            <div ref={badgeRef}
                 className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5 font-bold text-[11.5px] tracking-[.09em] uppercase"
                 style={{ background: "#e8f5fa", color: "#036083", border: "1px solid rgba(3,96,131,.2)" }}>
              <span className="float-dot w-1.5 h-1.5 rounded-full" style={{ background: "#036083" }} />
              Our Work
              <Sparkles size={12} color="#036083" />
            </div>
            <div ref={lineRef} className="divider-bar mx-auto mb-4" />
            <h2 ref={headRef} className="font-black text-gray-950 mb-4"
                style={{ fontSize: "clamp(30px,5vw,54px)", letterSpacing: "-1.8px", lineHeight: 1.07 }}>
              Projects We're{" "}
              <span style={{ color: "#036083" }}>Proud Of</span>
            </h2>
            <p ref={subRef} className="text-gray-500 font-[450] max-w-[460px] mx-auto"
               style={{ fontSize: "clamp(14px,1.8vw,16.5px)", lineHeight: 1.7 }}>
              Real websites built for real businesses — each crafted to convert and impress.
            </p>
          </div>

          {/* Row 1: 2 wide — Nextrip + Mobee Medical */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
            {PROJECTS.slice(0, 2).map((p, i) => (
              <ProjectCard key={p.title} project={p} index={i} cardRefs={cardsRef} />
            ))}
          </div>

          {/* Row 2: 3 equal — Magnetik + Javexa + Prime Supps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
            {PROJECTS.slice(2, 5).map((p, i) => (
              <ProjectCard key={p.title} project={p} index={i + 2} cardRefs={cardsRef} />
            ))}
          </div>

          {/* Row 3: full-width — TMG Van */}
          <div className="grid grid-cols-1 gap-5">
            {PROJECTS.slice(5, 6).map((p, i) => (
              <ProjectCard key={p.title} project={p} index={i + 5} cardRefs={cardsRef} />
            ))}
          </div>

          {/* CTA STRIP */}
          <div className="mt-14 cta-strip rounded-[18px] flex flex-col sm:flex-row items-center justify-between gap-5 px-8 py-6">
            <div>
              <p className="font-extrabold text-white text-[18px] leading-tight" style={{ letterSpacing: "-0.3px" }}>
                Ready to be our next success story?
              </p>
              <p className="font-medium text-[13.5px] mt-1" style={{ color: "rgba(255,255,255,.65)" }}>
                We've delivered 500+ websites. Yours could be next.
              </p>
            </div>
            <a
              href="https://wa.me/923477071276?text=Hello%20Teckistan!%20I%20am%20interested%20in%20starting%20a%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="shimmer-btn shrink-0 inline-flex items-center gap-2.5 bg-white font-extrabold text-[14px] px-7 py-3.5 rounded-xl hover:scale-105 transition-transform duration-200"
              style={{ color: "#036083", boxShadow: "0 4px 18px rgba(0,0,0,.15)" }}
            >
              Start Your Project
              <ArrowRight size={15} strokeWidth={2.6} />
            </a>
          </div>

        </div>
      </section>
    </>
  );
}