'use client';

import AboutHero from '../components/AboutHero';
import { useState } from 'react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const sendMail = (e: React.FormEvent) => {
    e.preventDefault();
    const to = 'contact@atlanta-soc.com';
    const subject = `New inquiry from ${name || 'Atlanta SOC website'}`;
    const body = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`;
    const mailto = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  };

  return (
    <div className="min-h-screen font-sans ">
      <AboutHero />

      <section className="relative w-full overflow-hidden py-28 md:py-36">
        <div className="absolute inset-0 -z-10" style={{ backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.96) 50%, rgba(0,72,255,0.18) 100%)' }}></div>
        <div className="container mx-auto max-w-7xl px-6 md:px-8">
          <div className="text-center mb-10 md:mb-12">
            <div className="text-white text-3xl md:text-4xl font-bold">Get in touch</div>
            <div className="text-gray-300 max-w-3xl mx-auto mt-2">We’ll respond within one business day. Share a few details and our team will reach out.</div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-14 items-start">
            <div className="md:col-span-2 rounded-[24px] ring-1 ring-white/10 bg-white/5 backdrop-blur-sm p-6 md:p-8 shadow-[0_12px_40px_rgba(0,0,0,0.35)]">
              <div className="flex items-start gap-4 mb-6">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-cyan-400/40 to-blue-600/40 ring-1 ring-white/15 flex items-center justify-center text-white">
                  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 4h16v16H4z" /><path d="M22 4l-10 7L2 4" /></svg>
                </div>
                <div>
                  <div className="text-white text-2xl font-bold">Contact Us</div>
                  <div className="text-gray-300 text-sm">Tell us about your needs. We value details to guide the next steps.</div>
                </div>
              </div>
              <form onSubmit={sendMail} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-300 mb-1">Name</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} className="w-full h-12 rounded-xl bg-black/30 border border-white/10 text-white px-3 focus:outline-none focus:ring-2 focus:ring-blue-600" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-300 mb-1">Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full h-12 rounded-xl bg-black/30 border border-white/10 text-white px-3 focus:outline-none focus:ring-2 focus:ring-blue-600" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Phone</label>
                  <input value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full h-12 rounded-xl bg-black/30 border border-white/10 text-white px-3 focus:outline-none focus:ring-2 focus:ring-blue-600" />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Message</label>
                  <textarea rows={6} value={message} onChange={(e) => setMessage(e.target.value)} className="w-full rounded-xl bg-black/30 border border-white/10 text-white px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-400">By sending, you consent to being contacted about SOC training and services.</div>
                  <button type="submit" className="inline-flex items-center h-[48px] px-6 rounded-[24px] bg-blue-600 text-white font-semibold">Send</button>
                </div>
              </form>
            </div>
            <div className="rounded-[24px] ring-1 ring-white/10 bg-white/5 backdrop-blur-sm p-6 md:p-8 shadow-[0_12px_40px_rgba(0,0,0,0.35)]">
              <div className="text-white text-2xl font-bold mb-6">Reach Us</div>
              <div className="space-y-6 text-gray-300">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-white/5 ring-1 ring-white/10 flex items-center justify-center text-white/80">
                    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 10l9-7 9 7v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V10Z" /><path d="M9 22V12h6v10" /></svg>
                  </div>
                  <div>
                    <div className="text-white font-semibold">Address</div>
                    <div>Atlanta, GA</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-white/5 ring-1 ring-white/10 flex items-center justify-center text-white/80">
                    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M22 16.92V21a2 2 0 0 1-2.18 2A19.86 19.86 0 0 1 3 5.18 2 2 0 0 1 5 3h4.09a2 2 0 0 1 2 1.72l.45 3.18a2 2 0 0 1-.57 1.82l-2 2a16 16 0 0 0 6.88 6.88l2-2a2 2 0 0 1 1.82-.57l3.18.45A2 2 0 0 1 22 16.92Z" /></svg>
                  </div>
                  <div>
                    <div className="text-white font-semibold">Phone</div>
                    <div><a href="tel:+14045550123" className="hover:text-white">+1 (404) 555‑0123</a></div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-white/5 ring-1 ring-white/10 flex items-center justify-center text-white/80">
                    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 4h16v16H4z" /><path d="M22 4l-10 7L2 4" /></svg>
                  </div>
                  <div>
                    <div className="text-white font-semibold">Email</div>
                    <div><a href="mailto:contact@atlanta-soc.com" className="hover:text-white">contact@atlanta-soc.com</a></div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-white/5 ring-1 ring-white/10 flex items-center justify-center text-white/80">
                    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M6 4h12M6 10h12M6 16h12" /></svg>
                  </div>
                  <div>
                    <div className="text-white font-semibold">Support Hours</div>
                    <div>Mon–Fri, 9:00 AM – 6:00 PM ET</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
