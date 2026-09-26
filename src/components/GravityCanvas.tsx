import React, { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';
import {
  Sparkles,
  RefreshCw,
  HandMetal,
  Move,
  Rocket,
  ShieldCheck,
  Zap,
} from 'lucide-react';

interface BodyMetadata {
  label: string;
  sublabel: string;
  type: 'nfc' | 'star' | 'whatsapp' | 'phone' | 'google' | 'valle';
  color: string;
  glowColor: string;
  radius: number;
}

export const GravityCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [itemCount, setItemCount] = useState(8);
  const [isZeroGActive, setIsZeroGActive] = useState(true);

  // References to keep Matter.js instances clean across re-renders
  const engineRef = useRef<Matter.Engine | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);
  const customBodiesRef = useRef<Array<{ body: Matter.Body; meta: BodyMetadata }>>([]);
  const mouseConstraintRef = useRef<Matter.MouseConstraint | null>(null);
  const mousePosRef = useRef<{ x: number; y: number; isInside: boolean }>({
    x: -9999,
    y: -9999,
    isInside: false,
  });

  const availablePresets: BodyMetadata[] = [
    {
      type: 'nfc',
      label: 'NFC NTAG213',
      sublabel: 'Toque Instantáneo',
      color: '#f59e0b',
      glowColor: 'rgba(245, 158, 11, 0.4)',
      radius: 46,
    },
    {
      type: 'star',
      label: '5.0 ★★★★★',
      sublabel: 'Google Maps Top',
      color: '#fbbf24',
      glowColor: 'rgba(251, 191, 36, 0.4)',
      radius: 42,
    },
    {
      type: 'whatsapp',
      label: 'WhatsApp Privado',
      sublabel: 'Filtro Anti-Reclamos',
      color: '#10b981',
      glowColor: 'rgba(16, 185, 129, 0.4)',
      radius: 44,
    },
    {
      type: 'phone',
      label: 'iPhone & Android',
      sublabel: '100% Sin Apps',
      color: '#38bdf8',
      glowColor: 'rgba(56, 189, 248, 0.4)',
      radius: 42,
    },
    {
      type: 'google',
      label: 'Blindaje Activo',
      sublabel: 'Solo 5 Estrellas',
      color: '#ea4335',
      glowColor: 'rgba(234, 67, 53, 0.35)',
      radius: 40,
    },
    {
      type: 'valle',
      label: 'Valle Pro ⚡',
      sublabel: 'Los Andes & San Felipe',
      color: '#a855f7',
      glowColor: 'rgba(168, 85, 247, 0.4)',
      radius: 45,
    },
    {
      type: 'nfc',
      label: 'Carta Digital',
      sublabel: 'QR + NFC en Mesa',
      color: '#06b6d4',
      glowColor: 'rgba(6, 182, 212, 0.4)',
      radius: 43,
    },
    {
      type: 'star',
      label: '4.95 ★ Promedio',
      sublabel: 'Aconcagua Líder',
      color: '#eab308',
      glowColor: 'rgba(234, 179, 8, 0.4)',
      radius: 39,
    },
  ];

  // Spawn new zero-G body
  const spawnItem = () => {
    const engine = engineRef.current;
    const canvas = canvasRef.current;
    if (!engine || !canvas) return;

    const width = canvas.width / (window.devicePixelRatio || 1);
    const height = canvas.height / (window.devicePixelRatio || 1);

    const preset = availablePresets[Math.floor(Math.random() * availablePresets.length)];
    const x = width / 2 + (Math.random() - 0.5) * (width * 0.4);
    const y = height / 2 + (Math.random() - 0.5) * (height * 0.4);

    const body = Matter.Bodies.circle(x, y, preset.radius, {
      restitution: 0.88,
      frictionAir: 0.005,
      friction: 0.02,
      density: 0.001,
      angle: (Math.random() - 0.5) * 0.5,
    });

    // Initial slight zero-g kick
    Matter.Body.setVelocity(body, {
      x: (Math.random() - 0.5) * 2.5,
      y: (Math.random() - 0.5) * 2.5,
    });
    Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.04);

    Matter.Composite.add(engine.world, body);
    customBodiesRef.current.push({ body, meta: preset });
    setItemCount(customBodiesRef.current.length);
  };

  // Cosmic impulse kick to all bodies
  const triggerImpulse = () => {
    const bodies = customBodiesRef.current;
    bodies.forEach(({ body }) => {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2.5 + Math.random() * 3.5;
      Matter.Body.setVelocity(body, {
        x: Math.cos(angle) * speed,
        y: Math.sin(angle) * speed,
      });
      Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.08);
    });
  };

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 1. Initialize Matter.js Engine with ZERO GRAVITY (Zero-G / Antigravity)
    const engine = Matter.Engine.create({
      gravity: {
        x: 0,
        y: 0,
        scale: 0.001,
      },
    });
    engineRef.current = engine;

    // Explicitly guarantee zero-gravity
    engine.gravity.x = 0;
    engine.gravity.y = 0;

    let width = container.clientWidth || 600;
    let height = container.clientHeight || 520;
    const dpr = window.devicePixelRatio || 1;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    // 2. Invisible boundary walls with high elastic restitution (~0.88 - 0.9)
    const wallThickness = 120;
    const wallOptions: Matter.IChamferableBodyDefinition = {
      isStatic: true,
      restitution: 0.9,
      friction: 0.05,
    };

    const topWall = Matter.Bodies.rectangle(
      width / 2,
      -wallThickness / 2,
      width * 2,
      wallThickness,
      wallOptions
    );
    const bottomWall = Matter.Bodies.rectangle(
      width / 2,
      height + wallThickness / 2,
      width * 2,
      wallThickness,
      wallOptions
    );
    const leftWall = Matter.Bodies.rectangle(
      -wallThickness / 2,
      height / 2,
      wallThickness,
      height * 2,
      wallOptions
    );
    const rightWall = Matter.Bodies.rectangle(
      width + wallThickness / 2,
      height / 2,
      wallThickness,
      height * 2,
      wallOptions
    );

    Matter.Composite.add(engine.world, [topWall, bottomWall, leftWall, rightWall]);

    // 3. Create initial floating bodies
    const createdBodies: Array<{ body: Matter.Body; meta: BodyMetadata }> = [];
    const initialPresets = availablePresets.slice(0, 8);

    initialPresets.forEach((preset, index) => {
      // Distribute evenly across canvas
      const col = index % 4;
      const row = Math.floor(index / 4);
      const posX = width * 0.2 + col * (width * 0.2);
      const posY = height * 0.28 + row * (height * 0.38) + (Math.random() - 0.5) * 40;

      const body = Matter.Bodies.circle(posX, posY, preset.radius, {
        restitution: 0.88,
        frictionAir: 0.005, // low air resistance so they drift continuously
        friction: 0.02,
        density: 0.001,
        angle: (Math.random() - 0.5) * 0.4,
      });

      // Gentle initial random drift
      Matter.Body.setVelocity(body, {
        x: (Math.random() - 0.5) * 2,
        y: (Math.random() - 0.5) * 2,
      });
      Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.03);

      createdBodies.push({ body, meta: preset });
      Matter.Composite.add(engine.world, body);
    });

    customBodiesRef.current = createdBodies;
    setItemCount(createdBodies.length);

    // 4. Mouse & MouseConstraint for grabbing & flinging
    const mouse = Matter.Mouse.create(canvas);
    // Adjust mouse pixel ratio for retina screens
    mouse.pixelRatio = dpr;

    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false,
        },
      },
    });
    mouseConstraintRef.current = mouseConstraint;
    Matter.Composite.add(engine.world, mouseConstraint);

    // Track mouse position on canvas for repulsion
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mousePosRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        isInside: true,
      };
    };

    const handleMouseLeave = () => {
      mousePosRef.current.isInside = false;
      mousePosRef.current.x = -9999;
      mousePosRef.current.y = -9999;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    // 5. Zero-G continuous loop & 'beforeUpdate' on Matter.js
    let tickCount = 0;
    Matter.Events.on(engine, 'beforeUpdate', () => {
      tickCount += 1;
      const t = tickCount * 0.015;
      const currentMouse = mousePosRef.current;
      const repulsionRadius = 140; // px repulsion proximity
      const draggedBody = mouseConstraint.body;

      customBodiesRef.current.forEach(({ body }, i) => {
        // A) Gentle, floating, random/harmonic wave force simulating Zero-G in space
        const harmonicForceX = Math.sin(t + i * 1.35) * 0.00018 + (Math.sin(t * 0.5 + i) * 0.00008);
        const harmonicForceY = Math.cos(t * 0.85 + i * 0.95) * 0.00018 + (Math.cos(t * 0.4 + i) * 0.00008);

        Matter.Body.applyForce(body, body.position, {
          x: harmonicForceX,
          y: harmonicForceY,
        });

        // B) Interactive soft repulsion when mouse cursor gets near
        if (currentMouse.isInside && body !== draggedBody) {
          const dx = body.position.x - currentMouse.x;
          const dy = body.position.y - currentMouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < repulsionRadius && dist > 1) {
            // Repulsion force in opposite direction of mouse
            const intensity = (1 - dist / repulsionRadius);
            const forceMag = intensity * intensity * 0.0022; // subtle outward push
            const fx = (dx / dist) * forceMag;
            const fy = (dy / dist) * forceMag;

            Matter.Body.applyForce(body, body.position, { x: fx, y: fy });
          }
        }

        // Soft internal barrier to prevent bodies from ever tunneling outside canvas
        const pad = body.circleRadius || 40;
        if (body.position.x < pad) {
          Matter.Body.applyForce(body, body.position, { x: 0.002, y: 0 });
        } else if (body.position.x > width - pad) {
          Matter.Body.applyForce(body, body.position, { x: -0.002, y: 0 });
        }
        if (body.position.y < pad) {
          Matter.Body.applyForce(body, body.position, { x: 0, y: 0.002 });
        } else if (body.position.y > height - pad) {
          Matter.Body.applyForce(body, body.position, { x: 0, y: -0.002 });
        }
      });
    });

    // 6. Start Matter.js Runner
    const runner = Matter.Runner.create();
    runnerRef.current = runner;
    Matter.Runner.run(runner, engine);

    // 7. Custom High-Fidelity Canvas Render Loop
    let animId: number;

    const render = () => {
      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      // Deep space grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.035)';
      ctx.lineWidth = 1;
      const step = 44;
      for (let x = 0; x < width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Mouse repulsion aura indicator
      if (mousePosRef.current.isInside) {
        const mx = mousePosRef.current.x;
        const my = mousePosRef.current.y;
        const auraGrad = ctx.createRadialGradient(mx, my, 10, mx, my, 140);
        auraGrad.addColorStop(0, 'rgba(245, 158, 11, 0.08)');
        auraGrad.addColorStop(0.5, 'rgba(6, 182, 212, 0.04)');
        auraGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = auraGrad;
        ctx.beginPath();
        ctx.arc(mx, my, 140, 0, Math.PI * 2);
        ctx.fill();

        // Repulsion center pulse
        ctx.strokeStyle = 'rgba(245, 158, 11, 0.25)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(mx, my, 22, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Render Each Floating Body
      customBodiesRef.current.forEach(({ body, meta }) => {
        const { x, y } = body.position;
        const radius = meta.radius;
        const isDragged = mouseConstraint.body === body;

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(body.angle);

        // Ambient outer glow
        const glowRadius = isDragged ? radius * 1.6 : radius * 1.35;
        const glow = ctx.createRadialGradient(0, 0, radius * 0.5, 0, 0, glowRadius);
        glow.addColorStop(0, isDragged ? `${meta.color}55` : meta.glowColor);
        glow.addColorStop(1, 'transparent');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(0, 0, glowRadius, 0, Math.PI * 2);
        ctx.fill();

        // Outer Metallic Rim
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2);
        ctx.fillStyle = '#0f1118';
        ctx.fill();

        // Border stroke with neon accent
        ctx.lineWidth = isDragged ? 2.5 : 1.8;
        ctx.strokeStyle = isDragged ? '#ffffff' : meta.color;
        ctx.stroke();

        // Inner glowing ring
        ctx.beginPath();
        ctx.arc(0, 0, radius - 4, 0, Math.PI * 2);
        ctx.strokeStyle = `${meta.color}33`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Icon / Type Glyphs
        ctx.fillStyle = meta.color;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        if (meta.type === 'nfc') {
          // NFC icon symbol
          ctx.beginPath();
          ctx.arc(0, -11, 8, Math.PI * 1.2, Math.PI * 1.8);
          ctx.strokeStyle = meta.color;
          ctx.lineWidth = 2;
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(0, -11, 13, Math.PI * 1.15, Math.PI * 1.85);
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(0, -11, 18, Math.PI * 1.1, Math.PI * 1.9);
          ctx.stroke();
        } else if (meta.type === 'star') {
          ctx.font = 'bold 15px sans-serif';
          ctx.fillText('★ ★ ★ ★ ★', 0, -12);
        } else if (meta.type === 'whatsapp') {
          ctx.font = 'bold 18px sans-serif';
          ctx.fillText('💬', 0, -11);
        } else if (meta.type === 'google') {
          ctx.font = 'bold 16px sans-serif';
          ctx.fillText('🛡️ G', 0, -11);
        } else if (meta.type === 'phone') {
          ctx.font = 'bold 16px sans-serif';
          ctx.fillText('📱', 0, -11);
        } else {
          ctx.font = 'bold 17px sans-serif';
          ctx.fillText('⚡', 0, -11);
        }

        // Labels
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 10px Plus Jakarta Sans, sans-serif';
        ctx.fillText(meta.label, 0, 8);

        ctx.fillStyle = '#94a3b8';
        ctx.font = '9px Plus Jakarta Sans, sans-serif';
        ctx.fillText(meta.sublabel, 0, 20);

        ctx.restore();
      });

      // Constraint line if dragging
      if (mouseConstraint.body) {
        const body = mouseConstraint.body;
        const anchor = mouseConstraint.constraint.pointB;
        ctx.beginPath();
        ctx.moveTo(body.position.x, body.position.y);
        ctx.lineTo(anchor.x, anchor.y);
        ctx.strokeStyle = 'rgba(245, 158, 11, 0.6)';
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 4]);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      ctx.restore();
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    // 8. Handle Resize
    const handleResize = () => {
      if (!container || !canvas || !engine) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      const newDpr = window.devicePixelRatio || 1;

      width = newWidth;
      height = newHeight;

      canvas.width = newWidth * newDpr;
      canvas.height = newHeight * newDpr;
      canvas.style.width = `${newWidth}px`;
      canvas.style.height = `${newHeight}px`;

      mouse.pixelRatio = newDpr;

      // Update wall positions
      Matter.Body.setPosition(topWall, { x: newWidth / 2, y: -wallThickness / 2 });
      Matter.Body.setPosition(bottomWall, { x: newWidth / 2, y: newHeight + wallThickness / 2 });
      Matter.Body.setPosition(leftWall, { x: -wallThickness / 2, y: newHeight / 2 });
      Matter.Body.setPosition(rightWall, { x: newWidth + wallThickness / 2, y: newHeight / 2 });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      Matter.Runner.stop(runner);
      Matter.Engine.clear(engine);
    };
  }, []);

  // Reset to initial positions
  const resetCanvas = () => {
    const engine = engineRef.current;
    if (!engine) return;

    // Clear existing
    customBodiesRef.current.forEach(({ body }) => {
      Matter.Composite.remove(engine.world, body);
    });
    customBodiesRef.current = [];

    // Re-spawn initial 8 items
    const canvas = canvasRef.current;
    const width = canvas ? canvas.width / (window.devicePixelRatio || 1) : 600;
    const height = canvas ? canvas.height / (window.devicePixelRatio || 1) : 520;

    const initialPresets = availablePresets.slice(0, 8);
    const newBodies: Array<{ body: Matter.Body; meta: BodyMetadata }> = [];

    initialPresets.forEach((preset, index) => {
      const col = index % 4;
      const row = Math.floor(index / 4);
      const posX = width * 0.2 + col * (width * 0.2);
      const posY = height * 0.28 + row * (height * 0.38);

      const body = Matter.Bodies.circle(posX, posY, preset.radius, {
        restitution: 0.88,
        frictionAir: 0.005,
        friction: 0.02,
        density: 0.001,
      });

      Matter.Body.setVelocity(body, {
        x: (Math.random() - 0.5) * 2,
        y: (Math.random() - 0.5) * 2,
      });

      newBodies.push({ body, meta: preset });
      Matter.Composite.add(engine.world, body);
    });

    customBodiesRef.current = newBodies;
    setItemCount(newBodies.length);
  };

  return (
    <div className="relative w-full rounded-3xl bg-[#090a0f] border border-amber-500/20 shadow-2xl overflow-hidden p-1 backdrop-blur-xl group">
      {/* Outer ambient glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/20 via-cyan-500/10 to-emerald-500/20 rounded-3xl blur-xl opacity-60 pointer-events-none" />

      <div
        ref={containerRef}
        className="relative w-full h-[480px] sm:h-[540px] rounded-[22px] bg-[#0c0d14] overflow-hidden"
      >
        {/* Canvas element */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 block cursor-grab active:cursor-grabbing w-full h-full select-none"
        />

        {/* Minimal Subtle Floating Zero-G Badge */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/60 backdrop-blur-md text-xs font-mono text-amber-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            <span className="font-semibold tracking-wide">ZERO-G WORKSHOP</span>
          </div>

          <button
            onClick={resetCanvas}
            title="Resetear fichas"
            className="pointer-events-auto p-2 rounded-xl bg-slate-900/80 border border-slate-700/80 text-slate-300 hover:text-white hover:bg-slate-800 transition shadow-lg active:scale-95"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
