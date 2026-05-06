// src/front/Contact/ContactForm.jsx
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Mail, Phone, ChevronRight } from 'lucide-react';
import 'react-phone-input-2/lib/style.css';
import PhoneInputPkg from 'react-phone-input-2';
const PhoneInput = PhoneInputPkg.default || PhoneInputPkg;

gsap.registerPlugin(ScrollTrigger);

const CONTACT_INFO = [
  {
    icon: <MapPin size={18} />,
    label: 'Address',
    value: 'World Trade Park, A-621, Jawahar Lal Nehru Marg, D-Block, Malviya Nagar, Jaipur, Rajasthan 302018, India',
  },
  {
    icon: <Mail size={18} />,
    label: 'Email',
    value: 'ceo@tagindia.co.in',
    href: 'mailto:ceo@tagindia.co.in',
  },
  {
    icon: <Phone size={18} />,
    label: 'Phone Number ( Mon-Sat 10:00am - 5:00pm )',
    value: '+91-8955009371',
    href: 'tel:+918955009371',
  },
];

export default function ContactForm() {
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  const [form, setForm] = useState({
    name: '', email: '', phone: '', message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(leftRef.current?.children, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        opacity: 0, x: -40, stagger: 0.15, duration: 0.7, ease: 'power3.out',
      });
      gsap.from(rightRef.current?.children, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        opacity: 0, x: 40, stagger: 0.12, duration: 0.7, ease: 'power3.out',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => { setSubmitting(false); setSubmitted(true); }, 1500);
  };

  return (
    <>
      <style>{`
        .contact-input {
          width: 100%;
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          padding: 14px 16px;
          font-size: 14px;
          color: #111827;
          outline: none;
          transition: border-color 0.25s ease, box-shadow 0.25s ease;
          background: white;
        }
        .contact-input:focus {
          border-color: #6A1B9A;
          box-shadow: 0 0 0 3px rgba(107,33,168,0.1);
        }
        .contact-input::placeholder { color: #9ca3af; }

        /* ✅ Phone input styles */
        .phone-wrap { width: 100%; }

        .phone-wrap .react-tel-input { width: 100%; }

        .phone-wrap .react-tel-input .form-control {
          width: 100% !important;
          height: 50px !important;
          border: 1px solid #e5e7eb !important;
          border-radius: 10px !important;
          padding-left: 62px !important;
          font-size: 14px !important;
          color: #111827 !important;
          font-family: inherit !important;
          transition: border-color 0.25s ease, box-shadow 0.25s ease !important;
          background: white !important;
          outline: none !important;
          box-shadow: none !important;
        }
        .phone-wrap .react-tel-input .form-control:focus {
          border-color: #6A1B9A !important;
          box-shadow: 0 0 0 3px rgba(107,33,168,0.1) !important;
          outline: none !important;
        }
        .phone-wrap .react-tel-input .form-control::placeholder {
          color: #9ca3af !important;
        }
        .phone-wrap .react-tel-input .flag-dropdown {
          border: 1px solid #e5e7eb !important;
          border-right: none !important;
          border-radius: 10px 0 0 10px !important;
          background: #f9fafb !important;
          height: 50px !important;
        }
        .phone-wrap .react-tel-input .flag-dropdown:hover {
          background: #f3f4f6 !important;
        }
        .phone-wrap .react-tel-input .flag-dropdown.open {
          border-color: #6A1B9A !important;
          background: #f3f4f6 !important;
          border-radius: 10px 0 0 10px !important;
        }
        .phone-wrap .react-tel-input .selected-flag {
          border-radius: 10px 0 0 10px !important;
          padding: 0 8px 0 12px !important;
          height: 50px !important;
          display: flex !important;
          align-items: center !important;
          width: 54px !important;
        }
        .phone-wrap .react-tel-input .selected-flag .arrow {
          border-top-color: #9ca3af !important;
          margin-left: 4px !important;
        }
        .phone-wrap .react-tel-input .selected-flag .arrow.up {
          border-bottom-color: #9ca3af !important;
        }
        .phone-wrap .react-tel-input .country-list {
          border-radius: 12px !important;
          box-shadow: 0 8px 32px rgba(0,0,0,0.12) !important;
          border: 1px solid #e5e7eb !important;
          margin-top: 4px !important;
          max-height: 240px !important;
          width: 300px !important;
          z-index: 9999 !important;
          overflow-y: auto !important;
        }
        .phone-wrap .react-tel-input .country-list .search {
          padding: 8px 10px !important;
          position: sticky !important;
          top: 0 !important;
          background: white !important;
          z-index: 1 !important;
          border-bottom: 1px solid #f3f4f6 !important;
        }
        .phone-wrap .react-tel-input .country-list .search-box {
          border: 1px solid #e5e7eb !important;
          border-radius: 8px !important;
          padding: 8px 12px !important;
          font-size: 13px !important;
          width: 100% !important;
          box-sizing: border-box !important;
          outline: none !important;
        }
        .phone-wrap .react-tel-input .country-list .search-box:focus {
          border-color: #6A1B9A !important;
          box-shadow: 0 0 0 2px rgba(107,33,168,0.1) !important;
        }
        .phone-wrap .react-tel-input .country-list .country {
          padding: 9px 12px !important;
          font-size: 13px !important;
          display: flex !important;
          align-items: center !important;
          gap: 8px !important;
        }
        .phone-wrap .react-tel-input .country-list .country:hover {
          background: #f5f0ff !important;
        }
        .phone-wrap .react-tel-input .country-list .country.highlight {
          background: #ede9fe !important;
        }
        .phone-wrap .react-tel-input .country-list .country-name {
          color: #111827 !important;
          margin-right: 4px !important;
        }
        .phone-wrap .react-tel-input .country-list .dial-code {
          color: #6A1B9A !important;
          font-weight: 500 !important;
          margin-left: auto !important;
        }

        /* Submit */
        .submit-btn {
          transition: background 0.25s ease, transform 0.2s ease, box-shadow 0.25s ease;
        }
        .submit-btn:hover:not(:disabled) {
          background: #4e0f75;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(107,33,168,0.35);
        }
        .submit-btn:hover .sub-chevron { transform: translateX(4px); }
        .sub-chevron { transition: transform 0.25s ease; }
        .info-icon-wrap { transition: transform 0.3s cubic-bezier(.34,1.56,.64,1); }
        .info-row:hover .info-icon-wrap { transform: scale(1.1); }
        .map-frame { transition: box-shadow 0.3s ease; border-radius: 12px; overflow: hidden; }
        .map-frame:hover { box-shadow: 0 8px 32px rgba(107,33,168,0.15); }
      `}</style>

      <section ref={sectionRef} className="bg-white lg:py-12 py-6 blacklist_section">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-20">

            {/* ── Left ── */}
            <div ref={leftRef} className="w-full lg:w-[48%] space-y-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-black">
                TAG Contact Information
              </h2>
              <div className="space-y-6">
                {CONTACT_INFO.map((info) => (
                  <div key={info.label} className="info-row flex items-start gap-4">
                    <div className="info-icon-wrap w-11 h-11 rounded-full bg-purple-100 flex items-center justify-center text-[#6A1B9A] flex-shrink-0 mt-0.5">
                      {info.icon}
                    </div>
                    <div>
                      <p className="font-semibold text-black text-sm mb-1">{info.label}</p>
                      {info.href ? (
                        <a href={info.href} className="text-gray-600 text-sm leading-relaxed hover:text-[#6A1B9A] transition-colors">
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-gray-600 text-sm leading-relaxed">{info.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="map-frame border border-gray-200">
                <iframe
                  title="TAG India Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.869!2d75.8236!3d26.8467!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db5e5a5a5a5a5%3A0x0!2sWorld+Trade+Park%2C+Jaipur!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%"
                  height="240"
                  style={{ border: 0, display: 'block' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* ── Right ── */}
            <div ref={rightRef} className="w-full lg:w-[52%] space-y-6">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-black">
                  Ready to get started?
                </h2>
                <p className="text-sm mt-2 leading-relaxed text-gray-500">
                  Please use the form below to contact us. We will never spam you, or sell your email to third parties.
                </p>
              </div>

              {submitted ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
                  <div className="text-green-600 text-3xl mb-2">✓</div>
                  <p className="font-semibold text-green-700">Message sent successfully!</p>
                  <p className="text-green-600 text-sm mt-1">We'll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">

                  {/* Name */}
                  <input
                    type="text"
                    placeholder="Name *"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    className="contact-input"
                  />

                  {/* Email */}
                  <input
                    type="email"
                    placeholder="Business Email *"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                    className="contact-input"
                  />

                  {/* ✅ Phone with flag + country code */}
                  <div className="phone-wrap">
                    <PhoneInput
                      country="in"
                      value={form.phone}
                      onChange={(phone) => setForm((prev) => ({ ...prev, phone }))}
                      placeholder="Phone Number"
                      enableSearch
                      searchPlaceholder="Search country..."
                      disableSearchIcon
                      preferredCountries={['in', 'us', 'gb', 'ae', 'sg', 'au']}
                      inputProps={{ name: 'phone' }}
                    />
                  </div>

                  {/* Message */}
                  <textarea
                    placeholder="Message"
                    rows={6}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="contact-input resize-none"
                  />

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="submit-btn w-full flex items-center justify-center gap-2 bg-[#6A1B9A] text-white font-semibold text-sm py-4 rounded-xl disabled:opacity-70"
                  >
                    {submitting ? (
                      <>
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>Submit <ChevronRight size={16} className="sub-chevron" /></>
                    )}
                  </button>

                </form>
              )}
            </div>

          </div>
        </div>
      </section>
    </>
  );
}