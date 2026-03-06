"use client"
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Check, Zap, Globe, Layers,
  ArrowRight, Sparkles, Star, Shield, Clock
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const PLANS = [
  {
    icon: Zap,
    name: "Starter",
    sub: "Landing Page",
    price: 99,
    desc: "Perfect for startups and solo founders who need a fast, converting page.",
    popular: false,
    features: [
      { text: "1-Page Landing Design",      included: true  },
      { text: "Mobile Responsive",           included: true  },
      { text: "Contact Form",                included: true  },
      { text: "Basic SEO Setup",             included: true  },
      { text: "3-Day Delivery",              included: true  },
      { text: "CMS Integration",             included: false },
      { text: "Custom Animations",           included: false },
      { text: "Priority Support",            included: false },
    ],
    cta: "Get Started",
    badge: null,
    delivery: "3 days",
  },
  {
    icon: Globe,
    name: "Business",
    sub: "5 Page Website",
    price: 200,
    desc: "A complete web presence for growing businesses ready to stand out.",
    popular: true,
    features: [
      { text: "5-Page Professional Site",    included: true  },
      { text: "Mobile Responsive",           included: true  },
      { text: "Contact Form + Map",          included: true  },
      { text: "Full SEO Optimization",       included: true  },
      { text: "7-Day Delivery",              included: true  },
      { text: "CMS Integration",             included: true  },
      { text: "Custom Animations",           included: true  },
      { text: "Priority Support",            included: false },
    ],
    cta: "Get Started",
    badge: "Most Popular",
    delivery: "7 days",
  },
  {
    icon: Layers,
    name: "Premium",
    sub: "Advanced Website",
    price: 500,
    desc: "Enterprise-grade websites with custom features and full ongoing support.",
    popular: false,
    features: [
      { text: "10+ Pages Custom Build",      included: true  },
      { text: "Mobile Responsive",           included: true  },
      { text: "Advanced Forms & CRM",        included: true  },
      { text: "Advanced SEO + Analytics",    included: true  },
      { text: "14-Day Delivery",             included: true  },
      { text: "CMS + Admin Panel",           included: true  },
      { text: "Custom Animations",           included: true  },
      { text: "Priority Support 30 Days",    included: true  },
    ],
    cta: "Get Started",
    badge: "Best Value",
    delivery: "14 days",
  },
];

