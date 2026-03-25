import { useVisitorLocation } from "../hooks/useVisitorLocation";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { lazy, Suspense, useRef, useEffect, useState } from "react";

const ParticleField = lazy(() => import("./ParticleField"));

const TypeWriter = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    const timeout = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        if (i < text.length) {
          setDisplayed(text.slice(0, i + 1));
          i++;
        } else clearInterval(interval);
      }, 50);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [text, delay]);
  return (
    <span>
      {displayed}
      <span className="animate-pulse text-cyan-400">|</span>
    </span>
  );
};

const HeroSection = () => {
  const location = useVisitorLocation();
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0f1e]">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
      
      <Suspense fallback={null}>
        <ParticleField />
      </Suspense>

      <div className="absolute top-1/4 -left-40 w-[500px] h-[500px] bg-cyan-500/[0.08] rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 -right-40 w-[500px] h-[500px] bg-purple-600/[0.08] rounded-full blur-[120px] animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/[0.03] rounded-full blur-[150px]" />

      <motion.div style={{ y, opacity }} className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left">

            {location && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-400/5 border border-cyan-400/20 text-xs text-cyan-300 mb-6 backdrop-blur-sm"
              >
                <span className="text-base">{location.flag}</span>
                <span>
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
              className="text-cyan-400 text-sm font-mono mb-4 tracking-[0.3em]"
            >
              Hi, my name is
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
              className="text-5xl sm:text-6xl lg:text-8xl font-bold text-white mb-3 leading-[1.1] tracking-tight"
            >
              Daniel{" "}
              <span className="hero-gradient-text">
                Jayasurya
              </span>
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-slate-400 mb-8"
            >
              <TypeWriter text="Full Stack Engineer building scalable web apps." delay={800} />
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-slate-400 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed"
            >
              Results-driven MERN Stack Developer with{" "}
              <span className="text-cyan-400 font-medium">2.5+ years</span> of
              experience designing scalable, high-performance web applications.
              Reduced app load time by{" "}
              <span className="text-cyan-400 font-medium">35%</span> and DB
              query time by{" "}
              <span className="text-cyan-400 font-medium">40%</span> in
              production systems.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-2 justify-center lg:justify-start mb-10"
            >
              {["React.js", "Node.js", "PostgreSQL", "TypeScript", "Docker"].map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + i * 0.08 }}
                  whileHover={{ scale: 1.1, borderColor: "rgba(34,211,238,0.5)" }}
                  className="px-4 py-1.5 text-xs font-mono text-cyan-400 bg-cyan-400/5 border border-cyan-400/20 rounded-full backdrop-blur-sm cursor-default transition-colors"
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
            >
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(6,182,212,0.3)" }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium rounded-xl shadow-lg shadow-cyan-500/20 transition-all duration-300 relative overflow-hidden group"
              >
                <span className="relative z-10">Get In Touch</span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.a>
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3.5 text-cyan-400 border border-cyan-400/50 rounded-xl hover:bg-cyan-400/10 transition-all duration-300 backdrop-blur-sm"
              >
                View My Work
              </motion.a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="flex lg:flex-col gap-4"
          >
            {[
              { icon: Github, href: "https://github.com/danieljayasurya", label: "GitHub" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/daniel-jayasurya-e-a0a25b1ba", label: "LinkedIn" },
              { icon: Mail, href: "mailto:danieljayasuryae@gmail.com", label: "Email" },
            ].map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 text-slate-400 hover:text-cyan-400 border border-slate-700/50 hover:border-cyan-400/50 rounded-xl hover:bg-cyan-400/5 transition-all duration-300 backdrop-blur-sm hover:shadow-lg hover:shadow-cyan-400/10"
              >
                <Icon size={20} />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ delay: 1.2, duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500"
      >
        <span className="text-xs font-mono tracking-[0.3em]">SCROLL</span>
        <ArrowDown size={16} />
      </motion.div>
    </section>
  );
};

export default HeroSection;
