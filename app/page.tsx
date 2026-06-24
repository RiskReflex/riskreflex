'use client';

import { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import { Shield, BrainCircuit, Activity, Globe, Database, Network } from 'lucide-react';
import CentralOrb from '@/components/3d/CentralOrb';

type ThreatStatus = 'secure' | 'warning' | 'critical';

export default function Home() {
  // 1. Threat Level State
  const [threatLevels, setThreatLevels] = useState<Record<string, ThreatStatus>>({
    platform: 'secure',
    solutions: 'secure',
    research: 'secure',
    rixai: 'secure', 
    about: 'secure',
    contact: 'secure'
  });

  // Simulate active threat monitoring
  useEffect(() => {
    const interval = setInterval(() => {
      const nodes = ['platform', 'solutions', 'research', 'network', 'contact'];
      const randomNode = nodes[Math.floor(Math.random() * nodes.length)];
      
      const roll = Math.random();
      const newStatus: ThreatStatus = roll > 0.9 ? 'critical' : roll > 0.6 ? 'warning' : 'secure';

      setThreatLevels(prev => ({
        ...prev,
        platform: 'secure',
        solutions: 'secure',
        research: 'secure',
        about: 'secure',
        contact: 'secure',
        [randomNode]: newStatus
      }));
    }, 4000); 
    return () => clearInterval(interval);
  }, []);

  // 2. Parallax Tracking Engine
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Springs ensure the movement glides smoothly like liquid, rather than snapping
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  // Navigation Curve moves slightly WITH the mouse
  const curveX = useTransform(smoothX, [-1, 1], [-25, 25]);
  const curveY = useTransform(smoothY, [-1, 1], [-10, 10]);

  // Central Orb moves slightly AGAINST the mouse to create deep 3D separation
  const orbX = useTransform(smoothX, [-1, 1], [15, -15]);
  const orbY = useTransform(smoothY, [-1, 1], [10, -10]);

  // Capture mouse movement across the entire screen
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    // Normalize coordinates from -1 to 1 based on screen center
    const x = (clientX / innerWidth) * 2 - 1;
    const y = (clientY / innerHeight) * 2 - 1;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <main 
      className="relative w-full h-screen bg-black overflow-hidden text-white"
      onMouseMove={handleMouseMove} // Attach the tracker to the main window
    >
      
      {/* Scanline Overlay */}
      <div className="scanlines z-50 pointer-events-none absolute inset-0" />

      {/* Pure Deep Space Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#050813] via-black to-black pointer-events-none z-0" />

      {/* ======================= */}
      {/* HEADER (Absolute Top)   */}
      {/* ======================= */}
      <div className="absolute top-6 right-6 md:top-8 md:right-8 z-50">
        <button className="flex items-center text-rix-cyan text-xs md:text-sm tracking-[0.2em] uppercase hover:text-white transition-colors duration-300">
          <span className="w-2 h-2 inline-block bg-rix-cyan rounded-full mr-3 animate-pulse shadow-[0_0_8px_#00F0FF]" />
          Enter Rix
        </button>
      </div>

      <div className="absolute top-6 left-6 md:top-8 md:left-8 z-50 flex items-center space-x-3">
        {/* LOGO FIX: Forced native high-res render (96px), max quality, constrained to 48px display */}
        <div className="w-12 h-12 relative flex items-center justify-center">
          <Image 
            src="/logo.png" 
            alt="RiskReflex Core" 
            width={96} 
            height={96} 
            quality={100}
            priority
            className="object-contain w-full h-full animate-pulse"
            style={{ animationDuration: '6s' }}
          />
        </div>
        <div>
          <h1 className="text-xl md:text-2xl font-bold tracking-[0.25em] neon-text-cyan">RISKREFLEX</h1>
          <p className="text-[8px] md:text-[9px] text-rix-cyan tracking-widest uppercase mt-0.5 opacity-80">
            Understand Risk Before Impact
          </p>
        </div>
      </div>

      {/* ======================= */}
      {/* MIDDLE (Central Orb)    */}
      {/* ======================= */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none pb-16 md:pb-24">
        
        {/* PARALLAX APPLIED: The Orb group moves via orbX and orbY */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          style={{ x: orbX, y: orbY }}
          transition={{ duration: 1.8, ease: "easeOut" }}
          className="flex flex-col items-center pointer-events-auto relative" 
        >
          {/* Main Breathing Container */}
          <motion.div 
            animate={{ 
              scale: [1, 1.05, 1], 
              boxShadow: [
                "0 0 30px rgba(0, 87, 255, 0.4), 0 0 60px rgba(0, 240, 255, 0.2)", 
                "0 0 60px rgba(0, 87, 255, 0.9), 0 0 100px rgba(0, 240, 255, 0.7)", 
                "0 0 30px rgba(0, 87, 255, 0.4), 0 0 60px rgba(0, 240, 255, 0.2)"  
              ]
            }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-[200px] h-[200px] md:w-[250px] md:h-[250px] rounded-full border border-rix-cyan/20 flex items-center justify-center bg-black/40 backdrop-blur-md relative overflow-hidden"
          >
            <CentralOrb />
          </motion.div>

          <motion.div 
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="absolute top-full mt-4 md:mt-8 z-20 w-max"
          >
            <div className="flex space-x-4 md:space-x-8 text-[11px] md:text-[12px] text-gray-400 tracking-widest uppercase justify-center opacity-90">
              <span>AI Governance</span>
              <span className="text-rix-cyan">•</span>
              <span>Cyber Risk Intelligence</span>
              <span className="text-rix-cyan">•</span>
              <span>Future Ready</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* ======================= */}
      {/* BOTTOM (Orbital Nav)    */}
      {/* ======================= */}
      {/* PARALLAX APPLIED: The entire navigation curve moves via curveX and curveY */}
      <motion.div 
        style={{ x: curveX, y: curveY }}
        className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 w-full max-w-5xl h-40 md:h-48 z-20"
      >
        
        {/* SVG Curve */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40" preserveAspectRatio="none" viewBox="0 0 1000 150">
          <path d="M 50 30 Q 500 150 950 30" stroke="#00F0FF" strokeWidth="0.5" fill="none" strokeDasharray="4 6" />
        </svg>

        <div className="absolute inset-0 flex justify-between items-start px-6 md:px-12">
          <div className="pt-2 md:pt-4"><NavNode icon={<Database className="w-5 h-5" />} label="Platform" delay={1.4} status={threatLevels.platform} /></div>
          <div className="pt-10 md:pt-14"><NavNode icon={<Shield className="w-5 h-5" />} label="Solutions" delay={1.6} status={threatLevels.solutions} /></div>
          <div className="pt-14 md:pt-20"><NavNode icon={<Activity className="w-5 h-5" />} label="Research" delay={1.8} status={threatLevels.research} /></div>
          
          <div className="pt-14 md:pt-20"><NavNode icon={<BrainCircuit className="w-6 h-6" />} label="RIX AI" delay={2.0} status={threatLevels.rixai} /></div>
          
          <div className="pt-10 md:pt-14"><NavNode icon={<Network className="w-5 h-5" />} label="About" delay={2.2} status={threatLevels.about} /></div>
          <div className="pt-2 md:pt-4"><NavNode icon={<Globe className="w-5 h-5" />} label="Contact" delay={2.4} status={threatLevels.contact} /></div>
        </div>
      </motion.div>

    </main>
  );
}

// Fixed NavNode Component with Dynamic Threat Colors
function NavNode({ icon, label, delay, status = 'secure' }: { icon: React.ReactNode, label: string, delay: number, status?: ThreatStatus }) {
  const styles = {
    secure: {
      border: 'border-rix-cyan/40 hover:border-rix-cyan/60',
      text: 'text-rix-cyan',
      shadow: 'shadow-[0_0_10px_rgba(0,240,255,0.1)] hover:shadow-[0_0_15px_rgba(0,240,255,0.25)]',
      pulse: 'border-rix-cyan/40 animate-ping',
      pulseDuration: '4s'
    },
    warning: {
      border: 'border-amber-500/60 hover:border-amber-400',
      text: 'text-amber-500',
      shadow: 'shadow-[0_0_15px_rgba(245,158,11,0.3)] hover:shadow-[0_0_20px_rgba(245,158,11,0.5)]',
      pulse: 'border-amber-500/60 animate-ping',
      pulseDuration: '2s' 
    },
    critical: {
      border: 'border-red-500/80 hover:border-red-400',
      text: 'text-red-500',
      shadow: 'shadow-[0_0_20px_rgba(239,68,68,0.5)] hover:shadow-[0_0_25px_rgba(239,68,68,0.7)]',
      pulse: 'border-red-500/80 animate-ping',
      pulseDuration: '1s' 
    }
  };

  const currentStyle = styles[status];

  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: delay, duration: 0.6 }}
      className="flex flex-col items-center group cursor-pointer"
    >
      <div className="relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
        <div className="absolute w-16 h-16 md:w-[72px] md:h-[72px] rounded-full border border-gray-800/60 pointer-events-none transition-colors duration-500" />
        <div 
          className={`absolute w-12 h-12 md:w-14 md:h-14 rounded-full border transition-all duration-500 ${currentStyle.pulse}`} 
          style={{ animationDuration: currentStyle.pulseDuration, animationDelay: status === 'secure' ? `${delay}s` : '0s' }} 
        />
        <div className={`w-12 h-12 md:w-14 md:h-14 rounded-full border flex items-center justify-center backdrop-blur-md transition-all duration-500 relative z-10 bg-black/80 hover:scale-105 ${currentStyle.border} ${currentStyle.text} ${currentStyle.shadow}`}>
          {icon}
        </div>
      </div>
      <span className={`mt-2 text-[9px] md:text-[10px] tracking-widest uppercase transition-colors duration-500 font-semibold group-hover:text-white ${currentStyle.text}`}>
        {label}
      </span>
    </motion.div>
  );
}