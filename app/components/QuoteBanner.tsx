'use client';

export default function QuoteBanner() {
  return (
    <section className="relative w-full overflow-hidden py-16 md:py-20">
      <div className="absolute inset-0 -z-10 quote-grid"></div>
      <div className="container mx-auto max-w-5xl px-6 md:px-8">
        <div className="rounded-[24px] ring-1 ring-white/10 bg-white/5 backdrop-blur-sm p-6 md:p-8 shadow-[0_12px_40px_rgba(0,0,0,0.35)]">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-cyan-400/40 to-blue-600/40 ring-1 ring-white/15 flex items-center justify-center text-white">
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M7 7h5l-3 10H4l3-10ZM17 7h5l-3 10h-5l3-10Z" /></svg>
            </div>
            <div>
              <div className="text-white text-lg md:text-xl font-semibold">Security is a practice of resilience.</div>
              <div className="text-gray-300 mt-1">Defend. Learn. Evolve. Build capabilities that stand up to real threats and protect what matters.</div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .quote-grid { background-image: radial-gradient(rgba(0,255,200,0.12) 1px, transparent 1px); background-size: 30px 30px; animation: qShift 22s linear infinite; opacity: 0.14; }
        @keyframes qShift { 0% { background-position: 0 0; } 50% { background-position: 60px 20px; } 100% { background-position: 0 0; } }
      `}</style>
    </section>
  );
}

