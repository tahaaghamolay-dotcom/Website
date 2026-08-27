import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    q: "How does LeadFresh AI find high-intent companies?",
    a: "We continuously scan public and licensed data sources — job postings, funding announcements, technology adoption, website activity, and more — then score every company against your ideal customer profile in real time.",
  },
  {
    q: "Are the decision-maker contacts verified?",
    a: "Yes. Every email and phone number goes through a real-time verification pipeline before it's shown in your dashboard, so you spend less time chasing bounced emails.",
  },
  {
    q: "Can I cancel or change my plan anytime?",
    a: "Absolutely. All plans are month-to-month with no long-term contracts. You can upgrade, downgrade, or cancel directly from your dashboard settings at any time.",
  },
  {
    q: "Do you integrate with my CRM?",
    a: "LeadFresh integrates natively with HubSpot, Salesforce, Pipedrive, and Zapier on the Growth and Scale plans, so leads flow straight into your existing workflow.",
  },
  {
    q: "Is there a free trial?",
    a: "Yes — every plan includes a 14-day free trial with full feature access and no credit card required to get started.",
  },
  {
    q: "What counts as a 'lead' on my plan?",
    a: "A lead is any unique company profile with matched intent signals that you unlock or export. Viewing signals on your dashboard is unlimited; unlocking full contact details counts against your monthly quota.",
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-24 sm:py-32 border-t border-white/[0.06]">
      <div className="max-w-3xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="text-[11px] tracking-[0.2em] uppercase text-emerald-300">FAQ</span>
          <h2 className="font-display text-3xl sm:text-[2.6rem] font-bold text-white leading-tight mt-3">
            Frequently asked <span className="text-gradient">questions</span>
          </h2>
        </motion.div>

        <div className="space-y-3">
          {FAQS.map((item, i) => (
            <motion.div
              key={item.q}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.04 }}
              className="glass rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span className="text-white font-medium text-sm sm:text-base">{item.q}</span>
                <ChevronDown
                  className={`w-4.5 h-4.5 text-slate-400 shrink-0 transition-transform duration-300 ${
                    open === i ? "rotate-180 text-emerald-300" : ""
                  }`}
                />
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-5 text-slate-400 text-sm leading-relaxed">{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
