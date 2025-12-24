'use client';

import { motion } from 'framer-motion';
import type { ComponentType } from 'react';

export default function CourseWhat() {
  const pillars = [
    { title: 'Agentic AI Threat Defense', icon: ShieldIcon, offset: { x: -14, y: 8 }, rot: -1.5 },
    { title: 'Multi-Agent System Security', icon: NetworkIcon, offset: { x: 10, y: -14 }, rot: 1.2 },
    { title: 'AI Application & RAG Security', icon: DocSearchIcon, offset: { x: -8, y: -6 }, rot: -0.8 },
    { title: 'Governance, Compliance & Risk', icon: GovernanceIcon, offset: { x: 12, y: 8 }, rot: 1.0 },
    { title: 'Red Teaming Autonomous Systems', icon: RadarIcon, offset: { x: -10, y: 12 }, rot: -1.2 },
  ];

  return (
    <section className="relative w-full overflow-hidden py-24">
      <div className="container mx-auto max-w-7xl px-6 md:px-8 text-center">
        <motion.div initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.7 }} transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.5 }} className="text-headline text-2xl md:text-3xl font-semibold">Introducing CAASP</motion.div>
        <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.5, delay: 0.15 }} className="mx-auto mt-3 h-[2px] w-[180px] origin-left bg-gradient-to-r from-white/60 to-transparent" />
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.6, delay: 0.25 }} className="mt-4 mx-auto max-w-[900px] text-body text-sm md:text-base leading-relaxed">
          CAASP (Certified Agentic AI Security Professional) is a 120-hour advanced certification designed to prepare professionals to secure autonomous, goal-driven AI agents and multi-agent ecosystems.
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-7 md:gap-10 isolate"
          style={{ gridAutoRows: '1fr' }}
        >
          {pillars.map((p, i) => (
            <Pillar key={p.title} index={i} title={p.title} Icon={p.icon} offset={p.offset} rot={p.rot} />
          ))}
        </motion.div>
      </div>
      <style jsx>{`
        .floaty { animation: floatY 6s ease-in-out infinite; }
        @keyframes floatY { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
      `}</style>
    </section>
  );
}

function Pillar({ index, title, Icon, offset, rot }: { index: number; title: string; Icon: ComponentType<{ className?: string }>; offset: { x: number; y: number }; rot: number }) {
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, scale: 0.98, x: offset.x, y: offset.y, rotate: rot }}
      whileInView={{ opacity: 1, scale: 1, x: 0, y: 0, rotate: 0 }}
      whileHover={{ y: -1, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
      transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.5, delay: index * 0.07 }}
      className="pill group relative z-0 rounded-[20px] ring-1 ring-white/10 bg-white/5 p-6 md:p-7 text-left overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60 hover:z-[1] min-h-[150px] flex flex-col"
    >
      <div className="floaty inline-flex h-12 w-12 items-center justify-center rounded-[12px] bg-white/5 ring-1 ring-white/10 transition-transform ease-lux dur-micro">
        <Icon className="h-6 w-6 text-accent transition-transform ease-lux dur-micro group-hover:rotate-[2deg]" />
      </div>
      <div className="mt-3 text-body text-sm md:text-base leading-snug transition-colors ease-lux dur-micro group-hover:text-headline break-words">
        {title}
      </div>
    </motion.button>
  );
}

function ShieldIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 3l8 4v6c0 4-4 8-8 8s-8-4-8-8V7l8-4Z" />
      <path d="M9 12l3 3 4-4" />
    </svg>
  );
}

function NetworkIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="6" cy="6" r="2" /><circle cx="18" cy="6" r="2" /><circle cx="12" cy="16" r="2" />
      <path d="M8 7l4 8m8-9l-8 9" />
    </svg>
  );
}

function DocSearchIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="4" y="3" width="12" height="16" rx="2" />
      <path d="M8 8h6M8 12h4" />
      <circle cx="17" cy="17" r="3" />
      <path d="M19.2 19.2 21 21" />
    </svg>
  );
}

function GovernanceIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M6 18h12" />
      <path d="M9 6h6M8 10h8M7 14h10" />
    </svg>
  );
}

function RadarIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 12l5-3" />
      <path d="M12 12l-2 6" />
    </svg>
  );
}
