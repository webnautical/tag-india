// src/components/Home/LinkedInFeed.jsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, ChevronRight } from 'lucide-react';
import { LiaLinkedinIn } from 'react-icons/lia';
import logo from '../../assets/img/logo.png';
import { IMG_BASE_URL_PUBLIC } from '../../helper/utils';

gsap.registerPlugin(ScrollTrigger);

function timeAgo(dateStr) {
  const diff = Math.floor((Date.now() - new Date(dateStr)) / 1000);
  if (diff < 60)       return `${diff}s ago`;
  if (diff < 3600)     return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400)    return `${Math.floor(diff / 3600)} hours ago`;
  if (diff < 2592000)  return `${Math.floor(diff / 86400)} days ago`;
  return `${Math.floor(diff / 2592000)} months ago`;
}

export default function LinkedInFeed({ data = [], partners = [] }) {
  const sectionRef = useRef(null);
  const profileRef = useRef(null);
  const cardsRef   = useRef([]);

  // Use first partner for the profile header
  const partner = partners?.[0] ?? null;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(profileRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 82%',
          toggleActions: 'play none none none',
        },
        opacity: 0, y: 30, duration: 0.7, ease: 'power3.out',
      });

      gsap.from(cardsRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
          toggleActions: 'play none none none',
        },
        opacity: 0, y: 0, stagger: 0.15, duration: 0.65, ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [data, partners]);

  if (!data || data.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      className="bg-white py-16 lg:pb-12 lg:pt-12 tags_india"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Profile Header */}
        <div ref={profileRef} className="flex items-center justify-between mb-10">

          {/* Left: Logo + Info */}
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-full border-2 border-gray-200 flex items-center justify-center bg-white p-2 flex-shrink-0 shadow-sm overflow-hidden">
              {partner?.logo ? (
                <img
                  src={`${IMG_BASE_URL_PUBLIC()}/partners-logo/${partner.logo}`}
                  alt={partner.name}
                  className="w-full h-full object-contain"
                />
              ) : (
                <img src={logo} alt="Logo" className="w-full h-full object-contain" />
              )}
            </div>

            <div>
              <h3 className="text-xl font-bold text-black leading-tight">
                {partner?.name ?? 'TagIndia'}
              </h3>
              <p className="text-[#595959] text-sm mt-0.5">
                {partner?.description ?? ''}
              </p>
              <div className="flex items-center gap-1 mt-1 text-[#595959] text-sm">
                <MapPin size={13} className="text-gray-400" />
                <span>{partner?.location ?? 'India'}</span>
              </div>
            </div>
          </div>

          {/* Follow Button */}
          <a
            href={partner?.button_link ?? 'https://linkedin.com'}
            target="_blank"
            rel="noopener noreferrer"
            className="follow-btn flex items-center gap-1.5 bg-[#6A1B9A] text-white font-semibold text-sm px-6 py-2.5 rounded-lg"
          >
            {partner?.button_text ?? 'Follow'}
            <ChevronRight size={16} className="follow-chevron" />
          </a>
        </div>

        {/* Post Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {data.map((post, i) => (
            <div
              key={post.id}
              ref={(el) => (cardsRef.current[i] = el)}
              className="li-card bg-white border border-gray-200 rounded-2xl p-5 flex flex-col gap-4"
            >
              {/* Card Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center bg-white p-1 flex-shrink-0 overflow-hidden">
                    {partner?.logo ? (
                      <img
                        src={`${IMG_BASE_URL_PUBLIC()}/partners-logo/${partner.logo}`}
                        alt={partner.name}
                        className="w-full h-auto object-contain"
                      />
                    ) : (
                      <img src={logo} alt="Logo" className="w-full h-auto object-contain" />
                    )}
                  </div>
                  <div>
                    <p className="font-bold text-[#595959] text-sm leading-tight">
                      {partner?.name ?? 'TagIndia'}
                    </p>
                    <p className="text-[#595959] text-xs mt-0.5">
                      {timeAgo(post.posted_at)}
                    </p>
                  </div>
                </div>

                {/* LinkedIn icon — links to post if available */}
                <a
                  href={post.linkedin_url ?? '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="svg_adds"
                >
                  <LiaLinkedinIn />
                </a>
              </div>

              {/* Post Content */}
              <p className="text-[#595959] text-sm leading-relaxed">
                {post.content}
              </p>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}