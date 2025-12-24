'use client';
import Image from 'next/image';

export default function AboutDistribution() {
  const cards = [
    {
      title: 'Expertise You Can Trust',
      desc: 'With decades of experience, a certified engineering team, and advanced testing labs, we lead the charge in protecting industries that matter.',
      image: 'https://images.unsplash.com/photo-1605902711622-cfb43c9b3f87?q=80&w=1400&auto=format&fit=crop',
    },
    {
      title: 'A Tailored Approach',
      desc: 'We work closely with customers to analyze vulnerabilities, identify gaps, and design customized solutions that align with operational needs.',
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1400&auto=format&fit=crop',
    },
    {
      title: 'Global Technology, Local Support',
      desc: 'As distributors for leading global vendors, we provide access to the latest solutions, and our local presence ensures dedicated support whenever needed.',
      image: 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1400&auto=format&fit=crop',
    },
  ];

  return (
    <section className="relative w-full overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0 -z-10 dist-bg"></div>
      <div className="container mx-auto max-w-7xl px-6 md:px-8">
        <div className="text-center mb-10 md:mb-12">
          <div className="text-white text-3xl md:text-4xl font-bold">Setting the Standard in Cybersecurity Distribution</div>
          <p className="text-gray-300 max-w-4xl mx-auto mt-3">Atlanta SOC bridges the gap between global technology innovators and regional industries, bringing world-class cybersecurity solutions to critical infrastructure across the Southeast and beyond.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {cards.map((c) => (
            <div key={c.title} className="group rounded-[24px] ring-1 ring-white/10 bg-white/5 backdrop-blur-sm p-0 overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.35)] hover:ring-cyan-300/40 hover:shadow-[0_0_28px_rgba(0,200,255,0.35)] transition">
              <div className="h-[180px] md:h-[220px] relative">
                <Image src={c.image} alt={c.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/10 to-black/50" />
              </div>
              <div className="p-6">
                <div className="text-white text-lg md:text-xl font-semibold mb-2">{c.title}</div>
                <div className="text-gray-300 text-sm md:text-base">{c.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .dist-bg {
          background-image:
            radial-gradient(circle at 20% 30%, rgba(0,120,255,0.15), transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(0,200,255,0.12), transparent 50%),
            linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.95) 60%, rgba(0,72,255,0.18) 100%);
        }
      `}</style>
    </section>
  );
}
