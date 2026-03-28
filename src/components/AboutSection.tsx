import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { number: "2.5+", label: "Years Experience" },
    { number: "35%", label: "Load Time Reduced" },
    { number: "40%", label: "DB Query Improved" },
    { number: "5K+", label: "Concurrent Users" },
  ];

  return (
    <section id="about" ref={ref} className="py-32 bg-editorial-dark relative overflow-hidden md:ml-64">
      <div className="max-w-5xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="text-accent font-display text-2xl">01</span>
            <h2 className="text-5xl font-display font-bold text-editorial-text">About</h2>
          </div>
          <div className="w-20 h-1 bg-accent" />
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12 items-start">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-6 text-editorial-text-muted text-base leading-relaxed"
          >
            <p>
              Full Stack Engineer specializing in building production-grade web applications. 2.5+ years crafting scalable systems at Praathee Technologies using React, Node.js, and PostgreSQL.
            </p>
            <p>
              Reduced app load times by 35% and improved database query performance by 40% through optimization and architectural improvements. Experienced with Docker, TypeScript, and modern development workflows.
            </p>
            <p>
              Based in Coimbatore, Tamil Nadu. Open to freelance opportunities and collaborative projects. Passionate about creating robust backends and intuitive frontends that solve real problems.
            </p>
          </motion.div>

          {/* Stats grid */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="border-l-2 border-accent pl-4 py-2"
              >
                <p className="text-3xl font-display font-bold text-accent">{stat.number}</p>
                <p className="text-sm text-editorial-text-muted">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
