import { useEffect, useState } from "react";
import { IoIosMail } from "react-icons/io";
import { MdWifiCalling3 } from "react-icons/md";

export default function HeroServiceSec() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      className="relative py-16 lg:py-14"
      style={{
         background: "linear-gradient(180deg, rgba(106, 27, 154, 0.25) 0%, rgba(36, 9, 52, 0) 100%)"
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        <h1 className="text-center text-3xl sm:text-4xl lg:text-[2rem] font-bold text-black mb-3 sm:leading-[2.5rem] leading-[2.5rem]">
          Corporate Assessment Services for
          <br />
          Smarter Business Decisions
        </h1>
        <p className="text-[#636363] text-base sm:text-m leading-relaxed mx-auto mb-5 max-w-2xl">
          Evaluate performance, identify risks, and unlock growth opportunities
          with our expert corporate assessment solutions.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-5 mb-10">
          <a href="/contact" className="btn-primary">
            <MdWifiCalling3 size={18} />
            Contact Us Today
          </a>
          <a href="#consultation" className="btn-primary-outline">
            <IoIosMail size={18} />
            Get expert consultation
          </a>
        </div>

        {/* ✅ Fix 3 — duration-[800ms] + image styling screenshot jaisa */}
        <div
          className={`transition-all duration-[800ms] ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}>
          <img
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80"
            alt="Corporate team in a business meeting"
            className="lg:w-[70%] lg-[100%] h-auto block rounded-md mx-auto"
          
          />
        </div>

      </div>
    </section>
  );
}