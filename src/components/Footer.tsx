import { Github, Linkedin, Mail, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 text-center border-t border-border/30">
      <div className="flex items-center justify-center gap-6 mb-6">
        <a href="https://github.com/danieljayasurya" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
          <Github size={18} />
        </a>
        <a href="https://www.linkedin.com/in/daniel-jayasurya-e-a0a25b1ba" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
          <Linkedin size={18} />
        </a>
        <a href="mailto:danieljayasurya@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
          <Mail size={18} />
        </a>
      </div>
      <div className="mt-6 text-center text-slate-600 text-xs font-mono">
        © {new Date().getFullYear()} Daniel Jayasurya · All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;
