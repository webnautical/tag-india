// src/front/Contact/ContactForm.jsx
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Mail, Phone, ChevronRight } from 'lucide-react';
import 'react-phone-input-2/lib/style.css';
import { useGetSettingsQuery, useSubmitQueryMutation } from '../../api/TagIndiaAPI';

gsap.registerPlugin(ScrollTrigger);

// ---- Helper Components ----
function FieldError({ msg }) {
  if (!msg) return null;
  return (
    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
      <span>⚠</span> {msg}
    </p>
  );
}

// ---- Initial States ----
const INITIAL_FORM = {
  name: '',
  email: '',
  phone: '',
  message: '',
};

const INITIAL_ERRORS = {
  name: '',
  email: '',
  phone: '',
  message: '',
};

// ---- Validation Function ----
function validate(form) {
  const errors = { ...INITIAL_ERRORS };
  let isValid = true;

  // Name
  if (!form.name.trim()) {
    errors.name = 'Name is required.';
    isValid = false;
  } else if (form.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters.';
    isValid = false;
  }

  // Email
  if (!form.email.trim()) {
    errors.email = 'Email is required.';
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Enter a valid email address.';
    isValid = false;
  }

  // Phone (plain text – you can also replace with react-phone-input-2 later)
  if (!form.phone.trim()) {
    errors.phone = 'Phone number is required.';
    isValid = false;
  } else if (form.phone.replace(/[\s\-()+]/g, '').length < 10) {
    errors.phone = 'Enter a valid phone number (min. 10 digits).';
    isValid = false;
  }

  // Message
  if (!form.message.trim()) {
    errors.message = 'Message is required.';
    isValid = false;
  } else if (form.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters.';
    isValid = false;
  }

  return { errors, isValid };
}

