import { useEffect, useRef, useState } from "react";
import HTMLContent from "../HTMLContent";

function stripHtml(html = '') {
  return html?.replace(/<[^>]*>/g, '').trim() ?? '';
}

// Parse "400+" → { value: 400, suffix: "+" }
// Parse "7 Million" → { value: 7, suffix: " Million" }
function parseCount(countStr = '') {
  const str = String(countStr ?? '');
  const match = str.match(/^([\d,]+)(.*)/);
  if (!match) return { value: 0, suffix: '' };
  return {
    value: parseInt(match[1].replace(/,/g, ''), 10),
    suffix: match[2] ?? '',
  };
}

function formatNumber(num) {
  return num.toLocaleString('en-US');
}

function useCounter(target, duration = 2000, started = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!started) return;
    let startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(target);
    }

    requestAnimationFrame(step);
  }, [started, target, duration]);

  return count;
}

function StatCard({ stat, index, total, started }) {
  const { value, suffix } = parseCount(stat?.impact_count);
  const count = useCounter(value, 2000 + index * 150, started);
  const isLast = index === total - 1;

  return (
    <div
      className="flex-1 min-w-[160px] px-6 py-10 text-center"
      style={{ borderRight: isLast ? 'none' : '1px solid #e5e5e5' }}
    >
      <div className="lg:text-[1.5rem] font-semibold">
        {formatNumber(count)}{suffix}
      </div>
      <div className="font-semibold text-black mb-2">
        {stat?.impact_title}
      </div>
      <HTMLContent data={stat?.impact_description}/>
    </div>
  );
}

export default function StatsSection({ data = [] }) {
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

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

  if (!data?.length) return null;

  return (
    <section
      ref={ref}
      className="w-full border-t border-b"
      style={{ borderColor: '#e5e5e5', background: '#fff' }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-nowrap overflow-x-auto">
          {data.map((stat, i) => (
            <StatCard
              key={i}
              stat={stat}
              index={i}
              total={data.length}
              started={started}
            />
          ))}
        </div>
      </div>
    </section>
  );
}