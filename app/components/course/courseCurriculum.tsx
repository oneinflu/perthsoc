'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useMemo, useRef, useState } from 'react';

type Module = { title: string; items: string[] };

export default function CourseCurriculum() {
  const modules: Module[] = useMemo(() => [
    { title: 'Foundations of AI & Agentic Security', items: ['LLMs, RAG, autonomous agents', 'Agent architectures & attack surfaces', 'STRIDE-GPT framework', 'MITRE ATLAS introduction'] },
    { title: 'Agentic AI Threats & Attack Vectors', items: ['Memory poisoning', 'Tool misuse & privilege escalation', 'Goal & authorization hijacking', 'Cascading failures', 'RAG poisoning', 'Agentic supply chain attacks'] },
    { title: 'Multi-Agent Systems Security', items: ['Inter-agent communication poisoning', 'Emergent behavior vulnerabilities', 'Agent impersonation & collusion', 'Distributed governance'] },
    { title: 'AI Application & Integration Security', items: ['API & tool integration security', 'RAG pipeline hardening', 'Agent sandboxing & isolation', 'Autonomous data privacy risks', 'Incident response'] },
    { title: 'Governance, Compliance & Risk', items: ['ISO/IEC 42001', 'NIST AI RMF', 'EU AI Act (high-risk AI systems)', 'Governance for autonomous workflows'] },
    { title: 'Red Teaming Agentic AI', items: ['Red team methodologies', 'Prompt & toolchain exploitation', 'Multi-agent red teaming', 'Automated adversarial testing'] },
  ], []);

  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start 20%', 'end 60%'] });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const [activeIdx, setActiveIdx] = useState<number | null>(0);

  return (
    <section id="program" ref={sectionRef} className="relative w-full overflow-hidden py-24">
      <div className="container mx-auto max-w-7xl px-6 md:px-8">
        <div className="text-headline text-2xl md:text-3xl font-semibold mb-3">CURRICULUM</div>
        <div className="text-muted text-sm mb-10 max-w-[900px]">Core modules organized as a vertical timeline. Expandable panels with staggered content.</div>
        <div className="relative">
          <div className="absolute left-2 top-0 bottom-0 w-[2px] bg-white/10" />
          <motion.div style={{ scaleY: lineScale }} className="absolute left-2 top-0 origin-top w-[2px] bg-cyan-300" />
          <div className="ml-6 space-y-6">
            {modules.map((m, i) => (
              <ModulePanel
                key={m.title}
                index={i}
                title={m.title}
                items={m.items}
                active={activeIdx === i}
                onToggle={() => setActiveIdx(activeIdx === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ModulePanel({ index, title, items, active, onToggle }: { index: number; title: string; items: string[]; active: boolean; onToggle: () => void }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const panelId = `curr-panel-${index}`;
  const headerId = `curr-header-${index}`;
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      className={`group relative rounded-[20px] ring-1 ${active ? 'ring-cyan-300/40 bg-white/8' : 'ring-white/10 bg-white/5'} p-6 md:p-7 transition-all ease-lux dur-section`}
    >
      <button
        id={headerId}
        aria-controls={panelId}
        aria-expanded={active}
        onClick={onToggle}
        className="w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60"
      >
        <div className="flex items-start gap-3">
          <div className="mt-1 h-4 w-4 rounded-full bg-cyan-300/80" />
          <div>
            <div className="text-headline text-sm md:text-base font-semibold">{title}</div>
            <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: active ? 1 : 0 }} transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.5 }} className="h-[2px] w-[180px] origin-left bg-gradient-to-r from-cyan-300 to-transparent mt-1" />
          </div>
        </div>
      </button>
      <div
        id={panelId}
        role="region"
        aria-labelledby={headerId}
        className={`mt-4 overflow-hidden transition-[max-height] ease-lux dur-section ${active ? 'max-h-[800px]' : 'max-h-[0px]'}`}
      >
        <motion.ul initial="hidden" animate={active ? 'visible' : 'hidden'} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }} className="space-y-2.5">
          {items.map((t) => (
            <motion.li key={t} variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { ease: [0.22, 1, 0.36, 1], duration: 0.28 } } }} className="flex items-start gap-3 px-3 py-2 rounded-[12px]">
              <svg viewBox="0 0 20 20" className="mt-1 h-4 w-4 text-cyan-300" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M7 10l2 2 4-4"/></svg>
              <span className="text-body text-sm md:text-base leading-relaxed">{t}</span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </motion.div>
  );
}
