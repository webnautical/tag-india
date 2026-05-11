// src/front/Home/HeroSection.jsx
import { useEffect, useRef } from "react";
import { ChevronRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IMG_BASE_URL_PUBLIC } from "../../helper/utils";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection({ data }) {
  const sectionRef  = useRef(null);
  const headingRef  = useRef(null);
  const lineRef     = useRef(null);
  const subtextRef  = useRef(null);
  const buttonsRef  = useRef(null);
  const imageRef    = useRef(null);

  const banner = data ?? null;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(headingRef.current, {
        opacity: 0, y: 60, duration: 0.9, ease: "power4.out",
      })
        .from(lineRef.current, {
          scaleX: 0, transformOrigin: "left center", duration: 0.6, ease: "power2.out",
        }, "-=0.5")
        .from(subtextRef.current, {
          opacity: 0, y: 20, duration: 0.6,
        }, "-=0.4")
        .from(buttonsRef?.current?.children, {
          opacity: 0, y: 0, stagger: 0.15, duration: 0.5,
        }, "-=0.3")
        .from(imageRef.current, {
          opacity: 0, x: 80, duration: 1, ease: "power3.out",
        }, "-=1.2");

      gsap.to(imageRef.current, {
        y: -16, duration: 2.5, ease: "sine.inOut",
        yoyo: true, repeat: -1, delay: 1,
      });

      gsap.to(sectionRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        opacity: 0.4, y: -40, ease: "none",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  if (!banner) return null;

  return (
    <section ref={sectionRef} className="bg-white overflow-hidden hero_sections">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 py-12 lg:py-0 min-h-[400px]">

          {/* Left Content */}
          <div className="w-full lg:w-[60%] space-y-4 text-center lg:text-left">

            <h1
              ref={headingRef}
              className="text-4xl sm:text-4xl lg:text-[2rem] font-bold text-black sm:leading-[2.5rem] leading-[2.5rem] tracking-[2%]"
            >
              {banner.title}
            </h1>

            <div
              ref={lineRef}
              className="h-[1px] w-36 bg-[#6A1B9A] rounded-full mx-auto lg:mx-0"
            />

            {banner.description && (
              <div
                ref={subtextRef}
                className="text-[#585858] text-base font-semibold sm:text-m leading-relaxed mx-auto lg:mx-0"
                dangerouslySetInnerHTML={{ __html: banner.description }}
              />
            )}

            <div
              ref={buttonsRef}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-5"
            >
              {banner.button_text && (
                <a href={banner.button_link} className="btn-primary">
                  {banner.button_text}
                  <ChevronRight size={16} className="chevron-r" />
                </a>
              )}
              <Link
                to="/services"
                className="btn-secondary inline-flex items-center gap-1.5 text-black font-semibold text-sm"
              >
                Explore Services
                <ChevronRight size={16} className="chevron-r" />
              </Link>
            </div>
          </div>

          {/* Right: Hero Image */}
          <div className="w-full lg:w-[40%] flex justify-center lg:justify-end">
            <img
              ref={imageRef}
              src={`${IMG_BASE_URL_PUBLIC()}home-page-banner/${banner.image}`}
              alt={banner.title || "Hero"}
              className="w-full max-w-sm sm:max-w-md lg:max-w-xl xl:max-w-2xl object-contain select-none"
              draggable="false"
            />
          </div>

        </div>
      </div>
    </section>
  );
}