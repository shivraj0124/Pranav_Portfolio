import { useState } from "react";

const CATEGORIES = ["All", "Branding", "Poster", "Motion", "Social Media", "UI/UX", "Illustration"];

const INITIAL_PROJECTS = [
  {
    id: 1,
    title: "Neon Pulse Brand Kit",
    category: "Branding",
    year: "2026",
    client: "Neon Pulse Music",
    tags: ["Logo", "Typography", "Color System"],
    thumbnail: "🎵",
    color: "#0E49FF",
    description: "Full brand identity system for an indie electronic music label. Included logo design, typography hierarchy, color palette, and social media templates.",
    tools: ["Adobe Illustrator", "Photoshop", "Figma"],
    deliverables: ["Logo Suite", "Brand Guidelines PDF", "Social Templates", "Merch Mockups"],
    duration: "3 weeks",
    link: "",
  },
  {
    id: 2,
    title: "Solstice Event Poster",
    category: "Poster",
    year: "2025",
    client: "Artist Community",
    tags: ["Typography", "Illustration", "Print"],
    thumbnail: "🌅",
    color: "#FACC15",
    description: "Concert poster for a summer solstice underground event. Bold typographic hierarchy with hand-drawn sun illustration and risograph-inspired texture overlays.",
    tools: ["Adobe Photoshop", "Illustrator"],
    deliverables: ["A2 Print-Ready File", "Digital Version", "Story Format"],
    duration: "1 week",
    link: "",
  },
  {
    id: 3,
    title: "Brew & Bloom Café",
    category: "Branding",
    year: "2025",
    client: "Brew & Bloom",
    tags: ["Logo", "Packaging", "Signage"],
    thumbnail: "☕",
    color: "#D946EF",
    description: "Cozy café brand with a botanical meets modern aesthetic. Developed the full visual system from logo to menu design, packaging and in-store signage.",
    tools: ["CorelDRAW", "Illustrator", "Photoshop"],
    deliverables: ["Logo & Variants", "Menu Design", "Cup Packaging", "Signage"],
    duration: "4 weeks",
    link: "",
  },
];

function SectionHeading({ title }) {
  return (
    <div className="flex items-center gap-3 mb-2">
      <span className="h-px w-8 bg-[#0E49FF]" />
      <span className="text-xs font-bold uppercase tracking-[0.35em] text-[#0E49FF]">{title}</span>
    </div>
  );
}

/* ── Project Card ── */
function ProjectCard({ project, onClick, dark }) {
  const cardBg = dark ? "bg-white/[0.04] border-white/10 hover:border-white/25" : "bg-white border-[#0E49FF]/12 hover:border-[#0E49FF]/35";
  const muted = dark ? "text-white/55" : "text-black/50";

  return (
    <button
      onClick={() => onClick(project)}
      className={`group text-left w-full rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_16px_40px_rgba(14,73,255,0.18)] ${cardBg}`}
    >
      {/* Thumbnail */}
      <div
        className="mb-5 flex h-36 items-center justify-center rounded-xl text-6xl transition-transform duration-300 group-hover:scale-105"
        style={{ backgroundColor: `${project.color}18` }}
      >
        {project.thumbnail}
      </div>

      {/* Meta */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] font-bold uppercase tracking-[0.3em]" style={{ color: project.color }}>
          {project.category}
        </span>
        <span className={`text-[10px] font-semibold ${muted}`}>{project.year}</span>
      </div>

      <h3 className={`text-lg font-black leading-tight ${dark ? "text-white" : "text-[#0a0a1a]"}`}>
        {project.title}
      </h3>
      <p className={`mt-1.5 text-xs ${muted} line-clamp-2`}>{project.description}</p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.tags.map((t) => (
          <span
            key={t}
            className={`rounded-full border px-2.5 py-1 text-[10px] font-medium ${dark ? "border-white/15 text-white/55" : "border-[#0E49FF]/15 text-[#0E49FF]/60"}`}
          >
            {t}
          </span>
        ))}
      </div>

      <div className={`mt-4 cursor-pointer flex items-center gap-1 text-xs font-bold transition-all duration-200 group-hover:gap-2`} style={{ color: project.color }}>
        View Details <span>→</span>
      </div>
    </button>
  );
}

