"use client"
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Zap, Phone, MapPin, ArrowRight,
  Twitter, Instagram, Linkedin, Facebook,
  Shield, Gauge, Smartphone, Star, Heart,
  MessageCircle, Mail
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const WA_LINK = "https://wa.me/923477071276?text=Hello%20Teckistan!%20I%20am%20interested%20in%20your%20web%20design%20services.";

const SERVICES = [
  { label: "Landing Page",     href: WA_LINK },
  { label: "Business Website", href: WA_LINK },
  { label: "Website Redesign", href: WA_LINK },
  { label: "SEO Optimization", href: WA_LINK },
  { label: "UI/UX Design",     href: WA_LINK },
];

const LEGAL = [
  { label: "Privacy Policy",   href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Refund Policy",    href: "#" },
];

const SOCIALS = [
  { icon: Twitter,   href: "#", label: "Twitter"   },
  { icon: Linkedin,  href: "#", label: "LinkedIn"  },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Facebook,  href: "#", label: "Facebook"  },
];

const TRUST_BADGES = [
  { icon: Shield,     val: "Secure",  sub: "SSL Protected"  },
  { icon: Gauge,      val: "99/100",  sub: "PageSpeed"      },
  { icon: Smartphone, val: "Mobile",  sub: "First Design"   },
  { icon: Star,       val: "4.9/5",   sub: "Client Rating"  },
];

