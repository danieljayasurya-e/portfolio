import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Github, Folder, Star, Sparkles, Loader2 } from "lucide-react";
import { useProjectSummary } from "../hooks/useProjectSummary";

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
  },
];

const ProjectsSection = () => {
  const { summaries, loading, generateSummary } = useProjectSummary();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="projects" ref={ref} className="py-24 bg-[#0a0f1e] relative overflow-hidden">
      <div className="absolute top-0 left-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl -translate-x-1/2" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="flex items-center gap-4 mb-16"
        >
          <span className="text-cyan-400 font-mono text-sm">04.</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Featured Projects</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-cyan-500/30 to-transparent max-w-xs" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.12 }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className={`relative p-6 rounded-2xl bg-gradient-to-br ${project.gradient} border ${
                project.border
              } flex flex-col transition-all duration-300 ${
                hovered === i ? "-translate-y-2 shadow-2xl shadow-black/30" : ""
              }`}
            >
              {/* Featured Badge */}
              {project.featured && (
                <div className="absolute top-4 right-4 flex items-center gap-1 text-xs text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2 py-1 rounded-full">
                  <Star size={10} fill="currentColor" />
                  Featured
                </div>
              )}

              <div className="flex items-start justify-between mb-4">
                <Folder size={32} className="text-cyan-400 fill-cyan-400/20" />
                {/* <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-cyan-400 transition-colors"
                  aria-label="GitHub"
                >
                  <Github size={18} />
                </a> */}
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-white mb-3">{project.title}</h3>

              <p className="text-slate-400 text-sm leading-relaxed flex-1 mb-4">
                {project.description}
              </p>

              <div className="mb-4 min-h-[36px]">
                {summaries[project.title] ? (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-2 px-3 py-2 rounded-lg bg-cyan-400/5 border border-cyan-400/15"
                  >
                    <Sparkles size={12} className="text-cyan-400 mt-0.5 shrink-0" />
                    <p className="text-xs text-cyan-300 italic leading-relaxed">
                      {summaries[project.title]}
                    </p>
                  </motion.div>
                ) : (
                  <button
                    onClick={() => generateSummary(project.title, project.tech)}
                    disabled={loading[project.title]}
                    className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-cyan-400 border border-slate-700/40 hover:border-cyan-400/30 px-3 py-1.5 rounded-lg bg-slate-800/30 hover:bg-cyan-400/5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading[project.title] ? (
                      <>
                        <Loader2 size={11} className="animate-spin text-cyan-400" />
                        <span className="text-cyan-400">Generating...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles size={11} />
                        ✨ Generate AI Summary
                      </>
                    )}
                  </button>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 text-xs font-mono text-cyan-400 bg-cyan-400/10 rounded-md border border-cyan-400/15"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.9 }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/danieljayasurya"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 text-cyan-400 border border-cyan-400/40 rounded-xl hover:bg-cyan-400/10 transition-all duration-200 hover:-translate-y-0.5"
          >
            <Github size={16} />
            View More on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
