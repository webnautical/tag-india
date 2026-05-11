// src/components/ProfessionalServices.jsx
import { useEffect, useRef, useState } from "react";
import { ChevronRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IMG_BASE_URL, IMG_BASE_URL_PUBLIC } from "../../helper/utils";

gsap.registerPlugin(ScrollTrigger);

export default function ProfessionalServices({ data = [], title }) {
  const [activeTab, setActiveTab] = useState(null);
  const [animating, setAnimating] = useState(false);

  const sectionRef   = useRef(null);
  const headingRef   = useRef(null);
  const tabsRef      = useRef(null);
  const indicatorRef = useRef(null);
  const imageRef     = useRef(null);
  const contentRef   = useRef(null);
  const tabElsRef    = useRef([]);

  useEffect(() => {
    if (data.length && !activeTab) {
      setActiveTab(data[0]?.type);
    }
  }, [data]);

  const activeService = data.find((s) => s.type === activeTab);

  const switchTab = (type) => {
    if (type === activeTab || animating) return;
    setAnimating(true);

    const tl = gsap.timeline({
      onComplete: () => {
        setActiveTab(type);
        setAnimating(false);
        gsap.fromTo(
          imageRef.current,
          { opacity: 0, x: -30, scale: 0.97 },
          { opacity: 1, x: 0, scale: 1, duration: 0.55, ease: "power3.out" }
        );
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, x: 30 },
          { opacity: 1, x: 0, duration: 0.45, ease: "power2.out" }
        );
      },
    });

    tl.to(imageRef.current, {
      opacity: 0, x: -20, scale: 0.97, duration: 0.3, ease: "power2.in",
    });
    tl.to(
      contentRef.current,
      { opacity: 0, x: 20, duration: 0.2, ease: "power2.in" },
      "<"
    );
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 82%",
          toggleActions: "play none none none",
        },
        opacity: 0, y: 40, duration: 0.8, ease: "power3.out",
      });

      gsap.from(tabElsRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: "top 82%" },
        opacity: 0, y: 20, stagger: 0.1, duration: 0.55, delay: 0.3, ease: "power2.out",
      });

      gsap.from(imageRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        opacity: 0, x: -50, duration: 0.9, delay: 0.5, ease: "power3.out",
      });

      gsap.from(contentRef.current?.querySelectorAll("[data-point]"), {
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        opacity: 0, x: 40, stagger: 0.08, duration: 0.6, delay: 0.6, ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [data]);

  useEffect(() => {
    const idx = data.findIndex((s) => s.type === activeTab);
    const tabEl = tabElsRef.current[idx];
    if (!tabEl || !tabsRef.current) return;

    const tabRect = tabEl.getBoundingClientRect();
    gsap.to(indicatorRef.current, {
      left: tabEl.offsetLeft,
      width: tabRect.width,
      duration: 0.4,
      ease: "power3.inOut",
    });

    const scrollLeft =
      tabEl.offsetLeft - tabsRef.current.offsetWidth / 2 + tabRect.width / 2;
    tabsRef.current.scrollTo({ left: scrollLeft, behavior: "smooth" });
  }, [activeTab, data]);

  const scrollTabsRight = () => {
    tabsRef.current?.scrollBy({ left: 160, behavior: "smooth" });
  };

  if (!data.length || !activeService) return null;

  return (
    <section
      ref={sectionRef}
      className="bg-white py-14 lg:py-14 professional_services"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <h2
          ref={headingRef}
          className="text-center text-3xl sm:text-4xl lg:text-[2rem] font-bold text-black mb-10"
        >
          {title || "Our Professional Services"}
        </h2>

        {/* Tabs */}
        <div className="flex items-center mb-12 gap-2 w-full lg:w-[70%] mx-auto">
          <div
            ref={tabsRef}
            className="tabs-scroll relative flex items-center overflow-x-auto flex-1 sm:gap-8 gap-3"
          >
            {data.map((service, i) => (
              <button
                key={service.id}
                ref={(el) => (tabElsRef.current[i] = el)}
                onClick={() => switchTab(service.type)}
                className={`tab-btn px-4 sm:px-3 py-1 text-sm sm:text-[15px] whitespace-nowrap capitalize ${
                  activeTab === service.type ? "active" : ""
                }`}
              >
                {service.type}
              </button>
            ))}

            <div
              ref={indicatorRef}
              className="absolute bottom-0 h-[2px] bg-[#6A1B9A] transition-all"
            />

            <div className="next-btns">
              <button
                onClick={scrollTabsRight}
                className="w-5 h-5 rounded-full bg-[#6A1B9A] flex items-center justify-center text-white flex-shrink-0"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">

          {/* Image */}
          <div ref={imageRef} className="w-full lg:w-[48%]">
            <img
              src={`${IMG_BASE_URL_PUBLIC()}professional-services/${activeService.image}`}
              alt={activeService.type}
              className="w-full h-64 sm:h-80 lg:h-[420px] object-cover"
            />
          </div>

          {/* Description + Button */}
          <div ref={contentRef} className="w-full lg:w-[52%] space-y-6">
            <div
              className="prose-ul-custom text-[#636363] leading-relaxed"
              dangerouslySetInnerHTML={{ __html: activeService.description }}
            />
            {activeService.button_text && (
              <a
                href={activeService.button_url}
                className="explore-btn inline-flex items-center gap-1"
              >
                {activeService.button_text}
                <ChevronRight size={16} className="exp-chevron" />
              </a>
            )}
          </div>
        </div>

      </div>

      <style>{`
        .prose-ul-custom p { margin-bottom: 8px; font-size: 14px; font-weight: 600; }
        .prose-ul-custom h1, .prose-ul-custom h2, .prose-ul-custom h3 { font-weight: 700; color: #1a1a1a; margin-bottom: 8px; }
        .prose-ul-custom h3 { font-size: 1.1rem; }
        .prose-ul-custom ul, .prose-ul-custom ol { padding-left: 0; margin: 0; display: flex; flex-direction: column; gap: 8px; list-style: none; }
        .prose-ul-custom ul li { padding-left: 22px; position: relative; color: #636363; font-size: 14px; font-weight: 600; }
        .prose-ul-custom ul li::before { content: '✓'; position: absolute; left: 0; color: #00BA00; font-weight: 700; }
        .prose-ul-custom ol li { padding-left: 22px; position: relative; color: #636363; font-size: 14px; font-weight: 600; list-style: decimal; margin-left: 16px; }
        .prose-ul-custom strong { color: #1a1a1a; }
      `}</style>
    </section>
  );
}