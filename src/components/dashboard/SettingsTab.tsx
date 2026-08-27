import { useNavigate } from "react-router-dom";
import { useAuth } from "../../lib/AuthContext";
import { Building2, Mail, User, Shield, LogOut, Crown } from "lucide-react";

export default function SettingsTab() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="grid lg:grid-cols-2 gap-5 max-w-4xl">
      <div className="glass rounded-2xl p-6">
        <p className="text-white font-semibold text-sm mb-6">Profile</p>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-400 to-sky-400 flex items-center justify-center text-slate-950 font-bold text-xl">
            {(user?.name || "A").charAt(0)}
          </div>
          <div>
            <p className="text-white font-semibold">{user?.name}</p>
            <p className="text-slate-500 text-sm">{user?.company || "Independent"}</p>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-sm">
            <User className="w-4 h-4 text-slate-500" />
            <span className="text-slate-300">{user?.name}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Mail className="w-4 h-4 text-slate-500" />
            <span className="text-slate-300">{user?.email}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Building2 className="w-4 h-4 text-slate-500" />
            <span className="text-slate-300">{user?.company || "—"}</span>
          </div>
        </div>
      </div>

      <div className="glass rounded-2xl p-6">
        <p className="text-white font-semibold text-sm mb-6">Plan &amp; Billing</p>
        <div className="flex items-center gap-3 mb-5 p-4 rounded-xl bg-gradient-to-r from-emerald-400/10 to-sky-400/10 border border-emerald-400/20">
          <Crown className="w-6 h-6 text-emerald-300 shrink-0" />
          <div>
            <p className="text-white font-medium text-sm">{user?.plan} Plan</p>
            <p className="text-slate-500 text-xs">14-day free trial active</p>
          </div>
        </div>
        <a
          href="/#pricing"
          className="block text-center text-sm font-semibold bg-white/10 text-white rounded-xl py-3 hover:bg-white/15 transition-colors mb-3"
        >
          Manage Subscription
        </a>
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-6">
          <Shield className="w-3.5 h-3.5" />
          Your data is encrypted and never shared with third parties.
        </div>
        <button
          onClick={async () => {
            await signOut();
            navigate("/");
          }}
          className="flex items-center justify-center gap-2 w-full text-sm text-rose-300 border border-rose-400/20 rounded-xl py-2.5 hover:bg-rose-500/10 transition-colors"
        >
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </div>
    </div>
  );
}
