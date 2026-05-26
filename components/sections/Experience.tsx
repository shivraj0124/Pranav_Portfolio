import SectionHeading from "../ui/SectionHeading";
const T = {
  blue: "#0E49FF",
  yellow: "#FACC15",
  fuchsia: "#D946EF",
};
export default function Experience({ dark }) {
  const bg = dark ? "bg-[#0a0a1a] text-white" : "bg-white text-[#0a0a1a]";
  const muted = dark ? "text-white/60" : "text-black/55";
  const card = dark ? "border-white/10 bg-white/[0.03]" : "border-[#0E49FF]/12 bg-[#0E49FF]/[0.03]";
 
  const items = [
    { period: "2025 — 2026", role: "Freelance Designer", company: "Self-Employed", status: "Current", description: "Working with founders and small brands on social media creatives, posters, brand identity systems and motion-driven graphics that actually convert.", tags: ["Branding", "Social Media", "Posters", "Motion"], accent: "#0E49FF" },
    { period: "2024 — 2025", role: "Design Collaborator", company: "Artist Community", status: "Past", description: "Collaborated with a community of artists on creative campaigns, exchanging feedback and pushing visual storytelling across digital formats.", tags: ["Illustration", "Collab", "Concept Art"], accent: "#FACC15" },
  ];
 
  return (
    <section id="experience" className={`relative overflow-hidden py-24 ${bg}`}>
      <div className="pointer-events-none absolute top-1/3 -left-40 h-[500px] w-[500px] rounded-full bg-fuchsia-500/10 blur-[150px]" />
      <div className="pointer-events-none absolute -bottom-32 right-0 h-[400px] w-[400px] rounded-full bg-[#0E49FF]/15 blur-[120px]" />
 
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="mb-14 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <SectionHeading title="Experience" dark={dark} />
            <h2 className="mt-3 max-w-2xl text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
              Where I've been{" "}
              <span className="italic text-yellow-400">crafting pixels.</span>
            </h2>
          </div>
          <p className={`max-w-md text-sm leading-relaxed ${muted} lg:text-right`}>
            A short journey so far — but every project sharpened my eye and made the next one bolder.
          </p>
        </div>
 
        <div className="relative">
          {/* Line */}
          <div className="absolute left-0 top-2 h-[calc(100%-16px)] w-0.5 bg-gradient-to-b from-[#0E49FF] via-yellow-400/60 to-transparent md:left-1/2 md:-translate-x-1/2" />
 
          <div className="space-y-10">
            {items.map((item, i) => (
              <div key={item.role} className={`relative flex flex-col gap-6 md:flex-row md:items-center ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                {/* Dot */}
                <div className="absolute left-0 z-10 h-5 w-5 -translate-x-1/2 rounded-full border-2 md:left-1/2" style={{ borderColor: item.accent, backgroundColor: dark ? "#0a0a1a" : "#fff", boxShadow: `0 0 20px ${item.accent}60` }} />
                <div className="hidden md:block md:w-1/2" />
 
                {/* Card */}
                <div className="ml-2 w-full md:ml-0 md:w-1/2 md:px-8 px-2">
                  <div className={`group rounded-2xl border p-7 backdrop-blur-sm transition-all hover:-translate-y-1.5 hover:shadow-[0_12px_40px_rgba(14,73,255,0.15)] ${card}`}>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-xs font-bold uppercase tracking-[0.25em]" style={{ color: item.accent }}>{item.period}</span>
                      <span className="rounded-full px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider" style={{ backgroundColor: `${item.accent}20`, color: item.accent }}>{item.status}</span>
                    </div>
                    <h3 className="mt-3 text-2xl font-black sm:text-3xl">{item.role}</h3>
                    <p className={`mt-1 text-sm ${muted}`}>{item.company}</p>
                    <p className={`mt-4 text-sm leading-relaxed ${muted}`}>{item.description}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <span key={tag} className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${dark ? "border-white/15 text-white/60 hover:border-white/30" : "border-[#0E49FF]/20 text-[#0E49FF]/60"}`}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
 
        {/* CTA strip */}
        <div className={`mt-16 flex flex-col items-center justify-between gap-6 rounded-2xl border p-8 sm:flex-row ${dark ? "border-white/10 bg-gradient-to-r from-[#0E49FF]/20 via-fuchsia-500/10 to-yellow-400/10" : "border-[#0E49FF]/15 bg-gradient-to-r from-[#0E49FF]/8 via-[#0E49FF]/5 to-yellow-400/8"}`}>
          <div>
            <h4 className="text-xl font-black sm:text-2xl">Have a project in mind?</h4>
            <p className={`mt-1 text-sm ${muted}`}>I'm open to freelance work and collaborations.</p>
          </div>
          <a href="#contact" className="group inline-flex items-center gap-2 rounded-full bg-yellow-400 px-7 py-3.5 text-sm font-black text-black shadow-[0_0_25px_rgba(250,204,21,0.4)] transition-all hover:shadow-[0_0_40px_rgba(250,204,21,0.7)] hover:scale-105">
            Let's Work Together
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
