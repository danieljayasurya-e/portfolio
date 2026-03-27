import { useVisitorLocation } from "../hooks/useVisitorLocation";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { lazy, Suspense, useRef, useEffect, useState, useCallback } from "react";

const ParticleField = lazy(() => import("./ParticleField"));

const morphWords = [
  "scalable web apps.",
  "enterprise platforms.",
  "AI-powered experiences.",
  "production systems.",
  "beautiful interfaces.",
];

const MorphingText = ({ words, delay = 0 }: { words: string[]; delay?: number }) => {
  const [index, setIndex] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [started, words.length]);

  if (!started) return <span className="opacity-0">loading</span>;

  return (
    <span className="inline-block relative">
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ y: 30, opacity: 0, filter: "blur(8px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: -30, opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          className="inline-block hero-gradient-text"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

const StaggerReveal = ({ text, delay = 0, className = "" }: { text: string; delay?: number; className?: string }) => {
  return (
    <motion.span className={`inline-flex overflow-hidden ${className}`}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          transition={{
            delay: delay + i * 0.04,
            duration: 0.5,
            ease: [0.23, 1, 0.32, 1],
          }}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
};

const MagneticLink = ({ children, href, label, className }: { children: React.ReactNode; href: string; label: string; className: string }) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
    setPosition({ x, y });
  }, []);

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      onMouseMove={handleMouse}
      onMouseLeave={() => setPosition({ x: 0, y: 0 })}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 200, damping: 15, mass: 0.5 }}
      whileTap={{ scale: 0.95 }}
      className={className}
    >
      {children}
    </motion.a>
  );
};

const HeroSection = () => {
  const location = useVisitorLocation();
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.7], [1, 0.95]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050510]">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.02)_1px,transparent_1px)] bg-[size:80px_80px]" />

      <Suspense fallback={null}>
        <ParticleField />
      </Suspense>

      <motion.div
        animate={{ x: mousePos.x * 0.5, y: mousePos.y * 0.5 }}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
        className="absolute top-1/4 -left-40 w-[600px] h-[600px] bg-[#00f0ff]/[0.06] rounded-full blur-[150px]"
      />
      <motion.div
        animate={{ x: mousePos.x * -0.3, y: mousePos.y * -0.3 }}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
        className="absolute bottom-1/4 -right-40 w-[600px] h-[600px] bg-[#a855f7]/[0.06] rounded-full blur-[150px]"
      />
      <motion.div
        animate={{ x: mousePos.x * 0.2, y: mousePos.y * 0.2 }}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-[#3b82f6]/[0.02] rounded-full blur-[180px]"
      />

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050510] to-transparent z-[5]" />

      <motion.div style={{ y, opacity, scale }} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 text-center lg:text-left">

            {location && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00f0ff]/[0.05] border border-[#00f0ff]/20 text-xs text-[#00f0ff] mb-8 backdrop-blur-xl"
              >
                <span className="text-base">{location.flag}</span>
                <span className="font-body">
                  {location.greeting} from{" "}
                  {location.city ? `${location.city}, ` : ""}
                  {location.country}!
                </span>
              </motion.div>
            )}

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-[#00f0ff] text-sm font-mono mb-6 tracking-[0.4em] uppercase"
            >
              Hi, my name is
            </motion.p>

            <div className="mb-4">
              <h1 className="text-5xl sm:text-7xl lg:text-[5.5rem] font-extrabold text-white leading-[1.05] tracking-tight font-heading">
                <StaggerReveal text="Daniel" delay={0.3} />
                <span className="inline-block w-4" />
                <span className="glitch-text hero-gradient-text" data-text="Jayasurya">
                  <StaggerReveal text="Jayasurya" delay={0.6} className="hero-gradient-text" />
                </span>
              </h1>
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              className="text-xl sm:text-2xl lg:text-3xl font-semibold text-slate-400 mb-8 font-heading"
            >
              Full Stack Engineer building{" "}
              <MorphingText words={morphWords} delay={1200} />
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="text-slate-400/80 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed font-body"
            >
              Results-driven MERN Stack Developer with{" "}
              <span className="text-[#00f0ff] font-semibold">2.5+ years</span> of
              experience designing scalable, high-performance web applications.
              Reduced app load time by{" "}
              <span className="text-[#00f0ff] font-semibold">35%</span> and DB
              query time by{" "}
              <span className="text-[#00f0ff] font-semibold">40%</span> in
              production systems.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
              className="flex flex-wrap gap-2 justify-center lg:justify-start mb-10"
            >
              {["React.js", "Node.js", "PostgreSQL", "TypeScript", "Docker"].map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 1.4 + i * 0.08 }}
                  whileHover={{
                    scale: 1.1,
                    borderColor: "rgba(0,240,255,0.5)",
                    boxShadow: "0 0 20px rgba(0,240,255,0.15)",
                  }}
                  className="px-4 py-1.5 text-xs font-mono text-[#00f0ff]/80 bg-[#00f0ff]/[0.05] border border-[#00f0ff]/15 rounded-full backdrop-blur-sm cursor-default transition-all duration-300"
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
            >
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(0,240,255,0.25), 0 0 80px rgba(0,240,255,0.1)" }}
                whileTap={{ scale: 0.98 }}
                className="group relative px-8 py-4 bg-gradient-to-r from-[#00f0ff] to-[#3b82f6] text-[#050510] font-bold rounded-2xl shadow-lg shadow-[#00f0ff]/20 transition-all duration-300 overflow-hidden font-heading tracking-wide"
              >
                <span className="relative z-10">Get In Touch</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#33f4ff] to-[#60a5fa] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.a>
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05, borderColor: "rgba(0,240,255,0.5)" }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 text-[#00f0ff] border border-[#00f0ff]/30 rounded-2xl hover:bg-[#00f0ff]/[0.05] transition-all duration-300 backdrop-blur-sm font-heading font-bold tracking-wide"
              >
                View My Work
              </motion.a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.0 }}
            className="flex lg:flex-col gap-4"
          >
            {[
              { icon: Github, href: "https://github.com/danieljayasurya", label: "GitHub" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/daniel-jayasurya-e-a0a25b1ba", label: "LinkedIn" },
              { icon: Mail, href: "mailto:danieljayasuryae@gmail.com", label: "Email" },
            ].map(({ icon: Icon, href, label }) => (
              <MagneticLink
                key={label}
                href={href}
                label={label}
                className="p-3.5 text-slate-400 hover:text-[#00f0ff] border border-slate-700/30 hover:border-[#00f0ff]/40 rounded-2xl hover:bg-[#00f0ff]/[0.05] transition-all duration-300 backdrop-blur-sm hover:shadow-lg hover:shadow-[#00f0ff]/10"
              >
                <Icon size={20} />
              </MagneticLink>
            ))}
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 2, duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-slate-500 z-10"
      >
        <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-[#00f0ff]/40">Scroll</span>
        <div className="w-5 h-8 border border-[#00f0ff]/20 rounded-full flex justify-center pt-1.5">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-1 bg-[#00f0ff]/60 rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
