'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useMemo, useRef, useState } from 'react';

type Tool = { label: string; desc: string; angle: number };

export default function CourseLabs() {
  const tools: Tool[] = useMemo(() => [
    { label: 'AutoGen', desc: 'Run autonomous agent groups in live orchestration loops.', angle: -10 },
    { label: 'LangChain Agents', desc: 'Build and attack chained autonomous agents with tool access and memory.', angle: 80 },
    { label: 'OpenAI Assistants API', desc: 'Engineer assistants with controlled tools, memory, and policies.', angle: 170 },
    { label: 'Multi-Agent Red Teaming', desc: 'Deploy adversarial environments to stress agents and coordination.', angle: 260 },
  ], []);

  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start 70%', 'end 30%'] });
  const dissolve = useTransform(scrollYProgress, [0, 1], [1, 0.82]);
  const drift = useTransform(scrollYProgress, [0, 1], [1, 1.06]);
  const [paused, setPaused] = useState(false);

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden py-24">
      <div className="container mx-auto max-w-7xl px-6 md:px-8">
        <div className="text-headline text-2xl md:text-3xl font-semibold mb-3 text-center">Hands-On Labs</div>
        <div className="text-muted text-sm mb-10 max-w-[780px] mx-auto text-center">Real-world deployments. Not simulations.</div>
        <div className="relative rounded-[28px] ring-1 ring-white/10 bg-[rgba(17,24,39,0.85)] p-8 md:p-10">
          <div className="absolute inset-0 -z-10" style={{ backgroundImage: 'radial-gradient(rgba(0,216,255,0.08) 1px, transparent 1px)', backgroundSize: '28px 28px', opacity: 0.06 }}></div>

          <div className="relative flex items-center justify-center">
            <motion.div style={{ opacity: dissolve, scale: drift }} className={`relative h-[440px] w-[440px] md:h-[520px] md:w-[520px]`}>
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[140px] w-[140px] md:h-[160px] md:w-[160px] rounded-full ring-1 ring-white/15 bg-white/5 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-white text-sm font-semibold">LAB CORE</div>
                  <div className="text-body text-xs">Real-world agent deployments</div>
                </div>
              </div>

              <div className={`orbit absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[360px] w-[360px] md:h-[420px] md:w-[420px] rounded-full ring-1 ring-white/10 ${paused ? 'paused' : ''}`}></div>

              <div className={`orbit-wrap absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[360px] w-[360px] md:h-[420px] md:w-[420px]`}>\
                {tools.map((t) => (
                  <ToolNode key={t.label} angle={t.angle} label={t.label} desc={t.desc} onHover={(v) => setPaused(v)} />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .orbit { box-shadow: 0 0 24px rgba(0,216,255,0.14) inset; }
        .orbit-wrap { animation: orbitSpin 24s linear infinite; }
        .paused { animation-play-state: paused; }
        @keyframes orbitSpin { to { transform: rotate(360deg); } }
      `}</style>
    </section>
  );
}

function ToolNode({ angle, label, desc, onHover }: { angle: number; label: string; desc: string; onHover: (v: boolean) => void }) {
  const [hover, setHover] = useState(false);
  const radius = 180;
  return (
    <motion.button
      type="button"
      onMouseEnter={() => { setHover(true); onHover(true); }}
      onMouseLeave={() => { setHover(false); onHover(false); }}
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[999px] ring-1 ring-white/10 bg-white/5 text-white"
      style={{ transform: `rotate(${angle}deg) translate(${radius}px) rotate(${-angle}deg)`, width: 72, height: 72 }}
      whileHover={{ scale: 1.08 }}
      transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.25 }}
    >
      <div className="absolute inset-0 rounded-[999px]" style={{ boxShadow: hover ? '0 0 22px rgba(0,216,255,0.35)' : '0 0 0 rgba(0,0,0,0)' }}></div>
      <div className="absolute inset-0 rounded-[999px] ring-1 ring-white/15" style={{ opacity: hover ? 0.9 : 0.5 }}></div>
      <div className="absolute inset-0 flex items-center justify-center text-center px-3">
        <div className="text-xs font-semibold">{label}</div>
      </div>
      {hover && (
        <motion.div initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="absolute left-full ml-3 top-1/2 -translate-y-1/2 rounded-[12px] ring-1 ring-white/10 bg-white/10 backdrop-blur-sm px-3 py-2 text-white text-xs leading-relaxed max-w-[240px]">
          <div className="font-semibold mb-1">{label}</div>
          <div>{desc}</div>
        </motion.div>
      )}
    </motion.button>
  );
}
