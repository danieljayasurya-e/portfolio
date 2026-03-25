import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
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
      setScrolled(window.scrollY > 50);
      const sections = navLinks.map(l => l.href.slice(1));
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
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
        ? "bg-[#0a0f1e]/80 backdrop-blur-2xl border-b border-cyan-500/10 shadow-lg shadow-black/20"
        : "bg-transparent"
        }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          <motion.a
            href="#"
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2"
          >
            <img
              src="/logo.svg"
              alt="Daniel Jayasurya"
              className="h-9 w-9 rounded-full object-cover brightness-0 invert"
            />
          </motion.a>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
                className={`relative px-4 py-2 text-sm transition-colors duration-200 group ${
                  activeSection === link.href.slice(1) ? "text-cyan-400" : "text-slate-400 hover:text-cyan-400"
                }`}
              >
                <span className="text-cyan-500 text-xs mr-1">0{i + 1}.</span>
                {link.label}
                <span className={`absolute bottom-0 left-4 right-4 h-px bg-cyan-400 transition-transform duration-300 origin-left ${
                  activeSection === link.href.slice(1) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                }`} />
              </motion.a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <CalendlyButton />
            <motion.a
              href="/resume.pdf"
              target="_blank"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-4 py-2 text-sm text-cyan-400 border border-cyan-400/50 rounded-lg hover:bg-cyan-400/10 transition-all duration-200 backdrop-blur-sm"
            >
              <FileText size={14} />
              Resume
            </motion.a>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-slate-400 hover:text-cyan-400 transition-colors"
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
            className="md:hidden bg-[#0a0f1e]/95 backdrop-blur-2xl border-b border-cyan-500/10"
          >
            <div className="flex flex-col px-6 py-4 gap-4">
              {navLinks.map((link, i) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-slate-400 hover:text-cyan-400 transition-colors py-2 border-b border-slate-800 last:border-0"
                >
                  <span className="text-cyan-500 text-xs mr-2">0{i + 1}.</span>
                  {link.label}
                </a>
              ))}
              <div className="flex items-center gap-3 mt-2">
                <CalendlyButton variant="outline" />
                <a
                  href="/resume.pdf"
                  target="_blank"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-cyan-400 border border-cyan-400/50 rounded-lg hover:bg-cyan-400/10 transition-all"
                >
                  <FileText size={14} />
                  Resume
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
