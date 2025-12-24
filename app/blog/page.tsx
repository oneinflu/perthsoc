'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';

type Post = {
  title: string;
  excerpt: string;
  image: string;
  tag: string;
  date: string;
  slug: string;
};

const posts: Post[] = [
  {
    title: 'Inside the SOC: Building Reliable Detections',
    excerpt: 'A practical guide to crafting durable correlation rules, tuning noisy signals, and aligning detections with MITRE ATT&CK.',
    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1400&auto=format&fit=crop',
    tag: 'Detections',
    date: 'Dec 2025',
    slug: 'inside-the-soc-building-reliable-detections',
  },
  {
    title: 'Threat Hunting Patterns for Cloud Workloads',
    excerpt: 'Behavior-first approaches, telemetry sources, and triage tips when investigating anomalies across cloud-native environments.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1400&auto=format&fit=crop',
    tag: 'Threat Hunting',
    date: 'Dec 2025',
    slug: 'threat-hunting-patterns-for-cloud-workloads',
  },
  {
    title: 'Incident Response: First Hour Playbook',
    excerpt: 'Establishing calm under pressure: triage, containment options, and data collection that prepares you for executive updates.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1400&auto=format&fit=crop',
    tag: 'IR',
    date: 'Nov 2025',
    slug: 'incident-response-first-hour-playbook',
  },
  {
    title: 'Log Sources That Matter (and How to Use Them)',
    excerpt: 'From identity to network telemetry—prioritizing and normalizing logs that drive meaningful detection coverage.',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=1400&auto=format&fit=crop',
    tag: 'SIEM',
    date: 'Nov 2025',
    slug: 'log-sources-that-matter-and-how-to-use-them',
  },
  {
    title: 'Threat Intelligence for Practitioners',
    excerpt: 'Enrichment, IOCs, context building, and producing reports that the SOC can act on every day.',
    image: 'https://images.unsplash.com/photo-1605902711622-cfb43c9b3f87?q=80&w=1400&auto=format&fit=crop',
    tag: 'Intel',
    date: 'Oct 2025',
    slug: 'threat-intelligence-for-practitioners',
  },
  {
    title: 'Vulnerability Management: Beyond the Scanner',
    excerpt: 'Prioritization frameworks, remediation workflows, and closing the loop with validation and communication.',
    image: 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1400&auto=format&fit=crop',
    tag: 'VM',
    date: 'Oct 2025',
    slug: 'vulnerability-management-beyond-the-scanner',
  },
];

