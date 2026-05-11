// src/components/Contact/EscalationMatrix.jsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, User } from 'lucide-react';
import { useGetEscalationMatrixQuery } from '../../api/TagIndiaAPI';

gsap.registerPlugin(ScrollTrigger);

export default function EscalationMatrix() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef   = useRef([]);

  const { data, isLoading, isError } = useGetEscalationMatrixQuery();
  const matrix = data?.data || [];

  useEffect(() => {
    if (!matrix.length) return;

    const ctx = gsap.context(() => {
      gsap.from(headingRef.current?.children, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 82%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        y: 30,
        stagger: 0.15,
        duration: 0.7,
        ease: 'power3.out',
      });

      gsap.from(cardsRef.current.filter(Boolean), {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        y: 40,
        stagger: 0.15,
        duration: 0.65,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [matrix.length]);

  if (isLoading) {
    return (
      <section className="bg-white pb-16 pt-24">
        <div className="max-w-6xl mx-auto px-4 flex justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-700" />
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="bg-white pb-16 pt-24">
        <div className="max-w-6xl mx-auto px-4 text-center text-red-500">
          Failed to load escalation matrix.
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="bg-white pb-16 lg:pb-24 pt-2 lg:pt-24">
      <style>{`
        .card-shadow { box-shadow: 0px 4px 11px 2px rgba(0,0,0,0.08); }
        .matrix-card { transition: box-shadow 0.3s ease, transform 0.3s ease; }
        .matrix-card:hover { box-shadow: 0 12px 40px rgba(107,33,168,0.12); transform: translateY(-4px); }
        .avatar-wrap { transition: transform 0.3s cubic-bezier(.34,1.56,.64,1); }
        .matrix-card:hover .avatar-wrap { transform: scale(1.08); }
        .email-link { transition: color 0.2s ease; }
        .email-link:hover { color: #4e0f75; }
      `}</style>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <div ref={headingRef} className="text-center mb-12 space-y-3">
          <h2 className="text-3xl sm:text-4xl font-bold text-black">
            Escalation Matrix
          </h2>
          <p className="text-base leading-relaxed max-w-lg mx-auto">
            Our team is available 24/7 to support you. Reach out to the
            appropriate contact below for quick assistance.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {matrix.map((item, i) => (
            <div
              key={item.id}
              ref={(el) => (cardsRef.current[i] = el)}
              className="card-shadow bg-white rounded-2xl overflow-hidden"
            >
              <div className="px-5 py-4 bg-[#F1F5F9]">
                <p className="text-black font-semibold text-sm">
                  {item.title}
                </p>
              </div>

              <div className="px-4 py-4 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="avatar-wrap w-11 h-11 rounded-full bg-[#F1F5F9] flex items-center justify-center flex-shrink-0">
                    <User size={18} className="text-[#6A1B9A]" />
                  </div>
                  <div>
                    <p className="font-bold text-black text-sm leading-tight">
                      {item.name}
                    </p>
                    <p className="text-xs mt-0.5 text-gray-500">
                      {item.designation}
                    </p>
                  </div>
                </div>

                <a
                  href={`mailto:${item.email}`}
                  className="email-link flex items-center gap-2 text-[#6A1B9A] text-sm font-medium"
                >
                  <Mail size={14} className="flex-shrink-0" />
                  {item.email}
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}