// src/components/TopHeader.jsx
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import {Download } from 'lucide-react';
import { MdWifiCalling3 } from 'react-icons/md';
import { IoIosMail} from 'react-icons/io';

export default function TopHeader() {
  return (
    <div className="bg-[#6A1B9A] px-4 sm:px-6 lg:px-4">
      <div className=" mx-auto flex flex-wrap items-center justify-between gap-y-2 py-2">

        {/* Left: Contact Info */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">

          <a
            href="tel:+919549165111"
            className="flex items-center gap-1.5 text-white text-xs sm:text-sm hover:text-purple-200 transition-colors whitespace-nowrap"
          >
            <MdWifiCalling3 size={18} />
            +91-9549165111
          </a>

          <span className="text-purple-400 text-xs hidden sm:inline">/</span>

            <a
            href="mailto:info@tagindia.co.in"
            className="flex items-center gap-1.5 text-white text-xs sm:text-sm hover:text-purple-200 transition-colors whitespace-nowrap"
          >
            <IoIosMail size={18} />
            info@tagindia.co.in
          </a>

        </div>

        {/* Right: Social + Blacklisted */}
        <div className="md:flex flex-wrap items-center gap-x-3 gap-y-1 hidden">

          <span className="text-white text-xs sm:text-sm font-medium whitespace-nowrap hidden sm:block">
            Follow Us On :
          </span>

          {/* Social Icons */}
          <div className="flex items-center gap-2">
            {[
              { href: '#', icon: <FaFacebookF size={11} />, label: 'Facebook' },
              { href: '#', icon: <FaInstagram size={11} />, label: 'Instagram' },
              { href: '#', icon: <FaXTwitter size={11} />, label: 'X' },
              { href: '#', icon: <FaYoutube size={11} />, label: 'YouTube' },
            ].map(({ href, icon, label }) => (
               <a 
                key={label}
                href={href}
                aria-label={label}
                className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              >
                {icon}
              </a>
            ))}
          </div>

          <span className="text-purple-400 text-xs">|</span>

          {/* Blacklisted Assessors */}
            <a
            href="#"
            className="flex items-center gap-1.5 text-white text-xs sm:text-sm font-medium hover:text-purple-200 transition-colors whitespace-nowrap"
          >
            <Download size={18} />
            Blacklisted Assessors
          </a>

        </div>
      </div>
    </div>
  );
}