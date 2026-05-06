// src/components/WhyChooseUs.jsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import icon5 from '../../assets/img/icon5.png';
import icon6 from '../../assets/img/icon6.png';
import icon7 from '../../assets/img/icon7.png';
import icon8 from '../../assets/img/icon8.png';

gsap.registerPlugin(ScrollTrigger);

// ✅ mt = top margin for staircase effect (left=low, right=high)
const CARDS = [
  {
    img: icon5,
    title: 'ESG-Focused Expertise',
    desc: 'We bring deep understanding of ESG frameworks, regulatory requirements, and sustainability practices to help organizations stay compliant and future-ready.',
    mt: 'sm:mt-0',       // card 1 — heading ke neeche naturally
  },
  {
    img: icon6,
    title: 'Strong Impact Assessment Capability',
    desc: 'Our data-driven and field-validated assessment approach ensures accurate measurement of social impact and program effectiveness.',
    mt: 'sm:mt-6',      // card 2 — pushed down (below heading level)
  },
  {
    img: icon7,
    title: 'CSR Strategy & Execution Excellence',
    desc: 'We design and implement CSR programs that are not only compliant but also create meaningful and measurable impact on communities.',
    mt: 'sm:mt-[-20px]',      // card 3 — middle height
  },
  {
    img: icon8,
    title: 'Data-Driven Insights & Reporting',
    desc: 'We prioritize data integrity and detailed analysis to provide actionable insights and comprehensive reports that support better decision-making and long-term strategic growth.',
    mt: 'sm:mt-[-60px]',       // card 4 — topmost (no margin)
  },
];

export default function WhyChooseUs() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef   = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Heading slide in
      gsap.from(headingRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        opacity: 0, x: -40, duration: 0.8, ease: 'power3.out',
      });

      // Cards stagger from bottom
      gsap.from(cardsRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
        opacity: 0, y: 70,
        stagger: 0.15, duration: 0.8, ease: 'power3.out',
      });

      // Float loop — each card different speed
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.to(card, {
          y: `+=${8 + i * 2}`,
          duration: 2 + i * 0.4,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          delay: i * 0.35,
        });
      });

      // Icon pop in
      cardsRef.current.forEach((card, i) => {
        const iconBox = card?.querySelector('.icon-box');
        if (!iconBox) return;
        gsap.from(iconBox, {
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
          scale: 0, rotation: -20, opacity: 0,
          duration: 0.6, delay: 0.4 + i * 0.15, ease: 'back.out(2.5)',
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
        className="bg-[#EEE5F4] overflow-hidden py-14 lg:pt-16 lg:pb-32 pb-36"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ── Outer flex row ── */}
          <div className="flex flex-col sm:flex-row items-start gap-5 lg:gap-6">

            {/* ── Col 1: Heading + Card 1 ── */}
            <div className="card-col w-full sm:w-[23%] flex-shrink-0 flex flex-col">

              {/* Heading */}
              <div ref={headingRef}>
                <h2 className="text-3xl sm:text-4xl lg:text-[2rem] font-bold text-black leading-tight mb-0">
                  Why You Should
                  <br />
                  Choose Us
                </h2>
              </div>
              {/* Card 1 */}
              <div
                ref={(el) => (cardsRef.current[0] = el)}
                className="choose-card bg-white rounded-2xl px-6 py-10 shadow-[0_4px_24px_rgba(0,0,0,0.07)]"
              >
                <div className="icon-box w-[40px] h-[40px] rounded-xl flex items-center justify-center mb-5">
                  <img src={CARDS[0].img} alt={CARDS[0].title} className="w-full h-full object-contain" />
                </div>
                <h3 className="font-bold text-black text-[15px] sm:text-base leading-snug mb-3">
                  {CARDS[0].title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {CARDS[0].desc}
                </p>
              </div>
            </div>

            {/* ── Cards 2, 3, 4 — with staggered mt ── */}
            {CARDS.slice(1).map((card, idx) => {
              const i = idx + 1; // real index for cardsRef
              return (
                <div
                  key={card.title}
                  className={`card-col w-full sm:flex-1 flex-shrink-0 ${card.mt}`}  // ✅ staggered top margin
                >
                  <div
                    ref={(el) => (cardsRef.current[i] = el)}
                    className="choose-card bg-white rounded-2xl px-6 py-10 shadow-[0_4px_24px_rgba(0,0,0,0.07)] h-full"
                  >
                    <div className="icon-box w-[40px] h-[40px] rounded-xl flex items-center justify-center mb-5">
                      <img src={card.img} alt={card.title} className="w-full h-full object-contain" />
                    </div>
                    <h3 className="font-bold text-black text-[15px] sm:text-base leading-snug mb-3">
                      {card.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                </div>
              );
            })}

          </div>
        </div>
      </section>
    </>
  );
}