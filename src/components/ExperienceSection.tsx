import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Calendar } from "lucide-react";

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

  return (
    <section id="experience" ref={ref} className="py-32 bg-editorial-dark relative overflow-hidden md:ml-64">
      <div className="max-w-5xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="text-accent font-display text-2xl">03</span>
            <h2 className="text-5xl font-display font-bold text-editorial-text">Experience</h2>
          </div>
          <div className="w-20 h-1 bg-accent" />
        </motion.div>

        <div className="space-y-8">

          {experiences.map((exp, i) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.1 }}
            >
              <div className="border-l-4 border-accent pl-6 py-4">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 mb-2">
                  <h3 className="text-2xl font-display font-bold text-editorial-text">{exp.role}</h3>
                  <span className="text-sm text-accent">{exp.duration}</span>
                </div>
                <p className="text-editorial-text-muted mb-1">{exp.company}</p>
                <div className="flex gap-4 text-sm text-editorial-text-muted mb-4">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={14} />
                    {exp.period}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin size={14} />
                    {exp.location}
                  </span>
                </div>
                <ul className="space-y-2 text-editorial-text-muted text-sm">
                  {exp.points.slice(0, 3).map((point) => (
                    <li key={point} className="flex gap-2">
                      <span className="text-accent mt-0.5">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
