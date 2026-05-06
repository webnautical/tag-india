import { useState } from "react";
import "react-phone-input-2/lib/style.css";
import BreadcrumbHero from '../components/BreadcrumbHero';
import contactBg from '../assets/img/contact-us-bg.jpg';

// ✅ Vite fix — CommonJS module
import PhoneInputPkg from "react-phone-input-2";
const PhoneInput = PhoneInputPkg.default || PhoneInputPkg;

const phoneOverride = `
  .react-tel-input .form-control {
    width: 100% !important; height: 46px !important;
    border: 1px solid #e5e7eb !important; border-radius: 0.5rem !important;
    font-size: 14px !important; color: #1f2937 !important;
    padding-left: 58px !important; outline: none !important;
    box-shadow: none !important; transition: border-color 0.15s, box-shadow 0.15s !important;
  }
  .react-tel-input .form-control:focus {
    border-color: #a855f7 !important;
    box-shadow: 0 0 0 3px rgba(168,85,247,0.15) !important;
  }
  .react-tel-input .flag-dropdown {
    border: 1px solid #e5e7eb !important; border-right: none !important;
    border-radius: 0.5rem 0 0 0.5rem !important; background: #f9fafb !important; height: 46px !important;
  }
  .react-tel-input .flag-dropdown.open, .react-tel-input .flag-dropdown:hover {
    background: #f3f4f6 !important; border-radius: 0.5rem 0 0 0.5rem !important;
  }
  .react-tel-input .selected-flag {
    border-radius: 0.5rem 0 0 0.5rem !important; padding: 0 8px 0 12px !important;
    height: 46px !important; display: flex !important; align-items: center !important;
  }
  .react-tel-input .selected-flag .arrow { border-top-color: #9ca3af !important; margin-left: 4px !important; }
  .react-tel-input .selected-flag .arrow.up { border-bottom-color: #9ca3af !important; }
  .react-tel-input .country-list {
    border-radius: 0.75rem !important; border: 1px solid #e5e7eb !important;
    box-shadow: 0 10px 40px rgba(0,0,0,0.12) !important; margin-top: 4px !important;
    width: 300px !important; max-height: 260px !important; overflow-y: auto !important; z-index: 9999 !important;
  }
  .react-tel-input .country-list .country {
    padding: 10px 14px !important; font-size: 13px !important; color: #374151 !important;
    display: flex !important; align-items: center !important; gap: 10px !important;
  }
  .react-tel-input .country-list .country:hover { background: #f5f3ff !important; color: #7c3aed !important; }
  .react-tel-input .country-list .country.highlight { background: #f5f3ff !important; color: #7c3aed !important; font-weight: 600 !important; }
  .react-tel-input .country-list .country .dial-code { color: #9ca3af !important; font-size: 12px !important; margin-left: auto !important; }
  .react-tel-input .country-list .search {
    padding: 10px 12px !important; position: sticky !important; top: 0 !important;
    background: white !important; border-bottom: 1px solid #f3f4f6 !important; z-index: 1 !important;
  }
  .react-tel-input .country-list .search-box {
    width: 100% !important; border: 1px solid #e5e7eb !important; border-radius: 0.5rem !important;
    padding: 7px 12px !important; font-size: 13px !important; color: #374151 !important;
    outline: none !important; background: #f9fafb !important;
  }
  .react-tel-input .country-list .search-box:focus {
    border-color: #a855f7 !important; box-shadow: 0 0 0 2px rgba(168,85,247,0.12) !important; background: white !important;
  }
`;

const jobData = {
  title: "Question Bank Developer",
  experience: "Work Experience Required 1-5 Years",
  responsibilities: [
    "We are into conducting assessments under NSDC, PMKVY. We are looking for a Question Bank Developer on freelance basis, who can prepare question bank for conducting assessments under NSDC.",
    "Question bank will be developed as per NSDC guidelines.",
    "QP/NOS and sample question bank shall be provided by us.",
    "Interested candidate may apply with their updated resume, qualification and experience certificates on below mentioned email address:",
  ],
  emails: ["avp@tagindia.co.in", "ea@tagindia.co.in"],
};

