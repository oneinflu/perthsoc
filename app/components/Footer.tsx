'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden bg-black">
      <div className="absolute inset-0 -z-10" style={{ backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.96) 50%, rgba(0,170,255,0.12) 100%), repeating-linear-gradient(to right, rgba(0,170,255,0.08) 0px, rgba(0,170,255,0.08) 1px, transparent 1px, transparent 30px)' }}></div>
      <div className="absolute inset-0 -z-10 footer-grid"></div>

      <div className="container mx-auto max-w-7xl px-6 md:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-10">
          <div>
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 mr-2 rounded-full bg-blue-500"></div>
              <span className="text-white font-bold text-lg">ATLANTA SOC</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">Protecting today’s systems, powering tomorrow’s vision. Training, solutions, and career pathways for Atlanta.</p>
            <div className="flex items-center gap-3">
              <a href="https://twitter.com" aria-label="Twitter" className="text-white/80 hover:text-white">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M22 5.92c-.75.33-1.56.56-2.41.66a4.17 4.17 0 0 0 1.83-2.3 8.32 8.32 0 0 1-2.64 1 4.15 4.15 0 0 0-7.07 3.78A11.78 11.78 0 0 1 3.15 4.67a4.15 4.15 0 0 0 1.28 5.54c-.64-.02-1.24-.2-1.76-.5v.05a4.15 4.15 0 0 0 3.33 4.06c-.3.08-.62.12-.95.12-.23 0-.46-.02-.68-.06a4.15 4.15 0 0 0 3.87 2.88A8.33 8.33 0 0 1 2 19.55a11.76 11.76 0 0 0 6.36 1.86c7.63 0 11.81-6.32 11.81-11.81v-.54A8.45 8.45 0 0 0 22 5.92Z"/></svg>
              </a>
              <a href="https://linkedin.com" aria-label="LinkedIn" className="text-white/80 hover:text-white">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 0 0 5.001 2.5 2.5 0 0 0 0-5ZM3 9h4v12H3V9Zm7 0h3.6v1.65h.05c.5-.95 1.7-1.95 3.5-1.95 3.75 0 4.45 2.45 4.45 5.65V21h-4v-5.1c0-1.22-.02-2.79-1.7-2.79-1.7 0-1.96 1.32-1.96 2.7V21h-4V9Z"/></svg>
              </a>
              <a href="https://github.com" aria-label="GitHub" className="text-white/80 hover:text-white">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M12 .5A11.5 11.5 0 0 0 .5 12c0 5.08 3.29 9.38 7.86 10.9.58.1.79-.25.79-.56v-2.02c-3.2.7-3.88-1.54-3.88-1.54-.53-1.36-1.3-1.72-1.3-1.72-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.73 1.26 3.4.96.1-.76.41-1.26.75-1.55-2.56-.29-5.25-1.28-5.25-5.72 0-1.26.45-2.3 1.2-3.11-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.19.92-.25 1.9-.38 2.88-.38s1.96.13 2.88.38c2.21-1.5 3.18-1.19 3.18-1.19.63 1.59.23 2.77.11 3.06.75.81 1.2 1.85 1.2 3.11 0 4.45-2.69 5.42-5.26 5.71.43.37.81 1.1.81 2.22v3.29c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z"/></svg>
              </a>
            </div>
          </div>

          <div>
            <div className="text-white font-semibold mb-3">Company</div>
            <ul className="space-y-2 text-gray-300">
              <li><Link href="/about" className="hover:text-white">About</Link></li>
           
              <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>

          <div>
            <div className="text-white font-semibold mb-3">Programs & Solutions</div>
            <ul className="space-y-2 text-gray-300">
              <li><Link href="/services" className="hover:text-white">SOC Courses</Link></li>
              <li><Link href="/" className="hover:text-white">Solutions</Link></li>
              <li><Link href="/" className="hover:text-white">Use Cases</Link></li>
              <li><Link href="/" className="hover:text-white">Blog</Link></li>
            </ul>
          </div>

          <div>
            <div className="text-white font-semibold mb-3">Resources</div>
            <ul className="space-y-2 text-gray-300">
              <li><Link href="/" className="hover:text-white">Career Paths</Link></li>
              <li><Link href="/" className="hover:text-white">Salaries (Atlanta)</Link></li>
              <li><Link href="/" className="hover:text-white">Docs & Guides</Link></li>
              <li><Link href="/" className="hover:text-white">Support</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 rounded-[18px] ring-1 ring-white/10 bg-white/5 p-6 flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="text-white text-base font-semibold">Stay in the loop</div>
          <form className="mt-3 md:mt-0 flex items-center gap-3">
            <input type="email" aria-label="Email" placeholder="you@example.com" className="h-10 w-64 px-3 rounded-md bg-black/60 text-white ring-1 ring-white/10 focus:outline-none focus:ring-cyan-300/60" />
            <button type="button" className="h-10 px-4 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-500">Subscribe</button>
          </form>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container mx-auto max-w-7xl px-6 md:px-8 py-6 flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="text-gray-400 text-sm">© {new Date().getFullYear()} Atlanta SOC. All rights reserved.</div>
          <div className="mt-3 md:mt-0 flex gap-4 text-gray-300 text-sm">
            <Link href="/" className="hover:text-white">Privacy</Link>
            <Link href="/" className="hover:text-white">Terms</Link>
            <Link href="/" className="hover:text-white">Security</Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer-grid { background-image: radial-gradient(rgba(0,255,200,0.14) 1px, transparent 1px); background-size: 32px 32px; animation: footerShift 30s linear infinite; opacity: 0.14; }
        @keyframes footerShift { 0% { background-position: 0 0; } 50% { background-position: 60px 30px; } 100% { background-position: 0 0; } }
      `}</style>
    </footer>
  );
}