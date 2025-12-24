'use client';

export default function AboutHero() {
  return (
    <section className="relative w-full overflow-hidden min-h-[60vh] md:h-[72vh] rounded-b-[100px] ">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="https://oneinflu.b-cdn.net/atlanta.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="absolute inset-0 bg-black/40" />
      </div>
      <div className="container mx-auto h-full max-w-7xl px-6 md:px-8 flex items-center justify-center text-center">
        <div>
          <h1 className="text-white text-4xl md:text-5xl font-bold">Defending Critical Infrastructure, Empowering Resilience</h1>
          <div className="text-white/80 mt-3">Cutting Edge Cyber Security · Intelligent Infrastructure · AI Storage & Computing</div>
        </div>
      </div>
    </section>
  );
}