/* ── Detail Drawer ── */
function ProjectDetail({ project, onClose, dark }) {
  if (!project) return null;
  const muted = dark ? "text-white/60" : "text-black/55";
  const pill = dark ? "border-white/15 bg-white/5 text-white/70" : "border-[#0E49FF]/15 bg-[#0E49FF]/5 text-[#0E49FF]/70";

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        style={{ animation: "fadeIn 0.2s ease" }}
      />
      {/* Panel */}
      <div
        className={`fixed right-0 top-0 bottom-0 z-50 w-full max-w-lg overflow-y-auto shadow-2xl ${dark ? "bg-[#0d0d22] text-white" : "bg-white text-[#0a0a1a]"}`}
        style={{ animation: "slideIn 0.3s cubic-bezier(0.22, 1, 0.36, 1)" }}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b px-6 py-5 backdrop-blur-md"
          style={{ borderColor: dark ? "rgba(255,255,255,0.1)" : "rgba(14,73,255,0.1)", backgroundColor: dark ? "rgba(13,13,34,0.95)" : "rgba(255,255,255,0.95)" }}
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">{project.thumbnail}</span>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em]" style={{ color: project.color }}>{project.category} · {project.year}</p>
              <h2 className="text-lg font-black leading-tight">{project.title}</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`rounded-xl p-2.5 transition-colors ${dark ? "hover:bg-white/10 text-white/60" : "hover:bg-black/5 text-black/50"}`}
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-8 space-y-8">
          {/* Thumbnail big */}
          <div
            className="flex h-52 items-center justify-center rounded-2xl text-8xl"
            style={{ backgroundColor: `${project.color}15` }}
          >
            {project.thumbnail}
          </div>

          {/* Client + Duration */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Client", value: project.client },
              { label: "Duration", value: project.duration },
            ].map((item) => (
              <div key={item.label} className={`rounded-xl border p-4 ${dark ? "border-white/10 bg-white/[0.03]" : "border-[#0E49FF]/10 bg-[#0E49FF]/[0.03]"}`}>
                <p className={`text-[10px] font-bold uppercase tracking-wider mb-1 ${muted}`}>{item.label}</p>
                <p className="text-sm font-bold">{item.value}</p>
              </div>
            ))}
          </div>

          {/* Description */}
          <div>
            <p className={`text-[10px] font-bold uppercase tracking-[0.3em] mb-3 ${muted}`}>About</p>
            <p className={`text-sm leading-relaxed ${muted}`}>{project.description}</p>
          </div>

          {/* Tools */}
          <div>
            <p className={`text-[10px] font-bold uppercase tracking-[0.3em] mb-3 ${muted}`}>Tools Used</p>
            <div className="flex flex-wrap gap-2">
              {project.tools.map((t) => (
                <span key={t} className={`rounded-full border px-3.5 py-1.5 text-xs font-medium ${pill}`}>{t}</span>
              ))}
            </div>
          </div>

          {/* Deliverables */}
          <div>
            <p className={`text-[10px] font-bold uppercase tracking-[0.3em] mb-3 ${muted}`}>Deliverables</p>
            <div className="space-y-2">
              {project.deliverables.map((d, i) => (
                <div key={d} className="flex items-center gap-3">
                  <span className="h-5 w-5 rounded-full text-[10px] font-black flex items-center justify-center flex-shrink-0 text-white" style={{ backgroundColor: project.color }}>
                    {i + 1}
                  </span>
                  <span className={`text-sm ${muted}`}>{d}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div>
            <p className={`text-[10px] font-bold uppercase tracking-[0.3em] mb-3 ${muted}`}>Tags</p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((t) => (
                <span key={t} className={`rounded-full border px-3.5 py-1.5 text-xs font-medium ${pill}`}>{t}</span>
              ))}
            </div>
          </div>

          {/* Link */}
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-black text-white transition-all hover:opacity-90"
              style={{ backgroundColor: project.color }}
            >
              View Live Project ↗
            </a>
          )}
        </div>
      </div>
    </>
  );
}

