import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Bell,
  Settings,
  LayoutGrid,
  Users,
  Radar,
  ListFilter,
  UserCheck,
  Bookmark,
  Target,
  Activity,
  Download,
  HelpCircle,
  Sparkles,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";

const SIDEBAR_ICONS = [
  { icon: LayoutGrid, active: true },
  { icon: UserCheck, active: false },
  { icon: Radar, active: false },
  { icon: Search, active: false },
  { icon: Users, active: false },
  { icon: ListFilter, active: false },
  { icon: Bookmark, active: false },
  { icon: Target, active: false },
  { icon: Activity, active: false },
  { icon: Download, active: false },
];

const OPPS = [
  { company: "NovaFrame", why: "Hiring", who: "Sarah Chen", title: "Head of Product", time: "5m ago", tag: "bg-emerald-400/15 text-emerald-300" },
  { company: "LaunchOrbit", why: "Tech Signal", who: "Marcus Rody", title: "CEO", time: "12m ago", tag: "bg-sky-400/15 text-sky-300" },
  { company: "BriteMeta", why: "Marketing Director", who: "Olivia Brown", title: "Marketing Director", time: "25m ago", tag: "bg-violet-400/15 text-violet-300" },
  { company: "Stackify", why: "VP Engineering", who: "James Park", title: "VP Engineering", time: "1h ago", tag: "bg-amber-400/15 text-amber-300" },
];

