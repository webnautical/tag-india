// src/components/WhyChooseUs.jsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { IMG_BASE_URL_PUBLIC } from '../../helper/utils';

gsap.registerPlugin(ScrollTrigger);

const MT_CLASSES = ['sm:mt-0', 'sm:mt-6', 'sm:mt-[-20px]', 'sm:mt-[-60px]'];

export default function WhyChooseUs({ data = [], title }) {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        opacity: 0, x: -40, duration: 0.8, ease: 'power3.out',
      });

      gsap.from(cardsRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
        opacity: 0, y: 70,
        stagger: 0.15, duration: 0.8, ease: 'power3.out',
      });

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
  }, [data]);

  if (!data || data.length === 0) return null;

  const [firstCard, ...restCards] = data;

  return (
    <section
      ref={sectionRef}
      className="bg-[#EEE5F4] overflow-hidden py-14 lg:pt-16 lg:pb-32 pb-36"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col sm:flex-row items-start gap-5 lg:gap-6">

          {/* Col 1: Heading + Card 1 */}
          <div className="card-col w-full sm:w-[23%] flex-shrink-0 flex flex-col">
            <div ref={headingRef}>
              <h2 className="text-3xl sm:text-4xl lg:text-[2rem] font-bold text-black leading-tight mb-0">
                {title || <>Why You Should<br />Choose Us</>}
              </h2>
            </div>

            <div
              ref={(el) => (cardsRef.current[0] = el)}
              className="choose-card bg-white rounded-2xl px-6 py-10 shadow-[0_4px_24px_rgba(0,0,0,0.07)]"
            >
              <div className="icon-box w-[40px] h-[40px] rounded-xl flex items-center justify-center mb-5">
                <img
                  src={`${IMG_BASE_URL_PUBLIC()}/choose-us-icons/${firstCard.icon}`}
                  alt={firstCard.title}
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="font-bold text-black text-[15px] sm:text-base leading-snug mb-3">
                {firstCard.title}
              </h3>
              <p
                className="text-gray-500 text-sm leading-relaxed"
                dangerouslySetInnerHTML={{ __html: firstCard.description }}
              />
            </div>
          </div>

          {/* Cards 2, 3, 4... */}
          {restCards.map((card, idx) => {
            const i = idx + 1;
            const mt = MT_CLASSES[i] || '';
            return (
              <div
                key={card.id}
                className={`card-col w-full sm:flex-1 flex-shrink-0 ${mt}`}
              >
                <div
                  ref={(el) => (cardsRef.current[i] = el)}
                  className="choose-card bg-white rounded-2xl px-6 py-10 shadow-[0_4px_24px_rgba(0,0,0,0.07)] h-full"
                >
                  <div className="icon-box w-[40px] h-[40px] rounded-xl flex items-center justify-center mb-5">
                    <img
                      src={`${IMG_BASE_URL_PUBLIC()}/choose-us-icons/${card.icon}`}
                      alt={card.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="font-bold text-black text-[15px] sm:text-base leading-snug mb-3">
                    {card.title}
                  </h3>
                  <p
                    className="text-gray-500 text-sm leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: card.description }}
                  />
                </div>
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
}