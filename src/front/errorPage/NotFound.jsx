// src/pages/NotFound.jsx
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export default function NotFound() {
  const sectionRef = useRef(null);
  const numRef     = useRef(null);
  const msgRef     = useRef(null);
  const btnRef     = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(numRef.current, {
        opacity: 0, y: 60, duration: 0.9, ease: "power4.out",
      })
        .from(msgRef.current, {
          opacity: 0, y: 30, duration: 0.7,
        }, "-=0.4")
        .from(btnRef.current, {
          opacity: 0, y: 20, duration: 0.6,
        }, "-=0.3");

      // Float loop on 404
      gsap.to(numRef.current, {
        y: -16,
        duration: 2.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 0.8,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen bg-white flex items-center justify-center px-4"
    >
      <div className="text-center space-y-6 max-w-lg mx-auto">

        {/* 404 Number */}
        <div ref={numRef} className="relative inline-block">
          <h1
            className="text-[10rem] sm:text-[14rem] font-bold leading-none select-none"
            style={{
              background: "linear-gradient(135deg, #6A1B9A 0%, #EEE5F4 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            404
          </h1>

          {/* Decorative circle */}
          <div
            className="absolute -z-10 rounded-full bg-[#EEE5F4]"
            style={{
              width: "260px",
              height: "260px",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        </div>

        {/* Message */}
        <div ref={msgRef} className="space-y-3">
          <h2 className="text-2xl sm:text-3xl font-bold text-black">
            Page Not Found
          </h2>
          <p className="text-[#636363] text-sm sm:text-base leading-relaxed">
            Oops! The page you're looking for doesn't exist or has been moved.
            Let's get you back on track.
          </p>
        </div>

        {/* Buttons */}
        <div ref={btnRef} className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link to="/" className="btn-primary inline-flex items-center gap-1.5">
            Back to Home
            <ChevronRight size={16} className="chevron-r" />
          </Link>
          <Link
            to="/contact"
            className="btn-secondary inline-flex items-center gap-1.5 text-black font-semibold text-sm"
          >
            Contact Us
            <ChevronRight size={16} className="chevron-r" />
          </Link>
        </div>

      </div>
    </section>
  );
}