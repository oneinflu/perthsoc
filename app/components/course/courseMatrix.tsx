'use client';

import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';

type Threat = { id: string; title: string; desc: string; skills: string };
type Skill = { key: string; type: 'core' | 'tech' };

export default function CourseMatrix() {
  const threats: Threat[] = useMemo(() => [
    { id: 't-perm', title: 'Agent hijacks tool permissions', desc: 'Unauthorized capability escalation through tools/APIs.', skills: 'Tool & API Abuse Prevention|Agentic Threat Modeling|Zero-Trust for Autonomous Systems' },
    { id: 't-rag', title: 'Poisoned memory via RAG pipeline', desc: 'Corrupt retrieval context and long-term memory.', skills: 'Memory & RAG Poisoning Defense|Incident Response for Agentic AI|AI Supply Chain Security' },
    { id: 't-comm', title: 'Inter-agent communication spoofing', desc: 'Forged messages mislead agents in coordination.', skills: 'Multi-Agent Communication Security|Agentic Threat Modeling|Zero-Trust for Autonomous Systems' },
  ], []);

  const catalog: Skill[] = useMemo(() => [
    { key: 'Agentic Threat Modeling', type: 'core' },
    { key: 'Memory & RAG Poisoning Defense', type: 'core' },
    { key: 'Multi-Agent Communication Security', type: 'core' },
    { key: 'Tool & API Abuse Prevention', type: 'tech' },
    { key: 'Zero-Trust for Autonomous Systems', type: 'tech' },
    { key: 'AI Supply Chain Security', type: 'tech' },
    { key: 'Incident Response for Agentic AI', type: 'tech' },
  ], []);

  const [active, setActive] = useState<string>('t-perm');

  const activeSkillSet = useMemo(() => {
    const t = threats.find(th => th.id === active);
    return new Set((t?.skills || '').split('|'));
  }, [active, threats]);

  return (
    <section className="relative w-full overflow-hidden py-24">
      <div className="container mx-auto max-w-7xl px-6 md:px-8">
        <div className="text-headline text-2xl md:text-3xl font-semibold mb-3">Threat-to-Skill Matrix</div>
        <div className="text-muted text-sm mb-8 max-w-[900px]">Skills revealed by attacks. Tactical mapping from real threat scenarios to the capabilities that neutralize them.</div>
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-8 md:gap-10 items-start">
          <div className="rounded-[24px] ring-1 ring-white/10 bg-white/5 p-6 md:p-8">
            <div className="text-white text-sm mb-3">Threat Scenarios</div>
            <div className="space-y-4">
              {threats.map((t, i) => (
                <ThreatRow key={t.id} threat={t} index={i} active={active === t.id} onSelect={() => setActive(t.id)} />
              ))}
            </div>
          </div>

          <div className="rounded-[24px] ring-1 ring-white/10 bg-white/5 p-6 md:p-8">
            <div className="text-white text-sm mb-3">Skills that neutralize the threat</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              {catalog.map((s, i) => (
                <SkillCapsule key={s.key} skill={s} index={i} highlighted={activeSkillSet.has(s.key)} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ThreatRow({ threat, index, active, onSelect }: { threat: Threat; index: number; active: boolean; onSelect: () => void }) {
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
      transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.4, delay: index * 0.05 }}
      onClick={onSelect}
      className={`w-full rounded-[16px] ring-1 ${active ? 'ring-cyan-300/50 bg-white/8' : 'ring-white/10 bg-white/5'} p-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60`}
    >
      <div className="flex items-start gap-3">
        <ScenarioIcon active={active} />
        <div>
          <div className="text-headline text-sm md:text-base font-semibold">{threat.title}</div>
          <div className="text-body text-xs md:text-sm">{threat.desc}</div>
        </div>
      </div>
    </motion.button>
  );
}

function ScenarioIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 64 40" className="h-10 w-16" fill="none">
      <defs>
        <radialGradient id="m" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="rgba(0,216,255,0.25)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
      <rect x="0" y="0" width="64" height="40" fill="url(#m)" opacity={0.2} />
      <g stroke={active ? 'rgba(0,216,255,0.9)' : 'rgba(255,255,255,0.35)'} strokeWidth={active ? 1.2 : 0.8}>
        <path d="M8 20C16 15 24 15 32 20" strokeDasharray={active ? '6 4' : '4 6'} />
        <path d="M12 28C20 31 28 33 36 31" strokeDasharray={active ? '6 4' : '4 6'} />
      </g>
      <g>
        <circle cx="8" cy="20" r={active ? 3 : 2.5} fill="rgba(0,216,255,0.85)" />
        <circle cx="32" cy="20" r={active ? 3 : 2.5} fill="rgba(0,216,255,0.85)" />
        <circle cx="12" cy="28" r={active ? 2.6 : 2.2} fill="rgba(0,216,255,0.85)" />
        <circle cx="36" cy="31" r={active ? 2.6 : 2.2} fill="rgba(0,216,255,0.85)" />
      </g>
    </svg>
  );
}

function SkillCapsule({ skill, index, highlighted }: { skill: Skill; index: number; highlighted: boolean }) {
  const glow = highlighted ? (skill.type === 'core' ? '0 8px 28px rgba(255,255,255,0.25)' : '0 8px 28px rgba(0,216,255,0.25)') : '0 0 0 rgba(0,0,0,0)';
  const ringClass = highlighted ? (skill.type === 'core' ? 'ring-white/30' : 'ring-cyan-300/40') : 'ring-white/10';
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
      transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.4, delay: index * 0.04 }}
      className={`rounded-[999px] ${ringClass} ring-1 bg-white/5 px-4 py-2 text-body text-sm`}
      style={{ boxShadow: glow }}
    >
      <span className="text-headline/90">{skill.key}</span>
    </motion.div>
  );
}

