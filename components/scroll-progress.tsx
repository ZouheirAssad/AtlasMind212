"use client";

import { m, useScroll, useSpring } from "motion/react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 160, damping: 30, restDelta: 0.001 });

  return (
    <m.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-50 h-1 origin-left bg-primary shadow-[0_0_12px_rgb(56_221_251/0.55)]"
      style={{ scaleX }}
    />
  );
}
