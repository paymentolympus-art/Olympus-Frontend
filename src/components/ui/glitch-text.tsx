"use client";

/**
 * @author: @dorian_baffier
 * @description: Glitch Text
 * @version: 1.0.0
 * @date: 2025-06-26
 * @license: MIT
 * @website: https://kokonutui.com
 * @github: https://github.com/kokonut-labs/kokonutui
 */

import { useRef } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface GlitchTextProps {
  text: string;
  className?: string;
  glitchIntensity?: "light" | "medium" | "heavy" | "extreme";
  color?:
    | "rainbow"
    | "blue"
    | "purple"
    | "cyan"
    | "pink"
    | "orange"
    | "gradient-orange";
  backgroundColor?: string;
  isStatic?: boolean;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | number;
  fontWeight?: number;
  letterSpacing?: number;
}

const GlitchText = ({
  text = "Glitch Text",
  className,
  glitchIntensity = "medium",
  color = "gradient-orange",
  isStatic = false,
  size = "md",
  fontWeight = 700,
  letterSpacing = 5,
}: GlitchTextProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Check if browser supports OKLCH (for iPhone compatibility)
  const supportsOKLCH =
    typeof CSS !== "undefined" && CSS.supports("color", "oklch(0% 0 0)");

  // Vibrant color schemes with RGB fallbacks for iPhone compatibility
  const colorSchemes = {
    rainbow: {
      primary: supportsOKLCH
        ? "oklch(0.85 0.2 var(--rainbow-hue, 270))"
        : "rgb(200, 150, 255)",
      before: supportsOKLCH
        ? "oklch(0.9 0.15 calc(var(--rainbow-hue, 270) + 60))"
        : "rgb(220, 170, 255)",
      after: supportsOKLCH
        ? "oklch(0.8 0.25 calc(var(--rainbow-hue, 270) - 60))"
        : "rgb(180, 130, 255)",
    },
    blue: {
      primary: supportsOKLCH ? "oklch(0.65 0.2 250)" : "rgb(59, 130, 246)", // Vibrant blue
      before: supportsOKLCH ? "oklch(0.75 0.15 255)" : "rgb(96, 165, 250)", // Lighter blue
      after: supportsOKLCH ? "oklch(0.55 0.25 245)" : "rgb(37, 99, 235)", // Deeper blue
    },
    purple: {
      primary: supportsOKLCH ? "oklch(0.6 0.22 290)" : "rgb(147, 51, 234)", // Rich purple
      before: supportsOKLCH ? "oklch(0.7 0.18 295)" : "rgb(168, 85, 247)", // Lighter purple
      after: supportsOKLCH ? "oklch(0.5 0.25 285)" : "rgb(126, 34, 206)", // Deep purple
    },
    cyan: {
      primary: supportsOKLCH ? "oklch(0.8 0.15 200)" : "rgb(34, 211, 238)", // Bright cyan
      before: supportsOKLCH ? "oklch(0.85 0.12 205)" : "rgb(103, 232, 249)", // Light cyan
      after: supportsOKLCH ? "oklch(0.7 0.18 195)" : "rgb(6, 182, 212)", // Deep cyan
    },
    pink: {
      primary: supportsOKLCH ? "oklch(0.7 0.25 330)" : "rgb(236, 72, 153)", // Vibrant pink
      before: supportsOKLCH ? "oklch(0.8 0.2 335)" : "rgb(244, 114, 182)", // Light pink
      after: supportsOKLCH ? "oklch(0.6 0.28 325)" : "rgb(219, 39, 119)", // Deep pink
    },
    orange: {
      primary: supportsOKLCH ? "oklch(0.7 0.25 45)" : "rgb(249, 115, 22)", // Vibrant tangerine orange
      before: supportsOKLCH ? "oklch(0.85 0.2 40)" : "rgb(251, 146, 60)", // Warm light orange
      after: supportsOKLCH ? "oklch(0.6 0.28 50)" : "rgb(234, 88, 12)", // Deep sunset orange
    },
    "gradient-orange": {
      primary: supportsOKLCH
        ? "linear-gradient(135deg, oklch(0.7 0.25 45) 0%, oklch(0.75 0.28 30) 50%, oklch(0.65 0.3 60) 100%)"
        : "linear-gradient(135deg, rgb(249, 115, 22) 0%, rgb(251, 146, 60) 50%, rgb(234, 88, 12) 100%)",
      before: supportsOKLCH
        ? "linear-gradient(135deg, oklch(0.85 0.2 40) 0%, oklch(0.8 0.22 25) 50%, oklch(0.75 0.25 55) 100%)"
        : "linear-gradient(135deg, rgb(251, 146, 60) 0%, rgb(253, 186, 116) 50%, rgb(249, 115, 22) 100%)",
      after: supportsOKLCH
        ? "linear-gradient(135deg, oklch(0.6 0.28 50) 0%, oklch(0.55 0.3 35) 50%, oklch(0.5 0.32 65) 100%)"
        : "linear-gradient(135deg, rgb(234, 88, 12) 0%, rgb(194, 65, 12) 50%, rgb(154, 52, 18) 100%)",
    },
  };

  const selectedScheme = colorSchemes[color];

  // Glitch intensity settings
  const intensitySettings = {
    light: {
      animationDuration: "2s",
      translateRange: 2,
      opacityRange: [0.8, 0.9],
      skewRange: 0.5,
    },
    medium: {
      animationDuration: "1s",
      translateRange: 3,
      opacityRange: [0.7, 0.85],
      skewRange: 1,
    },
    heavy: {
      animationDuration: "0.5s",
      translateRange: 5,
      opacityRange: [0.6, 0.8],
      skewRange: 2,
    },
    extreme: {
      animationDuration: "0.3s",
      translateRange: 8,
      opacityRange: [0.5, 0.75],
      skewRange: 3,
    },
  };

  const settings = intensitySettings[glitchIntensity];

  const sizeMap = {
    sm: "text-2xl",
    md: "text-4xl",
    lg: "text-5xl",
    xl: "text-6xl",
    "2xl": "text-7xl",
    "3xl": "text-8xl",
  };

  // Animation variants for the glitch effect
  const glitchAnimation = {
    initial: {
      transform: "translate(0)",
      opacity: settings.opacityRange[1],
    },
    animate: {
      transform: [
        "translate(0)",
        `translate(${
          settings.translateRange
        }px, ${-settings.translateRange}px) skew(${settings.skewRange}deg)`,
        `translate(${-settings.translateRange}px, ${
          settings.translateRange
        }px) skew(${-settings.skewRange}deg)`,
        `translate(${-settings.translateRange}px, ${-settings.translateRange}px) skew(${
          settings.skewRange
        }deg)`,
        `translate(${settings.translateRange}px, ${
          settings.translateRange
        }px) skew(${-settings.skewRange}deg)`,
        "translate(0)",
      ],
      opacity: [
        settings.opacityRange[1],
        settings.opacityRange[0],
        settings.opacityRange[1],
        settings.opacityRange[0],
        settings.opacityRange[1],
      ],
      transition: {
        duration: Number(settings.animationDuration.replace("s", "")),
        ease: [0.25, 0.46, 0.45, 0.94],
        repeat: Number.POSITIVE_INFINITY,
      },
    },
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex items-center justify-center",
        "overflow-visible p-8",
        className
      )}
    >
      <motion.div
        className={cn(
          "relative font-bold tracking-wider",
          typeof size === "string" ? sizeMap[size] : ""
        )}
        style={{
          fontSize: typeof size === "number" ? `${size}px` : undefined,
          fontWeight,
          letterSpacing,
          color: selectedScheme.primary,
          textShadow: `0 0 5px ${selectedScheme.primary}40`,
        }}
        initial="initial"
        animate={!isStatic ? "animate" : "initial"}
        variants={glitchAnimation as any}
      >
        {text}

        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            color: selectedScheme.before,
            textShadow: `0 0 7px ${selectedScheme.before}40`,
          }}
          initial="initial"
          animate={!isStatic ? "animate" : "initial"}
          variants={{
            ...(glitchAnimation as any),
            animate: {
              ...(glitchAnimation as any).animate,
              transform: [
                "translate(0)",
                `translate(${-settings.translateRange}px, ${
                  settings.translateRange
                }px) skew(${-settings.skewRange}deg)`,
                `translate(${
                  settings.translateRange
                }px, ${-settings.translateRange}px) skew(${
                  settings.skewRange
                }deg)`,
                `translate(${settings.translateRange}px, ${
                  settings.translateRange
                }px) skew(${-settings.skewRange}deg)`,
                `translate(${-settings.translateRange}px, ${-settings.translateRange}px) skew(${
                  settings.skewRange
                }deg)`,
                "translate(0)",
              ],
            },
          }}
        >
          {text}
        </motion.div>

        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            color: selectedScheme.after,
            textShadow: `0 0 7px ${selectedScheme.after}40`,
          }}
          initial="initial"
          animate={!isStatic ? "animate" : "initial"}
          variants={{
            ...(glitchAnimation as any),
            animate: {
              ...(glitchAnimation as any).animate,
              transform: [
                "translate(0)",
                `translate(${
                  settings.translateRange
                }px, ${-settings.translateRange}px) skew(${
                  settings.skewRange
                }deg)`,
                `translate(${-settings.translateRange}px, ${
                  settings.translateRange
                }px) skew(${-settings.skewRange}deg)`,
                `translate(${-settings.translateRange}px, ${
                  settings.translateRange
                }px) skew(${settings.skewRange}deg)`,
                `translate(${
                  settings.translateRange
                }px, ${-settings.translateRange}px) skew(${-settings.skewRange}deg)`,
                "translate(0)",
              ],
            },
          }}
        >
          {text}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default GlitchText;
