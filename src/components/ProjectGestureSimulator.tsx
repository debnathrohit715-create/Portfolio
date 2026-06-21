import { useState, useRef, useEffect } from 'react';
import { Camera, RefreshCw, Layers, ShieldCheck, Cpu } from 'lucide-react';

interface GesturePreset {
  name: string;
  translation: string;
  confidence: number;
  joints: Array<{ x: number; y: number; label?: string }>;
}

const GESTURE_PRESETS: Record<string, GesturePreset> = {
  peace: {
    name: "Victory / Peace",
    translation: "PEACE & UNITY",
    confidence: 99.12,
    joints: [
      { x: 150, y: 350, label: 'Wrist' },
      { x: 160, y: 300 }, { x: 180, y: 270 }, { x: 200, y: 250, label: 'Thumb' },
      { x: 120, y: 260 }, { x: 110, y: 200 }, { x: 105, y: 140, label: 'Index Link' }, { x: 100, y: 80, label: 'Index Pin' }, // index
      { x: 150, y: 250 }, { x: 145, y: 190 }, { x: 140, y: 130 }, { x: 135, y: 70, label: 'Middle Pin' }, // middle
      { x: 180, y: 260 }, { x: 190, y: 290 }, { x: 185, y: 310, label: 'Ring Retracted' }, // ring
      { x: 210, y: 280 }, { x: 220, y: 310 }, { x: 215, y: 325, label: 'Pinky Retracted' }, // pinky
    ]
  },
  ok: {
    name: "OK Sign",
    translation: "CONFIRMED / ACCEPT",
    confidence: 98.45,
    joints: [
      { x: 150, y: 350, label: 'Wrist' },
      // thumb meeting index
      { x: 160, y: 300 }, { x: 175, y: 260 }, { x: 165, y: 220, label: 'Thumb' },
      { x: 120, y: 260 }, { x: 110, y: 200 }, { x: 125, y: 175 }, { x: 150, y: 200, label: 'Index meeting Thumb' }, // index meeting
      { x: 150, y: 250 }, { x: 145, y: 180 }, { x: 140, y: 120 }, { x: 135, y: 60, label: 'Middle Up' }, // middle
      { x: 180, y: 260 }, { x: 185, y: 190 }, { x: 190, y: 130 }, { x: 195, y: 70, label: 'Ring Up' }, // ring
      { x: 210, y: 280 }, { x: 220, y: 210 }, { x: 230, y: 150 }, { x: 240, y: 90, label: 'Pinky Up' }, // pinky
    ]
  },
  thumbs_up: {
    name: "Thumbs Up",
    translation: "ACKNOWLEDGED",
    confidence: 97.89,
    joints: [
      { x: 150, y: 350, label: 'Wrist' },
      { x: 125, y: 290 }, { x: 110, y: 240 }, { x: 95, y: 180, label: 'Thumb Up' }, // Thumb standing up high
      { x: 170, y: 290 }, { x: 190, y: 290 }, { x: 180, y: 310, label: 'Index Fold' }, // folded index
      { x: 165, y: 315 }, { x: 185, y: 315 }, { x: 175, y: 330, label: 'Middle Fold' }, // folded middle
      { x: 160, y: 335 }, { x: 180, y: 335 }, { x: 170, y: 350, label: 'Ring Fold' }, // folded ring
      { x: 155, y: 355 }, { x: 175, y: 355 }, { x: 165, y: 365, label: 'Pinky Fold' }, // folded pinky
    ]
  },
  hand_open: {
    name: "Open Palm / Hello",
    translation: "GREETINGS / SYSTEM ACTIVE",
    confidence: 99.64,
    joints: [
      { x: 150, y: 350, label: 'Wrist' },
      { x: 190, y: 310 }, { x: 220, y: 280 }, { x: 250, y: 260, label: 'Thumb' },
      { x: 110, y: 260 }, { x: 95, y: 190 }, { x: 85, y: 120 }, { x: 75, y: 60, label: 'Index Pin' }, // index
      { x: 140, y: 250 }, { x: 135, y: 170 }, { x: 130, y: 100 }, { x: 125, y: 40, label: 'Middle Pin' }, // middle
      { x: 170, y: 260 }, { x: 170, y: 180 }, { x: 170, y: 110 }, { x: 170, y: 50, label: 'Ring Pin' }, // ring
      { x: 200, y: 280 }, { x: 205, y: 210 }, { x: 210, y: 150 }, { x: 215, y: 80, label: 'Pinky Pin' }, // pinky
    ]
  }
};

