import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Briefcase, Code2, GraduationCap } from "lucide-react";

const stats = [
  { value: "2.5+", label: "Years Experience" },
  { value: "35%", label: "Load Time Reduced" },
  { value: "40%", label: "DB Query Boost" },
  { value: "5K+", label: "Concurrent Users" },
];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" ref={ref} className="py-24 bg-[#0d1424] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="flex items-center gap-4 mb-16"
        >
          <span className="text-cyan-400 font-mono text-sm">01.</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">About Me</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-cyan-500/30 to-transparent max-w-xs" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="space-y-5 text-slate-400 text-base leading-relaxed"
          >
            <p>
              Hey, I'm{" "}
              <span className="text-cyan-400 font-medium">Daniel Jayasurya</span> — a
              results-driven{" "}
              <span className="text-white font-medium">Full Stack Engineer (MERN)</span>{" "}
              based in <span className="text-white font-medium">Coimbatore, Tamil Nadu</span>.
              I specialize in crafting dynamic, responsive frontends and robust backends
              that solve real business problems — not just ship features.
            </p>
            <p>
              Currently working at{" "}
              <span className="text-cyan-400 font-medium">Praathee Technologies Pvt Ltd</span>,
              I build enterprise-grade scalable web applications using React.js, Node.js,
              PostgreSQL, and Docker. I've reduced app load time by{" "}
              <span className="text-cyan-400 font-medium">35%</span> and improved DB
              query performance by{" "}
              <span className="text-cyan-400 font-medium">40%</span> in production.
            </p>
            <p>
              I'm passionate about building{" "}
              <span className="text-cyan-400 font-medium">SaaS & AI-assisted web apps</span>,
              turning complex systems into scalable products, and sharing knowledge with
              the developer community. Open to{" "}
              <span className="text-cyan-400 font-medium">
                freelance and contract opportunities
              </span>
              .
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <span className="flex items-center gap-2 text-sm px-3 py-2 rounded-lg bg-slate-800/60 border border-slate-700/50">
                <MapPin size={14} className="text-cyan-400" />
                Coimbatore, Tamil Nadu
              </span>
              <span className="flex items-center gap-2 text-sm px-3 py-2 rounded-lg bg-slate-800/60 border border-slate-700/50">
                <Briefcase size={14} className="text-cyan-400" />
                Open to Freelance
              </span>
              <span className="flex items-center gap-2 text-sm px-3 py-2 rounded-lg bg-slate-800/60 border border-slate-700/50">
                <GraduationCap size={14} className="text-cyan-400" />
                B.E ECE — CGPA 8.50
              </span>
              <span className="flex items-center gap-2 text-sm px-3 py-2 rounded-lg bg-slate-800/60 border border-slate-700/50">
                <Code2 size={14} className="text-cyan-400" />
                MERN · PostgreSQL · Docker
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="relative p-6 rounded-2xl bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-slate-700/50 hover:border-cyan-500/30 group transition-all duration-300 hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <p className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-slate-400">{stat.label}</p>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.9 }}
              className="col-span-2 p-5 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-cyan-500/20 flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shrink-0 text-white font-bold text-lg">
                DJ
              </div>
              <div>
                <p className="text-white font-semibold">Daniel Jayasurya E</p>
                <p className="text-cyan-400 text-sm">
                  Full Stack Engineer @ Praathee Technologies
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
