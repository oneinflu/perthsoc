/* eslint-disable @next/next/no-img-element */
// ... existing code ...

'use client';

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type CountUpProps = {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
};

function CountUp({ end, duration = 1200, prefix = "", suffix = "", className = "" }: CountUpProps) {
  const [value, setValue] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started) {
            setStarted(true);
            const start = performance.now();
            const step = (now: number) => {
              const progress = Math.min((now - start) / duration, 1);
              setValue(Math.floor(progress * end));
              if (progress < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [end, duration, started]);

  const formatted = new Intl.NumberFormat().format(value);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

type Slide = {
  title: string;
  image: string;
  href?: string;
};

function SolutionsCarousel() {
  const slides: Slide[] = [
    { title: "SOC Analyst – Level 1", image: "/jobroles/1.png" },
    { title: "SOC Analyst – Level 2", image: "/jobroles/2.png" },
    { title: "Threat Hunter", image: "/jobroles/3.png" },
    { title: "Incident Responder", image: "/jobroles/4.png" },
    { title: "SOC Manager", image: "/jobroles/5.png" },
  ];

  const [active, setActive] = useState(2);
  const [visible, setVisible] = useState(5);

  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      if (w < 768) setVisible(1); // mobile
      else if (w < 1024) setVisible(3); // md
      else setVisible(5); // lg/xl
    };
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, []);

  const centerPos = Math.floor(visible / 2);
  const indices = Array.from({ length: visible }, (_, k) => (active - centerPos + k + slides.length) % slides.length);
  const prev = () => setActive((a) => (a - 1 + slides.length) % slides.length);
  const next = () => setActive((a) => (a + 1) % slides.length);

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-white text-4xl md:text-5xl font-bold">Job Roles</h2>
        <div className="hidden md:flex items-center gap-3">
          <button onClick={prev} className="h-10 w-10 rounded-full bg-blue-600 text-white flex items-center justify-center active:scale-95">←</button>
          <button onClick={next} className="h-10 w-10 rounded-full bg-blue-600 text-white flex items-center justify-center active:scale-95">→</button>
        </div>
      </div>

      <div className="relative">
        <button onClick={prev} aria-label="Previous" className="md:hidden absolute left-2 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-md active:scale-95">←</button>
        <button onClick={next} aria-label="Next" className="md:hidden absolute right-2 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-md active:scale-95">→</button>
        
        <div className="flex items-end justify-center gap-3 md:gap-6 lg:gap-8 overflow-hidden">
          {indices.map((idx, pos) => {
            const s = slides[idx];
            const isCenter = pos === centerPos;
            const baseW = isCenter ? "w-[80vw] sm:w-[280px] md:w-[340px] lg:w-[380px]" : "w-[42vw] sm:w-[200px] md:w-[240px] lg:w-[260px]";
            return (
              <div key={s.title + idx} className={`relative ${baseW} h-[380px] sm:h-[440px] md:h-[520px] rounded-[28px] overflow-hidden transition-all duration-300 ${isCenter ? "scale-100" : "scale-[.94]"}`}>
                <img src={s.image} alt={s.title} className="h-full w-full object-cover z-0" />
                <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-blue-500/60 via-blue-600/30 to-black/99" />
                <div className="absolute inset-0 z-20 flex items-end justify-center p-4">
                  <div className={`text-white text-center ${isCenter ? "text-xl md:text-2xl font-semibold" : "text-lg md:text-xl"}`}>{s.title}</div>
                </div>
              </div>
            );
          })}
        </div>
       
      </div>
    </div>
  );
}

type SalaryTier = { name: string; min: number; max: number; median: number };

