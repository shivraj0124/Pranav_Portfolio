// components/ui/ServicePill.tsx
"use client";

interface Props {
  title: string;
}

export function ServicePill({ title, dark }:{ title: string; dark: boolean }) {
  return (
    <div className={`rounded-full border px-6 py-2.5 text-xs font-medium uppercase tracking-widest backdrop-blur-sm transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(14,73,255,0.4)] cursor-default
      ${dark ? "border-white/25 text-white/80 hover:border-[#0E49FF] hover:text-white" : "border-[#0E49FF]/40 text-[#0E49FF]/80 hover:border-[#0E49FF] hover:text-[#0E49FF]"}`}>
      {title}
    </div>
  );
}