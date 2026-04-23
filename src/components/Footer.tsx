import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="relative border-t border-brand-100 bg-gradient-to-b from-white to-surface-soft overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-300 to-transparent opacity-60" />
      <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-200/25 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-14">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-brand-gradient text-white grid place-items-center font-heading font-bold text-sm shadow-glow">
              DJ
            </span>
            <div>
              <p className="font-heading font-semibold text-ink">
                Daniel Jayasurya
              </p>
              <p className="text-xs text-ink-soft">Full Stack Engineer · MERN</p>
            </div>
          </div>

          {/* Nav */}
          <div className="flex flex-wrap items-center gap-6 text-sm">
            {["About", "Skills", "Experience", "Projects", "Contact"].map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                className="text-ink-muted hover:text-brand-600 transition-colors"
              >
                {l}
              </a>
            ))}
          </div>

          {/* Socials */}
          <div className="flex items-center gap-2">
            {[
              { icon: Github, href: "https://github.com/danieljayasurya", label: "GitHub" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/daniel-jayasurya-e-a0a25b1ba", label: "LinkedIn" },
              { icon: Mail, href: "mailto:danieljayasurya@gmail.com", label: "Email" },
            ].map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-2.5 rounded-xl bg-white border border-brand-100 text-ink-muted hover:text-brand-600 hover:border-brand-300 hover:shadow-card transition-all"
              >
                <Icon size={16} />
              </motion.a>
            ))}
            <motion.a
              href="#"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Back to top"
              className="p-2.5 rounded-xl bg-brand-gradient text-white shadow-glow ml-1"
            >
              <ArrowUp size={16} />
            </motion.a>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-brand-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-ink-soft">
          <p>
            Designed & built by{" "}
            <span className="text-ink font-medium">Daniel Jayasurya</span>
          </p>
          <p>
            &copy; {new Date().getFullYear()} · All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
