import { useState } from "react";
import { PopupModal } from "react-calendly";
import { Calendar } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  variant?: "default" | "outline";
}

const CalendlyButton = ({ variant = "default" }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        whileHover={{ x: -2, y: -2 }}
        whileTap={{ x: 2, y: 2 }}
        className={
          variant === "outline"
            ? "inline-flex items-center gap-2 px-4 py-2.5 text-sm font-mono font-bold uppercase text-ink bg-paper border-[3px] border-ink shadow-brutal-sm transition-shadow hover:shadow-brutal"
            : "inline-flex items-center gap-2 px-5 py-2.5 text-sm font-mono font-bold uppercase text-ink bg-violet border-[3px] border-ink shadow-brutal-sm transition-shadow hover:shadow-brutal"
        }
      >
        <Calendar size={14} />
        Book a Call
      </motion.button>

      {isOpen && (
        <PopupModal
          url="https://calendly.com/danieljayasuryae"
          onModalClose={() => setIsOpen(false)}
          open={isOpen}
          rootElement={document.getElementById("root") as HTMLElement}
        />
      )}
    </>
  );
};

export default CalendlyButton;
