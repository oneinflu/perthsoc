'use client';

export default function AboutOverview() {
  return (
    <section className="relative w-full overflow-hidden py-28 md:py-32 bg-black">
      <div className="absolute inset-0 -z-10" style={{ backgroundColor: '#000000' }}></div>
      <div className="absolute inset-0 -z-10 about-overview-grid"></div>
      <div className="container mx-auto max-w-7xl px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-start">
          <div>
            <div className="text-white text-3xl md:text-4xl font-bold mb-5">Atlanta’s Security Operations Center vision</div>
            <p className="text-gray-300 mb-4 leading-relaxed">Atlanta SOC enables practitioners to operate in real environments with the tools, workflows, and skills used by modern teams defending enterprises across the city.</p>
            <p className="text-gray-300 mb-4 leading-relaxed">We focus on practical mastery: SIEM engineering, detections, threat intelligence, incident response, and threat hunting—aligned to Atlanta’s hiring market and enterprise needs.</p>
            <p className="text-gray-300 leading-relaxed">Our approach blends hands-on labs, guided mentoring, and outcome-driven projects to build a strong portfolio and readiness for high-impact roles.</p>
          </div>
          <div className="grid grid-cols-1 gap-5">
            <div className="group rounded-[20px] ring-1 ring-white/10 bg-white/5 backdrop-blur-sm p-6 hover:ring-cyan-300/40 hover:shadow-[0_0_28px_rgba(0,200,255,0.25)] transition">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-cyan-400/30 to-blue-600/30 ring-1 ring-white/15 flex items-center justify-center text-white/80">
                  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3" /><path d="M12 3v3M21 12h-3M12 21v-3M3 12h3" /></svg>
                </div>
                <div>
                  <div className="text-white font-semibold">Mission Statement</div>
                  <div className="text-gray-300 text-sm">Empower organizations with innovative cybersecurity solutions and training that safeguard critical infrastructure and ensure resilience across Atlanta.</div>
                </div>
              </div>
            </div>
            <div className="group rounded-[20px] ring-1 ring-white/10 bg-white/5 backdrop-blur-sm p-6 hover:ring-cyan-300/40 hover:shadow-[0_0_28px_rgba(0,200,255,0.25)] transition">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-cyan-400/30 to-blue-600/30 ring-1 ring-white/15 flex items-center justify-center text-white/80">
                  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M5 12l5 5L20 7" /></svg>
                </div>
                <div>
                  <div className="text-white font-semibold">Vision Statement</div>
                  <div className="text-gray-300 text-sm">Advance secure operations citywide by building talent, capability, and confidence to protect vital assets and drive secure digital transformation.</div>
                </div>
              </div>
            </div>
            <div className="group rounded-[20px] ring-1 ring-white/10 bg-white/5 backdrop-blur-sm p-6 hover:ring-cyan-300/40 hover:shadow-[0_0_28px_rgba(0,200,255,0.25)] transition">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-cyan-400/30 to-blue-600/30 ring-1 ring-white/15 flex items-center justify-center text-white/80">
                  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 3l8 4v6c0 4.418-3.582 8-8 8S4 17.418 4 13V7l8-4Z" /><path d="M9 13l3 3 4-4" /></svg>
                </div>
                <div>
                  <div className="text-white font-semibold">Values Statement</div>
                  <div className="text-gray-300 text-sm">Integrity, clarity, and outcomes. We prioritize practical skill, accountability, and continuous improvement to deliver real-world impact.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .about-overview-grid { background-image: radial-gradient(rgba(0,255,200,0.14) 1px, transparent 1px); background-size: 32px 32px; animation: overviewShift 26s linear infinite; opacity: 0.16; }
        @keyframes overviewShift { 0% { background-position: 0 0; } 50% { background-position: 70px 30px; } 100% { background-position: 0 0; } }
      `}</style>
    </section>
  );
}
