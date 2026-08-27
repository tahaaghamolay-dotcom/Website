import { useEffect, useState } from "react";
import { Menu, X, Sparkles, LayoutDashboard, LogOut } from "lucide-react";
import { useUI } from "../lib/UIContext";
import { useAuth } from "../lib/AuthContext";
import { useNavigate } from "react-router-dom";

const LINKS = [
  { href: "#features", label: "Features" },
  { href: "#pricing", label: "Pricing" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
  { href: "#faq", label: "FAQ" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { openAuth } = useUI();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#05070c]/80 backdrop-blur-xl border-b border-white/10 py-3" : "py-5"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-sky-400 flex items-center justify-center">
            <Sparkles className="w-4.5 h-4.5 text-slate-950" />
          </div>
          <span className="font-display font-bold text-white text-lg tracking-tight">
            LeadFresh <span className="text-emerald-300">AI</span>
          </span>
        </a>

        <div className="hidden lg:flex items-center gap-8">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[13.5px] text-slate-300 hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          {user ? (
            <>
              <button
                onClick={() => navigate("/dashboard")}
                className="flex items-center gap-1.5 text-sm text-slate-200 hover:text-white bg-white/5 border border-white/10 rounded-full px-4 py-2 transition-colors"
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </button>
              <button
                onClick={() => signOut()}
                className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-rose-300 px-3 py-2 transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => openAuth("signin")}
                className="text-sm font-medium bg-white text-slate-950 rounded-full px-5 py-2.5 hover:bg-slate-100 transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => openAuth("signup")}
                className="text-sm font-semibold bg-gradient-to-r from-emerald-400 to-sky-400 text-slate-950 rounded-full px-5 py-2.5 hover:brightness-110 hover:scale-105 transition-all shadow-[0_0_25px_rgba(52,211,153,0.25)]"
              >
                Start Free Trial
              </button>
            </>
          )}
        </div>

        <button
          className="lg:hidden text-white"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="lg:hidden mt-4 mx-5 glass rounded-2xl p-5 flex flex-col gap-4">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-sm text-slate-200"
            >
              {link.label}
            </a>
          ))}
          <div className="flex flex-col gap-2.5 pt-3 border-t border-white/10">
            {user ? (
              <>
                <button
                  onClick={() => {
                    navigate("/dashboard");
                    setMobileOpen(false);
                  }}
                  className="text-sm font-medium bg-white/10 text-white rounded-full px-5 py-2.5"
                >
                  Dashboard
                </button>
                <button
                  onClick={() => {
                    signOut();
                    setMobileOpen(false);
                  }}
                  className="text-sm text-rose-300 rounded-full px-5 py-2"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    openAuth("signin");
                    setMobileOpen(false);
                  }}
                  className="text-sm font-medium bg-white text-slate-950 rounded-full px-5 py-2.5"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    openAuth("signup");
                    setMobileOpen(false);
                  }}
                  className="text-sm font-semibold bg-gradient-to-r from-emerald-400 to-sky-400 text-slate-950 rounded-full px-5 py-2.5"
                >
                  Start Free Trial
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
