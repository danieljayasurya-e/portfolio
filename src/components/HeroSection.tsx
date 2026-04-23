import { useVisitorLocation } from "../hooks/useVisitorLocation";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight, Github, Linkedin, Mail, Sparkles } from "lucide-react";
import { useRef, useEffect, useState, useCallback } from "react";

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
          initial={{ y: 18, opacity: 0, filter: "blur(6px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: -18, opacity: 0, filter: "blur(6px)" }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          className="inline-block hero-gradient-text"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

const MagneticLink = ({
  children,
  href,
  label,
  className,
}: {
  children: React.ReactNode;
  href: string;
  label: string;
  className: string;
}) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.25;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.25;
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
  const y = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16"
    >
      {/* Soft grid & blurred blobs */}
      <div className="absolute inset-0 bg-grid-pattern bg-[size:64px_64px] opacity-40 pointer-events-none" />

      <div className="absolute top-1/4 -left-32 w-[520px] h-[520px] rounded-full bg-brand-300/30 blur-[140px] pointer-events-none animate-float-slow" />
      <div className="absolute bottom-1/4 -right-32 w-[520px] h-[520px] rounded-full bg-brand-400/25 blur-[140px] pointer-events-none animate-float-slow" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-brand-200/20 blur-[160px] pointer-events-none" />

      {/* soft bottom fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-10"
      >
        <div className="flex flex-col lg:flex-row items-center gap-14">
          <div className="flex-1 text-center lg:text-left">
            {location && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                className="section-eyebrow mb-6"
              >
                <span className="text-sm">{location.flag}</span>
                <span>
                  {location.greeting} from{" "}
                  {location.city ? `${location.city}, ` : ""}
                  {location.country}
                </span>
              </motion.div>
            )}

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-ink leading-[1.05] tracking-tight font-heading mb-5"
            >
              Daniel{" "}
              <span className="hero-gradient-text">Jayasurya</span>
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="text-xl sm:text-2xl lg:text-3xl font-semibold text-ink-muted mb-6 font-heading"
            >
              Full Stack Engineer building{" "}
              <MorphingText words={morphWords} delay={800} />
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="text-ink-muted text-base sm:text-lg max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed"
            >
              Results-driven MERN Stack Developer with{" "}
              <span className="text-brand-600 font-semibold">2.5+ years</span> of
              experience designing scalable, high-performance web applications.
              Reduced load time by{" "}
              <span className="text-brand-600 font-semibold">35%</span> and DB
              query time by{" "}
              <span className="text-brand-600 font-semibold">40%</span> in
              production.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65 }}
              className="flex flex-wrap gap-2 justify-center lg:justify-start mb-9"
            >
              {["React.js", "Node.js", "PostgreSQL", "TypeScript", "Docker"].map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.9, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 0.7 + i * 0.06 }}
                  whileHover={{ y: -2 }}
                  className="pill font-mono text-brand-700 bg-white border border-brand-100 shadow-soft hover:border-brand-300 hover:shadow-card cursor-default"
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap gap-3 justify-center lg:justify-start"
            >
              <motion.a
                href="#contact"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="btn-primary group"
              >
                Get In Touch
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </motion.a>
              <motion.a
                href="#projects"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="btn-secondary"
              >
                View My Work
              </motion.a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="mt-10 flex items-center gap-3 justify-center lg:justify-start"
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
                  className="p-3 rounded-xl bg-white border border-brand-100 text-ink-muted hover:text-brand-600 hover:border-brand-300 hover:shadow-card transition-all"
                >
                  <Icon size={18} />
                </MagneticLink>
              ))}
            </motion.div>
          </div>

          {/* Right-side visual card */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="relative flex-shrink-0 w-full max-w-md"
          >
            <div className="relative">
              {/* gradient halo */}
              <div className="absolute -inset-6 bg-brand-gradient opacity-20 rounded-[36px] blur-2xl" />
              <div className="relative glass-card rounded-[28px] p-6 shadow-float">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  </div>
                  <span className="text-[11px] font-mono text-ink-soft">~/portfolio</span>
                </div>
                <div className="font-mono text-[13px] leading-relaxed bg-surface-soft rounded-2xl p-5 border border-brand-100/60">
                  <div><span className="text-brand-600">const</span> <span className="text-ink">engineer</span> <span className="text-ink-soft">=</span> {`{`}</div>
                  <div className="pl-4"><span className="text-ink">name</span><span className="text-ink-soft">:</span> <span className="text-emerald-600">&quot;Daniel Jayasurya&quot;</span>,</div>
                  <div className="pl-4"><span className="text-ink">role</span><span className="text-ink-soft">:</span> <span className="text-emerald-600">&quot;Full Stack&quot;</span>,</div>
                  <div className="pl-4"><span className="text-ink">stack</span><span className="text-ink-soft">:</span> <span className="text-amber-600">[</span><span className="text-emerald-600">&quot;React&quot;</span>, <span className="text-emerald-600">&quot;Node&quot;</span>, <span className="text-emerald-600">&quot;PG&quot;</span><span className="text-amber-600">]</span>,</div>
                  <div className="pl-4"><span className="text-ink">years</span><span className="text-ink-soft">:</span> <span className="text-brand-600">2.5</span>,</div>
                  <div className="pl-4"><span className="text-ink">hiring</span><span className="text-ink-soft">:</span> <span className="text-brand-600">true</span>,</div>
                  <div>{`}`};</div>
                </div>

                <div className="mt-5 grid grid-cols-3 gap-3">
                  {[
                    { label: "Load time", value: "-35%" },
                    { label: "React performance", value: "+40%" },
                    { label: "Users", value: "5K+" },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className="rounded-xl bg-white border border-brand-100 p-3 text-center"
                    >
                      <div className="text-lg font-bold text-gradient font-heading">{s.value}</div>
                      <div className="text-[11px] text-ink-soft mt-0.5">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ delay: 1.6, duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-ink-soft z-10"
      >
        <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-brand-500">Scroll</span>
        <div className="w-5 h-8 border border-brand-200 rounded-full flex justify-center pt-1.5">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-1 bg-brand-500 rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
