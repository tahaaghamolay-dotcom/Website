import { useState } from "react";
import { Search, Bell, Sparkles, LogOut, ChevronDown, Menu } from "lucide-react";
import { useAuth } from "../../lib/AuthContext";
import { useNavigate } from "react-router-dom";

interface Props {
  search: string;
  onSearch: (v: string) => void;
  onMobileMenu: () => void;
  activeLabel: string;
}

export default function DashboardTopbar({ search, onSearch, onMobileMenu, activeLabel }: Props) {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="sticky top-0 z-30 flex items-center gap-3 px-5 sm:px-8 py-4 border-b border-white/[0.06] bg-[#05070c]/85 backdrop-blur-xl">
      <button className="lg:hidden text-white" onClick={onMobileMenu} aria-label="Menu">
        <Menu className="w-5 h-5" />
      </button>
      <div className="hidden sm:block">
        <p className="text-white font-display font-semibold text-sm">{activeLabel}</p>
      </div>
      <div className="flex-1 flex items-center gap-2 bg-white/[0.04] border border-white/10 rounded-xl px-3.5 py-2 max-w-md ml-2">
        <Search className="w-4 h-4 text-slate-500 shrink-0" />
        <input
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search companies, signals, or contacts..."
          className="bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none w-full min-w-0"
        />
      </div>
      <div className="flex items-center gap-3 ml-auto">
        <span className="hidden sm:flex items-center gap-1.5 text-xs text-slate-300 bg-white/[0.04] border border-white/10 rounded-full px-3 py-1.5">
          <Sparkles className="w-3.5 h-3.5 text-emerald-300" /> 1,240 credits
        </span>
        <button className="relative text-slate-400 hover:text-white transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400" />
        </button>
        <div className="relative">
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-full hover:bg-white/[0.06] transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-sky-400 flex items-center justify-center text-slate-950 text-xs font-bold">
              {(user?.name || "A").charAt(0)}
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-500 hidden sm:block" />
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 glass rounded-xl p-2 shadow-2xl z-40">
              <p className="px-3 py-2 text-xs text-slate-400 truncate">{user?.email}</p>
              <button
                onClick={async () => {
                  await signOut();
                  navigate("/");
                }}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-rose-300 hover:bg-rose-500/10 transition-colors"
              >
                <LogOut className="w-4 h-4" /> Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
