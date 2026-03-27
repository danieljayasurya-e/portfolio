import { useState, useEffect, useCallback, useRef } from "react";
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

const MagneticNavLink = ({ children, href, isActive, index }: { children: React.ReactNode; href: string; isActive: boolean; index: number }) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouse = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.15;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.15;
    setPos({ x, y });
  }, []);

  return (
    <motion.a
      ref={ref}
      href={href}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0, x: pos.x, ...({ y: pos.y } as any) }}
      transition={{ delay: 0.1 * index, type: "spring", stiffness: 200, damping: 15 }}
      onMouseMove={handleMouse}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      className={`relative px-4 py-2 text-sm transition-colors duration-200 group font-body ${
        isActive ? "text-[#00f0ff]" : "text-slate-400 hover:text-[#00f0ff]"
      }`}
    >
      <span className="text-[#00f0ff]/50 text-xs mr-1 font-mono">0{index + 1}.</span>
      {children}
      <span className={`absolute bottom-0 left-4 right-4 h-px transition-transform duration-300 origin-left ${
        isActive
          ? "scale-x-100 bg-gradient-to-r from-[#00f0ff] to-[#a855f7]"
          : "scale-x-0 group-hover:scale-x-100 bg-[#00f0ff]/60"
      }`} />
      {isActive && (
        <motion.div
          layoutId="nav-active"
          className="absolute inset-0 bg-[#00f0ff]/[0.05] rounded-lg border border-[#00f0ff]/10"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
    </motion.a>
  );
};

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${scrolled
        ? "bg-[#050510]/60 backdrop-blur-2xl border-b border-[#00f0ff]/[0.07] shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
        : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              <MagneticNavLink
                key={link.href}
                href={link.href}
                isActive={activeSection === link.href.slice(1)}
                index={i}
              >
                {link.label}
              </MagneticNavLink>
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
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(0,240,255,0.15)" }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-4 py-2 text-sm text-[#00f0ff] border border-[#00f0ff]/30 rounded-xl hover:bg-[#00f0ff]/[0.07] transition-all duration-300 backdrop-blur-sm font-body"
            >
              <FileText size={14} />
              Resume
            </motion.a>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-slate-400 hover:text-[#00f0ff] transition-colors"
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
            className="md:hidden bg-[#050510]/95 backdrop-blur-2xl border-b border-[#00f0ff]/10"
          >
            <div className="flex flex-col px-6 py-4 gap-4">
              {navLinks.map((link, i) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-slate-400 hover:text-[#00f0ff] transition-colors py-2 border-b border-slate-800/50 last:border-0 font-body"
                >
                  <span className="text-[#00f0ff]/50 text-xs mr-2 font-mono">0{i + 1}.</span>
                  {link.label}
                </a>
              ))}
              <div className="flex items-center gap-3 mt-2">
                <CalendlyButton variant="outline" />
                <a
                  href="/resume.pdf"
                  target="_blank"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-[#00f0ff] border border-[#00f0ff]/30 rounded-lg hover:bg-[#00f0ff]/10 transition-all font-body"
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
