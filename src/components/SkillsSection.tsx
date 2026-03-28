import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const skillCategories = [
  {
    title: "Frontend",
    skills: ["React.js", "TypeScript", "JavaScript", "Tailwind CSS", "Material-UI", "Redux", "TanStack Query"],
  },
  {
    title: "Backend",
    skills: ["Node.js", "Express.js", "RESTful APIs", "JWT Auth", "Socket.io", "Keycloak SSO"],
  },
  {
    title: "Database",
    skills: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "Sequelize ORM", "Stored Procedures"],
  },
  {
    title: "DevOps & Tools",
    skills: ["Docker", "Google Cloud (GCP)", "Git / Bitbucket", "CI/CD Pipelines", "JIRA", "Postman"],
  },
];

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" ref={ref} className="py-32 bg-editorial-dark relative overflow-hidden md:ml-64">
      <div className="max-w-5xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="text-accent font-display text-2xl">02</span>
            <h2 className="text-5xl font-display font-bold text-editorial-text">Skills</h2>
          </div>
          <div className="w-20 h-1 bg-accent" />
        </motion.div>

        {/* Skills matrix */}
        <div className="grid md:grid-cols-2 gap-12">
          {skillCategories.map((category, catIdx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + catIdx * 0.1 }}
            >
              <h3 className="text-2xl font-display font-bold text-accent mb-6">{category.title}</h3>
              <div className="space-y-3">
                {category.skills.map((skill, i) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + catIdx * 0.1 + i * 0.05 }}
                    whileHover={{ x: 8, backgroundColor: "rgba(232, 255, 0, 0.05)" }}
                    className="px-4 py-3 border-l-2 border-accent/30 hover:border-accent transition-all duration-300 cursor-default"
                  >
                    <p className="text-editorial-text font-body text-sm">{skill}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* All skills tags */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-16 pt-16 border-t border-accent/20"
        >
          <p className="text-editorial-text-muted text-sm mb-6 uppercase tracking-wide">Tech Stack</p>
          <div className="flex flex-wrap gap-3">
            {skillCategories.flatMap((cat) =>
              cat.skills.map((skill) => (
                <motion.span
                  key={skill}
                  whileHover={{ scale: 1.08, backgroundColor: "rgba(232, 255, 0, 0.1)" }}
                  className="px-3 py-2 text-xs text-editorial-text border border-accent/30 transition-all duration-200 cursor-default"
                >
                  {skill}
                </motion.span>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
