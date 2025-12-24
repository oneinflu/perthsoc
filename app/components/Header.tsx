'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const current = (pathname?.replace(/\/$/, '') || '/');
  const isActive = (href: string) => ((href.replace(/\/$/, '') || '/') === current);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/80 backdrop-blur-sm' : 'bg-black'
      }`}
    >
      <div className="container mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo and Tagline */}
        <Link href="/" className="flex items-center">
          <div className="flex items-center">
            <div className="w-8 h-8 mr-2 rounded-full bg-blue-500 overflow-hidden">
              <Image 
                src="/globe.svg" 
                alt="Oregon Systems Logo" 
                width={32} 
                height={32} 
                className="object-cover"
              />
            </div>
            <div className="text-white font-bold text-lg">ATLANTA SOC</div>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className={`text-white hover:text-gray-300 transition-colors ${isActive('/') ? 'border-b-2 border-white' : ''}`}>
            Home
          </Link>
          <Link href="/about/" className={`text-white hover:text-gray-300 transition-colors ${isActive('/about') ? 'border-b-2 border-white' : ''}`}>
            About Us
          </Link>
          
          <Link href="/course/" className={`text-white hover:text-gray-300 transition-colors ${isActive('/course') ? 'border-b-2 border-white' : ''}`}>
            Course
          </Link>
         
          <Link href="/blog/" className={`text-white hover:text-gray-300 transition-colors ${isActive('/blog') ? 'border-b-2 border-white' : ''}`}>
            Blog
          </Link>
          <Link href="/contact/" className={`text-white hover:text-gray-300 transition-colors ${isActive('/contact') ? 'border-b-2 border-white' : ''}`}>
            Contact
          </Link>
        </nav>

        {/* Contact CTA */}
        <Link 
          href="https://learn-range.hackercentral.in/login" 
          className="hidden md:inline-flex rounded-full border border-white text-white px-5 py-1.5 text-sm hover:bg-white hover:text-black transition-colors items-center"
        >
          STUDENT LOGIN
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>

        {/* Mobile Menu Button - Hidden on desktop */}
        <button
          className="md:hidden text-white"
          aria-label="Toggle menu"
          aria-expanded={menuOpen ? 'true' : 'false'}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden border-t border-white/10 bg-black">
          <nav className="container mx-auto px-6 py-4 flex flex-col gap-3">
            <Link href="/" className={`text-white py-2 ${isActive('/') ? 'text-cyan-300' : ''}`} onClick={() => setMenuOpen(false)}>Home</Link>
            <Link href="/about/" className={`text-white py-2 ${isActive('/about') ? 'text-cyan-300' : ''}`} onClick={() => setMenuOpen(false)}>About Us</Link>
            <Link href="/course/" className={`text-white py-2 ${isActive('/course') ? 'text-cyan-300' : ''}`} onClick={() => setMenuOpen(false)}>Course</Link>
           
            <Link href="/contact/" className={`text-white py-2 ${isActive('/contact') ? 'text-cyan-300' : ''}`} onClick={() => setMenuOpen(false)}>Contact</Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;

