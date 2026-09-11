"use client";

import React, { useEffect, useRef, useState } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right" | "fade" | "scale";
  delay?: number; // in milliseconds
  duration?: number; // in milliseconds
  className?: string;
  once?: boolean;
}

export function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 700,
  className = "",
  once = true,
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Check if IntersectionObserver is supported
    if (!("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (once) {
              observer.unobserve(entry.target);
            }
          } else if (!once) {
            setIsVisible(false);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [once]);

  const getInitialStyle = (): React.CSSProperties => {
    const base: React.CSSProperties = {
      opacity: isVisible ? 1 : 0,
      transitionProperty: "opacity, transform",
      transitionDuration: `${duration}ms`,
      transitionDelay: `${delay}ms`,
      transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
      willChange: "opacity, transform",
    };

    if (isVisible) {
      return {
        ...base,
        transform: "translate3d(0, 0, 0) scale(1)",
      };
    }

    switch (direction) {
      case "up":
        return {
          ...base,
          transform: "translate3d(0, 36px, 0)",
        };
      case "down":
        return {
          ...base,
          transform: "translate3d(0, -36px, 0)",
        };
      case "left":
        return {
          ...base,
          transform: "translate3d(36px, 0, 0)",
        };
      case "right":
        return {
          ...base,
          transform: "translate3d(-36px, 0, 0)",
        };
      case "scale":
        return {
          ...base,
          transform: "translate3d(0, 20px, 0) scale(0.95)",
        };
      case "fade":
      default:
        return {
          ...base,
          transform: "translate3d(0, 0, 0)",
        };
    }
  };

  return (
    <div ref={elementRef} style={getInitialStyle()} className={className}>
      {children}
    </div>
  );
}
