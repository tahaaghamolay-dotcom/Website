import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Mail, Lock, User, Building2, Loader2, Sparkles, ArrowRight } from "lucide-react";
import { useUI } from "../lib/UIContext";
import { useAuth } from "../lib/AuthContext";
import { useToast } from "../lib/ToastContext";
import { useNavigate } from "react-router-dom";

export default function AuthModal() {
  const { authOpen, authMode, selectedPlan, closeAuth, openAuth } = useUI();
  const { signIn, signUp, signInDemo } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (authOpen) {
      setError("");
      setLoading(false);
    }
  }, [authOpen, authMode]);

  useEffect(() => {
    if (!authOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeAuth();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [authOpen, closeAuth]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (authMode === "signup") {
        if (!name || !email || !password) throw new Error("Please fill in all fields.");
        await signUp({ name, email, password, company });
        showToast(`Welcome ${name}! Your free trial account is now active.`, "success");
      } else {
        if (!email || !password) throw new Error("Enter your email and password.");
        await signIn(email, password);
        showToast("Signed in successfully. Welcome back!", "success");
      }
      closeAuth();
      setName("");
      setEmail("");
      setCompany("");
      setPassword("");
      navigate("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDemo() {
    setLoading(true);
    try {
      await signInDemo();
      showToast("You're in the demo workspace — explore freely!", "info");
      closeAuth();
      navigate("/dashboard");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AnimatePresence>
      {authOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={closeAuth} />
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-md glass rounded-3xl p-7 sm:p-8 shadow-[0_20px_80px_rgba(0,0,0,0.6)] border-white/10"
          >
            <button
              onClick={closeAuth}
              className="absolute top-5 right-5 text-slate-400 hover:text-white transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-sky-400 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-slate-950" />
              </div>
              <span className="font-display font-bold text-lg text-white">LeadFresh AI</span>
            </div>

            <h3 className="font-display text-2xl font-bold text-white mt-4">
              {authMode === "signup" ? "Start your free trial" : "Welcome back"}
            </h3>
            <p className="text-slate-400 text-sm mt-1.5">
              {authMode === "signup"
                ? selectedPlan
                  ? `Selected plan: ${selectedPlan} — no credit card required.`
                  : "14 days of full access, no credit card required."
                : "Sign in to view your sales dashboard."}
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-3.5">
              {authMode === "signup" && (
                <div className="relative">
                  <User className="w-4.5 h-4.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full name"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-400/50 focus:bg-white/[0.07] transition-colors"
                  />
                </div>
              )}
              <div className="relative">
                <Mail className="w-4.5 h-4.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Work email"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-400/50 focus:bg-white/[0.07] transition-colors"
                />
              </div>
              {authMode === "signup" && (
                <div className="relative">
                  <Building2 className="w-4.5 h-4.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Company (optional)"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-400/50 focus:bg-white/[0.07] transition-colors"
                  />
                </div>
              )}
              <div className="relative">
                <Lock className="w-4.5 h-4.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Password"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-400/50 focus:bg-white/[0.07] transition-colors"
                />
              </div>

              {error && (
                <p className="text-rose-400 text-xs bg-rose-500/10 border border-rose-500/20 rounded-lg px-3 py-2">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-400 to-sky-400 text-slate-950 font-semibold rounded-xl py-3 text-sm hover:brightness-110 hover:scale-[1.02] active:scale-[0.99] transition-all disabled:opacity-60 disabled:pointer-events-none shadow-[0_0_30px_rgba(52,211,153,0.25)]"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    {authMode === "signup" ? "Start Free Trial" : "Sign In"}
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <button
              onClick={handleDemo}
              disabled={loading}
              className="w-full mt-3 text-xs text-slate-400 hover:text-emerald-300 border border-white/10 rounded-xl py-2.5 transition-colors disabled:opacity-50"
            >
              Quick sign-in with demo account (no signup)
            </button>

            <p className="text-center text-sm text-slate-400 mt-5">
              {authMode === "signup" ? "Already have an account?" : "Don't have an account?"}{" "}
              <button
                onClick={() => openAuth(authMode === "signup" ? "signin" : "signup", selectedPlan ?? undefined)}
                className="text-emerald-300 hover:text-emerald-200 font-medium"
              >
                {authMode === "signup" ? "Sign in" : "Start free trial"}
              </button>
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
