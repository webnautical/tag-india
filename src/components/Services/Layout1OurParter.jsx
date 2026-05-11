import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import 'swiper/css';
import { IMG_BASE_URL_PUBLIC } from '../../helper/utils';

gsap.registerPlugin(ScrollTrigger);

export default function Layout1OurParter({ data = [], title }) {
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
        opacity: 0, y: 35, duration: 0.8, ease: 'power3.out',
      });

      gsap.from(wrapRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
          toggleActions: 'play none none none',
        },
        opacity: 0, y: 30, duration: 0.7, delay: 0.2, ease: 'power2.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [data]);

  if (!data || data.length === 0) return null;

  // Double the array for seamless infinite scroll
  const looped = [...data, ...data];

  return (
    <section ref={sectionRef} className="bg-white py-14 lg:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <h2
          ref={headingRef}
          className="text-center text-3xl sm:text-4xl lg:text-[2rem] font-bold text-black mb-12"
        >
          {title || 'Our Esteemed Clients'}
        </h2>

        {/* Swiper */}
        <div ref={wrapRef}>
          <Swiper
            className="clients-swiper"
            modules={[Autoplay]}
            autoplay={{ delay: 0, disableOnInteraction: false, pauseOnMouseEnter: true }}
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
            {looped.map((client, i) => (
              <SwiperSlide key={`${client.id}-${i}`}>
                <a
                  href={client.link ?? '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="client-card border border-gray-200 rounded-2xl px-5 py-5 flex items-center justify-center bg-white h-[90px] block"
                >
                  <img
                    src={`${IMG_BASE_URL_PUBLIC()}/${client.image}`}
                    alt={`Client ${client.id}`}
                    className="max-h-[60px] max-w-full w-auto object-contain"
                  />
                </a>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

      </div>
    </section>
  );
}