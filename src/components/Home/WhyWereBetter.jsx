// src/components/WhyWereBetter.jsx
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import icon13 from '../../assets/img/icon13.png';
import icon14 from '../../assets/img/icon14.png';
import icon15 from '../../assets/img/icon15.png';
import icon16 from '../../assets/img/icon16.png';
import globeImg from '../../assets/img/globe.png';

gsap.registerPlugin(ScrollTrigger);

const STATS = [
    { img: icon13, value: 5, suffix: ' Lacs+', label: 'Trainees Assessed' },
    { img: icon14, value: 1500, suffix: '+', label: 'Certified Assessors' },
    { img: icon15, value: 18, suffix: '', label: 'SSCs Covered' },
    { img: icon16, value: 5, suffix: '', label: 'Government Affiliated' },
];

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

export default function WhyWereBetter() {
    const sectionRef = useRef(null);
    const headingRef = useRef(null);
    const paraRef = useRef(null);
    const statsRef = useRef(null);
    const globeWrapRef = useRef(null);
    const globeImgRef = useRef(null);
    const statIconsRef = useRef([]);
    const [counterStart, setCounterStart] = useState(false);

    useEffect(() => {
        const ctx = gsap.context(() => {

            // Heading slide in
            gsap.from(headingRef.current, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 82%',
                    toggleActions: 'play none none none',
                },
                opacity: 0,
                x: -40,
                duration: 0.8,
                ease: 'power3.out',
            });

            // Para fade in
            gsap.from(paraRef.current, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                },
                opacity: 0,
                y: 20,
                duration: 0.7,
                delay: 0.2,
                ease: 'power2.out',
            });

            // Stats stagger
            gsap.from(statsRef.current?.children, {
                scrollTrigger: {
                    trigger: statsRef.current,
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                    onEnter: () => setCounterStart(true),
                },
                opacity: 0,
                y: 0,
                stagger: 0.15,
                duration: 0.65,
                ease: 'power3.out',
            });

            // Stat icons pop in
            statIconsRef.current.forEach((icon, i) => {
                if (!icon) return;
                gsap.from(icon, {
                    scrollTrigger: {
                        trigger: statsRef.current,
                        start: 'top 85%',
                    },
                    scale: 0,
                    rotation: -20,
                    opacity: 0,
                    duration: 0.55,
                    delay: 0.2 + i * 0.12,
                    ease: 'back.out(2)',
                });
            });

            // Globe entrance — slides in from right
            gsap.from(globeWrapRef.current, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 75%',
                    toggleActions: 'play none none none',
                },
                opacity: 0,
                x: 80,
                duration: 1.0,
                ease: 'power3.out',
            });

            // 🌍 Continuous 360° spin on the globe IMAGE
            gsap.to(globeImgRef.current, {
                rotation: 360,
                duration: 18,          // ek full rotation = 18 seconds
                ease: 'none',
                repeat: -1,            // infinite
                transformOrigin: '50% 50%',
            });

            // 🎈 Float up-down on the WRAPPER (so spin + float combine)
            gsap.to(globeWrapRef.current, {
                y: '-=18',
                duration: 3.5,
                ease: 'sine.inOut',
                yoyo: true,
                repeat: -1,
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="bg-[#EEE5F4] py-16 lg:py-24 relative overflow-hidden">
            {/* ── Globe wrapper — absolute right, vertically centered ── */}
            <div
                ref={globeWrapRef}
                className="hidden lg:block absolute right-0 top-1/2 pointer-events-none"
                style={{
                    width: '390px',
                    height: '390px',
                    transform: 'translateY(-50%) translateX(40%)',
                }}
            >
                {/* Orbital rings sit around the globe */}
                <div className="orbit-ring orbit-ring-1" />
                <div className="orbit-ring orbit-ring-2" />
                <div className="orbit-ring orbit-ring-3" />

                {/* Globe image — spins via GSAP */}
                <img
                    ref={globeImgRef}
                    src={globeImg}
                    alt="Globe"
                    className="w-full h-full object-contain"
                    style={{
                        // hides black background on light section bg
                        mixBlendMode: 'multiply',
                        borderRadius: '50%',
                    }}
                />
            </div>
            {/* ── Main content ── */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:pl-8 lg:pr-44 sm:pr-8">
                <h2
                    ref={headingRef}
                    className="text-3xl sm:text-4xl lg:text-[2rem] font-bold text-black leading-tight mb-3"
                >
                    Why We're Better
                </h2>
                <p ref={paraRef} className="text-[#636363] text-sm sm:text-[15px] leading-[1.85]"
                > We stand apart through our integrated approach that combines consulting, assessment, and implementation under one roof. Our deep expertise in ESG, IA, and CSR allows us to deliver solutions that are not only strategic but also practical and measurable. With a strong focus on data integrity, field validation, and technology-enabled systems, we ensure accuracy, transparency, and scalability in every engagement. Our commitment to delivering actionable insights and real impact makes us a trusted partner for organizations seeking sustainable growth.
                </p>
                <div ref={statsRef} className="pt-8">
                    <div className="
                        grid grid-cols-2 sm:grid-cols-3 lg:flex 
                        gap-6 lg:gap-4
                        items-center
                    ">
                        {STATS.map((stat, i) => (
                            <div
                                key={stat.label}
                                className="
          stat-item 
          flex items-center 
          gap-3 
          lg:flex-1
          justify-start sm:justify-start lg:justify-start
        "
                            >

                                {/* Icon */}
                                <div
                                    ref={(el) => (statIconsRef.current[i] = el)}
                                    className="
            stat-icon-wrap 
            w-12 h-12 
            rounded-full 
            bg-white 
            shadow-md 
            flex items-center justify-center 
            flex-shrink-0 
            border border-purple-100
          "
                                >
                                    <img
                                        src={stat.img}
                                        alt={stat.label}
                                        className="w-6 h-6 sm:w-7 sm:h-7 object-contain"
                                    />
                                </div>

                                {/* Content */}
                                <div>
                                    <div className="text-black font-bold text-lg sm:text-xl lg:text-2xl leading-tight">
                                        <Counter
                                            target={stat.value}
                                            suffix={stat.suffix}
                                            start={counterStart}
                                        />
                                    </div>

                                    <div className="text-[#636363] text-[11px] sm:text-sm font-semibold mt-0.5">
                                        {stat.label}
                                    </div>
                                </div>

                            </div>
                        ))}

                    </div>
                </div>
            </div>
        </section>
    );
}