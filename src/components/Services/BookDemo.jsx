import { useState } from "react";
import { MdCheckCircle, MdArrowForward } from "react-icons/md";
import { useSubmitQueryMutation } from "../../api/TagIndiaAPI";

function parseListItems(html = '') {
  const matches = html?.match(/<li>(.*?)<\/li>/gs) ?? [];
  return matches.map(li => li.replace(/<[^>]*>/g, '').trim()).filter(Boolean);
}

const INITIAL_FORM = {
  type: "service_query",
  name: "",
  email: "",
  company: "",
  phone: "",
  service: "",
  message: "",
};

const INITIAL_ERRORS = {
  name: "",
  email: "",
  company: "",
  phone: "",
  service: "",
  message: "",
};

function validate(form) {
  const errors = { ...INITIAL_ERRORS };
  let isValid = true;

  if (!form.name.trim()) {
    errors.name = "Name is required.";
    isValid = false;
  } else if (form.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters.";
    isValid = false;
  }

  if (!form.email.trim()) {
    errors.email = "Email is required.";
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Enter a valid email address.";
    isValid = false;
  }

  if (!form.company.trim()) {
    errors.company = "Company name is required.";
    isValid = false;
  }

  if (!form.phone.trim()) {
    errors.phone = "Phone number is required.";
    isValid = false;
  } else if (!/^[+]?[\d\s\-()]{7,15}$/.test(form.phone)) {
    errors.phone = "Enter a valid phone number.";
    isValid = false;
  }

  if (!form.service) {
    errors.service = "Please select a service.";
    isValid = false;
  }

  if (!form.message.trim()) {
    errors.message = "Message is required.";
    isValid = false;
  } else if (form.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters.";
    isValid = false;
  }

  return { errors, isValid };
}

function FieldError({ msg }) {
  if (!msg) return null;
  return (
    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
      <span>⚠</span> {msg}
    </p>
  );
}

export default function BookDemo({ data }) {
  const [submitQuery, { isLoading: submitting }] = useSubmitQueryMutation();

  const [form, setForm]       = useState(INITIAL_FORM);
  const [errors, setErrors]   = useState(INITIAL_ERRORS);
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...form, [name]: value };
    setForm(updated);

    // Live re-validate touched fields
    if (touched[name]) {
      const { errors: newErrors } = validate(updated);
      setErrors(prev => ({ ...prev, [name]: newErrors[name] }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const { errors: newErrors } = validate(form);
    setErrors(prev => ({ ...prev, [name]: newErrors[name] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mark all fields as touched
    const allTouched = Object.keys(form).reduce((acc, k) => ({ ...acc, [k]: true }), {});
    setTouched(allTouched);

    const { errors: newErrors, isValid } = validate(form);
    setErrors(newErrors);
    if (!isValid) return;

    try {
      await submitQuery(form).unwrap();
      setSubmitted(true);
      setForm(INITIAL_FORM);
      setTouched({});
      setErrors(INITIAL_ERRORS);
    } catch (err) {
      console.error("Submit error:", err);
    }
  };

  if (!data?.heading) return null;

  const expectItems = parseListItems(data?.description ?? '');

  const inputClass = (field) =>
    `w-full border rounded-lg px-3 py-2.5 text-sm outline-none bg-gray-50 transition-colors ${
      errors[field] && touched[field]
        ? "border-red-400 focus:border-red-400"
        : "border-gray-200 focus:border-[#6A1B9A]"
    }`;

  return (
    <section className="w-full bg-white overflow-hidden">
      <div className="flex flex-col lg:flex-row min-h-[560px]">

        {/* Left — Text */}
        <div className="lg:w-1/2 flex flex-col justify-center px-8 sm:px-12 lg:px-16 py-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-4">
            {data.heading}
          </h2>
          <div className="mb-6" style={{ height: "2px", background: "#e5e5e5", width: "100%", maxWidth: "440px" }} />
          {data?.title && (
            <p className="text-xs font-bold tracking-widest mb-4" style={{ color: "#6A1B9A" }}>
              {data.title}
            </p>
          )}
          {expectItems.length > 0 && (
            <ul className="flex flex-col gap-3">
              {expectItems.map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <MdCheckCircle size={20} style={{ color: "#6A1B9A", flexShrink: 0 }} />
                  <span className="text-gray-700 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Right — Form */}
        <div className="lg:w-1/2 flex items-center justify-center px-6 py-12 lg:py-16" style={{ background: "#e8ecf8" }}>
          <div className="w-full max-w-[500px] bg-white rounded-2xl p-8" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>

            {/* Success message */}
            {submitted ? (
              <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
                <MdCheckCircle size={56} style={{ color: "#6A1B9A" }} />
                <h3 className="text-xl font-bold text-gray-900">Request Submitted!</h3>
                <p className="text-gray-500 text-sm">
                  Thank you! We'll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-2 text-sm text-[#6A1B9A] font-medium hover:underline"
                >
                  Submit another request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>

                {/* Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text" name="name" value={form.name}
                      onChange={handleChange} onBlur={handleBlur}
                      className={inputClass("name")}
                      placeholder="John Doe"
                    />
                    <FieldError msg={touched.name && errors.name} />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">
                      Work Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email" name="email" value={form.email}
                      onChange={handleChange} onBlur={handleBlur}
                      className={inputClass("email")}
                      placeholder="you@company.com"
                    />
                    <FieldError msg={touched.email && errors.email} />
                  </div>
                </div>

                {/* Company + Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">
                      Company name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text" name="company" value={form.company}
                      onChange={handleChange} onBlur={handleBlur}
                      className={inputClass("company")}
                      placeholder="Acme Corp"
                    />
                    <FieldError msg={touched.company && errors.company} />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">
                      Phone number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel" name="phone" value={form.phone}
                      onChange={handleChange} onBlur={handleBlur}
                      className={inputClass("phone")}
                      placeholder="+91 98765 43210"
                    />
                    <FieldError msg={touched.phone && errors.phone} />
                  </div>
                </div>

                {/* Service Dropdown */}
                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Which type of service are you looking for <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      name="service" value={form.service}
                      onChange={handleChange} onBlur={handleBlur}
                      className={`${inputClass("service")} appearance-none text-gray-500`}
                    >
                      <option value="" disabled>Select a service</option>
                      <option value="Corporate Assessment">Corporate Assessment</option>
                      <option value="ESG & CSR Consulting">ESG & CSR Consulting</option>
                      <option value="Financial Analysis">Financial Analysis</option>
                      <option value="Risk Management">Risk Management</option>
                      <option value="Strategic Planning">Strategic Planning</option>
                      <option value="Performance Reporting">Performance Reporting</option>
                    </select>
                    <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </div>
                  <FieldError msg={touched.service && errors.service} />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message" value={form.message}
                    onChange={handleChange} onBlur={handleBlur}
                    rows={4}
                    placeholder="Tell us about your requirements..."
                    className={`${inputClass("message")} resize-none`}
                  />
                  <FieldError msg={touched.message && errors.message} />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-lg text-white font-semibold text-sm transition-opacity hover:opacity-90 active:opacity-80 disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ background: "#6A1B9A" }}
                >
                  {submitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Get your personalized demo
                      <MdArrowForward size={18} />
                    </>
                  )}
                </button>

              </form>
            )}

          </div>
        </div>

      </div>
    </section>
  );
}