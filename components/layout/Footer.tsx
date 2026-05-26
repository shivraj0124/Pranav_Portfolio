import React from 'react'
const T = {
  blue: "#0E49FF",
  yellow: "#FACC15",
  fuchsia: "#D946EF",
};
function Footer({ dark }: { dark: boolean }) {
  return (
    <footer className={`border-t py-8 text-center text-xs ${dark ? "border-white/10 bg-[#0a0a1a] text-white/40" : "border-[#0E49FF]/10 bg-white text-black/40"}`}>
      © 2026 Pranav Pangarikar · Crafted with ✦ and pixels
    </footer>
  );
}

export default Footer
