import SkillCircle from "../ui/SkillCircle";
import SectionHeading from "../ui/SectionHeading";

const T = {
  blue: "#0E49FF",
  yellow: "#FACC15",
  fuchsia: "#D946EF",
};
export default function Skills({ dark }) {
  const bg = dark ? "bg-[#060614] text-white" : "bg-[#f0f4ff] text-[#0a0a1a]";
  const muted = dark ? "text-white/60" : "text-black/55";
 
  const skills = [
    { title: "Adobe Photoshop", value: 90, accent: "#31A8FF" },
    { title: "Adobe Illustrator", value: 70, accent: "#31A8FF" },
    { title: "CorelDRAW", value: 80, accent: "#31A8FF" },
    { title: "Adobe Animate", value: 75, accent: "#31A8FF" },
  ];
 
  const tools = ["Figma", "After Effects", "Premiere Pro", "Canva", "Procreate", "Blender"];
 
  return (
    <section id="skills" className={`relative overflow-hidden py-24 ${bg}`}>
      <div className="pointer-events-none absolute -top-32 right-0 h-[500px] w-[500px] rounded-full bg-yellow-400/10 blur-[150px]" />
      <div className="pointer-events-none absolute bottom-0 -left-32 h-[400px] w-[400px] rounded-full bg-[#0E49FF]/15 blur-[120px]" />
 
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="mb-14 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <SectionHeading title="Expertise" dark={dark} />
            <h2 className="mt-3 max-w-2xl text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
              Tools I use to{" "}
              <span className="italic text-yellow-400">bring ideas to life.</span>
            </h2>
          </div>
          <p className={`max-w-md text-sm leading-relaxed ${muted} lg:text-right`}>
            Years of hands-on practice across the industry-standard creative suite — and still learning every day.
          </p>
        </div>
 
        <div className="grid gap-5 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((s) => <SkillCircle key={s.title} {...s} dark={dark} />)}
        </div>
 
        <div className="mt-14">
          <p className={`mb-5 text-[10px] font-bold uppercase tracking-[0.35em] ${muted}`}>✦ Also working with</p>
          <div className="flex flex-wrap gap-3">
            {tools.map((t) => (
              <span key={t} className={`rounded-full border px-5 py-2.5 text-sm font-medium backdrop-blur-sm transition-all hover:scale-105 hover:border-yellow-400/60 hover:text-yellow-400 cursor-default
                ${dark ? "border-white/15 bg-white/5 text-white/70" : "border-[#0E49FF]/20 bg-[#0E49FF]/5 text-[#0E49FF]/70"}`}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}