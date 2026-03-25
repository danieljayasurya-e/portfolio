import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";

const skillCategories = [
  {
    title: "Frontend",
    icon: "01",
    color: "from-cyan-500/20 to-blue-500/10",
    border: "border-cyan-500/20",
    accent: "cyan",
    skills: [
      { name: "React.js", level: 95 },
      { name: "TypeScript", level: 85 },
      { name: "JavaScript (ES6+)", level: 95 },
      { name: "Redux / Redux-Saga", level: 88 },
      { name: "TanStack Query", level: 85 },
      { name: "Tailwind CSS", level: 90 },
      { name: "Material-UI", level: 82 },
      { name: "Bootstrap", level: 85 },
    ],
  },
  {
    title: "Backend",
    icon: "02",
    color: "from-emerald-500/20 to-teal-500/10",
    border: "border-emerald-500/20",
    accent: "emerald",
    skills: [
      { name: "Node.js", level: 90 },
      { name: "Express.js", level: 92 },
      { name: "RESTful APIs", level: 93 },
      { name: "Keycloak SSO", level: 80 },
      { name: "Socket.io", level: 82 },
      { name: "JWT Auth", level: 88 },
    ],
  },
  {
    title: "Database",
    icon: "03",
    color: "from-purple-500/20 to-violet-500/10",
    border: "border-purple-500/20",
    accent: "purple",
    skills: [
      { name: "PostgreSQL", level: 88 },
      { name: "MongoDB", level: 85 },
      { name: "MySQL", level: 80 },
      { name: "Redis Caching", level: 75 },
      { name: "ORM (Sequelize)", level: 83 },
      { name: "Stored Procedures", level: 82 },
    ],
  },
  {
    title: "DevOps & Tools",
    icon: "04",
    color: "from-orange-500/20 to-amber-500/10",
    border: "border-orange-500/20",
    accent: "orange",
    skills: [
      { name: "Docker", level: 80 },
      { name: "Google Cloud (GCP)", level: 72 },
      { name: "Git / Bitbucket", level: 90 },
      { name: "CI/CD Pipelines", level: 75 },
      { name: "JIRA", level: 85 },
      { name: "Postman", level: 90 },
    ],
  },
];

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState(0);
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section id="skills" ref={sectionRef} className="py-28 bg-[#0a0f1e] relative overflow-hidden">
      <motion.div style={{ y: bgY }} className="absolute bottom-0 left-0 w-72 h-72 bg-blue-500/5 rounded-full blur-[100px]" />
      <motion.div style={{ y: bgY }} className="absolute top-1/3 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-[80px]" />

      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="flex items-center gap-4 mb-16"
        >
          <span className="text-cyan-400 font-mono text-sm">02.</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Skills & Expertise</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-cyan-500/30 to-transparent max-w-xs" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-3 mb-10"
        >
          {skillCategories.map((cat, i) => (
            <motion.button
              key={cat.title}
              onClick={() => setActiveCategory(i)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 border backdrop-blur-sm ${
                activeCategory === i
                  ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-300 shadow-lg shadow-cyan-500/10"
                  : "bg-slate-800/40 border-slate-700/50 text-slate-400 hover:border-slate-600"
              }`}
            >
              <span className="text-xs font-mono opacity-60">{cat.icon}</span>
              {cat.title}
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className={`p-8 rounded-2xl bg-gradient-to-br ${skillCategories[activeCategory].color} border ${skillCategories[activeCategory].border} backdrop-blur-sm`}
        >
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {skillCategories[activeCategory].skills.map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ scale: 1.03, y: -2 }}
                className="bg-slate-900/60 backdrop-blur-md rounded-xl p-4 border border-slate-700/30 hover:border-cyan-400/20 transition-all duration-300 group"
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="text-white text-sm font-medium group-hover:text-cyan-300 transition-colors">{skill.name}</span>
                  <span className="text-cyan-400 text-xs font-mono">{skill.level}%</span>
                </div>
                <div className="h-1.5 bg-slate-700/60 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ delay: 0.2 + i * 0.05, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full relative"
                  >
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-lg shadow-cyan-400/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="flex flex-wrap gap-2 mt-8"
        >
          {skillCategories.flatMap((cat) =>
            cat.skills.map((s) => (
              <motion.span
                key={s.name}
                whileHover={{ scale: 1.1, borderColor: "rgba(34,211,238,0.3)", color: "rgb(34,211,238)" }}
                className="px-3 py-1 text-xs text-slate-400 bg-slate-800/50 border border-slate-700/40 rounded-full transition-all duration-200 cursor-default"
              >
                {s.name}
              </motion.span>
            ))
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
