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

const PillNavLink = ({
  children,
  href,
  isActive,
  index,
}: {
  children: React.ReactNode;
  href: string;
  isActive: boolean;
  index: number;
}) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouse = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.08;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.08;
    setPos({ x, y });
  }, []);

  return (
    <motion.a
      ref={ref}
      href={href}
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0, x: pos.x, ...({ y: pos.y } as any) }}
      transition={{ delay: 0.05 * index, type: "spring", stiffness: 220, damping: 18 }}
      onMouseMove={handleMouse}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      className={`relative px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${
        isActive
          ? "text-brand-600"
          : "text-ink-muted hover:text-brand-600"
      }`}
    >
      <span className="relative z-10">{children}</span>
      {isActive && (
        <motion.div
          layoutId="nav-active-pill"
          className="absolute inset-0 rounded-full bg-brand-50 border border-brand-100"
          transition={{ type: "spring", stiffness: 350, damping: 32 }}
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
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/75 backdrop-blur-xl border-b border-brand-100/60 shadow-[0_2px_20px_rgba(108,92,231,0.06)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.a
            href="#"
            whileHover={{ scale: 1.03 }}
            className="flex items-center gap-2.5"
          >
            <span className="w-9 h-9 rounded-xl bg-brand-gradient text-white grid place-items-center font-heading font-bold text-sm shadow-glow">
              DJ
            </span>
            <span className="hidden sm:block font-heading font-semibold text-ink tracking-tight">
              Daniel<span className="text-brand-500">.</span>
            </span>
          </motion.a>

          <nav className="hidden md:flex items-center gap-1 bg-white/60 backdrop-blur-xl border border-brand-100/60 rounded-full p-1 shadow-soft">
            {navLinks.map((link, i) => (
              <PillNavLink
                key={link.href}
                href={link.href}
                isActive={activeSection === link.href.slice(1)}
                index={i}
              >
                {link.label}
              </PillNavLink>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2.5">
            <motion.a
              href="/resume.pdf"
              target="_blank"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-ink-muted hover:text-brand-600 transition-colors"
            >
              <FileText size={14} />
              Resume
            </motion.a>
            <CalendlyButton />
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-ink-muted hover:text-brand-600 transition-colors rounded-lg"
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
            className="md:hidden bg-white/95 backdrop-blur-xl border-b border-brand-100"
          >
            <div className="flex flex-col px-6 py-4 gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-ink-muted hover:text-brand-600 hover:bg-brand-50 rounded-lg px-3 py-2.5 text-sm font-medium transition-all"
                >
                  {link.label}
                </a>
              ))}
              <div className="flex items-center gap-3 mt-3 pt-3 border-t border-brand-100">
                <a
                  href="/resume.pdf"
                  target="_blank"
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-brand-600 border border-brand-200 rounded-xl hover:bg-brand-50 transition-all"
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