export default function PricingSection() {
  const sectionRef = useRef(null);
  const badgeRef   = useRef(null);
  const headRef    = useRef(null);
  const subRef     = useRef(null);
  const cardsRef   = useRef([]);
  const lineRef    = useRef(null);

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
      gsap.fromTo(
        cardsRef.current,
        { y: 60, opacity: 0, scale: 0.97 },
        { y: 0, opacity: 1, scale: 1,
          stagger: 0.13, duration: 0.72, ease: "power3.out",
          scrollTrigger: { trigger: cardsRef.current[0], start: "top 88%" } }
      );

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const onEnter = (el, i) => {
    const isPopular = PLANS[i].popular;
    gsap.to(el, {
      y: -10, scale: isPopular ? 1.025 : 1.022,
      duration: 0.3, ease: "power2.out",
      boxShadow: isPopular
        ? "0 28px 70px rgba(3,96,131,.28), 0 4px 18px rgba(0,0,0,.08)"
        : "0 20px 56px rgba(3,96,131,.13), 0 2px 10px rgba(0,0,0,.06)"
    });
  };
  const onLeave = (el, i) => {
    const isPopular = PLANS[i].popular;
    gsap.to(el, {
      y: isPopular ? -4 : 0, scale: 1,
      duration: 0.28, ease: "power2.inOut",
      boxShadow: isPopular
        ? "0 16px 52px rgba(3,96,131,.22), 0 2px 12px rgba(0,0,0,.07)"
        : "0 4px 24px rgba(3,96,131,.07), 0 1px 4px rgba(0,0,0,.04)"
    });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Urbanist:wght@400;500;600;700;800;900&display=swap');
        *, *::before, *::after { font-family: 'Urbanist', sans-serif; box-sizing: border-box; }
        a { text-decoration: none; }

        .section-grid {
          background-image:
            linear-gradient(rgba(3,96,131,.042) 1px, transparent 1px),
            linear-gradient(90deg, rgba(3,96,131,.042) 1px, transparent 1px);
          background-size: 44px 44px;
        }

        /* ── BASE CARD ── */
        .price-card {
          position: relative;
          background: #ffffff;
          border: 1.5px solid rgba(3,96,131,.1);
          border-radius: 24px;
          padding: 36px 30px 32px;
          display: flex;
          flex-direction: column;
          box-shadow: 0 4px 24px rgba(3,96,131,.07), 0 1px 4px rgba(0,0,0,.04);
          transition: border-color .25s;
          will-change: transform, box-shadow;
          overflow: hidden;
        }
        .price-card:hover { border-color: rgba(3,96,131,.28); }

        /* ── POPULAR CARD ── */
        .price-card.popular {
          background: linear-gradient(160deg, #036083 0%, #025570 55%, #014a62 100%);
          border: none;
          box-shadow: 0 16px 52px rgba(3,96,131,.22), 0 2px 12px rgba(0,0,0,.07);
          transform: translateY(-4px);
        }
        .price-card.popular:hover { border: none; }

        /* Popular shine overlay */
        .popular-shine {
          position: absolute; inset: 0; border-radius: inherit;
          background: linear-gradient(130deg, rgba(255,255,255,.09) 0%, transparent 55%);
          pointer-events: none;
        }
        /* Popular dots pattern */
        .popular-dots {
          position: absolute; top: -10px; right: -10px;
          width: 130px; height: 130px; opacity: .07;
          pointer-events: none;
        }

        /* ── BADGE ── */
        .plan-badge {
          position: absolute;
          top: 22px; right: 22px;
          display: inline-flex; align-items: center; gap: 5px;
          padding: 4px 11px;
          border-radius: 99px;
          font-size: 10.5px; font-weight: 800;
          letter-spacing: .07em; text-transform: uppercase;
        }
        .badge-popular {
          background: rgba(255,255,255,.18);
          color: #fff;
          border: 1px solid rgba(255,255,255,.28);
          backdrop-filter: blur(4px);
        }
        .badge-value {
          background: #e8f5fa;
          color: #036083;
          border: 1px solid rgba(3,96,131,.2);
        }

        /* ── ICON ── */
        .plan-icon {
          display: flex; align-items: center; justify-content: center;
          width: 48px; height: 48px; border-radius: 14px;
          margin-bottom: 20px; position: relative; z-index: 1;
        }
        .plan-icon::after {
          content: ''; position: absolute; inset: 0; border-radius: inherit;
          background: linear-gradient(135deg,rgba(255,255,255,.2) 0%,transparent 60%);
        }

        /* ── PRICE ── */
        .price-amount {
          font-weight: 900;
          letter-spacing: -3px;
          line-height: 1;
        }

        /* ── DIVIDER ── */
        .card-divider {
          height: 1px;
          margin: 22px 0;
        }
        .divider-light { background: rgba(3,96,131,.09); }
        .divider-dark  { background: rgba(255,255,255,.14); }

        /* ── FEATURE ROW ── */
        .feat-row {
          display: flex; align-items: center; gap: 10px;
          padding: 7px 0;
          border-bottom: 1px solid transparent;
          font-size: 13.5px; font-weight: 600;
        }
        .feat-row-light { color: #475569; border-color: rgba(3,96,131,.055); }
        .feat-row-dark  { color: rgba(255,255,255,.82); border-color: rgba(255,255,255,.09); }
        .feat-row:last-child { border-bottom: none; }
        .feat-excluded { opacity: .38; text-decoration: line-through; }

        /* ── CTA ── */
        .cta-light {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          padding: 14px;
          border-radius: 13px;
          font-size: 14.5px; font-weight: 800;
          color: #fff;
          background: linear-gradient(135deg,#036083 0%,#047fab 100%);
          box-shadow: 0 4px 22px rgba(3,96,131,.28);
          transition: transform .18s, box-shadow .18s, opacity .18s;
          position: relative; overflow: hidden;
          margin-top: auto;
        }
        .cta-light:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(3,96,131,.38); }
        .cta-light::before {
          content: ''; position: absolute; inset: 0; border-radius: inherit;
          background: linear-gradient(120deg,rgba(255,255,255,.16) 0%,transparent 55%);
        }

        .cta-dark {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          padding: 14px;
          border-radius: 13px;
          font-size: 14.5px; font-weight: 800;
          color: #036083;
          background: #ffffff;
          box-shadow: 0 4px 20px rgba(0,0,0,.12);
          transition: transform .18s, box-shadow .18s;
          position: relative; overflow: hidden;
          margin-top: auto;
        }
        .cta-dark:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(0,0,0,.18); }
        .cta-dark::before {
          content: ''; position: absolute; inset: 0; border-radius: inherit;
          background: linear-gradient(120deg,rgba(3,96,131,.06) 0%,transparent 55%);
        }

        @keyframes shimmer-sweep {
          0%   { left: -60%; }
          100% { left: 110%; }
        }
        .shimmer::after {
          content: '';
          position: absolute; top: 0; bottom: 0; left: -60%; width: 45%;
          background: linear-gradient(90deg,transparent,rgba(255,255,255,.22),transparent);
          animation: shimmer-sweep 2.8s ease-in-out infinite;
        }

        /* delivery chip */
        .delivery-chip {
          display: inline-flex; align-items: center; gap: 5px;
          padding: 3px 9px; border-radius: 99px;
          font-size: 11px; font-weight: 700;
        }

        @keyframes float-dot {
          0%,100%{ transform: translateY(0); }
          50%    { transform: translateY(-5px); }
        }
        .float-dot { animation: float-dot 3s ease-in-out infinite; }

        .divider-bar {
          height: 3px; width: 52px; border-radius: 3px;
          background: linear-gradient(90deg,#036083,#047fab,transparent);
          transform-origin: left;
        }
      `}</style>

      <section
        ref={sectionRef}
        id="pricing"
        className="section-grid relative py-24 px-5 sm:px-8 overflow-hidden"
        style={{ background: "#ffffff" }}
      >
        {/* Ambient blobs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
             style={{ width: 800, height: 300,
               background: "radial-gradient(ellipse,rgba(3,96,131,.06) 0%,transparent 70%)" }} />
        <div className="absolute bottom-0 left-0 pointer-events-none"
             style={{ width: 350, height: 350,
               background: "radial-gradient(circle,rgba(3,96,131,.04) 0%,transparent 70%)" }} />

        <div className="max-w-285 mx-auto relative z-10">

          {/* ── HEADER ──────────────────────────── */}
          <div className="text-center mb-16">
            <div ref={badgeRef} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5 font-bold text-[11.5px] tracking-[.09em] uppercase"
                 style={{ background: "#e8f5fa", color: "#036083", border: "1px solid rgba(3,96,131,.2)" }}>
              <span className="float-dot w-1.5 h-1.5 rounded-full" style={{ background: "#036083" }} />
              Transparent Pricing
              <Sparkles size={12} color="#036083" />
            </div>

            <div ref={lineRef} className="divider-bar mx-auto mb-4" />

            <h2 ref={headRef} className="font-black text-gray-950 mb-4"
                style={{ fontSize: "clamp(30px,5vw,54px)", letterSpacing: "-1.8px", lineHeight: 1.07 }}>
              Simple, Honest <span style={{ color: "#036083" }}>Pricing</span>
            </h2>

            <p ref={subRef} className="text-gray-500 font-[450] max-w-115 mx-auto"
               style={{ fontSize: "clamp(14px,1.8vw,16.5px)", lineHeight: 1.7 }}>
              No hidden fees. No surprises. Pick the plan that fits your goals and launch fast.
            </p>
          </div>

          {/* ── CARDS ───────────────────────────── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {PLANS.map((plan, i) => {
              const Icon = plan.icon;
              const pop  = plan.popular;

              return (
                <div
                  key={plan.name}
                  ref={el => cardsRef.current[i] = el}
                  className={`price-card ${pop ? "popular" : ""}`}
                  onMouseEnter={e => onEnter(e.currentTarget, i)}
                  onMouseLeave={e => onLeave(e.currentTarget, i)}
                >
                  {/* Popular card decorations */}
                  {pop && (
                    <>
                      <div className="popular-shine" />
                      <svg className="popular-dots" viewBox="0 0 130 130" fill="none">
                        {[0,1,2,3,4,5].map(r =>
                          [0,1,2,3,4,5].map(c => (
                            <circle key={`${r}-${c}`} cx={10+c*22} cy={10+r*22} r="2" fill="white"/>
                          ))
                        )}
                      </svg>
                    </>
                  )}

                  {/* Badge */}
                  {plan.badge && (
                    <div className={`plan-badge ${pop ? "badge-popular" : "badge-value"}`}>
                      {pop && <Star size={10} fill="white" color="white" />}
                      {plan.badge}
                    </div>
                  )}

                  {/* Icon */}
                  <div className="plan-icon"
                       style={{ background: pop
                         ? "rgba(255,255,255,.18)"
                         : "linear-gradient(135deg,#036083,#047fab)" }}>
                    <Icon size={22} color={pop ? "#fff" : "#fff"} strokeWidth={2} />
                  </div>

                  {/* Plan name + sub */}
                  <div className="mb-1">
                    <div className={`font-extrabold text-[19px] leading-tight ${pop ? "text-white" : "text-gray-900"}`}
                         style={{ letterSpacing: "-0.3px" }}>
                      {plan.name}
                    </div>
                    <div className={`font-semibold text-[13px] mt-0.5 ${pop ? "text-white/60" : "text-gray-400"}`}>
                      {plan.sub}
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex items-end gap-1.5 mt-5 mb-2">
                    <span className={`text-[13px] font-bold mb-2.5 ${pop ? "text-white/70" : "text-gray-400"}`}>$</span>
                    <span className={`price-amount ${pop ? "text-white" : "text-gray-950"}`}
                          style={{ fontSize: "clamp(44px,6vw,58px)" }}>
                      {plan.price}
                    </span>
                    <span className={`text-[13px] font-semibold mb-2 ${pop ? "text-white/60" : "text-gray-400"}`}>/project</span>
                  </div>

                  {/* Delivery chip */}
                  <div className={`delivery-chip mb-4 ${pop
                    ? "bg-white/14 text-white border border-white/20"
                    : "bg-[#e8f5fa] text-[#036083] border border-[rgba(3,96,131,.18)]"}`}
                       style={{ background: pop ? "rgba(255,255,255,.14)" : "" }}>
                    <Clock size={11} />
                    {plan.delivery} delivery
                  </div>

                  {/* Desc */}
                  <p className={`font-[450] leading-relaxed mb-1 text-[13.5px] ${pop ? "text-white/70" : "text-gray-500"}`}>
                    {plan.desc}
                  </p>

                  {/* Divider */}
                  <div className={`card-divider ${pop ? "divider-dark" : "divider-light"}`} />

                  {/* Features */}
                  <div className="flex flex-col mb-6">
                    {plan.features.map(f => (
                      <div key={f.text} className={`feat-row ${pop ? "feat-row-dark" : "feat-row-light"} ${!f.included ? "feat-excluded" : ""}`}>
                        <span className="shrink-0 flex items-center justify-center w-5 h-5 rounded-full"
                              style={{ background: f.included
                                ? (pop ? "rgba(255,255,255,.18)" : "#e8f5fa")
                                : "transparent",
                                border: f.included ? "none" : `1px solid ${pop ? "rgba(255,255,255,.2)" : "rgba(3,96,131,.15)"}` }}>
                          {f.included
                            ? <Check size={11} color={pop ? "#fff" : "#036083"} strokeWidth={3} />
                            : <span className={`text-[10px] font-bold ${pop ? "text-white/40" : "text-gray-300"}`}>–</span>
                          }
                        </span>
                        {f.text}
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <a href="#contact" className={`shimmer ${pop ? "cta-dark" : "cta-light"}`}>
                    {plan.cta}
                    <ArrowRight size={15} strokeWidth={2.6} />
                  </a>
                </div>
              );
            })}
          </div>

          {/* ── GUARANTEE BAR ───────────────────── */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-8 py-5 px-6 rounded-2xl"
               style={{ background: "#f7fbfd", border: "1px solid rgba(3,96,131,.1)" }}>
            {[
              { icon: Shield, text: "Money-back guarantee" },
              { icon: Zap,    text: "No hidden fees ever" },
              { icon: Star,   text: "4.9 / 5 client rating" },
            ].map(({ icon: I, text }) => (
              <div key={text} className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                     style={{ background: "#e8f5fa" }}>
                  <I size={15} color="#036083" strokeWidth={2} />
                </div>
                <span className="font-bold text-[13.5px] text-gray-700">{text}</span>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}