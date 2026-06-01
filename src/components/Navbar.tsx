import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, FileText } from "lucide-react";
import CalendlyButton from "./CalendlyModal";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = navLinks.map((l) => l.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 150) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? "bg-paper border-b-[3px] border-ink"
          : "bg-transparent border-b-[3px] border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[68px]">
          {/* Logo block */}
          <motion.a
            href="#"
            whileHover={{ x: -2, y: -2 }}
            className="flex items-center gap-3 group"
          >
            <span className="w-10 h-10 bg-lime text-ink grid place-items-center font-heading font-extrabold text-base border-[3px] border-ink shadow-brutal-sm group-hover:shadow-brutal transition-shadow">
              DJ
            </span>
            <span className="hidden sm:block font-heading font-extrabold text-ink tracking-tight uppercase text-lg">
              Daniel<span className="text-violet">/</span>
            </span>
          </motion.a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center">
            {navLinks.map((link, i) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i }}
                  className={`relative px-3 lg:px-4 py-2 text-sm font-mono font-bold uppercase tracking-wider transition-colors ${
                    isActive ? "text-ink" : "text-ink-soft hover:text-ink"
                  }`}
                >
                  <span className="relative z-10">{link.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="nav-active-underline"
                      className="absolute left-3 right-3 lg:left-4 lg:right-4 -bottom-0.5 h-[3px] bg-violet"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                </motion.a>
              );
            })}
          </nav>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-2.5">
            <motion.a
              href="/resume.pdf"
              target="_blank"
              whileHover={{ x: -2, y: -2 }}
              className="flex items-center gap-2 px-3.5 py-2 text-sm font-mono font-bold uppercase text-ink border-[3px] border-ink bg-paper shadow-brutal-sm hover:shadow-brutal transition-shadow"
            >
              <FileText size={14} />
              CV
            </motion.a>
            <CalendlyButton />
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-ink border-[3px] border-ink bg-lime shadow-brutal-sm"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-paper border-b-[3px] border-ink overflow-hidden"
          >
            <div className="flex flex-col px-5 py-4 gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-ink font-mono font-bold uppercase tracking-wider border-b-2 border-ink/10 px-1 py-3 text-sm hover:text-violet transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="flex items-center gap-3 mt-4">
                <a
                  href="/resume.pdf"
                  target="_blank"
                  className="flex items-center gap-2 px-4 py-2.5 text-sm font-mono font-bold uppercase text-ink border-[3px] border-ink bg-paper shadow-brutal-sm"
                >
                  <FileText size={14} />
                  Resume
                </a>
                <CalendlyButton variant="outline" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
