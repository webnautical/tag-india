// src/front/Contact/EscalationMatrix.jsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, User, User2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const MATRIX = [
  {
    dept: 'Operations / Business Development',
    name: 'Anjana Jain',
    role: 'Senior Vice President',
    email: 'svp@tagindia.co.in',
  },
  {
    dept: 'HR',
    name: 'Neha Soni',
    role: 'Talent Management',
    email: 'svp@tagindia.co.in',
  },
  {
    dept: 'Finance',
    name: 'Anjana Jain',
    role: 'Senior Vice President',
    email: 'svp@tagindia.co.in',
  },
];

export default function EscalationMatrix() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef   = useRef([]);

  useEffect(() => {
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

      gsap.from(cardsRef.current, {
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
  }, []);

  return (
    <>
      <style>{`
        .matrix-card {
          transition: box-shadow 0.3s ease, transform 0.3s ease;
        }
        .matrix-card:hover {
          box-shadow: 0 12px 40px rgba(107,33,168,0.12);
          transform: translateY(-4px);
        }
        .avatar-wrap {
          transition: transform 0.3s cubic-bezier(.34,1.56,.64,1);
        }
        .matrix-card:hover .avatar-wrap {
          transform: scale(1.08);
        }
        .email-link {
          transition: color 0.2s ease;
        }
        .email-link:hover {
          color: #4e0f75;
        }
      `}</style>

      <section
        ref={sectionRef}
        className="bg-white pb-16 lg:pb-24 pt-2 lg:pt-24"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ── Heading ── */}
          <div
            ref={headingRef}
            className="text-center mb-12 space-y-3"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-black">
              Escalation Matrix
            </h2>
            <p className=" text-base leading-relaxed max-w-lg mx-auto">
              Our team is available 24/7 to support you. Reach out to the appropriate contact
              below for quick assistance.
            </p>
          </div>

          {/* ── Cards ── */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {MATRIX.map((item, i) => (
              <div
                key={`${item.dept}-${i}`}
                ref={(el) => (cardsRef.current[i] = el)}
                className=" bg-[#fff] rounded-2xl  overflow-hidden shadow-[0px_4px_11px_2px_rgba(0,0,0,0.08)]"
              >
                {/* Department header */}
                <div className="px-5 py-4 bg-[#F1F5F9]">
                  <p className="text-black font-semibold">
                    {item.dept}
                  </p>
                </div>

                {/* Person info */}
                <div className="px-4 py-4 space-y-4">

                  {/* Avatar + Name + Role */}
                  <div className="flex items-center gap-3">
                    <div className="avatar-wrap w-11 h-11 rounded-full bg-[#F1F5F9] flex items-center justify-center flex-shrink-0">
                      <User size={18} className="text-[#6A1B9A]" />
                    </div>
                    <div>
                      <p className="font-bold text-black text-sm leading-tight">
                        {item.name}
                      </p>
                      <p className=" text-xs mt-0.5">
                        {item.role}
                      </p>
                    </div>
                  </div>

                  {/* Divider */}

                  {/* Email */}
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
    </>
  );
}