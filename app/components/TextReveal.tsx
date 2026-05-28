"use client";

import { motion } from "framer-motion";
import React, { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface TextRevealProps {
  children: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  duration?: number;
  staggerChildren?: number;
}

export const TextReveal = ({
  children,
  as: Component = "div",
  className = "",
  delay = 0,
  duration = 0.5,
  staggerChildren = 0.05,
}: TextRevealProps) => {
  const words = children.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: staggerChildren, delayChildren: delay * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
        duration: duration,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      filter: "blur(10px)",
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
      },
    },
  };

  return React.createElement(
    Component,
    { className: cn("overflow-hidden flex flex-wrap", className) },
    <motion.span
      style={{ display: "inline-flex", flexWrap: "wrap" }}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px" }}
    >
      {words.map((word, index) => (
        <motion.span
          variants={child}
          style={{ display: "inline-block", marginRight: "0.25em", paddingBottom: "0.1em", marginTop: "-0.1em" }}
          key={index}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
};
