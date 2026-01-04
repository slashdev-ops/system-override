import React, { useState, useEffect, useRef } from 'react';

const CHARS = "-_[]{}<>*+?|";

export default function ScrambleText({ text, className }: { text: string, className?: string }) {
  const [display, setDisplay] = useState(text);
  const intervalRef = useRef<number | null>(null);
  const iterations = useRef(0);

  useEffect(() => {
    // Reset przy najechaniu myszką lub starcie
    const startScramble = () => {
      let iter = 0;
      clearInterval(intervalRef.current as number);

      intervalRef.current = window.setInterval(() => {
        setDisplay(
          text
            .split("")
            .map((letter, index) => {
              if (index < iter) {
                return text[index];
              }
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join("")
        );

        if (iter >= text.length) {
          clearInterval(intervalRef.current as number);
        }

        iter += 1 / 2; // Prędkość dekodowania
      }, 30);
    };

    startScramble();

    return () => clearInterval(intervalRef.current as number);
  }, [text]);

  return <span className={className}>{display}</span>;
}