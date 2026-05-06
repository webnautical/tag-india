// src/components/ProctoringTools.jsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// ✅ Use your actual images
import imgProctoring1 from '../../assets/img/imgProctoring.png'; // Image Proctoring

gsap.registerPlugin(ScrollTrigger);

export default function ProctoringTools() {
    const sectionRef = useRef(null);
    const headingRef = useRef(null);
    const cardsRef = useRef([]);
    const arrowRef = useRef(null);
    const lineRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Heading fade up
            gsap.from(headingRef.current, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 82%',
                    toggleActions: 'play none none none',
                },
                opacity: 0,
                y: 40,
                duration: 0.8,
                ease: 'power3.out',
            });
            // Cards stagger
            gsap.from(cardsRef.current, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 75%',
                    toggleActions: 'play none none none',
                },
                opacity: 0,
                y: 50,
                stagger: 0.2,
                duration: 0.75,
                ease: 'power3.out',
            });
            // Arrow bounce in
            gsap.from(arrowRef.current, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 70%',
                },
                scale: 0,
                opacity: 0,
                duration: 0.6,
                delay: 0.8,
                ease: 'back.out(2)',
            });
            // Arrow pulse loop
            gsap.to(arrowRef.current, {
                scale: 1.15,
                duration: 0.9,
                ease: 'sine.inOut',
                yoyo: true,
                repeat: -1,
                delay: 1.4,
            });
            // Line draw
            gsap.from(lineRef.current, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 70%',
                },
                scaleX: 0,
                transformOrigin: 'center center',
                opacity: 0,
                duration: 1,
                delay: 0.6,
                ease: 'power2.out',
            });
            // Card images float
            cardsRef.current.forEach((card, i) => {
                const img = card?.querySelector('.tool-img');
                if (!img) return;
                gsap.to(img, {
                    y: -8,
                    duration: 2 + i * 0.3,
                    ease: 'sine.inOut',
                    yoyo: true,
                    repeat: -1,
                    delay: i * 0.4,
                });
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="bg-white pt-16 lg:pt-18 lg:pb-0 pb-18"
        >
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* ── Heading ── */}
                <h2
                    ref={headingRef}
                    className="text-center text-3xl sm:text-4xl lg:text-[2rem] font-bold text-black leading-tight mb-10"
                >
                    We Best Proctoring Tools For
                    <br />
                    Examinations
                </h2>
                <img
                    src={imgProctoring1}
                    className="tool-img  w-auto object-contain"
                />
            </div>
        </section>
    );
}