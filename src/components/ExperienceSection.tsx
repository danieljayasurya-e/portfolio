import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { MapPin, Calendar, CheckCircle2 } from "lucide-react";

const experiences = [
  {
    role: "MERN Stack Developer",
    company: "Praathee Technologies Pvt Ltd",
    period: "March 2024 – Present",
    duration: "2 years 1 month",
    location: "Coimbatore, Tamil Nadu",
    type: "Full-time",
    color: "from-cyan-500/20 to-blue-500/10",
    borderColor: "border-cyan-500/30",
    dotColor: "bg-cyan-400",
    glowColor: "shadow-cyan-400/20",
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
    color: "from-emerald-500/20 to-teal-500/10",
    borderColor: "border-emerald-500/30",
    dotColor: "bg-emerald-400",
    glowColor: "shadow-emerald-400/20",
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
    color: "from-purple-500/20 to-violet-500/10",
    borderColor: "border-purple-500/30",
    dotColor: "bg-purple-400",
    glowColor: "shadow-purple-400/20",
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
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section id="experience" ref={sectionRef} className="py-28 bg-[#0d1424] relative overflow-hidden">
      <motion.div style={{ y: bgY }} className="absolute top-1/3 right-0 w-64 h-64 bg-purple-500/5 rounded-full blur-[100px]" />
      <motion.div style={{ y: bgY }} className="absolute bottom-1/4 left-0 w-48 h-48 bg-cyan-500/5 rounded-full blur-[80px]" />

      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="flex items-center gap-4 mb-16"
        >
          <span className="text-cyan-400 font-mono text-sm">03.</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Experience</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-cyan-500/30 to-transparent max-w-xs" />
        </motion.div>

        <div className="relative">
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/30 via-emerald-500/20 via-purple-500/20 to-transparent" />

          <div className="space-y-10">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: -40 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.2, duration: 0.6 }}
                className="relative pl-16 md:pl-24"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ delay: 0.3 + i * 0.2, type: "spring", stiffness: 300 }}
                  className={`absolute left-4 md:left-8 w-3 h-3 rounded-full ${exp.dotColor} -translate-x-1 mt-6 ring-4 ring-[#0d1424] z-10`}
                />

                <motion.div
                  whileHover={{ y: -4 }}
                  className={`p-6 rounded-2xl bg-gradient-to-br ${exp.color} border ${exp.borderColor} transition-all duration-500 hover:${exp.glowColor} hover:shadow-lg backdrop-blur-sm group`}
                >
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">{exp.role}</h3>
                      <p className="text-cyan-400 font-medium mt-0.5">{exp.company}</p>
                    </div>
                    <span className="text-xs px-3 py-1 rounded-full bg-slate-800/60 border border-slate-700/50 text-slate-300 backdrop-blur-sm">
                      {exp.type}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-4 text-slate-400 text-sm mb-4">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={13} className="text-cyan-400" />
                      {exp.period}
                      <span className="text-slate-600">· {exp.duration}</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin size={13} className="text-cyan-400" />
                      {exp.location}
                    </span>
                  </div>

                  <ul className="space-y-2">
                    {exp.points.map((point, j) => (
                      <motion.li
                        key={j}
                        initial={{ opacity: 0, x: -10 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.4 + i * 0.2 + j * 0.05 }}
                        className="flex items-start gap-2 text-slate-400 text-sm"
                      >
                        <CheckCircle2 size={14} className="text-cyan-400 mt-0.5 shrink-0" />
                        {point}
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
