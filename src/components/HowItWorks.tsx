import { motion } from "framer-motion";
import { Target, Radar, Users, Send } from "lucide-react";

const STEPS = [
  {
    icon: Target,
    title: "Define your ICP",
    desc: "Tell LeadFresh who your best customers look like — industry, size, tech stack, and hiring patterns.",
  },
  {
    icon: Radar,
    title: "We scan the market",
    desc: "Our AI continuously monitors millions of signals — funding, hiring, growth, and buying activity.",
  },
  {
    icon: Users,
    title: "Get matched leads",
    desc: "Receive a ranked list of high-intent companies with verified decision-maker contacts.",
  },
  {
    icon: Send,
    title: "Reach out with context",
    desc: "Export leads with outreach context so every message feels personal and well-timed.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-24 sm:py-32 border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-[11px] tracking-[0.2em] uppercase text-emerald-300">How It Works</span>
          <h2 className="font-display text-3xl sm:text-[2.6rem] font-bold text-white leading-tight mt-3">
            From <span className="text-gradient">signal to sale</span> in four steps
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-5 relative">
          <div className="hidden md:block absolute top-9 left-[12%] right-[12%] h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
          {STEPS.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative glass rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-sky-400 flex items-center justify-center shrink-0">
                  <s.icon className="w-5 h-5 text-slate-950" />
                </div>
                <span className="font-display text-2xl font-bold text-white/20">0{i + 1}</span>
              </div>
              <h3 className="text-white font-semibold mb-2">{s.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
