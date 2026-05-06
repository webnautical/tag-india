// src/components/WhoWeDo.jsx
import { useEffect, useRef } from 'react';
import { ChevronRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import classroomImg from '../../assets/img/about_us.jpg';

gsap.registerPlugin(ScrollTrigger);

export default function WhoWeDo() {
  const sectionRef = useRef(null);
  const imgRef = useRef(null);
  const badgeRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Image slide in from left
      gsap.from(imgRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        x: -60,
        duration: 0.9,
        ease: 'power3.out',
      });

      // Badge pop from top
      gsap.from(badgeRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        opacity: 0,
        y: -30,
        scale: 0.8,
        duration: 0.6,
        delay: 0.4,
        ease: 'back.out(1.7)',
      });

      // Counter animate 0 → 200
      const counterEl = badgeRef.current?.querySelector('.counter-num');
      if (counterEl) {
        gsap.from({ val: 200 }, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
          val: 0,
          duration: 1.8,
          delay: 0.5,
          ease: 'power2.out',
          onUpdate: function () {
            counterEl.textContent = Math.round(this.targets()[0].val) + 'K';
          },
        });
      }

      // Right content stagger
      const children = contentRef.current?.querySelectorAll('[data-anim]');
      gsap.from(children, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        opacity: 0,
        x: 50,
        stagger: 0.15,
        duration: 0.7,
        ease: 'power3.out',
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#E1D1EB8F] py-16 lg:py-20  mt-10 lg:mt-10"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-14 lg:gap-20">
          {/* ── Left: Image + Badge ── */}
          <div className="w-full lg:w-[45%] flex justify-center relative flex-shrink-0">
            {/* Oval Image */}
            <div
              ref={imgRef}
              className="who-img-wrap"
            >
              <img
                src={classroomImg}
                alt="Trained Trainees"
                className="w-full h-full object-cover"
              />
            </div>

            {/* 200K Badge */}
            <div
              ref={badgeRef}
              className="badge-card absolute top-[-15px] right-4 sm:right-8 lg:-right-4 bg-white rounded-md px-5 py-5 z-10"
            >
              <p className="text-[#6A1B9A] text-2xl font-bold sm:leading-[1.2rem] mb-0">
                <span className="counter-num">200K</span>
              </p>
              <p className="text-black text-sm font-semibold mt-1 leading-tight">
                Trained Trainees
              </p>
            </div>

          </div>

          {/* ── Right: Content ── */}
          <div
            ref={contentRef}
            className="w-full lg:w-[55%] space-y-5 text-center lg:text-left"
          >

            {/* Heading */}
            <h2
              data-anim
              className="text-3xl sm:text-4xl lg:text-[2rem] font-bold text-black "
            >
              Who We Do
            </h2>

            {/* Para 1 */}
            <p
              data-anim
            >
              We are a leading ESG, CSR, and Impact Assessment consulting firm committed to helping organizations create meaningful, measurable, and sustainable change.
              Our expertise lies in bridging the gap between corporate responsibility and real-world impact. We work closely with corporations, government bodies, NGOs, and training institutions to design and execute programs that deliver measurable outcomes.

              <br />With a strong focus on transparency, compliance, and innovation, we ensure that every initiative aligns with global ESG standards and national CSR mandates.
            </p>

            {/* Para 2 */}

            {/* CTA Button */}
            <div data-anim>
              <a
                href="/about"
                className="btn-primary"
              >
                About Us
                <ChevronRight size={16} className="btn-chevron" />
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}