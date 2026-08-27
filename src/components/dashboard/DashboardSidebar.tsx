import { LayoutGrid, Users, Radar, Activity, Settings, Sparkles } from "lucide-react";

export type DashboardTab = "overview" | "leads" | "signals" | "activity" | "settings";

const ITEMS: { id: DashboardTab; label: string; icon: typeof LayoutGrid }[] = [
  { id: "overview", label: "Overview", icon: LayoutGrid },
  { id: "leads", label: "My Leads", icon: Users },
  { id: "signals", label: "Intent Signals", icon: Radar },
  { id: "activity", label: "Activity", icon: Activity },
  { id: "settings", label: "Settings", icon: Settings },
];

interface Props {
  active: DashboardTab;
  onChange: (tab: DashboardTab) => void;
  leadCount: number;
  mobile?: boolean;
}

export default function DashboardSidebar({ active, onChange, leadCount, mobile }: Props) {
  return (
    <aside
      className={
        mobile
          ? "flex flex-col w-full py-2 px-1"
          : "hidden lg:flex flex-col w-60 shrink-0 border-r border-white/[0.06] bg-white/[0.015] min-h-screen sticky top-0 py-6 px-4"
      }
    >
      <a href="/" className="flex items-center gap-2 mb-9 px-2">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-sky-400 flex items-center justify-center">
          <Sparkles className="w-4.5 h-4.5 text-slate-950" />
        </div>
        <span className="font-display font-bold text-white text-base">
          LeadFresh <span className="text-emerald-300">AI</span>
        </span>
      </a>

      <nav className="flex flex-col gap-1">
        {ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => onChange(item.id)}
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm transition-colors text-left ${
              active === item.id
                ? "bg-emerald-400/15 text-emerald-300"
                : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
            }`}
          >
            <item.icon className="w-4.5 h-4.5" />
            {item.label}
            {item.id === "leads" && (
              <span className="ml-auto text-[10px] bg-white/10 text-slate-300 px-1.5 py-0.5 rounded-full">
                {leadCount}
              </span>
            )}
          </button>
        ))}
      </nav>

      <div className="mt-auto glass rounded-2xl p-4">
        <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
          Upgrade to unlock unlimited leads and advanced ICP targeting.
        </p>
        <a
          href="/#pricing"
          className="block text-center text-xs font-semibold bg-gradient-to-r from-emerald-400 to-sky-400 text-slate-950 rounded-lg py-2 hover:brightness-110 transition-all"
        >
          View Plans
        </a>
      </div>
    </aside>
  );
}
