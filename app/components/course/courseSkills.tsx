'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useMemo, useRef } from 'react';

type Block = { title: string; items: string[] };

export default function CourseSkills() {
  const blocks: Block[] = useMemo(() => [
    { title: 'Core Agentic Skills', items: ['Agentic threat modeling', 'Memory & RAG poisoning defense', 'Multi-agent communication security'] },
    { title: 'System Security', items: ['Tool & API abuse prevention', 'Zero-trust for autonomous systems', 'AI supply chain security'] },
    { title: 'Response & Judgment', items: ['Incident response for agentic AI', 'Adversarial thinking', 'Ethical & regulatory reasoning', 'Cross-functional collaboration', 'Rapid AI upskilling mindset'] },
  ], []);

  return (
    <section className="relative w-full overflow-hidden py-24">
      <div className="container mx-auto max-w-7xl px-6 md:px-8">
        <div className="text-headline text-2xl md:text-3xl font-semibold mb-3">SKILLS YOU WILL MASTER</div>
        <div className="text-muted text-sm mb-10 max-w-[900px]">Stacked, scroll-activated blocks. Active panel sharpens while others stay visible and soften.</div>
        <div className="space-y-8">
          {blocks.map((b) => (
            <SkillBlock key={b.title} title={b.title} items={b.items} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillBlock({ title, items }: { title: string; items: string[] }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'end 20%'] });
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1, 0.8]);
  const blur = useTransform(scrollYProgress, [0, 0.5, 1], ['blur(2px)', 'blur(0px)', 'blur(1px)']);
  return (
    <motion.div ref={ref} style={{ opacity, filter: blur }} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.5 }} className="relative rounded-[24px] ring-1 ring-white/10 bg-white/5 p-7 md:p-8">
      <div className="flex items-center justify-between">
        <div className="text-headline text-base md:text-lg font-semibold">{title}</div>
        <div className="h-[2px] w-[160px] origin-left bg-gradient-to-r from-cyan-300/70 to-transparent" />
      </div>
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }} className="mt-4">
        {items.map((t, j) => (
          <motion.div key={t} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.28, delay: j * 0.08 }} className="flex items-start gap-3 px-3 py-2 rounded-[12px]">
            <svg viewBox="0 0 20 20" className="mt-1 h-4 w-4 text-cyan-300" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M7 10l2 2 4-4"/></svg>
            <span className="text-body text-sm md:text-base leading-relaxed">{t}</span>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
