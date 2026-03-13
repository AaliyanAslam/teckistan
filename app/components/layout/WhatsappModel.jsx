"use client";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { X, MessageCircle, ArrowRight, ShieldCheck, Zap, Globe, Star } from "lucide-react";

const WA_LINK = "https://wa.me/923477071276?text=Hello%20Teckistan!%20I%20am%20interested%20in%20your%20web%20design%20services.";

export default function WhatsAppModal() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const overlayRef = useRef(null);
  const cardRef    = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!dismissed) setVisible(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, [dismissed]);

  useEffect(() => {
    if (!visible) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.4 });
      gsap.fromTo(cardRef.current, 
        { y: 50, opacity: 0, scale: 0.95 }, 
        { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "power4.out" }
      );
    });
    return () => ctx.revert();
  }, [visible]);

  const handleClose = () => {
    gsap.to(cardRef.current, { y: 20, opacity: 0, scale: 0.98, duration: 0.3 });
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, onComplete: () => { setVisible(false); setDismissed(true); } });
  };

  if (!visible) return null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Urbanist:wght@400;500;600;700;800&display=swap');
        
        .tk-modal * { font-family: 'Urbanist', sans-serif; box-sizing: border-box; }

        .tk-overlay {
          position: fixed; inset: 0; z-index: 9999;
          background: rgba(15, 23, 42, 0.4);
          backdrop-filter: blur(12px);
          display: flex; align-items: center; justify-content: center;
          padding: 20px;
        }

        .tk-card {
          background: #ffffff;
          width: 100%; max-width: 420px;
          border-radius: 24px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          overflow: hidden;
          position: relative;
          border: 1px solid rgba(255, 255, 255, 0.5);
        }

        /* Branding Accent Bar */
        .tk-accent-bar {
          height: 6px;
          background: linear-gradient(90deg, #036083, #047fab);
          width: 100%;
        }

        .tk-header {
          padding: 32px 32px 16px;
          display: flex; justify-content: space-between; align-items: flex-start;
        }

        .tk-brand-logo {
          color: #036083; font-weight: 800; font-size: 14px;
          letter-spacing: 1px; text-transform: uppercase;
          display: flex; align-items: center; gap: 8px;
        }

        .tk-close {
          background: #f1f5f9; border: none; width: 32px; height: 32px;
          border-radius: 50%; cursor: pointer; display: flex;
          align-items: center; justify-content: center; color: #64748b;
          transition: 0.2s;
        }
        .tk-close:hover { background: #e2e8f0; color: #0f172a; }

        .tk-body { padding: 0 32px 32px; }

        .tk-title {
          font-size: 28px; font-weight: 800; color: #0f172a;
          line-height: 1.2; margin: 12px 0; letter-spacing: -0.02em;
        }

        .tk-description {
          font-size: 15px; color: #475569; line-height: 1.6; margin-bottom: 24px;
        }

        .tk-stats-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 24px;
        }

        .tk-stat-box {
          background: #f8fafc; border: 1px solid #f1f5f9;
          padding: 12px; border-radius: 12px;
          display: flex; align-items: center; gap: 10px;
        }

        .tk-stat-label { font-size: 12px; font-weight: 700; color: #036083; display: block; }
        .tk-stat-value { font-size: 11px; color: #64748b; }

        .tk-cta-main {
          display: flex; align-items: center; justify-content: center; gap: 10px;
          width: 100%; background: #25d366; color: white;
          padding: 18px; border-radius: 16px; font-weight: 700; font-size: 16px;
          text-decoration: none; transition: 0.3s;
          box-shadow: 0 10px 20px -5px rgba(37, 211, 102, 0.4);
          position: relative; overflow: hidden;
        }
        
        .tk-cta-main:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 30px -5px rgba(37, 211, 102, 0.5);
          background: #20bc5a;
        }

        .tk-shimmer {
          position: absolute; inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transform: translateX(-100%);
          animation: shimmer 3s infinite;
        }

        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }

        .tk-footer-text {
          text-align: center; margin-top: 16px; font-size: 13px;
          color: #94a3b8; font-weight: 500;
        }
      `}</style>

      <div className="tk-modal" ref={overlayRef} >
        <div className="tk-overlay" onClick={e => e.target === e.currentTarget && handleClose()}>
          
          <div ref={cardRef} className="tk-card">
            <div className="tk-accent-bar" />
            
            <div className="tk-header">
              <div className="tk-brand-logo">
                <ShieldCheck size={18} />
                Teckistan Solutions
              </div>
              <button className="tk-close" onClick={handleClose}><X size={18} /></button>
            </div>

            <div className="tk-body">
              <h2 className="tk-title">Ready to launch your business? 🚀</h2>
              <p className="tk-description">
                Join 120+ businesses growing with us. Get a <strong>free consultation</strong> and a custom quote for your project.
              </p>

              <div className="tk-stats-grid">
                <div className="tk-stat-box">
                  <Zap size={20} color="#036083" />
                  <div>
                    <span className="tk-stat-label">99/100</span>
                    <span className="tk-stat-value">Page Speed</span>
                  </div>
                </div>
                <div className="tk-stat-box">
                  <Globe size={20} color="#036083" />
                  <div>
                    <span className="tk-stat-label">500+</span>
                    <span className="tk-stat-value">Sites Delivered</span>
                  </div>
                </div>
              </div>

              <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="tk-cta-main" onClick={handleClose}>
                <MessageCircle size={22} fill="white" />
                Start Chat on WhatsApp
                <ArrowRight size={18} />
                <div className="tk-shimmer" />
              </a>

              <p className="tk-footer-text">
                <Star size={12} fill="#f59e0b" color="#f59e0b" style={{marginRight: 4}} />
                4.9/5 Average Rating (128 reviews)
              </p>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}