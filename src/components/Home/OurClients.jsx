// src/components/Home/OurClients.jsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import 'swiper/css';

// ✅ Client logo imports
import logo1 from '../../assets/img/logo1.png';  // Power Sector Skill Council
import logo2 from '../../assets/img/logo2.png';  // Furniture & Fittings
import logo3 from '../../assets/img/logo3.png';  // Handicraft and Carpet
import logo4 from '../../assets/img/logo4.png';  // SCPwD
import logo5 from '../../assets/img/logo5.png';  // GJSCi
import logo6 from '../../assets/img/logo6.png'; // TSC

gsap.registerPlugin(ScrollTrigger);

const CLIENTS = [
  { img: logo1, name: 'Power Sector Skill Council' },
  { img: logo2, name: 'Furniture & Fittings Skill Council' },
  { img: logo3, name: 'Handicraft and Carpet Sector Skill Council' },
  { img: logo4, name: 'SCPwD' },
  { img: logo5, name: 'GJSCi' },
  { img: logo6, name: 'TSC' },
];

export default function OurClients() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const wrapRef    = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      gsap.from(headingRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 82%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        y: 35,
        duration: 0.8,
        ease: 'power3.out',
      });

      gsap.from(wrapRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        y: 30,
        duration: 0.7,
        delay: 0.2,
        ease: 'power2.out',
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
      <section
        ref={sectionRef}
        className="bg-white py-14 lg:py-12"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ── Heading ── */}
          <h2
            ref={headingRef}
            className="text-center text-3xl sm:text-4xl lg:text-[2rem] font-bold text-black mb-12"
          >
            Our Esteemed Clients
          </h2>


        {/* ── Swiper — full width ── */}
        <div ref={wrapRef}>
          <Swiper
            className="clients-swiper"
            modules={[Autoplay]}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            speed={3000}
            loop={true}
            freeMode={true}
            spaceBetween={24}
            slidesPerView={2}
            breakpoints={{
              480:  { slidesPerView: 3 },
              768:  { slidesPerView: 4 },
              1024: { slidesPerView: 5 },
              1280: { slidesPerView: 6 },
            }}
            style={{ paddingLeft: '24px', paddingRight: '24px' }}
          >
            {/* ✅ Double loop — seamless infinite scroll */}
            {[...CLIENTS, ...CLIENTS].map((client, i) => (
              <SwiperSlide key={`${client.name}-${i}`}>
                <div className="client-card border border-gray-200 rounded-2xl px-5 py-5 flex items-center justify-center bg-white h-[90px]">
                  <img
                    src={client.img}
                    alt={client.name}
                    className="max-h-[60px] max-w-full w-auto object-contain"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        </div>

      </section>
  );
}