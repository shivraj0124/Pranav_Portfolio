"use client";

import React,{useState,useEffect} from 'react'
const T = {
  blue: "#0E49FF",
  yellow: "#FACC15",
  fuchsia: "#D946EF",
};
type NavbarProps = {
  dark: boolean;
  toggleTheme: () => void;
};
function Navbar({ dark, toggleTheme }:NavbarProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
 
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
 
  const links = ["Home", "About", "Skills","Work", "Experience", "Contact"];
 
  const navBg = dark
    ? scrolled ? "bg-[#0a0a1a]/90 border-white/10 shadow-[0_4px_40px_rgba(14,73,255,0.15)]" : "bg-transparent border-transparent"
    : scrolled ? "bg-white/90 border-black/10 shadow-[0_4px_40px_rgba(14,73,255,0.10)]" : "bg-transparent border-transparent";
 
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b backdrop-blur-md ${navBg}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0E49FF] text-white font-black text-sm shadow-[0_0_16px_rgba(14,73,255,0.7)]">P</span>
          <span className={`font-black tracking-tight text-lg ${dark ? "text-white" : "text-[#0a0a1a]"}`}>
            Pranav<span className="text-[#0E49FF]">.</span>
          </span>
        </a>
 
        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all hover:bg-[#0E49FF]/10 hover:text-[#0E49FF] ${dark ? "text-white/70" : "text-black/60"}`}
            >
              {l}
            </a>
          ))}
        </div>
 
        {/* Right controls */}
        <div className="flex items-center gap-3">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className={`cursor-pointer relative h-7 w-14 rounded-full transition-colors duration-300 ${dark ? "bg-[#0E49FF]" : "bg-[#0E49FF]/20"}`}
            aria-label="Toggle theme"
          >
            <span className={`absolute top-1 h-5 w-5 rounded-full transition-all duration-300 flex items-center justify-center text-xs ${dark ? "left-8 bg-[#FACC15] shadow-[0_0_8px_rgba(250,204,21,0.8)]" : "left-1 bg-white shadow"}`}>
              {dark ? "☀" : "☾"}
            </span>
          </button>
 
          {/* CTA — desktop */}
          <a
            href="#contact"
            className="hidden md:inline-flex items-center gap-1.5 rounded-full bg-[#0E49FF] px-5 py-2 text-xs font-semibold text-white shadow-[0_0_20px_rgba(14,73,255,0.4)] transition-all hover:shadow-[0_0_30px_rgba(14,73,255,0.7)] hover:scale-105"
          >
            Hire Me
          </a>
 
          {/* Hamburger */}
          <button
            className={`flex md:hidden flex-col gap-1.5 p-1 ${dark ? "text-white" : "text-black"}`}
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
          >
            <span className={`block h-0.5 w-6 rounded-full bg-current transition-all duration-300 ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-6 rounded-full bg-current transition-all duration-300 ${open ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-6 rounded-full bg-current transition-all duration-300 ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </button>
        </div>
      </div>
 
      {/* Mobile drawer */}
      <div className={`md:hidden overflow-hidden transition-all duration-400 ${open ? "max-h-100" : "max-h-0"}`}>
        <div className={`flex flex-col gap-1 px-5 pb-5 pt-2 ${dark ? "bg-[#0a0a1a]/95" : "bg-white/95"}`}>
          {links.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              onClick={() => setOpen(false)}
              className={`rounded-xl px-4 py-3 text-sm font-medium transition-colors hover:bg-[#0E49FF]/10 hover:text-[#0E49FF] ${dark ? "text-white/80" : "text-black/70"}`}
            >
              {l}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-full bg-[#0E49FF] px-5 py-3 text-center text-sm font-semibold text-white"
          >
            Hire Me →
          </a>
        </div>
      </div>
    </nav>
  );
}



export default Navbar
