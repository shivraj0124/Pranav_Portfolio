// components/ui/SkillCircle.tsx

interface Props {
  title: string;
  value: number;
}
const T = {
  blue: "#0E49FF",
  yellow: "#FACC15",
  fuchsia: "#D946EF",
};

export default function SkillCircle({ title, value, accent, dark }) {
  const r = 44;
  const circ = 2 * Math.PI * r;
  const offset = circ - (value / 100) * circ;
  const bg = dark ? "bg-white/[0.04] border-white/10" : "bg-[#0E49FF]/[0.04] border-[#0E49FF]/12";
 
  return (
    <div className={`group flex flex-col items-center rounded-2xl border p-6 backdrop-blur-sm transition-all hover:-translate-y-2 hover:shadow-[0_12px_40px_rgba(14,73,255,0.2)] ${bg}`}>
      <div className="relative">
        <svg width="110" height="110" className="-rotate-90">
          <circle cx="55" cy="55" r={r} fill="none" stroke={dark ? "rgba(255,255,255,0.08)" : "rgba(14,73,255,0.1)"} strokeWidth="7" />
          <circle
            cx="55" cy="55" r={r} fill="none"
            stroke={accent} strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray={circ}
            strokeDashoffset={offset}
            style={{ filter: `drop-shadow(0 0 8px ${accent}80)` }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl font-black" style={{ color: accent }}>{value}%</span>
        </div>
      </div>
      <p className={`mt-4 text-center text-sm font-bold uppercase tracking-wide ${dark ? "text-white/80" : "text-black/70"}`}>{title}</p>
    </div>
  );
}