export default function BlogPage() {
  const categories = ['All','Detections','Threat Hunting','IR','SIEM','Intel','VM'];
  const [active, setActive] = useState<string>('All');
  const [page, setPage] = useState<number>(1);
  const pageSize = 6;

  const filtered = useMemo(() => (
    active === 'All' ? posts : posts.filter(p => p.tag === active)
  ), [active]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageItems = filtered.slice((page - 1) * pageSize, page * pageSize);

  const go = (n: number) => {
    const next = Math.min(Math.max(n, 1), totalPages);
    setPage(next);
  };
  return (
    <div className="min-h-screen font-sans bg-black">
      <section className="relative w-full overflow-hidden py-24 md:py-32">
        <div className="absolute inset-0 -z-10 blog-hero-grid"></div>
        <div className="absolute inset-0 -z-10 blog-hero-bokeh"></div>
        <div className="absolute inset-0 -z-10 blog-hero-lines"></div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-transparent to-black/30"></div>
        <div className="container mx-auto max-w-7xl px-6 md:px-8">
          <div className="text-center">
            <h1 className="text-white text-4xl md:text-5xl font-bold">SOC Insights & Updates</h1>
            <p className="text-gray-300 mt-3 max-w-3xl mx-auto">Perspectives from the security operations floor—detections, hunts, incident response tips, and the tooling that powers real outcomes.</p>
          </div>
          <div className="mt-8 flex items-center justify-center gap-3 flex-wrap">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => { setActive(c); setPage(1); }}
                className={`h-10 px-4 rounded-full ring-1 ${active === c ? 'bg-blue-600 text-white ring-blue-600/40' : 'bg-white/5 text-white/80 hover:text-white hover:ring-cyan-300/40'}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="relative w-full overflow-hidden py-24">
        <div className="absolute inset-0 -z-10" style={{ backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.96) 50%, rgba(0,72,255,0.18) 100%)' }}></div>
        <div className="container mx-auto max-w-7xl px-6 md:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {pageItems.map((p) => (
              <article key={p.title} className="group rounded-[24px] ring-1 ring-white/10 bg-white/5 backdrop-blur-sm overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.35)] hover:ring-cyan-300/40 hover:shadow-[0_0_28px_rgba(0,200,255,0.35)] transition">
                <div className="h-[180px] md:h-[220px] relative">
                  <Image src={p.image} alt={p.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/10 to-black/50" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-flex h-7 px-3 rounded-full text-xs font-semibold bg-white/10 text-white/80 ring-1 ring-white/15">{p.tag}</span>
                    <span className="text-xs text-gray-400">{p.date}</span>
                  </div>
                  <h2 className="text-white text-lg md:text-xl font-semibold">{p.title}</h2>
                  <p className="text-gray-300 text-sm md:text-base mt-1">{p.excerpt}</p>
                  <div className="mt-4">
                    <Link href={`/blog/${p.slug}/`} className="inline-flex items-center text-cyan-300 hover:text-white">Read more</Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-10 flex items-center justify-center gap-2">
            <button onClick={() => go(page - 1)} className="h-10 px-3 rounded-full ring-1 ring-white/10 text-white/80 bg-white/5 hover:text-white disabled:opacity-40" disabled={page === 1}>Prev</button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
              <button key={n} onClick={() => go(n)} className={`h-10 px-4 rounded-full ring-1 ${n === page ? 'bg-blue-600 text-white ring-blue-600/40' : 'bg-white/5 text-white/80 hover:text-white hover:ring-cyan-300/40'}`}>{n}</button>
            ))}
            <button onClick={() => go(page + 1)} className="h-10 px-3 rounded-full ring-1 ring-white/10 text-white/80 bg-white/5 hover:text-white disabled:opacity-40" disabled={page === totalPages}>Next</button>
          </div>
        </div>
      </section>

      <section className="relative w-full overflow-hidden py-20 md:py-24">
        <div className="container mx-auto max-w-3xl px-6 md:px-8">
          <div className="rounded-[24px] ring-1 ring-white/10 bg-white/5 backdrop-blur-sm p-6 md:p-8 text-center">
            <div className="text-white text-xl md:text-2xl font-semibold">Stay updated with SOC best practices</div>
            <p className="text-gray-300 mt-2">No spam. Only practical, operator‑grade content.</p>
            <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <input placeholder="Your email" className="w-full sm:w-auto sm:flex-1 h-12 rounded-xl bg-black/30 border border-white/10 text-white px-3 focus:outline-none focus:ring-2 focus:ring-blue-600" />
              <button className="h-12 px-6 rounded-xl bg-blue-600 text-white font-semibold">Subscribe</button>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .blog-hero-grid {
          background-image: radial-gradient(rgba(0,255,200,0.12) 1px, transparent 1px);
          background-size: 28px 28px;
          animation: blogShift 28s linear infinite;
          opacity: 0.14;
        }
        .blog-hero-bokeh {
          background-image:
            radial-gradient(circle at 20% 30%, rgba(0,200,255,0.22), transparent 55%),
            radial-gradient(circle at 80% 25%, rgba(0,120,255,0.18), transparent 55%),
            radial-gradient(circle at 60% 75%, rgba(110,0,255,0.16), transparent 55%);
          opacity: 0.22;
        }
        .blog-hero-lines {
          background-image: repeating-linear-gradient(135deg, rgba(255,255,255,0.08) 0px, rgba(255,255,255,0.08) 1px, transparent 1px, transparent 20px);
          animation: lineDrift 18s linear infinite;
          opacity: 0.10;
        }
        @keyframes blogShift {
          0% { background-position: 0 0; }
          50% { background-position: 80px 40px; }
          100% { background-position: 0 0; }
        }
        @keyframes lineDrift {
          0% { background-position: 0 0; }
          50% { background-position: 40px 20px; }
          100% { background-position: 0 0; }
        }
      `}</style>
    </div>
  );
}
