import { useMemo, useState } from "react";
import { Plus, Trash2, Loader2, X, Mail, Building2, User, MessageSquareText } from "lucide-react";
import type { LeadRecord } from "../../lib/types";
import { api } from "../../lib/store";
import { useToast } from "../../lib/ToastContext";
import { timeAgo } from "../../lib/format";

const STATUS_STYLES: Record<LeadRecord["status"], string> = {
  New: "bg-sky-400/15 text-sky-300",
  Contacted: "bg-amber-400/15 text-amber-300",
  Qualified: "bg-violet-400/15 text-violet-300",
  Won: "bg-emerald-400/15 text-emerald-300",
};

interface Props {
  leads: LeadRecord[];
  search: string;
  onRefresh: () => void;
}

export default function LeadsTab({ leads, search, onRefresh }: Props) {
  const { showToast } = useToast();
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [busyId, setBusyId] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const [saving, setSaving] = useState(false);

  const filtered = useMemo(() => {
    return leads.filter((l) => {
      const matchesSearch =
        !search ||
        l.name.toLowerCase().includes(search.toLowerCase()) ||
        (l.company || "").toLowerCase().includes(search.toLowerCase()) ||
        l.email.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "All" || l.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [leads, search, statusFilter]);

  async function handleStatusChange(id: string, status: LeadRecord["status"]) {
    setBusyId(id);
    try {
      await api.updateLeadStatus(id, status);
      onRefresh();
      showToast("Lead status updated.", "success");
    } finally {
      setBusyId(null);
    }
  }

  async function handleDelete(id: string) {
    setBusyId(id);
    try {
      await api.deleteLead(id);
      onRefresh();
      showToast("Lead removed.", "info");
    } finally {
      setBusyId(null);
    }
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email) {
      showToast("Name and email are required.", "error");
      return;
    }
    setSaving(true);
    try {
      await api.createLead({ ...form, source: "Demo Request" });
      onRefresh();
      showToast("Lead added to your pipeline.", "success");
      setForm({ name: "", email: "", company: "", message: "" });
      setShowAdd(false);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {["All", "New", "Contacted", "Qualified", "Won"].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`text-xs px-3.5 py-1.5 rounded-full border transition-colors ${
                statusFilter === s
                  ? "bg-white text-slate-950 border-white"
                  : "border-white/10 text-slate-400 hover:text-white hover:border-white/25"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-1.5 text-xs font-semibold bg-gradient-to-r from-emerald-400 to-sky-400 text-slate-950 rounded-full px-4 py-2 hover:brightness-110 transition-all"
        >
          <Plus className="w-3.5 h-3.5" /> Add Lead
        </button>
      </div>

      <div className="glass rounded-2xl overflow-hidden">
        <div className="hidden md:grid grid-cols-[1.4fr_1fr_0.7fr_0.9fr_0.7fr_auto] gap-3 text-[11px] uppercase tracking-wide text-slate-500 px-5 py-3 border-b border-white/[0.06]">
          <span>Contact</span>
          <span>Company</span>
          <span>Intent</span>
          <span>Status</span>
          <span>Added</span>
          <span />
        </div>
        <div className="divide-y divide-white/[0.05]">
          {filtered.map((l) => (
            <div
              key={l.id}
              className="grid grid-cols-2 md:grid-cols-[1.4fr_1fr_0.7fr_0.9fr_0.7fr_auto] gap-3 items-center px-5 py-4 hover:bg-white/[0.02] transition-colors"
            >
              <div className="min-w-0">
                <p className="text-sm text-white truncate">{l.name}</p>
                <p className="text-[11px] text-slate-500 truncate">{l.email}</p>
              </div>
              <div className="min-w-0 hidden md:block">
                <p className="text-sm text-slate-300 truncate">{l.company}</p>
                <p className="text-[11px] text-slate-600 truncate">{l.source}</p>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="h-1.5 w-10 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-emerald-400 to-sky-400" style={{ width: `${l.intent}%` }} />
                </div>
                <span className="text-xs text-slate-400">{l.intent}%</span>
              </div>
              <div>
                <select
                  value={l.status}
                  disabled={busyId === l.id}
                  onChange={(e) => handleStatusChange(l.id, e.target.value as LeadRecord["status"])}
                  className={`text-xs rounded-full px-2.5 py-1 border-none outline-none cursor-pointer ${STATUS_STYLES[l.status]}`}
                >
                  {(["New", "Contacted", "Qualified", "Won"] as const).map((s) => (
                    <option key={s} value={s} className="bg-[#0c1220] text-white">
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <span className="text-[11px] text-slate-500 hidden md:block">{timeAgo(l.createdAt)}</span>
              <button
                onClick={() => handleDelete(l.id)}
                disabled={busyId === l.id}
                className="justify-self-end text-slate-500 hover:text-rose-400 transition-colors p-1.5"
                aria-label="Delete"
              >
                {busyId === l.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
              </button>
            </div>
          ))}
          {filtered.length === 0 && (
            <p className="text-sm text-slate-500 text-center py-12">No leads match your filters.</p>
          )}
        </div>
      </div>

      {showAdd && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowAdd(false)} />
          <form
            onSubmit={handleAdd}
            className="relative w-full max-w-md glass rounded-3xl p-7 space-y-3.5 shadow-2xl"
          >
            <button
              type="button"
              onClick={() => setShowAdd(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-display text-xl font-bold text-white">Add a lead manually</h3>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="Full name"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-400/50"
              />
            </div>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                placeholder="Email"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-400/50"
              />
            </div>
            <div className="relative">
              <Building2 className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                value={form.company}
                onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                placeholder="Company"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-400/50"
              />
            </div>
            <div className="relative">
              <MessageSquareText className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-500" />
              <textarea
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                placeholder="Notes"
                rows={3}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-400/50 resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={saving}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-400 to-sky-400 text-slate-950 font-semibold rounded-xl py-3 text-sm hover:brightness-110 transition-all disabled:opacity-60"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Add Lead"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
