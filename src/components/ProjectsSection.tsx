import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Github } from "lucide-react";

const projects = [
  {
    title: "MHCET Student Course Registration & Admissions Platform",
    description:
      "Large-scale enterprise app managing student course registration and admissions for thousands. Microservices architecture with Student Portal, Back Office, CAP, and CAP Verifiers modules. Implemented Redis caching, PostgreSQL with stored procedures, and TanStack Query — achieved 99.9% uptime.",
    tech: ["React.js", "Redux-Saga", "TanStack Query", "Node.js", "PostgreSQL", "Redis", "Material-UI"],
    github: "https://github.com/danieljayasurya",
    live: "#",
    featured: true,
    gradient: "from-cyan-500/20 to-blue-500/10",
    border: "border-cyan-500/20",
    hoverGlow: "hover:shadow-cyan-500/10",
  },
  {
    title: "MHCET Test Engine – Online Assessment Platform",
    description:
      "Comprehensive online test-taking platform with advanced proctoring for 5,000+ concurrent users. Hybrid React + Angular architecture. Timed assessments, question navigation, auto-save, browser lockdown, and real-time monitoring via Redux-Saga.",
    tech: ["React.js", "Redux-Saga", "Angular", "Material-UI", "Proctoring Systems"],
    github: "https://github.com/danieljayasurya",
    live: "#",
    featured: true,
    gradient: "from-emerald-500/20 to-teal-500/10",
    border: "border-emerald-500/20",
    hoverGlow: "hover:shadow-emerald-500/10",
  },
  {
    title: "DWG Editor – ODA Drawing SDK",
    description:
      "Web application to open, view, and edit DWG/CAD files by integrating the licensed ODA Drawing SDK. Project and document management modules, smooth rendering of large CAD files with optimized data fetching.",
    tech: ["React.js", "TypeScript", "TanStack Query", "Tailwind CSS", "ODA SDK"],
    github: "https://github.com/danieljayasurya",
    live: "#",
    featured: true,
    gradient: "from-purple-500/20 to-violet-500/10",
    border: "border-purple-500/20",
    hoverGlow: "hover:shadow-purple-500/10",
  },
  {
    title: "PRA CRM – Customer Relationship Management",
    description:
      "SaaS-based CRM application for client interactions and sales pipeline management. Lead management, contact tracking, opportunity pipeline, activity logging. Increased sales conversion rates by 25% through automation.",
    tech: ["React.js", "Redux-Saga", "Node.js", "MySQL", "Express.js", "React-Bootstrap"],
    github: "https://github.com/danieljayasurya",
    live: "#",
    featured: false,
    gradient: "from-orange-500/20 to-amber-500/10",
    border: "border-orange-500/20",
    hoverGlow: "hover:shadow-orange-500/10",
  },
  {
    title: "CONNECT ATS – Applicant Tracking System",
    description:
      "Talent acquisition platform streamlining hiring processes. Candidate pipeline management, automated email notifications, interview scheduling, and advanced filtering. Reduced time-to-hire by 30%.",
    tech: ["React.js", "Redux", "Node.js", "MongoDB", "Express.js", "Material-UI"],
    github: "https://github.com/danieljayasurya",
    live: "#",
    featured: false,
    gradient: "from-rose-500/20 to-pink-500/10",
    border: "border-rose-500/20",
    hoverGlow: "hover:shadow-rose-500/10",
  },
];

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" ref={ref} className="py-32 bg-editorial-dark relative overflow-hidden md:ml-64">
      <div className="max-w-5xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="text-accent font-display text-2xl">04</span>
            <h2 className="text-5xl font-display font-bold text-editorial-text">Projects</h2>
          </div>
          <div className="w-20 h-1 bg-accent" />
        </motion.div>

        {/* Projects grid */}
        <div className="space-y-8">
          {projects.slice(0, 3).map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.15 }}
              className="border-l-4 border-accent pl-6 py-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 mb-3">
                <h3 className="text-2xl font-display font-bold text-editorial-text">{project.title}</h3>
                {project.featured && <span className="text-xs text-accent">Featured</span>}
              </div>
              <p className="text-editorial-text-muted mb-4 leading-relaxed">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tech.slice(0, 5).map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 text-xs text-editorial-text border border-accent/30 hover:border-accent transition-colors"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-12 pt-12 border-t border-accent/20 text-center"
        >
          <motion.a
            href="https://github.com/danieljayasurya"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-6 py-3 text-accent border border-accent/30 hover:border-accent hover:bg-accent/5 transition-all"
          >
            <Github size={18} />
            View on GitHub
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
