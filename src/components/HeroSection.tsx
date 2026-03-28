import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import { useRef, useState, useCallback } from "react";

const StaggerReveal = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  return (
    <span className="inline-flex overflow-hidden">
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          transition={{
            delay: delay + i * 0.04,
            duration: 0.6,
            ease: [0.23, 1, 0.32, 1],
          }}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
};

const MagneticLink = ({ children, href, label }: { children: React.ReactNode; href: string; label: string }) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.2;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.2;
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
      className="p-4 text-accent border border-accent/30 hover:border-accent/70 hover:bg-accent/5 transition-all duration-300"
    >
      {children}
    </motion.a>
  );
};

const HeroSection = () => {
  const sectionRef = useRef(null);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-editorial-dark py-24">
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid-subtle opacity-5" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-accent text-sm tracking-widest uppercase mb-8"
        >
          Full Stack Engineer
        </motion.p>

        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl font-display font-bold text-editorial-text leading-none tracking-tighter">
            <StaggerReveal text="Daniel" delay={0.3} />
            <br />
            <StaggerReveal text="Jayasurya" delay={0.6} />
          </h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="text-lg md:text-xl text-editorial-text-muted max-w-3xl mx-auto mb-12 leading-relaxed"
        >
          Crafting production-grade web applications with React, Node.js, and PostgreSQL.
          2.5+ years building scalable systems that reduce load times by 35%.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="flex flex-wrap gap-3 justify-center mb-16"
        >
          {["React", "Node.js", "PostgreSQL", "TypeScript", "Docker"].map((tech, i) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5 + i * 0.08 }}
              className="px-4 py-2 text-sm font-body text-accent border border-accent/30 bg-accent/5"
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
          className="flex flex-wrap gap-4 justify-center mb-20"
        >
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05, backgroundColor: "var(--editor-accent)", color: "var(--editor-bg)" }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-3 text-lg font-display text-accent border border-accent hover:text-editorial-dark transition-all"
          >
            Get In Touch
          </motion.a>
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.05, borderColor: "var(--editor-accent)" }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-3 text-lg font-display text-accent border border-accent/30 hover:border-accent hover:bg-accent/5 transition-all"
          >
            View Work
          </motion.a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.7 }}
          className="flex gap-6 justify-center"
        >
          {[
            { icon: Github, href: "https://github.com/danieljayasurya", label: "GitHub" },
            { icon: Linkedin, href: "https://www.linkedin.com/in/daniel-jayasurya-e-a0a25b1ba", label: "LinkedIn" },
            { icon: Mail, href: "mailto:danieljayasuryae@gmail.com", label: "Email" },
          ].map(({ icon: Icon, href, label }) => (
            <MagneticLink key={label} href={href} label={label}>
              <Icon size={24} />
            </MagneticLink>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 2, duration: 2.5, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-accent/60 z-10"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-5 h-8 border border-accent/30 flex items-center justify-center">
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-1 bg-accent"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
