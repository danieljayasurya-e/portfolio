import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Code, Server, Database, Wrench } from "lucide-react";

const skillCategories = [
  {
    title: "Frontend",
    icon: Code,
    description: "Crafting fast, accessible, pixel-perfect interfaces.",
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
    icon: Server,
    description: "APIs and services that scale to thousands of users.",
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
    icon: Database,
    description: "Designing schemas and queries for performance.",
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
    icon: Wrench,
    description: "Ship reliably with Docker, CI/CD, and cloud.",
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

  const Active = skillCategories[activeCategory];
  const ActiveIcon = Active.icon;

  return (
    <section id="skills" className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-surface-soft via-white to-surface-soft pointer-events-none" />
      <div className="absolute top-0 left-1/3 w-[420px] h-[420px] bg-brand-200/25 rounded-full blur-[120px] pointer-events-none" />

      <div ref={ref} className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="flex flex-col items-start gap-3 mb-14"
        >
          <span className="section-eyebrow">02 — Skills</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-ink tracking-tight font-heading">
            Tools I use to build <span className="hero-gradient-text">exceptional</span> software
          </h2>
          <p className="text-ink-muted text-base max-w-2xl">
            A sharp set of technologies across the stack — selected for correctness, performance, and developer joy.
          </p>
        </motion.div>

        {/* Category cards */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8"
        >
          {skillCategories.map((cat, i) => {
            const Icon = cat.icon;
            const active = activeCategory === i;
            return (
              <motion.button
                key={cat.title}
                onClick={() => setActiveCategory(i)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={`group relative text-left p-4 rounded-2xl border transition-all duration-300 ${
                  active
                    ? "bg-white border-brand-300 shadow-card"
                    : "bg-white/60 border-brand-100 hover:border-brand-200 hover:bg-white"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl grid place-items-center mb-3 transition-all ${
                    active
                      ? "bg-brand-gradient text-white shadow-glow"
                      : "bg-brand-50 text-brand-600"
                  }`}
                >
                  <Icon size={18} />
                </div>
                <div className="text-sm font-semibold text-ink">{cat.title}</div>
                <div className="text-xs text-ink-soft mt-0.5">{cat.skills.length} skills</div>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Active category panel */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="card-surface p-7 lg:p-9"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-11 h-11 rounded-xl bg-brand-gradient text-white grid place-items-center shadow-glow">
              <ActiveIcon size={18} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-ink font-heading">{Active.title}</h3>
              <p className="text-sm text-ink-soft">{Active.description}</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {Active.skills.map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                whileHover={{ y: -2 }}
                className="p-4 rounded-xl bg-surface-soft border border-brand-100/80 hover:border-brand-300 hover:bg-white transition-all group"
              >
                <div className="flex justify-between items-center mb-2.5">
                  <span className="text-ink text-sm font-medium">{skill.name}</span>
                  <span className="text-brand-600 text-xs font-mono font-medium">{skill.level}%</span>
                </div>
                <div className="h-1.5 bg-brand-50 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ delay: 0.1 + i * 0.04, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="h-full rounded-full bg-brand-gradient"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Full tag cloud */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap gap-2 mt-10"
        >
          {skillCategories.flatMap((cat) =>
            cat.skills.map((s) => (
              <motion.span
                key={s.name}
                whileHover={{ y: -2 }}
                className="pill font-mono text-ink-soft bg-white border border-brand-100 hover:border-brand-300 hover:text-brand-600 cursor-default"
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
