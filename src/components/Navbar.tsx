import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, FileText } from "lucide-react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
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
    <>
      {/* Desktop Sidebar */}
      <motion.nav
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="hidden md:fixed md:left-0 md:top-0 md:h-screen md:w-64 md:bg-editorial-dark md:border-r md:border-accent/20 md:z-40 md:p-8 md:flex md:flex-col"
      >
        {/* Logo */}
        <motion.a
          href="/"
          className="mb-16 font-display text-2xl font-bold text-accent"
        >
          DJ
        </motion.a>

        {/* Nav Links */}
        <nav className="flex-1 flex flex-col gap-8">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.href}
              href={link.href}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`text-sm tracking-wide transition-colors ${
                activeSection === link.href.slice(1)
                  ? "text-accent font-bold"
                  : "text-editorial-text-muted hover:text-accent"
              }`}
            >
              {link.label}
            </motion.a>
          ))}
        </nav>

        {/* Footer Links */}
        <div className="flex flex-col gap-4 border-t border-accent/20 pt-8">
          <motion.a
            href="/resume.pdf"
            target="_blank"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex items-center gap-2 text-sm text-editorial-text-muted hover:text-accent transition-colors"
          >
            <FileText size={16} />
            Resume
          </motion.a>
        </div>
      </motion.nav>

      {/* Mobile Header */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="md:hidden fixed top-0 left-0 right-0 z-50 bg-editorial-dark border-b border-accent/20 px-6 py-4"
      >
        <div className="flex items-center justify-between">
          <motion.a href="/" className="font-display text-2xl font-bold text-accent">
            DJ
          </motion.a>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-accent hover:text-accent/80 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden fixed top-16 left-0 right-0 z-40 bg-editorial-dark border-b border-accent/20"
          >
            <div className="flex flex-col px-6 py-6 gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-editorial-text hover:text-accent transition-colors text-sm tracking-wide"
                >
                  {link.label}
                </a>
              ))}
              <div className="border-t border-accent/20 pt-6">
                <a
                  href="/resume.pdf"
                  target="_blank"
                  className="flex items-center gap-2 text-sm text-editorial-text hover:text-accent transition-colors"
                >
                  <FileText size={16} />
                  Resume
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
