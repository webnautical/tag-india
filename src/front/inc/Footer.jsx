// import ScrollToTop from '../../components/ScrollToTop';
import { ChevronRight } from 'lucide-react';
import { FaYoutube, FaLinkedinIn, FaTwitter, FaFacebookF, FaInstagram } from 'react-icons/fa';
import logo from '../../assets/img/logo.png';
import ScrollToTop from '../../components/ScrollTopTop';
import { IoIosMail } from 'react-icons/io';
import { MdWifiCalling3 } from 'react-icons/md';
import FooterMobileMenu from '../../components/FooterMobileMenu';

const SERVICES = [
  'Impact Assessment',
  'Assessments - Online, Pen & Paper, A.I.',
  'CSR and ESG Consultancy',
  'Software development',
];

const USEFUL_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Gallery', href: '/gallery' },
];

const SUPPORT = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms & Condition', href: '/terms' },
];

const SOCIALS = [
  { icon: <FaYoutube size={15} />, href: '#', bg: '#4A4A4C', label: 'YouTube' },
  { icon: <FaLinkedinIn size={20} />, href: '#', bg: '#4A4A4C', label: 'LinkedIn' },
  { icon: <FaTwitter size={20} />, href: '#', bg: '#4A4A4C', label: 'Twitter' },
  { icon: <FaFacebookF size={20} />, href: '#', bg: '#4A4A4C', label: 'Facebook' },
  { icon: <FaInstagram size={20} />, href: '#', bg: '#4A4A4C', label: 'Instagram' },
];

// ✅ Fix 2 — sirf ek export default, bottom wala hatao
export default function Footer() {
  return (
    // ✅ Fix 3 — sirf ek fragment, nested fragment hatao
    <>
      <footer className="bg-[#232326] text-white sm:m-2 m-1 rounded-lg footer_section">
        {/* ── Top CTA Bar ── */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-5 py-6">

            <div className="flex-shrink-0">
              <img src={logo} alt="TAG India" className="h-14 w-auto object-contain" />
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-5">
              <h3 className="text-lg sm:text-xl font-bold text-white whitespace-nowrap">
                Are You Ready To Get Started?
              </h3>
              <a
                href="/request-demo"
                className="demo-btn flex items-center gap-1.5 bg-[#6A1B9A] text-white font-semibold text-sm px-5 py-2.5 rounded-lg whitespace-nowrap"
              >
                Request A Demo
                <ChevronRight size={15} className="demo-chevron" />
              </a>
            </div>
          </div>

          <div className="border-t border-white/10" />

          {/* ── Main Footer Grid ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-14">

            <div>
              <h4 className="text-white font-semibold text-base sm:mb-6 mb-2">Services</h4>
              <ul className="space-y-4">
                {SERVICES.map((s) => (
                  <li key={s}>
                    <a href="/services" className="footer-link  text-[#B5B5B5] font-semibold">
                      {s}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold text-base sm:mb-6 mb-2">Usefull Links</h4>
              <ul className="space-y-4">
                {USEFUL_LINKS.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="footer-link text-[#B5B5B5] font-semibold ">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold text-base sm:mb-6 mb-2">Support</h4>
              <ul className="space-y-4">
                {SUPPORT.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="footer-link  text-[#B5B5B5] font-semibold">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold text-base sm:mb-6 mb-2">Contact</h4>
              <ul className="space-y-4">
                <li>
                  <a
                    href="mailto:info@tagindia.co.in"
                    className="footer-link flex items-center gap-2.5 text-[#B5B5B5] font-semibold"
                  >
                    <MdWifiCalling3 size={20} className="text-white flex-shrink-0" />
                    info@tagindia.co.in
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+918955009371"
                    className="footer-link flex items-center gap-2.5 text-[#B5B5B5] font-semibold"
                  >
                    <IoIosMail size={20} className="text-white flex-shrink-0" />
                    +91-8955009371
                  </a>
                </li>
              </ul>

              <div className="flex items-center gap-2.5 mt-6">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="social-btn w-9 h-9 rounded-lg flex items-center justify-center text-white flex-shrink-0"
                    style={{ backgroundColor: s.bg }}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* ── Bottom Bar ── */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-7 flex justify-center">
          <p className=" text-sm flex items-center gap-1.5">
            Made With
            <span className="text-red-500 text-base"><svg width="17" height="14" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.0189 1.76728C15.4102 0.96756 14.5504 0.395653 13.5776 0.143429C12.6047 -0.108795 11.5753 -0.0266928 10.6548 0.376545C9.83082 0.732106 9.09597 1.33158 8.5 2.12712C7.90403 1.32963 7.16918 0.730161 6.34524 0.376545C5.42468 -0.0266928 4.39529 -0.108795 3.42245 0.143429C2.4496 0.395653 1.58978 0.96756 0.981098 1.76728C0.339222 2.60833 0 3.65945 0 4.80666C0 6.45764 0.9846 8.2689 2.92618 10.1922C4.50831 11.7588 6.37792 13.0417 7.35124 13.6669C7.69418 13.8864 8.09283 14.003 8.5 14.003C8.90717 14.003 9.30582 13.8864 9.64876 13.6669C10.6213 13.0417 12.4917 11.7588 14.0738 10.1922C16.0154 8.26968 17 6.45764 17 4.80666C17 3.65945 16.6608 2.60833 16.0189 1.76728Z" fill="#F9595F" />
            </svg>
            </span>
            By Web Nautical
          </p>
        </div>

      </footer>
      <FooterMobileMenu />

      <ScrollToTop />
    </>
  );
}