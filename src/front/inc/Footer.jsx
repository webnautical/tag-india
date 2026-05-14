// src/components/Footer.jsx
import { ChevronRight } from 'lucide-react';
import { FaYoutube, FaLinkedinIn, FaTwitter, FaFacebookF, FaInstagram } from 'react-icons/fa';
import { IoIosMail } from 'react-icons/io';
import { MdWifiCalling3 } from 'react-icons/md';
import { Link } from 'react-router-dom';
import ScrollToTop from '../../components/ScrollTopTop';
import FooterMobileMenu from '../../components/FooterMobileMenu';
import { IMG_BASE_URL } from '../../helper/utils';
import { useGetPageMenuQuery, useGetServicesMenuQuery, useGetSettingsQuery } from '../../api/TagIndiaAPI';
import logo from '../../assets/img/logo.png';
import { USEFUL_LINKS } from '../../helper/utils';


export default function Footer() {
  const { data: settingsData, isLoading } = useGetSettingsQuery();
  const settings = settingsData?.data;

  const { data: servicesMenuRes } = useGetServicesMenuQuery();

  const servicesMenuItems = servicesMenuRes?.data

  const { data: menuData, isError } = useGetPageMenuQuery();
  const supportLinks =
    menuData?.data?.map((item) => ({
      label: item.title1,
      href: `/${item.url}`,
    })) ?? [];

  const dynamicSocials = [
    { icon: <FaYoutube size={15} />, href: settings?.youtube_url || '#', bg: '#4A4A4C', label: 'YouTube' },
    { icon: <FaLinkedinIn size={20} />, href: settings?.linkedin_url || '#', bg: '#4A4A4C', label: 'LinkedIn' },
    { icon: <FaTwitter size={20} />, href: settings?.twitter_url || '#', bg: '#4A4A4C', label: 'Twitter' },
    { icon: <FaFacebookF size={20} />, href: settings?.facebook_url || '#', bg: '#4A4A4C', label: 'Facebook' },
    { icon: <FaInstagram size={20} />, href: settings?.instagram_url || '#', bg: '#4A4A4C', label: 'Instagram' },
  ];

  // Loading state
  if (isLoading) {
    return (
      <footer className="bg-[#232326] text-white sm:m-2 m-1 rounded-lg p-8 text-center">
        Loading footer...
      </footer>
    );
  }

  const contactEmail = settings?.footer_email || settings?.contact_email || 'info@tagindia.co.in';
  const contactPhone = settings?.footer_phone || settings?.contact_phone || '+91-8955009371';
  const logoUrl = settings?.logo ? `${IMG_BASE_URL()}${settings.logo}` : logo;
  const copyrightText = settings?.copyright || 'Copyright © 2026 TAG India. All Rights Reserved.';

  return (
    <>
      <footer className="bg-[#232326] text-white sm:m-2 m-1 rounded-lg footer_section">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top CTA Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-5 py-6">
            <div className="flex-shrink-0">
              <img src={logoUrl} alt="TAG India" className="h-14 w-auto object-contain" />
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-5">
              <h3 className="text-lg sm:text-xl font-bold text-white whitespace-nowrap">
                Are You Ready To Get Started?
              </h3>
              <Link to="/contact"  // Changed from /request-demo to a valid page
                className="demo-btn flex items-center gap-1.5 bg-[#6A1B9A] text-white font-semibold text-sm px-5 py-2.5 rounded-lg whitespace-nowrap"
              >
                Request A Demo
                <ChevronRight size={15} className="demo-chevron" />
              </Link>
            </div>
          </div>

          <div className="border-t border-white/10" />

          {/* Main Footer Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-14">
            {/* Services */}
            <div>
              <h4 className="text-white font-semibold text-base sm:mb-6 mb-2">Services</h4>
              <ul className="space-y-4">
                {servicesMenuItems?.map((item, i) => (
                  <li key={i}>
                    <Link to={`/services/${item.slug}`} className="footer-link text-[#B5B5B5] font-semibold">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Useful Links */}
            <div>
              <h4 className="text-white font-semibold text-base sm:mb-6 mb-2">Useful Links</h4>
              <ul className="space-y-4">
                {USEFUL_LINKS.map((l) => (
                  <li key={l.label}>
                    <Link to={l.href} className="footer-link text-[#B5B5B5] font-semibold">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-white font-semibold text-base sm:mb-6 mb-2">Support</h4>
              {!isError && (
                <ul className="space-y-4">
                  {supportLinks.map((l) => (
                    <li key={l.href}>
                      <Link to={l.href} className="footer-link text-[#B5B5B5] font-semibold">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Contact & Socials (dynamic) */}
            <div>
              <h4 className="text-white font-bold text-base sm:mb-6 mb-2">Contact</h4>
              <ul className="space-y-4">
                <li>
                  <a
                    href={`mailto:${contactEmail}`}
                    className="footer-link flex items-center gap-2.5 text-[#B5B5B5] font-semibold"
                  >
                    <IoIosMail size={20} className="text-white flex-shrink-0" />
                    {contactEmail}
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${contactPhone.replace(/\s/g, '')}`}
                    className="footer-link flex items-center gap-2.5 text-[#B5B5B5] font-semibold"
                  >
                    <MdWifiCalling3 size={20} className="text-white flex-shrink-0" />
                    {contactPhone}
                  </a>
                </li>
              </ul>

              <div className="flex items-center gap-2.5 mt-6">
                {dynamicSocials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="social-btn w-9 h-9 rounded-lg flex items-center justify-center text-white flex-shrink-0"
                    style={{ backgroundColor: s.bg }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar (dynamic copyright) */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-7 flex justify-center">
          <p className="text-sm flex items-center gap-1.5">
            {copyrightText}
            <span className="text-red-500 text-base mx-1">❤️</span>
            Built by Web Nautical
          </p>
        </div>
      </footer>
      <FooterMobileMenu />
      <ScrollToTop />
    </>
  );
}