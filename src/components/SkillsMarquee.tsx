import { Layers, Aperture } from 'lucide-react';

interface SkillDetail {
  title: string;
  category: string;
  mechanics: string[];
  description: string;
}

const SKILL_ITEMS: SkillDetail[] = [
  {
    title: 'Web Development',
    category: 'LOGICAL AND STRUCTURAL ENGINE',
    mechanics: ['React Framework', 'Vite Bundle Analytics', 'Trigonometric Animation Canvas', 'Responsive Tailwind Styling'],
    description: 'Engineering highly fluid, high-contrast, stateful interfaces that resist standard template layouts. My applications prioritize interactive widgets and analytical displays over static rectangles.'
  },
  {
    title: 'AI Prompting',
    category: 'COGNITIVE OPTICAL GENERATIVE WORK',
    mechanics: ['Stable Diffusion XL Textures', 'Aperture Geometric Conditioning', 'Film Grain Halide Emulation', 'High-Key Volumetric Backlighting'],
    description: 'Composing highly detailed cinematic descriptions using real-world photography principles. I steer neural generators by specifying exact mathematical focal planes, mechanical lenses, and chiaroscuro values.'
  },
  {
    title: 'Photo Editing',
    category: 'CINEMATIC TEXTURE POST-PROCESSING',
    mechanics: ['Micro-contrast Tuning', 'Shadow Calibration Matrices', 'Specular Highlight Control', 'Chromatic Alignment Fixes'],
    description: 'Post-processing digital frames to emulate classic silver halide structures. I blend synthetic exposures to preserve intricate structural highlights and deep obsidian black shadows.'
  }
];

// Marquee text banks representing the dual engineering-art persona
const LOGIC_BANK = [
  'VECTOR CALCULUS', 'LINEAR ALGEBRA', 'TRIGONOMETRIC DERIVATIVES', 'COMPUTER VISION MODELING', 
  'SKELETAL JOINT MAPPING', 'FOURIER GRAPH HARMONICS', 'DIVERGENT INTEGRALS', 'COORDINATE GEOMETRY'
];

const ART_BANK = [
  '85MM APERTURE LENSING', 'CHIAROSCURO LIGHTING', 'SILVER HALIDE EMULATION', 'TEXTURE BLENDING MAPS',
  'SPECIALLY RESOLVED SENSORS', 'HIGH-KEY SHADOW FALLOFF', 'FILM GRAIN METRICS', 'PHOTOREALISTIC COMPS'
];

export default function SkillsMarquee() {
  return (
    <section className="py-24 border-t border-white/10 bg-[#030303]" id="skills-section">
      {/* Infinite Marquee rails */}
      <div className="w-full space-y-4 mb-20 overflow-hidden" id="marquee-rails-wrapper">
        <div className="flex border-y border-white/5 py-4 bg-neutral-900/30">
          <div className="flex whitespace-nowrap animate-marquee font-mono text-xs uppercase tracking-[0.25em] text-neutral-500">
            {/* Repeat blocks for seamless infinite cycle */}
            {[...LOGIC_BANK, ...LOGIC_BANK, ...LOGIC_BANK].map((text, i) => (
              <span key={i} className="mx-8 flex items-center gap-2">
                <span>{text}</span>
                <span className="text-neutral-800 font-bold">//</span>
              </span>
            ))}
          </div>
        </div>

        <div className="flex border-y border-white/5 py-4 bg-neutral-900/30">
          <div className="flex whitespace-nowrap animate-marquee-reverse font-mono text-xs uppercase tracking-[0.25em] text-neutral-400">
            {[...ART_BANK, ...ART_BANK, ...ART_BANK].map((text, i) => (
              <span key={i} className="mx-8 flex items-center gap-2">
                <span className="text-white">{text}</span>
                <span className="text-neutral-800 font-bold">//</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16 text-center max-w-2xl mx-auto" id="marquee-section-header">
          <div className="bg-neutral-900 border border-white/5 rounded-2xl p-8 flex flex-col justify-center min-h-[140px]">
            <div className="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-2 font-medium">CAPABILITIES & OPTICS</div>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white tracking-tight uppercase leading-none">
              Calibrated <span className="text-neutral-500">Competencies</span>
            </h2>
          </div>
        </div>

        {/* Dynamic focus simulation grids */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="skills-cards-grid">
          {SKILL_ITEMS.map((skill) => {
            return (
              <div
                key={skill.title}
                className="bg-neutral-900 border border-white/5 rounded-2xl p-6 flex flex-col justify-between min-h-[350px] transition-all duration-300 group hover:border-white/10 hover:bg-neutral-900/80"
                id={`skill-card-${skill.title.toLowerCase().replace(' ', '-')}`}
              >
                <div className="space-y-4">
                  <div className="font-mono text-[9px] text-neutral-500 tracking-wider font-semibold">
                    {skill.category}
                  </div>
                  
                  <div className="space-y-1">
                    <h3 className="font-display text-lg text-white font-bold flex items-center justify-between uppercase tracking-tight">
                      {skill.title}
                      <Layers className="w-3.5 h-3.5 text-neutral-600 group-hover:text-neutral-400 transition-colors" />
                    </h3>
                  </div>

                  <p className="text-neutral-400 text-xs leading-relaxed font-sans font-light">
                    {skill.description}
                  </p>
                </div>

                <div className="space-y-2 pt-4 border-t border-white/5 mt-6">
                  <div className="font-mono text-[8.5px] text-white uppercase tracking-wider flex items-center gap-1 font-semibold">
                    <Aperture className="w-3 h-3 text-neutral-400" /> core vectors
                  </div>
                  <div className="flex flex-wrap gap-1.5" id={`skill-mechanics-${skill.title.toLowerCase().replace(' ', '-')}`}>
                    {skill.mechanics.map((mech) => (
                      <span 
                        key={mech}
                        className="px-2 py-0.5 font-mono text-[8.5px] text-neutral-400 border border-white/5 bg-black/40 rounded-full"
                      >
                        {mech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
