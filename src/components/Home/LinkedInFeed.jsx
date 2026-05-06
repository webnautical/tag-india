// src/components/Home/LinkedInFeed.jsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, ChevronRight, LinkIcon } from 'lucide-react';
import logo from '../../assets/img/logo.png';
import { LiaLinkedinIn } from 'react-icons/lia';

gsap.registerPlugin(ScrollTrigger);

const POSTS = [
  {
    time: '2 hours ago',
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
  {
    time: '2 hours ago',
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
  {
    time: '2 hours ago',
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
];

// LinkedIn Icon SVG
function LinkedInIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect width="28" height="28" rx="6" fill="#0A66C2" />
      <path
        d="M8.5 11.5H11V19.5H8.5V11.5ZM9.75 10.5C8.93 10.5 8.25 9.82 8.25 9C8.25 8.18 8.93 7.5 9.75 7.5C10.57 7.5 11.25 8.18 11.25 9C11.25 9.82 10.57 10.5 9.75 10.5ZM19.5 19.5H17V15.4C17 14.28 16.98 12.84 15.44 12.84C13.88 12.84 13.65 14.06 13.65 15.32V19.5H11.15V11.5H13.55V12.72H13.58C13.92 12.08 14.74 11.4 15.97 11.4C18.5 11.4 19.5 13.04 19.5 15.22V19.5Z"
        fill="white"
      />
    </svg>
  );
}

export default function LinkedInFeed() {
  const sectionRef = useRef(null);
  const profileRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Profile row fade in
      gsap.from(profileRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 82%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        y: 30,
        duration: 0.7,
        ease: 'power3.out',
      });

      // Cards stagger
      gsap.from(cardsRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        y: 0,
        stagger: 0.15,
        duration: 0.65,
        ease: 'power3.out',
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-white py-16 lg:pb-12 lg:pt-12  tags_india"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Profile Header Row ── */}
        <div
          ref={profileRef}
          className="flex items-center justify-between mb-10"
        >
          {/* Left: Logo + Info */}
          <div className="flex items-center gap-5">

            {/* Logo circle */}
            <div className="w-20 h-20 rounded-full border-2 border-gray-200 flex items-center justify-center bg-white p-2 flex-shrink-0 shadow-sm">
              <img
                src={logo}
                alt="TAG India"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Name + role + location */}
            <div>
              <h3 className="text-xl font-bold text-black leading-tight">
                Tagindia
              </h3>
              <p className="text-[#595959] text-sm mt-0.5">
                Recreational Facilities
              </p>
              <div className="flex items-center gap-1 mt-1 text-[#595959] text-sm">
                <MapPin size={13} className="text-gray-400" />
                <span>India</span>
              </div>
            </div>
          </div>

          {/* Right: Follow Button */}
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="follow-btn flex items-center gap-1.5 bg-[#6A1B9A] text-white font-semibold text-sm px-6 py-2.5 rounded-lg"
          >
            Follow
            <ChevronRight size={16} className="follow-chevron" />
          </a>
        </div>

        {/* ── 3 Post Cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {POSTS.map((post, i) => (
            <div
              key={i}
              ref={(el) => (cardsRef.current[i] = el)}
              className="li-card bg-white border border-gray-200 rounded-2xl p-5 flex flex-col gap-4"
            >

              {/* Card Header: Logo + Name + Time + LinkedIn icon */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* Small logo */}
                  <div className="w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center bg-white p-1 flex-shrink-0">
                    <img
                      src={logo}
                      alt="TAG"
                      className="w-full h-auto object-contain "
                    />
                  </div>
                  <div>
                    <p className="font-bold text-[#595959] text-sm leading-tight">
                      Tagindia
                    </p>
                    <p className="text-[#595959] text-xs mt-0.5">
                      {post.time}
                    </p>
                  </div>
                </div>

                {/* LinkedIn icon */}
                <div className="svg_adds">
                  <LiaLinkedinIn />
                </div>
              </div>

              {/* Post Text */}
              <p className="text-[#595959] text-sm leading-relaxed">
                {post.text}
              </p>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}