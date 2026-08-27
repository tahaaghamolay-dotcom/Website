import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Jordan Blake",
    title: "Head of Growth, Stackify",
    seed: "1500648767791-00dcc994a43e",
    quote:
      "LeadFresh completely changed our pipeline. We went from cold-calling stale lists to reaching companies the exact week they started hiring for sales roles.",
  },
  {
    name: "Maria Gonzalez",
    title: "Founder, Orbit Agency",
    seed: "1544005313-94ddf0286df2",
    quote:
      "The intent scoring is scary accurate. Our close rate went up 3x because we only talk to companies who are already in a buying window.",
  },
  {
    name: "Tomasz Nowak",
    title: "VP Sales, BriteMeta",
    seed: "1472099645785-5658abf4ff4e",
    quote:
      "Decision-maker contacts alone saved our SDR team 10+ hours a week. Verified emails and direct dials, no more bounce-backs.",
  },
];

export default function TestimonialsSection() {
  return (
    <section id="about" className="relative py-24 sm:py-32 border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-[11px] tracking-[0.2em] uppercase text-emerald-300">Loved by sales teams</span>
          <h2 className="font-display text-3xl sm:text-[2.6rem] font-bold text-white leading-tight mt-3">
            Built by operators, <span className="text-gradient">for operators</span>
          </h2>
          <p className="text-slate-400 mt-4 leading-relaxed">
            LeadFresh AI was founded in 2022 by a team of former SDR leaders who
            were tired of paying for outdated lead databases. Today we help over
            2,000 agencies and freelance closers find the right conversation at
            the right time.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="glass rounded-3xl p-7 flex flex-col"
            >
              <Quote className="w-7 h-7 text-emerald-400/40 mb-4" />
              <p className="text-slate-300 text-sm leading-relaxed flex-1">{t.quote}</p>
              <div className="flex gap-0.5 mt-6 mb-3">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <div className="flex items-center gap-3">
                <img
                  src={`https://images.unsplash.com/photo-${t.seed}?w=100&h=100&fit=crop&crop=faces`}
                  className="w-10 h-10 rounded-full object-cover"
                  alt={t.name}
                />
                <div>
                  <p className="text-white text-sm font-semibold">{t.name}</p>
                  <p className="text-slate-500 text-xs">{t.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 text-center"
        >
          {[
            ["2,000+", "Agencies & closers"],
            ["12.4M+", "Companies tracked"],
            ["46%", "Avg. intent accuracy"],
            ["3x", "Avg. close-rate lift"],
          ].map(([stat, label]) => (
            <div key={label}>
              <p className="font-display text-3xl sm:text-4xl font-bold text-gradient">{stat}</p>
              <p className="text-slate-500 text-sm mt-1.5">{label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
