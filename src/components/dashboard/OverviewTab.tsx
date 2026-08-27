import { useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Sparkles, TrendingUp, Users, Target, ArrowUpRight } from "lucide-react";
import type { LeadRecord } from "../../lib/types";
import { timeAgo } from "../../lib/format";

const COLORS: Record<string, string> = {
  Seed: "#34d9a0",
  "Contact Form": "#5fb6ff",
  "Start Free Trial": "#a78bfa",
  Newsletter: "#f59e0b",
  "Demo Request": "#fb7185",
};

export default function OverviewTab({ leads }: { leads: LeadRecord[] }) {
  const avgIntent = useMemo(
    () => (leads.length ? Math.round(leads.reduce((s, l) => s + l.intent, 0) / leads.length) : 0),
    [leads]
  );
  const qualified = leads.filter((l) => l.status === "Qualified" || l.status === "Won").length;
  const todayCount = useMemo(() => {
    const now = Date.now();
    return leads.filter((l) => now - l.createdAt < 1000 * 60 * 60 * 24).length;
  }, [leads]);

  const sourceData = useMemo(() => {
    const map = new Map<string, number>();
    leads.forEach((l) => map.set(l.source, (map.get(l.source) || 0) + 1));
    return Array.from(map.entries()).map(([name, value]) => ({ name, value }));
  }, [leads]);

  const topOpps = useMemo(() => [...leads].sort((a, b) => b.intent - a.intent).slice(0, 5), [leads]);
  const recent = useMemo(() => [...leads].sort((a, b) => b.createdAt - a.createdAt).slice(0, 5), [leads]);

  const kpis = [
    { label: "Total Leads", value: leads.length.toLocaleString(), icon: Users, trend: "+24% all time", color: "text-emerald-400" },
    { label: "Qualified / Won", value: qualified.toLocaleString(), icon: Target, trend: "+16% vs last month", color: "text-sky-400" },
    { label: "New Today", value: todayCount.toLocaleString(), icon: TrendingUp, trend: "Live updates", color: "text-violet-400" },
    { label: "Avg. Intent Score", value: `${avgIntent}%`, icon: Sparkles, trend: "High intent surge", color: "text-amber-400" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((k) => (
          <div key={k.label} className="glass rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs text-slate-500">{k.label}</p>
              <k.icon className={`w-4 h-4 ${k.color}`} />
            </div>
            <p className="font-display text-2xl font-bold text-white tabular-nums">{k.value}</p>
            <p className={`text-[11px] mt-1 flex items-center gap-1 ${k.color}`}>
              <TrendingUp className="w-3 h-3" /> {k.trend}
            </p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl p-5 bg-gradient-to-r from-emerald-400/10 to-sky-400/10 border border-emerald-400/20 flex items-start gap-3">
        <Sparkles className="w-5 h-5 text-emerald-300 mt-0.5 shrink-0" />
        <div>
          <p className="text-sm text-emerald-200 font-medium">High intent surge detected</p>
          <p className="text-xs text-slate-400 mt-0.5">
            We spotted a 31% increase in buying signals across SaaS companies matching your ICP this week.
            Review your top opportunities below.
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1.6fr_1fr] gap-5">
        <div className="glass rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="text-white font-semibold text-sm">Today's Best Opportunities</p>
            <ArrowUpRight className="w-4 h-4 text-slate-500" />
          </div>
          <div className="space-y-1">
            <div className="hidden sm:grid grid-cols-[1.4fr_1fr_0.9fr_0.7fr] gap-3 text-[11px] text-slate-500 uppercase tracking-wide px-3 pb-2 border-b border-white/[0.06]">
              <span>Company</span>
              <span>Decision Maker</span>
              <span>Intent</span>
              <span>Added</span>
            </div>
            {topOpps.map((o) => (
              <div
                key={o.id}
                className="grid grid-cols-2 sm:grid-cols-[1.4fr_1fr_0.9fr_0.7fr] gap-3 items-center px-3 py-3 rounded-xl hover:bg-white/[0.03] transition-colors"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-xs text-slate-300 shrink-0">
                    {(o.company || "?")[0]}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm text-white truncate">{o.company}</p>
                    <p className="text-[11px] text-slate-500 truncate">{o.source}</p>
                  </div>
                </div>
                <div className="min-w-0 hidden sm:block">
                  <p className="text-sm text-slate-300 truncate">{o.name}</p>
                  <p className="text-[11px] text-slate-500 truncate">{o.title}</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-14 rounded-full bg-white/10 overflow-hidden hidden sm:block">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-sky-400"
                      style={{ width: `${o.intent}%` }}
                    />
                  </div>
                  <span className="text-xs text-slate-300">{o.intent}%</span>
                </div>
                <span className="text-[11px] text-slate-500">{timeAgo(o.createdAt)}</span>
              </div>
            ))}
            {topOpps.length === 0 && (
              <p className="text-sm text-slate-500 text-center py-8">No leads yet — they'll show up here.</p>
            )}
          </div>
        </div>

        <div className="space-y-5">
          <div className="glass rounded-2xl p-5">
            <p className="text-white font-semibold text-sm mb-4">Lead Sources</p>
            <div className="h-40 flex items-center justify-center">
              {sourceData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={sourceData} dataKey="value" nameKey="name" innerRadius={38} outerRadius={62} paddingAngle={3}>
                      {sourceData.map((d) => (
                        <Cell key={d.name} fill={COLORS[d.name] || "#94a3b8"} stroke="none" />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ background: "#0c1220", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, fontSize: 12 }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-xs text-slate-500">No data yet</p>
              )}
            </div>
            <div className="space-y-1.5 mt-2">
              {sourceData.map((d) => (
                <div key={d.name} className="flex items-center gap-2 text-xs">
                  <span className="w-2 h-2 rounded-full" style={{ background: COLORS[d.name] || "#94a3b8" }} />
                  <span className="text-slate-400 flex-1 truncate">{d.name}</span>
                  <span className="text-slate-300">{d.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass rounded-2xl p-5">
            <p className="text-white font-semibold text-sm mb-3">Recent Activity</p>
            <div className="space-y-3">
              {recent.map((r) => (
                <div key={r.id} className="flex items-center gap-2.5 text-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                  <span className="text-slate-400 flex-1 truncate">
                    <span className="text-slate-200">{r.company}</span> · {r.source}
                  </span>
                  <span className="text-slate-600 shrink-0">{timeAgo(r.createdAt)}</span>
                </div>
              ))}
              {recent.length === 0 && <p className="text-xs text-slate-500">No activity yet.</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
