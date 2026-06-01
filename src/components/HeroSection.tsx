import { useVisitorLocation } from "../hooks/useVisitorLocation";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import { useRef, useEffect, useState, useCallback } from "react";

const morphWords = [
  "SCALABLE WEB APPS",
  "ENTERPRISE PLATFORMS",
  "AI-POWERED TOOLS",
  "PRODUCTION SYSTEMS",
];

const morphColors = ["bg-lime", "bg-cyan", "bg-pink", "bg-violet"];

const marqueeItems = [
  "REACT", "NODE.JS", "POSTGRESQL", "TYPESCRIPT", "NEXT.JS", "DOCKER",
  "EXPRESS", "MONGODB", "REDIS", "TAILWIND", "GENAI", "AWS",
];

const MorphingText = ({ delay = 0 }: { delay?: number }) => {
  const [index, setIndex] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % morphWords.length);
    }, 2600);
    return () => clearInterval(interval);
  }, [started]);

  if (!started) return <span className="opacity-0">loading</span>;

  return (
    <span className="inline-block relative align-bottom">
      <AnimatePresence mode="wait">
        <motion.span
          key={morphWords[index]}
          initial={{ y: 14, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -14, opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
          className={`inline-block ${morphColors[index]} text-ink border-[3px] border-ink px-2 -rotate-1 shadow-brutal`}
        >
          {morphWords[index]}
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
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-24 pb-0"
    >
      {/* line grid backdrop */}
      <div className="absolute inset-0 bg-line-grid bg-[size:80px_80px] opacity-60 pointer-events-none" />
      {/* offset color blocks — structural, not blurred */}
      <div className="absolute top-28 right-[8%] w-32 h-32 bg-pink border-[3px] border-ink rotate-12 hidden lg:block pointer-events-none" />
      <div className="absolute bottom-40 left-[5%] w-20 h-20 bg-cyan border-[3px] border-ink -rotate-6 hidden lg:block pointer-events-none" />

      <motion.div
        style={{ y }}
        className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 w-full"
      >
        <div className="grid lg:grid-cols-[1.3fr_1fr] items-center gap-12">
          {/* LEFT */}
          <div>
            {location && (
              <motion.div
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="section-eyebrow mb-6"
              >
                <span>{location.flag}</span>
                <span>
                  {location.greeting} · {location.city ? `${location.city}, ` : ""}
                  {location.country}
                </span>
                <span className="w-2 h-2 bg-lime border border-paper inline-block" />
              </motion.div>
            )}

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="font-heading font-extrabold text-ink uppercase leading-[0.92] tracking-tighter text-[3.25rem] sm:text-7xl lg:text-[5.5rem] mb-6"
            >
              <span className="block">Daniel</span>
              <span className="block">
                Jaya<span className="bg-violet text-ink px-2 inline-block -rotate-1 border-[3px] border-ink shadow-brutal">surya</span>
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="text-xl sm:text-2xl lg:text-[1.7rem] font-heading font-bold text-ink mb-7 leading-tight"
            >
              <span className="block mb-3">Full-Stack Engineer building</span>
              <MorphingText delay={700} />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="font-mono text-ink-muted text-sm sm:text-base max-w-xl mb-8 leading-relaxed"
            >
              MERN-stack developer · <span className="bg-lime text-ink px-1 font-bold">2.5+ YRS</span> shipping
              high-performance apps. Cut load time <span className="bg-cyan text-ink px-1 font-bold">35%</span> and
              DB query time <span className="bg-pink text-ink px-1 font-bold">40%</span> in production.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="flex flex-wrap gap-3 mb-9"
            >
              <a href="#contact" className="btn-primary group">
                Get In Touch
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </a>
              <a href="#projects" className="btn-secondary">
                View My Work
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex items-center gap-3"
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
                  className="p-3 bg-paper border-[3px] border-ink text-ink shadow-brutal-sm hover:bg-lime hover:shadow-brutal transition-[background,box-shadow]"
                >
                  <Icon size={18} />
                </MagneticLink>
              ))}
            </motion.div>
          </div>

          {/* RIGHT — terminal + stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="relative"
          >
            <div className="bg-ink border-[3px] border-ink shadow-brutal-lg">
              <div className="flex items-center justify-between px-4 py-2.5 border-b-[3px] border-paper/20">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-pink border-2 border-paper/40" />
                  <span className="w-3 h-3 bg-yellow border-2 border-paper/40" />
                  <span className="w-3 h-3 bg-lime border-2 border-paper/40" />
                </div>
                <span className="text-[11px] font-mono text-paper/70 uppercase tracking-widest">engineer.ts</span>
              </div>
              <div className="font-mono text-[12.5px] leading-relaxed p-5 text-paper">
                <div><span className="text-violet">const</span> <span className="text-cyan">engineer</span> = {`{`}</div>
                <div className="pl-4">name: <span className="text-lime">&quot;Daniel Jayasurya&quot;</span>,</div>
                <div className="pl-4">role: <span className="text-lime">&quot;Full Stack / MERN&quot;</span>,</div>
                <div className="pl-4">stack: [<span className="text-lime">&quot;React&quot;</span>, <span className="text-lime">&quot;Node&quot;</span>, <span className="text-lime">&quot;PG&quot;</span>],</div>
                <div className="pl-4">years: <span className="text-pink">2.5</span>,</div>
                <div className="pl-4">hiring: <span className="text-pink">true</span>,</div>
                <div>{`}`}<span className="inline-block w-2 h-4 bg-lime ml-1 align-middle animate-blink" /></div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mt-3">
              {[
                { label: "LOAD TIME", value: "-35%", c: "bg-lime" },
                { label: "DB QUERY", value: "+40%", c: "bg-cyan" },
                { label: "USERS", value: "5K+", c: "bg-pink" },
              ].map((s) => (
                <motion.div
                  key={s.label}
                  whileHover={{ x: -2, y: -2 }}
                  className={`${s.c} border-[3px] border-ink shadow-brutal-sm p-3 text-center transition-shadow hover:shadow-brutal`}
                >
                  <div className="text-2xl font-heading font-extrabold text-ink">{s.value}</div>
                  <div className="text-[10px] font-mono font-bold text-ink/80 mt-0.5 tracking-wider">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* MARQUEE STRIP */}
      <div className="relative z-10 mt-14 border-y-[3px] border-ink bg-ink overflow-hidden">
        <div className="marquee-track py-3">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="font-mono font-bold uppercase text-paper text-sm tracking-widest px-6 flex items-center gap-6">
              {item}
              <span className="w-2 h-2 bg-lime inline-block rotate-45" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
