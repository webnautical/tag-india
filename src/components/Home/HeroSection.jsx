// src/front/Home/HeroSection.jsx
import { useEffect, useRef } from 'react';
import { ChevronRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import heroImg from '../../assets/img/hero-image.png';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
    const sectionRef = useRef(null);
    const headingRef = useRef(null);
    const lineRef = useRef(null);
    const subtextRef = useRef(null);
    const buttonsRef = useRef(null);
    const imageRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {

            // ── Master timeline ──
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

            // Heading: words split animation
            tl.from(headingRef.current, {
                opacity: 0,
                y: 60,
                duration: 0.9,
                ease: 'power4.out',
            })

                // Purple divider line expand
                .from(lineRef.current, {
                    scaleX: 0,
                    transformOrigin: 'left center',
                    duration: 0.6,
                    ease: 'power2.out',
                }, '-=0.5')

                // Subtext fade up
                .from(subtextRef.current, {
                    opacity: 0,
                    y: 20,
                    duration: 0.6,
                }, '-=0.4')

                // Buttons stagger
                .from(buttonsRef.current.children, {
                    opacity: 0,
                    y: 0,
                    stagger: 0.15,
                    duration: 0.5,
                }, '-=0.3')

                // Image slide in from right
                .from(imageRef.current, {
                    opacity: 0,
                    x: 80,
                    duration: 1,
                    ease: 'power3.out',
                }, '-=1.2');

            // ── Floating image loop ──
            gsap.to(imageRef.current, {
                y: -16,
                duration: 2.5,
                ease: 'sine.inOut',
                yoyo: true,
                repeat: -1,
                delay: 1,
            });

            // ── Scroll: section fade out slightly ──
            gsap.to(sectionRef.current, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                },
                opacity: 0.4,
                y: -40,
                ease: 'none',
            });

        }, sectionRef);

        return () => ctx.revert(); // cleanup
    }, []);

    return (
        <section
            ref={sectionRef}
            className="bg-white overflow-hidden hero_sections"
        >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-10 py-12 lg:py-0 min-h-[400px]">

                    {/* ── Left Content ── */}
                    <div className="w-full lg:w-[60%] space-y-4 text-center lg:text-left">

                        {/* Heading */}
                        <h1
                            ref={headingRef}
                            className="text-4xl sm:text-4xl lg:text-[2rem] font-bold text-black sm:leading-[2.5rem]  leading-[2.5rem] tracking-[2%]"
                        >
                            Transparent Assessments
                            <br className="hidden sm:block" />
                            For Quality Outcomes
                        </h1>

                        {/* Purple Divider */}
                        <div
                            ref={lineRef}
                            className="h-[1px] w-36 bg-[#6A1B9A] rounded-full mx-auto lg:mx-0"
                        />

                        {/* Subtext */}
                        <p
                            ref={subtextRef}
                            className="text-[#585858] text-base font-semibold sm:text-m leading-relaxed mx-auto lg:mx-0"
                        >
                            Nationally Recognized Assessment Agency Delivering Quality.
                        </p>

                        {/* Buttons */}
                        <div ref={buttonsRef} className="flex flex-wrap items-center justify-center lg:justify-start gap-5">
                            <a href="/about" className="btn-primary">About Us<ChevronRight size={16} className="chevron-r" />
                            </a>
                            <a href="/services" className="btn-secondary inline-flex items-center gap-1.5 text-black font-semibold text-sm" >Explore Services
                                <ChevronRight size={16} className="chevron-r" />
                            </a>
                        </div>

                    </div>

                    {/* ── Right: Hero Image ── */}
                    <div className="w-full lg:w-[40%] flex justify-center lg:justify-end">
                        <img
                            ref={imageRef}
                            src={heroImg}
                            alt="TAG Assessment Hero"
                            className="w-full max-w-sm sm:max-w-md lg:max-w-xl xl:max-w-2xl object-contain select-none"
                            draggable="false"
                        />
                    </div>

                </div>
            </div>
        </section>
    );
}