"use client";

import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";
import { useTheme } from "../context/useTheme";
import Projects from "@/components/sections/Projects";
export default function App() {
  const { dark, toggle } = useTheme();

  return (
    // @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&display=swap');
    //     * { font-family: 'Syne', sans-serif; box-sizing: border-box; }
    <div>
      <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');

* {
  font-family: 'Space Grotesk', sans-serif;
  box-sizing: border-box;
}
        html { scroll-behavior: smooth; }
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #0E49FF; border-radius: 10px; }
      `}</style>
      <Navbar dark={dark} toggleTheme={toggle} />
      <Hero dark={dark} />
      <About dark={dark} />
      <Skills dark={dark} />
      <Projects dark={dark} />
      <Experience dark={dark} />
      <Contact dark={dark} />
      <Footer dark={dark} />
    </div>
  );
}
