import SectionHeading from "../ui/SectionHeading";
const T = {
  blue: "#0E49FF",
  yellow: "#FACC15",
  fuchsia: "#D946EF",
};
export default function About({ dark }) {
  const bg = dark ? "bg-[#0a0a1a] text-white" : "bg-white text-[#0a0a1a]";
  const card = dark ? "border-white/10 bg-white/[0.03]" : "border-[#0E49FF]/12 bg-[#0E49FF]/[0.03]";
  const muted = dark ? "text-white/60" : "text-black/55";
 
  return (
    <section id="about" className={`relative overflow-hidden py-24 ${bg}`}>
      <div className="pointer-events-none absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-[#0E49FF]/15 blur-[150px]" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-[400px] w-[400px] rounded-full bg-yellow-400/10 blur-[120px]" />
 
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="mb-16 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <SectionHeading title="About Me" dark={dark} />
            <h2 className="mt-3 max-w-2xl text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
              Creating what I imagine,{" "}
              <span className="italic text-yellow-400">one pixel at a time.</span>
            </h2>
          </div>
          <p className={`max-w-md text-sm leading-relaxed ${muted} lg:text-right`}>
            Part of a vibrant artist community, surrounded by skilled creators who push me to grow every day.
          </p>
        </div>
 
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left */}
          <div className="space-y-8">
            <div className={`rounded-2xl border p-8 backdrop-blur-sm ${card}`}>
              <p className={`text-base leading-relaxed ${muted}`}>
                I like to create what I imagine in my mind in digital form. I belong to the artist community — surrounded by skilled people who make me unstoppable. I am a believer in smart work.
              </p>
            </div>
 
            <div className="grid grid-cols-3 gap-4">
              {[
                { num: "3+", label: "Years Exp." },
                { num: "50+", label: "Projects" },
                { num: "20+", label: "Clients" },
              ].map((s) => (
                <div key={s.label} className={`rounded-2xl border p-5 text-center backdrop-blur-sm transition-all hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(14,73,255,0.2)] ${card}`}>
                  <div className="text-2xl sm:text-3xl font-black text-[#FACC15]">{s.num}</div>
                  <div className={`mt-1 text-[10px] font-semibold uppercase tracking-wider ${muted}`}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
 
          {/* Right — Education */}
          <div>
            <SectionHeading title="Education" dark={dark} />
            <div className="relative mt-6 space-y-8">
              <div className="absolute left-[11px] top-2 h-[calc(100%-16px)] w-0.5 bg-gradient-to-b from-[#0E49FF] via-yellow-400/60 to-transparent" />
 
              {[
                { school: "Siddharth College", degree: "B.Com", period: "Jul 2024 — Present", desc: "Pursuing Bachelor of Commerce while building a creative career in design and digital arts.", color: "#0E49FF", status: "Current" },
                { school: "Mulund College of Commerce", degree: "HSC", period: "Jul 2023 — Feb 2024", desc: "Completed Higher Secondary education with strong foundation in commerce and arts.", color: "#FACC15" },
              ].map((e) => (
                <div key={e.school} className="relative flex gap-5">
                  <div className="relative z-10 mt-1.5 h-6 w-6 shrink-0 rounded-full border-2 bg-current" style={{ borderColor: e.color, backgroundColor: dark ? "#0a0a1a" : "#fff" }} />
                  <div className={`flex-1 rounded-2xl border p-6 backdrop-blur-sm transition-all hover:-translate-y-1 ${card}`} style={{ borderColor: `${e.color}25` }}>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-bold sm:text-xl">{e.school}</h3>
                      {e.status && <span className="rounded-full px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider" style={{ backgroundColor: `${e.color}20`, color: e.color }}>{e.status}</span>}
                    </div>
                    <p className={`mt-1 text-xs font-semibold uppercase tracking-wider ${muted}`}>{e.degree} · {e.period}</p>
                    <p className={`mt-3 text-sm leading-relaxed ${muted}`}>{e.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
