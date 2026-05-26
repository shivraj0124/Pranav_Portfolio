// components/ui/SectionHeading.tsx
"use client";

interface Props {
  title: string;
}

export default function SectionHeading({ title, dark }:{ title: string; dark: boolean }) {
  return (
    <div className="flex items-center gap-3 mb-2">
      <span className="h-px w-8 bg-[#0E49FF]" />
      <span className="text-xs font-bold uppercase tracking-[0.35em] text-[#0E49FF]">{title}</span>
    </div>
  );
}