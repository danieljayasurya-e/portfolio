import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Briefcase, Code2, Linkedin } from "lucide-react";

const stats = [
  { value: "2.5+", label: "YEARS EXPERIENCE", c: "bg-lime" },
  { value: "35%", label: "LOAD TIME CUT", c: "bg-cyan" },
  { value: "40%", label: "DB QUERY BOOST", c: "bg-pink" },
  { value: "5K+", label: "CONCURRENT USERS", c: "bg-yellow" },
];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div ref={ref} className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="flex flex-col items-start gap-4 mb-12"
        >
          <span className="section-eyebrow">01 / ABOUT</span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-ink uppercase tracking-tighter leading-[0.95] font-heading">
            Crafting robust products,
            <br className="hidden sm:block" />{" "}
            <span className="bg-lime text-ink px-2 inline-block -rotate-1 border-[3px] border-ink shadow-brutal mt-2">
              one scalable system at a time.
            </span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="brutal-card p-7 lg:p-8 space-y-5 font-mono text-ink-muted text-sm sm:text-[15px] leading-relaxed"
          >
            <p>
              Hey, I'm <span className="bg-violet text-ink px-1 font-bold">Daniel Jayasurya</span> — a
              results-driven <span className="text-ink font-bold">Full Stack Engineer (MERN)</span> based
              in <span className="text-ink font-bold">Coimbatore, Tamil Nadu</span>. I build dynamic
              frontends and robust backends that solve real business problems — not just ship features.
            </p>
            <p>
              Currently at <span className="bg-cyan text-ink px-1 font-bold">Praathee Technologies</span>,
              I build enterprise-grade scalable apps with React, Node, PostgreSQL & Docker. I've cut app
              load time by <span className="text-ink font-bold">35%</span> and improved DB query
              performance by <span className="text-ink font-bold">40%</span> in production.
            </p>
            <p>
              From an <span className="text-ink font-bold">ECE background</span> to full-time engineering
              to freelancing — I'm passionate about <span className="bg-pink text-ink px-1 font-bold">SaaS & AI-assisted apps</span> and
              actively share what I build with the dev community on LinkedIn.
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {[
                { icon: MapPin, text: "Coimbatore, TN" },
                { icon: Briefcase, text: "Open to Freelance" },
                { icon: Code2, text: "React · Node · Postgres" },
                { icon: Linkedin, text: "Content Creator" },
              ].map(({ icon: Icon, text }) => (
                <span
                  key={text}
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase px-3 py-2 border-[3px] border-ink bg-paper text-ink"
                >
                  <Icon size={13} />
                  {text}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.08 }}
                whileHover={{ x: -3, y: -3 }}
                className={`${stat.c} border-[3px] border-ink shadow-brutal p-6 transition-shadow hover:shadow-brutal-lg`}
              >
                <p className="text-4xl sm:text-5xl font-extrabold text-ink font-heading">{stat.value}</p>
                <p className="text-xs font-mono font-bold text-ink/80 mt-1 tracking-wider">{stat.label}</p>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7 }}
              whileHover={{ x: -3, y: -3 }}
              className="col-span-2 p-5 bg-ink border-[3px] border-ink shadow-brutal flex items-center gap-4 transition-shadow hover:shadow-brutal-lg"
            >
              <div className="w-12 h-12 bg-lime border-[3px] border-paper grid place-items-center shrink-0 text-ink font-extrabold text-lg font-heading">
                DJ
              </div>
              <div>
                <p className="text-paper font-bold uppercase tracking-tight">Daniel Jayasurya E</p>
                <p className="text-paper/70 text-sm font-mono">Full Stack Engineer @ Praathee Technologies</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
