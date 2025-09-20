"use client";
import { useEffect, useState } from "react";

export default function ProgressBar() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const docHeight = scrollHeight - clientHeight;
      const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setWidth(scrolled);
    };
    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onScroll);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: `${width}%`, 
        height: "6px",
        background: "#1976d2",
        zIndex: 99999,
        transition: "width 0.15s ease",
        pointerEvents: "none",
      }}
    />
  );
}
