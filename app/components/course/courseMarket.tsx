'use client';

import { motion, animate, useInView } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';

function CountUpOnce({ value, prefix = '', suffix = '', decimals = 0, start = false, duration = 1.2 }: { value: number; prefix?: string; suffix?: string; decimals?: number; start?: boolean; duration?: number }) {
  const [display, setDisplay] = useState(`${prefix}${(0).toFixed(decimals)}${suffix}`);
  useEffect(() => {
    if (!start) return;
    const controls = animate(0, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(`${prefix}${v.toFixed(decimals)}${suffix}`),
    });
    return () => controls.stop();
  }, [start, value, prefix, suffix, decimals, duration]);
  return <span className="tabular">{display}</span>;
}

export default function CourseMarket() {
  const stats = useMemo(
    () => [
      { id: 1, items: [{ v: 24.82, s: 'B', d: 2 }, { v: 234.64, s: 'B', d: 2 }], label: 'AI Cybersecurity Market by 2032' },
      { id: 2, items: [{ v: 4.8, s: ' Million', d: 1 }], label: 'Unfilled Cybersecurity Roles Globally' },
      { id: 3, items: [{ v: 70, s: '%', d: 0 }], label: 'Lack Training for Agentic AI Risks' },
      { id: 4, items: [{ v: 2.5, s: 'B', d: 1 }, { v: 65, s: 'B', d: 0 }], label: 'Agentic AI Security Services Growth' },
    ],
    []
  );

  return (
    <section className="relative w-full overflow-hidden py-24" style={{ backgroundColor: 'var(--surface)' }}>
      <div className="container mx-auto max-w-7xl px-6 md:px-8">
        <div className="text-headline text-2xl md:text-3xl font-semibold mb-8">AI Security Is Entering a Dangerous New Phase</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8" style={{ gridAutoRows: '1fr' }}>
          {stats.map((card, i) => (
            <StatCard key={card.id} index={i} items={card.items} label={card.label} />
          ))}
        </div>
        <div className="mt-8 text-muted text-sm">
          <div>Autonomous agents are already deployed in production.</div>
          <div>Security talent has not caught up.</div>
        </div>
      </div>
    </section>
  );
}

function StatCard({ index, items, label }: { index: number; items: Array<{ v: number; s: string; d: number }>; label: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px -10% 0px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.4, delay: index * 0.08 }}
      className="rounded-[20px] ring-1 ring-white/10 bg-white/5 backdrop-blur-sm p-6 md:p-7 overflow-hidden min-h-[160px]"
    >
      <div className="text-headline text-2xl sm:text-3xl font-semibold">
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
          {items.length === 2 ? (
            <>
              <CountUpOnce value={items[0].v} suffix={items[0].s} decimals={items[0].d} start={inView} />
              <span className="text-white/60">→</span>
              <CountUpOnce value={items[1].v} suffix={items[1].s} decimals={items[1].d} start={inView} />
            </>
          ) : (
            <CountUpOnce value={items[0].v} suffix={items[0].s} decimals={items[0].d} start={inView} />
          )}
        </div>
      </div>
      <div className="mt-2 text-body text-xs sm:text-sm leading-snug break-words">{label}</div>
    </motion.div>
  );
}
