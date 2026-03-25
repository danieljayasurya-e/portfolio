import { Github, Linkedin, Mail } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="py-16 text-center border-t border-slate-800/50 bg-[#0a0f1e] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/[0.02] to-transparent" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-center gap-6 mb-8">
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
              whileHover={{ scale: 1.2, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="text-slate-500 hover:text-cyan-400 transition-colors duration-300"
            >
              <Icon size={18} />
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="space-y-2"
        >
          <p className="text-slate-600 text-xs font-mono tracking-wider">
            Designed & Built by Daniel Jayasurya
          </p>
          <p className="text-slate-700 text-xs font-mono">
            &copy; {new Date().getFullYear()} All Rights Reserved
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
