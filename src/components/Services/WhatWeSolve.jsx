import {
  MdBarChart,
  MdTrendingUp,
  MdNaturePeople,
  MdGavel,
  MdShowChart,
  MdAssignment,
} from "react-icons/md";

const problems = [
  {
    icon: <MdBarChart size={26} />,
    iconColor: "#5b5bd6",
    text: "Lack of clear business insights for informed and strategic decision-making",
  },
  {
    icon: <MdTrendingUp size={26} />,
    iconColor: "#e04f4f",
    text: "Inefficient operations and poor resource utilization affecting productivity",
  },
  {
    icon: <MdNaturePeople size={26} />,
    iconColor: "#e07a3b",
    text: "Weak ESG and CSR performance impacting sustainability and brand value",
  },
  {
    icon: <MdGavel size={26} />,
    iconColor: "#3cb371",
    text: "Compliance risks and legal gaps that can lead to business disruptions",
  },
  {
    icon: <MdShowChart size={26} />,
    iconColor: "#5b5bd6",
    text: "Poor strategic planning limiting growth and long-term success",
  },
  {
    icon: <MdAssignment size={26} />,
    iconColor: "#3cb371",
    text: "Gaps in performance tracking and reporting that limit visibility",
  },
];

export default function WhatWeSolve() {
  return (
    <section
      className="w-full py-16 px-4"
      style={{ background: "#e8ecf8" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 items-center">

          {/* ── Left — Text ── */}
          <div className="lg:w-[300px] flex-shrink-0">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What We Solve
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              We identify and address key business challenges that hinder
              growth, efficiency, and compliance—helping you build a stronger,
              more sustainable organization.
            </p>
          </div>

          {/* ── Right — Cards Grid ── */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {problems.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-4 bg-white rounded-2xl px-5 py-5"
                style={{
                  boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
                }}
              >
                {/* Icon */}
                <div
                  className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{
                    background: `${item.iconColor}18`,
                    color: item.iconColor,
                  }}
                >
                  {item.icon}
                </div>

                {/* Text */}
                <p className="text-gray-700 text-sm font-medium leading-snug">
                  {item.text}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}