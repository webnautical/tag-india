import { IMG_BASE_URL_PUBLIC } from "../../helper/utils";
import HTMLContent from "../HTMLContent";

function stripHtml(html = '') {
  return html?.replace(/<[^>]*>/g, '').trim() ?? '';
}

const ICON_COLORS = [
  "#5b5bd6", "#e04f4f", "#e07a3b",
  "#3cb371", "#5b5bd6", "#3cb371",
];

export default function WhatWeSolve({ data }) {
  if (!data?.items?.length) return null;

  return (
    <section className="w-full py-16 px-4" style={{ background: "#e8ecf8" }}>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 items-center">

          {/* Left — Text */}
          <div className="lg:w-[300px] flex-shrink-0">
            {data?.heading && (
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {data.heading}
              </h2>
            )}
            {data?.subHeading && (
              <p className="text-gray-500 text-sm leading-relaxed">
                {data.subHeading}
              </p>
            )}
          </div>

          {/* Right — Cards Grid */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {data.items.map((item, i) => {
              const color = ICON_COLORS[i % ICON_COLORS.length];
              return (
                <div
                  key={i}
                  className="flex items-center gap-4 bg-white rounded-2xl px-5 py-5"
                  style={{ boxShadow: "0 1px 6px rgba(0,0,0,0.06)" }}
                >
                  {/* Logo */}
                  <div
                    className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{ background: `${color}18` }}
                  >
                    {item?.what_we_solve_icon ? (
                      <img
                        src={`${IMG_BASE_URL_PUBLIC()}${item.what_we_solve_icon}`}
                        alt=""
                        className="w-6 h-6 object-contain"
                      />
                    ) : (
                      <span
                        className="text-lg font-bold"
                        style={{ color }}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    )}
                  </div>

                  {/* Text */}
                  <p className="text-gray-700 text-sm font-medium leading-snug">
                    <HTMLContent data={item?.what_we_solve_description}/>
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}