import { useVisitorLocation } from "../hooks/useVisitorLocation";
import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";

const HeroSection = () => {
  const location = useVisitorLocation();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0f1e]">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left">

            {location && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-xs text-cyan-300 mb-4"
              >
                <span>{location.flag}</span>
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
              className="text-cyan-400 text-sm font-mono mb-4 tracking-widest"
            >
              👋 Hi, my name is
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-3 leading-tight"
            >
              Daniel{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
                Jayasurya
              </span>
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-2xl sm:text-3xl font-semibold text-slate-400 mb-6"
            >
              Full Stack Engineer building{" "}
              <span className="text-cyan-400">scalable web apps.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-slate-400 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed"
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

            {/* Tech badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-2 justify-center lg:justify-start mb-8"
            >
              {["React.js", "Node.js", "PostgreSQL", "TypeScript", "Docker"].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-xs font-mono text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 rounded-full"
                >
                  {tech}
                </span>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
            >
              <a
                href="#contact"
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 hover:-translate-y-0.5 transition-all duration-200"
              >
                Get In Touch
              </a>
              <a
                href="#projects"
                className="px-6 py-3 text-cyan-400 border border-cyan-400/50 rounded-xl hover:bg-cyan-400/10 hover:-translate-y-0.5 transition-all duration-200"
              >
                View My Work
              </a>
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
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="p-3 text-slate-400 hover:text-cyan-400 border border-slate-700/50 hover:border-cyan-400/50 rounded-xl hover:bg-cyan-400/5 transition-all duration-200"
              >
                <Icon size={20} />
              </a>
            ))}
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ delay: 1.2, duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500"
      >
        <span className="text-xs font-mono tracking-widest">SCROLL</span>
        <ArrowDown size={16} />
      </motion.div>
    </section>
  );
};


export default HeroSection;
