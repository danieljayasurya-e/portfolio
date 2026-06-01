import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Code, Server, Database, Wrench, Sparkles } from "lucide-react";

const skillCategories = [
  {
    title: "Frontend",
    icon: Code,
    color: "bg-lime",
    description: "Fast, accessible, pixel-perfect interfaces.",
    skills: [
      { name: "React.js", level: 95 },
      { name: "TypeScript", level: 85 },
      { name: "JavaScript (ES6+)", level: 95 },
      { name: "Redux / Redux-Saga", level: 88 },
      { name: "TanStack Query", level: 85 },
      { name: "Tailwind CSS", level: 90 },
      { name: "Material-UI", level: 82 },
      { name: "Next.js", level: 80 },
    ],
  },
  {
    title: "Backend",
    icon: Server,
    color: "bg-cyan",
    description: "APIs & services that scale to thousands of users.",
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
    color: "bg-pink",
    description: "Schemas & queries designed for performance.",
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
    title: "DevOps & AI",
    icon: Wrench,
    color: "bg-violet",
    description: "Ship reliably — Docker, CI/CD, cloud & GenAI.",
    skills: [
      { name: "Docker", level: 80 },
      { name: "AWS / GCP", level: 74 },
      { name: "Git / CI-CD", level: 88 },
      { name: "Claude AI API", level: 82 },
      { name: "Prompt Engineering", level: 80 },
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
    <section id="skills" className="py-24 relative overflow-hidden border-t-[3px] border-ink bg-paper-soft">
      <div ref={ref} className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="flex flex-col items-start gap-4 mb-12"
        >
          <span className="section-eyebrow">02 / SKILLS</span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-ink uppercase tracking-tighter leading-[0.95] font-heading">
            Tools I use to build{" "}
            <span className="bg-cyan text-ink px-2 inline-block -rotate-1 border-[3px] border-ink shadow-brutal">
              exceptional
            </span>{" "}
            software
          </h2>
        </motion.div>

        {/* Category tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {skillCategories.map((cat, i) => {
            const Icon = cat.icon;
            const active = activeCategory === i;
            return (
              <button
                key={cat.title}
                onClick={() => setActiveCategory(i)}
                className={`group relative text-left p-4 border-[3px] border-ink transition-[transform,box-shadow] duration-150 ${
                  active
                    ? `${cat.color} shadow-brutal -translate-x-0.5 -translate-y-0.5`
                    : "bg-paper shadow-brutal-sm hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal"
                }`}
              >
                <div className="w-10 h-10 grid place-items-center mb-3 border-[3px] border-ink bg-paper text-ink">
                  <Icon size={18} />
                </div>
                <div className="text-sm font-extrabold uppercase text-ink font-heading tracking-tight">{cat.title}</div>
                <div className="text-[11px] font-mono font-bold text-ink/70 mt-0.5">{cat.skills.length} SKILLS</div>
              </button>
            );
          })}
        </div>

        {/* Active panel */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="brutal-card p-6 lg:p-8"
        >
          <div className="flex items-center gap-3 mb-6 pb-5 border-b-[3px] border-ink">
            <div className={`w-12 h-12 ${Active.color} border-[3px] border-ink grid place-items-center text-ink`}>
              <ActiveIcon size={20} />
            </div>
            <div>
              <h3 className="text-lg font-extrabold uppercase text-ink font-heading tracking-tight">{Active.title}</h3>
              <p className="text-sm font-mono text-ink-soft">{Active.description}</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Active.skills.map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="p-4 border-[3px] border-ink bg-paper"
              >
                <div className="flex justify-between items-center mb-2.5">
                  <span className="text-ink text-sm font-bold uppercase tracking-tight">{skill.name}</span>
                  <span className="text-ink text-xs font-mono font-bold">{skill.level}%</span>
                </div>
                {/* segmented brutalist bar */}
                <div className="h-3 border-[2px] border-ink bg-paper-soft overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ delay: 0.1 + i * 0.04, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className={`h-full ${Active.color}`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tag cloud */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap gap-2 mt-8"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-bold uppercase bg-ink text-paper border-[3px] border-ink">
            <Sparkles size={12} /> Full Arsenal
          </span>
          {skillCategories.flatMap((cat) =>
            cat.skills.map((s) => (
              <span
                key={`${cat.title}-${s.name}`}
                className="pill font-mono uppercase text-ink hover:bg-lime cursor-default"
              >
                {s.name}
              </span>
            ))
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
