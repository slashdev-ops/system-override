import React, { useState, useEffect, useRef } from 'react';

// DANE KOMEND
const COMMANDS: Record<string, string> = {
  help: "CMDS: whoami, stack, contact, clear, sudo, project_genesis, sky_eye", // Dodaj sky_eye do listy, żeby nie było za trudno
  whoami: "USER: GUEST. SYSTEM: SLASH_CORE v5.0 [SECURE]",
  stack: "TECH: Kubernetes, AWS/Azure, Python, Hardware Eng, React/Astro.",
  contact: "SECURE LINK: kontakt@slashdev.io",
  sudo: "PERMISSION DENIED. INCIDENT LOGGED.",
  ls: "ERROR: Encryption Key Required for /root access.",
  project_genesis: "STATUS: CLASSIFIED. LEVEL 5 CLEARANCE REQUIRED.",
  sky_eye: "ACCESS GRANTED. DOWNLOADING SECRET_DATA... [██████████] 100%. LINK: https://github.com/slashdev-ops"
};

// GLOWNE OKNO TERMINALA
export default function TerminalOverlay() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([
    "SLASH_CORE v5.0.1 (tty1)",
    "Uplink established.",
    "Type 'help' for commands.",
    "-------------------------"
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Nasłuch zdarzeń (Klawiatura + Custom Event z przycisku)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // DEBUG: Zobacz w konsoli co wciskasz
      // console.log("Key pressed:", e.code, e.key); 

      // Backquote to tylda/grawis pod ESC. F2 to alternatywa.
      if (e.code === 'Backquote' || e.code === 'F2') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      if (e.key === 'Escape') setIsOpen(false);
    };

    // Nasłuch na otwarcie z przycisku w UI
    const handleOpenEvent = () => setIsOpen(true);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-terminal', handleOpenEvent);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-terminal', handleOpenEvent);
    };
  }, []);

  // Auto-focus i scroll
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [isOpen, history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const cmd = input.toLowerCase().trim();
    if (cmd === "clear") {
      setHistory([]);
    } else {
      const response = COMMANDS[cmd] || `bash: ${cmd}: command not found`;
      setHistory(prev => [...prev, `guest@slash-dev:~$ ${input}`, response]);
    }
    setInput("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[99999] bg-black/95 backdrop-blur-md font-mono text-sm p-4 md:p-10 flex flex-col animate-in fade-in duration-200" onClick={() => inputRef.current?.focus()}>
      <div className="flex justify-between items-center text-[#00ff9d] mb-6 border-b border-[#00ff9d]/20 pb-2">
        <span className="opacity-70 text-xs tracking-widest">// ROOT_ACCESS_GRANTED</span>
        <button onClick={() => setIsOpen(false)} className="hover:bg-[#00ff9d] hover:text-black px-2 transition">[ ESC ]</button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2 text-gray-400 font-medium">
        {history.map((line, i) => (
          <div key={i} className={line.startsWith("guest") ? "text-white mt-3" : "text-[#00ff9d] ml-2 pl-2 border-l border-[#00ff9d]/30"}>
            {line}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleCommand} className="mt-4 flex items-center gap-2 pt-4">
        <span className="text-[#00ff9d]">guest@slash-dev:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent border-none outline-none text-white caret-[#00ff9d] font-bold"
          autoFocus
          spellCheck={false}
          autoComplete="off"
        />
      </form>
    </div>
  );
}