import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import HeroCanvas from "../three/HeroCanvas";

// Typewriter effect hook
const useTypewriter = (words, speed = 80) => {
  const [display, setDisplay] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex % words.length];
    const timeout = setTimeout(
      () => {
        if (!deleting) {
          setDisplay(current.substring(0, charIndex + 1));
          setCharIndex((c) => c + 1);
          if (charIndex + 1 === current.length) {
            setTimeout(() => setDeleting(true), 1500);
          }
        } else {
          setDisplay(current.substring(0, charIndex - 1));
          setCharIndex((c) => c - 1);
          if (charIndex - 1 === 0) {
            setDeleting(false);
            setWordIndex((w) => (w + 1) % words.length);
          }
        }
      },
      deleting ? speed / 2 : speed,
    );
    return () => clearTimeout(timeout);
  }, [charIndex, deleting, wordIndex, words, speed]);

  return display;
};

const Hero = () => {
  const typed = useTypewriter([
    "Full Stack Developer",
    "MERN Stack Engineer",
    "UI/UX Enthusiast",
    "Problem Solver",
  ]);

  return (
    <section
      id="home"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        paddingTop: "70px",
      }}
    >
      {/* 3D Background */}
      <HeroCanvas />

      {/* Gradient overlays */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background:
            "radial-gradient(ellipse at center, transparent 30%, #050508 80%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "200px",
          zIndex: 1,
          background: "linear-gradient(to top, #050508, transparent)",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          padding: "0 1.5rem",
          maxWidth: "900px",
        }}
      >
        {/* Top label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            marginBottom: "1.5rem",
            padding: "0.3rem 1rem",
            border: "1px solid rgba(0,255,249,0.3)",
            background: "rgba(0,255,249,0.05)",
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "0.7rem",
            letterSpacing: "0.2em",
            color: "var(--color-primary)",
          }}
        >
          <span
            style={{
              width: "6px",
              height: "6px",
              background: "var(--color-primary)",
              borderRadius: "50%",
              boxShadow: "0 0 8px var(--color-primary)",
              animation: "pulse 2s infinite",
            }}
          />
          AVAILABLE FOR HIRE
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{
            fontFamily: "'Michroma', monospace",
            fontSize: "clamp(2.5rem, 8vw, 5.5rem)",
            fontWeight: 900,
            lineHeight: 1.1,
            marginBottom: "1rem",
            color: "var(--color-primary)",
            textShadow: "0 0 40px rgba(0,255,249,0.2)",
          }}
        >
          CYBER
          <span
            style={{
              display: "block",
              color: "var(--color-primary)",
              textShadow: "0 0 40px rgba(0,255,249,0.5)",
            }}
          >
            BLOGS
          </span>
        </motion.h1>

        {/* Typewriter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "clamp(1rem, 3vw, 1.3rem)",
            color: "rgba(224,224,255,0.6)",
            marginBottom: "2.5rem",
            minHeight: "2rem",
          }}
        >
          <span style={{ color: "var(--color-secondary)" }}>&gt; </span>
          {typed}
          <span
            style={{
              animation: "blink 1s infinite",
              color: "var(--color-primary)",
            }}
          >
            _
          </span>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <a
            href="#projects"
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: "0.75rem",
              letterSpacing: "0.15em",
              padding: "0.8rem 2rem",
              background: "var(--color-primary)",
              color: "#050508",
              textDecoration: "none",
              clipPath:
                "polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)",
              fontWeight: 700,
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.target.style.background = "var(--color-secondary)")
            }
            onMouseLeave={(e) =>
              (e.target.style.background = "var(--color-primary)")
            }
          >
            VIEW PROJECTS
          </a>
          <a
            href="#contact"
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: "0.75rem",
              letterSpacing: "0.15em",
              padding: "0.8rem 2rem",
              background: "transparent",
              color: "var(--color-primary)",
              textDecoration: "none",
              border: "1px solid rgba(0,255,249,0.4)",
              clipPath:
                "polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "rgba(0,255,249,0.1)";
              e.target.style.borderColor = "var(--color-primary)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "transparent";
              e.target.style.borderColor = "rgba(0,255,249,0.4)";
            }}
          >
            CONTACT ME
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          style={{
            marginTop: "4rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <span
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: "0.6rem",
              letterSpacing: "0.3em",
              color: "rgba(224,224,255,0.3)",
            }}
          >
            SCROLL
          </span>
          <div
            style={{
              width: "1px",
              height: "50px",
              background:
                "linear-gradient(to bottom, var(--color-primary), transparent)",
            }}
          />
        </motion.div>
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
      `}</style>
    </section>
  );
};

export default Hero;
