import { motion } from "framer-motion";
import { Sparkles, ArrowRight, PlayCircle, Star } from "lucide-react";
import { useUI } from "../lib/UIContext";
import DashboardMock from "./DashboardMock";

const AVATAR_SEEDS = ["1508214751196-bcfd4ca60f91", "1500648767791-00dcc994a43e", "1472099645785-5658abf4ff4e"];

export default function Hero() {
  const { openAuth } = useUI();

  return (
    <section id="top" className="relative pt-36 pb-20 sm:pt-44 sm:pb-28 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-fade" />
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(52,217,160,0.16),transparent_65%)] blur-3xl" />
        <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(95,182,255,0.14),transparent_65%)] blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-[1.05fr_1fr] gap-16 items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-7"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
            <span className="text-[11px] tracking-[0.15em] uppercase text-slate-300">
              AI-Powered Sales Intelligence
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-[2.6rem] leading-[1.08] sm:text-6xl sm:leading-[1.06] font-bold text-white tracking-tight"
          >
            Find <span className="text-gradient">high-intent client</span> before
            your competitors do.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 text-slate-400 text-base sm:text-lg max-w-xl leading-relaxed"
          >
            LeadFresh AI tracks hiring activity, company growth, and buying signals
            in real time — then turns them into qualified opportunities with
            decision-maker contacts and outreach context.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <button
              onClick={() => openAuth("signup")}
              className="group flex items-center gap-2 bg-gradient-to-r from-emerald-400 to-sky-400 text-slate-950 font-semibold rounded-full pl-6 pr-5 py-3.5 hover:brightness-110 hover:scale-105 transition-all shadow-[0_0_40px_rgba(52,211,153,0.3)]"
            >
              Start Free Trial
              <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="#features"
              className="flex items-center gap-2 border border-white/15 bg-white/[0.03] hover:bg-white/[0.07] text-white font-medium rounded-full px-6 py-3.5 transition-colors"
            >
              Watch Demo
              <PlayCircle className="w-4.5 h-4.5" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="mt-11 flex items-center gap-4"
          >
            <div className="flex -space-x-3">
              {AVATAR_SEEDS.map((seed) => (
                <img
                  key={seed}
                  src={`https://images.unsplash.com/photo-${seed}?w=100&h=100&fit=crop&crop=faces`}
                  alt="user"
                  className="w-9 h-9 rounded-full border-2 border-[#05070c] object-cover"
                />
              ))}
            </div>
            <div>
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs text-slate-500 mt-0.5">Trusted by 2,000+ agencies &amp; freelancers</p>
            </div>
          </motion.div>
        </div>

        <div className="lg:pl-4">
          <DashboardMock />
        </div>
      </div>
    </section>
  );
}
