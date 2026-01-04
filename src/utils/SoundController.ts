// src/utils/SoundController.ts

// Globalny stan wyciszenia
let isMuted = true; // Domyślnie wyciszone (dobre UX)

export const toggleMute = () => {
    isMuted = !isMuted;
    return isMuted;
};

export const getMuteStatus = () => isMuted;

// GENERAOR DŹWIĘKU (Web Audio API)
export const playSound = (type: 'hover' | 'click' | 'open') => {
    if (isMuted) return;

    // Tworzymy kontekst audio tylko przy interakcji (wymóg przeglądarek)
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;

    if (type === 'hover') {
        // HOVER: Wysoki, krótki, "szklany" dźwięk
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(1200, now + 0.05);
        
        gain.gain.setValueAtTime(0.05, now); // Bardzo cicho
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        
        osc.start(now);
        osc.stop(now + 0.05);
    } 
    else if (type === 'click') {
        // CLICK: Niższy, bardziej "mięsisty" dźwięk
        osc.type = 'square'; // Kwadratowa fala dla "cyfrowego" brzmienia
        osc.frequency.setValueAtTime(200, now);
        osc.frequency.exponentialRampToValueAtTime(50, now + 0.1);
        
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
        
        osc.start(now);
        osc.stop(now + 0.1);
    }
    else if (type === 'open') {
        // OPEN: Dłuższy sweep przy otwieraniu terminala
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(100, now);
        osc.frequency.linearRampToValueAtTime(600, now + 0.2);
        
        gain.gain.setValueAtTime(0.03, now);
        gain.gain.linearRampToValueAtTime(0.001, now + 0.2);
        
        osc.start(now);
        osc.stop(now + 0.2);
    }
};