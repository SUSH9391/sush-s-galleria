import React, { useEffect, useState, useMemo } from "react";

const HeroSection = () => {
  const staticPart = "Discover amazing ";
  const initialWord = "art and creativity";
  const phrases = useMemo(() => [
    "Frontend Activities",
    "Fullstack Activities",
    "Cybersecurity Services",
    "AI Services",
  ], []);

  // dynamic part after the staticPart
  const [displayed, setDisplayed] = useState("");
  // current phase: controls whether we're typing the initial word / deleting it / typing loop phrases etc.
  const [phase, setPhase] = useState("typingInitial");
  const [loopIndex, setLoopIndex] = useState(0);

  useEffect(() => {
    let timeout;

    if (phase === "typingInitial") {
      // type initialWord char by char
      if (displayed.length < initialWord.length) {
        timeout = setTimeout(() => {
          setDisplayed((d) => d + initialWord[d.length]);
        }, 90);
      } else {
        // fully typed initial word -> pause
        timeout = setTimeout(() => setPhase("pauseInitial"), 700);
      }
    } else if (phase === "pauseInitial") {
      timeout = setTimeout(() => setPhase("deletingInitial"), 700);
    } else if (phase === "deletingInitial") {
      // delete initial word char by char
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed((d) => d.slice(0, -1)), 45);
      } else {
        // initial fully removed -> start typing looped phrases
        timeout = setTimeout(() => setPhase("typingLoop"), 200);
      }
    } else if (phase === "typingLoop") {
      const current = phrases[loopIndex];
      if (displayed.length < current.length) {
        timeout = setTimeout(() => {
          setDisplayed((d) => d + current[d.length]);
        }, 80);
      } else {
        timeout = setTimeout(() => setPhase("pauseLoop"), 900);
      }
    } else if (phase === "pauseLoop") {
      timeout = setTimeout(() => setPhase("deletingLoop"), 900);
    } else if (phase === "deletingLoop") {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed((d) => d.slice(0, -1)), 40);
      } else {
        // move to next phrase and resume typing
        timeout = setTimeout(() => {
          setLoopIndex((i) => (i + 1) % phrases.length);
          setPhase("typingLoop");
        }, 200);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayed, phase, loopIndex, initialWord, phrases]);

  return (
    <section className="min-h-screen flex items-center justify-center bg-black pt-20">
      {/* Cursor blink styles (scoped) */}
      <style>{`
        .type-cursor {
          display:inline-block;
          width: 10px;
          height: 1.05em;
          vertical-align: -0.12em;
          margin-left: 6px;
          background: white;
          animation: blink 1s steps(2, start) infinite;
        }
        @keyframes blink {
          50% { opacity: 0; }
        }
      `}</style>

      <div className="text-center px-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 inter-font">
  Welcome to Sush's Galleria
</h1>


        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white mb-8 inter-font">
  {staticPart}
  <span>{displayed}</span>
  <span className="type-cursor" aria-hidden="true" />
</p>


        <button className="bg-white text-black px-8 py-3 rounded-full hover:bg-gray-200 transition-colors inter-font">
          <a href="#explore">Explore Now</a>
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
