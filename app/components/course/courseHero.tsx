'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function CourseHero() {
  const [pulseOnce, setPulseOnce] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setPulseOnce(true), 5000);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative w-full overflow-hidden min-h-[100vh] ">
      <div className="absolute inset-0 -z-10">
        <video
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover"
          src="https://northstaracademy.b-cdn.net/northstaracademy/stock/stock2.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
        <div className="absolute inset-0 mesh" />
        <div className="absolute inset-0 bg-black/40" />
      </div>
      <div className="container mx-auto max-w-7xl px-6 md:px-8">
        <div className="min-h-[100vh] flex items-center justify-center text-center">
          <div className="max-w-[780px]">
            <div className="inline-flex items-center rounded-full bg-white/5 ring-1 ring-white/10 text-white/70 text-[11px] px-3 py-1 tracking-wide">ADVANCED CERTIFICATION</div>
            <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.6 }} className="mt-5 text-headline text-4xl md:text-5xl font-semibold leading-tight">
              Agentic AI Security
              <br />
              for Autonomous Systems
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.6, delay: 0.25 }} className="mt-4 mx-auto max-w-[740px] text-body text-sm md:text-base">
              Learn to secure autonomous and multi-agent AI systems used in real enterprise environments.
            </motion.p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-white/85 text-sm">
              <div className="inline-flex items-center gap-2">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="9"/><path d="M12 7v6l4 2"/></svg>
                <span>120 Hours</span>
              </div>
              <span className="h-4 w-px bg-white/15" />
              <div className="inline-flex items-center gap-2">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M5 20V7l7-3 7 3v13"/><path d="M9 10h6M9 14h4"/></svg>
                <span>70% Hands-On</span>
              </div>
              <span className="h-4 w-px bg-white/15" />
              <div className="inline-flex items-center gap-2">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M7 11l5-5 5 5M12 6v12"/></svg>
                <span>24 CPE Credits</span>
              </div>
              <span className="h-4 w-px bg-white/15" />
              <div className="inline-flex items-center gap-2">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M7 9h10M7 13h8"/></svg>
                <span>Industry-Aligned</span>
              </div>
            </div>

            <div className="mt-8">
              <Link href="/aicourse/#program" className={`inline-flex items-center h-[52px] px-7 rounded-[26px] bg-white/10 ring-1 ring-white/10 text-white font-semibold transition-all ease-lux dur-micro hover:bg-white/15 ${pulseOnce ? 'cta-once' : ''}`}>
                Explore the Program
                <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-white text-blue-700">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .mesh { background-image: radial-gradient(1200px 700px at 20% 20%, rgba(0,216,255,0.10), transparent), radial-gradient(900px 500px at 80% 60%, rgba(80,120,255,0.08), transparent); animation: meshShift 60s linear infinite; }
        @keyframes meshShift { 0% { background-position: 0 0, 0 0; } 50% { background-position: 40px 20px, -24px 16px; } 100% { background-position: 0 0, 0 0; } }
        .cta-once { animation: pulseOnce 0.9s ease-in-out 1; }
        @keyframes pulseOnce { 0% { transform: scale(1); } 50% { transform: scale(1.03); } 100% { transform: scale(1); } }
      `}</style>
    </section>
  );
}
