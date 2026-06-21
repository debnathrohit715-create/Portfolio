import { useState, useEffect } from 'react';
import { Terminal, Cpu, Clock } from 'lucide-react';

export default function Header() {
  const [time, setTime] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Dynamic real-time clock updating every second
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getUTCHours()).padStart(2, '0');
      const minutes = String(now.getUTCMinutes()).padStart(2, '0');
      const seconds = String(now.getUTCSeconds()).padStart(2, '0');
      setTime(`${hours}:${minutes}:${seconds} UTC`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    // Track scroll depth to add glassy background blurs
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-45 transition-all duration-300 ${
        isScrolled 
          ? 'bg-black/90 backdrop-blur-md border-b border-white/10 py-3.5' 
          : 'bg-transparent py-6'
      }`}
      id="main-app-header"
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between" id="header-container">
        {/* Brand identity */}
        <div className="flex items-center gap-3 select-none" id="brand-identity-header">
          <div className="flex items-center gap-2 sm:gap-4">
            <span className="text-xs tracking-[0.3em] font-bold uppercase text-white">ROHIT DEBNATH</span>
            <span className="h-px w-6 sm:w-12 bg-white/30"></span>
            <span className="text-[10px] tracking-[0.2em] text-neutral-400 uppercase hidden sm:inline">Engineering & Aesthetics</span>
          </div>
        </div>

        {/* Minimalist Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-[10px] uppercase tracking-widest text-neutral-400" id="header-navigation">
          <a href="#about-section" className="hover:text-white hover:opacity-100 transition-all">
            About
          </a>
          <a href="#projects-section" className="hover:text-white hover:opacity-100 transition-all">
            Projects
          </a>
          <a href="#skills-section" className="hover:text-white hover:opacity-100 transition-all">
            Skills
          </a>
          <a href="#contact-section" className="hover:text-white hover:opacity-100 transition-all">
            Contact
          </a>
        </nav>

        {/* Live System Time HUD to anchor the technical/math tone */}
        <div className="flex items-center gap-3 font-mono text-[10px]" id="header-time-hud">
          <div className="items-center gap-1.5 hidden lg:flex text-emerald-400 border border-white/5 bg-neutral-900 px-2 py-0.5 rounded-full">
            <Terminal className="w-3 h-3 text-emerald-400" />
            <span className="tracking-wider uppercase font-semibold">FOCUS_MODE: COMMITTED</span>
          </div>

          <div className="flex items-center gap-1.5 text-neutral-300 bg-neutral-900 border border-white/5 px-3 py-0.5 rounded-full">
            <Clock className="w-3 h-3 text-neutral-400" />
            <span className="font-semibold text-[9.5px] tabular-nums">{time || '00:00:00 UTC'}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
