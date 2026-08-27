import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, Sparkles, X } from "lucide-react";
import { useAuth } from "../lib/AuthContext";
import { useUI } from "../lib/UIContext";
import { api } from "../lib/store";
import type { LeadRecord } from "../lib/types";
import DashboardSidebar from "../components/dashboard/DashboardSidebar";
import type { DashboardTab } from "../components/dashboard/DashboardSidebar";
import DashboardTopbar from "../components/dashboard/DashboardTopbar";
import OverviewTab from "../components/dashboard/OverviewTab";
import LeadsTab from "../components/dashboard/LeadsTab";
import SignalsTab from "../components/dashboard/SignalsTab";
import ActivityTab from "../components/dashboard/ActivityTab";
import SettingsTab from "../components/dashboard/SettingsTab";

const TAB_LABELS: Record<DashboardTab, string> = {
  overview: "Overview",
  leads: "My Leads",
  signals: "Intent Signals",
  activity: "Activity",
  settings: "Settings",
};

export default function Dashboard() {
  const { user, loading, signInDemo } = useAuth();
  const { openAuth } = useUI();
  const navigate = useNavigate();

  const [tab, setTab] = useState<DashboardTab>("overview");
  const [leads, setLeads] = useState<LeadRecord[]>([]);
  const [leadsLoading, setLeadsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [demoLoading, setDemoLoading] = useState(false);

  const refreshLeads = useCallback(() => {
    setLeadsLoading(true);
    api.getLeads().then((data) => {
      setLeads(data);
      setLeadsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (user) refreshLeads();
  }, [user, refreshLeads]);

  useEffect(() => {
    if (!user) return;
    const iv = setInterval(refreshLeads, 8000);
    return () => clearInterval(iv);
  }, [user, refreshLeads]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#05070c] flex items-center justify-center">
        <Loader2 className="w-6 h-6 text-emerald-400 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#05070c] flex items-center justify-center px-5">
        <div className="absolute inset-0 grid-fade -z-0" />
        <div className="relative glass rounded-3xl p-10 max-w-md w-full text-center">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-emerald-400 to-sky-400 flex items-center justify-center mb-5">
            <Sparkles className="w-7 h-7 text-slate-950" />
          </div>
          <h2 className="font-display text-2xl font-bold text-white mb-2">Sign in required</h2>
          <p className="text-slate-400 text-sm mb-7">
            Your sales dashboard is waiting. Sign in or try the interactive demo
            workspace — no setup needed.
          </p>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => openAuth("signup")}
              className="bg-gradient-to-r from-emerald-400 to-sky-400 text-slate-950 font-semibold rounded-full py-3 text-sm hover:brightness-110 transition-all"
            >
              Start Free Trial
            </button>
            <button
              onClick={async () => {
                setDemoLoading(true);
                await signInDemo();
                setDemoLoading(false);
              }}
              disabled={demoLoading}
              className="border border-white/15 text-white rounded-full py-3 text-sm hover:bg-white/5 transition-colors flex items-center justify-center gap-2"
            >
              {demoLoading && <Loader2 className="w-4 h-4 animate-spin" />}
              Try Demo Workspace
            </button>
            <button onClick={() => navigate("/")} className="text-slate-500 text-xs hover:text-slate-300 mt-1">
              ← Back to homepage
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#05070c] flex">
      <DashboardSidebar active={tab} onChange={setTab} leadCount={leads.length} />

      {mobileNavOpen && (
        <div className="fixed inset-0 z-[95] lg:hidden">
          <div className="absolute inset-0 bg-black/70" onClick={() => setMobileNavOpen(false)} />
          <div className="relative w-64 h-full bg-[#090d16] p-5">
            <button onClick={() => setMobileNavOpen(false)} className="absolute top-5 right-5 text-slate-400">
              <X className="w-5 h-5" />
            </button>
            <div className="mt-10">
              <DashboardSidebar
                mobile
                active={tab}
                onChange={(t) => {
                  setTab(t);
                  setMobileNavOpen(false);
                }}
                leadCount={leads.length}
              />
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 min-w-0">
        <DashboardTopbar
          search={search}
          onSearch={setSearch}
          onMobileMenu={() => setMobileNavOpen(true)}
          activeLabel={TAB_LABELS[tab]}
        />

        <main className="p-5 sm:p-8">
          {leadsLoading ? (
            <div className="flex items-center justify-center py-32">
              <Loader2 className="w-6 h-6 text-emerald-400 animate-spin" />
            </div>
          ) : (
            <>
              {tab === "overview" && <OverviewTab leads={leads} />}
              {tab === "leads" && <LeadsTab leads={leads} search={search} onRefresh={refreshLeads} />}
              {tab === "signals" && <SignalsTab leads={leads} />}
              {tab === "activity" && <ActivityTab leads={leads} />}
              {tab === "settings" && <SettingsTab />}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
