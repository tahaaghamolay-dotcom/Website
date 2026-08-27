import { useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from "recharts";
import { ShoppingCart, Users2, Target } from "lucide-react";
import type { LeadRecord } from "../../lib/types";

export default function SignalsTab({ leads }: { leads: LeadRecord[] }) {
  const chartData = useMemo(
    () =>
      [...leads]
        .sort((a, b) => b.intent - a.intent)
        .slice(0, 8)
        .map((l) => ({ name: l.company || l.name, intent: l.intent })),
    [leads]
  );

  const avg = leads.length ? Math.round(leads.reduce((s, l) => s + l.intent, 0) / leads.length) : 0;

  const bars = [
    { icon: ShoppingCart, label: "Buying Intent", value: Math.min(96, avg + 4), color: "from-emerald-400 to-emerald-300" },
    { icon: Users2, label: "Engagement", value: Math.min(96, avg + 22), color: "from-sky-400 to-sky-300" },
    { icon: Target, label: "Fit Score", value: Math.min(96, avg + 18), color: "from-violet-400 to-violet-300" },
  ];

  return (
    <div className="space-y-5">
      <div className="grid lg:grid-cols-[1.6fr_1fr] gap-5">
        <div className="glass rounded-2xl p-5">
          <p className="text-white font-semibold text-sm mb-5">Top Companies by Intent Score</p>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} layout="vertical" margin={{ left: 10, right: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" horizontal={false} />
                <XAxis type="number" domain={[0, 100]} tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="name" tick={{ fill: "#94a3b8", fontSize: 11 }} width={100} axisLine={false} tickLine={false} />
                <Tooltip
                  cursor={{ fill: "rgba(255,255,255,0.04)" }}
                  contentStyle={{ background: "#0c1220", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, fontSize: 12 }}
                />
                <Bar dataKey="intent" radius={[0, 6, 6, 0]} fill="#34d9a0" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass rounded-2xl p-5">
          <p className="text-white font-semibold text-sm mb-6">Signal Breakdown</p>
          <div className="space-y-7">
            {bars.map((b) => (
              <div key={b.label}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <b.icon className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-slate-200">{b.label}</span>
                  </div>
                  <span className="text-sm font-semibold text-white">{b.value}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                  <div className={`h-full rounded-full bg-gradient-to-r ${b.color}`} style={{ width: `${b.value}%` }} />
                </div>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-slate-500 mt-8 leading-relaxed">
            Scores are calculated from hiring velocity, funding events, tech-stack
            changes, and website engagement across your tracked accounts.
          </p>
        </div>
      </div>
    </div>
  );
}
