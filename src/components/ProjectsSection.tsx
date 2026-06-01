import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Github, ArrowUpRight, Star, Sparkles, Loader2, Folder } from "lucide-react";
import { useProjectSummary } from "../hooks/useProjectSummary";

const accents = ["bg-lime", "bg-cyan", "bg-pink", "bg-violet", "bg-yellow"];

const projects = [
  {
    title: "MHCET Admissions & Course Registration Platform",
    description:
      "Large-scale enterprise app managing student registration and admissions for thousands. Microservices with Student Portal, Back Office, CAP & CAP Verifier modules. Redis caching, PostgreSQL stored procedures, TanStack Query — 99.9% uptime.",
    tech: ["React.js", "Redux-Saga", "TanStack Query", "Node.js", "PostgreSQL", "Redis", "Material-UI"],
    github: "https://github.com/danieljayasurya",
    live: "#",
    featured: true,
  },
  {
    title: "MHCET Test Engine – Online Assessment Platform",
    description:
      "Online test-taking platform with advanced proctoring for 5,000+ concurrent users. Hybrid React + Angular architecture. Timed assessments, question navigation, auto-save, browser lockdown, and real-time monitoring via Redux-Saga.",
    tech: ["React.js", "Redux-Saga", "Angular", "Material-UI", "Proctoring"],
    github: "https://github.com/danieljayasurya",
    live: "#",
    featured: true,
  },
  {
    title: "DWG Editor – ODA Drawing SDK",
    description:
      "Web app to open, view & edit DWG/CAD files via the licensed ODA Drawing SDK. Project & document management modules with smooth rendering of large CAD files and optimized data fetching.",
    tech: ["React.js", "TypeScript", "TanStack Query", "Tailwind CSS", "ODA SDK"],
    github: "https://github.com/danieljayasurya",
    live: "#",
    featured: true,
  },
  {
    title: "PRA CRM – Customer Relationship Management",
    description:
      "SaaS CRM for client interactions and sales pipeline management. Lead management, contact tracking, opportunity pipeline, activity logging. Increased sales conversion rates by 25% through automation.",
    tech: ["React.js", "Redux-Saga", "Node.js", "MySQL", "Express.js"],
    github: "https://github.com/danieljayasurya",
    live: "#",
    featured: false,
  },
  {
    title: "CONNECT ATS – Applicant Tracking System",
    description:
      "Talent acquisition platform streamlining hiring. Candidate pipeline management, automated email notifications, interview scheduling, advanced filtering. Reduced time-to-hire by 30%.",
    tech: ["React.js", "Redux", "Node.js", "MongoDB", "Express.js"],
    github: "https://github.com/danieljayasurya",
    live: "#",
    featured: false,
  },
];

const ProjectsSection = () => {
  const { summaries, loading, generateSummary } = useProjectSummary();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-24 relative overflow-hidden border-t-[3px] border-ink bg-paper-soft">
      <div ref={ref} className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="flex flex-col items-start gap-4 mb-12"
        >
          <span className="section-eyebrow">04 / PROJECTS</span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-ink uppercase tracking-tighter leading-[0.95] font-heading">
            Selected work &{" "}
            <span className="bg-violet text-ink px-2 inline-block -rotate-1 border-[3px] border-ink shadow-brutal">
              case studies
            </span>
          </h2>
          <p className="text-ink-muted text-sm sm:text-base font-mono max-w-2xl">
            Production systems I've built, shipped & scaled — from admissions platforms to CAD editors.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 auto-rows-fr">
          {projects.map((project, i) => {
            const accent = accents[i % accents.length];
            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.45 }}
                whileHover={{ x: -4, y: -4 }}
                className="brutal-card-hover relative p-6 lg:p-7 flex flex-col h-full"
              >
                {project.featured && (
                  <div className="absolute -top-3 -right-3 inline-flex items-center gap-1 text-[11px] font-mono font-bold uppercase text-ink bg-yellow border-[3px] border-ink px-2.5 py-1 rotate-3 shadow-brutal-sm">
                    <Star size={11} fill="currentColor" />
                    Featured
                  </div>
                )}

                <div className="flex items-center gap-3 mb-5">
                  <div className={`w-12 h-12 ${accent} border-[3px] border-ink grid place-items-center text-ink`}>
                    <Folder size={20} />
                  </div>
                  <div className="flex items-center gap-2 ml-auto">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 border-[3px] border-ink bg-paper text-ink hover:bg-lime transition-colors"
                      aria-label="View source on GitHub"
                    >
                      <Github size={15} />
                    </a>
                    {project.live && project.live !== "#" && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 border-[3px] border-ink bg-paper text-ink hover:bg-lime transition-colors"
                        aria-label="View live project"
                      >
                        <ArrowUpRight size={15} />
                      </a>
                    )}
                  </div>
                </div>

                <h3 className="text-lg sm:text-xl font-extrabold text-ink mb-3 font-heading uppercase tracking-tight leading-tight">
                  {project.title}
                </h3>

                <p className="text-ink-muted text-sm font-mono leading-relaxed flex-1 mb-5">
                  {project.description}
                </p>

                <div className="mb-5 min-h-[40px]">
                  {summaries[project.title] ? (
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-start gap-2 px-3 py-2.5 bg-violet border-[3px] border-ink"
                    >
                      <Sparkles size={13} className="text-ink mt-0.5 shrink-0" />
                      <p className="text-xs text-ink font-mono font-medium leading-relaxed">
                        {summaries[project.title]}
                      </p>
                    </motion.div>
                  ) : (
                    <button
                      onClick={() => generateSummary(project.title, project.tech)}
                      disabled={loading[project.title]}
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase text-ink border-[3px] border-ink px-3 py-1.5 bg-paper hover:bg-lime transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading[project.title] ? (
                        <>
                          <Loader2 size={12} className="animate-spin" />
                          Generating…
                        </>
                      ) : (
                        <>
                          <Sparkles size={12} />
                          Generate AI Summary
                        </>
                      )}
                    </button>
                  )}
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-1 text-[11px] font-mono font-bold uppercase text-ink bg-paper border-2 border-ink"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/danieljayasurya"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
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
