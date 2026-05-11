import { useEffect, useState } from "react";
import { IoIosMail } from "react-icons/io";
import { MdWifiCalling3 } from "react-icons/md";
import { IMG_BASE_URL_PUBLIC } from "../../helper/utils";

export default function HeroServiceSec({ data }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  if (!data) return null;

  return (
    <section
      className="relative py-16 lg:py-14"
      style={{
        background: "linear-gradient(180deg, rgba(106, 27, 154, 0.25) 0%, rgba(36, 9, 52, 0) 100%)"
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        {data?.title && (
          <h1 className="text-center text-3xl sm:text-4xl lg:text-[2rem] font-bold text-black mb-3 sm:leading-[2.5rem] leading-[2.5rem]">
            {data.title}
          </h1>
        )}

        {data?.subTitle && (
          <p className="text-[#636363] text-base sm:text-m leading-relaxed mx-auto mb-5 max-w-2xl">
            {data.subTitle}
          </p>
        )}

        <div className="flex flex-wrap items-center justify-center gap-5 mb-10">
          {data?.button1Text && (
            <a href={data?.button1Link ?? '#'} className="btn-primary">
              <MdWifiCalling3 size={18} />
              {data.button1Text}
            </a>
          )}
          {data?.button2Text && (
            <a href={data?.button2Link ?? '#'} className="btn-primary-outline">
              <IoIosMail size={18} />
              {data.button2Text}
            </a>
          )}
        </div>

        {data?.image && (
          <div
            className={`transition-all duration-[800ms] ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <img
              src={`${IMG_BASE_URL_PUBLIC()}${data.image}`}
              alt={data?.title ?? "Service"}
              className="lg:w-[70%] h-auto block rounded-md mx-auto"
            />
          </div>
        )}

      </div>
    </section>
  );
}