export default function ProjectGestureSimulator() {
  const [activePreset, setActivePreset] = useState<keyof typeof GESTURE_PRESETS>('peace');
  const [isCapturing, setIsCapturing] = useState(true);
  const [showMatrix, setShowMatrix] = useState(false);
  const [fps, setFps] = useState(60);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const currentGesture = GESTURE_PRESETS[activePreset];

  useEffect(() => {
    // Simulate minor FPS and confidence noise to keep it deeply realistic and technically genuine
    const interval = setInterval(() => {
      setFps(f => {
        const delta = Math.floor(Math.random() * 3) - 1;
        return Math.max(58, Math.min(60, f + delta));
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Reset canvas resolution
    canvas.width = 320;
    canvas.height = 400;

    let animFrame: number;
    let t = 0;

    const render = () => {
      t += 0.05;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (!isCapturing) {
        ctx.fillStyle = '#171717';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
        ctx.font = '10px monospace';
        ctx.textAlign = 'center';
        ctx.fillText("SENSOR STREAM CORRUPTED / OFF", canvas.width / 2, canvas.height / 2);
        return;
      }

      // Draw mathematical grid texture
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.015)';
      ctx.lineWidth = 1;
      const step = 20;
      for (let x = 0; x < canvas.width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      const joints = currentGesture.joints;

      // Draw skeletal linking lines with soft neon glow properties
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 1.6;

      // Draw hand skeletal chain manually for clean visualization
      // Wrist to thumb
      if (joints[0]) {
        ctx.beginPath();
        ctx.moveTo(joints[0].x, joints[0].y);
        for (let i = 1; i <= 3; i++) {
          if (joints[i]) ctx.lineTo(joints[i].x + Math.sin(t + i) * 1.5, joints[i].y + Math.cos(t) * 1.5);
        }
        ctx.stroke();

        // Wrist to Index
        ctx.beginPath();
        ctx.moveTo(joints[0].x, joints[0].y);
        if (joints[4]) {
          ctx.lineTo(joints[4].x + Math.sin(t) * 1.5, joints[4].y + Math.cos(t) * 1.5);
          for (let i = 5; i <= 7; i++) {
            if (joints[i]) ctx.lineTo(joints[i].x + Math.sin(t + i) * 1.2, joints[i].y + Math.cos(t) * 1.2);
          }
        }
        ctx.stroke();

        // Wrist to Middle
        ctx.beginPath();
        ctx.moveTo(joints[0].x, joints[0].y);
        if (joints[8]) {
          ctx.lineTo(joints[8].x, joints[8].y);
          for (let i = 9; i <= 11; i++) {
            if (joints[i]) ctx.lineTo(joints[i].x + Math.sin(t * 0.8) * 1.2, joints[i].y + Math.cos(t + i) * 1.2);
          }
        }
        ctx.stroke();

        // Wrist to Ring
        ctx.beginPath();
        ctx.moveTo(joints[0].x, joints[0].y);
        if (joints[12]) {
          ctx.lineTo(joints[12].x, joints[12].y);
          for (let i = 13; i <= 14; i++) {
            if (joints[i]) ctx.lineTo(joints[i].x, joints[i].y);
          }
        }
        ctx.stroke();

        // Wrist to Pinky
        ctx.beginPath();
        ctx.moveTo(joints[0].x, joints[0].y);
        if (joints[15]) {
          ctx.lineTo(joints[15].x, joints[15].y);
          for (let i = 16; i <= 17; i++) {
            if (joints[i]) ctx.lineTo(joints[i].x, joints[i].y);
          }
        }
        ctx.stroke();
      }

      // Link knuckles (horizontal chain)
      const knuckles = [1, 4, 8, 12, 15].map(idx => joints[idx]).filter(Boolean);
      if (knuckles.length > 0) {
        ctx.beginPath();
        ctx.moveTo(knuckles[0].x, knuckles[0].y);
        for (let i = 1; i < knuckles.length; i++) {
          ctx.lineTo(knuckles[i].x, knuckles[i].y);
        }
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Draw high-contrast digital node points
      joints.forEach((joint, idx) => {
        const offset = Math.sin(t + idx) * 1.2;
        const jx = joint.x + offset;
        const jy = joint.y + Math.cos(t) * 1.2;

        // Draw inner dot
        ctx.beginPath();
        ctx.arc(jx, jy, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();

        // High contrast radial ring representing ML node anchor
        ctx.beginPath();
        ctx.arc(jx, jy, 8, 0, Math.PI * 2);
        ctx.strokeStyle = idx === 0 || joint.label ? 'rgba(255, 255, 255, 0.6)' : 'rgba(255, 255, 255, 0.2)';
        ctx.lineWidth = 0.8;
        ctx.stroke();

        // Print tiny joint identifiers
        if (joint.label) {
          ctx.fillStyle = '#a3a3a3';
          ctx.font = '8px monospace';
          ctx.textAlign = 'left';
          ctx.fillText(`JP-${idx}: ${joint.label}`, jx + 12, jy + 3);
        }
      });

      // Draw bounding prediction frame tracker
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 1;
      ctx.strokeRect(40, 30, canvas.width - 80, canvas.height - 110);
      
      // Target brackets corner lines
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;
      const corners = [
        { x: 40, y: 30, hx: 10, hy: 10 },
        { x: canvas.width - 40, y: 30, hx: -10, hy: 10 },
        { x: 40, y: canvas.height - 80, hx: 10, hy: -10 },
        { x: canvas.width - 40, y: canvas.height - 80, hx: -10, hy: -10 }
      ];
      corners.forEach(c => {
        ctx.beginPath();
        ctx.moveTo(c.x, c.y + c.hy);
        ctx.lineTo(c.x, c.y);
        ctx.lineTo(c.x + c.hx, c.y);
        ctx.stroke();
      });

      // Predict overlay confidence tag
      ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
      ctx.fillRect(45, 35, 120, 20);
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 0.8;
      ctx.strokeRect(45, 35, 120, 20);
      
      ctx.fillStyle = '#ffffff';
      ctx.font = '9px monospace';
      ctx.textAlign = 'left';
      ctx.fillText(`CONF: ${(currentGesture.confidence + Math.sin(t)*0.1).toFixed(2)}%`, 50, 48);

      animFrame = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animFrame);
  }, [activePreset, isCapturing]);

  return (
    <div 
      className="bg-neutral-950 border border-neutral-900 overflow-hidden text-neutral-200 text-sm select-none"
      id="gesture-simulator-main-frame"
    >
      <div 
        className="border-b border-neutral-900 bg-neutral-950 px-4 py-3 flex justify-between items-center"
        id="gesture-sim-header"
      >
        <div className="flex items-center gap-2">
          <Camera className="w-4 h-4 text-neutral-400" />
          <span className="font-mono text-xs uppercase text-neutral-300 tracking-wider">GESTURE CLASSIFIER STUDIO</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-mono text-[10px] text-neutral-500">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>{fps} FPS</span>
          </div>
          <button 
            type="button"
            onClick={() => setIsCapturing(!isCapturing)}
            className={`px-2 py-0.5 rounded-sm font-mono text-[9px] border transition-all ${
              isCapturing 
                ? 'bg-neutral-900 text-neutral-300 border-neutral-800 hover:bg-neutral-800' 
                : 'bg-white text-black border-white hover:bg-neutral-200'
            }`}
          >
            {isCapturing ? 'PAUSE CAPTURE' : 'RESUME'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5" id="gesture-grid-columns">
        {/* Settings and Info Sidebar */}
        <div 
          className="p-4 border-b md:border-b-0 md:border-r border-neutral-900 md:col-span-2 space-y-4 flex flex-col justify-between"
          id="gesture-sidebar-container"
        >
          <div className="space-y-4">
            <div>
              <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest mb-1.5 font-semibold">
                SKELETAL PRESETS
              </div>
              <div className="grid grid-cols-2 gap-2" id="gesture-buttons-grid">
                {Object.keys(GESTURE_PRESETS).map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setActivePreset(key)}
                    className={`px-3 py-2 text-left transition-all rounded-sm border ${
                      activePreset === key
                        ? 'bg-white text-black border-white font-medium'
                        : 'bg-neutral-950 text-neutral-400 border-neutral-900 hover:bg-neutral-900 hover:border-neutral-800'
                    }`}
                  >
                    <div className="font-mono text-[9px] uppercase tracking-wider">
                      {key.replace('_', ' ')}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="border border-neutral-900/80 p-3 bg-neutral-950/40 rounded-sm space-y-2">
              <div className="font-mono text-[11px] text-white flex items-center gap-2">
                <Cpu className="w-3.5 h-3.5 text-neutral-400" />
                <span>CLASSIFIED GESTURE</span>
              </div>
              <div className="font-serif text-lg text-white font-semibold">
                "{currentGesture.name}"
              </div>
              <div className="font-mono text-[10px] text-emerald-400 bg-emerald-950/20 inline-block px-1.5 py-0.5 tracking-wider font-semibold rounded-sm">
                CONFIDENCE: {(currentGesture.confidence).toFixed(2)}%
              </div>
              <p className="text-neutral-400 text-[11px] leading-relaxed pt-1 border-t border-neutral-900">
                Maps hand coordinates into vector landmarks, then transforms angles on the client-side browser logic without exposing database models.
              </p>
            </div>
          </div>

          <div className="space-y-2 pt-4 border-t border-neutral-900">
            <div className="flex items-center justify-between text-[10px] font-mono text-neutral-500">
              <span className="flex items-center gap-1 text-neutral-400"><Layers className="w-3 h-3"/> NODE CHANNELS</span>
              <span className="text-white">21 BOUNDS</span>
            </div>
            <div className="flex items-center justify-between text-[10px] font-mono text-neutral-500">
              <span className="flex items-center gap-1 text-neutral-400"><ShieldCheck className="w-3 h-3"/> MODEL THRESHOLD</span>
              <span className="text-white">0.85 MIN</span>
            </div>
          </div>
        </div>

        {/* Live Vector Canvas Representation */}
        <div className="bg-neutral-950 flex flex-col items-center justify-center p-4 md:col-span-3 min-h-[400px]" id="gesture-canvas-container">
          <div className="relative border border-neutral-900 bg-[#060606] shadow-2xl p-0.5 rounded-sm">
            <canvas 
              ref={canvasRef} 
              className="block opacity-90 transition-opacity" 
              style={{ filter: 'drop-shadow(0 0 15px rgba(255,255,255,0.02))' }}
              id="gesture-canvas-skeletal"
            />
            {/* Ambient vignette lines */}
            <div className="absolute inset-0 pointer-events-none border border-white/5 bg-gradient-to-t from-black/20 via-transparent to-black/20" />
          </div>
          <div className="mt-3 font-mono text-[9px] text-neutral-500 text-center uppercase tracking-widest">
            SKIN SKELETON RECONSTRUCTION // 85MM FOCUS LENS FLUIDITY
          </div>
        </div>
      </div>
    </div>
  );
}