export function ApplyStaff() {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", qualification: "", experience: "", message: "", resume: null,
  });
  const [fileName, setFileName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) { setForm({ ...form, resume: file }); setFileName(file.name); }
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <>
      <BreadcrumbHero
        label="Drive Sustainable Growth."
        title="Apply For Job"
        bgImage={contactBg}
      />
      <style>{phoneOverride}</style>

      <div
        className="min-h-screen"
        style={{
          fontFamily: "'Segoe UI', sans-serif",
          backgroundSize: "24px 24px",
          backgroundColor: "#f9fafb",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

            {/* ── LEFT: Job Detail Card ── */}
            <div className="bg-gray-100 rounded-2xl p-8 shadow-sm">
              <h1 className="text-2xl font-bold text-gray-900 mb-1">{jobData.title}</h1>
              <p className="text-sm text-gray-500 mb-5">{jobData.experience}</p>
              <hr className="border-gray-300 mb-6" />

              <h2 className="text-base font-bold text-gray-900 mb-4">Key Responsibilities</h2>
              <div className="space-y-3">
                {jobData.responsibilities.map((para, i) => (
                  <p key={i} className="text-sm text-gray-600 leading-relaxed">{para}</p>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-6">
                {jobData.emails.map((email) => (
                  <a key={email} href={`mailto:${email}`}
                    className="flex items-center gap-2 text-sm font-medium hover:opacity-80 transition-opacity"
                    style={{ color: "#7c3aed" }}>
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22 6 12 13 2 6"/>
                    </svg>
                    {email}
                  </a>
                ))}
              </div>
            </div>

            {/* ── RIGHT: Apply Form ── */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Apply For Job</h2>
              <p className="text-sm text-gray-500 mb-7">
                Please use the form below to contact us. We will never spam you, or sell your email to third parties.
              </p>

              <div className="space-y-4">

                {/* Name */}
                <input
                  type="text" name="name" value={form.name} onChange={handleChange}
                  placeholder="Name *"
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-200 transition"
                />

                {/* Email */}
                <input
                  type="email" name="email" value={form.email} onChange={handleChange}
                  placeholder="Business Email *"
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-200 transition"
                />

                {/* Phone — fixed import */}
                <PhoneInput
                  country="in"
                  value={form.phone}
                  onChange={(phone) => setForm({ ...form, phone })}
                  placeholder="Phone Number"
                  enableSearch
                  searchPlaceholder="Search country..."
                  disableSearchIcon
                  preferredCountries={["in", "us", "gb", "ae", "sg", "au"]}
                  inputProps={{ name: "phone", required: true }}
                />

                {/* Qualification */}
                <input
                  type="text" name="qualification" value={form.qualification} onChange={handleChange}
                  placeholder="Your Qualification *"
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-200 transition"
                />

                {/* Experience */}
                <input
                  type="text" name="experience" value={form.experience} onChange={handleChange}
                  placeholder="Total Experience *"
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-200 transition"
                />

                {/* Message */}
                <textarea
                  name="message" value={form.message} onChange={handleChange}
                  placeholder="Your Message" rows={4}
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-200 transition resize-none"
                />

                {/* Upload + Submit row */}
                <div className="flex items-center justify-between gap-4 pt-1">
                  <label className="flex items-center gap-2 text-sm text-gray-500 cursor-pointer hover:text-purple-600 transition">
                    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 12V4m0 0L8 8m4-4l4 4"/>
                    </svg>
                    <span className="truncate max-w-[170px]">{fileName || "Upload Resume Here"}</span>
                    <input type="file" accept=".pdf,.doc,.docx" onChange={handleFile} className="hidden" />
                  </label>

                  <button
                    type="button" onClick={handleSubmit}
                    className="px-6 py-3 rounded-lg text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 active:scale-95 shrink-0"
                    style={{ backgroundColor: submitted ? "#16a34a" : "#7c3aed" }}
                  >
                    {submitted ? "Applied ✓" : "Apply Job"}
                  </button>
                </div>

                {submitted && (
                  <p className="text-sm text-green-600 font-medium text-center mt-1">
                    Application submitted successfully!
                  </p>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}