export default function ContactForm() {
  const { data: settingsData, isLoading: settingsLoading } = useGetSettingsQuery();
  const settings = settingsData?.data;
  const [submitQuery, { isLoading: submitting, error: submitError }] = useSubmitQueryMutation();

  // Form state
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState(INITIAL_ERRORS);
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState(null); // for API errors

  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  // ---- GSAP Animations (unchanged) ----
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (leftRef.current?.children) {
        gsap.from(leftRef.current.children, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
          opacity: 0,
          x: -40,
          stagger: 0.15,
          duration: 0.7,
          ease: 'power3.out',
        });
      }
      if (rightRef.current?.children) {
        gsap.from(rightRef.current.children, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
          opacity: 0,
          x: 40,
          stagger: 0.12,
          duration: 0.7,
          ease: 'power3.out',
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // ---- Form Handlers with Validation ----
  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedForm = { ...form, [name]: value };
    setForm(updatedForm);
    if (touched[name]) {
      const { errors: newErrors } = validate(updatedForm);
      setErrors((prev) => ({ ...prev, [name]: newErrors[name] }));
    }
    if (serverError) setServerError(null);
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const { errors: newErrors } = validate(form);
    setErrors((prev) => ({ ...prev, [name]: newErrors[name] }));
  };

const handleSubmit = async () => {
  setServerError(null);
  const allTouched = Object.keys(form).reduce((acc, key) => ({ ...acc, [key]: true }), {});
  setTouched(allTouched);

  const { errors: newErrors, isValid } = validate(form);
  setErrors(newErrors);
  if (!isValid) return;

  try {
    // Add the 'type' field here
    const payload = {
      ...form,
      type: 'query',   // ← adjust if your backend expects a different value
    };
    await submitQuery(payload).unwrap();
    setSubmitted(true);
    setForm(INITIAL_FORM);
    setErrors(INITIAL_ERRORS);
    setTouched({});
    setTimeout(() => setSubmitted(false), 3000);
  } catch (err) {
    // ... error handling same as before
    const serverErrors = err?.data?.errors;
    if (serverErrors && typeof serverErrors === 'object') {
      const errorMessages = Object.entries(serverErrors)
        .map(([field, msgs]) => `${field}: ${Array.isArray(msgs) ? msgs[0] : msgs}`)
        .join('\n');
      setServerError(errorMessages);
    } else {
      setServerError(err?.data?.message || 'Submission failed. Please try again.');
    }
    console.error('Submit error:', err);
  }
};

  // ---- Helper for dynamic input styling (error / normal) ----
  const inputClass = (fieldName) =>
    `contact-input ${errors[fieldName] && touched[fieldName] ? 'border-red-400 focus:border-red-400 focus:ring-red-200' : ''}`;

  if (settingsLoading) {
    return (
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto text-center text-gray-600">Loading contact info...</div>
      </section>
    );
  }

  const contactInfo = [
    {
      icon: <MapPin size={18} />,
      label: 'Address',
      value: settings?.contact_address || 'Not provided',
    },
    {
      icon: <Mail size={18} />,
      label: 'Email',
      value: settings?.contact_email || 'contact@example.com',
      href: `mailto:${settings?.contact_email}`,
    },
    {
      icon: <Phone size={18} />,
      label: 'Phone Number',
      value: settings?.contact_phone || '+91 0000000000',
      href: `tel:${settings?.contact_phone?.replace(/\s/g, '')}`,
    },
  ];
  const mapUrl = settings?.map_url || 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.869!2d75.8236!3d26.8467!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db5e5a5a5a5a5%3A0x0!2sWorld+Trade+Park%2C+Jaipur!5e0!3m2!1sen!2sin!4v1234567890';

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
        .contact-input.border-red-400 {
          border-color: #f87171;
        }
        .contact-input.border-red-400:focus {
          border-color: #ef4444;
          box-shadow: 0 0 0 3px rgba(239,68,68,0.1);
        }
        .phone-wrap { width: 100%; }
        /* ... rest of your phone styles remain unchanged ... */
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

      <section ref={sectionRef} className="bg-white lg:py-12 py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-20">
            {/* Left column – contact info + map (unchanged) */}
            <div ref={leftRef} className="w-full lg:w-[48%] space-y-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-black">TAG Contact Information</h2>
              <div className="space-y-6">
                {contactInfo.map((info) => (
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
                  title="Company Location"
                  src={mapUrl}
                  width="100%"
                  height="240"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Right column – contact form with validation */}
            <div ref={rightRef} className="w-full lg:w-[52%] space-y-6">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-black">Ready to get started?</h2>
                <p className="text-sm mt-2 leading-relaxed text-gray-500">
                  Please use the form below to contact us. We will never spam you.
                </p>
              </div>

              {submitted ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
                  <div className="text-green-600 text-3xl mb-2">✓</div>
                  <p className="font-semibold text-green-700">Message sent successfully!</p>
                  <p className="text-green-600 text-sm mt-1">We'll get back to you soon.</p>
                </div>
              ) : (
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  {/* Server error box (from API) */}
                  {serverError && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-700 flex items-start gap-2">
                      <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div className="flex-1">
                        <strong className="font-semibold">Submission error:</strong>
                        <pre className="whitespace-pre-wrap text-xs mt-1 font-sans">{serverError}</pre>
                      </div>
                      <button type="button" onClick={() => setServerError(null)} className="text-red-500 hover:text-red-700">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  )}

                  {/* Name */}
                  <div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Name *"
                      value={form.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={inputClass('name')}
                    />
                    <FieldError msg={touched.name && errors.name} />
                  </div>

                  {/* Email */}
                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Business Email *"
                      value={form.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={inputClass('email')}
                    />
                    <FieldError msg={touched.email && errors.email} />
                  </div>

                  {/* Phone (plain text, but validated) */}
                  <div>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number *"
                      value={form.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={inputClass('phone')}
                    />
                    <FieldError msg={touched.phone && errors.phone} />
                  </div>

                  {/* Message */}
                  <div>
                    <textarea
                      name="message"
                      placeholder="Message *"
                      rows={6}
                      value={form.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`${inputClass('message')} resize-none`}
                    />
                    <FieldError msg={touched.message && errors.message} />
                  </div>

                  <button
                    type="button"
                    onClick={handleSubmit}
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