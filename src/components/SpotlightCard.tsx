import React, { useRef, useState } from 'react';
import { playSound } from '../utils/SoundController';

interface Props {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  // Nowe opcje
  mode?: 'default' | 'orange'; // Czy karta jest zwykła czy alertowa
}

export default function SpotlightCard({ children, className = "", onClick, mode = 'default' }: Props) {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setOpacity(1);
    playSound('hover');
  };

  const handleBlur = () => {
    setOpacity(0);
  };

  const handleClick = () => {
    playSound('click');
    if (onClick) onClick();
  }

  // Kolory gradientu w zależności od trybu
  const borderGradient = mode === 'orange' 
    ? 'conic-gradient(from 0deg, transparent 70%, #f97316 100%)' 
    : 'conic-gradient(from 0deg, transparent 70%, #00ff9d 100%)';

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleFocus}
      onMouseLeave={handleBlur}
      onClick={handleClick}
      // RODZIC: Ma zaokrąglenie, padding 1px (to będzie grubość ramki) i ukrywanie nadmiaru
      className={`relative rounded-xl overflow-hidden p-[1px] group ${className}`}
    >
      {/* 1. WARSTWA OBROTOWA (SKANER) - Jest tłem rodzica */}
      <div 
        className="absolute inset-[-50%] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
            background: borderGradient,
            animation: 'spin 4s linear infinite'
        }}
      />
      
      {/* 2. STATYCZNA RAMKA (Cienka linia widoczna gdy nie najeżdżamy) */}
      <div className={`absolute inset-0 rounded-xl border ${mode === 'orange' ? 'border-orange-500/30' : 'border-white/10 group-hover:border-transparent'} transition-colors pointer-events-none`} />

      {/* 3. TŁO KARTY (Właściwe czarne tło, które przykrywa środek skanera) */}
      <div className="relative h-full w-full bg-[#050505] rounded-[11px] overflow-hidden">
        
        {/* EFEKT SPOTLIGHT (Latarka) - Teraz wewnątrz czarnego tła */}
        <div
            className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 z-10"
            style={{
                opacity,
                background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${mode === 'orange' ? 'rgba(249, 115, 22, 0.15)' : 'rgba(0, 255, 157, 0.15)'}, transparent 40%)`,
            }}
        />

        {/* EFEKT SIATKI (Tech Grid) */}
        <div className={`absolute inset-0 bg-tech-grid pointer-events-none ${mode === 'orange' ? 'bg-orange-900/10' : ''}`} />

        {/* TREŚĆ */}
        <div className="relative z-20 h-full">
            {children}
        </div>
      </div>
    </div>
  );
}