import { useState } from 'react';
import { Project } from '../types';
import ProjectGestureSimulator from './ProjectGestureSimulator';
import ProjectLibrarySimulator from './ProjectLibrarySimulator';
import { Maximize2, Minimize2, Terminal, Layers, ArrowUpRight } from 'lucide-react';

const PROJECTS_DATA: Project[] = [
  {
    id: 'gesture-site',
    title: 'Sign Language Gesture Website',
    category: 'LANDMARK COMPUTER VISION',
    tagline: 'Real-time gestural tracking and accessibility mapping on web cameras.',
    description: 'A sophisticated web-based application designed to recognize tactile sign language gestures in real time. It uses local trigonometric angular calculations mapped onto the client-side skeletal index frames to identify and translate letters and phrases without server overhead.',
    technicalSpecs: ['MediaPipe Core API', 'Vector Skeletonization', 'React Viewport Tracking'],
    imageSrc: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'library-system',
    title: 'Secure Library Management System',
    category: 'DISTRIBUTED DATA VAULT',
    tagline: 'High-performance offline volume checkouts, transactional logs, and shelf tracking.',
    description: 'A robust and elegant local transaction engine mimicking statefully cataloged volume tracking. Built using advanced structured state vectors to handle immediate checkouts, return validations, search capabilities, and precise shelf location allocation.',
    technicalSpecs: ['Transactional Logs', 'ISBN Validation', 'Reactive Local State', 'Tailwind Grid Engine'],
    imageSrc: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=600&auto=format&fit=crop'
  }
];

export default function ProjectsGrid() {
  const [activeProject, setActiveProject] = useState<string | null>(null);

  const toggleProjectSimulator = (id: string) => {
    setActiveProject(activeProject === id ? null : id);
    // Smooth scroll to the simulator container when opened
    setTimeout(() => {
      const el = document.getElementById(`sim-wrapper-${id}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 150);
  };

  // Maps project ID to bento design mockup details
  const getBentoMockMeta = (id: string, idx: number) => {
    return { 
      tag: `0${idx + 1} / ${id === 'gesture-site' ? 'VISION AI' : 'DATABASE ASSET'}`, 
      color: id === 'gesture-site' ? 'bg-emerald-500' : 'bg-indigo-500' 
    };
  };

  return (
    <section className="py-24 border-t border-white/10 bg-[#030303]" id="projects-section">
      <div className="max-w-6xl mx-auto px-6">
        {/* Bento/Editorial Header structure */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6" id="projects-title-block">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-2 font-medium">REPERTOIRE AND MECHANICS</div>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white tracking-tight uppercase">
              Selected <span className="text-neutral-500">Works</span>
            </h2>
          </div>
          <div className="font-mono text-[11px] text-neutral-500 max-w-xs md:text-right font-light">
            / Bridging high-fidelity digital art with rigorous logical calculations and structural mechanics.
          </div>
        </div>

        {/* Creative Bento Grid of Projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto w-full" id="projects-data-grid">
          {PROJECTS_DATA.map((project, idx) => {
            const isExpanded = activeProject === project.id;
            const bentoMeta = getBentoMockMeta(project.id, idx);

            return (
              <div 
                key={project.id}
                className="bg-neutral-900 border border-white/5 rounded-2xl p-6 flex flex-col justify-between hover:border-white/20 transition-all duration-300 group"
                id={`project-card-${project.id}`}
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] uppercase tracking-wider text-neutral-500 font-mono font-medium">
                      {bentoMeta.tag}
                    </span>
                    <div className={`w-2 h-2 rounded-full ${bentoMeta.color} animate-pulse`} />
                  </div>

                  {/* Aspect-Ratio Video Container with Bento rounded edges */}
                  <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-neutral-950 border border-white/5">
                    <img
                      src={project.imageSrc}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover grayscale brightness-[0.7] group-hover:brightness-95 contrast-110 scale-100 group-hover:scale-[1.03] transition-all duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-black/60 px-2 py-0.5 backdrop-blur-md rounded-full border border-white/10 font-mono text-[8.5px] tracking-widest text-neutral-300 uppercase">
                      INDEX 0{idx + 1}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="font-mono text-[9px] text-neutral-500 tracking-wider">
                      {project.category}
                    </div>
                    <h3 className="font-display text-lg text-white font-semibold group-hover:text-neutral-100 transition-colors flex items-center gap-1.5 uppercase tracking-tight">
                      {project.title}
                      <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-neutral-400" />
                    </h3>
                    <p className="text-neutral-400 text-xs leading-relaxed font-sans font-light">
                      {project.tagline}
                    </p>
                  </div>

                  {/* Technical specs rounded pills */}
                  <div className="flex flex-wrap gap-1.5 pt-2" id={`chips-container-${project.id}`}>
                    {project.technicalSpecs.map((spec) => (
                      <span 
                        key={spec}
                        className="px-2.5 py-1 font-mono text-[8.5px] uppercase tracking-wider text-neutral-300 border border-white/5 bg-black/40 rounded-full"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-auto">
                  {/* Action Triggers */}
                  <button
                    type="button"
                    onClick={() => toggleProjectSimulator(project.id)}
                    className={`w-full text-center py-2.5 px-4 rounded-full font-mono text-[10px] font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 ${
                      isExpanded
                        ? 'bg-white text-black font-semibold hover:bg-neutral-200'
                        : 'bg-neutral-950 text-neutral-300 border border-white/10 hover:bg-neutral-900 hover:text-white'
                    }`}
                  >
                    {isExpanded ? (
                      <>
                        <Minimize2 className="w-3.5 h-3.5" />
                        <span>CLOSE PLAYGROUND</span>
                      </>
                    ) : (
                      <>
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span>LAUNCH PLAYGROUND</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Floating expanded simulator dashboards rendered inside full viewport containers */}
        {activeProject ? (
          <div 
            className="mt-12 border border-white/10 bg-neutral-900/40 rounded-2xl p-6 relative overflow-hidden shadow-2xl transition-all duration-300 backdrop-blur-sm"
            id={`sim-wrapper-${activeProject}`}
          >
            {/* Status info strip above the loaded terminal */}
            <div className="px-4 py-3 font-mono text-[10px] text-neutral-400 bg-black/40 rounded-xl border border-white/5 flex flex-col sm:flex-row justify-between items-center gap-2 mb-6">
              <span className="flex items-center gap-1.5 text-white">
                <Terminal className="w-3.5 h-3.5 text-neutral-400 animate-pulse" />
                DIVERGENT PROCESS: {PROJECTS_DATA.find(p => p.id === activeProject)?.title.toUpperCase()}
              </span>
              <span className="font-semibold text-emerald-400 text-[9.5px]">STATUS: INTERRUPT STREAM ACTIVE</span>
            </div>

            {/* Simulated target mounts */}
            <div className="p-0.5 rounded-xl overflow-hidden bg-black/20 border border-white/5">
              {activeProject === 'gesture-site' && <ProjectGestureSimulator />}
              {activeProject === 'library-system' && <ProjectLibrarySimulator />}
            </div>

            {/* Technical description details */}
            <div className="mt-6 p-5 rounded-xl border border-white/5 bg-black/40 text-xs space-y-2">
              <div className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest font-bold flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-neutral-400" /> SYSTEMS UNDERLAY & IMPLEMENTATION DETAILS
              </div>
              <p className="text-neutral-400 leading-relaxed max-w-3xl font-light font-sans">
                {PROJECTS_DATA.find(p => p.id === activeProject)?.description}
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
