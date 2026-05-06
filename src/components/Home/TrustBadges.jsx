// src/components/TrustBadges.jsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import trophyIcon   from '../../assets/img/icon1.png';
import isoIcon      from '../../assets/img/icon2.png';
import indiaIcon    from '../../assets/img/icon3.png';
import techIcon     from '../../assets/img/icon4.png';

gsap.registerPlugin(ScrollTrigger);

const BADGES = [
  {
    icon: trophyIcon,
    title: 'NCVET Recognized Agency',
  },
  {
    icon: isoIcon,
    title: 'Quality Certified',
  },
  {
    icon: indiaIcon,
    title: 'Pan India Network',
  },
  {
    icon: techIcon,
    title: 'Technology Enabled',
  },
];

export default function TrustBadges() {
  const sectionRef = useRef(null);
  const itemsRef   = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Stagger each badge card
   gsap.from(itemsRef.current, {
  scrollTrigger: {
    trigger: sectionRef.current,
    start: 'top 85%',
  },
  opacity: 0,
  scale: 0.95,
  stagger: 0.15,
  duration: 0.6,
  ease: 'power3.out',
});

      // Icon boxes: subtle scale pop
      itemsRef.current.forEach((item, i) => {
        const iconBox = item?.querySelector('.icon-box');
        if (!iconBox) return;

        gsap.from(iconBox, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          scale: 0.6,
          opacity: 0,
          duration: 0.5,
          delay: i * 0.15 + 0.2,
          ease: 'back.out(1.7)',
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
       
      `}</style>

      <section
        ref={sectionRef}
        className="bg-white pt-5 py-5 bades_section"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-between gap-6 sm:gap-4">

            {BADGES.map((badge, i) => (
              <div key={badge.title} className="flex items-center gap-4 sm:gap-4 flex-1 w-[100%] ">

                {/* Badge Card */}
                <div
                  className="badge-card flex items-center gap-4 cursor-default flex-1 bg-[#fff] shadow-[0px_4px_38px_12px_#00000008]"
                  ref={(el) => (itemsRef.current[i] = el)}
                >
                  {/* Icon Box */}
                  <div className="icon-box w-[72px] h-[72px] sm:w-[80px] sm:h-[80px]  bg-[#EEE5F4] flex items-center justify-center flex-shrink-0">
                    <img
                      src={badge.icon}
                      alt={badge.title}
                      className="w-auto h-8"
                    />
                  </div>
                  {/* Text */}
                  <div>
                      <p className="text-black text-lg sm:text-base font-semibold leading-snug">
                        {badge.title}
                      </p>
                  </div>
                </div>

               

              </div>
            ))}

          </div>
        </div>
      </section>
    </>
  );
}