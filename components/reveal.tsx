"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Smooth scroll-in reveal.
 *
 * Motion-performance rules applied:
 * - animates only `transform` + `opacity` (compositor-friendly, no paint/layout)
 * - uses IntersectionObserver for visibility (never polls scroll position)
 * - observes once, then disconnects (guaranteed stop condition)
 * - `will-change` applied only while hidden, then removed (surgical)
 * - reduced motion handled in CSS (content always visible)
 * - state changes happen only inside the async observer callback
 */
export default function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(20px)",
        transition:
          "opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1)",
        transitionDelay: shown ? `${delay}ms` : "0ms",
        willChange: shown ? "auto" : "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}
