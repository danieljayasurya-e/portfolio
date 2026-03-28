import { Github, Linkedin, Mail } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="py-12 border-t border-accent/20 bg-editorial-dark relative md:ml-64">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col items-center justify-center gap-8">
          {/* Social links */}
          <div className="flex items-center justify-center gap-6">
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
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="text-editorial-text-muted hover:text-accent transition-colors"
              >
                <Icon size={20} />
              </motion.a>
            ))}
          </div>

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center space-y-1"
          >
            <p className="text-editorial-text-muted text-xs tracking-wide">
              Designed & built by Daniel Jayasurya
            </p>
            <p className="text-editorial-text-muted/50 text-xs">
              &copy; {new Date().getFullYear()} All rights reserved.
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
