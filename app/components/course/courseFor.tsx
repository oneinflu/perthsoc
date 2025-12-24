'use client';

import { motion } from 'framer-motion';
import { JSX, useRef, useState } from 'react';

type Role = {
  title: string;
  subtitle: string;
  icon: (props: { className?: string }) => JSX.Element;
  details: string;
};

const roles: Role[] = [
  {
    title: 'Cybersecurity Professionals',
    subtitle: 'Transition into AI & agentic security roles',
    icon: ShieldIcon,
    details: 'Bridge SOC practices with agentic threat defense, detection design, and secure agent workflows.',
  },
  {
    title: 'AI / ML Engineers',
    subtitle: 'Build secure autonomous systems',
    icon: GearIcon,
    details: 'Harden agent loops, toolchains, and memory against poisoning and misuse while maintaining performance.',
  },
  {
    title: 'Security & IT Managers',
    subtitle: 'Oversee enterprise AI deployments',
    icon: BriefcaseIcon,
    details: 'Operationalize governance, authorization, and incident playbooks for autonomous AI in production.',
  },
  {
    title: 'Cloud / Platform Architects',
    subtitle: 'Secure AI-native cloud workloads',
    icon: CloudIcon,
    details: 'Design least-privilege, policy-driven agent platforms across cloud boundaries and services.',
  },
];

export default function CourseFor() {
  const [open, setOpen] = useState<number | null>(null);
  const ref = useRef<HTMLElement | null>(null);

  return (
    <section ref={ref} className="relative w-full overflow-hidden py-24">
      <div className="container mx-auto max-w-7xl px-6 md:px-8">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.7 }} transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.5 }} className="text-headline text-2xl md:text-3xl font-semibold mb-1">Who This Program Is Designed For</motion.div>
        <motion.div initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.5, delay: 0.12 }} className="text-muted text-sm mb-10 max-w-[820px]">CAASP is built for professionals responsible for designing, securing, and governing autonomous AI systems.</motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8" style={{ gridAutoRows: '1fr' }}>
          {roles.map((r, i) => {
            const isOpen = open === i;
            const panelId = `for-panel-${i}`;
            const headerId = `for-header-${i}`;
            return (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
                transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.4, delay: i * 0.08 }}
                className="group h-full rounded-[20px] ring-1 ring-white/10 bg-white/5 backdrop-blur-sm p-6 md:p-7 flex flex-col relative overflow-hidden"
              >
                <div className="pointer-events-none absolute inset-0">
                  {i === 0 ? <NetworkDefense /> : i === 1 ? <NetworkEngineer /> : i === 2 ? <NetworkManager /> : <NetworkCloud />}
                </div>
                <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-cyan-300/70 to-transparent opacity-0 transition-opacity ease-lux dur-micro group-hover:opacity-100" />
                <button
                  id={headerId}
                  aria-controls={panelId}
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60"
                >
                  <div className="flex items-center gap-3">
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-[12px] bg-white/5 ring-1 ring-white/10 transition-all ease-lux dur-micro group-hover:shadow-[0_12px_36px_rgba(0,216,255,0.16)]">
                      <r.icon className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <div className="text-headline text-sm md:text-base font-semibold">{r.title}</div>
                      <div className="text-body text-xs md:text-sm">{r.subtitle}</div>
                    </div>
                  </div>
                </button>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={headerId}
                  className={`mt-4 overflow-hidden transition-[max-height] ease-lux dur-section ${isOpen ? 'max-h-[260px]' : 'max-h-0'}`}
                >
                  <div className="rounded-[12px] ring-1 ring-white/10 bg-white/5 p-4">
                    <div className="text-white text-sm font-semibold mb-1">Why CAASP matters for you</div>
                    <div className="text-body text-sm leading-relaxed">{r.details}</div>
                    <div className="mt-2 text-body text-sm">CAASP prepares you to handle real-world agentic threats relevant to your role.</div>
                  </div>
                </div>
                <div className="mt-auto"></div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ShieldIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 3l8 4v6c0 4-4 8-8 8s-8-4-8-8V7l8-4Z" /><path d="M9 12l3 3 4-4" /></svg>
  );
}

function GearIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="3" /><path d="M19 12a7 7 0 0 0-.3-2l2.1-1.6-2-3.4-2.5 1a7 7 0 0 0-1.7-1l-.3-2.7h-4l-.3 2.7a7 7 0 0 0-1.7 1l-2.5-1-2 3.4 2.1 1.6a7 7 0 0 0 0 4l-2.1 1.6 2 3.4 2.5-1a7 7 0 0 0 1.7 1l.3 2.7h4l.3-2.7a7 7 0 0 0 1.7-1l2.5 1 2-3.4-2.1-1.6c.2-.7.3-1.3.3-2Z" /></svg>
  );
}

function BriefcaseIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="7" width="18" height="12" rx="2" /><path d="M9 7V5h6v2" /></svg>
  );
}

function CloudIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M7 16a5 5 0 0 1 0-10 7 7 0 0 1 13 3h1a4 4 0 0 1 0 8H9" /></svg>
  );
}

function NetworkDefense() {
  return (
    <svg viewBox="0 0 400 240" className="absolute inset-0 w-full h-full" fill="none">
      <g stroke="rgba(255,255,255,0.18)" strokeWidth="1">
        <path d="M60 150C100 120 160 120 220 150" />
        <path d="M80 190C140 210 200 220 260 210" />
        <path d="M240 130C280 160 320 180 340 210" />
      </g>
      <g>
        <circle cx="60" cy="150" r="3" fill="rgba(255,60,60,0.25)" />
        <circle cx="220" cy="150" r="3" fill="rgba(0,216,255,0.35)" />
        <circle cx="240" cy="130" r="3" fill="rgba(255,60,60,0.25)" />
        <circle cx="340" cy="210" r="4" fill="rgba(0,216,255,0.45)" />
      </g>
      <g className="transition-opacity ease-lux dur-micro opacity-[0.08] group-hover:opacity-[0.14]" filter="url(#blurDef)">
        <circle cx="120" cy="120" r="2" fill="rgba(255,255,255,0.5)" />
        <circle cx="300" cy="180" r="2" fill="rgba(255,255,255,0.5)" />
      </g>
      <defs>
        <filter id="blurDef"><feGaussianBlur stdDeviation="1" /></filter>
      </defs>
    </svg>
  );
}

function NetworkEngineer() {
  return (
    <svg viewBox="0 0 400 240" className="absolute inset-0 w-full h-full" fill="none">
      <g stroke="rgba(255,255,255,0.18)" strokeWidth="1">
        <rect x="70" y="70" width="60" height="36" rx="4" />
        <rect x="170" y="70" width="60" height="36" rx="4" />
        <rect x="270" y="70" width="60" height="36" rx="4" />
        <path d="M130 88L170 88" />
        <path d="M230 88L270 88" />
        <path d="M200 106L200 160" />
        <rect x="170" y="160" width="60" height="36" rx="4" />
      </g>
      <g className="transition-opacity ease-lux dur-micro opacity-[0.08] group-hover:opacity-[0.14]" filter="url(#blurEng)">
        <circle cx="200" cy="88" r="2" fill="rgba(0,216,255,0.5)" />
        <circle cx="200" cy="178" r="2" fill="rgba(255,255,255,0.5)" />
      </g>
      <defs>
        <filter id="blurEng"><feGaussianBlur stdDeviation="1" /></filter>
      </defs>
    </svg>
  );
}

function NetworkManager() {
  return (
    <svg viewBox="0 0 400 240" className="absolute inset-0 w-full h-full" fill="none">
      <g stroke="rgba(255,255,255,0.18)" strokeWidth="1">
        <circle cx="200" cy="120" r="18" />
        <circle cx="110" cy="80" r="10" />
        <circle cx="290" cy="80" r="10" />
        <circle cx="110" cy="170" r="10" />
        <circle cx="290" cy="170" r="10" />
        <path d="M118 88L190 112" />
        <path d="M282 88L210 112" />
        <path d="M118 162L190 128" />
        <path d="M282 162L210 128" />
      </g>
      <g className="transition-opacity ease-lux dur-micro opacity-[0.08] group-hover:opacity-[0.14]" filter="url(#blurMgr)">
        <circle cx="200" cy="120" r="3" fill="rgba(0,216,255,0.5)" />
      </g>
      <defs>
        <filter id="blurMgr"><feGaussianBlur stdDeviation="1" /></filter>
      </defs>
    </svg>
  );
}

function NetworkCloud() {
  return (
    <svg viewBox="0 0 400 240" className="absolute inset-0 w-full h-full" fill="none">
      <g stroke="rgba(255,255,255,0.18)" strokeWidth="1">
        <rect x="70" y="60" width="80" height="32" rx="4" />
        <rect x="250" y="60" width="80" height="32" rx="4" />
        <path d="M150 76L250 76" />
        <rect x="160" y="120" width="80" height="32" rx="4" />
        <path d="M110 92L160 136" />
        <path d="M320 92L240 136" />
      </g>
      <g className="transition-opacity ease-lux dur-micro opacity-[0.08] group-hover:opacity-[0.14]" filter="url(#blurCloud)">
        <circle cx="160" cy="136" r="2" fill="rgba(0,216,255,0.5)" />
        <circle cx="240" cy="136" r="2" fill="rgba(0,216,255,0.5)" />
      </g>
      <defs>
        <filter id="blurCloud"><feGaussianBlur stdDeviation="1" /></filter>
      </defs>
    </svg>
  );
}
