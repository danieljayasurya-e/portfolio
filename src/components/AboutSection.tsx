import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Briefcase, Code2 } from "lucide-react";

const stats = [
  { value: "2.5+", label: "Years Experience" },
  { value: "35%", label: "Load Time Reduced" },
  { value: "40%", label: "DB Query Boost" },
  { value: "5K+", label: "Concurrent Users" },
];

const CountUp = ({ target }: { target: string; suffix?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
    >
      {isInView ? (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {target}
        </motion.span>
      ) : "0"}
    </motion.span>
  );
};

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-28 relative overflow-hidden">
      {/* subtle background accents */}
      <div className="absolute top-10 right-0 w-[480px] h-[480px] bg-brand-200/25 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[380px] h-[380px] bg-brand-300/20 rounded-full blur-[100px] pointer-events-none" />

      <div ref={ref} className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="flex flex-col items-start gap-3 mb-14"
        >
          <span className="section-eyebrow">01 — About</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-ink tracking-tight font-heading">
            Crafting robust products,<br className="hidden sm:block" />
            <span className="hero-gradient-text">one scalable system at a time.</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="space-y-5 text-ink-muted text-base leading-relaxed"
          >
            <p>
              Hey, I'm{" "}
              <span className="text-brand-600 font-semibold">Daniel Jayasurya</span> — a
              results-driven{" "}
              <span className="text-ink font-semibold">Full Stack Engineer (MERN)</span>{" "}
              based in <span className="text-ink font-semibold">Coimbatore, Tamil Nadu</span>.
              I specialize in crafting dynamic, responsive frontends and robust backends
              that solve real business problems — not just ship features.
            </p>
            <p>
              Currently working at{" "}
              <span className="text-brand-600 font-semibold">Praathee Technologies Pvt Ltd</span>,
              I build enterprise-grade scalable web applications using React.js, Node.js,
              PostgreSQL, and Docker. I've reduced app load time by{" "}
              <span className="text-brand-600 font-semibold">35%</span> and improved DB
              query performance by{" "}
              <span className="text-brand-600 font-semibold">40%</span> in production.
            </p>
            <p>
              I'm passionate about building{" "}
              <span className="text-brand-600 font-semibold">SaaS & AI-assisted web apps</span>,
              turning complex systems into scalable products, and sharing knowledge with
              the developer community. Open to{" "}
              <span className="text-brand-600 font-semibold">
                freelance and contract opportunities
              </span>
              .
            </p>

            <div className="flex flex-wrap gap-2 pt-3">
              {[
                { icon: MapPin, text: "Coimbatore, Tamil Nadu" },
                { icon: Briefcase, text: "Open to Freelance" },
                { icon: Code2, text: "React · Node · Postgres · Next.js" },
              ].map(({ icon: Icon, text }) => (
                <motion.span
                  key={text}
                  whileHover={{ y: -2 }}
                  className="inline-flex items-center gap-2 text-sm px-3.5 py-2 rounded-full bg-white border border-brand-100 shadow-soft text-ink-muted hover:border-brand-300 hover:shadow-card transition-all cursor-default"
                >
                  <Icon size={14} className="text-brand-500" />
                  {text}
                </motion.span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 24, scale: 0.96 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ delay: 0.35 + i * 0.08 }}
                whileHover={{ y: -4 }}
                className="card-surface p-6 group"
              >
                <p className="text-4xl font-bold text-gradient font-heading mb-1">
                  <CountUp target={stat.value} />
                </p>
                <p className="text-sm text-ink-soft">{stat.label}</p>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.75 }}
              whileHover={{ y: -3 }}
              className="col-span-2 p-5 rounded-[18px] bg-brand-gradient flex items-center gap-4 shadow-glow relative overflow-hidden"
            >
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_80%_20%,#fff,transparent_60%)] pointer-events-none" />
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0 text-white font-bold text-lg ring-1 ring-white/30 relative z-10">
                DJ
              </div>
              <div className="relative z-10">
                <p className="text-white font-semibold">Daniel Jayasurya E</p>
                <p className="text-white/85 text-sm">
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
