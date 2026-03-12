"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Check, Zap, Globe, Layers } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const plans = [
  {
    icon: Zap,
    name: "Starter",
    price: "12,000",
    desc: "Perfect for small businesses who need a simple online presence.",
    popular: false,
    features: [
      "1 Page Website",
      "Mobile Responsive Design",
      "WhatsApp Chat Button",
      "Contact Form",
      "Basic SEO Setup",
      "3 Days Delivery"
    ]
  },
  {
    icon: Globe,
    name: "Business",
    price: "20,000",
    desc: "Professional website for growing businesses.",
    popular: true,
    features: [
      "Up to 5 Pages Website",
      "Mobile Responsive Design",
      "WhatsApp Chat Integration",
      "Contact Form + Google Map",
      "Basic SEO Optimization",
      "Fast Performance",
      "7 Days Delivery"
    ]
  },
  {
    icon: Layers,
    name: "Premium",
    price: "30,000",
    desc: "Complete website solution for serious businesses.",
    popular: false,
    features: [
      "Up to 10 Pages Website",
      "Custom Modern Design",
      "Admin Panel / CMS",
      "Advanced SEO Setup",
      "WhatsApp + Contact Forms",
      "Animations & Premium UI",
      "14 Days Delivery"
    ]
  }
]

function PricingCard({ plan, index, allCardsRef }) {
  const cardRef   = useRef(null)
  const iconRef   = useRef(null)
  const priceRef  = useRef(null)
  const featsRef  = useRef([])
  const btnRef    = useRef(null)

  // register in parent array
  const setCard = (el) => {
    cardRef.current = el
    allCardsRef.current[index] = el
  }

  const onEnter = () => {
    gsap.to(cardRef.current, {
      y: -10,
      scale: plan.popular ? 1.03 : 1.025,
      duration: 0.28,
      ease: "power2.out",
      boxShadow: plan.popular
        ? "0 28px 70px rgba(21,93,252,.25), 0 4px 16px rgba(0,0,0,.08)"
        : "0 20px 56px rgba(0,0,0,.12), 0 2px 10px rgba(0,0,0,.06)"
    })
    gsap.to(iconRef.current, {
      scale: 1.15,
      rotate: -8,
      duration: 0.26,
      ease: "back.out(1.8)"
    })
    gsap.to(btnRef.current, {
      scale: 1.04,
      duration: 0.22,
      ease: "power2.out"
    })
  }

  const onLeave = () => {
    gsap.to(cardRef.current, {
      y: plan.popular ? -4 : 0,
      scale: 1,
      duration: 0.28,
      ease: "power2.inOut",
      boxShadow: plan.popular
        ? "0 8px 30px rgba(21,93,252,.15), 0 2px 8px rgba(0,0,0,.06)"
        : "0 1px 4px rgba(0,0,0,.06)"
    })
    gsap.to(iconRef.current, {
      scale: 1,
      rotate: 0,
      duration: 0.22,
      ease: "power2.inOut"
    })
    gsap.to(btnRef.current, {
      scale: 1,
      duration: 0.2,
      ease: "power2.inOut"
    })
  }

  return (
    <div
      ref={setCard}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        willChange: "transform, box-shadow",
        transform: plan.popular ? "translateY(-4px)" : "none",
        boxShadow: plan.popular
          ? "0 8px 30px rgba(21,93,252,.15), 0 2px 8px rgba(0,0,0,.06)"
          : "0 1px 4px rgba(0,0,0,.06)"
      }}
      className={`rounded-2xl border p-8 flex flex-col cursor-default transition-colors duration-200 ${
        plan.popular
          ? "border-[#137497]"
          : "border-gray-200 hover:border-gray-300"
      }`}
    >
      {plan.popular && (
        <div className="text-xs font-semibold text-[#137497] mb-4 tracking-widest uppercase">
          ✦ Most Popular
        </div>
      )}

      {/* Icon */}
      <div
        ref={iconRef}
        className={`w-12 h-12 flex items-center justify-center rounded-lg mb-6 ${
          plan.popular ? "bg-[#137497]" : "bg-blue-50"
        }`}
        style={{ willChange: "transform" }}
      >
        <plan.icon
          color={plan.popular ? "#fff" : "#2563eb"}
          size={22}
          strokeWidth={2}
        />
      </div>

      <h3 className="text-xl font-semibold text-gray-900">{plan.name}</h3>
      <p className="text-gray-500 text-sm mt-2 mb-6">{plan.desc}</p>

      {/* Price */}
      <div ref={priceRef} className="flex items-end gap-2 mb-8">
        <span className="text-gray-400 text-lg">PKR</span>
        <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
      </div>

      {/* Features */}
      <div className="space-y-3 mb-8">
        {plan.features.map((feature, i) => (
          <div
            key={i}
            ref={el => featsRef.current[i] = el}
            className="flex items-center gap-3 text-sm text-gray-600"
          >
            <div className={`shrink-0 flex items-center justify-center w-5 h-5 rounded-full ${
              plan.popular ? "bg-blue-50" : "bg-gray-100"
            }`}>
              <Check size={11} color="#2563eb" strokeWidth={3} />
            </div>
            {feature}
          </div>
        ))}
      </div>

      {/* CTA */}
      <a
        ref={btnRef}
        href="#contact"
        style={{ willChange: "transform" }}
        className={`mt-auto text-center py-3 rounded-xl font-semibold text-sm transition-colors duration-200 relative overflow-hidden ${
          plan.popular
            ? "bg-[#137497] text-white hover:bg-[#137497]"
            : "bg-gray-900 text-white hover:bg-black"
        }`}
      >
        Get Started
      </a>
    </div>
  )
}

