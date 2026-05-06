import React, { useEffect, useState } from 'react'
import TopHeader from '../../components/TopHeader'
import logo from '../../assets/img/logo.png'; // TAG logo
import { Menu, X, ChevronRight } from 'lucide-react';
const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about-us' },
  { label: 'Insights', href: '/insights' },
  { label: 'Contact', href: '/contact' },
];
export const Header = () => {
   const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);
  
  return (
    <div>
      <TopHeader></TopHeader>
       <header
        className={`bg-white w-full z-[99]  top-0 transition-all duration-300 ${
    scrolled
      ? "bg-white shadow-md backdrop-blur-md fixed left-0 top-0"
      : "bg-white"
  }`}
        
      >
        {/* Purple top border line */}
        <div className="h-1 w-full lg:block hidden bg-[#6A1B9A]" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">

            {/* Logo */}
            <a href="/" className="flex-shrink-0">
              <img
                src={logo}
                alt="TAG Logo"
                className="h-10 lg:h-12 w-auto object-contain"
              />
            </a>

            {/* Desktop Nav */}

            {/* Request Demo Button */}
            <nav className="hidden lg:flex items-center gap-10">
              {NAV_LINKS.map((link) => (
                 <a
                  key={link.label}
                  href={link.href}
                  className="text-black text-[15px] font-semibold hover:text-[#6A1B9A] transition-colors duration-200 relative group"
                >
                  {link.label}
                  {/* Underline on hover */}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#6A1B9A] group-hover:w-full transition-all duration-300" />
                </a>
              ))}
              <a 
                href="/request-demo"
                className="flex items-center gap-1.5 bg-[#6A1B9A] hover:bg-[#4e0f75] text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-all duration-200 hover:shadow-lg group"
              >
                Request Demo
                <ChevronRight
                  size={16}
                  className="group-hover:translate-x-0.5 transition-transform duration-200"
                />
              </a>
            </nav>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 rounded-lg text-black hover:bg-purple-50 hover:text-[#6A1B9A] transition-colors"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0  lg:hidden transition-all duration-300 z-[100] ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        />

        {/* Slide-in Panel */}
        <div
          className={`absolute right-0 top-0 bottom-0 w-72 bg-white shadow-2xl transition-transform duration-300 ${
            menuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Panel Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <img src={logo} alt="TAG" className="h-9 w-auto object-contain" />
            <button
              onClick={() => setMenuOpen(false)}
              className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500"
            >
              <X size={20} />
            </button>
          </div>

          {/* Nav Links */}
          <nav className="flex flex-col px-4 py-4 gap-1">
            {NAV_LINKS.map((link) => (
               <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="px-4 py-3 rounded-xl text-black font-semibold hover:bg-purple-50 hover:text-[#6A1B9A] transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>
          {/* CTA */}
          <div className="px-5 pt-2">
            <a
              href="/request-demo"
              className="flex items-center justify-center gap-1.5 w-full bg-[#6A1B9A] text-white font-semibold py-3 rounded-xl hover:bg-[#4e0f75] transition-colors"
            >
              Request Demo <ChevronRight size={16} />
            </a>
          </div>
        </div>
      </div>

    </div>
  )
}