/* ── Add Project Modal ── */
function AddProjectModal({ onClose, onAdd, dark }) {
  const [form, setForm] = useState({
    title: "", category: "Branding", year: new Date().getFullYear().toString(),
    client: "", tags: "", thumbnail: "🎨", color: "#0E49FF",
    description: "", tools: "", deliverables: "", duration: "", link: "",
  });

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleAdd = () => {
    if (!form.title.trim() || !form.description.trim()) return;
    onAdd({
      ...form,
      id: Date.now(),
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      tools: form.tools.split(",").map((t) => t.trim()).filter(Boolean),
      deliverables: form.deliverables.split(",").map((t) => t.trim()).filter(Boolean),
    });
    onClose();
  };

  const inputCls = `w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition-all ${
    dark
      ? "bg-white/5 border-white/15 text-white placeholder:text-white/30 focus:border-[#0E49FF]"
      : "bg-white border-[#0E49FF]/20 text-black placeholder:text-black/30 focus:border-[#0E49FF]"
  }`;

  const labelCls = `block text-[10px] font-bold uppercase tracking-wider mb-1.5 ${dark ? "text-white/50" : "text-black/45"}`;

  const EMOJIS = ["🎨", "🎵", "📸", "🌅", "☕", "🚀", "🌿", "⚡", "🎭", "🏙️", "🌊", "🔥"];
  const COLORS = ["#0E49FF", "#FACC15", "#D946EF", "#10B981", "#F97316", "#EF4444", "#8B5CF6", "#06B6D4"];

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className={`fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4`}>
        <div
          className={`w-full sm:max-w-lg max-h-[90vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl ${dark ? "bg-[#0d0d22] text-white" : "bg-white text-[#0a0a1a]"}`}
          style={{ animation: "slideUp 0.3s cubic-bezier(0.22,1,0.36,1)" }}
        >
          {/* Handle */}
          <div className="flex justify-center pt-3 pb-1 sm:hidden">
            <div className={`h-1 w-10 rounded-full ${dark ? "bg-white/20" : "bg-black/15"}`} />
          </div>

          {/* Header */}
          <div className={`flex items-center justify-between px-6 py-5 border-b ${dark ? "border-white/10" : "border-[#0E49FF]/10"}`}>
            <h3 className="text-lg font-black">Add New Project</h3>
            <button onClick={onClose} className={`rounded-xl p-2 ${dark ? "hover:bg-white/10 text-white/60" : "hover:bg-black/5 text-black/50"}`}>✕</button>
          </div>

          <div className="px-6 py-6 space-y-5">
            {/* Emoji + Color */}
            <div className="flex gap-5">
              <div className="flex-1">
                <label className={labelCls}>Icon</label>
                <div className="flex flex-wrap gap-2">
                  {EMOJIS.map((e) => (
                    <button
                      key={e}
                      onClick={() => set("thumbnail", e)}
                      className={`h-9 w-9 rounded-xl text-lg flex items-center justify-center transition-all ${form.thumbnail === e ? "scale-110 ring-2 ring-[#0E49FF]" : dark ? "bg-white/5" : "bg-[#0E49FF]/5"}`}
                    >{e}</button>
                  ))}
                </div>
              </div>
              <div>
                <label className={labelCls}>Color</label>
                <div className="flex flex-wrap gap-2 max-w-[100px]">
                  {COLORS.map((c) => (
                    <button
                      key={c}
                      onClick={() => set("color", c)}
                      className={`h-7 w-7 rounded-full border-2 transition-all ${form.color === c ? "scale-125 border-white shadow" : "border-transparent"}`}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Title */}
            <div>
              <label className={labelCls}>Project Title *</label>
              <input className={inputCls} placeholder="e.g. Neon Pulse Brand Kit" value={form.title} onChange={(e) => set("title", e.target.value)} />
            </div>

            {/* Category + Year */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Category</label>
                <select
                  className={inputCls}
                  value={form.category}
                  onChange={(e) => set("category", e.target.value)}
                >
                  {CATEGORIES.filter((c) => c !== "All").map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className={labelCls}>Year</label>
                <input className={inputCls} placeholder="2026" value={form.year} onChange={(e) => set("year", e.target.value)} />
              </div>
            </div>

            {/* Client + Duration */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Client</label>
                <input className={inputCls} placeholder="Client name" value={form.client} onChange={(e) => set("client", e.target.value)} />
              </div>
              <div>
                <label className={labelCls}>Duration</label>
                <input className={inputCls} placeholder="e.g. 2 weeks" value={form.duration} onChange={(e) => set("duration", e.target.value)} />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className={labelCls}>Description *</label>
              <textarea
                className={`${inputCls} resize-none`}
                rows={3}
                placeholder="What was this project about?"
                value={form.description}
                onChange={(e) => set("description", e.target.value)}
              />
            </div>

            {/* Tags */}
            <div>
              <label className={labelCls}>Tags (comma separated)</label>
              <input className={inputCls} placeholder="Logo, Typography, Print" value={form.tags} onChange={(e) => set("tags", e.target.value)} />
            </div>

            {/* Tools */}
            <div>
              <label className={labelCls}>Tools Used (comma separated)</label>
              <input className={inputCls} placeholder="Adobe Illustrator, Photoshop" value={form.tools} onChange={(e) => set("tools", e.target.value)} />
            </div>

            {/* Deliverables */}
            <div>
              <label className={labelCls}>Deliverables (comma separated)</label>
              <input className={inputCls} placeholder="Logo Suite, Brand Guidelines" value={form.deliverables} onChange={(e) => set("deliverables", e.target.value)} />
            </div>

            {/* Link */}
            <div>
              <label className={labelCls}>Project Link (optional)</label>
              <input className={inputCls} placeholder="https://..." value={form.link} onChange={(e) => set("link", e.target.value)} />
            </div>

            {/* Submit */}
            <button
              onClick={handleAdd}
              disabled={!form.title.trim() || !form.description.trim()}
              className="w-full rounded-xl py-4 text-sm font-black text-white transition-all hover:opacity-90 hover:scale-[1.02] disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100"
              style={{ backgroundColor: form.color }}
            >
              Add Project ✦
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

/* ────────────────────────────────────────────────
   MAIN PROJECTS SECTION
──────────────────────────────────────────────── */
export default function Projects({ dark = true }) {
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [activeCategory, setActiveCategory] = useState("All");
  const [selected, setSelected] = useState(null);
  const [showAdd, setShowAdd] = useState(false);

  const filtered = activeCategory === "All" ? projects : projects.filter((p) => p.category === activeCategory);
  const bg = dark ? "bg-[#060614] text-white" : "bg-[#f0f4ff] text-[#0a0a1a]";
  const muted = dark ? "text-white/60" : "text-black/55";

  return (
    <section id="projects" className={`relative overflow-hidden py-24 ${bg}`}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&display=swap');
        * { font-family: 'Syne', sans-serif; }
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideIn { from { transform: translateX(100%) } to { transform: translateX(0) } }
        @keyframes slideUp { from { transform: translateY(40px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
        .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
      `}</style>

      {/* Glows */}
      <div className="pointer-events-none absolute -top-32 right-0 h-[500px] w-[500px] rounded-full bg-[#0E49FF]/15 blur-[150px]" />
      <div className="pointer-events-none absolute bottom-0 -left-32 h-[400px] w-[400px] rounded-full bg-yellow-400/10 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Header row */}
        <div className="mb-12 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <SectionHeading title="Projects" />
            <h2 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
              Projects I've{" "}
              <span className="italic text-yellow-400">brought to life.</span>
            </h2>
            <p className={`mt-3 text-sm ${muted}`}>{projects.length} projects · Click any to see details</p>
          </div>

          {/* Add button */}
          {/* <button
            onClick={() => setShowAdd(true)}
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#0E49FF] px-6 py-3 text-sm font-black text-white shadow-[0_0_25px_rgba(14,73,255,0.4)] transition-all hover:shadow-[0_0_40px_rgba(14,73,255,0.7)] hover:scale-105"
          >
            + Add Project
          </button> */}
        </div>

        {/* Category filter */}
        <div className="mb-10 flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`cursor-pointer rounded-full border px-5 py-2 text-xs font-bold uppercase tracking-wider transition-all ${
                activeCategory === cat
                  ? "bg-[#0E49FF] border-[#0E49FF] text-white shadow-[0_0_20px_rgba(14,73,255,0.4)]"
                  : dark
                  ? "border-white/20 text-white/60 hover:border-white/40 hover:text-white"
                  : "border-[#0E49FF]/20 text-[#0E49FF]/60 hover:border-[#0E49FF]/50 hover:text-[#0E49FF]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className={`flex flex-col items-center justify-center py-20 ${muted}`}>
            <div className="text-5xl mb-4">🎨</div>
            <p className="text-sm font-medium">No projects in this category yet.</p>
            </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <ProjectCard key={p.id} project={p} onClick={setSelected} dark={dark} />
            ))}
          </div>
        )}
      </div>

      {/* Detail drawer */}
      {selected && <ProjectDetail project={selected} onClose={() => setSelected(null)} dark={dark} />}

      {/* Add modal */}
      {showAdd && (
        <AddProjectModal
          dark={dark}
          onClose={() => setShowAdd(false)}
          onAdd={(p) => setProjects((prev) => [p, ...prev])}
        />
      )}
    </section>
  );
}

