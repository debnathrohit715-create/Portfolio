import { ArrowRight, Aperture, Focus, Compass } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden justify-center bg-[#030303]" id="hero-section">
      {/* Abstract dark vector grids in the background to set the mathematical/photographic feel */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]" id="hero-bg-blueprint">
        <svg name="engineering_blueprint" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
              <circle cx="40" cy="40" r="1.5" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-6 w-full relative z-10" id="hero-container-inner">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch" id="hero-asymmetric-split">
          
          {/* Left Column Text details in Bento Block */}
          <div className="lg:col-span-8 bg-neutral-900 border border-white/5 rounded-2xl p-8 sm:p-10 relative overflow-hidden group flex flex-col justify-between min-h-[500px]" id="hero-headlines">
            {/* Simulated 85mm Blur Background */}
            <div className="absolute -right-20 -top-20 w-96 h-96 bg-neutral-800 rounded-full blur-[80px] opacity-35 pointer-events-none"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-transparent to-transparent opacity-60 z-10 pointer-events-none"></div>

            <div className="relative z-20 flex flex-col justify-between h-full space-y-8" id="hero-headings-block">
              <div className="space-y-4">
                {/* Technical small tag */}
                <div className="inline-flex items-center gap-2 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-neutral-400 bg-black/40 backdrop-blur-sm border border-white/5 rounded-full w-fit">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                  <span>PORTFOLIO GATEWAY: ROHIT DEBNATH</span>
                </div>

                {/* Huge Display Header themed as Bento grid */}
                <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tighter leading-[0.85] uppercase text-white">
                  Engineering<br/>
                  <span className="text-neutral-500">&</span> Aesthetics
                </h1>
              </div>

              <p className="text-neutral-400 text-sm md:text-sm leading-relaxed max-w-xl font-sans font-light relative z-20">
                Merging vector calculus with cinematic vision. Developing high-performance systems and visual narratives that bridge the technical and the sublime. Deriving advanced mathematical formulations by day, composing high-end aesthetics at night.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 items-start relative z-20" id="hero-cta-group">
                <a
                  href="#projects-section"
                  className="group flex items-center gap-2 bg-white text-black hover:bg-neutral-200 transition-colors py-3.5 px-6 rounded-full font-mono text-[10px] font-bold uppercase tracking-[0.2em]"
                >
                  <span>Explore Works</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>

                <a
                  href="#contact-section"
                  className="flex items-center gap-2 border border-white/10 hover:border-white/20 hover:bg-white/5 bg-neutral-950/45 text-neutral-300 hover:text-white transition-all py-3.5 px-6 rounded-full font-mono text-[10px] font-bold uppercase tracking-[0.2em]"
                >
                  <span>Get In Touch</span>
                </a>
              </div>

              {/* Micro Specs readout under header */}
              <div className="flex gap-8 pt-6 border-t border-white/5 max-w-md font-mono text-[10px] text-neutral-500 relative z-20" id="hero-specs-hud">
                <div>
                  <span className="text-neutral-300 block font-semibold tracking-wider uppercase mb-0.5">Trigonometrics</span>
                  Landmark Computer Vision
                </div>
                <div>
                  <span className="text-neutral-300 block font-semibold tracking-wider uppercase mb-0.5">Optics Limit</span>
                  85mm Cinematic f/1.4
                </div>
              </div>
            </div>
          </div>

          {/* Right Column Profile portrait area styled beautifully for Bento structure */}
          <div className="lg:col-span-4 bg-neutral-900 border border-white/5 rounded-2xl overflow-hidden relative group min-h-[500px]" id="hero-portrait-column">
            {/* Real grayscale profile photo styled beautifully with cinematic overlay */}
            <div className="absolute inset-0 z-0">
              <img
                src="https://github.com/debnathrohit715-create.png"
                alt="Rohit Debnath Portrait"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-[1.03] transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-black/40 z-10"></div>
            </div>

            {/* Viewfinder brackets inside */}
            <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-white/40 pointer-events-none z-20" />
            <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-white/40 pointer-events-none z-20" />
            <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-white/40 pointer-events-none z-20" />
            <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-white/40 pointer-events-none z-20" />

            {/* Origin HUD stamp overlay */}
            <div className="absolute top-6 left-6 z-20">
              <span className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[9px] uppercase tracking-widest border border-white/10 text-white font-medium">Origin: India</span>
            </div>

            {/* Centering crosshairs */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 pointer-events-none opacity-40 z-20 flex items-center justify-center">
              <Focus className="w-5 h-5 text-white animate-pulse" />
            </div>

            {/* Exposure slider graphics */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col items-center gap-1 font-mono text-[7px] text-white/50 pointer-events-none select-none bg-black/60 backdrop-blur-sm p-1.5 rounded-md border border-white/5 z-20">
              <span>+2</span>
              <span className="w-2 h-[1px] bg-white/20" />
              <span>+1</span>
              <span className="w-2 h-[1px] bg-white/20" />
              <span className="w-3.5 h-[1.5px] bg-white font-bold" />
              <span>-1</span>
              <span className="w-2 h-[1px] bg-white/20" />
              <span>-2</span>
            </div>

            {/* Active HUD Metrics at footer of image */}
            <div className="absolute bottom-6 left-6 bg-black/85 backdrop-blur-md border border-white/10 p-3 rounded-xl font-mono text-[8px] text-neutral-300 space-y-1 pointer-events-none select-none z-20">
              <div className="flex items-center gap-1"><Aperture className="w-3 h-3 text-neutral-400" /> REC // CALIBRATION</div>
              <div className="flex gap-3 text-white/80">
                <span>f/1.4</span>
                <span>85.0mm</span>
                <span>1/250s</span>
                <span>ISO 100</span>
              </div>
            </div>

            {/* Heading coordinates badge */}
            <div className="absolute top-6 right-6 bg-black/60 backdrop-blur-sm border border-white/10 px-2 py-0.5 rounded-full font-mono text-[7.5px] text-white flex items-center gap-1 z-20">
              <Compass className="w-2.5 h-2.5 text-white" /> HUD 90° Z-VAL
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
