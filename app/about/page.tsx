'use client';

import Link from 'next/link';
import AboutHero from '../components/AboutHero';
import AboutOverview from '../components/AboutOverview';
import AboutDistribution from '../components/AboutDistribution';
import AboutWhy from '../components/AboutWhy';
import QuoteBanner from '../components/QuoteBanner';

export default function AboutPage() {
  return (
    <div className="min-h-screen font-sans ">
      <AboutHero />
      <QuoteBanner />
      <AboutOverview />
      <AboutDistribution />
      <AboutWhy />

    
    </div>
  );
}
