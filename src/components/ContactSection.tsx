import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Loader2, Send } from "lucide-react";
import { api } from "../lib/store";
import { useToast } from "../lib/ToastContext";

export default function ContactSection() {
  const { showToast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      showToast("Please fill in name, email, and message.", "error");
      return;
    }
    setLoading(true);
    try {
      await api.createLead({
        name: form.name,
        email: form.email,
        company: form.company,
        message: form.message,
        source: "Contact Form",
      });
      setSent(true);
      showToast("Message sent! Our team will reach out within 24h.", "success");
      setForm({ name: "", email: "", company: "", message: "" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contact" className="relative py-24 sm:py-32 border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-14 items-start">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-[11px] tracking-[0.2em] uppercase text-emerald-300">Contact</span>
          <h2 className="font-display text-3xl sm:text-[2.6rem] font-bold text-white leading-tight mt-3">
            Let's talk about your <span className="text-gradient">pipeline</span>
          </h2>
          <p className="text-slate-400 mt-4 leading-relaxed max-w-md">
            Have questions about plans, integrations, or enterprise pricing? Send
            us a message and a member of our team will get back to you within one
            business day.
          </p>

          <div className="mt-10 space-y-5">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl glass flex items-center justify-center">
                <Mail className="w-5 h-5 text-emerald-300" />
              </div>
              <div>
                <p className="text-white text-sm font-medium">Email</p>
                <p className="text-slate-500 text-sm">hello@leadfresh.ai</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl glass flex items-center justify-center">
                <Phone className="w-5 h-5 text-sky-300" />
              </div>
              <div>
                <p className="text-white text-sm font-medium">Phone</p>
                <p className="text-slate-500 text-sm">+1 (415) 555-0142</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl glass flex items-center justify-center">
                <MapPin className="w-5 h-5 text-violet-300" />
              </div>
              <div>
                <p className="text-white text-sm font-medium">Office</p>
                <p className="text-slate-500 text-sm">San Francisco, CA</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          onSubmit={handleSubmit}
          className="glass rounded-3xl p-7 sm:p-8 space-y-4"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <input
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              placeholder="Full name"
              className="bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-400/50 focus:bg-white/[0.07] transition-colors"
            />
            <input
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              type="email"
              placeholder="Work email"
              className="bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-400/50 focus:bg-white/[0.07] transition-colors"
            />
          </div>
          <input
            value={form.company}
            onChange={(e) => update("company", e.target.value)}
            placeholder="Company (optional)"
            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-400/50 focus:bg-white/[0.07] transition-colors"
          />
          <textarea
            value={form.message}
            onChange={(e) => update("message", e.target.value)}
            placeholder="Tell us about your sales team and goals..."
            rows={5}
            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-400/50 focus:bg-white/[0.07] transition-colors resize-none"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-400 to-sky-400 text-slate-950 font-semibold rounded-xl py-3.5 text-sm hover:brightness-110 hover:scale-[1.01] transition-all disabled:opacity-60 disabled:pointer-events-none shadow-[0_0_30px_rgba(52,211,153,0.25)]"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            {sent ? "Send another message" : "Send message"}
          </button>
        </motion.form>
      </div>
    </section>
  );
}
