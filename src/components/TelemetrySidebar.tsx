import React, { useEffect, useState } from 'react';

// Generowanie losowych danych szesnastkowych
const generateHex = () => Math.random().toString(16).substring(2, 8).toUpperCase();

interface Props {
  side: 'left' | 'right';
}

export default function TelemetrySidebar({ side }: Props) {
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    // Generowanie danych co 100-500ms
    const interval = setInterval(() => {
      setLines(prev => {
        const newLine = `0x${generateHex()} :: ${Math.random() > 0.5 ? 'SYNC' : 'ACK'} [${Math.floor(Math.random() * 99)}ms]`;
        const updated = [...prev, newLine];
        if (updated.length > 20) updated.shift(); // Trzymaj tylko 20 linii
        return updated;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className={`
        fixed top-1/2 -translate-y-1/2 
        ${side === 'left' ? 'left-4 text-left' : 'right-4 text-right'}
        hidden 2xl:block  /* POPRAWKA: Pokaż tylko na ogromnych monitorach (2XL) */
        font-mono text-[9px] text-[#00ff9d]/30 
        pointer-events-none 
        z-0 /* POPRAWKA: Najniższa warstwa, pod kartami */
        select-none
      `}
    >
      <div className="flex flex-col gap-1">
        {lines.map((line, i) => (
          <div key={i} style={{ opacity: (i / lines.length) }}>
            {line}
          </div>
        ))}
      </div>
    </div>
  );
}