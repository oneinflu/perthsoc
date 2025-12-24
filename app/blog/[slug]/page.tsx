
import Image from 'next/image';
import Link from 'next/link';

type PostDetail = {
  slug: string;
  title: string;
  tag: string;
  date: string;
  image: string;
  content: string;
};

const POSTS: PostDetail[] = [
  {
    slug: 'inside-the-soc-building-reliable-detections',
    title: 'Inside the SOC: Building Reliable Detections',
    tag: 'Detections',
    date: 'Dec 2025',
    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1400&auto=format&fit=crop',
    content: 'Reliable detections start with clear hypotheses mapped to behaviors, not signatures. Focus on identity-centric signals, normalize telemetry, and iterate with feedback from investigations to strengthen rules over time.',
  },
  {
    slug: 'threat-hunting-patterns-for-cloud-workloads',
    title: 'Threat Hunting Patterns for Cloud Workloads',
    tag: 'Threat Hunting',
    date: 'Dec 2025',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1400&auto=format&fit=crop',
    content: 'Behavior-first hunts prioritize signals that reveal misuse of cloud control planes, identity, and network paths. Establish baselines, craft questions, and pursue anomalies with disciplined triage.',
  },
  {
    slug: 'incident-response-first-hour-playbook',
    title: 'Incident Response: First Hour Playbook',
    tag: 'IR',
    date: 'Nov 2025',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1400&auto=format&fit=crop',
    content: 'The first hour sets tone and trajectory. Establish timelines, scope access, collect volatile evidence, and communicate with clarity to leadership.',
  },
  {
    slug: 'log-sources-that-matter-and-how-to-use-them',
    title: 'Log Sources That Matter (and How to Use Them)',
    tag: 'SIEM',
    date: 'Nov 2025',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=1400&auto=format&fit=crop',
    content: 'Prioritize identity, endpoint, network, and cloud control logs. Normalize fields, enrich context, and use consistent schemas to enable robust detection coverage.',
  },
  {
    slug: 'threat-intelligence-for-practitioners',
    title: 'Threat Intelligence for Practitioners',
    tag: 'Intel',
    date: 'Oct 2025',
    image: 'https://images.unsplash.com/photo-1605902711622-cfb43c9b3f87?q=80&w=1400&auto=format&fit=crop',
    content: 'Translate intelligence into operational outcomes: enrich cases, prioritize hunts, and brief stakeholders with succinct, actionable reporting.',
  },
  {
    slug: 'vulnerability-management-beyond-the-scanner',
    title: 'Vulnerability Management: Beyond the Scanner',
    tag: 'VM',
    date: 'Oct 2025',
    image: 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1400&auto=format&fit=crop',
    content: 'Move from findings to outcomes: risk-based prioritization, remediation SLAs, and validation close the loop and build trust.',
  },
];

