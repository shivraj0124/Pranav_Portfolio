import { ServicePill } from "../ui/ServicePill";
import React from "react";
const T = {
  blue: "#0E49FF",
  yellow: "#FACC15",
  fuchsia: "#D946EF",
};
export default function Hero({ dark }) {
  return (
    <section id="home" className={`relative min-h-screen overflow-hidden ${dark ? "bg-[#060614] text-white" : "bg-[#f0f4ff] text-[#0a0a1a]"}`}>
      {/* Grid */}
      <div className={`absolute inset-0 bg-[linear-gradient(${dark ? "rgba(255,255,255,.06)" : "rgba(14,73,255,.07)"}._1px,transparent_1px),linear-gradient(90deg,${dark ? "rgba(255,255,255,.06)" : "rgba(14,73,255,.07)"}_1px,transparent_1px)] bg-[size:52px_52px] [mask-image:radial-gradient(ellipse_at_60%_40%,black_30%,transparent_80%)]`} />
 
      {/* Glows */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-[#0E49FF]/25 blur-[130px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-20 h-[500px] w-[500px] rounded-full bg-fuchsia-500/20 blur-[150px]" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-yellow-400/10 blur-[100px]" />
 
      {/* Stars */}
      {[
        "absolute left-[8%] top-[18%] text-yellow-400/90 text-3xl animate-pulse",
        "absolute right-[10%] top-[30%] text-white/30 text-xl",
        "absolute left-[20%] bottom-[25%] text-yellow-400/60 text-2xl",
        "absolute right-[25%] bottom-[15%] text-[#0E49FF]/60 text-xl",
      ].map((cls, i) => <div key={i} className={`pointer-events-none select-none ${cls}`}>✦</div>)}
 
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-6 pt-20 pb-24 text-center">
        {/* Badge */}
        <div className={`inline-flex items-center gap-3 rounded-full border px-5 py-2 text-[10px] font-semibold uppercase tracking-[0.35em] backdrop-blur-md
          ${dark ? "border-white/15 bg-white/5 text-white/70" : "border-[#0E49FF]/20 bg-[#0E49FF]/5 text-[#0E49FF]/80"}`}>
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
          Available for work · 2026
        </div>
 
        {/* Name chip */}
        <div className="mt-8 relative">
          <span className="inline-block rotate-[-1.5deg] rounded-2xl bg-[#FACC15] px-6 py-3 text-base sm:text-lg font-black text-black shadow-[5px_5px_0_0_rgba(0,0,0,0.85)] hover:rotate-0 hover:scale-105 transition-all duration-300 cursor-default">
            Pranav Pangarikar
          </span>
        </div>
 
        {/* Role */}
        <p className={`mt-7 text-[10px] sm:text-xs font-bold uppercase tracking-[0.7em] ${dark ? "text-white/60" : "text-black/50"}`}>
          — Graphic Designer & Visual Storyteller —
        </p>
 
        {/* Headline */}
        <h1 className="mt-8 font-black leading-none tracking-tighter">
          <span className={`block text-[10vw] sm:text-[15vw] lg:text-[11vw] ${dark ? "bg-gradient-to-b from-white via-white to-white/30 bg-clip-text text-transparent" : "bg-gradient-to-b from-[#0a0a1a] via-[#0a0a1a] to-[#0a0a1a]/30 bg-clip-text text-transparent"}`}>
            CREATIVE
          </span>
          <span className="block text-[10vw] sm:text-[8vw] lg:text-[6vw] italic font-extralight text-[#FACC15] mt-1" style={{ textShadow: "0 0 60px rgba(250,204,21,0.4)" }}>
            by design.
          </span>
        </h1>
 
        {/* Desc */}
        <p className={`mt-8 max-w-lg text-sm sm:text-base leading-relaxed ${dark ? "text-white/60" : "text-black/55"}`}>
          Crafting bold visuals, motion-driven stories and brand systems that refuse to blend in. Every pixel has a purpose.
        </p>
 
        {/* CTAs */}
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <a href="#work" className="group inline-flex items-center gap-2 rounded-full bg-[#0E49FF] px-7 py-3.5 text-sm font-bold text-white shadow-[0_0_30px_rgba(14,73,255,0.5)] transition-all hover:shadow-[0_0_50px_rgba(14,73,255,0.8)] hover:scale-105">
            View Work
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
          <a href="#contact" className={`group inline-flex items-center gap-2 rounded-full border px-7 py-3.5 text-sm font-bold backdrop-blur-md transition-all hover:scale-105
            ${dark ? "border-white/30 text-white hover:bg-white hover:text-[#0E49FF]" : "border-[#0E49FF]/40 text-[#0E49FF] hover:bg-[#0E49FF] hover:text-white"}`}>
            Let's Talk ↗
          </a>
        </div>
 
        {/* Pills */}
        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {["Graphic Design", "Poster Design", "2D Animation", "Social Media Post"].map((t) => (
            <ServicePill key={t} title={t} dark={dark} />
          ))}
        </div>
      </div>
 
      {/* Marquee strip */}
      <div className={`absolute bottom-0 left-0 right-0 overflow-hidden border-t py-3 backdrop-blur-sm ${dark ? "border-white/10 bg-black/20" : "border-[#0E49FF]/10 bg-[#0E49FF]/5"}`}>
        <div className="flex whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.4em]" style={{ animation: "marquee 25s linear infinite" }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className={`mx-8 flex items-center gap-8 ${dark ? "text-white/50" : "text-[#0E49FF]/50"}`}>
              Branding <span className="text-yellow-400">✦</span> Motion <span className="text-yellow-400">✦</span> Posters <span className="text-yellow-400">✦</span> Social <span className="text-yellow-400">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