export default function PricingSection() {
  const sectionRef = useRef(null)
  const headRef    = useRef(null)
  const subRef     = useRef(null)
  const cardsRef   = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── Header reveal ──────────────────────────
      gsap.fromTo(
        [headRef.current, subRef.current],
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1,
          stagger: 0.12,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%"
          }
        }
      )

      // ── Cards stagger up ───────────────────────
      gsap.fromTo(
        cardsRef.current,
        { y: 60, opacity: 0, scale: 0.96 },
        {
          y: 0, opacity: 1, scale: 1,
          stagger: 0.13,
          duration: 0.72,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current[0],
            start: "top 88%"
          },
          onComplete: () => {
            // re-apply popular card offset after animation
            if (cardsRef.current[1]) {
              gsap.set(cardsRef.current[1], { y: -4 })
            }
          }
        }
      )

      // ── Feature rows stagger inside each card ─
      cardsRef.current.forEach((card) => {
        if (!card) return
        const rows = card.querySelectorAll(".feat-row")
        gsap.fromTo(
          rows,
          { x: -14, opacity: 0 },
          {
            x: 0, opacity: 1,
            stagger: 0.055,
            duration: 0.4,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%"
            }
          }
        )
      })

      // ── Price counter pop ──────────────────────
      cardsRef.current.forEach((card) => {
        if (!card) return
        const priceEl = card.querySelector(".price-num")
        if (!priceEl) return
        gsap.fromTo(
          priceEl,
          { scale: 0.7, opacity: 0 },
          {
            scale: 1, opacity: 1,
            duration: 0.5,
            ease: "back.out(1.6)",
            scrollTrigger: {
              trigger: card,
              start: "top 85%"
            }
          }
        )
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="pricing" ref={sectionRef} className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <h2
            ref={headRef}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            Simple Pricing
          </h2>
          <p
            ref={subRef}
            className="text-gray-500 max-w-xl mx-auto"
          >
            Transparent pricing designed for businesses. No hidden charges.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8 items-start">
          {plans.map((plan, i) => (
            <div
              key={i}
              ref={el => cardsRef.current[i] = el}
              onMouseEnter={() => {
                gsap.to(cardsRef.current[i], {
                  y: -10,
                  scale: plan.popular ? 1.03 : 1.025,
                  duration: 0.28,
                  ease: "power2.out",
                  boxShadow: plan.popular
                    ? "0 28px 70px rgba(21,93,252,.25), 0 4px 16px rgba(0,0,0,.08)"
                    : "0 20px 56px rgba(0,0,0,.12), 0 2px 10px rgba(0,0,0,.06)"
                })
                const icon = cardsRef.current[i]?.querySelector(".card-icon")
                if (icon) gsap.to(icon, { scale: 1.15, rotate: -8, duration: 0.26, ease: "back.out(1.8)" })
                const btn = cardsRef.current[i]?.querySelector(".card-btn")
                if (btn) gsap.to(btn, { scale: 1.04, duration: 0.22, ease: "power2.out" })
              }}
              onMouseLeave={() => {
                gsap.to(cardsRef.current[i], {
                  y: plan.popular ? -4 : 0,
                  scale: 1,
                  duration: 0.28,
                  ease: "power2.inOut",
                  boxShadow: plan.popular
                    ? "0 8px 30px rgba(21,93,252,.15), 0 2px 8px rgba(0,0,0,.06)"
                    : "0 1px 4px rgba(0,0,0,.06)"
                })
                const icon = cardsRef.current[i]?.querySelector(".card-icon")
                if (icon) gsap.to(icon, { scale: 1, rotate: 0, duration: 0.22, ease: "power2.inOut" })
                const btn = cardsRef.current[i]?.querySelector(".card-btn")
                if (btn) gsap.to(btn, { scale: 1, duration: 0.2, ease: "power2.inOut" })
              }}
              style={{
                willChange: "transform, box-shadow",
                transform: plan.popular ? "translateY(-4px)" : "none",
                boxShadow: plan.popular
                  ? "0 8px 30px rgba(21,93,252,.15), 0 2px 8px rgba(0,0,0,.06)"
                  : "0 1px 4px rgba(0,0,0,.06)"
              }}
              className={`rounded-2xl border p-8 flex flex-col cursor-default transition-colors duration-200 ${
                plan.popular
                  ? "border-[#137497]"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              {plan.popular && (
                <div className="text-xs font-semibold text-[#137497] mb-4 tracking-widest uppercase">
                  ✦ Most Popular
                </div>
              )}

              {/* Icon */}
              <div
                className={`card-icon w-12 h-12 flex items-center justify-center rounded-lg mb-6 ${
                  plan.popular ? "bg-[#137497]" : "bg-blue-50"
                }`}
                style={{ willChange: "transform" }}
              >
                <plan.icon
                  color={plan.popular ? "#fff" : "#2563eb"}
                  size={22}
                  strokeWidth={2}
                />
              </div>

              <h3 className="text-xl font-semibold text-gray-900">{plan.name}</h3>
              <p className="text-gray-500 text-sm mt-2 mb-6">{plan.desc}</p>

              {/* Price */}
              <div className="flex items-end gap-2 mb-8">
                <span className="text-gray-400 text-lg">PKR</span>
                <span className="price-num text-4xl font-bold text-gray-900"
                      style={{ willChange: "transform, opacity" }}>
                  {plan.price}
                </span>
              </div>

              {/* Features */}
              <div className="space-y-3 mb-8">
                {plan.features.map((feature, j) => (
                  <div
                    key={j}
                    className="feat-row flex items-center gap-3 text-sm text-gray-600"
                    style={{ willChange: "transform, opacity" }}
                  >
                    <div className={`shrink-0 flex items-center justify-center w-5 h-5 rounded-full ${
                      plan.popular ? "bg-blue-50" : "bg-gray-100"
                    }`}>
                      <Check size={11} color="#2563eb" strokeWidth={3} />
                    </div>
                    {feature}
                  </div>
                ))}
              </div>

              {/* CTA */}
              <a
                href="#contact"
                className={`card-btn mt-auto text-center py-3 rounded-xl font-semibold text-sm transition-colors duration-200 ${
                  plan.popular
                    ? "bg-[#137497] text-white hover:bg-[#044f6b]"
                    : "bg-gray-900 text-white hover:bg-black"
                }`}
                style={{ willChange: "transform" }}
              >
                Get Started
              </a>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}