export default function DashboardMock() {
  const [leadsToday, setLeadsToday] = useState(73);
  const [totalLeads, setTotalLeads] = useState(12480);

  useEffect(() => {
    const iv = setInterval(() => {
      setLeadsToday((v) => v + (Math.random() > 0.55 ? 1 : 0));
      setTotalLeads((v) => v + (Math.random() > 0.5 ? Math.floor(Math.random() * 3) : 0));
    }, 2600);
    return () => clearInterval(iv);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateX: 6 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
      style={{ perspective: 1200 }}
    >
      <div className="absolute -inset-10 bg-[radial-gradient(ellipse_at_center,rgba(52,217,160,0.18),transparent_65%)] blur-2xl -z-10" />

      <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-[0_30px_100px_rgba(0,0,0,0.6)] bg-[#0a0f18]">
        {/* browser top bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-400/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/70" />
          </div>
          <div className="flex-1 flex items-center gap-2 bg-white/[0.04] rounded-lg px-3 py-1.5 mx-3 max-w-xs">
            <Search className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-[11px] text-slate-500">app.leadfresh.ai/dashboard</span>
          </div>
          <div className="hidden sm:flex items-center gap-3 ml-auto">
            <span className="text-[10px] text-slate-400 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-emerald-300" /> Credits 1,240
            </span>
            <Settings className="w-3.5 h-3.5 text-slate-500" />
            <Bell className="w-3.5 h-3.5 text-slate-500" />
          </div>
        </div>

        <div className="flex">
          {/* sidebar */}
          <div className="hidden sm:flex flex-col items-center gap-3 py-5 px-3 border-r border-white/[0.06] bg-white/[0.015]">
            {SIDEBAR_ICONS.map((it, i) => (
              <div
                key={i}
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                  it.active ? "bg-emerald-400/15 text-emerald-300" : "text-slate-500"
                }`}
              >
                <it.icon className="w-4 h-4" />
              </div>
            ))}
            <div className="mt-auto text-slate-600">
              <HelpCircle className="w-4 h-4" />
            </div>
          </div>

          {/* main content */}
          <div className="flex-1 p-4 sm:p-5 min-w-0">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-white text-sm font-semibold">Good morning, Alex</p>
                <p className="text-[10.5px] text-slate-500">Here's what's happening today</p>
              </div>
              <span className="text-[10px] text-slate-500 border border-white/10 rounded-full px-2.5 py-1 hidden sm:block">
                May 17, 2024
              </span>
            </div>

            {/* KPI row */}
            <div className="grid grid-cols-3 gap-2.5 mb-3">
              <div className="glass rounded-xl p-3">
                <p className="text-[9.5px] text-slate-500 mb-1">Total Leads</p>
                <p className="text-white font-display font-bold text-base sm:text-lg tabular-nums">
                  {totalLeads.toLocaleString()}
                </p>
                <p className="text-[9px] text-emerald-400 flex items-center gap-0.5 mt-0.5">
                  <TrendingUp className="w-2.5 h-2.5" /> +24% all time
                </p>
              </div>
              <div className="glass rounded-xl p-3">
                <p className="text-[9.5px] text-slate-500 mb-1">Leads This Month</p>
                <p className="text-white font-display font-bold text-base sm:text-lg tabular-nums">1,842</p>
                <p className="text-[9px] text-emerald-400 flex items-center gap-0.5 mt-0.5">
                  <TrendingUp className="w-2.5 h-2.5" /> +16% vs last
                </p>
              </div>
              <div className="glass rounded-xl p-3">
                <p className="text-[9.5px] text-slate-500 mb-1">Leads Today</p>
                <p className="text-white font-display font-bold text-base sm:text-lg tabular-nums">{leadsToday}</p>
                <p className="text-[9px] text-sky-400 flex items-center gap-0.5 mt-0.5">
                  <TrendingUp className="w-2.5 h-2.5" /> +18% yesterday
                </p>
              </div>
            </div>

            {/* AI insight banner */}
            <div className="rounded-xl p-3 mb-3 bg-gradient-to-r from-emerald-400/10 to-sky-400/10 border border-emerald-400/20 flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-emerald-300 mt-0.5 shrink-0" />
              <div>
                <p className="text-[11px] text-emerald-200 font-medium">High intent surge detected</p>
                <p className="text-[10px] text-slate-400">
                  We spotted a 31% increase in buying signals across SaaS companies this week.
                </p>
              </div>
            </div>

            {/* opportunities table */}
            <div className="glass rounded-xl p-3 mb-3">
              <div className="flex items-center justify-between mb-2.5">
                <p className="text-[11px] text-white font-semibold">Today's Best Opportunities</p>
                <ArrowUpRight className="w-3 h-3 text-slate-500" />
              </div>
              <div className="space-y-2">
                {OPPS.map((o, i) => (
                  <div key={i} className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-6 h-6 rounded-md bg-white/10 flex items-center justify-center text-[9px] text-slate-300 shrink-0">
                        {o.company[0]}
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10.5px] text-white truncate">{o.company}</p>
                        <p className="text-[9px] text-slate-500 truncate">{o.who} · {o.title}</p>
                      </div>
                    </div>
                    <span className={`text-[9px] px-2 py-0.5 rounded-full shrink-0 ${o.tag}`}>{o.why}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div className="glass rounded-xl p-3">
                <p className="text-[10px] text-white font-medium mb-2">Recent Activity</p>
                <div className="space-y-1.5">
                  <p className="text-[9.5px] text-slate-500">NovaFrame added to saved list</p>
                  <p className="text-[9.5px] text-slate-500">7 new leads exported</p>
                  <p className="text-[9.5px] text-slate-500">Targeting & ICP updated</p>
                </div>
              </div>
              <div className="glass rounded-xl p-3 flex flex-col items-center justify-center">
                <div
                  className="w-14 h-14 rounded-full mb-1.5"
                  style={{
                    background:
                      "conic-gradient(#34d9a0 0% 45%, #5fb6ff 45% 70%, #a78bfa 70% 88%, #f59e0b 88% 100%)",
                  }}
                />
                <p className="text-[9px] text-slate-500">Lead Sources · 30 Day</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* floating alert card */}
      <motion.div
        initial={{ opacity: 0, x: -20, y: 10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 0.6, duration: 0.7 }}
        className="animate-float-slow absolute -bottom-6 -left-4 sm:-left-8 glass rounded-xl p-3 w-52 shadow-2xl hidden sm:block"
      >
        <div className="flex items-center gap-2 mb-1.5">
          <div className="w-6 h-6 rounded-md bg-sky-400/20 flex items-center justify-center text-[10px]">📦</div>
          <p className="text-[10.5px] text-white font-medium">Dropbox</p>
          <span className="ml-auto text-[9px] text-emerald-300">89%</span>
        </div>
        <p className="text-[9px] text-slate-500">Looking for secure file storage pricing</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20, y: -10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 0.8, duration: 0.7 }}
        className="animate-float-slow absolute -top-5 -right-4 sm:-right-8 glass rounded-xl p-3 w-44 shadow-2xl hidden sm:block"
        style={{ animationDelay: "1.2s" }}
      >
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-glow" />
          <p className="text-[10px] text-white font-medium">Live signal captured</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
