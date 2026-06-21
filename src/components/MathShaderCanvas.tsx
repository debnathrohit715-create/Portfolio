import { useEffect, useRef, useState } from 'react';

export default function MathShaderCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [params, setParams] = useState({
    equation: 'F(x,y) = [-y/r², x/r²]',
    fieldStrength: 2.5,
    vorticity: 0.6,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let mouseX = -1000;
    let mouseY = -1000;
    let targetMouseX = -1000;
    let targetMouseY = -1000;

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width: boxWidth, height: boxHeight } = entry.contentRect;
        width = boxWidth;
        height = boxHeight;
        canvas.width = boxWidth * window.devicePixelRatio;
        canvas.height = boxHeight * window.devicePixelRatio;
        canvas.style.width = `${boxWidth}px`;
        canvas.style.height = `${boxHeight}px`;
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      }
    });

    resizeObserver.observe(container);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = e.clientX - rect.left;
      targetMouseY = e.clientY - rect.top;
      setCoords({
        x: Math.round(targetMouseX - width / 2),
        y: Math.round(height / 2 - targetMouseY),
      });
    };

    const handleMouseLeave = () => {
      targetMouseX = -1000;
      targetMouseY = -1000;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    const gridSpacing = 24;
    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.015;

      // Smooth mouse interpolation
      if (mouseX === -1000) {
        mouseX = width / 2;
        mouseY = height / 2;
      } else {
        mouseX += (targetMouseX - mouseX) * 0.12;
        mouseY += (targetMouseY - mouseY) * 0.12;
      }

      // Draw mathematical background grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw vector forces
      const cols = Math.floor(width / gridSpacing) + 2;
      const rows = Math.floor(height / gridSpacing) + 2;

      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const x = c * gridSpacing - gridSpacing/2;
          const y = r * gridSpacing - gridSpacing/2;

          // Vector calculation from current cell node to cursor
          const dx = mouseX - x;
          const dy = mouseY - y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;

          // Gravity/Calculus potential equations
          const influence = Math.max(0, 1 - dist / 180); // range limit
          const pushForce = Math.sin(influence * Math.PI / 2) * 15;

          // Vector angles combining vortex equations and push strength
          const angle = Math.atan2(dy, dx) + (params.vorticity * influence * Math.PI);

          // Displaced position
          const dispX = x + Math.cos(angle) * pushForce * params.fieldStrength;
          const dispY = y + Math.sin(angle) * pushForce * params.fieldStrength;

          // Draw node dot
          const maxDotOpacity = 0.8;
          const minDotOpacity = 0.12;
          const dotOpacity = minDotOpacity + (influence * (maxDotOpacity - minDotOpacity));
          
          ctx.beginPath();
          ctx.arc(dispX, dispY, influence > 0.4 ? 1.8 : 1.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${dotOpacity})`;
          ctx.fill();

          // Elegant line linking vector nodes if mouse is close
          if (influence > 0.3) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(dispX, dispY);
            ctx.strokeStyle = `rgba(255, 255, 255, ${influence * 0.18})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Draw focal ring at mouse position mapping a camera focus boundary/lens
      if (targetMouseX !== -1000) {
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 40, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.setLineDash([4, 4]);
        ctx.stroke();
        ctx.setLineDash([]);

        // Elegant tiny cursor indicator
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      resizeObserver.disconnect();
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [params]);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-[320px] md:h-[420px] bg-neutral-950/80 rounded-sm border border-neutral-900/65 overflow-hidden group cursor-crosshair"
      id="math-vector-canvas-container"
    >
      <canvas 
        ref={canvasRef} 
        className="block"
        id="math-vector-canvas"
      />

      {/* Futuristic HUD overlay to emphasize core calculus mechanics */}
      <div 
        className="absolute bottom-4 left-4 font-mono text-[10px] text-neutral-400 bg-neutral-950/80 border border-neutral-900 px-3 py-2 rounded-sm select-none backdrop-blur-md space-y-1"
        id="hud-viewport-calibration"
      >
        <div className="flex items-center gap-2 text-white">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>VECTOR FIELD RENDERER</span>
        </div>
        <div>
          <span className="text-neutral-500">POTENTIAL:</span> {params.equation}
        </div>
        <div className="flex gap-4">
          <div><span className="text-neutral-500">X:</span> {coords.x}px</div>
          <div><span className="text-neutral-500">Y:</span> {coords.y}px</div>
          <div><span className="text-neutral-500">DIV:</span> 0.000</div>
        </div>
      </div>

      {/* Physics sliders to tune equations directly */}
      <div 
        className="absolute top-4 right-4 font-mono text-[10px] text-neutral-400 bg-neutral-950/80 border border-neutral-900 p-3 rounded-sm select-none backdrop-blur-md space-y-2.5 w-44"
        id="physics-controls-overlay"
      >
        <div className="text-white border-b border-neutral-900 pb-1 flex justify-between items-center font-semibold">
          <span>CALCULUS PARAMS</span>
          <span className="text-[9px] text-neutral-500">COEF</span>
        </div>
        
        <div className="space-y-1">
          <div className="flex justify-between">
            <span>POTENTIAL INTENSITY</span>
            <span className="text-white">{params.fieldStrength.toFixed(1)}</span>
          </div>
          <input 
            type="range" 
            min="0.5" 
            max="5" 
            step="0.1"
            value={params.fieldStrength}
            onChange={(e) => {
              const val = parseFloat(e.target.value);
              setParams(p => ({ ...p, fieldStrength: val }));
            }}
            className="w-full accent-white bg-neutral-800 h-1 rounded-sm cursor-pointer appearance-none"
          />
        </div>

        <div className="space-y-1">
          <div className="flex justify-between">
            <span>ROTATIONAL CURL</span>
            <span className="text-white">{params.vorticity.toFixed(1)}</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="2" 
            step="0.1"
            value={params.vorticity}
            onChange={(e) => {
              const val = parseFloat(e.target.value);
              setParams(p => ({ 
                ...p, 
                vorticity: val,
                equation: val === 0 ? 'F(x,y) = ∇Φ(x,y)' : 'F(x,y) = [-y/r², x/r²]' 
              }));
            }}
            className="w-full accent-white bg-neutral-800 h-1 rounded-sm cursor-pointer appearance-none"
          />
        </div>
        <div className="text-[9px] text-neutral-500 text-right italic">
          Hover & move cursor to deflect nodes
        </div>
      </div>
    </div>
  );
}
