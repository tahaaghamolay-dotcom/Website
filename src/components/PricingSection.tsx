import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { useUI } from "../lib/UIContext";

const PLANS = [
  {
    name: "Starter",
    tagline: "For freelancers testing the waters",
    monthly: 49,
    yearly: 39,
    features: [
      "500 verified leads / month",
      "Basic intent scoring",
      "Email support",
      "1 saved list",
      "CSV export",
    ],
    highlight: false,
  },
  {
    name: "Growth",
    tagline: "For agencies scaling outbound",
    monthly: 129,
    yearly: 99,
    features: [
      "3,000 verified leads / month",
      "Advanced intent scoring",
      "Real-time buying signals",
      "Unlimited saved lists",
      "Decision-maker contacts",
      "Priority support",
    ],
    highlight: true,
  },
  {
    name: "Scale",
    tagline: "For sales teams that need volume",
    monthly: 299,
    yearly: 239,
    features: [
      "Unlimited verified leads",
      "Custom AI targeting & ICP",
      "CRM & Zapier integrations",
      "Dedicated account manager",
      "API access",
      "Team seats included",
    ],
    highlight: false,
  },
];

export default function PricingSection() {
  const [yearly, setYearly] = useState(true);
  const { openAuth } = useUI();

  return (
    <section id="pricing" className="relative py-24 sm:py-32 border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <span className="text-[11px] tracking-[0.2em] uppercase text-emerald-300">Pricing</span>
          <h2 className="font-display text-3xl sm:text-[2.6rem] font-bold text-white leading-tight mt-3">
            Simple pricing that <span className="text-gradient">scales with you</span>
          </h2>
          <p className="text-slate-400 mt-4">No hidden fees. Cancel anytime. 14-day free trial on every plan.</p>

          <div className="inline-flex items-center gap-1 glass rounded-full p-1 mt-8">
            <button
              onClick={() => setYearly(false)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                !yearly ? "bg-white text-slate-950" : "text-slate-400"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setYearly(true)}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                yearly ? "bg-white text-slate-950" : "text-slate-400"
              }`}
            >
              Yearly
              <span className="text-[10px] bg-emerald-400/20 text-emerald-300 px-1.5 py-0.5 rounded-full">
                Save 22%
              </span>
            </button>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`relative rounded-3xl p-8 flex flex-col ${
                plan.highlight
                  ? "bg-gradient-to-b from-emerald-400/10 to-transparent border-2 border-emerald-400/40 shadow-[0_0_60px_rgba(52,217,160,0.15)]"
                  : "glass"
              }`}
            >
              {plan.highlight && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-gradient-to-r from-emerald-400 to-sky-400 text-slate-950 text-[11px] font-semibold px-3.5 py-1.5 rounded-full">
                  <Sparkles className="w-3 h-3" /> Most Popular
                </span>
              )}
              <h3 className="font-display text-xl font-bold text-white">{plan.name}</h3>
              <p className="text-slate-500 text-sm mt-1">{plan.tagline}</p>
              <div className="mt-6 flex items-baseline gap-1.5">
                <span className="font-display text-4xl font-bold text-white">
                  ${yearly ? plan.yearly : plan.monthly}
                </span>
                <span className="text-slate-500 text-sm">/ month</span>
              </div>
              <button
                onClick={() => openAuth("signup", plan.name)}
                className={`mt-7 w-full py-3 rounded-full font-semibold text-sm transition-all ${
                  plan.highlight
                    ? "bg-gradient-to-r from-emerald-400 to-sky-400 text-slate-950 hover:brightness-110 hover:scale-[1.02] shadow-[0_0_30px_rgba(52,211,153,0.3)]"
                    : "bg-white/10 text-white hover:bg-white/15"
                }`}
              >
                Start Free Trial
              </button>
              <ul className="mt-8 space-y-3 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-slate-300">
                    <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