export function generateStaticParams() {
  return POSTS.map(p => ({ slug: p.slug }));
}
export default function BlogDetail({ params }: { params: { slug: string } }) {
  const slug = decodeURIComponent(params.slug || '');
  const post = POSTS.find(p => p.slug === slug) || {
    slug,
    title: 'Atlanta SOC — Operator Insights',
    tag: 'Update',
    date: 'Dec 2025',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1400&auto=format&fit=crop',
    content: 'This is a placeholder article. Content will be published soon. Meanwhile, explore our blog for detections, hunting patterns, and response playbooks designed for real SOC operations.',
  };

  const sections = [
    {
      id: 'overview',
      title: 'Overview',
      text: 'Modern security operations thrive on clarity, consistency, and repeatable outcomes. This article outlines an operator-first approach to detections, hunting, and first-hour response—focusing on behaviors, reliable telemetry, and disciplined workflows that scale.'
    },
    {
      id: 'detections',
      title: 'Detections That Hold Up',
      bullets: [
        'Anchor rules to behaviors mapped to ATT&CK, not single IOCs.',
        'Normalize event fields and use consistent schemas across sources.',
        'Track rule health with feedback from investigations and cases.',
        'Prefer identity- and control-plane signals over fragile signatures.'
      ],
      text: 'Reliable detections evolve with the environment. Treat rules as products: build, observe, iterate. Pair correlation with enrichment and context to reduce false positives while preserving sensitivity.'
    },
    {
      id: 'hunting',
      title: 'Hunting Patterns',
      bullets: [
        'Start with baselines; pursue deviations and unlikely combinations.',
        'Pivot across identity, device, and network to validate hypotheses.',
        'Log notes, decisions, and dead ends—hunts inform detections.'
      ],
      text: 'Hunting is disciplined curiosity. Use lightweight notebooks and repeatable queries to accelerate triage and knowledge transfer across the team.'
    },
    {
      id: 'response',
      title: 'First-Hour Response',
      steps: [
        'Establish an event timeline and identify affected identities/assets.',
        'Select containment options aligned to business impact.',
        'Collect volatile evidence (process, network, auth artifacts).',
        'Brief stakeholders with clarity and next actions.'
      ],
      text: 'The first hour sets tone and trajectory. Favor clear communication, quick containment, and evidence collection that supports later analysis.'
    }
  ];

  const contentText = [post.content, ...sections.map(s => s.text || '')].join(' ');
  const readTime = Math.max(3, Math.round(contentText.split(/\s+/).filter(Boolean).length / 200));
  const related = POSTS.filter(p => p.slug !== post.slug).slice(0, 3);



  return (
    <div className="min-h-screen font-sans ">
      <section className="relative w-full overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0 -z-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(0,200,255,0.18), transparent 55%), radial-gradient(circle at 80% 25%, rgba(0,120,255,0.16), transparent 55%)' }}></div>
        <div className="container mx-auto max-w-4xl px-6 md:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="inline-flex h-7 px-3 rounded-full text-xs font-semibold bg-white/10 text-white/80 ring-1 ring-white/15">{post.tag}</span>
              <span className="text-xs text-gray-400">{post.date}</span>
            </div>
            <h1 className="text-white text-3xl md:text-4xl font-bold">{post.title}</h1>
            <div className="text-gray-400 mt-2 text-sm">Slug: {slug || 'n/a'}</div>
          </div>
        </div>
      </section>

      <section className="relative w-full overflow-hidden py-8 md:py-12">
        <div className="container mx-auto max-w-6xl px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 items-start">
            <div className="md:col-span-2">
              <div className="rounded-[24px] ring-1 ring-white/10 bg-white/5 backdrop-blur-sm overflow-hidden">
                <div className="h-[220px] md:h-[340px] relative">
                  <Image src={post.image} alt={post.title} fill sizes="(max-width: 768px) 100vw, 66vw" className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/10 to-black/50" />
                </div>
                <div className="p-6 md:p-8">
                  <div className="flex items-center gap-3 text-xs text-gray-400 mb-4">
                    <span className="inline-flex h-7 px-3 rounded-full text-xs font-semibold bg-white/10 text-white/80 ring-1 ring-white/15">{post.tag}</span>
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{readTime} min read</span>
                  </div>
                  <div className="prose prose-invert max-w-none">
                    <p className="text-gray-300 leading-relaxed">{post.content}</p>
                    {sections.map(s => (
                      <div key={s.id}>
                        <h2 id={s.id} className="text-white text-2xl md:text-3xl font-bold mt-8">{s.title}</h2>
                        <p className="text-gray-300 mt-2 leading-relaxed">{s.text}</p>
                        {s.bullets && (
                          <ul className="list-disc pl-6 mt-2 text-gray-300">
                            {s.bullets.map(b => (<li key={b}>{b}</li>))}
                          </ul>
                        )}
                        {s.steps && (
                          <ol className="list-decimal pl-6 mt-2 text-gray-300">
                            {s.steps.map(st => (<li key={st}>{st}</li>))}
                          </ol>
                        )}
                      </div>
                    ))}
                    <div className="mt-8 rounded-[16px] ring-1 ring-white/10 bg-white/5 p-4">
                      <div className="text-white font-semibold">Key Takeaways</div>
                      <ul className="list-disc pl-6 mt-1 text-gray-300">
                        <li>Prioritize behavior-driven detections with consistent schemas.</li>
                        <li>Use disciplined hunts to inform detection development.</li>
                        <li>Execute first-hour response with clarity and evidence collection.</li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-6 flex items-center justify-between">
                    <Link href="/blog/" className="inline-flex items-center text-cyan-300 hover:text-white">← Back to blog</Link>
                    <div className="flex items-center gap-3 text-gray-400">
                      <span>Share:</span>
                      <a href="#" className="hover:text-white">Twitter</a>
                      <a href="#" className="hover:text-white">LinkedIn</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <aside className="rounded-[24px] ring-1 ring-white/10 bg-white/5 backdrop-blur-sm p-6 md:p-8 sticky md:top-8">
              <div className="text-white text-lg font-semibold mb-3">On this page</div>
              <div className="space-y-2">
                {sections.map(s => (
                  <a key={s.id} href={`#${s.id}`} className="block text-gray-300 hover:text-white">{s.title}</a>
                ))}
              </div>
              <div className="mt-6 text-sm text-gray-400">
                <div>Slug: {slug || 'n/a'}</div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="relative w-full overflow-hidden py-16">
        <div className="container mx-auto max-w-6xl px-6 md:px-8">
          <div className="text-white text-xl font-semibold mb-4">Related posts</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {related.map(r => (
              <Link key={r.slug} href={`/blog/${r.slug}/`} className="group rounded-[20px] ring-1 ring-white/10 bg-white/5 backdrop-blur-sm overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.35)] hover:ring-cyan-300/40 hover:shadow-[0_0_28px_rgba(0,200,255,0.35)] transition">
                <div className="h-[140px] relative">
                  <Image src={r.image} alt={r.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/10 to-black/50" />
                </div>
                <div className="p-5">
                  <div className="text-white font-semibold">{r.title}</div>
                  <div className="text-gray-400 text-xs mt-1">{r.tag} · {r.date}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
