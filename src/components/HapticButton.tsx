import React, { useState, useRef } from 'react';

export default function HapticButton() {
    const [status, setStatus] = useState("HOLD TO SCAN");
    const [progress, setProgress] = useState(0);
    const timerRef = useRef<number | null>(null);

    const startScan = (e: React.TouchEvent | React.MouseEvent) => {
        e.preventDefault(); // Blokuje menu kontekstowe na mobile
        if (status === "ACCESS GRANTED") return;
        
        setStatus("SCANNING...");
        // Wibracja startowa (jeśli telefon obsługuje)
        if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(50);

        timerRef.current = window.setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(timerRef.current!);
                    completeScan();
                    return 100;
                }
                if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(20);
                return prev + 4; // Prędkość ładowania
            });
        }, 50);
    };

    const stopScan = () => {
        if (status === "ACCESS GRANTED") return;
        if (timerRef.current) clearInterval(timerRef.current);
        setStatus("HOLD TO SCAN");
        setProgress(0);
    };

    const completeScan = () => {
        if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate([100, 50, 100]);
        setStatus("ACCESS GRANTED");
        // Przewinięcie do kontaktu
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    };

    // Przycisk widoczny TYLKO na mobile (lg:hidden)
    return (
        <button
            onMouseDown={startScan}
            onMouseUp={stopScan}
            onMouseLeave={stopScan}
            onTouchStart={startScan}
            onTouchEnd={stopScan}
            className="fixed bottom-8 right-8 w-24 h-24 rounded-full border-2 border-[#00ff9d] bg-black/80 backdrop-blur-md flex items-center justify-center text-[10px] font-mono text-[#00ff9d] z-50 lg:hidden select-none active:scale-95 transition-transform shadow-[0_0_20px_rgba(0,255,157,0.2)]"
            style={{
                background: `radial-gradient(circle, rgba(0,255,157,0.2) ${progress}%, rgba(0,0,0,0.8) ${progress}%)`
            }}
        >
            <div className="text-center leading-tight">
                {status === "ACCESS GRANTED" ? (
                    <span className="text-white font-bold">ACCESS<br/>GRANTED</span>
                ) : (
                    status.replace(' ', '<br/>').split('<br/>').map((line, i) => <div key={i}>{line}</div>)
                )}
            </div>
        </button>
    );
}