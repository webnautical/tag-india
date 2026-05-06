import { ArrowBigUp } from "lucide-react";
import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        })
      }
      className={`fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full 
      bg-[#6A1B9A] text-white shadow-lg 
      flex items-center justify-center text-lg 
      transition-all duration-300 hover:scale-110
      ${visible 
        ? "opacity-100 translate-y-0" 
        : "opacity-0 translate-y-4 pointer-events-none"
      }`}
      aria-label="Scroll to top"
    >
     <ArrowBigUp></ArrowBigUp>
    </button>
  );
}