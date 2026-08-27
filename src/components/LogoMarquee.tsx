import { Zap, Box, CircleDot, PhoneCall, Cpu, Layers, Boxes, Waves } from "lucide-react";

const LOGOS = [
  { name: "Livestor", icon: Zap },
  { name: "mojo", icon: Box },
  { name: "CARV", icon: CircleDot },
  { name: "aircall", icon: PhoneCall },
  { name: "IEEC", icon: Cpu },
  { name: "Stackflow", icon: Layers },
  { name: "Boxly", icon: Boxes },
  { name: "Waveform", icon: Waves },
];

function LogoRow() {
  return (
    <div className="flex items-center gap-16 shrink-0 px-8">
      {LOGOS.map((l) => (
        <div key={l.name} className="flex items-center gap-2 text-slate-500 hover:text-slate-300 transition-colors">
          <l.icon className="w-5 h-5" />
          <span className="font-display font-semibold text-lg tracking-tight whitespace-nowrap">{l.name}</span>
        </div>
      ))}
    </div>
  );
}

export default function LogoMarquee() {
  return (
    <section className="border-y border-white/[0.06] py-9 bg-white/[0.015] overflow-hidden">
      <p className="text-center text-[11px] tracking-[0.2em] uppercase text-slate-600 mb-6">
        Trusted by revenue teams at
      </p>
      <div className="flex w-max animate-marquee">
        <LogoRow />
        <LogoRow />
      </div>
    </section>
  );
}
