'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

type Module = { title: string; summary: string; lessons: string[]; length: string; assess: string; outcomes: string[]; tools: string[]; checklist: string[] };

export default function CoursePage() {
  const modules: Module[] = [
    {
      title: 'Module 1 — SOC Foundations',
      summary: 'Roles, workflows, attack lifecycle, playbooks, ticketing, SLAs',
      lessons: ['SOC tiers and responsibilities', 'Alert lifecycle and severity', 'Runbooks and playbooks', 'Case management basics'],
      length: '2 weeks',
      assess: 'Micro-assessment: Alert triage runbook',
      outcomes: ['Understand SOC tiers', 'Use case management effectively', 'Prioritize and escalate alerts'],
      tools: ['Case management', 'Email workflows', 'Team comms'],
      checklist: ['Create triage runbook', 'Define severities', 'Close sample case'],
    },
    {
      title: 'Module 2 — SIEM & EDR Essentials',
      summary: 'Log sources, detections, correlation, investigations, triage',
      lessons: ['SIEM ingestion and parsing', 'Detection rules and tuning', 'EDR event deep dive', 'Investigation workflow'],
      length: '3 weeks',
      assess: 'Lab: SIEM correlation & tuning',
      outcomes: ['Build effective searches', 'Tune noisy detections', 'Investigate endpoint events'],
      tools: ['SIEM platform', 'EDR tooling'],
      checklist: ['Write KQL/DSL query', 'Tune a detection rule', 'Investigate process tree'],
    },
    {
      title: 'Module 3 — Threat Intel & MITRE ATT&CK',
      summary: 'IOCs, enrichment, ATT&CK mapping, reporting',
      lessons: ['OSINT and feeds', 'IOC lifecycle and enrichment', 'ATT&CK techniques and tactics', 'Executive reporting'],
      length: '3 weeks',
      assess: 'Project: ATT&CK technique mapping',
      outcomes: ['Collect and enrich IOCs', 'Map detections to ATT&CK', 'Produce concise intel briefs'],
      tools: ['OSINT aggregators', 'MITRE ATT&CK'],
      checklist: ['Enrich an IOC', 'Map technique to control', 'Write a short report'],
    },
    {
      title: 'Module 4 — Incident Response Basics',
      summary: 'Containment, forensics, post-incident, lessons learned',
      lessons: ['IR phases overview', 'Host and network forensics', 'Containment strategies', 'Post-incident process'],
      length: '4 weeks',
      assess: 'Lab: IR containment scenario',
      outcomes: ['Scope and contain incidents', 'Apply basic forensics', 'Run postmortems'],
      tools: ['Forensics utilities', 'Sysinternals suite'],
      checklist: ['Scope incident', 'Isolate a host', 'Document lessons learned'],
    },
  ];

  const [modalOpen, setModalOpen] = useState(false);
  const [paused, setPaused] = useState(false);
  const [parallaxY, setParallaxY] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [openSet, setOpenSet] = useState<Set<number>>(new Set([0, 1, 2]));
  const [activePreview, setActivePreview] = useState<number>(0);
  const [labsOpen, setLabsOpen] = useState(false);
  const [labsTool, setLabsTool] = useState<number | null>(null);
  const [labsStep, setLabsStep] = useState(0);
  const [voiceoverOn, setVoiceoverOn] = useState(false);
  const [pricingTab, setPricingTab] = useState<'full' | 'monthly' | 'employer'>('full');
  const [months, setMonths] = useState(6);
  const monthlyPrice = 299;
  const [ctaOpen, setCtaOpen] = useState<null | 'apply' | 'info'>(null);
  const [applyForm, setApplyForm] = useState<{ name: string; email: string; phone: string }>({ name: '', email: '', phone: '' });

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const offset = Math.max(-15, Math.min(15, y * 0.06));
      setParallaxY(offset);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (paused) v.pause(); else v.play().catch(() => {});
  }, [paused]);

  useEffect(() => {
    if (!labsOpen || !voiceoverOn) return;
    const steps = [0, 1, 2];
    let idx = 0;
    const int = setInterval(() => {
      idx += 1;
      if (idx >= steps.length) { clearInterval(int); setVoiceoverOn(false); } else { setLabsStep(steps[idx]); }
    }, 2200);
    return () => clearInterval(int);
  }, [labsOpen, voiceoverOn]);

  return (
    <div className="min-h-screen">
      <section className="relative w-full overflow-hidden py-28 md:py-40">
        <div className="absolute inset-0 -z-10" style={{ backgroundImage: 'radial-gradient(ellipse at top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.92) 55%, rgba(0,170,255,0.18) 100%), repeating-linear-gradient(to right, rgba(0,170,255,0.06) 0px, rgba(0,170,255,0.06) 1px, transparent 1px, transparent 28px)' }}></div>
        <div className="absolute inset-0 -z-10 course-hero-nodes"></div>

        <div className="container mx-auto max-w-7xl px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-14 items-center">
            <div className="animate-fadein">
              <div className="uppercase tracking-[0.12em] text-sm text-white/70 mb-2">Course · Atlanta SOC</div>
              <h1 className="text-white text-5xl md:text-6xl font-bold mb-4">Atlanta SOC: Hands-On SOC Analyst Program</h1>
              <p className="text-gray-300 text-lg md:text-xl mb-5">12 weeks · Live labs · Placement support — built around Atlanta’s hiring market.</p>

              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="rounded-full bg-white/5 ring-1 ring-white/10 text-white text-sm px-3 py-1 animate-stagger" style={{ animationDelay: '50ms' }}>Duration: 12 weeks</span>
                <span className="rounded-full bg-white/5 ring-1 ring-white/10 text-white text-sm px-3 py-1 animate-stagger" style={{ animationDelay: '100ms' }}>Format: Hybrid / Online</span>
                <span className="rounded-full bg-white/5 ring-1 ring-white/10 text-white text-sm px-3 py-1 animate-stagger" style={{ animationDelay: '150ms' }}>Next start: Jan 6</span>
                <span className="rounded-full bg-white/5 ring-1 ring-white/10 text-white text-sm px-3 py-1 animate-stagger" style={{ animationDelay: '200ms' }}>Seats: Limited</span>
              </div>

              <div className="flex flex-wrap items-center gap-4 mb-2">
                <Link href="/contact" className="inline-flex items-center h-[52px] px-8 text-base font-bold text-white rounded-[28px]" style={{ background: 'linear-gradient(90deg, #0055FF, #6E00FF)' }}>Apply Now</Link>
                <Link href="/syllabus.pdf" className="inline-flex items-center h-[52px] px-8 text-base font-bold text-white rounded-[28px] border-2 border-cyan-300/70 hover:border-cyan-300 transition-colors">Download Syllabus</Link>
                <button onClick={() => setPaused((p) => !p)} aria-label="Pause animations" className="inline-flex items-center h-[40px] px-4 text-sm font-semibold text-white rounded-[20px] ring-1 ring-white/10 bg-white/5 hover:bg-white/10">{paused ? 'Resume Animations' : 'Pause Animations'}</button>
              </div>
              <div className="text-gray-300">Scholarships & employer-sponsored cohorts available.</div>
            </div>

            <div style={{ transform: `translateY(${parallaxY}px)` }}>
              <div className="relative rounded-[24px] overflow-hidden ring-1 ring-white/10 bg-black/50">
                <video
                  ref={videoRef}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-[360px] md:h-[420px] object-cover"
                  poster="/window.svg"
                  aria-label="Mini SIEM live lab demo"
                >
                  <source src="/bg.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-black/10" />
                <button onClick={() => setModalOpen(true)} className="absolute bottom-4 left-4 pointer-events-auto inline-flex items-center h-[36px] px-4 text-sm font-semibold text-white rounded-[18px] bg-blue-600 hover:bg-blue-500">Live lab demo</button>
                <div className="absolute top-4 right-4 rounded-full bg-white/10 ring-1 ring-white/10 text-white text-xs px-3 py-1 animate-salary-pulse">Avg salary in Atlanta: $78,400</div>
                <div className="sr-only" aria-hidden="false">Caption: SOC triage across SIEM alerts, demo sample.</div>
              </div>
            </div>
          </div>
        </div>

        {modalOpen && (
          <div role="dialog" aria-modal="true" className="fixed inset-0 z-[60] bg-black/70 flex items-center justify-center">
            <div className="relative w-[92%] max-w-4xl rounded-[24px] overflow-hidden ring-1 ring-white/10 bg-black">
              <button onClick={() => setModalOpen(false)} className="absolute top-4 right-4 h-9 px-3 rounded-[18px] bg-white/10 text-white ring-1 ring-white/10">Close</button>
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-[60vh] object-cover"
                poster="/window.svg"
                aria-label="Expanded SIEM live lab demo"
              >
                <source src="/bg.mp4" type="video/mp4" />
              </video>
              <div className="px-6 py-4 text-gray-300 text-sm">Demo: Investigating correlated events and escalating incidents in a simulated environment.</div>
            </div>
          </div>
        )}

        <style jsx>{`
          .course-hero-nodes { background-image: radial-gradient(rgba(0,255,200,0.12) 1px, transparent 1px); background-size: 34px 34px; animation: nodesShift 28s linear infinite; opacity: 0.16; }
          @keyframes nodesShift { 0% { background-position: 0 0; } 50% { background-position: 80px 40px; } 100% { background-position: 0 0; } }
          .animate-fadein { animation: fadeIn 300ms ease-out both; }
          .animate-stagger { animation: fadeIn 300ms ease-out both; }
          @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
          .animate-salary-pulse { animation: salaryPulse 700ms ease-out 1; }
          @keyframes salaryPulse { 0% { transform: scale(1); filter: drop-shadow(0 0 0 rgba(0,200,255,0)); } 40% { transform: scale(1.06); filter: drop-shadow(0 0 10px rgba(0,200,255,0.45)); } 100% { transform: scale(1); filter: drop-shadow(0 0 0 rgba(0,200,255,0)); } }
        `}</style>
      </section>

      <section className="relative w-full overflow-hidden py-20 bg-black">
        <div className="container mx-auto max-w-7xl px-6 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { label: 'Placement rate', value: '86% placed', tip: 'Data: 2024 Atlanta cohort', href: '/sources/placement' },
              { label: 'Avg salary after program', value: '$78,400', tip: 'Source: BLS & local postings', href: 'https://www.bls.gov/' },
              { label: 'Labs hours', value: '120 hrs hands-on', tip: 'Tracked lab time per learner', href: '/sources/labs' },
              { label: 'Employer interviews', value: '5 interviews', tip: 'Partner guarantee terms apply', href: '/sources/interviews' },
            ].map((b, i) => (
              <div key={b.label} className="group relative flex items-center justify-center h-[160px]">
                <div className="animate-badge-in" style={{ animationDelay: `${i * 80}ms` }}>
                  <div className="relative h-[140px] w-[140px] rounded-full bg-white/5 ring-1 ring-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.35)] flex flex-col items-center justify-center text-center">
                    <div className="text-white text-lg font-semibold">{b.value}</div>
                    <div className="text-gray-300 text-xs mt-1">{b.label}</div>
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 h-6 w-6 rounded-full bg-blue-600 text-white text-[11px] flex items-center justify-center">i</div>
                  </div>
                </div>
                <div className="pointer-events-none absolute -top-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="rounded-[10px] bg-white/10 ring-1 ring-white/10 px-3 py-2 text-white text-xs whitespace-nowrap flex items-center gap-2">
                    <span>{b.tip}</span>
                    <a href={b.href} className="underline text-cyan-300 pointer-events-auto">Source</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <style jsx>{`
          @keyframes badgeIn { 0% { transform: translateY(24px) scale(0.98); opacity: 0; } 60% { transform: translateY(-8px) scale(1.02); opacity: 1; } 100% { transform: translateY(0) scale(1); opacity: 1; } }
          .animate-badge-in { animation: badgeIn 350ms ease-out both; }
        `}</style>
      </section>

      <section className="relative w-full overflow-hidden py-24 bg-black">
        <div className="container mx-auto max-w-7xl px-6 md:px-8">
          <div className="text-white text-3xl md:text-4xl font-bold mb-8">Course Overview & Value</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="rounded-[24px] bg-white/8 backdrop-blur-sm ring-1 ring-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.35)] p-8 transition-transform hover:-translate-y-[6px] hover:shadow-[0_18px_60px_rgba(0,200,255,0.20)] hover:ring-cyan-300/40">
              <div className="flex items-center gap-3 mb-3">
                <svg viewBox="0 0 24 24" className="h-7 w-7 text-cyan-300" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 7h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" /><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" /></svg>
                <div className="text-white text-xl font-semibold">Career-first</div>
              </div>
              <div className="text-gray-300 mb-3">Built for job outcomes with Atlanta-focused roles and hiring patterns.</div>
              <ul className="text-gray-300 text-sm space-y-1 mb-5">
                <li>Resume + interview prep</li>
                <li>Portfolio-ready projects</li>
              </ul>
              <a href="#career-first" className="text-white font-semibold inline-flex items-center">Learn more <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-white text-black">→</span></a>
            </div>

            <div className="rounded-[24px] bg-white/8 backdrop-blur-sm ring-1 ring-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.35)] p-8 transition-transform hover:-translate-y-[6px] hover:shadow-[0_18px_60px_rgba(0,200,255,0.20)] hover:ring-cyan-300/40">
              <div className="flex items-center gap-3 mb-3">
                <svg viewBox="0 0 24 24" className="h-7 w-7 text-cyan-300" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="5" width="18" height="12" rx="2" /><path d="M2 19h20" /></svg>
                <div className="text-white text-xl font-semibold">Instructor-led</div>
              </div>
              <div className="text-gray-300 mb-3">Live sessions, feedback loops, and guided labs for consistent progress.</div>
              <ul className="text-gray-300 text-sm space-y-1 mb-5">
                <li>Weekly checkpoints</li>
                <li>Mentor office hours</li>
              </ul>
              <a href="#instructor-led" className="text-white font-semibold inline-flex items-center">Learn more <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-white text-black">→</span></a>
            </div>

            <div className="rounded-[24px] bg-white/8 backdrop-blur-sm ring-1 ring-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.35)] p-8 transition-transform hover:-translate-y-[6px] hover:shadow-[0_18px_60px_rgba(0,200,255,0.20)] hover:ring-cyan-300/40">
              <div className="flex items-center gap-3 mb-3">
                <svg viewBox="0 0 24 24" className="h-7 w-7 text-cyan-300" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 2l9 4-9 4-9-4 9-4Z" /><path d="M12 10l9-4v8l-9 4-9-4V6l9 4Z" /></svg>
                <div className="text-white text-xl font-semibold">Real SOC Experience</div>
              </div>
              <div className="text-gray-300 mb-3">Hands-on triage, detection tuning, and incident workflows mirrored from real SOCs.</div>
              <ul className="text-gray-300 text-sm space-y-1 mb-5">
                <li>SIEM + EDR exercises</li>
                <li>Playbooks and escalations</li>
              </ul>
              <a href="#real-soc" className="text-white font-semibold inline-flex items-center">Learn more <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-white text-black">→</span></a>
            </div>
          </div>
        </div>
        <div id="career-first" className="sr-only">Career-first</div>
        <div id="instructor-led" className="sr-only">Instructor-led</div>
        <div id="real-soc" className="sr-only">Real SOC Experience</div>
      </section>

      <div className="fixed bottom-0 left-0 right-0 z-[90]">
        <div className="w-full bg-black/70 backdrop-blur-sm ring-1 ring-white/10">
          <div className="container mx-auto max-w-7xl px-4 md:px-8 py-4">
            <div className="grid grid-cols-1 md:grid-cols-[240px_1fr_280px] gap-3 md:gap-4 items-center">
              <div className="flex md:block items-center justify-between md:justify-start">
                <div className="text-white text-sm md:text-base font-semibold">{pricingTab==='full' ? '$2,400' : pricingTab==='monthly' ? `$${monthlyPrice}/mo • total $${monthlyPrice*months}` : '$0 • employer-sponsored'}</div>
                <div className="text-white/80 text-xs md:text-sm md:mt-1">Next start: Jan 6</div>
              </div>
              <form className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <input value={applyForm.name} onChange={(e)=>setApplyForm({ ...applyForm, name: e.target.value })} type="text" placeholder="Name" aria-label="Name" className="h-[40px] px-3 rounded-[10px] bg-black/50 text-white ring-1 ring-white/10 focus:outline-none focus:ring-cyan-300/60" />
                <input value={applyForm.email} onChange={(e)=>setApplyForm({ ...applyForm, email: e.target.value })} type="email" placeholder="Email" aria-label="Email" className="h-[40px] px-3 rounded-[10px] bg:black/50 text-white ring-1 ring-white/10 focus:outline-none focus:ring-cyan-300/60" />
                <input value={applyForm.phone} onChange={(e)=>setApplyForm({ ...applyForm, phone: e.target.value })} type="tel" placeholder="Phone" aria-label="Phone" className="h-[40px] px-3 rounded-[10px] bg-black/50 text-white ring-1 ring-white/10 focus:outline-none focus:ring-cyan-300/60" />
              </form>
              <div className="flex items-center justify-end gap-2">
                <button onClick={() => setCtaOpen('apply')} className="h-[44px] px-5 rounded-[22px] bg-blue-600 text-white font-semibold">Apply Now</button>
                <button onClick={() => setCtaOpen('info')} className="h-[44px] px-5 rounded-[22px] ring-1 ring-white/10 text-white">Enquire Now</button>
              </div>
            </div>
            {ctaOpen && (
              <div className="mt-3">
                <div className="rounded-[12px] ring-1 ring-white/10 bg-black/50 px-3 py-2 text-white text-sm">{ctaOpen==='apply' ? 'Application form submitted (demo).' : 'Info request submitted (demo).'}
                </div>
                <div className="mt-2 flex justify-end">
                  <button onClick={() => setCtaOpen(null)} className="h-[32px] px-3 rounded-[16px] bg-white/10 text-white ring-1 ring-white/10">Close</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

   
     

      <section className="relative w-full overflow-hidden py-24">
        <div className="absolute inset-0 -z-10" style={{ backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.95) 50%, rgba(0,170,255,0.12) 100%), repeating-linear-gradient(to right, rgba(0,170,255,0.08) 0px, rgba(0,170,255,0.08) 1px, transparent 1px, transparent 30px)' }}></div>
        <div className="container mx-auto max-w-7xl px-6 md:px-8">
          <div className="text-white text-3xl md:text-4xl font-bold mb-6">Curriculum</div>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 md:gap-12 items-start">
            <div>
              {modules.map((m, i) => {
                const open = openSet.has(i);
                const panelId = `module-panel-${i}`;
                const headerId = `module-header-${i}`;
                const bullets = m.lessons.slice(0, 3);
                const length = i === 0 ? '2 weeks' : i === 1 ? '3 weeks' : i === 2 ? '3 weeks' : '4 weeks';
                const assess = i === 0 ? 'Micro-assessment: Alert triage runbook' : i === 1 ? 'Lab: SIEM correlation & tuning' : i === 2 ? 'Project: ATT&CK technique mapping' : 'Lab: IR containment scenario';
                const toggle = () => {
                  setActivePreview(i);
                  setOpenSet((prev) => {
                    const next = new Set(prev);
                    if (next.has(i)) next.delete(i); else next.add(i);
                    return next;
                  });
                };
                const onKeyDown = (e: React.KeyboardEvent) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggle();
                  }
                };
                return (
                  <div key={m.title} className="rounded-[16px] ring-1 ring-white/10 bg-white/5 mb-3" onMouseEnter={() => setActivePreview(i)}>
                    <button
                      id={headerId}
                      aria-controls={panelId}
                      aria-expanded={open}
                      onClick={toggle}
                      onKeyDown={onKeyDown}
                      onFocus={() => setActivePreview(i)}
                      className="w-full flex items-center justify-between px-6 py-4 text-left focus:outline-none focus:ring-2 focus:ring-cyan-300/60"
                    >
                      <div className="flex items-center gap-3">
                        <span className="h-5 w-1.5 rounded-full bg-cyan-400"></span>
                        <span className="text-white text-lg md:text-xl font-semibold">{m.title}</span>
                        <span className="text-white/70 text-sm">• {length}</span>
                      </div>
                      <span className="text-white">{open ? '−' : '+'}</span>
                    </button>
                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={headerId}
                      className={`overflow-hidden transition-[max-height] duration-250 ${open ? 'max-h-[700px]' : 'max-h-0'}`}
                    >
                      <div className={`px-6 pb-6 ${open ? 'opacity-100' : 'opacity-0'} transition-opacity duration-250`}>
                        <div className="text-gray-300 mb-3">{m.summary}</div>
                        <ul className="text-gray-300 text-sm grid grid-cols-1 sm:grid-cols-3 gap-2 mb-3">
                          {bullets.map((l) => (
                            <li key={l} className="rounded-md bg-black/40 ring-1 ring-white/10 px-3 py-2">{l}</li>
                          ))}
                        </ul>
                        <div className="text-white text-sm font-semibold">{assess}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="lg:sticky top-24 self-start">
              <div className="rounded-[20px] ring-1 ring-white/10 bg-white/5 p-5">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-white text-lg font-semibold">Module Detail</div>
                  <span className="text-white/70 text-sm">{modules[activePreview].length}</span>
                </div>
                <div className="rounded-[14px] ring-1 ring-white/10 bg-black/40 p-4 mb-4">
                  <div className="text-white text-base font-semibold mb-1">{modules[activePreview].title}</div>
                  <div className="text-gray-300 text-sm">{modules[activePreview].summary}</div>
                </div>
                <div className="mb-3">
                  <div className="text-white text-sm font-semibold mb-1">Learning outcomes</div>
                  <ul className="text-gray-300 text-sm grid grid-cols-1 gap-1">
                    {modules[activePreview].outcomes.map((o) => (
                      <li key={o} className="rounded-md bg-black/40 ring-1 ring-white/10 px-3 py-2">{o}</li>
                    ))}
                  </ul>
                </div>
                <div className="mb-3">
                  <div className="text-white text-sm font-semibold mb-1">Tools</div>
                  <div className="flex flex-wrap gap-2">
                    {modules[activePreview].tools.map((t) => (
                      <span key={t} className="rounded-full bg-white/5 ring-1 ring-white/10 text-white text-xs px-3 py-1">{t}</span>
                    ))}
                  </div>
                </div>
                <div className="mb-4">
                  <div className="text-white text-sm font-semibold mb-1">Checklist</div>
                  <ul className="text-gray-300 text-sm grid grid-cols-1 gap-1">
                    {modules[activePreview].checklist.map((c) => (
                      <li key={c} className="rounded-md bg-black/40 ring-1 ring-white/10 px-3 py-2">{c}</li>
                    ))}
                  </ul>
                </div>
                <button className="inline-flex items-center h-[40px] px-4 text-sm font-semibold text-white rounded-[20px] bg-blue-600 hover:bg-blue-500">Open lesson</button>
                <div className="mt-4">
                  <div className="text-white text-sm mb-1">Course pacing</div>
                  <div className="h-2 w-full rounded-full bg-white/10" aria-label="Course pacing progress">
                    <div
                      className="h-2 rounded-full bg-cyan-400"
                      style={{ width: `${(openSet.size / modules.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative w-full overflow-hidden py-24 bg-black">
        <div className="container mx-auto max-w-7xl px-6 md:px-8">
          <div className="text-white text-3xl md:text-4xl font-bold mb-8">Hands-on Labs & Tech Stack</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              { name: 'Splunk SIEM', desc: 'Search, correlation, dashboards for alert triage.' },
              { name: 'ELK Stack', desc: 'Log ingestion, queries, and visualization for detections.' },
              { name: 'Wireshark', desc: 'Packet analysis for investigation and IR workflows.' },
              { name: 'MITRE ATT&CK', desc: 'Technique mapping and threat-informed defense.' },
              { name: 'EDR Console', desc: 'Endpoint telemetry, process trees, containment.' },
              { name: 'Case Management', desc: 'Runbooks, escalation paths, and audit trails.' },
            ].map((t, i) => (
              <div key={t.name} className="rounded-[20px] bg-white/8 backdrop-blur-sm ring-1 ring-white/10 p-6 shadow-[0_12px_40px_rgba(0,0,0,0.35)] transition-all hover:-translate-y-[6px] hover:shadow-[0_18px_60px_rgba(0,200,255,0.20)] animate-tile-in" style={{ animationDelay: `${i * 90}ms` }}>
                <div className="flex items-center gap-3 mb-2">
                  <svg viewBox="0 0 24 24" className="h-7 w-7 text-cyan-300" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="6" /><path d="M12 2v4M12 18v4M2 12h4M18 12h4" /></svg>
                  <div className="text-white text-xl font-semibold">{t.name}</div>
                </div>
                <div className="text-gray-300 text-sm mb-4">{t.desc}</div>
                <div className="rounded-[14px] ring-1 ring-white/10 bg-black/40 px-4 py-3 text-white text-xs font-mono mb-4">$ query severity:high | correlate source_ip, user | pivot risk</div>
                <button onClick={() => { setLabsTool(i); setLabsOpen(true); setLabsStep(0); }} className="inline-flex items-center h-[40px] px-4 text-sm font-semibold text-white rounded-[20px] bg-blue-600 hover:bg-blue-500">Try demo</button>
              </div>
            ))}
          </div>
        </div>
        {labsOpen && labsTool !== null && (
          <div role="dialog" aria-modal="true" className="fixed inset-0 z-[70] bg-black/70 flex items-center justify-center">
            <div className="relative w-[94%] max-w-4xl rounded-[24px] overflow-hidden ring-1 ring-white/10 bg-black animate-modal-in">
              <button onClick={() => setLabsOpen(false)} className="absolute top-4 right-4 h-9 px-3 rounded-[18px] bg-white/10 text-white ring-1 ring-white/10">Close</button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                <div className="p-6">
                  <div className="text-white text-xl font-semibold mb-2">Sandbox Preview</div>
                  <div className="rounded-[14px] ring-1 ring-white/10 bg-white/5 h-[220px] mb-3 p-3">
                    {labsTool === 0 && (
                      <div className="grid grid-cols-2 gap-3 h-full">
                        <SimSIEMChart />
                        <SimTerminal playing={labsOpen} lines={["index=security severity=high", "correlate src_ip,user", "pivot to risk model", "triage alert #4312"]} />
                      </div>
                    )}
                    {labsTool === 1 && (
                      <SimTerminal playing={labsOpen} lines={["POST /ingest 201", "GET /search 200", "PUT /rule 204", "GET /dashboards 200"]} />
                    )}
                    {labsTool === 2 && (
                      <SimPacketStream />
                    )}
                    {labsTool === 3 && (
                      <SimHeatmap />
                    )}
                    {labsTool === 4 && (
                      <div className="grid grid-cols-2 gap-3 h-full">
                        <SimSIEMChart />
                        <SimTerminal playing={labsOpen} lines={["EDR: process tree loaded", "suspicious parent-child", "isolate host?", "escalate case"]} />
                      </div>
                    )}
                    {labsTool === 5 && (
                      <SimTerminal playing={labsOpen} lines={["new case: phishing", "apply runbook: triage", "assign L2 analyst", "close with lessons"]} />
                    )}
                  </div>
                  <div className="rounded-[14px] ring-1 ring-white/10 bg-black/40 p-3 text-white text-xs font-mono">$ guide step {labsStep + 1}/3 · follow prompts</div>
                </div>
                <div className="p-6">
                  <div className="text-white text-xl font-semibold mb-2">Guided Tour</div>
                  <ol className="text-gray-300 text-sm space-y-2" aria-live="polite">
                    <li className={`${labsStep === 0 ? 'text-white' : ''}`}>1. Open dashboard and select high-risk alerts.</li>
                    <li className={`${labsStep === 1 ? 'text-white' : ''}`}>2. Correlate events and inspect entities.</li>
                    <li className={`${labsStep === 2 ? 'text-white' : ''}`}>3. Document findings and escalate.</li>
                  </ol>
                  <div className="mt-4 flex items-center gap-3">
                    <button onClick={() => setLabsStep((s) => Math.min(2, s + 1))} className="h-[36px] px-4 rounded-[18px] bg-blue-600 text-white">Next</button>
                    <button onClick={() => setVoiceoverOn((v) => { if (!v) setLabsStep(0); return !v; })} className="h-[36px] px-4 rounded-[18px] ring-1 ring-white/10 text-white">{voiceoverOn ? 'Stop voiceover' : 'Play voiceover'}</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <style jsx>{`
          @keyframes tileIn { 0% { transform: translateY(18px); opacity: 0; } 100% { transform: translateY(0); opacity: 1; } }
          .animate-tile-in { animation: tileIn 320ms ease-out both; }
          @keyframes modalIn { 0% { transform: scale(0.94); opacity: 0; } 60% { transform: scale(1.02); opacity: 1; } 100% { transform: scale(1); opacity: 1; } }
          .animate-modal-in { animation: modalIn 220ms cubic-bezier(0.2, 0.8, 0.2, 1.0) both; }
        `}</style>
      </section>
         <section className="relative w-full overflow-hidden py-24 bg-black">
        <div className="container mx-auto max-w-7xl px-6 md:px-8">
          <div className="text-white text-3xl md:text-4xl font-bold mb-8">Pricing, Scholarships & Financing</div>
          <div className="rounded-[24px] ring-1 ring-white/10 bg-white/5 p-6 md:p-8">
            <div className="flex flex-wrap gap-3 mb-6">
              <button onClick={() => setPricingTab('full')} className={`h-[40px] px-4 rounded-[20px] ${pricingTab==='full' ? 'bg-blue-600 text-white' : 'ring-1 ring-white/10 text-white bg-white/5 hover:bg-white/10'}`}>Full price</button>
              <button onClick={() => setPricingTab('monthly')} className={`h-[40px] px-4 rounded-[20px] ${pricingTab==='monthly' ? 'bg-blue-600 text-white' : 'ring-1 ring-white/10 text-white bg-white/5 hover:bg-white/10'}`}>Monthly</button>
              <button onClick={() => setPricingTab('employer')} className={`h-[40px] px-4 rounded-[20px] ${pricingTab==='employer' ? 'bg-blue-600 text-white' : 'ring-1 ring-white/10 text-white bg-white/5 hover:bg-white/10'}`}>Employer-sponsored</button>
              <Link href="/contact#scholarships" className="ml-auto inline-flex items-center h-[40px] px-4 rounded-[20px] ring-1 ring-cyan-300/60 text-white">Request scholarship</Link>
            </div>

            {pricingTab === 'full' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                <div className="md:col-span-1">
                  <div className="text-white text-4xl font-bold">$2,400</div>
                  <div className="text-gray-300">One-time</div>
                  <div className="text-white/70 text-sm mt-2">VAT/tax may apply based on location</div>
                </div>
                <div className="md:col-span-2">
                  <ul className="text-gray-300 text-sm grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <li className="rounded-md bg-black/40 ring-1 ring-white/10 px-3 py-2">Live labs and projects</li>
                    <li className="rounded-md bg-black/40 ring-1 ring-white/10 px-3 py-2">Mentor support and office hours</li>
                    <li className="rounded-md bg-black/40 ring-1 ring-white/10 px-3 py-2">Career services and interview prep</li>
                    <li className="rounded-md bg-black/40 ring-1 ring-white/10 px-3 py-2">Cert preparation modules</li>
                  </ul>
                  <div className="mt-4 flex items-center gap-3">
                    <Link href="/contact" className="inline-flex items-center h-[48px] px-6 rounded-[24px] bg-blue-600 text-white font-semibold">Apply Now</Link>
                  </div>
                </div>
              </div>
            )}

            {pricingTab === 'monthly' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                <div className="md:col-span-1">
                  <div className="text-white text-4xl font-bold">${monthlyPrice}<span className="text-white/70 text-lg">/mo</span></div>
                  <div className="text-gray-300">Total ${monthlyPrice * months} for {months} months</div>
                  <div className="text-white/70 text-sm mt-2">VAT/tax may apply based on location</div>
                  <div className="mt-3">
                    <label htmlFor="months" className="block text-white text-sm mb-1">Months</label>
                    <input id="months" type="range" min={3} max={12} value={months} onChange={(e) => setMonths(parseInt(e.target.value))} className="w-full" />
                    <div className="text-white text-sm mt-1">{months} months</div>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <ul className="text-gray-300 text-sm grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <li className="rounded-md bg-black/40 ring-1 ring-white/10 px-3 py-2">Same inclusions as full price</li>
                    <li className="rounded-md bg-black/40 ring-1 ring-white/10 px-3 py-2">Flexible schedule</li>
                    <li className="rounded-md bg-black/40 ring-1 ring-white/10 px-3 py-2">Pause/resume option</li>
                    <li className="rounded-md bg-black/40 ring-1 ring-white/10 px-3 py-2">Scholarships available</li>
                  </ul>
                  <div className="mt-4 flex items-center gap-3">
                    <Link href="/contact" className="inline-flex items-center h-[48px] px-6 rounded-[24px] bg-blue-600 text-white font-semibold">Apply Monthly</Link>
                    <Link href="/contact#scholarships" className="inline-flex items-center h-[48px] px-6 rounded-[24px] ring-1 ring-cyan-300/60 text-white">Request scholarship</Link>
                  </div>
                </div>
              </div>
            )}

            {pricingTab === 'employer' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                <div className="md:col-span-1">
                  <div className="text-white text-4xl font-bold">$0<span className="text-white/70 text-lg"> out-of-pocket</span></div>
                  <div className="text-gray-300">Employer-sponsored cohorts</div>
                  <div className="text-white/70 text-sm mt-2">VAT/tax handled by employer per policy</div>
                </div>
                <div className="md:col-span-2">
                  <ul className="text-gray-300 text-sm grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <li className="rounded-md bg-black/40 ring-1 ring-white/10 px-3 py-2">Sponsorship letter template</li>
                    <li className="rounded-md bg-black/40 ring-1 ring-white/10 px-3 py-2">Cohort scheduling with employer</li>
                    <li className="rounded-md bg-black/40 ring-1 ring-white/10 px-3 py-2">Reporting for L&D</li>
                    <li className="rounded-md bg-black/40 ring-1 ring-white/10 px-3 py-2">Outcome tracking</li>
                  </ul>
                  <div className="mt-4 flex items-center gap-3">
                    <Link href="/contact#employer" className="inline-flex items-center h-[48px] px-6 rounded-[24px] bg-blue-600 text-white font-semibold">Talk to team</Link>
                    <Link href="/contact#letter" className="inline-flex items-center h-[48px] px-6 rounded-[24px] ring-1 ring-white/10 text-white">Get sponsorship letter</Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="relative w-full overflow-hidden py-24">
        <div className="absolute inset-0 -z-10" style={{ backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.95) 50%, rgba(0,170,255,0.12) 100%), repeating-linear-gradient(to right, rgba(0,170,255,0.08) 0px, rgba(0,170,255,0.08) 1px, transparent 1px, transparent 30px)' }}></div>
        <div className="container mx-auto max-w-7xl px-6 md:px-8">
          <div className="rounded-[24px] ring-1 ring-white/10 bg-white/5 p-10 text-center">
            <div className="text-white text-3xl md:text-4xl font-bold mb-3">Ready to start?</div>
            <div className="text-gray-300 mb-6">Apply now and join the next Atlanta SOC cohort.</div>
            <Link href="/contact" className="inline-flex items-center h-[56px] px-10 text-base font-bold text-white rounded-[32px] border-2 border-cyan-300/70 hover:border-cyan-300 transition-colors">Apply for Cohort</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function SimTerminal({ playing, lines }: { playing: boolean; lines: string[] }) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    if (!playing) return;
    const int = setInterval(() => {
      setIdx((i) => Math.min(lines.length, i + 1));
    }, 700);
    return () => clearInterval(int);
  }, [playing, lines]);
  return (
    <div className="rounded-[12px] bg-black/60 ring-1 ring-white/10 p-3 h-full text-white text-xs font-mono overflow-auto">
      {lines.slice(0, idx).map((l, i) => (
        <div key={l + i}>$ {l}</div>
      ))}
    </div>
  );
}

function SimSIEMChart() {
  const [vals, setVals] = useState([6, 12, 4]);
  useEffect(() => {
    const int = setInterval(() => {
      setVals(([a, b, c]) => [Math.max(2, Math.min(10, a + (Math.random() > 0.5 ? 1 : -1))), Math.max(8, Math.min(16, b + (Math.random() > 0.5 ? 1 : -1))), Math.max(1, Math.min(8, c + (Math.random() > 0.5 ? 1 : -1)))]);
    }, 900);
    return () => clearInterval(int);
  }, []);
  const labels = ["High", "Medium", "Low"];
  return (
    <div className="rounded-[12px] bg-black/60 ring-1 ring-white/10 p-3 text-white text-xs">
      {vals.map((v, i) => (
        <div key={i} className="flex items-center gap-2 mb-2">
          <span className="w-12 text-right">{labels[i]}</span>
          <div className="flex-1 h-3 rounded-full bg-white/10 overflow-hidden">
            <div className={`h-3 rounded-full ${i===0?'bg-red-500':i===1?'bg-yellow-400':'bg-green-500'}`} style={{ width: `${(v/16)*100}%` }}></div>
          </div>
          <span className="w-8 text-right">{v}</span>
        </div>
      ))}
    </div>
  );
}

function SimHeatmap() {
  const size = 6;
  const [active, setActive] = useState<Record<string, boolean>>({});
  useEffect(() => {
    const int = setInterval(() => {
      const r = Math.floor(Math.random() * size);
      const c = Math.floor(Math.random() * size);
      const k = `${r}-${c}`;
      setActive((prev) => ({ ...prev, [k]: !prev[k] }));
    }, 400);
    return () => clearInterval(int);
  }, []);
  return (
    <div className="grid grid-cols-6 gap-1 h-full">
      {Array.from({ length: size * size }).map((_, i) => {
        const r = Math.floor(i / size);
        const c = i % size;
        const k = `${r}-${c}`;
        const on = active[k];
        return <div key={k} className={`h-full min-h-[20px] rounded-sm ${on ? 'bg-cyan-400' : 'bg-white/10'}`}></div>;
      })}
    </div>
  );
}

function SimPacketStream() {
  return (
    <div className="relative h-full min-h-[180px] rounded-[12px] bg-black/60 ring-1 ring-white/10 overflow-hidden">
      <div className="absolute left-0 right-0 top-1/3 h-1 bg-white/10"></div>
      <div className="absolute left-0 right-0 top-2/3 h-1 bg-white/10"></div>
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="absolute h-2 w-2 rounded-full bg-cyan-300" style={{ top: `${20 + (i%2)*40}%`, animation: `pktMove 3s linear ${i*0.2}s infinite` }}></div>
      ))}
      <style jsx>{`
        @keyframes pktMove { 0% { transform: translateX(0); opacity: 0.2; } 10% { opacity: 1; } 100% { transform: translateX(100%); opacity: 0.6; } }
      `}</style>
    </div>
  );
}