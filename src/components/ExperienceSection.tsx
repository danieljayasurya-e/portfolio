import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Calendar, CheckCircle2, Briefcase } from "lucide-react";

const experiences = [
  {
    role: "MERN Stack Developer",
    company: "Praathee Technologies Pvt Ltd",
    period: "March 2024 – Present",
    duration: "2 years 1 month",
    location: "Coimbatore, Tamil Nadu",
    type: "Full-time",
    points: [
      "Engineered full-stack apps using PostgreSQL, Express.js, React, Node.js with Redux-Saga and TanStack Query — reduced app load time by 35%",
      "Architected scalable database schemas with ORM + PostgreSQL stored procedures, reducing query execution time by 40% for thousands of concurrent users",
      "Integrated Keycloak Single Sign-On (SSO) across enterprise applications, enhancing security and streamlining authentication",
      "Built and deployed Dockerized React apps to Google Cloud Run enabling scalable containerized frontend deployment",
      "Implemented CI/CD workflows and Git-based version control across team",
      "Wrote unit and component tests using Jest to ensure reliability and code quality",
      "Collaborated in Agile teams via daily standups, sprint planning, and code reviews",
    ],
  },
  {
    role: "Junior Software Developer",
    company: "Montbleu Technologies Pvt Ltd",
    period: "August 2023 – January 2024",
    duration: "6 months",
    location: "Coimbatore, Tamil Nadu",
    type: "Full-time",
    points: [
      "Led design, building, and testing of web-based applications ensuring compliance with design guidelines",
      "Managed web pages, edited content, and handled document uploads via CMS",
      "Demonstrated strong proficiency in React.js, JavaScript DOM manipulation, and ES6+",
      "Utilized React.js workflows including Flux and Redux with RESTful API integration",
      "Employed front-end tools like Babel, Webpack, NPM/Yarn, Bootstrap, and Material-UI",
    ],
  },
  {
    role: "Market Research Intern",
    company: "Draup",
    period: "March 2022 – June 2022",
    duration: "4 months",
    location: "Coimbatore, Tamil Nadu",
    type: "Internship",
    points: [
      "Contributed to consulting assignments through primary and secondary research",
      "Involved in data interpretation and analysis",
      "Prepared professional reports and insights for stakeholders",
    ],
  },
];

const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="py-28 relative overflow-hidden">
      <div className="absolute top-1/3 right-0 w-[360px] h-[360px] bg-brand-300/25 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[280px] h-[280px] bg-brand-200/30 rounded-full blur-[80px] pointer-events-none" />

      <div ref={ref} className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="flex flex-col items-start gap-3 mb-14"
        >
          <span className="section-eyebrow">03 — Experience</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-ink tracking-tight font-heading">
            A journey of <span className="hero-gradient-text">shipping</span> & learning
          </h2>
        </motion.div>

        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-4 md:left-6 top-2 bottom-2 w-px bg-gradient-to-b from-brand-300 via-brand-200 to-transparent" />

          <div className="space-y-8">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: -24 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.15 + i * 0.15, duration: 0.55 }}
                className="relative pl-14 md:pl-20"
              >
                {/* Dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ delay: 0.25 + i * 0.15, type: "spring", stiffness: 300 }}
                  className="absolute left-4 md:left-6 top-6 -translate-x-1/2 w-4 h-4 rounded-full bg-brand-gradient ring-4 ring-white shadow-glow"
                />

                <motion.div
                  whileHover={{ y: -3 }}
                  className="card-surface p-6 lg:p-7 group"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div>
                      <div className="flex items-center gap-2 text-brand-600 text-xs font-medium uppercase tracking-wider mb-1">
                        <Briefcase size={12} />
                        {exp.type}
                      </div>
                      <h3 className="text-xl font-bold text-ink font-heading">{exp.role}</h3>
                      <p className="text-brand-600 font-medium mt-0.5">{exp.company}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 text-ink-soft text-sm mb-5">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar size={13} className="text-brand-500" />
                      {exp.period}
                      <span className="text-ink-soft/70">· {exp.duration}</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin size={13} className="text-brand-500" />
                      {exp.location}
                    </span>
                  </div>

                  <ul className="space-y-2.5">
                    {exp.points.map((point, j) => (
                      <motion.li
                        key={j}
                        initial={{ opacity: 0, x: -8 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.3 + i * 0.15 + j * 0.04 }}
                        className="flex items-start gap-2.5 text-ink-muted text-sm leading-relaxed"
                      >
                        <CheckCircle2 size={14} className="text-brand-500 mt-0.5 shrink-0" />
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
