import type { LeadRecord } from "../../lib/types";
import { timeAgo } from "../../lib/format";
import { UserPlus, Mail, RefreshCw, Trophy } from "lucide-react";

function iconFor(status: LeadRecord["status"]) {
  if (status === "Won") return Trophy;
  if (status === "Qualified") return RefreshCw;
  if (status === "Contacted") return Mail;
  return UserPlus;
}

export default function ActivityTab({ leads }: { leads: LeadRecord[] }) {
  const sorted = [...leads].sort((a, b) => b.createdAt - a.createdAt);

  return (
    <div className="glass rounded-2xl p-6">
      <p className="text-white font-semibold text-sm mb-6">Full Activity Log</p>
      <div className="relative pl-6 space-y-7 before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-px before:bg-white/10">
        {sorted.map((l) => {
          const Icon = iconFor(l.status);
          return (
            <div key={l.id} className="relative">
              <div className="absolute -left-6 top-0 w-3.5 h-3.5 rounded-full bg-emerald-400 ring-4 ring-[#090d16]" />
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/[0.06] flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-emerald-300" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm text-slate-200">
                    <span className="text-white font-medium">{l.name}</span> from{" "}
                    <span className="text-white font-medium">{l.company}</span> — status{" "}
                    <span className="text-emerald-300">{l.status}</span>
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    via {l.source} · {timeAgo(l.createdAt)}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
        {sorted.length === 0 && <p className="text-sm text-slate-500">No activity recorded yet.</p>}
      </div>
    </div>
  );
}
