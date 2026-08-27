import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useUI } from "../lib/UIContext";

export default function CTASection() {
  const { openAuth } = useUI();

  return (
    <section className="relative py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-[2.5rem] p-12 sm:p-16 text-center overflow-hidden border border-white/10"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/15 via-sky-400/10 to-violet-400/10" />
          <div className="absolute inset-0 grid-fade opacity-60" />
          <div className="relative">
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
              <span className="text-[11px] tracking-[0.15em] uppercase text-slate-300">
                Start free — upgrade anytime
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-bold text-white leading-tight max-w-2xl mx-auto">
              Stop chasing cold leads.<br />Start closing warm ones.
            </h2>
            <p className="text-slate-400 mt-5 max-w-lg mx-auto">
              Join 2,000+ agencies and freelancers using LeadFresh AI to find
              buyers the moment they're ready.
            </p>
            <button
              onClick={() => openAuth("signup")}
              className="group mt-9 inline-flex items-center gap-2 bg-gradient-to-r from-emerald-400 to-sky-400 text-slate-950 font-semibold rounded-full pl-7 pr-6 py-4 hover:brightness-110 hover:scale-105 transition-all shadow-[0_0_50px_rgba(52,211,153,0.35)]"
            >
              Start Free Trial
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
