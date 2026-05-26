import React from 'react'
import SectionHeading from '../ui/SectionHeading';
const T = {
  blue: "#0E49FF",
  yellow: "#FACC15",
  fuchsia: "#D946EF",
};
function Contact({ dark }:{dark: boolean}) {
  const bg = dark ? "bg-[#060614] text-white" : "bg-[#f0f4ff] text-[#0a0a1a]";
  const input = dark ? "bg-white/5 border-white/15 text-white placeholder:text-white/30 focus:border-[#0E49FF]" : "bg-white border-[#0E49FF]/20 text-black placeholder:text-black/30 focus:border-[#0E49FF]";
 
  return (
    <section id="contact" className={`relative overflow-hidden py-24 ${bg}`}>
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-[#0E49FF]/20 blur-[130px]" />
 
      <div className="relative z-10 mx-auto max-w-2xl px-6 text-center">
        <SectionHeading title="Contact" dark={dark} />
        <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl lg:text-5xl">
          Let's create something{" "}
          <span className="italic text-yellow-400">unforgettable.</span>
        </h2>
        <p className={`mt-4 text-sm leading-relaxed ${dark ? "text-white/60" : "text-black/55"}`}>
          Drop me a message and I'll get back to you within 24 hours.
        </p>
 
        <div className="mt-12 space-y-4 text-left">
          <input className={`w-full rounded-2xl border px-5 py-4 text-sm outline-none transition-all backdrop-blur-sm ${input}`} placeholder="Your name" />
          <input className={`w-full rounded-2xl border px-5 py-4 text-sm outline-none transition-all backdrop-blur-sm ${input}`} placeholder="Email address" />
          <textarea rows={4} className={`w-full rounded-2xl border px-5 py-4 text-sm outline-none transition-all backdrop-blur-sm resize-none ${input}`} placeholder="Tell me about your project…" />
          <button className="cursor-pointer w-full rounded-2xl bg-[#0E49FF] py-4 text-sm font-black text-white shadow-[0_0_30px_rgba(14,73,255,0.5)] transition-all hover:shadow-[0_0_50px_rgba(14,73,255,0.8)] hover:scale-[1.02]">
            Send Message →
          </button>
        </div>
      </div>
    </section>
  );
}
 

export default Contact
