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
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className={
          variant === "outline"
            ?
              "flex items-center gap-2 px-4 py-2 text-sm text-cyan-400 border border-cyan-400/50 rounded-lg hover:bg-cyan-400/10 transition-all"
            :
              "inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-medium rounded-xl shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all"
        }
      >
        <Calendar size={14} />
        Schedule a Call
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
