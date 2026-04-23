import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Github, ArrowUpRight, Star, Sparkles, Loader2, Folder } from "lucide-react";
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
  },
  {
    title: "MHCET Test Engine – Online Assessment Platform",
    description:
      "Comprehensive online test-taking platform with advanced proctoring for 5,000+ concurrent users. Hybrid React + Angular architecture. Timed assessments, question navigation, auto-save, browser lockdown, and real-time monitoring via Redux-Saga.",
    tech: ["React.js", "Redux-Saga", "Angular", "Material-UI", "Proctoring Systems"],
    github: "https://github.com/danieljayasurya",
    live: "#",
    featured: true,
  },
  {
    title: "DWG Editor – ODA Drawing SDK",
    description:
      "Web application to open, view, and edit DWG/CAD files by integrating the licensed ODA Drawing SDK. Project and document management modules, smooth rendering of large CAD files with optimized data fetching.",
    tech: ["React.js", "TypeScript", "TanStack Query", "Tailwind CSS", "ODA SDK"],
    github: "https://github.com/danieljayasurya",
    live: "#",
    featured: true,
  },
  {
    title: "PRA CRM – Customer Relationship Management",
    description:
      "SaaS-based CRM application for client interactions and sales pipeline management. Lead management, contact tracking, opportunity pipeline, activity logging. Increased sales conversion rates by 25% through automation.",
    tech: ["React.js", "Redux-Saga", "Node.js", "MySQL", "Express.js", "React-Bootstrap"],
    github: "https://github.com/danieljayasurya",
    live: "#",
    featured: false,
  },
  {
    title: "CONNECT ATS – Applicant Tracking System",
    description:
      "Talent acquisition platform streamlining hiring processes. Candidate pipeline management, automated email notifications, interview scheduling, and advanced filtering. Reduced time-to-hire by 30%.",
    tech: ["React.js", "Redux", "Node.js", "MongoDB", "Express.js", "Material-UI"],
    github: "https://github.com/danieljayasurya",
    live: "#",
    featured: false,
  },
];

const TiltCard = ({ children, className }: { children: React.ReactNode; className: string }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("");

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 40;
    const rotateY = (centerX - x) / 40;
    setTransform(`perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`);
  };

  const handleMouseLeave = () => setTransform("");

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform, transition: transform ? "transform 0.1s ease" : "transform 0.5s ease" }}
      className={className}
    >
      {children}
    </div>
  );
};

const ProjectsSection = () => {
  const { summaries, loading, generateSummary } = useProjectSummary();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-surface-soft to-white pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[520px] h-[520px] bg-brand-200/25 rounded-full blur-[140px] pointer-events-none" />

      <div ref={ref} className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="flex flex-col items-start gap-3 mb-14"
        >
          <span className="section-eyebrow">04 — Projects</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-ink tracking-tight font-heading">
            Selected work & <span className="hero-gradient-text">case studies</span>
          </h2>
          <p className="text-ink-muted text-base max-w-2xl">
            A glimpse into production systems I've built, shipped, and scaled — from admissions platforms to CAD editors.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 auto-rows-fr">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.6 }}
              className="h-full"
            >
              <TiltCard className="card-surface relative p-7 flex flex-col h-full group overflow-hidden">
                {/* subtle hover wash */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-brand-50 to-transparent pointer-events-none" />

                {project.featured && (
                  <div className="absolute top-5 right-5 inline-flex items-center gap-1 text-[11px] font-medium text-brand-700 bg-brand-50 border border-brand-200 px-2.5 py-1 rounded-full">
                    <Star size={10} fill="currentColor" />
                    Featured
                  </div>
                )}

                <div className="relative flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-brand-gradient text-white grid place-items-center shadow-glow">
                    <Folder size={18} />
                  </div>
                  <div className="flex items-center gap-2">
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -2 }}
                      className="p-2 rounded-xl bg-white border border-brand-100 text-ink-muted hover:text-brand-600 hover:border-brand-300 transition-all"
                      aria-label="View source on GitHub"
                    >
                      <Github size={14} />
                    </motion.a>
                    {project.live && project.live !== "#" && (
                      <motion.a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -2 }}
                        className="p-2 rounded-xl bg-white border border-brand-100 text-ink-muted hover:text-brand-600 hover:border-brand-300 transition-all"
                        aria-label="View live project"
                      >
                        <ArrowUpRight size={14} />
                      </motion.a>
                    )}
                  </div>
                </div>

                <h3 className="relative text-lg font-bold text-ink mb-3 font-heading leading-snug group-hover:text-brand-700 transition-colors">
                  {project.title}
                </h3>

                <p className="relative text-ink-muted text-sm leading-relaxed flex-1 mb-5">
                  {project.description}
                </p>

                <div className="relative mb-5 min-h-[40px]">
                  {summaries[project.title] ? (
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-start gap-2 px-3 py-2 rounded-xl bg-brand-50 border border-brand-100"
                    >
                      <Sparkles size={12} className="text-brand-600 mt-0.5 shrink-0" />
                      <p className="text-xs text-brand-700 italic leading-relaxed">
                        {summaries[project.title]}
                      </p>
                    </motion.div>
                  ) : (
                    <button
                      onClick={() => generateSummary(project.title, project.tech)}
                      disabled={loading[project.title]}
                      className="inline-flex items-center gap-1.5 text-xs text-ink-soft hover:text-brand-600 border border-brand-100 hover:border-brand-300 px-3 py-1.5 rounded-full bg-white hover:bg-brand-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading[project.title] ? (
                        <>
                          <Loader2 size={11} className="animate-spin text-brand-600" />
                          <span className="text-brand-600">Generating...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles size={11} />
                          Generate AI Summary
                        </>
                      )}
                    </button>
                  )}
                </div>

                <div className="relative flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 text-[11px] font-mono font-medium text-brand-700 bg-brand-50 rounded-md border border-brand-100"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <motion.a
            href="https://github.com/danieljayasurya"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="btn-secondary"
          >
            <Github size={16} />
            View More on GitHub
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
