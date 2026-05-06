// src/components/Home/Testimonials.jsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import userimg from '../../assets/img/user-img.png';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

gsap.registerPlugin(ScrollTrigger);

const TESTIMONIALS = [
  {
    name: 'Rajesh Sharma',
    role: 'Director, SkillRise Training Institute',
    rating: 5,
    review: 'The exam process was smooth and secure. I could view my results and download my certificate easily. The Hindi language support made it very comfortable.',
    bg: '#e0e7ff', color: '#4338ca', initials: 'RS',
  },
  {
    name: 'Pooja Verma',
    role: 'Center Head, Future Skills Academy',
    rating: 5,
    review: '"TAP has completely streamlined our batch management and assessment process. The real-time dashboard and automated result publishing have reduced our operational workload significantly. The offline exam capability is especially helpful for rural centers."',
    bg: '#fce7f3', color: '#be185d', initials: 'PV',
  },
  {
    name: 'Amit Kulkarni',
    role: 'Certified Assessor',
    rating: 5,
    review: '"The AI-powered proctoring and secure exam monitoring features give us confidence in maintaining exam integrity. The system is smooth, reliable, and very well structured for large-scale assessments."',
    bg: '#d1fae5', color: '#065f46', initials: 'AK',
  },
  {
    name: 'K. Neha Singh',
    role: 'National Skill Initiative',
    rating: 5,
    review: '"The Assessor App is intuitive and efficient. Managing multiple batches, marking practical assessments, and submitting results is now seamless. It saves time and improves accuracy."',
    bg: '#fef3c7', color: '#92400e', initials: 'KN',
  },
  {
    name: 'Ravi Kumar',
    role: 'Trainee',
    rating: 5,
    review: '"The webhook integration and automated reporting features make TAP enterprise-ready. It ensures transparency and compliance with national standards."',
    bg: '#ede9fe', color: '#6d28d9', initials: 'RK',
  },
  {
    name: 'Sunita Devi',
    role: 'Training Partner, Bihar',
    rating: 5,
    review: '"Excellent platform for skill assessment. The support team is responsive and the interface is easy to use even in low connectivity areas. Highly recommended."',
    bg: '#ffedd5', color: '#c2410c', initials: 'SD',
  },
];

export default function Testimonials() {
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
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power3.out',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-white pt-16 pb-5 lg:pt-24 lg:pb-0 overflow-hidden"
    >

      {/* ✅ Heading — max width centered */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <h2
          ref={headingRef}
          className="text-3xl sm:text-4xl lg:text-[2rem] font-bold text-center text-black leading-tight mb-0"
        >
          Insights from Those
          <br />
          We've Impacted
        </h2>
      </div>

      {/* ✅ Swiper — full width, no max-w constraint */}
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
          480: { slidesPerView: 1.5 },
          640: { slidesPerView: 2.2 },
          900: { slidesPerView: 3.2 },
          1280: { slidesPerView: 4.3 },
          1536: { slidesPerView: 4.8 },
        }}
      >
        {TESTIMONIALS.map((t) => (
          <SwiperSlide key={t.name}>
            <div className="flex flex-col gap-4">

              {/* ── TOP: Avatar + Name ── */}
              <div className="testi-top-card bg-white border border-gray-200 rounded-2xl px-4 py-3 flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-sm"
                  style={{ backgroundColor: t.bg, color: t.color }}
                >
                  <img src={userimg} alt="" />
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-[#595959] text-sm leading-tight truncate">
                    {t.name}
                  </p>
                  <p className="text-[#595959] text-xs mt-0.5 leading-snug">
                    {t.role}
                  </p>
                </div>
              </div>

              {/* ── BOTTOM: Rating + Review ── */}
              <div className="testi-bottom-card bg-white border border-gray-200 rounded-2xl px-4 py-5 flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-[#595959] font-bold text-3xl leading-none">
                    {t.rating}
                  </span>
                  <div className="flex gap-0.5">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <span key={j} className="text-amber-400 text-lg leading-none">★</span>
                    ))}
                  </div>
                </div>
                <p className="text-[#595959] text-sm leading-relaxed">
                  {t.review}
                </p>
              </div>

            </div>
          </SwiperSlide>
        ))}
      </Swiper>

    </section>
  );
}