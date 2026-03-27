import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CursorGlow = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const glowX = useSpring(cursorX, springConfig);
  const glowY = useSpring(cursorY, springConfig);

  const trailX = useSpring(cursorX, { damping: 40, stiffness: 90, mass: 1 });
  const trailY = useSpring(cursorY, { damping: 40, stiffness: 90, mass: 1 });

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [cursorX, cursorY]);

  return (
    <>
      <motion.div
        className="fixed pointer-events-none z-[9998]"
        style={{
          x: glowX,
          y: glowY,
          translateX: "-50%",
          translateY: "-50%",
          width: 500,
          height: 500,
          background: "radial-gradient(circle, rgba(0,240,255,0.06) 0%, rgba(168,85,247,0.02) 40%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(40px)",
        }}
      />
      <motion.div
        className="fixed pointer-events-none z-[9998]"
        style={{
          x: trailX,
          y: trailY,
          translateX: "-50%",
          translateY: "-50%",
          width: 300,
          height: 300,
          background: "radial-gradient(circle, rgba(168,85,247,0.04) 0%, transparent 60%)",
          borderRadius: "50%",
          filter: "blur(60px)",
        }}
      />
      <motion.div
        className="fixed pointer-events-none z-[9998] hidden md:block"
        style={{
          x: glowX,
          y: glowY,
          translateX: "-50%",
          translateY: "-50%",
          width: 8,
          height: 8,
          background: "rgba(0,240,255,0.6)",
          borderRadius: "50%",
          boxShadow: "0 0 15px 5px rgba(0,240,255,0.3)",
        }}
      />
    </>
  );
};

export default CursorGlow;
