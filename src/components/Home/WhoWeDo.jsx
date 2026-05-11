// src/components/WhoWeDo.jsx
import { useEffect, useRef } from "react";
import { ChevronRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IMG_BASE_URL, IMG_BASE_URL_PUBLIC } from "../../helper/utils";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

export default function WhoWeDo({ data }) {
  const sectionRef = useRef(null);
  const imgRef     = useRef(null);
  const badgeRef   = useRef(null);
  const contentRef = useRef(null);

  const who = data ?? null;

  useEffect(() => {
    if (!who) return;

    const ctx = gsap.context(() => {
      gsap.from(imgRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        opacity: 0, x: -60, duration: 0.9, ease: "power3.out",
      });

      gsap.from(badgeRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        opacity: 0, y: -30, scale: 0.8,
        duration: 0.6, delay: 0.4, ease: "back.out(1.7)",
      });

      // Counter animate 0 → count value
      const counterEl = badgeRef.current?.querySelector(".counter-num");
      if (counterEl) {
        const target = { val: 0 };
        gsap.to(target, {
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
          val: who.count,
          duration: 1.8,
          delay: 0.5,
          ease: "power2.out",
          onUpdate: function () {
            counterEl.textContent = Math.round(target.val).toLocaleString();
          },
        });
      }

      const children = contentRef.current?.querySelectorAll("[data-anim]");
      gsap.from(children, {
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        opacity: 0, x: 50, stagger: 0.15, duration: 0.7, ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [who]);

  if (!who) return null;

  return (
    <section
      ref={sectionRef}
      className="bg-[#E1D1EB8F] py-16 lg:py-20 mt-10 lg:mt-10"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-14 lg:gap-20">

          {/* Left: Image + Badge */}
          <div className="w-full lg:w-[45%] flex justify-center relative flex-shrink-0">
            <div ref={imgRef} className="who-img-wrap">
              <img
                src={`${IMG_BASE_URL_PUBLIC()}who-we-do/${who.image}`}
                alt={who.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Count Badge */}
            <div
              ref={badgeRef}
              className="badge-card absolute top-[-15px] right-4 sm:right-8 lg:-right-4 bg-white rounded-md px-5 py-5 z-10"
            >
              <p className="text-[#6A1B9A] text-2xl font-bold sm:leading-[1.2rem] mb-0">
                <span className="counter-num">0</span>
              </p>
              <p className="text-black text-sm font-semibold mt-1 leading-tight">
                {who.count_title}
              </p>
            </div>
          </div>

          {/* Right: Content */}
          <div ref={contentRef} className="w-full lg:w-[55%] space-y-5 text-center lg:text-left">
            <h2
              data-anim
              className="text-3xl sm:text-4xl lg:text-[2rem] font-bold text-black"
            >
              {who.title}
            </h2>

            {who.content && (
              <div
                data-anim
                className="text-[#585858] leading-relaxed"
                dangerouslySetInnerHTML={{ __html: who.content }}
              />
            )}

            {who.button_text && (
              <div data-anim>
                <Link to={who.button_link} className="btn-primary">
                  {who.button_text}
                  <ChevronRight size={16} className="btn-chevron" />
                </Link>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}