import { IMG_BASE_URL_PUBLIC } from "../../helper/utils";
import HTMLContent from "../HTMLContent";

export default function OurProcess({ data }) {
  if (!data?.items?.length) return null;

  return (
    <section className="w-full py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        {data?.heading && (
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-14">
            {data.heading}
          </h2>
        )}

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {data.items.map((step, i) => (
            <div key={i} className="flex flex-col items-center text-center">

              {/* Logo */}
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mb-5"
                style={{ background: "#ebebf8" }}
              >
                {step?.our_process_icon ? (
                  <img
                    src={`${IMG_BASE_URL_PUBLIC()}${step.our_process_icon}`}
                    alt={step?.our_process_title ?? ''}
                    className="w-10 h-10 object-contain"
                  />
                ) : (
                  <span
                    className="text-2xl font-bold"
                    style={{ color: "#5b5bd6" }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                )}
              </div>

              {/* Title */}
              {step?.our_process_title && (
                <h3 className="font-bold text-gray-900 text-base mb-2">
                  {step.our_process_title}
                </h3>
              )}

              {/* Description */}
              {step?.our_process_description && (
                <p className="text-gray-500 text-sm leading-relaxed max-w-[200px]">
                  <HTMLContent data={step?.our_process_description}/>
                </p>
              )}

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}