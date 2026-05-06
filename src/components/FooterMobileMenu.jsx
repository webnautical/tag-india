import React, { useState } from "react";
import { Home, User, Briefcase, Phone, Sparkles } from "lucide-react";

const FooterMobileMenu = () => {
  const [active, setActive] = useState("home");

  const menu = [
    { name: "about", label: "About", icon: User },
    { name: "service", label: "Service", icon: Briefcase },
    { name: "contact", label: "Contact", icon: Phone },
    { name: "insight", label: "Insight", icon: Sparkles },
  ];

  return (
    <div className="fixed bottom-4 left-0 w-full flex justify-center z-50 px-3 footer_bar">
      
      {/* Floating Bar */}
      <div className="relative w-full bg-white backdrop-blur-xl shadow-2xl rounded-2xl px-6 py-3 flex items-center justify-between">
        
        {/* Left Items */}
          {menu.slice(0, 2).map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.name}
                onClick={() => setActive(item.name)}
                className={`flex flex-col items-center text-[11px] transition ${
                  active === item.name
                    ? "text-[#6A1B9A]"
                    : "text-gray-500"
                }`}
              >
                <Icon size={20} strokeWidth={2} />
                <span className="mt-1">{item.label}</span>
              </button>
            );
          })}

        {/* Center Button */}
        <div className="mt-[-50px]">
          <button
            onClick={() => setActive("home")}
            className="bg-[#6A1B9A] text-white p-4 rounded-full shadow-2xl border-4 border-white scale-105 active:scale-95 transition"
          >
            <Home size={22} />
          </button>
        </div>

        {/* Right Items */}
          {menu.slice(2).map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.name}
                onClick={() => setActive(item.name)}
                className={`flex flex-col items-center text-[11px] transition ${
                  active === item.name
                    ? "text-[#6A1B9A]"
                    : "text-gray-500"
                }`}
              >
                <Icon size={20} strokeWidth={2} />
                <span className="mt-1">{item.label}</span>
              </button>
            );
          })}

      </div>
    </div>
  );
};

export default FooterMobileMenu;