import React from 'react';
import { Mail, Phone, Github, Linkedin, Cpu } from 'lucide-react';

export default function ContactFooter() {
  return (
    <footer className="bg-[#030303] border-t border-white/10 py-24 text-neutral-400" id="contact-section">
      <div className="max-w-6xl mx-auto px-6" id="footer-layout-container">
        
        {/* Centered elegant Bento card */}
        <div className="max-w-2xl mx-auto mb-16" id="footer-bento-card">
          <div className="bg-neutral-900 border border-white/5 rounded-2xl p-8 sm:p-10 flex flex-col justify-between min-h-[350px] relative overflow-hidden group" id="footer-bio-column">
            {/* Glowing background light pool */}
            <div className="absolute -left-16 -top-16 w-72 h-72 bg-neutral-800 rounded-full blur-[70px] opacity-25 pointer-events-none"></div>

            <div className="relative z-10 space-y-6">
              <div className="space-y-4">
                <div className="font-mono text-xs uppercase tracking-widest text-neutral-500 font-semibold flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-neutral-400" /> CONTACT GATEWAY
                </div>
                <h2 className="font-display text-3xl md:text-5xl font-bold text-white tracking-tight uppercase leading-none">
                  Let's Build <br />
                  <span className="text-neutral-500">the Vector</span>
                </h2>
                <p className="text-neutral-400 text-sm leading-relaxed max-w-lg pt-2 font-light font-sans">
                  Have a challenging project that bridges rigorous, advanced analytical solving with high-end, premium cinema styling? Slide into my outbox. Let's trace nodes.
                </p>
              </div>

              {/* Direct contact info */}
              <div className="space-y-3 font-mono text-xs pt-2" id="footer-direct-leads">
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-neutral-400" />
                  <a href="mailto:debnathrohit715@gmail.com" className="text-white hover:underline text-sm font-semibold tracking-wider">
                    debnathrohit715@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-neutral-400" />
                  <a href="tel:+918822191121" className="text-white hover:underline text-sm font-semibold tracking-wider">
                    +91 8822191121
                  </a>
                </div>
              </div>
            </div>

            {/* Premium Social anchors */}
            <div className="flex gap-3 pt-6 relative z-10" id="footer-social-anchors">
              <a 
                href="https://github.com/debnathrohit715-create" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3.5 rounded-full border border-white/5 bg-black hover:bg-neutral-950 hover:border-white/20 text-neutral-400 hover:text-white transition-all shadow-sm"
                aria-label="GitHub Repository"
              >
                <Github className="w-4 h-4" />
              </a>

              <a 
                href="https://www.linkedin.com/in/rohit-debnath-28b37a3b1" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3.5 rounded-full border border-white/5 bg-black hover:bg-neutral-950 hover:border-white/20 text-neutral-400 hover:text-white transition-all shadow-sm"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Real Footer Rights and Attribution inside Bento border line */}
        <div className="pt-12 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[10px] text-neutral-500" id="footer-copyright-row">
          <div>
            © {new Date().getFullYear()} DESIGN LABORATORY. PORTFOLIO V.24.
          </div>
          <div className="flex gap-6">
            <span>LATITUDE: 47.6062° N</span>
            <span>LONGITUDE: 122.3321° W</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
