import { useState } from "react";
import { Sparkles, Twitter, Linkedin, Github, Loader2, ArrowRight } from "lucide-react";
import { api } from "../lib/store";
import { useToast } from "../lib/ToastContext";

const COLUMNS = [
  {
    title: "Product",
    links: ["Features", "Pricing", "How It Works", "Integrations", "Changelog"],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Blog", "Press", "Contact"],
  },
  {
    title: "Resources",
    links: ["Help Center", "API Docs", "Community", "Case Studies", "Guides"],
  },
  {
    title: "Legal",
    links: ["Privacy Policy", "Terms of Service", "Security", "GDPR"],
  },
];

export default function Footer() {
  const { showToast } = useToast();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) {
      showToast("Enter a valid email address.", "error");
      return;
    }
    setLoading(true);
    try {
      await api.createLead({
        name: email.split("@")[0],
        email,
        source: "Newsletter",
        message: "Subscribed to the LeadFresh AI newsletter.",
      });
      showToast("Subscribed! Watch your inbox for sales intelligence tips.", "success");
      setEmail("");
    } finally {
      setLoading(false);
    }
  }

  return (
    <footer className="relative border-t border-white/[0.06] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-[1.4fr_2fr] gap-14 pb-14 border-b border-white/[0.06]">
          <div>
            <a href="#top" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-sky-400 flex items-center justify-center">
                <Sparkles className="w-4.5 h-4.5 text-slate-950" />
              </div>
              <span className="font-display font-bold text-white text-lg">
                LeadFresh <span className="text-emerald-300">AI</span>
              </span>
            </a>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs mb-6">
              AI-powered sales intelligence that finds high-intent clients before
              your competitors do.
            </p>
            <form onSubmit={handleSubscribe} className="flex items-center gap-2 max-w-sm">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Your email"
                className="flex-1 bg-white/5 border border-white/10 rounded-full py-2.5 px-4 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-400/50 min-w-0"
              />
              <button
                type="submit"
                disabled={loading}
                className="shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-emerald-400 to-sky-400 text-slate-950 flex items-center justify-center hover:scale-105 transition-transform disabled:opacity-60"
                aria-label="Subscribe"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
              </button>
            </form>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <p className="text-white text-sm font-semibold mb-4">{col.title}</p>
                <ul className="space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a href="#top" className="text-slate-500 text-sm hover:text-emerald-300 transition-colors">
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-7">
          <p className="text-slate-600 text-xs">© {new Date().getFullYear()} LeadFresh AI. All rights reserved.</p>
          <div className="flex items-center gap-4">
            {[Twitter, Linkedin, Github].map((Icon, i) => (
              <a
                key={i}
                href="#top"
                className="w-8 h-8 rounded-full glass flex items-center justify-center text-slate-500 hover:text-emerald-300 transition-colors"
              >
                <Icon className="w-3.5 h-3.5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