export default function ModernFooter() {
  const footerRef = useRef(null);
  const ctaRef    = useRef(null);
  const gridItems = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(ctaRef.current, {
        y: 30, opacity: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: ctaRef.current, start: "top 90%" }
      });
      gsap.from(gridItems.current, {
        y: 20, opacity: 0, stagger: 0.08, duration: 0.65, ease: "power2.out",
        scrollTrigger: { trigger: gridItems.current[0], start: "top 92%" }
      });
    }, footerRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Urbanist:wght@400;500;600;700;800;900&display=swap');

        .f-container {
          font-family: 'Urbanist', sans-serif;
          background: #050a0f;
          color: #ffffff;
          overflow: hidden;
        }

        /* ── CTA CARD ── */
        .cta-card {
          background: linear-gradient(135deg, #0a1a28 0%, #061220 100%);
          border: 1px solid rgba(3,96,131,.25);
          border-radius: 24px;
          padding: 44px 48px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 40px;
          margin-bottom: -60px;
          position: relative;
          z-index: 10;
          box-shadow: 0 24px 60px rgba(0,0,0,.35), 0 0 0 1px rgba(3,96,131,.1);
          overflow: hidden;
        }
        .cta-card::before {
          content: '';
          position: absolute; inset: 0; border-radius: inherit;
          background: linear-gradient(130deg, rgba(3,96,131,.08) 0%, transparent 60%);
          pointer-events: none;
        }
        /* dot mesh */
        .cta-card::after {
          content: '';
          position: absolute; inset: 0; border-radius: inherit;
          background-image: radial-gradient(circle, rgba(255,255,255,.07) 1px, transparent 1px);
          background-size: 22px 22px;
          pointer-events: none;
        }

        .cta-btn-main {
          background: linear-gradient(135deg, #036083 0%, #047fab 100%);
          color: white;
          padding: 14px 28px;
          border-radius: 12px;
          font-weight: 800;
          font-size: 15px;
          display: inline-flex;
          align-items: center;
          gap: 9px;
          transition: transform .2s, box-shadow .2s;
          flex-shrink: 0;
          position: relative; overflow: hidden;
          box-shadow: 0 4px 22px rgba(3,96,131,.35);
          white-space: nowrap;
        }
        .cta-btn-main::before {
          content: ''; position: absolute; inset: 0; border-radius: inherit;
          background: linear-gradient(120deg,rgba(255,255,255,.16) 0%,transparent 55%);
        }
        .cta-btn-main:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(3,96,131,.45); }

        /* ── GRID ── */
        .f-body {
          padding: 120px 24px 48px;
          border-top: 1px solid rgba(255,255,255,.05);
        }

        .f-grid {
          display: grid;
          grid-template-columns: 1.8fr 1fr 1.4fr;
          gap: 64px;
          max-width: 1200px;
          margin: 0 auto;
        }

        @media(max-width:1024px) {
          .f-grid { grid-template-columns: 1fr 1fr; gap: 40px; }
          .cta-card { flex-direction: column; text-align: center; align-items: center; padding: 32px 28px; }
        }
        @media(max-width:640px) {
          .f-grid { grid-template-columns: 1fr; gap: 36px; }
        }

        .f-col-title {
          font-size: 11px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: .12em;
          color: #5ac8e8;
          margin-bottom: 22px;
        }

        /* Service links → WhatsApp */
        .f-link {
          display: flex;
          align-items: center;
          gap: 8px;
          color: rgba(255,255,255,.5);
          font-size: 14.5px;
          font-weight: 550;
          margin-bottom: 11px;
          text-decoration: none;
          transition: color .18s, padding-left .18s;
        }
        .f-link:hover { color: #5ac8e8; padding-left: 4px; }
        .f-link-dot {
          width: 4px; height: 4px; border-radius: 50%;
          background: #036083; opacity: 0; flex-shrink: 0;
          transition: opacity .18s;
        }
        .f-link:hover .f-link-dot { opacity: 1; }

        /* WhatsApp icon badge on each link */
        .wa-badge {
          margin-left: auto;
          opacity: 0;
          transition: opacity .18s;
        }
        .f-link:hover .wa-badge { opacity: .7; }

        /* ── CONTACT BLOCK ── */
        .contact-card {
          background: rgba(255,255,255,.035);
          border: 1px solid rgba(255,255,255,.07);
          border-radius: 16px;
          overflow: hidden;
        }

        .wa-cta-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: 100%;
          background: #25d366;
          color: #fff;
          font-size: 15px;
          font-weight: 800;
          padding: 14px 20px;
          text-decoration: none;
          transition: background .18s, transform .18s;
          position: relative; overflow: hidden;
        }
        .wa-cta-btn::before {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(120deg,rgba(255,255,255,.14) 0%,transparent 55%);
        }
        .wa-cta-btn:hover { background: #1fba58; transform: scale(1.01); }

        .contact-row {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 18px;
          border-top: 1px solid rgba(255,255,255,.06);
        }
        .contact-icon {
          width: 32px; height: 32px; border-radius: 9px;
          background: rgba(3,96,131,.25);
          border: 1px solid rgba(3,96,131,.3);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }

        /* Social icons */
        .social-icon {
          width: 36px; height: 36px; border-radius: 9px;
          background: rgba(255,255,255,.06);
          border: 1px solid rgba(255,255,255,.08);
          display: flex; align-items: center; justify-content: center;
          transition: background .18s, border-color .18s, transform .18s;
          text-decoration: none;
        }
        .social-icon:hover {
          background: rgba(3,96,131,.3);
          border-color: rgba(3,96,131,.5);
          transform: translateY(-3px);
        }

        /* Trust badges */
        .trust-strip {
          display: flex; flex-wrap: wrap; gap: 10px;
          padding: 24px 0;
          border-top: 1px solid rgba(255,255,255,.05);
          max-width: 1200px; margin: 0 auto;
        }
        .trust-badge {
          display: flex; align-items: center; gap: 9px;
          padding: 9px 14px; border-radius: 11px;
          background: rgba(255,255,255,.04);
          border: 1px solid rgba(255,255,255,.07);
          transition: border-color .2s, background .2s;
        }
        .trust-badge:hover { background: rgba(3,96,131,.15); border-color: rgba(3,96,131,.3); }
        .trust-badge-icon {
          width: 28px; height: 28px; border-radius: 7px;
          background: rgba(3,96,131,.25);
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }

        /* Bottom bar */
        .f-bottom {
          max-width: 1200px; margin: 0 auto;
          padding: 20px 0;
          border-top: 1px solid rgba(255,255,255,.05);
          display: flex; align-items: center; justify-content: space-between;
          flex-wrap: wrap; gap: 14px;
        }

        @keyframes pulse-green {
          0%,100% { box-shadow: 0 0 0 0 rgba(34,197,94,.5); }
          50%      { box-shadow: 0 0 0 5px rgba(34,197,94,0); }
        }
        .pulse-green { animation: pulse-green 2s ease-in-out infinite; }
      `}</style>

      <footer className="f-container" ref={footerRef}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "64px 24px 0" }}>

          {/* ── FLOATING CTA CARD ── */}
          <div className="cta-card" ref={ctaRef}>
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "4px 12px", borderRadius: 99, background: "rgba(3,96,131,.2)", border: "1px solid rgba(3,96,131,.3)", fontSize: 11, fontWeight: 800, letterSpacing: ".08em", textTransform: "uppercase", color: "#5ac8e8", marginBottom: 14 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#5ac8e8" }} />
                Let's Work Together
              </div>
              <h2 style={{ fontSize: "clamp(22px,4vw,36px)", fontWeight: 900, letterSpacing: "-1px", lineHeight: 1.1, marginBottom: 10 }}>
                Ready to transform your{" "}
                <span style={{ color: "#5ac8e8" }}>digital presence?</span>
              </h2>
              <p style={{ color: "rgba(255,255,255,.45)", fontWeight: 500, fontSize: 15 }}>
                Join 120+ businesses growing with Teckistan Solutions.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: "flex-start", position: "relative", zIndex: 1 }}>
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="cta-btn-main">
                <MessageCircle size={18} fill="white" />
                Chat on WhatsApp
                <ArrowRight size={16} strokeWidth={2.6} />
              </a>
              <span style={{ fontSize: 12.5, fontWeight: 600, color: "rgba(255,255,255,.3)", paddingLeft: 4 }}>
                Usually replies within 5 minutes
              </span>
            </div>
          </div>

          {/* ── FOOTER BODY ── */}
          <div className="f-body">
            <div className="f-grid">

              {/* ── COL 1: Brand ── */}
              <div ref={el => gridItems.current[0] = el}>
                <div style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 18 }}>
                  <div style={{ width: 38, height: 38, borderRadius: 10, background: "linear-gradient(135deg,#036083,#047fab)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Zap size={18} fill="white" color="white" />
                  </div>
                  <div style={{ lineHeight: 1 }}>
                    <div style={{ fontWeight: 900, fontSize: 17, letterSpacing: "-0.4px" }}>Teckistan</div>
                    <div style={{ fontWeight: 700, fontSize: 10, letterSpacing: ".12em", textTransform: "uppercase", color: "#5ac8e8", marginTop: 2 }}>Solutions</div>
                  </div>
                </div>

                <p style={{ color: "rgba(255,255,255,.4)", lineHeight: 1.7, marginBottom: 24, fontSize: 14, maxWidth: 300 }}>
                  Karachi's trusted web design agency building modern, fast, and high-converting websites for businesses worldwide.
                </p>

                {/* Socials */}
                <div style={{ display: "flex", gap: 8, marginBottom: 28 }}>
                  {SOCIALS.map(({ icon: Icon, href, label }) => (
                    <a key={label} href={href} className="social-icon" aria-label={label}>
                      <Icon size={15} color="rgba(255,255,255,.5)" />
                    </a>
                  ))}
                </div>

                {/* Location */}
                <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                  <MapPin size={14} color="#5ac8e8" />
                  <span style={{ fontSize: 13.5, fontWeight: 600, color: "rgba(255,255,255,.4)" }}>Karachi, Pakistan</span>
                </div>
              </div>

              {/* ── COL 2: Services (all → WhatsApp) ── */}
              <div ref={el => gridItems.current[1] = el}>
                <div className="f-col-title">Services</div>
                {SERVICES.map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="f-link"
                  >
                    <span className="f-link-dot" />
                    {label}
                    <MessageCircle size={12} className="wa-badge" color="#25d366" />
                  </a>
                ))}
              </div>

              {/* ── COL 3: Contact ── */}
              <div ref={el => gridItems.current[2] = el}>
                <div className="f-col-title">Contact Us</div>

                <div className="contact-card">
                  {/* WhatsApp CTA button */}
                  <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="wa-cta-btn">
                    <MessageCircle size={20} fill="white" />
                    Chat on WhatsApp
                    <ArrowRight size={16} strokeWidth={2.5} />
                  </a>

                  {/* Phone number */}
                  <div className="contact-row">
                    <div className="contact-icon">
                      <Phone size={14} color="#5ac8e8" />
                    </div>
                    <div>
                      <div style={{ fontSize: 10.5, fontWeight: 700, color: "rgba(255,255,255,.3)", letterSpacing: ".06em", textTransform: "uppercase", marginBottom: 2 }}>
                        Phone / WhatsApp
                      </div>
                      <a href="tel:+923477071276"
                         style={{ fontSize: 14.5, fontWeight: 700, color: "rgba(255,255,255,.8)", textDecoration: "none", transition: "color .15s" }}
                         onMouseEnter={e => e.currentTarget.style.color="#5ac8e8"}
                         onMouseLeave={e => e.currentTarget.style.color="rgba(255,255,255,.8)"}>
                        +92 347 707 1276
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="contact-row">
                    <div className="contact-icon">
                      <Mail size={14} color="#5ac8e8" />
                    </div>
                    <div>
                      <div style={{ fontSize: 10.5, fontWeight: 700, color: "rgba(255,255,255,.3)", letterSpacing: ".06em", textTransform: "uppercase", marginBottom: 2 }}>
                        Email
                      </div>
                      <a href="mailto:teckistansolutions@gmail.com
"
                         style={{ fontSize: 14.5, fontWeight: 700, color: "rgba(255,255,255,.8)", textDecoration: "none", transition: "color .15s" }}
                         onMouseEnter={e => e.currentTarget.style.color="#5ac8e8"}
                         onMouseLeave={e => e.currentTarget.style.color="rgba(255,255,255,.8)"}>
                        teckistansolutions@gmail.com
                      </a>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="contact-row" style={{ borderTop: "1px solid rgba(255,255,255,.06)" }}>
                    <span className="pulse-green" style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e", flexShrink: 0 }} />
                    <span style={{ fontSize: 12.5, fontWeight: 700, color: "rgba(34,197,94,.8)" }}>
                      Currently accepting projects
                    </span>
                  </div>
                </div>

                {/* Working hours */}
                <div style={{ marginTop: 20 }}>
                  <div className="f-col-title" style={{ marginBottom: 12 }}>Hours</div>
                  {[
                    { day: "Mon – Fri", time: "9 AM – 7 PM" },
                    { day: "Saturday",  time: "10 AM – 4 PM" },
                    { day: "Sunday",    time: "Closed" },
                  ].map(({ day, time }) => (
                    <div key={day} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                      <span style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,.35)" }}>{day}</span>
                      <span style={{ fontSize: 13, fontWeight: 700, color: time === "Closed" ? "rgba(255,80,80,.5)" : "rgba(255,255,255,.6)" }}>{time}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* ── TRUST BADGES ── */}
            <div className="trust-strip">
              {TRUST_BADGES.map(({ icon: Icon, val, sub }) => (
                <div key={val} className="trust-badge">
                  <div className="trust-badge-icon">
                    <Icon size={14} color="#5ac8e8" strokeWidth={2} />
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 800, color: "#fff", lineHeight: 1 }}>{val}</div>
                    <div style={{ fontSize: 10.5, fontWeight: 600, color: "rgba(255,255,255,.35)", marginTop: 2 }}>{sub}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* ── BOTTOM BAR ── */}
            <div className="f-bottom">
              <span style={{ fontSize: 13, color: "rgba(255,255,255,.28)", fontWeight: 600 }}>
                © {new Date().getFullYear()} Teckistan Solutions. All rights reserved.
              </span>

              <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
                {LEGAL.map(({ label, href }) => (
                  <a key={label} href={href} style={{ fontSize: 13, color: "rgba(255,255,255,.28)", textDecoration: "none", fontWeight: 600, transition: "color .15s" }}
                     onMouseEnter={e => e.currentTarget.style.color="rgba(255,255,255,.6)"}
                     onMouseLeave={e => e.currentTarget.style.color="rgba(255,255,255,.28)"}>
                    {label}
                  </a>
                ))}
              </div>

            
            </div>

          </div>
        </div>
      </footer>
    </>
  );
}