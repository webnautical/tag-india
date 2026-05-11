// src/components/WhatWeResolve.jsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import arrowmobiles from '../../assets/img/arrowmobiles.png';
import arrow from '../../assets/img/arrow.png';
import { IMG_BASE_URL_PUBLIC } from '../../helper/utils';

gsap.registerPlugin(ScrollTrigger);

export default function WhatWeResolve({ data = [], title }) {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const rowsRef    = useRef([]);
  const iconsRef   = useRef([]);
  const arrowsRef  = useRef([]);

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

      rowsRef.current.forEach((row, i) => {
        if (!row) return;
        gsap.from(row, {
          scrollTrigger: { trigger: row, start: 'top 88%', toggleActions: 'play none none none' },
          opacity: 0, x: -50, duration: 0.7, delay: i * 0.1, ease: 'power3.out',
        });
      });

      iconsRef.current.forEach((icon, i) => {
        if (!icon) return;
        gsap.from(icon, {
          scrollTrigger: { trigger: icon, start: 'top 90%' },
          scale: 0, rotation: -30, opacity: 0,
          duration: 0.65, delay: i * 0.12, ease: 'back.out(2)',
        });
        gsap.to(icon, {
          y: -8, duration: 2 + i * 0.25, ease: 'sine.inOut',
          yoyo: true, repeat: -1, delay: i * 0.3,
        });
      });

      arrowsRef.current.forEach((arrow, i) => {
        if (!arrow) return;
        gsap.from(arrow, {
          scrollTrigger: { trigger: arrow, start: 'top 90%' },
          scaleX: 0, opacity: 0, transformOrigin: 'left center',
          duration: 0.5, delay: i * 0.12 + 0.3, ease: 'power2.out',
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, [data]);

  if (!data || data.length === 0) return null;

  return (
    <section ref={sectionRef} className="py-12 lg:py-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#EEE5F4] px-5 lg:px-32 lg:py-16 py-10 rounded-2xl">

          {/* Heading */}
          <h2
            ref={headingRef}
            className="text-center text-3xl sm:text-4xl lg:text-[2rem] font-bold text-black mb-10 lg:mb-14"
          >
            {title || 'What We Resolve'}
          </h2>

          {/* Rows */}
          <div className="flex flex-col gap-12 lg:gap-4">
            {data.map((item, i) => {
              const isEven = i % 2 !== 0;
              const num    = String(i + 1).padStart(2, '0');

              return (
                <div
                  key={item.id}
                  ref={(el) => (rowsRef.current[i] = el)}
                  className={`
                    resolve-row flex flex-col lg:flex-row
                    items-center lg:items-center
                    gap-3 lg:gap-4 md:items-start
                    ${isEven ? 'lg:me-5' : ''}
                  `}
                >
                  {/* Icon + Arrow */}
                  <div className="flex flex-col items-center justify-center w-full lg:w-auto gap-3 lg:flex-row lg:justify-start">
                    <div
                      ref={(el) => (iconsRef.current[i] = el)}
                      className="resolve-icon w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20"
                    >
                      <img
                        src={`${IMG_BASE_URL_PUBLIC()}/what-we-resolve-images/${item.image}`}
                        alt={item.title}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    <div ref={(el) => (arrowsRef.current[i] = el)} className="lg:flex hidden">
                      <img src={arrow} alt="" className="w-[60px]" />
                    </div>
                  </div>

                  {/* Mobile arrow */}
                  <div className="block lg:hidden sm:ml-6">
                    <img src={arrowmobiles} alt="" className="w-[15px]" />
                  </div>

                  {/* Card */}
                  <div className="
                    resolve-card w-full bg-white
                    rounded-xl lg:rounded-full
                    px-4 sm:px-5 py-4
                    shadow-sm border border-purple-50
                    flex items-start gap-3
                  ">
                    <span className="text-[#6A1B9A] font-bold text-xl sm:text-2xl lg:text-3xl flex-shrink-0">
                      {num}
                    </span>
                    <div>
                      <h3 className="font-bold text-black text-sm sm:text-base">
                        {item.title}
                      </h3>
                      <div
                        className="text-xs sm:text-sm mt-1 text-gray-600"
                        dangerouslySetInnerHTML={{ __html: item.content }}
                      />
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}