"use client";

import { useEffect } from "react";

export function ThemeToggle() {
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const preference = stored ? stored === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.dataset.theme = preference ? "dark" : "light";
  }, []);
  function toggle() {
    const next = document.documentElement.dataset.theme !== "dark";
    document.documentElement.dataset.theme = next ? "dark" : "light";
    localStorage.setItem("theme", next ? "dark" : "light");
  }
  return <button className="theme-toggle" type="button" onClick={toggle} aria-label="Toggle color theme" title="Toggle color theme"><span aria-hidden="true">◐</span></button>;
}
