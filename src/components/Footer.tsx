import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="relative border-t-[3px] border-ink bg-ink overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-14">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <span className="w-11 h-11 bg-lime text-ink grid place-items-center font-heading font-extrabold text-base border-[3px] border-paper">
              DJ
            </span>
            <div>
              <p className="font-heading font-extrabold uppercase text-paper tracking-tight">Daniel Jayasurya</p>
              <p className="text-xs font-mono text-paper/60 uppercase tracking-wider">Full Stack Engineer · MERN</p>
            </div>
          </div>

          {/* Nav */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
            {["About", "Skills", "Experience", "Projects", "Contact"].map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                className="text-paper/70 font-mono font-bold uppercase tracking-wider hover:text-lime transition-colors"
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
              { icon: Mail, href: "mailto:danieljayasuryae@gmail.com", label: "Email" },
            ].map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                whileHover={{ x: -2, y: -2 }}
                className="p-2.5 bg-paper border-[3px] border-paper text-ink hover:bg-lime transition-colors"
              >
                <Icon size={16} />
              </motion.a>
            ))}
            <motion.a
              href="#"
              whileHover={{ x: -2, y: -2 }}
              aria-label="Back to top"
              className="p-2.5 bg-lime border-[3px] border-paper text-ink ml-1"
            >
              <ArrowUp size={16} />
            </motion.a>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t-[3px] border-paper/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-paper/50 uppercase tracking-wider">
          <p>
            Designed & built by{" "}
            <span className="text-lime font-bold">Daniel Jayasurya</span>
          </p>
          <p>&copy; {new Date().getFullYear()} · All rights reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
