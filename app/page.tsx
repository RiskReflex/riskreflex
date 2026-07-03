'use client';

import { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Shield, BrainCircuit, Activity, Globe, Database, Network } from 'lucide-react';
import CentralOrb from '@/components/3d/CentralOrb';

type ThreatStatus = 'secure' | 'warning' | 'critical';

export default function Home() {
  const router = useRouter();
  const [isEnteringRix, setIsEnteringRix] = useState(false);
  const [threatLevels, setThreatLevels] = useState<Record<string, ThreatStatus>>({
    platform: 'secure',
    solutions: 'secure',
    research: 'secure',
    rixai: 'secure', 
    about: 'secure',
    contact: 'secure'
  });

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

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  const curveX = useTransform(smoothX, [-1, 1], [-25, 25]);
  const curveY = useTransform(smoothY, [-1, 1], [-10, 10]);
  const orbX = useTransform(smoothX, [-1, 1], [15, -15]);
  const orbY = useTransform(smoothY, [-1, 1], [10, -10]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isEnteringRix) return; 
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth) * 2 - 1;
    const y = (clientY / innerHeight) * 2 - 1;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleEnterRix = () => {
    if (isEnteringRix) return;
    setIsEnteringRix(true);
    setTimeout(() => {
      router.push('/rix');
    }, 1200); 
  };

  return (
    <main 
      className="relative w-full h-[100dvh] bg-black overflow-hidden text-white"
      onMouseMove={handleMouseMove} 
    >
      <div className="z-50 pointer-events-none absolute inset-0 opacity-30 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#050813_0%,#000000_100%)] pointer-events-none z-0" />

      {/* FADE OUT WRAPPER FOR TRANSITION */}
      <motion.div 
        animate={{ opacity: isEnteringRix ? 0 : 1 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 z-40 pointer-events-none"
      >
        {/* HEADER */}
        <div className="absolute top-4 right-4 md:top-8 md:right-8 z-50 pointer-events-auto">
          <button 
            onClick={handleEnterRix}
            className="flex items-center text-[#00F0FF] text-[10px] md:text-sm tracking-[0.2em] uppercase hover:text-white transition-colors duration-300"
          >
            <span className="w-1.5 h-1.5 md:w-2 md:h-2 inline-block bg-[#00F0FF] rounded-full mr-2 md:mr-3 animate-pulse shadow-[0_0_8px_#00F0FF]" />
            Enter Rix
          </button>
        </div>

        <div className="absolute top-4 left-4 md:top-8 md:left-8 z-50 flex items-center space-x-2 md:space-x-3 pointer-events-auto">
          <div className="w-8 h-8 md:w-12 md:h-12 relative flex items-center justify-center">
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
            <h1 className="text-base md:text-2xl font-bold tracking-[0.25em] text-white drop-shadow-[0_0_10px_rgba(0,240,255,0.8)]">RISKREFLEX</h1>
            <p className="text-[6px] md:text-[9px] text-[#00F0FF] tracking-widest uppercase mt-0.5 opacity-80 hidden sm:block">
              Understand Risk Before Impact
            </p>
          </div>
        </div>

        {/* BOTTOM ORBITAL NAV */}
        <motion.div 
          style={{ x: curveX, y: curveY }}
          className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 w-full max-w-5xl h-28 md:h-48 z-20 pointer-events-auto"
        >
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40" preserveAspectRatio="none" viewBox="0 0 1000 150">
            <path d="M 50 30 Q 500 150 950 30" stroke="#00F0FF" strokeWidth="0.5" fill="none" strokeDasharray="4 6" />
          </svg>

          <div className="absolute inset-0 flex justify-between items-start px-2 sm:px-6 md:px-12">
            <div className="pt-0 md:pt-4"><NavNode icon={<Database className="w-4 h-4 md:w-5 md:h-5" />} label="Platform" delay={1.4} status={threatLevels.platform} /></div>
            <div className="pt-6 md:pt-14"><NavNode icon={<Shield className="w-4 h-4 md:w-5 md:h-5" />} label="Solutions" delay={1.6} status={threatLevels.solutions} /></div>
            <div className="pt-10 md:pt-20"><NavNode icon={<Activity className="w-4 h-4 md:w-5 md:h-5" />} label="Research" delay={1.8} status={threatLevels.research} /></div>
            
            <div className="pt-10 md:pt-20" onClick={handleEnterRix}>
              <NavNode icon={<BrainCircuit className="w-5 h-5 md:w-6 md:h-6" />} label="RIX AI" delay={2.0} status={threatLevels.rixai} />
            </div>
            
            <div className="pt-6 md:pt-14"><NavNode icon={<Network className="w-4 h-4 md:w-5 md:h-5" />} label="About" delay={2.2} status={threatLevels.about} /></div>
            <div className="pt-0 md:pt-4"><NavNode icon={<Globe className="w-4 h-4 md:w-5 md:h-5" />} label="Contact" delay={2.4} status={threatLevels.contact} /></div>
          </div>
        </motion.div>
      </motion.div>

      {/* CENTRAL ORB AND SUBTITLE */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none pb-20 md:pb-24">
        
        {/* Relative wrapper keeps the text attached to the orb */}
        <div className="relative flex flex-col items-center">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: isEnteringRix ? 15 : 1, 
              opacity: 1 
            }}
            style={{ x: isEnteringRix ? 0 : orbX, y: isEnteringRix ? 0 : orbY }}
            transition={{ duration: isEnteringRix ? 1.2 : 1.8, ease: "easeInOut" }}
            className="flex flex-col items-center pointer-events-auto cursor-pointer" 
            onClick={handleEnterRix}
          >
            <motion.div 
              animate={{ 
                boxShadow: isEnteringRix 
                  ? "0 0 200px rgba(0, 240, 255, 1)" 
                  : ["0 0 30px rgba(0, 87, 255, 0.4)", "0 0 60px rgba(0, 87, 255, 0.9)", "0 0 30px rgba(0, 87, 255, 0.4)"]
              }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-[180px] h-[180px] md:w-[250px] md:h-[250px] rounded-full border border-[#00F0FF]/20 flex items-center justify-center bg-black/40 backdrop-blur-md relative overflow-hidden"
            >
              <CentralOrb />
            </motion.div>
          </motion.div>

          {/* Subtitle is now anchored right here, and fades out normally */}
          <motion.div 
            animate={{ opacity: isEnteringRix ? 0 : 1 }}
            transition={{ duration: 0.5 }}
            className="absolute top-full mt-6 md:mt-8 z-20 w-[90vw] md:w-max px-4 pointer-events-none"
          >
            <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-1 md:gap-x-8 text-[8px] md:text-[12px] text-gray-400 tracking-widest uppercase opacity-90 text-center">
              <span>AI Governance</span>
              <span className="text-[#00F0FF] hidden md:inline">•</span>
              <span>Cyber Risk Intelligence</span>
              <span className="text-[#00F0FF] hidden md:inline">•</span>
              <span>Future Ready</span>
            </div>
          </motion.div>
        </div>

      </div>
    </main>
  );
}

function NavNode({ icon, label, delay, status = 'secure' }: { icon: React.ReactNode, label: string, delay: number, status?: ThreatStatus }) {
  const isSecure = status === 'secure';
  const isWarning = status === 'warning';
  const isCritical = status === 'critical';

  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: delay, duration: 0.6 }}
      className="flex flex-col items-center group cursor-pointer"
    >
      <div className="relative w-12 h-12 md:w-20 md:h-20 flex items-center justify-center">
        <div className="absolute w-12 h-12 md:w-[72px] md:h-[72px] rounded-full border border-gray-800/60 pointer-events-none" />
        
        <div 
          className={`absolute w-10 h-10 md:w-14 md:h-14 rounded-full border transition-all duration-500 animate-ping 
            ${isSecure ? 'border-[#00F0FF]/40' : isWarning ? 'border-amber-500/60' : 'border-red-500/80'}`} 
          style={{ animationDuration: isSecure ? '4s' : isWarning ? '2s' : '1s' }} 
        />
        
        <div className={`w-10 h-10 md:w-14 md:h-14 rounded-full border flex items-center justify-center backdrop-blur-md transition-all duration-500 relative z-10 bg-black/80 hover:scale-105
            ${isSecure ? 'border-[#00F0FF]/40 text-[#00F0FF] shadow-[0_0_10px_rgba(0,240,255,0.1)]' : ''}
            ${isWarning ? 'border-amber-500/60 text-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.3)]' : ''}
            ${isCritical ? 'border-red-500/80 text-red-500 shadow-[0_0_20px_rgba(239,68,68,0.5)]' : ''}
          `}>
          {icon}
        </div>
      </div>
      <span className={`mt-1.5 md:mt-2 text-[7px] md:text-[10px] tracking-widest uppercase transition-colors duration-500 font-semibold group-hover:text-white
        ${isSecure ? 'text-[#00F0FF]' : isWarning ? 'text-amber-500' : 'text-red-500'}`}>
        {label}
      </span>
    </motion.div>
  );
}