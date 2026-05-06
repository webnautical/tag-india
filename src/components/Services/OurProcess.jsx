import { MdGroups, MdFolder, MdAssessment, MdBarChart } from "react-icons/md";

const steps = [
  {
    icon: <MdGroups size={32} />,
    title: "Initial Consultation",
    description:
      "Understanding your business goals and assessment requirements",
  },
  {
    icon: <MdFolder size={32} />,
    title: "Data Collection",
    description:
      "Gathering financial, operational, and ESG-related data",
  },
  {
    icon: <MdAssessment size={32} />,
    title: "Analysis & Evaluation",
    description:
      "Detailed assessment using qualitative and quantitative methods",
  },
  {
    icon: <MdBarChart size={32} />,
    title: "Reporting & Strategy",
    description:
      "Delivering insights with actionable recommendations",
  },
];

export default function OurProcess() {
  return (
    <section className="w-full py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-14">
          Our Process
        </h2>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {steps.map((step, i) => (
            <div key={i} className="flex flex-col items-center text-center">

              {/* Icon circle */}
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mb-5"
                style={{
                  background: "#ebebf8",
                  color: "#5b5bd6",
                }}
              >
                {step.icon}
              </div>

              {/* Title */}
              <h3 className="font-bold text-gray-900 text-base mb-2">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-gray-500 text-sm leading-relaxed max-w-[200px]">
                {step.description}
              </p>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}