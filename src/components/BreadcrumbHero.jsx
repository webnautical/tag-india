// src/front/Contact/BreadcrumbHero.jsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function BreadcrumbHero({
    title = "Page Title",          // h1 heading
    label = "Section Label",       // upper small badge
    bgImage = "",                  // background image URL
}) {
    const sectionRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
            tl.from(textRef.current.children, {
                opacity: 0,
                y: 30,
                stagger: 0.15,
                duration: 0.7,
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative overflow-hidden py-20 lg:py-22"
            style={{
                backgroundImage: bgImage ? `url(${bgImage})` : "none",
                backgroundColor: bgImage ? "transparent" : "#F0EBF8",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            {/* Overlay */}
            {bgImage && (
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: 'rgba(0,0,0,0.45)' }}
                />
            )}

            <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div ref={textRef} className="w-full space-y-3">
                    <span className="inline-block text-[#6A1B9A] font-bold text-sm px-5 py-2 rounded-[10px] bg-white">
                        {label}
                    </span>
                    <h1 className="text-3xl sm:text-4xl lg:text-[2rem] font-bold text-white leading-tight">
                        {title}
                    </h1>
                </div>
            </div>
        </section>
    );
}