import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Calendar, ArrowRight, Briefcase } from "lucide-react";

const experiences = [
  {
    role: "MERN Stack Developer",
    company: "Praathee Technologies Pvt Ltd",
    period: "March 2024 – Present",
    duration: "2 yrs 1 mo",
    location: "Coimbatore, Tamil Nadu",
    type: "Full-time",
    color: "bg-lime",
    points: [
      "Engineered full-stack apps with PostgreSQL, Express, React, Node + Redux-Saga & TanStack Query — cut app load time by 35%",
      "Architected scalable DB schemas with ORM + PostgreSQL stored procedures, reducing query time by 40% for thousands of concurrent users",
      "Integrated Keycloak Single Sign-On (SSO) across enterprise apps, hardening security and streamlining auth",
      "Built & deployed Dockerized React apps to Google Cloud Run for scalable containerized delivery",
      "Implemented CI/CD workflows, Git-based version control, and Jest unit/component tests",
      "Collaborated in Agile teams — daily standups, sprint planning, and code reviews",
    ],
  },
  {
    role: "Junior Software Developer",
    company: "Montbleu Technologies Pvt Ltd",
    period: "August 2023 – January 2024",
    duration: "6 mo",
    location: "Coimbatore, Tamil Nadu",
    type: "Full-time",
    color: "bg-cyan",
    points: [
      "Led design, build & testing of web apps ensuring compliance with design guidelines",
      "Managed web pages, edited content, and handled document uploads via CMS",
      "Strong proficiency in React.js, JS DOM manipulation, and ES6+",
      "Used React workflows including Flux & Redux with RESTful API integration",
      "Employed Babel, Webpack, NPM/Yarn, Bootstrap, and Material-UI",
    ],
  },
  {
    role: "Market Research Intern",
    company: "Draup",
    period: "March 2022 – June 2022",
    duration: "4 mo",
    location: "Coimbatore, Tamil Nadu",
    type: "Internship",
    color: "bg-pink",
    points: [
      "Contributed to consulting assignments through primary & secondary research",
      "Involved in data interpretation and analysis",
      "Prepared professional reports & insights for stakeholders",
    ],
  },
];

const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="py-24 relative overflow-hidden border-t-[3px] border-ink">
      <div ref={ref} className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="flex flex-col items-start gap-4 mb-12"
        >
          <span className="section-eyebrow">03 / EXPERIENCE</span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-ink uppercase tracking-tighter leading-[0.95] font-heading">
            A journey of{" "}
            <span className="bg-pink text-ink px-2 inline-block -rotate-1 border-[3px] border-ink shadow-brutal">
              shipping
            </span>{" "}
            & learning
          </h2>
        </motion.div>

        <div className="relative">
          {/* timeline spine */}
          <div className="absolute left-[18px] md:left-[22px] top-2 bottom-2 w-[3px] bg-ink" />

          <div className="space-y-7">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: -24 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.15 + i * 0.12, duration: 0.45 }}
                className="relative pl-12 md:pl-16"
              >
                {/* node */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ delay: 0.25 + i * 0.12, type: "spring", stiffness: 300 }}
                  className={`absolute left-[18px] md:left-[22px] top-6 -translate-x-1/2 w-5 h-5 ${exp.color} border-[3px] border-ink`}
                />

                <motion.div whileHover={{ x: -3, y: -3 }} className="brutal-card-hover p-6 lg:p-7">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                    <div>
                      <div className={`inline-flex items-center gap-1.5 ${exp.color} text-ink text-[11px] font-mono font-bold uppercase tracking-wider px-2 py-1 border-2 border-ink mb-2`}>
                        <Briefcase size={11} />
                        {exp.type}
                      </div>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-ink font-heading uppercase tracking-tight leading-tight">{exp.role}</h3>
                      <p className="text-ink font-mono font-bold mt-1">{exp.company}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 text-ink-soft text-xs font-mono font-bold uppercase mb-5">
                    <span className="inline-flex items-center gap-1.5 border-2 border-ink px-2 py-1 bg-paper-soft">
                      <Calendar size={12} />
                      {exp.period} · {exp.duration}
                    </span>
                    <span className="inline-flex items-center gap-1.5 border-2 border-ink px-2 py-1 bg-paper-soft">
                      <MapPin size={12} />
                      {exp.location}
                    </span>
                  </div>

                  <ul className="space-y-2.5">
                    {exp.points.map((point, j) => (
                      <motion.li
                        key={j}
                        initial={{ opacity: 0, x: -8 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.3 + i * 0.12 + j * 0.04 }}
                        className="flex items-start gap-2.5 text-ink-muted text-sm font-mono leading-relaxed"
                      >
                        <ArrowRight size={14} className="text-ink mt-1 shrink-0" />
                        <span>{point}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
