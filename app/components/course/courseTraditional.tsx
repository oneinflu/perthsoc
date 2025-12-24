'use client';

import { motion } from 'framer-motion';

export default function CourseTraditional() {
  const left = [
    'Prompt injection basics',
    'LLM vulnerabilities',
    'Static AI risk models',
  ];
  const right = [
    'Memory poisoning',
    'Tool & API misuse',
    'Agent authorization hijacking',
    'Multi-agent failures',
    'Autonomous governance gaps',
  ];

  const listVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
  const itemVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: { opacity: 1, y: 0 },
  };

  const LeftIcon = ({ i }: { i: number }) => (
    i === 0 ? (
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-white/60" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 6h18M8 6l2-3h4l2 3M6 6l-2 14h16L18 6"/></svg>
    ) : i === 1 ? (
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-white/60" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="4" width="18" height="14" rx="2"/><path d="M7 10h10M7 14h6"/></svg>
    ) : i === 2 ? (
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-white/60" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 3l8 4v6c0 4.418-3.582 8-8 8s-8-3.582-8-8V7l8-4Z"/><path d="M9 12l3 3 4-4"/></svg>
    ) : (
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-white/60" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="9"/><path d="M8 12h8M10 9h4"/></svg>
    )
  );

  const RightIcon = ({ i }: { i: number }) => (
    i === 0 ? (
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-cyan-400" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 4c4 0 7 3 7 7s-3 7-7 7-7-3-7-7"/><path d="M9 9l6 6"/></svg>
    ) : i === 1 ? (
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-cyan-400" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 3l3 3-7 7-3 3v-3l7-7Z"/><path d="M15 6l3 3"/></svg>
    ) : i === 2 ? (
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-cyan-400" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M9 12l3 3 7-7"/><path d="M5 19l2-2"/></svg>
    ) : i === 3 ? (
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-cyan-400" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M5 8l4 4-4 4"/><path d="M13 8l4 4-4 4"/></svg>
    ) : i === 4 ? (
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-cyan-400" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M6 12h12"/><path d="M9 9l-3 3 3 3"/><path d="M15 9l3 3-3 3"/></svg>
    ) : (
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-cyan-400" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M6 18h12"/><path d="M9 6h6M8 10h8M7 14h10"/></svg>
    )
  );

  return (
    <section className="relative w-full overflow-hidden py-28">
      <div className="absolute inset-0 -z-10 opacity-[0.18]" style={{ backgroundImage: 'radial-gradient(rgba(0,216,255,0.25) 1px, transparent 1px)', backgroundSize: '22px 22px' }} />
      <div className="container mx-auto max-w-7xl px-6 md:px-8">
        <div className="text-headline text-2xl md:text-3xl font-semibold mb-3">WHAT’S BROKEN TODAY</div>
        <div className="text-muted text-sm mb-10 max-w-[760px]">Split contrast: what most programs teach vs what enterprises actually need.</div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.4 }} transition={{ ease: 'easeInOut', duration: 0.5 }} className="rounded-[24px] ring-1 ring-white/10 bg-white/5 p-7 md:p-8">
            <div className="text-muted text-sm mb-4">What most programs teach</div>
            <motion.ul variants={listVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-2.5">
              {left.map((t, i) => (
                <motion.li key={t} variants={itemVariants} transition={{ duration: 0.18 }} className="flex items-start gap-3 text-body text-[13px] sm:text-sm md:text-base leading-relaxed px-3 py-2 md:py-2.5 rounded-[12px] transition-all ease-lux dur-micro hover:bg-white/5">
                  <LeftIcon i={i} />
                  <span className="leading-snug">{t}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ ease: 'easeInOut', duration: 0.6, delay: 0.12 }} className="relative rounded-[24px] p-[2px]"
            style={{ background: 'linear-gradient(180deg, rgba(0,216,255,0.8), rgba(0,216,255,0.25))' }}>
            <div className="rounded-[22px] ring-1 ring-cyan-300/40 bg-white/5 p-7 md:p-8 relative">
              <div className="absolute inset-0 rounded-[22px]" style={{ boxShadow: '0 22px 64px rgba(0,216,255,0.18)' }}></div>
              <div className="relative">
                <div className="text-headline text-sm mb-2">What enterprises actually need</div>
                <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ ease: 'easeInOut', duration: 0.5, delay: 0.15 }} className="h-[2px] w-full origin-left bg-gradient-to-r from-cyan-300 to-transparent mb-3" />
                <motion.ul variants={listVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-2.5">
                  {right.map((t, i) => (
                    <motion.li key={t} variants={itemVariants} transition={{ duration: 0.18 }} className="flex items-start gap-3 text-white text-[13px] sm:text-sm md:text-base leading-relaxed px-3 py-2 md:py-2.5 rounded-[12px] transition-all ease-lux dur-micro hover:bg-white/10">
                      <RightIcon i={i} />
                      <span className="leading-snug">{t}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            </div>
          </motion.div>
        </div>
       
      </div>
    </section>
  );
}
