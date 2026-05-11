// src/components/Home/Testimonials.jsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { IMG_BASE_URL_PUBLIC } from '../../helper/utils';

gsap.registerPlugin(ScrollTrigger);

// Generate a consistent bg/color pair from name
const COLOR_PAIRS = [
  { bg: '#e0e7ff', color: '#4338ca' },
  { bg: '#fce7f3', color: '#be185d' },
  { bg: '#d1fae5', color: '#065f46' },
  { bg: '#fef3c7', color: '#92400e' },
  { bg: '#ede9fe', color: '#6d28d9' },
  { bg: '#ffedd5', color: '#c2410c' },
];

function getInitials(name = '') {
  return name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('');
}

function stripHtml(html = '') {
  return html.replace(/<[^>]*>/g, '').trim();
}

export default function Testimonials({ data = [], title }) {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 82%',
          toggleActions: 'play none none none',
        },
        opacity: 0, y: 40, duration: 0.8, ease: 'power3.out',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [data]);

  if (!data || data.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      className="bg-white pt-16 pb-5 lg:pt-24 lg:pb-0 overflow-hidden"
    >
      {/* Heading */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <h2
          ref={headingRef}
          className="text-3xl sm:text-4xl lg:text-[2rem] font-bold text-center text-black leading-tight mb-0"
        >
          {title || <>Insights from Those<br />We've Impacted</>}
        </h2>
      </div>

      {/* Swiper */}
      <Swiper
        className="testi-swiper"
        modules={[Navigation, Pagination, Autoplay]}
        navigation={false}
        pagination={false}
        autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }}
        loop={false}
        spaceBetween={20}
        slidesPerView={1.2}
        breakpoints={{
          480:  { slidesPerView: 1.5 },
          640:  { slidesPerView: 2.2 },
          900:  { slidesPerView: 3.2 },
          1280: { slidesPerView: 4.3 },
          1536: { slidesPerView: 4.8 },
        }}
      >
        {data.map((t, i) => {
          const pair     = COLOR_PAIRS[i % COLOR_PAIRS.length];
          const initials = getInitials(t.name);
          const review   = stripHtml(t.review);
          const rating   = Math.min(Math.max(Number(t.rating) || 5, 1), 5);
          const hasImage = !!t.image;

          return (
            <SwiperSlide key={t.id}>
              <div className="flex flex-col gap-4">

                {/* Avatar + Name */}
                <div className="testi-top-card bg-white border border-gray-200 rounded-2xl px-4 py-3 flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-sm overflow-hidden"
                    style={{ backgroundColor: pair.bg, color: pair.color }}
                  >
                    {hasImage ? (
                      <img
                        src={`${IMG_BASE_URL_PUBLIC()}/insights-image/${t.image}`}
                        alt={t.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span>{initials}</span>
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-[#595959] text-sm leading-tight truncate">
                      {t.name}
                    </p>
                    <p className="text-[#595959] text-xs mt-0.5 leading-snug">
                      {t.designation}
                    </p>
                  </div>
                </div>

                {/* Rating + Review */}
                <div className="testi-bottom-card bg-white border border-gray-200 rounded-2xl px-4 py-5 flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[#595959] font-bold text-3xl leading-none">
                      {rating}
                    </span>
                    <div className="flex gap-0.5">
                      {Array.from({ length: rating }).map((_, j) => (
                        <span key={j} className="text-amber-400 text-lg leading-none">★</span>
                      ))}
                    </div>
                  </div>
                  <p className="text-[#595959] text-sm leading-relaxed">
                    {review}
                  </p>
                </div>

              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
}