function SalaryBars() {
  const tiers: SalaryTier[] = [
    { name: "Entry-Level", min: 55, max: 65, median: 60 },
    { name: "Mid-Level", min: 70, max: 90, median: 80 },
    { name: "Senior-Level", min: 95, max: 125, median: 110 },
  ];
  const maxCap = 125;
  return (
    <div className="space-y-5">
      {tiers.map((t) => {
        const widthPct = ((t.max - t.min) / maxCap) * 100;
        const offsetPct = (t.min / maxCap) * 100;
        const medianPct = (t.median / maxCap) * 100;
        return (
          <div key={t.name} className="group">
            <div className="flex items-center justify-between mb-2">
              <div className="text-white font-medium">{t.name}</div>
              <div className="text-gray-300 text-sm">${t.min}k–${t.max}k</div>
            </div>
            <div className="relative h-4 rounded-full bg-white/10 overflow-hidden">
              <div
                className="absolute h-full rounded-full"
                style={{
                  width: `${widthPct}%`,
                  left: `${offsetPct}%`,
                  background:
                    "linear-gradient(90deg, rgba(0,200,255,0.75), rgba(0,120,255,0.85))",
                  boxShadow: "0 0 20px rgba(0,180,255,0.45)",
                }}
              />
              <div
                className="absolute -top-1 h-6 w-6 rounded-full border border-cyan-300/60 bg-white/90 shadow-[0_0_12px_rgba(0,200,255,0.6)]"
                style={{ left: `calc(${medianPct}% - 12px)` }}
              >
                <div className="absolute left-1/2 -translate-x-1/2 -top-8 px-2 py-1 rounded-md text-xs bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  Median: ${t.median}k
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

type JobCard = {
  title: string;
  badge: string;
  employers: string;
  skills: string;
};

function JobsCarousel() {
  const jobs: JobCard[] = [
    { title: "SOC Analyst I", badge: "Entry-level", employers: "Delta, EY, NCR", skills: "SIEM monitoring · Triage · Incident escalation" },
    { title: "Threat Intelligence Analyst", badge: "Mid-level", employers: "EY, Equifax, UPS", skills: "OSINT · MITRE ATT&CK · Reporting" },
    { title: "Incident Response Associate", badge: "Urgent Hiring", employers: "Cox, Fiserv, Deloitte", skills: "Logs · Forensics · Containment steps" },
    { title: "Cloud Security Apprentice", badge: "Entry-level", employers: "Microsoft, Google, NCR", skills: "IAM · Azure security · Event logs" },
  ];
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const int = setInterval(() => {
      setActive((a) => (a + 1) % jobs.length);
    }, 4000);
    return () => clearInterval(int);
  }, [jobs.length]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const child = el.children[active] as HTMLElement | undefined;
    if (child) {
      const childCenter = child.offsetLeft + child.offsetWidth / 2;
      const targetLeft = Math.max(0, childCenter - el.clientWidth / 2);
      el.scrollTo({ left: targetLeft, behavior: "smooth" });
    }
  }, [active]);

  return (
    <div className="relative">
      <div
        ref={scrollerRef}
        className="flex overflow-x-auto no-scrollbar gap-4 md:gap-6 px-1"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {jobs.map((j, i) => (
          <div
            key={j.title + i}
            className="relative shrink-0 rounded-[20px] ring-1 ring-white/10 bg-white/5 backdrop-blur-sm p-5 md:p-6 w-[75%] sm:w-[60%] md:w-[32%] scroll-snap-align-center transition-all hover:scale-[1.02] hover:ring-cyan-300/40 hover:shadow-[0_0_24px_rgba(0,200,255,0.35)]"
            style={{ scrollSnapAlign: "center" }}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="text-white text-lg md:text-xl font-semibold">{j.title}</div>
              <span className="px-2 py-0.5 rounded-full text-xs bg-blue-600 text-white">{j.badge}</span>
            </div>
            <div className="text-gray-300 text-sm mb-2">Hiring companies: {j.employers}</div>
            <div className="text-white text-sm md:text-base">{j.skills}</div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-center gap-2">
        {jobs.map((_, i) => (
          <span key={i} className={`h-1.5 rounded-full ${i === active ? "w-8 bg-blue-500" : "w-3 bg-white/40"}`}></span>
        ))}
      </div>
    </div>
  );
}

type FaqItem = { q: string; a: string };
type FaqGroup = { id: string; title: string; icon: 'briefcase' | 'laptop' | 'shield'; items: FaqItem[] };

function FAQsSection() {
  const groups: FaqGroup[] = [
    {
      id: 'job-market',
      title: 'Job Market & Salaries',
      icon: 'briefcase',
      items: [
        { q: 'Are there enough cybersecurity jobs in Atlanta right now?', a: 'Yes. Atlanta is a major tech and enterprise hub with consistent demand across SOC, IR, and Threat roles.' },
        { q: 'What is the average SOC Analyst salary in Atlanta?', a: 'Typical ranges are $55k–$65k for entry, $70k–$90k for mid, and $95k–$125k for senior, depending on experience and certs.' },
        { q: 'Which companies in Atlanta hire SOC analysts?', a: 'Common employers include Delta, EY, NCR, Equifax, UPS, Cox, Fiserv, Deloitte, and major MSSPs.' },
        { q: 'Can I get a remote SOC job from Atlanta?', a: 'Hybrid and remote roles are common, especially with MSSPs and cloud-focused teams.' },
      ],
    },
    {
      id: 'training',
      title: 'Training, Tools & Internships',
      icon: 'laptop',
      items: [
        { q: 'Do you offer internships or apprenticeships?', a: 'Yes. Structured pathways may include partner projects, shadowing, and real alert triage exposure.' },
        { q: 'What tools and technologies will I learn?', a: 'Core SOC tools such as SIEM, EDR, case management, and playbook automation, plus frameworks like MITRE ATT&CK.' },
        { q: 'Do I need technical experience to start the course?', a: 'Beginner-friendly. Prior exposure helps but is not required; fundamentals are covered early.' },
        { q: 'Which certifications does this course prepare me for?', a: 'Prepares for entry to mid-level certs such as CompTIA Security+, CySA+, and vendor SIEM foundations.' },
      ],
    },
    {
      id: 'eligibility',
      title: 'Eligibility, Visa & Placement Support',
      icon: 'shield',
      items: [
        { q: 'Do you assist with job placement?', a: 'Yes. Guidance includes resume curation, interview prep, referrals, and active job matching when available.' },
        { q: 'Do Atlanta employers accept international/visa candidates?', a: 'Many employers consider OPT/CPT candidates depending on role scope and compliance. Policies vary by company.' },
        { q: 'Do companies require a degree for SOC roles?', a: 'Not always. Skills, certs, and hands-on practice often outweigh degree requirements, especially for analyst tracks.' },
        { q: 'How long does it take to get hired after completing the course?', a: 'Varies by learner. Typical timelines range from 4–12 weeks with focused applications and portfolio proof.' },
      ],
    },
  ];

  const [openGroup, setOpenGroup] = useState<string | null>(groups[0].id);
  const [openItem, setOpenItem] = useState<Record<string, number | null>>({ 'job-market': 0, training: null, eligibility: null });

  const scrollToId = (id: string) => {
    const el = document.getElementById(`faq-${id}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="relative w-full overflow-hidden py-24  bg-black">
      <div className="absolute inset-0 -z-10" style={{ backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.96) 50%, rgba(0,170,255,0.1) 100%), repeating-linear-gradient(to right, rgba(0,170,255,0.08) 0px, rgba(0,170,255,0.08) 1px, transparent 1px, transparent 30px)' }}></div>
      <div className="absolute inset-0 -z-10 faq-grid"></div>

      <div className="container mx-auto max-w-7xl px-6 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-white text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions — Atlanta</h2>
          <p className="text-gray-300 max-w-3xl mx-auto">Answers grouped by topic to help you scan quickly and get confident about next steps.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8 md:gap-12 items-start">
          <div className="hidden lg:block lg:sticky top-24 self-start">
            <div className="rounded-[16px] ring-1 ring-white/10 bg-white/5 backdrop-blur-sm p-4">
              <button onClick={() => { setOpenGroup('job-market'); scrollToId('job-market'); }} className={`w-full text-left px-3 py-2 rounded-[10px] text-white ${openGroup==='job-market' ? 'bg-blue-600/40' : 'hover:bg-white/10'}`}>Job Market & Salaries</button>
              <button onClick={() => { setOpenGroup('training'); scrollToId('training'); }} className={`mt-2 w-full text-left px-3 py-2 rounded-[10px] text-white ${openGroup==='training' ? 'bg-blue-600/40' : 'hover:bg-white/10'}`}>Training & Internships</button>
              <button onClick={() => { setOpenGroup('eligibility'); scrollToId('eligibility'); }} className={`mt-2 w-full text-left px-3 py-2 rounded-[10px] text-white ${openGroup==='eligibility' ? 'bg-blue-600/40' : 'hover:bg-white/10'}`}>Eligibility, Visa & Remote</button>
            </div>
          </div>

          <div>
            {groups.map((g) => {
              const isOpen = openGroup === g.id;
              const currentItem = openItem[g.id] ?? null;
              const icon = (
                g.icon === 'briefcase' ? (
                  <svg viewBox="0 0 24 24" className="h-6 w-6 text-cyan-300" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 7h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" /><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" /></svg>
                ) : g.icon === 'laptop' ? (
                  <svg viewBox="0 0 24 24" className="h-6 w-6 text-cyan-300" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="5" width="18" height="12" rx="2" /><path d="M2 19h20" /></svg>
                ) : (
                  <svg viewBox="0 0 24 24" className="h-6 w-6 text-cyan-300" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 2l9 4-9 4-9-4 9-4Z" /><path d="M12 10l9-4v8l-9 4-9-4V6l9 4Z" /></svg>
                )
              );

              return (
                <div key={g.id} id={`faq-${g.id}`} className="rounded-[20px] ring-1 ring-white/10 bg-white/5 backdrop-blur-sm mb-6">
                  <button onClick={() => setOpenGroup(isOpen ? null : g.id)} className="w-full flex items-center justify-between px-6 py-5">
                    <div className="flex items-center gap-3">
                      <span className="h-6 w-1.5 rounded-full bg-cyan-400"></span>
                      {icon}
                      <span className="text-white text-xl md:text-2xl font-semibold">{g.title}</span>
                    </div>
                    <span className="text-white">{isOpen ? '−' : '+'}</span>
                  </button>
                  <div className={`overflow-hidden transition-[max-height] duration-250 ${isOpen ? 'max-h-[1600px]' : 'max-h-0'}`}>
                    <div className="px-6 pb-6">
                      {g.items.map((item, idx) => {
                        const itemOpen = currentItem === idx;
                        const onToggle = () => {
                          setOpenGroup(g.id);
                          setOpenItem((prev) => ({ ...prev, [g.id]: itemOpen ? null : idx }));
                          const el = document.getElementById(`faq-${g.id}-item-${idx}`);
                          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        };
                        return (
                          <div key={item.q} id={`faq-${g.id}-item-${idx}`} className="rounded-[14px] ring-1 ring-white/10 bg-white/5 mb-3">
                            <button onClick={onToggle} className="w-full text-left px-6 py-4 text-white text-lg md:text-xl font-medium flex justify-between items-center">
                              <span>{item.q}</span>
                              <span>{itemOpen ? '−' : '+'}</span>
                            </button>
                            <div className={`overflow-hidden transition-[max-height] duration-250 ${itemOpen ? 'max-h-[600px]' : 'max-h-0'}`}>
                              <div className="px-6 pb-6 text-gray-300 text-sm md:text-base leading-relaxed">
                                {item.a}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style jsx>{`
        .faq-grid { background-image: radial-gradient(rgba(0,255,200,0.14) 1px, transparent 1px); background-size: 32px 32px; animation: faqShift 30s linear infinite; opacity: 0.18; }
        @keyframes faqShift { 0% { background-position: 0 0; } 50% { background-position: 60px 30px; } 100% { background-position: 0 0; } }
      `}</style>
    </section>
  );
}

function WhatIsSOCSection() {
  return (
    <section className="relative w-full overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0 -z-10" style={{ backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.95) 55%, rgba(0, 0, 0, 1) 100%)' }}></div>
      <div className="absolute inset-0 -z-10 soc-grid"></div>
      <div className="container mx-auto max-w-7xl px-6 md:px-8">
        <div className="text-center mb-10">
          <div className="text-white text-3xl md:text-4xl font-bold">What is a Security Operations Center (SOC)?</div>
          <p className="text-gray-300 max-w-3xl mx-auto mt-3">A SOC is the mission control hub of cybersecurity — where experts monitor, detect, investigate, and respond to threats 24/7. At Atlanta SOC, we help you master every skill needed to become a world-class cyber defender.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center mb-16">
          <div>
            <div className="text-white text-3xl md:text-4xl font-bold mb-3">Understand the Core of Cyber Defense.</div>
            <p className="text-gray-300">A SOC is where organizations protect digital assets in real time. Our training makes you job-ready by teaching tools, workflows, and attacks handled by real SOC teams.</p>
          </div>
          <div className="rounded-[20px] ring-1 ring-white/10 bg-white/5 backdrop-blur-sm p-6 md:p-8 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-black/30" />
            <svg viewBox="0 0 240 160" className="w-full h-[220px] md:h-[260px]" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="10" y="10" width="220" height="140" rx="12" stroke="rgba(255,255,255,0.35)" />
              <path d="M40 110c20-20 40-20 60 0 20 20 40 20 60 0" stroke="#00C8FF" strokeWidth="2" opacity="0.8" />
              <circle cx="120" cy="70" r="26" stroke="#6E00FF" strokeWidth="2" opacity="0.8" />
              <path className="dash" d="M120 44v52" stroke="#00C8FF" strokeWidth="2" />
              <path className="dash" d="M94 70h52" stroke="#00C8FF" strokeWidth="2" />
              <path d="M30 40h80" stroke="rgba(255,255,255,0.25)" />
              <path d="M30 52h60" stroke="rgba(255,255,255,0.25)" />
              <path d="M30 64h70" stroke="rgba(255,255,255,0.25)" />
            </svg>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <div className="group rounded-[20px] ring-1 ring-white/10 bg-white/5 backdrop-blur-sm p-6 transition-all hover:scale-[1.02] hover:ring-cyan-300/40 hover:shadow-[0_0_24px_rgba(0,200,255,0.35)]">
            <svg viewBox="0 0 24 24" className="mb-4 h-8 w-8 text-white/80" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M12 4l8 4v6c0 4.418-3.582 8-8 8s-8-3.582-8-8V8l8-4Z" /><path d="M9 13l3 3 4-4" /></svg>
            <div className="text-white font-semibold text-lg mb-1">SOC Fundamentals</div>
            <div className="text-gray-300 text-sm">Learn how SOC teams function, handle attacks, and secure organizations with 24/7 monitoring and defense operations.</div>
          </div>
          <div className="group rounded-[20px] ring-1 ring-white/10 bg-white/5 backdrop-blur-sm p-6 transition-all hover:scale-[1.02] hover:ring-cyan-300/40 hover:shadow-[0_0_24px_rgba(0,200,255,0.35)]">
            <svg viewBox="0 0 24 24" className="mb-4 h-8 w-8 text-white/80" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><rect x="3" y="4" width="18" height="14" rx="2" /><path d="M7 12h10M7 8h6" /></svg>
            <div className="text-white font-semibold text-lg mb-1">SIEM & Log Analysis</div>
            <div className="text-gray-300 text-sm">Master tools like Splunk, ELK, and QRadar. Understand logs, create detection rules, and analyze real attack patterns.</div>
          </div>
          <div className="group rounded-[20px] ring-1 ring-white/10 bg-white/5 backdrop-blur-sm p-6 transition-all hover:scale-[1.02] hover:ring-cyan-300/40 hover:shadow-[0_0_24px_rgba(0,200,255,0.35)]">
            <svg viewBox="0 0 24 24" className="mb-4 h-8 w-8 text-white/80" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><circle cx="12" cy="12" r="5" /><path d="M2 12h4M18 12h4M12 2v4M12 18v4" /></svg>
            <div className="text-white font-semibold text-lg mb-1">Threat Intelligence</div>
            <div className="text-gray-300 text-sm">Identify attacker behavior, malware patterns, and emerging threats using global intelligence feeds.</div>
          </div>
          <div className="group rounded-[20px] ring-1 ring-white/10 bg-white/5 backdrop-blur-sm p-6 transition-all hover:scale-[1.02] hover:ring-cyan-300/40 hover:shadow-[0_0_24px_rgba(0,200,255,0.35)]">
            <svg viewBox="0 0 24 24" className="mb-4 h-8 w-8 text-white/80" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M12 3l8 6-8 6-8-6 8-6Z" /><path d="M12 9v6" /></svg>
            <div className="text-white font-semibold text-lg mb-1">Incident Response</div>
            <div className="text-gray-300 text-sm">Respond to cyber attacks with structured steps—triage, containment, eradication, recovery, and reporting.</div>
          </div>
          <div className="group rounded-[20px] ring-1 ring-white/10 bg-white/5 backdrop-blur-sm p-6 transition-all hover:scale-[1.02] hover:ring-cyan-300/40 hover:shadow-[0_0_24px_rgba(0,200,255,0.35)]">
            <svg viewBox="0 0 24 24" className="mb-4 h-8 w-8 text-white/80" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 2v6M12 16v6M2 12h6M16 12h6" /></svg>
            <div className="text-white font-semibold text-lg mb-1">Threat Hunting</div>
            <div className="text-gray-300 text-sm">Proactively search for hidden threats using behavioral patterns, MITRE ATT&CK, and advanced detection methods.</div>
          </div>
          <div className="group rounded-[20px] ring-1 ring-white/10 bg-white/5 backdrop-blur-sm p-6 transition-all hover:scale-[1.02] hover:ring-cyan-300/40 hover:shadow-[0_0_24px_rgba(0,200,255,0.35)]">
            <svg viewBox="0 0 24 24" className="mb-4 h-8 w-8 text-white/80" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M7 7h10M7 12h10M10 17h8" /><rect x="3" y="4" width="18" height="16" rx="2" /></svg>
            <div className="text-white font-semibold text-lg mb-1">Vulnerability Management</div>
            <div className="text-gray-300 text-sm">Learn to scan, assess, prioritize, and remediate vulnerabilities across networks, apps, and cloud systems.</div>
          </div>
        </div>

        <div className="mt-14 text-center">
          <div className="text-white text-2xl md:text-3xl font-bold mb-6">Become a Cyber Defender. Learn SOC the Right Way.</div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/course/" className="inline-flex items-center h-[48px] px-6 rounded-[24px] bg-blue-600 text-white font-semibold">Start Free Course</Link>
            <Link href="/course/" className="inline-flex items-center h-[48px] px-6 rounded-[24px] ring-1 ring-white/15 text-white hover:bg-white/10">Explore Full SOC Path</Link>
          </div>
        </div>
      </div>
      <style jsx>{`
        .soc-grid { background-image: radial-gradient(rgba(0,255,200,0.14) 1px, transparent 1px); background-size: 32px 32px; animation: socShift 26s linear infinite; opacity: 0.16; }
        @keyframes socShift { 0% { background-position: 0 0; } 50% { background-position: 70px 30px; } 100% { background-position: 0 0; } }
        .dash { stroke-dasharray: 6 6; animation: dashMove 2.2s linear infinite; }
        @keyframes dashMove { to { stroke-dashoffset: 24; } }
      `}</style>
    </section>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen font-sans">
      {/* Hero Section */}
      <section className="relative min-h-screen md:h-screen w-full overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover"
          >
            <source src="https://oneinflu.b-cdn.net/atlanta.mp4" type="video/mp4" />
          </video>
          {/* Dark Overlay Gradient */}
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        {/* Hero Content */}
        <div className="container mx-auto relative z-10 h-full flex flex-col justify-center px-4 md:px-8 py-10 md:py-0">
          {/* Main Content Container */}
          <div className="max-w-4xl md:mb-20 md:mt-20 mb-10 mt-10">
            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-[64px] font-bold leading-tight md:leading-[1.1] text-white mb-6">
              Master the Art of Cyber Defense with Atlanta SOC.
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg md:text-xl leading-relaxed max-w-[720px] mb-8" style={{ color: 'rgba(255,255,255,0.75)' }}>
              Hands-on SOC training, real attack simulations, and industry-ready certification paths for future Cybersecurity Analysts.
            </p>

            {/* Primary CTA Button */}
            <div className="mb-16">
              <Link 
                href="#solutions" 
                className="inline-flex items-center h-[48px] sm:h-[52px] px-8 text-base font-bold text-white rounded-[28px] transition-all hover:opacity-90"
                style={{ background: 'linear-gradient(90deg, #0055FF, #6E00FF)' }}
              >
                Start Learning
                <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-white text-blue-600">
                  →
                </span>
              </Link>
            </div>
          </div>

          {/* Hero Metrics / Achievements Row */}
          <div className="pt-6 pb-10">
            <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-20">
              {/* Customers */}
              <div className="flex flex-col items-start">
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.15)', width: '100%', paddingTop: '12px' }}>
                  <div className="flex items-center mb-1">
                    <div className="w-[18px] h-[18px] rounded-full bg-white mr-2"></div>
                    <span 
                      className="text-[14px] uppercase tracking-[1px]"
                      style={{ color: 'rgba(255,255,255,0.6)' }}
                    >
                      JOBS AVAILABLE
                    </span>
                  </div>
                  <CountUp end={350} suffix="K+" className="text-3xl sm:text-4xl md:text-[48px] font-bold text-white mt-1 block" />
                </div>
              </div>

              {/* Partners */}
              <div className="flex flex-col items-start">
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.15)', width: '100%', paddingTop: '12px' }}>
                  <div className="flex items-center mb-1">
                    <div className="w-[18px] h-[18px] rounded-full bg-white mr-2"></div>
                    <span 
                      className="text-[14px] uppercase tracking-[1px]"
                      style={{ color: 'rgba(255,255,255,0.6)' }}
                    >
                      AVERAGE SALARY
                    </span>
                  </div>
                  <CountUp prefix="$" end={72} suffix="K+" className="text-3xl sm:text-4xl md:text-[48px] font-bold text-white mt-1 block" />
                </div>
              </div>

              {/* Deployments */}
              <div className="flex flex-col items-start">
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.15)', width: '100%', paddingTop: '12px' }}>
                  <div className="flex items-center mb-1">
                    <div className="w-[18px] h-[18px] rounded-full bg-white mr-2"></div>
                    <span 
                      className="text-[14px] uppercase tracking-[1px]"
                      style={{ color: 'rgba(255,255,255,0.6)' }}
                    >
                      CERTIFICATION PATHS
                    </span>
                  </div>
                  <CountUp end={15} suffix="+" className="text-3xl sm:text-4xl md:text-[48px] font-bold text-white mt-1 block" />
                </div>
              </div>

              {/* Countries */}
              <div className="flex flex-col items-start">
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.15)', width: '100%', paddingTop: '12px' }}>
                  <div className="flex items-center mb-1">
                    <div className="w-[18px] h-[18px] rounded-full bg-white mr-2"></div>
                    <span 
                      className="text-[14px] uppercase tracking-[1px]"
                      style={{ color: 'rgba(255,255,255,0.6)' }}
                    >
                      PLACEMENT SUCCESS
                    </span>
                  </div>
                  <CountUp end={92} suffix="%" className="text-3xl sm:text-4xl md:text-[48px] font-bold text-white mt-1 block" />
                </div>
              </div>
            </div>
          </div>

          {/* Transform Your Organization Section */}
          <div className="pt-8">
            <div className="flex flex-col md:flex-row items-start justify-between gap-6">
              <div className="w-full md:w-3/4 md:pr-8">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                 Launch a High-Income <br /> Cybersecurity Career with Atlanta SOC
                </h2>
              </div>
              <div className="w-full md:w-1/4 md:pl-8">
                <p className="text-gray-300 mb-6">
                  Gain real-world SOC skills, hands-on SIEM experience, and job-ready confidence through our practical, industry-aligned cybersecurity programs. </p>
                {/* <Link href="/solutions" className="inline-flex items-center text-white">
                  READ MORE
                  <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-white text-black">
                    →
                  </span>
                </Link> */}
              </div>
            </div>
          </div>
        </div>
      </section>

     

      
      <WhatIsSOCSection />

      {/* <section className="relative w-full overflow-hidden py-20 md:py-28 lg:py-36">
        <div className="absolute inset-0 -z-10 mission-bg"></div>
        <div className="absolute bottom-0 left-0 w-24 h-12 md:w-40 md:h-16 bg-black rounded-tr-[24px]"></div>
        <div className="absolute bottom-0 right-0 w-28 h-14 md:w-52 md:h-20 bg-black rounded-tl-[24px]"></div>

        <div className="container mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-8 lg:gap-12">
            <div className="group rounded-[24px] bg-white/10 backdrop-blur-sm ring-1 ring-white/15 p-8 sm:p-9 lg:p-12 text-center shadow-[0_12px_40px_rgba(0,0,0,0.35)] transition-all hover:bg-white/12 hover:ring-white/20 min-h-[260px] md:min-h-[280px] flex flex-col items-center">
              <svg viewBox="0 0 24 24" className="mx-auto mb-6 h-10 w-10 md:h-12 md:w-12 text-white/80 transition-colors group-hover:text-white" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <circle cx="12" cy="12" r="8" />
                <circle cx="12" cy="12" r="3" />
                <path d="M12 3v3M21 12h-3M12 21v-3M3 12h3" />
              </svg>
              <h3 className="text-white text-xl md:text-2xl font-semibold mb-3">Mission</h3>
              <p className="text-gray-300 leading-relaxed text-sm md:text-base max-w-[32ch] mx-auto">We keep systems secure with strong access controls, regular checks, and timely updates.</p>
            </div>

            <div className="group rounded-[24px] bg-white/10 backdrop-blur-sm ring-1 ring-white/15 p-8 sm:p-9 lg:p-12 text-center shadow-[0_12px_40px_rgba(0,0,0,0.35)] transition-all hover:bg-white/12 hover:ring-white/20 min-h-[260px] md:min-h-[280px] flex flex-col items-center">
              <svg viewBox="0 0 24 24" className="mx-auto mb-6 h-10 w-10 md:h-12 md:w-12 text-white/80 transition-colors group-hover:text-white" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <circle cx="8" cy="13" r="3" />
                <circle cx="16" cy="13" r="3" />
                <path d="M5 13l3-7M19 13l-3-7M9 6h6" />
              </svg>
              <h3 className="text-white text-xl md:text-2xl font-semibold mb-3">Vision</h3>
              <p className="text-gray-300 leading-relaxed text-sm md:text-base max-w-[32ch] mx-auto">We aim to work smarter, stay competitive, and keep our customers happy.</p>
            </div>

            <div className="group rounded-[24px] bg-white/10 backdrop-blur-sm ring-1 ring-white/15 p-8 sm:p-9 lg:p-12 text-center shadow-[0_12px_40px_rgba(0,0,0,0.35)] transition-all hover:bg-white/12 hover:ring-white/20 min-h-[260px] md:min-h-[280px] flex flex-col items-center">
              <svg viewBox="0 0 24 24" className="mx-auto mb-6 h-10 w-10 md:h-12 md:w-12 text-white/80 transition-colors group-hover:text-white" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path d="M12 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                <path d="M5 19c0-3.866 3.134-7 7-7s7 3.134 7 7" />
                <path d="M6 8.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                <path d="M18 8.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
              </svg>
              <h3 className="text-white text-xl md:text-2xl font-semibold mb-3">Values</h3>
              <p className="text-gray-300 leading-relaxed text-sm md:text-base max-w-[32ch] mx-auto">We focus on staying prepared with a strong recovery plan that&apos;s regularly tested and improved.</p>
            </div>
          </div>
        </div>
        <style jsx>{`
          .mission-bg {
            background-image:
              linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.96) 40%, rgba(0,72,255,0.45) 100%),
              repeating-linear-gradient(to right, rgba(0,119,255,0.08) 0px, rgba(0,119,255,0.08) 1px, transparent 1px, transparent 24px),
              radial-gradient(ellipse at bottom, rgba(0,72,255,0.35) 0%, transparent 60%);
          }
          @media (max-width: 640px) {
            .mission-bg {
              background-image:
                linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.96) 55%, rgba(0,72,255,0.35) 100%),
                repeating-linear-gradient(to right, rgba(0,119,255,0.10) 0px, rgba(0,119,255,0.10) 1px, transparent 1px, transparent 18px),
                radial-gradient(ellipse at 70% 100%, rgba(0,72,255,0.28) 0%, transparent 60%);
            }
          }
        `}</style>
      </section> */}

      <section className="relative w-full overflow-hidden pb-24 bg-black">
        <div className="absolute inset-0 -z-10" style={{ backgroundColor: '#000000' }}></div>
        <div className="container mx-auto max-w-7xl px-6 md:px-8">
          <SolutionsCarousel />
        </div>
      </section>

      <section className="relative w-full overflow-hidden py-28 md:py-36">
        <div className="absolute inset-0 -z-10" style={{ backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.96) 50%, rgba(0,72,255,0.35) 100%), repeating-linear-gradient(to right, rgba(0,119,255,0.06) 0px, rgba(0,119,255,0.06) 1px, transparent 1px, transparent 30px)' }}></div>
        <div className="container mx-auto max-w-7xl px-6 md:px-8">
          <div className="flex items-end justify-between mb-8">
            <h2 className="text-white text-4xl md:text-5xl font-bold">Live Global Threat Map</h2>
          </div>

          <div className="relative rounded-[24px] overflow-hidden ring-1 ring-white/10 bg-white/5 shadow-[0_12px_40px_rgba(0,0,0,0.35)]">
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-black/0" />
            <iframe
              src="https://livethreatmap.radware.com/"
              className="w-full h-[520px] md:h-[640px] lg:h-[720px]"
              loading="lazy"
              allow="fullscreen"
              referrerPolicy="no-referrer"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/40" />
          </div>
        </div>
      </section>
<section className="relative w-full overflow-hidden py-24 bg-black">
        <div className="absolute inset-0 -z-10" style={{ backgroundColor: '#000000' }}></div>
        <div className="absolute inset-0 -z-10 cyber-grid"></div>

        <div className="container mx-auto max-w-7xl px-6 md:px-8">
          <div className="text-center">
            <h2 className="text-white text-4xl md:text-5xl font-bold mb-8">Cyber careers in Atlanta — the facts</h2>
            <p className="text-gray-300 max-w-3xl mx-auto">Atlanta is one of the fastest-growing security job hubs in the U.S. Here’s what the numbers say.</p>
          </div>

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
            <div className="rounded-[20px] ring-1 ring-white/10 bg-white/5 backdrop-blur-sm p-6 md:p-8">
              <div className="text-white text-lg md:text-xl font-semibold mb-4">Salary Range</div>
              <SalaryBars />
            </div>
            <div className="rounded-[20px] ring-1 ring-white/10 bg-white/5 backdrop-blur-sm p-6 md:p-8">
              <ul className="space-y-3">
                <li className="text-white"><span className="font-semibold">Entry-Level:</span> $55k–$65k median around $60k</li>
                <li className="text-white"><span className="font-semibold">Mid-Level:</span> $70k–$90k median around $80k</li>
                <li className="text-white"><span className="font-semibold">Senior-Level:</span> $95k–$125k median around $110k</li>
              </ul>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            <div className="group rounded-[20px] ring-1 ring-white/10 bg-white/5 backdrop-blur-sm p-6 md:p-8 text-center transition-all hover:scale-[1.02] hover:ring-cyan-300/40 hover:shadow-[0_0_24px_rgba(0,200,255,0.35)]">
              <svg viewBox="0 0 24 24" className="mx-auto mb-3 h-8 w-8 text-white/80" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                <rect x="3" y="4" width="18" height="14" rx="2" />
                <path d="M7 12h10M7 8h6" />
              </svg>
              <div className="text-white text-3xl md:text-4xl font-bold tracking-tight"><span className="group-hover:kpi-pulse">$78,400</span></div>
              <div className="text-gray-300 mt-2 text-sm md:text-base">Avg SOC Analyst salary (Atlanta)</div>
            </div>
            <div className="group rounded-[20px] ring-1 ring-white/10 bg-white/5 backdrop-blur-sm p-6 md:p-8 text-center transition-all hover:scale-[1.02] hover:ring-cyan-300/40 hover:shadow-[0_0_24px_rgba(0,200,255,0.35)]">
              <svg viewBox="0 0 24 24" className="mx-auto mb-3 h-8 w-8 text-white/80" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                <path d="M6 7h12M6 12h12M10 17h8" />
                <rect x="3" y="4" width="18" height="16" rx="2" />
              </svg>
              <div className="text-white text-3xl md:text-4xl font-bold tracking-tight"><span className="group-hover:kpi-pulse">3,200+</span></div>
              <div className="text-gray-300 mt-2 text-sm md:text-base">Cybersecurity job openings</div>
            </div>
            <div className="group rounded-[20px] ring-1 ring-white/10 bg-white/5 backdrop-blur-sm p-6 md:p-8 text-center transition-all hover:scale-[1.02] hover:ring-cyan-300/40 hover:shadow-[0_0_24px_rgba(0,200,255,0.35)]">
              <svg viewBox="0 0 24 24" className="mx-auto mb-3 h-8 w-8 text-white/80" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                <path d="M3 20h18M5 20V8l7-4 7 4v12M10 20v-6h4v6" />
              </svg>
              <div className="text-white text-3xl md:text-4xl font-bold tracking-tight"><span className="group-hover:kpi-pulse">35+</span></div>
              <div className="text-gray-300 mt-2 text-sm md:text-base">Top hiring companies</div>
            </div>
            <div className="group rounded-[20px] ring-1 ring-white/10 bg-white/5 backdrop-blur-sm p-6 md:p-8 text-center transition-all hover:scale-[1.02] hover:ring-cyan-300/40 hover:shadow-[0_0_24px_rgba(0,200,255,0.35)]">
              <svg viewBox="0 0 24 24" className="mx-auto mb-3 h-8 w-8 text-white/80" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                <path d="M4 16l4-4 4 4 8-8" />
                <path d="M4 20h16" />
              </svg>
              <div className="text-white text-3xl md:text-4xl font-bold tracking-tight"><span className="group-hover:kpi-pulse">18%</span></div>
              <div className="text-gray-300 mt-2 text-sm md:text-base">Job market growth (YoY)</div>
            </div>
          </div>

          <div className="mt-16">
            <div className="flex items-end justify-between mb-6">
              <h3 className="text-white text-3xl md:text-4xl font-bold">Job Spotlight</h3>
            </div>
            <JobsCarousel />
            <div className="mt-12 flex flex-col items-center">
              <Link href="/careers" className="inline-flex items-center h-[56px] px-10 text-base font-bold text-white rounded-[32px] border-2 border-cyan-300/70 hover:border-cyan-300 transition-colors relative">
                See Career Paths
                <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-white text-black">→</span>
                <span className="absolute inset-0 rounded-[32px] ring-0 group-hover:animate-neon"></span>
              </Link>
              <div className="text-gray-300 mt-3">Browse roles, salaries & your growth map</div>
            </div>
          </div>
        </div>

        <style jsx>{`
          .cyber-grid {
            background-image: radial-gradient(rgba(0,255,200,0.16) 1px, transparent 1px);
            background-size: 34px 34px;
            animation: gridShift 28s linear infinite;
            opacity: 0.22;
          }
          @keyframes gridShift {
            0% { background-position: 0 0; opacity: 0.18; }
            50% { background-position: 80px 40px; opacity: 0.28; }
            100% { background-position: 0 0; opacity: 0.18; }
          }
          .group:hover .group-hover\:kpi-pulse { animation: kpiPulse 650ms ease-out 1; }
          @keyframes kpiPulse {
            0% { transform: scale(1); filter: drop-shadow(0 0 0 rgba(0,200,255,0)); }
            40% { transform: scale(1.06); filter: drop-shadow(0 0 10px rgba(0,200,255,0.45)); }
            100% { transform: scale(1); filter: drop-shadow(0 0 0 rgba(0,200,255,0)); }
          }
          @keyframes neonBorder {
            0% { box-shadow: 0 0 0 rgba(0,200,255,0); }
            50% { box-shadow: 0 0 24px rgba(0,200,255,0.55); }
            100% { box-shadow: 0 0 0 rgba(0,200,255,0); }
          }
          .group-hover\:animate-neon:hover { animation: neonBorder 900ms ease-out 1; }
        `}</style>
      </section>
      <FAQsSection />
    </div>
  );
}
