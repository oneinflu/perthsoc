'use client';

import { motion } from 'framer-motion';
import { JSX, useEffect, useMemo, useRef, useState } from 'react';

type Outcome = { title: string; desc: string; icon: (props: { className?: string }) => JSX.Element };

const outcomes: Outcome[] = [
  { title: 'AI Security Engineer', desc: 'Secure LLMs, agents, RAG pipelines', icon: ShieldIcon },
  { title: 'Agentic AI Threat Analyst', desc: 'Model and detect multi-agent attacks', icon: RadarIcon },
  { title: 'AI Governance & Compliance Officer', desc: 'Lead ISO 42001, EU AI Act readiness', icon: GovernanceIcon },
  { title: 'AI Red Teamer', desc: 'Exploit agentic systems offensively', icon: TargetIcon },
  { title: 'Cloud Security Architect (AI)', desc: 'Secure AI workloads & integrations', icon: CloudIcon },
];

export default function CourseOutcomes() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);
  const items = useMemo(() => outcomes, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handler = () => {
      const cards = Array.from(el.querySelectorAll('.oc-card')) as HTMLElement[];
      const center = el.scrollLeft + el.clientWidth / 2;
      let nearest = 0;
      let minDist = Infinity;
      cards.forEach((c, i) => {
        const rectLeft = c.offsetLeft + c.clientWidth / 2;
        const d = Math.abs(rectLeft - center);
        if (d < minDist) { minDist = d; nearest = i; }
      });
      setActive(nearest);
    };
    handler();
    el.addEventListener('scroll', handler, { passive: true });
    return () => el.removeEventListener('scroll', handler as EventListener);
  }, []);

  return (
    <section className="relative w-full overflow-hidden py-24">
      <div className="container mx-auto max-w-7xl px-6 md:px-8">
        <div className="text-headline text-2xl md:text-3xl font-semibold mb-3">CAREER OUTCOMES</div>
        <div className="text-muted text-sm mb-8 max-w-[760px]">Distinct roles with interactive exploration and clear next steps.</div>
        <div className="relative">
          <div className="pointer-events-none absolute inset-0 rounded-[24px]" style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.06)' }}></div>
          <div ref={containerRef} className="relative overflow-x-auto no-scrollbar snap-x snap-mandatory px-1" style={{ scrollPadding: '24px' }}>
            <div className="flex items-stretch gap-5 md:gap-7">
              {items.map((o, i) => (
                <OutcomeCard key={o.title} outcome={o} index={i} active={active === i} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .no-scrollbar { scrollbar-width: none; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
}

function OutcomeCard({ outcome, index, active }: { outcome: Outcome; index: number; active: boolean }) {
  const scale = active ? 1.04 : 0.98;
  const glow = active ? '0 14px 44px rgba(0,216,255,0.18)' : '0 0 0 rgba(0,0,0,0)';
  const Icon = outcome.icon;
  return (
    <motion.div
      className="oc-card snap-center min-w-[280px] sm:min-w-[320px] md:min-w-[360px] lg:min-w-[380px] rounded-[20px] ring-1 ring-white/10 bg-white/5 backdrop-blur-sm p-6 md:p-7"
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
      transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.4, delay: index * 0.05 }}
      style={{ transform: `scale(${scale})`, boxShadow: glow }}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="inline-flex h-11 w-11 items-center justify-center rounded-[12px] bg-white/5 ring-1 ring-white/10">
          <Icon className="h-6 w-6 text-accent" />
        </div>
        <div className="text-headline text-sm md:text-base font-semibold">{outcome.title}</div>
      </div>
      <div className="text-body text-sm leading-relaxed">{outcome.desc}</div>
    </motion.div>
  );
}

function ShieldIcon({ className = '' }: { className?: string }) {
  return (<svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 3l8 4v6c0 4-4 8-8 8s-8-4-8-8V7l8-4Z" /><path d="M9 12l3 3 4-4" /></svg>);
}
function RadarIcon({ className = '' }: { className?: string }) {
  return (<svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="9" /><path d="M12 12l5-3" /><path d="M12 12l-2 6" /></svg>);
}
function GovernanceIcon({ className = '' }: { className?: string }) {
  return (<svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M6 18h12" /><path d="M9 6h6M8 10h8M7 14h10" /></svg>);
}
function TargetIcon({ className = '' }: { className?: string }) {
  return (<svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="4" /><path d="M12 2v4M2 12h4M12 18v4M18 12h4" /></svg>);
}
function CloudIcon({ className = '' }: { className?: string }) {
  return (<svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M7 16a5 5 0 0 1 0-10 7 7 0 0 1 13 3h1a4 4 0 0 1 0 8H9" /></svg>);
}

