// src/components/TopHeader.jsx
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { Download } from 'lucide-react';
import { MdWifiCalling3 } from 'react-icons/md';
import { IoIosMail } from 'react-icons/io';
import { useGetSettingsQuery } from '../api/TagIndiaAPI';

export default function TopHeader() {
  const { data: settingsData, isLoading } = useGetSettingsQuery();
  const settings = settingsData?.data;

  // Same keys as ContactForm: contact_email / contact_phone first
  const phone = settings?.contact_phone || settings?.footer_phone || '+91-9549165111';
  const email = settings?.contact_email || settings?.footer_email || 'info@tagindia.co.in';

  const socialLinks = [
    { href: settings?.facebook_url, icon: <FaFacebookF size={11} />, label: 'Facebook' },
    { href: settings?.instagram_url, icon: <FaInstagram size={11} />, label: 'Instagram' },
    { href: settings?.twitter_url, icon: <FaXTwitter size={11} />, label: 'X' },
    { href: settings?.youtube_url, icon: <FaYoutube size={11} />, label: 'YouTube' },
  ].filter(social => social.href && social.href !== '#');

  if (isLoading) {
    return (
      <div className="bg-[#6A1B9A] px-4 py-2 text-white text-center text-sm">
        Loading contact info...
      </div>
    );
  }

  return (
    <div className="bg-[#6A1B9A] px-4 sm:px-6 lg:px-4">
      <div className="mx-auto flex flex-wrap items-center justify-between gap-y-2 py-2">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <a href={`tel:${phone.replace(/\s/g, '')}`} className="flex items-center gap-1.5 text-white text-xs sm:text-sm hover:text-purple-200">
            <MdWifiCalling3 size={18} />
            {phone}
          </a>
          <span className="text-purple-400 text-xs hidden sm:inline">/</span>
          <a href={`mailto:${email}`} className="flex items-center gap-1.5 text-white text-xs sm:text-sm hover:text-purple-200">
            <IoIosMail size={18} />
            {email}
          </a>
        </div>

        <div className="md:flex flex-wrap items-center gap-x-3 gap-y-1 hidden">
          {socialLinks.length > 0 && (
            <>
              <span className="text-white text-xs sm:text-sm font-medium hidden sm:block">Follow Us On :</span>
              <div className="flex items-center gap-2">
                {socialLinks.map(({ href, icon, label }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                     className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center text-white hover:bg-white/30">
                    {icon}
                  </a>
                ))}
              </div>
              <span className="text-purple-400 text-xs">|</span>
            </>
          )}
          <a href="#" className="flex items-center gap-1.5 text-white text-xs sm:text-sm font-medium hover:text-purple-200">
            <Download size={18} />
            Blacklisted Assessors
          </a>
        </div>
      </div>
    </div>
  );
}