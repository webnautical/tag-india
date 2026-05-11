// src/components/WhyWereBetter.jsx
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import globeImg from '../../assets/img/globe.png';
import { IMG_BASE_URL_PUBLIC } from '../../helper/utils';

gsap.registerPlugin(ScrollTrigger);

function Counter({ target, suffix, start }) {
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!start || started.current) return;
    started.current = true;
    const duration = 1800;
    const startTime = Date.now();
    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [start, target]);

  return (
    <span>
      {target >= 1000 ? count.toLocaleString('en-IN') : count}{suffix}
    </span>
  );
}

// Parse "5 Lacs+" → { value: 5, suffix: ' Lacs+' }
// Parse "1500+"  → { value: 1500, suffix: '+' }
function parseTitle(title = '') {
  const match = title.match(/^([\d,]+)(.*)/);
  if (!match) return { value: 0, suffix: title };
  return {
    value: parseInt(match[1].replace(/,/g, ''), 10),
    suffix: match[2].trim() ? ` ${match[2].trim()}` : '',
  };
}

// Strip HTML tags from description → plain label
function stripHtml(html = '') {
  return html.replace(/<[^>]*>/g, '').trim();
}

export default function WhyWereBetter({ data = [], achievementCounter = [] }) {
  const sectionRef     = useRef(null);
  const headingRef     = useRef(null);
  const paraRef        = useRef(null);
  const statsRef       = useRef(null);
  const globeWrapRef   = useRef(null);
  const globeImgRef    = useRef(null);
  const statIconsRef   = useRef([]);
  const [counterStart, setCounterStart] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {

      gsap.from(headingRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 82%',
          toggleActions: 'play none none none',
        },
        opacity: 0, x: -40, duration: 0.8, ease: 'power3.out',
      });

      gsap.from(paraRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        opacity: 0, y: 20, duration: 0.7, delay: 0.2, ease: 'power2.out',
      });

      gsap.from(statsRef.current?.children, {
        scrollTrigger: {
          trigger: statsRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
          onEnter: () => setCounterStart(true),
        },
        opacity: 0, y: 0, stagger: 0.15, duration: 0.65, ease: 'power3.out',
      });

      statIconsRef.current.forEach((icon, i) => {
        if (!icon) return;
        gsap.from(icon, {
          scrollTrigger: { trigger: statsRef.current, start: 'top 85%' },
          scale: 0, rotation: -20, opacity: 0,
          duration: 0.55, delay: 0.2 + i * 0.12, ease: 'back.out(2)',
        });
      });

      gsap.from(globeWrapRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
        opacity: 0, x: 80, duration: 1.0, ease: 'power3.out',
      });

      gsap.to(globeImgRef.current, {
        rotation: 360, duration: 18,
        ease: 'none', repeat: -1,
        transformOrigin: '50% 50%',
      });

      gsap.to(globeWrapRef.current, {
        y: '-=18', duration: 3.5,
        ease: 'sine.inOut', yoyo: true, repeat: -1,
      });

    }, sectionRef);

    return () => ctx.revert();
  }, [data, achievementCounter]);

  // Use first item from WhyWeAreBetter for heading + description
  const main = data?.[0] ?? null;

  return (
    <section ref={sectionRef} className="bg-[#EEE5F4] py-16 lg:py-24 relative overflow-hidden">

      {/* Globe */}
      <div
        ref={globeWrapRef}
        className="hidden lg:block absolute right-0 top-1/2 pointer-events-none"
        style={{ width: '390px', height: '390px', transform: 'translateY(-50%) translateX(40%)' }}
      >
        <div className="orbit-ring orbit-ring-1" />
        <div className="orbit-ring orbit-ring-2" />
        <div className="orbit-ring orbit-ring-3" />
        <img
          ref={globeImgRef}
          src={globeImg}
          alt="Globe"
          className="w-full h-full object-contain"
          style={{ mixBlendMode: 'multiply', borderRadius: '50%' }}
        />
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:pl-8 lg:pr-44 sm:pr-8">

        <h2
          ref={headingRef}
          className="text-3xl sm:text-4xl lg:text-[2rem] font-bold text-black leading-tight mb-3"
        >
          {main?.title || "Why We're Better"}
        </h2>

        <div
          ref={paraRef}
          className="text-[#636363] text-sm sm:text-[15px] leading-[1.85]"
          dangerouslySetInnerHTML={{ __html: main?.description || '' }}
        />

        {/* Achievement Counters */}
        {achievementCounter.length > 0 && (
          <div ref={statsRef} className="pt-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex gap-6 lg:gap-4 items-center">
              {achievementCounter.map((stat, i) => {
                const { value, suffix } = parseTitle(stat.title);
                const label = stripHtml(stat.description);

                return (
                  <div
                    key={stat.id}
                    className="stat-item flex items-center gap-3 lg:flex-1 justify-start"
                  >
                    {/* Icon */}
                    <div
                      ref={(el) => (statIconsRef.current[i] = el)}
                      className="stat-icon-wrap w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center flex-shrink-0 border border-purple-100"
                    >
                      <img
                        src={`${IMG_BASE_URL_PUBLIC()}/achievement-counter-images/${stat.image}`}
                        alt={label}
                        className="w-6 h-6 sm:w-7 sm:h-7 object-contain"
                      />
                    </div>

                    {/* Count + Label */}
                    <div>
                      <div className="text-black font-bold text-lg sm:text-xl lg:text-2xl leading-tight">
                        <Counter target={value} suffix={suffix} start={counterStart} />
                      </div>
                      <div className="text-[#636363] text-[11px] sm:text-sm font-semibold mt-0.5">
                        {label}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}