import { useEffect, useRef, useState } from "react";

const stats = [
  {
    value: 400,
    suffix: "+",
    label: "Unique NGOs impacted",
    description:
      "Empowering businesses through digital transformation and modern technology solutions.",
  },
  {
    value: 38000,
    suffix: "",
    label: "Direct Beneficiaries",
    description:
      "From websites to enterprise platforms, we've built powerful digital solutions across industries.",
  },
  {
    value: 7,
    suffix: " Million",
    label: "Indirect Beneficiaries",
    description:
      "Client satisfaction is at the core of what we do — building trust through performance.",
  },
  {
    value: 1650,
    suffix: "+",
    label: "Volunteers Involved",
    description:
      "Client satisfaction is at the core of what we do — building trust through performance.",
  },
  {
    value: 1650,
    suffix: "+",
    label: "Volunteers Involved",
    description:
      "Client satisfaction is at the core of what we do — building trust through performance.",
  },
];

const totalStats = stats.length;

// Format number with commas
function formatNumber(num) {
  return num.toLocaleString("en-US");
}

// Single counter hook
function useCounter(target, duration = 2000, started = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!started) return;

    let startTime = null;
    const startValue = 0;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease out
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * (target - startValue) + startValue));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(target);
    }

    requestAnimationFrame(step);
  }, [started, target, duration]);

  return count;
}

// Individual stat card
function StatCard({ stat, index, started }) {
  const count = useCounter(stat.value, 2000 + index * 150, started);
  const isLast = index === totalStats - 1;

  return (
    <div
      className="flex-1 min-w-[160px] px-6 py-10 text-center"
      style={{
        borderRight: isLast ? "none" : "1px solid #e5e5e5",}}>
      {/* Number */}
      <div
        className="lg:text-[1.5rem] font-semibold">
        {formatNumber(count)}
        {stat.suffix}
      </div>
      {/* Label */}
      <div
        className="font-semibold text-black mb-2">
        {stat.label}
      </div>
      {/* Description */}
      <p>
        {stat.description}
      </p>
    </div>
  );
}

export default function StatsSection() {
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  // Start counter when section is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="w-full border-t border-b"
      style={{ borderColor: "#e5e5e5", background: "#fff" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-nowrap overflow-x-auto">
          {stats.map((stat, i) => (
            <StatCard key={i} stat={stat} index={i} started={started} />
          ))}
        </div>
      </div>
    </section>
  );
}