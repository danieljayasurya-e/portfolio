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
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97 }}
        className={
          variant === "outline"
            ? "inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-brand-600 bg-white border border-brand-200 rounded-xl hover:bg-brand-50 hover:border-brand-300 transition-all"
            : "btn-primary !px-5 !py-2.5 text-sm"
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
