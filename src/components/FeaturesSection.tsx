import { motion } from "framer-motion";
import {
  GitBranch,
  BarChart3,
  Radar,
  UserSquare2,
  ShoppingCart,
  Users2,
  CircleDollarSign,
  Briefcase,
  Cpu,
  Mail,
  Phone,
  MapPin,
  BadgeCheck,
  SlidersHorizontal,
  Radio,
  Send,
  TrendingUp,
  SearchCheck,
  MessageSquareText,
} from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
};

const MATCH_TAGS = [
  { icon: Cpu, label: "High Intent", sub: "Software Company" },
  { icon: CircleDollarSign, label: "Funding Raised", sub: "Series B" },
  { icon: Briefcase, label: "Hiring", sub: "Sales Director" },
  { icon: BadgeCheck, label: "Technology Fit", sub: "High" },
];

const INTENT_BARS = [
  { icon: ShoppingCart, label: "Buying Intent", value: 46, color: "from-emerald-400 to-emerald-300" },
  { icon: Users2, label: "Engagement", value: 85, color: "from-sky-400 to-sky-300" },
  { icon: BarChart3, label: "Fit Score", value: 85, color: "from-violet-400 to-violet-300" },
];

const MINI_FEATURES = [
  { icon: SlidersHorizontal, title: "Smart Filtering", desc: "Narrow prospects using advanced targeting filters." },
  { icon: Radio, title: "Buying Signals", desc: "Detect companies showing active purchase intent." },
  { icon: Send, title: "Export & Outreach", desc: "Export leads and start outreach faster with context." },
  { icon: TrendingUp, title: "Company Growth Tracking", desc: "Monitor hiring expansion and growth signals." },
  { icon: SearchCheck, title: "Lead Search", desc: "Narrow prospects using advanced targeting filters." },
  { icon: MessageSquareText, title: "Outreach Context", desc: "Get valuable insights to personalize every message." },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <motion.div {...fadeUp} transition={{ duration: 0.7 }} className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-display text-3xl sm:text-[2.6rem] font-bold text-white leading-tight">
            Everything for <span className="text-gradient">finding clients</span>
          </h2>
          <p className="text-slate-400 mt-4 leading-relaxed">
            Most lead generation tools sell you outdated databases. By the time you
            reach out, the opportunity is gone. LeadFresh captures the exact moment
            a company enters the buying window.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-5 mb-5">
          {/* AI Matching */}
          <motion.div {...fadeUp} transition={{ duration: 0.7 }} className="glass rounded-3xl p-7 sm:p-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-400/15 flex items-center justify-center">
                <GitBranch className="w-5 h-5 text-emerald-300" />
              </div>
              <h3 className="font-display text-xl font-bold text-white">AI Matching</h3>
            </div>
            <p className="text-slate-400 text-sm mb-8">Automatically match prospects to your ideal customer profile.</p>

            <div className="flex items-center justify-between gap-4">
              <div className="flex flex-col gap-3">
                {["1508214751196-bcfd4ca60f91", "1472099645785-5658abf4ff4e", "1544005313-94ddf0286df2", "1500648767791-00dcc994a43e"].map(
                  (seed, i) => (
                    <img
                      key={i}
                      src={`https://images.unsplash.com/photo-${seed}?w=80&h=80&fit=crop&crop=faces`}
                      className="w-9 h-9 rounded-full object-cover border border-white/10"
                      alt="prospect"
                    />
                  )
                )}
              </div>
              <div className="flex-1 relative h-40 hidden sm:block">
                <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                  {[18, 40, 62, 84].map((y, i) => (
                    <line
                      key={i}
                      x1="0"
                      y1={`${y}%`}
                      x2="50%"
                      y2="50%"
                      stroke="rgba(255,255,255,0.12)"
                      strokeDasharray="3 4"
                    />
                  ))}
                </svg>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-400 to-sky-400 flex items-center justify-center shadow-[0_0_30px_rgba(52,217,160,0.5)]">
                  <Cpu className="w-5 h-5 text-slate-950" />
                </div>
              </div>
              <div className="flex flex-col gap-2.5 flex-1">
                {MATCH_TAGS.map((t) => (
                  <div
                    key={t.label}
                    className="flex items-center gap-2 bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2"
                  >
                    <t.icon className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
                    <div className="min-w-0">
                      <p className="text-[11px] text-white font-medium truncate">{t.label}</p>
                      <p className="text-[10px] text-slate-500 truncate">{t.sub}</p>
                    </div>
                    <BadgeCheck className="w-3.5 h-3.5 text-emerald-400 ml-auto shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Intent Scoring */}
          <motion.div {...fadeUp} transition={{ duration: 0.7, delay: 0.1 }} className="glass rounded-3xl p-7 sm:p-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-sky-400/15 flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-sky-300" />
              </div>
              <h3 className="font-display text-xl font-bold text-white">Intent Scoring</h3>
            </div>
            <p className="text-slate-400 text-sm mb-8">
              Identify high-intent companies most likely to convert.
            </p>

            <div className="space-y-6">
              {INTENT_BARS.map((bar) => (
                <div key={bar.label}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <bar.icon className="w-4 h-4 text-slate-400" />
                      <span className="text-sm text-slate-200">{bar.label}</span>
                    </div>
                    <span className="text-sm font-semibold text-white">{bar.value}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${bar.value}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className={`h-full rounded-full bg-gradient-to-r ${bar.color}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-5 mb-16">
          {/* Real-Time Signals */}
          <motion.div {...fadeUp} transition={{ duration: 0.7 }} className="glass rounded-3xl p-7 sm:p-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-violet-400/15 flex items-center justify-center">
                <Radar className="w-5 h-5 text-violet-300" />
              </div>
              <h3 className="font-display text-xl font-bold text-white">Real-Time Signals</h3>
            </div>
            <p className="text-slate-400 text-sm mb-8">Track hiring, funding, growth, and buying activity as it happens.</p>

            <div className="relative h-48 flex items-center justify-center">
              {[0, 1, 2].map((r) => (
                <div
                  key={r}
                  className="absolute rounded-full border border-white/10"
                  style={{ width: `${72 + r * 56}px`, height: `${72 + r * 56}px` }}
                />
              ))}
              <div className="absolute w-14 h-14 rounded-full bg-gradient-to-br from-violet-400 to-sky-400 flex items-center justify-center shadow-[0_0_35px_rgba(167,139,250,0.45)] animate-pulse-glow">
                <Radar className="w-6 h-6 text-slate-950" />
              </div>
              {[
                { top: "6%", left: "18%", seed: "1544005313-94ddf0286df2" },
                { top: "14%", right: "12%", seed: "1500648767791-00dcc994a43e" },
                { bottom: "10%", left: "10%", seed: "1472099645785-5658abf4ff4e" },
                { bottom: "4%", right: "20%", seed: "1508214751196-bcfd4ca60f91" },
              ].map((pos, i) => (
                <img
                  key={i}
                  src={`https://images.unsplash.com/photo-${pos.seed}?w=80&h=80&fit=crop&crop=faces`}
                  className="absolute w-9 h-9 rounded-full object-cover border-2 border-[#05070c]"
                  style={pos}
                  alt=""
                />
              ))}
            </div>
          </motion.div>

          {/* Decision Maker Contacts */}
          <motion.div {...fadeUp} transition={{ duration: 0.7, delay: 0.1 }} className="glass rounded-3xl p-7 sm:p-8 overflow-hidden">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-amber-400/15 flex items-center justify-center">
                <UserSquare2 className="w-5 h-5 text-amber-300" />
              </div>
              <h3 className="font-display text-xl font-bold text-white">Decision-Maker Contacts</h3>
            </div>
            <p className="text-slate-400 text-sm mb-6">Find verified key contacts at target companies.</p>

            <div className="relative h-52">
              <div className="absolute right-4 top-6 w-40 rotate-6 rounded-2xl bg-white/[0.04] border border-white/10 p-3 opacity-50" />
              <div className="absolute right-1 top-3 w-44 rotate-3 rounded-2xl bg-white/[0.05] border border-white/10 p-3 opacity-70" />
              <div className="relative w-full sm:w-64 rounded-2xl bg-[#0c1220] border border-white/10 p-4 shadow-2xl">
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces"
                    className="w-11 h-11 rounded-full object-cover"
                    alt="Alex Morgan"
                  />
                  <div>
                    <p className="text-sm text-white font-semibold">Alex Morgan</p>
                    <p className="text-[11px] text-slate-500">VP of Sales</p>
                  </div>
                </div>
                <div className="space-y-1.5 mb-3">
                  <p className="text-[11px] text-slate-300 flex items-center gap-1.5">
                    <Mail className="w-3 h-3 text-slate-500" /> alex.morgan@novaframe.com
                    <BadgeCheck className="w-3 h-3 text-emerald-400 ml-auto" />
                  </p>
                  <p className="text-[11px] text-slate-300 flex items-center gap-1.5">
                    <Phone className="w-3 h-3 text-slate-500" /> +1 656 452 462
                    <BadgeCheck className="w-3 h-3 text-emerald-400 ml-auto" />
                  </p>
                  <p className="text-[11px] text-slate-300 flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-slate-500" /> San Francisco, CA
                  </p>
                </div>
                <div className="flex gap-2">
                  <span className="text-[10px] px-2.5 py-1 rounded-full bg-emerald-400/15 text-emerald-300">
                    Budget Owner
                  </span>
                  <span className="text-[10px] px-2.5 py-1 rounded-full bg-sky-400/15 text-sky-300">
                    Sales Strategy
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.06] rounded-3xl overflow-hidden">
          {MINI_FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              {...fadeUp}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="bg-[#090d16] p-7 hover:bg-white/[0.03] transition-colors"
            >
              <f.icon className="w-5 h-5 text-emerald-300 mb-4" />
              <h4 className="text-white font-semibold text-sm mb-1.5">{f.title}</h4>
              <p className="text-slate-500 text-[13px] leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
