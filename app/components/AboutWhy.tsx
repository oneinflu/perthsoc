'use client';

export default function AboutWhy() {
  const items = [
    {
      title: 'Comprehensive GAP Analysis',
      desc: 'We offer comprehensive GAP analysis services to identify and address security and compliance gaps in critical infrastructure, defense, and enterprise environments. Our expertise helps organizations align with industry standards, regulatory requirements, and best practices.',
      icon: 'gap',
    },
    {
      title: 'Industry–Driven Innovation',
      desc: 'We deliver AI‑driven cybersecurity and advanced computing solutions for critical industries. Predictive threat detection, real‑time analytics, and scalable computing optimize efficiency and resilience.',
      icon: 'innovation',
    },
    {
      title: 'Trusted Partnerships',
      desc: 'We partner with leading cybersecurity, HPC, and storage technology vendors to deliver tailored, best‑in‑class solutions for critical industries. Collaborations provide robust frameworks, scalable platforms, and advanced storage solutions.',
      icon: 'partners',
    },
    {
      title: 'Local Expertise, Global Reach',
      desc: 'With a strong regional presence and operations spanning multiple states and countries, we provide dedicated support while leveraging global innovations and best practices to keep operations secure and future‑ready.',
      icon: 'global',
    },
  ];

  const Icon = ({ name }: { name: string }) => {
    if (name === 'gap') return (<svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="9" /><path d="M8 12h8" /></svg>);
    if (name === 'innovation') return (<svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 2v6M12 16v6M2 12h6M16 12h6" /><circle cx="12" cy="12" r="4" /></svg>);
    if (name === 'partners') return (<svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M8 7a4 4 0 1 0 0 8h8a4 4 0 1 0 0-8H8Z" /><path d="M6 17l-2 4M18 17l2 4" /></svg>);
    return (<svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 12l6-6 6 6-6 6-6-6Z" /><circle cx="18" cy="6" r="3" /></svg>);
  };

  return (
    <section className="relative w-full overflow-hidden py-24 bg-black">
      <div className="absolute inset-0 -z-10 about-why-grid"></div>
      <div className="container mx-auto max-w-7xl px-6 md:px-8">
        <div className="text-center mb-8 md:mb-10">
          <div className="text-white text-3xl md:text-4xl font-bold">Why Atlanta SOC?</div>
          <div className="text-gray-300 max-w-5xl mx-auto mt-3">Your partner in critical infrastructure security and high‑performance computing. We bridge the gap between global technology innovators and regional industries, delivering world‑class cybersecurity solutions tailored to Atlanta and beyond.</div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {items.map((it) => (
            <div key={it.title} className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-full bg-white/5 ring-1 ring-white/10 flex items-center justify-center text-white/80">
                <Icon name={it.icon} />
              </div>
              <div>
                <div className="text-white font-semibold text-lg mb-1">{it.title}</div>
                <div className="text-gray-300 text-sm md:text-base leading-relaxed">{it.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        .about-why-grid { background-image: radial-gradient(rgba(0,255,200,0.14) 1px, transparent 1px); background-size: 32px 32px; animation: whyShift 26s linear infinite; opacity: 0.16; }
        @keyframes whyShift { 0% { background-position: 0 0; } 50% { background-position: 70px 30px; } 100% { background-position: 0 0; } }
      `}</style>
    </section>
  );
}
