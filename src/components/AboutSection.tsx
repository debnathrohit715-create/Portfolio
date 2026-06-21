import MathShaderCanvas from './MathShaderCanvas';
import { Sigma, Milestone, Eye } from 'lucide-react';

export default function AboutSection() {
  return (
    <section className="py-16 border-t border-white/10 bg-[#030303]" id="about-section">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch" id="about-section-grid">
          
          {/* Left Text Detail Bento Block */}
          <div className="lg:col-span-6 bg-neutral-900 border border-white/5 rounded-2xl p-8 relative overflow-hidden flex flex-col justify-between min-h-[500px] group" id="about-text-column">
            {/* Ambient internal lens light */}
            <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-neutral-800 rounded-full blur-[75px] opacity-25 pointer-events-none"></div>

            <div className="relative z-10 space-y-6 flex-grow">
              <div className="space-y-3">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-medium">IDEOLOGY & ARCHITECTURE</div>
                <h2 className="font-display text-3xl md:text-5xl font-bold text-white tracking-tight leading-none uppercase">
                  The Beauty of <br />
                  <span className="text-neutral-500">Precise Mechanics</span>
                </h2>
              </div>

              <div className="space-y-4 text-neutral-400 text-sm leading-relaxed font-sans font-light" id="about-description">
                <p>
                  As Rohit Debnath, an engineering student with a deep-seated fascination for linear algebra, vector fields, and structural physics, I look at the world through a coordinate grid. I believe the universe is a series of beautiful functions, waiting to be modeled.
                </p>
                <p>
                  My passion is bridging these heavy mathematical fields with cinematic, premium imagery. Where others see simple numbers, I see gradients, specular light curves, and the soft, organic focus decay resembling an 85mm f/1.4 lens. From implementing computer vision models that scan real sign language hand skeleton joints on web cameras, to composing photorealistic texture nodes in neural generators, I write code to synthesize technology and human form into high-end structural narratives.
                </p>
              </div>
            </div>

            {/* Micro details indicators styled as nested bento boxes */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-white/5 relative z-10 mt-6" id="about-pillars">
              <div className="bg-neutral-950/40 border border-white/5 p-4 rounded-xl space-y-2 flex flex-col justify-between hover:border-white/10 transition-colors">
                <div className="flex items-center gap-1.5 font-mono text-[9px] text-white tracking-wider">
                  <Sigma className="w-3.5 h-3.5 text-neutral-400" />
                  <span>CALCULUS DEPTH</span>
                </div>
                <p className="text-[10px] text-neutral-500 leading-relaxed font-light">
                  Deriving fields, curl vectors, and matrices directly inside local grids.
                </p>
              </div>

              <div className="bg-neutral-950/40 border border-white/5 p-4 rounded-xl space-y-2 flex flex-col justify-between hover:border-white/10 transition-colors">
                <div className="flex items-center gap-1.5 font-mono text-[9px] text-white tracking-wider">
                  <Eye className="w-3.5 h-3.5 text-neutral-400" />
                  <span>85MM PHOTO</span>
                </div>
                <p className="text-[10px] text-neutral-500 leading-relaxed font-light">
                  Chiaroscuro lighting, subtle grain, and physical backdrop focal falloff.
                </p>
              </div>

              <div className="bg-neutral-950/40 border border-white/5 p-4 rounded-xl space-y-2 flex flex-col justify-between hover:border-white/10 transition-colors">
                <div className="flex items-center gap-1.5 font-mono text-[9px] text-white tracking-wider">
                  <Milestone className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Tactile Play</span>
                </div>
                <p className="text-[10px] text-neutral-500 leading-relaxed font-light">
                  Rejecting static code matrices to engineer interactive physical sandboxes.
                </p>
              </div>
            </div>
          </div>

          {/* Right Vector Field Visualizer Canvas as matching Bento block */}
          <div className="lg:col-span-6 bg-neutral-900 border border-white/5 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between min-h-[500px] group" id="about-shader-column">
            {/* Glowing pool in shader card */}
            <div className="absolute -right-20 -top-20 w-80 h-80 bg-neutral-800 rounded-full blur-[75px] opacity-25 pointer-events-none"></div>

            <div className="relative z-10 w-full h-full flex flex-col justify-between flex-grow space-y-4">
              <div className="flex-grow flex items-center justify-center min-h-[300px] border border-white/5 rounded-2xl overflow-hidden bg-black/40">
                <MathShaderCanvas />
              </div>
              
              <div className="flex justify-between font-mono text-[9px] text-neutral-500 uppercase tracking-widest px-1 pt-4 border-t border-white/5">
                <span>SYSTEM: EXTRANEOUS SHADER GRID</span>
                <span>[ INTERACTIVE VECTOR DENSITY ]</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
