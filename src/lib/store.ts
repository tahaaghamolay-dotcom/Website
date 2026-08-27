import type { LeadRecord, UserRecord } from "./types";

const LEADS_KEY = "leadfresh_leads_v2";
const USERS_KEY = "leadfresh_users_v2";
const SESSION_KEY = "leadfresh_session_v2";

function uid(): string {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

function delay<T>(value: T, ms = 550): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

const COMPANIES = [
  ["NovaFrame", "Software Company"],
  ["LaunchOrbit", "Marketing Agency"],
  ["BriteMeta", "SaaS Platform"],
  ["Stackify", "Cloud Infrastructure"],
  ["Orion Labs", "AI Research"],
  ["VeloCommerce", "E-commerce"],
  ["PulseGrid", "Fintech"],
  ["Anchorly", "Logistics"],
];
const TITLES = [
  "Head of Product",
  "CEO",
  "Marketing Director",
  "VP Engineering",
  "CTO",
  "Sales Director",
  "COO",
  "Growth Lead",
];
const NAMES = [
  "Sarah Chen",
  "Marcus Rody",
  "Olivia Brown",
  "James Park",
  "Priya Malhotra",
  "Daniel Kim",
  "Ana Ferreira",
  "Ethan Cole",
];

function seedLeads(): LeadRecord[] {
  const now = Date.now();
  return COMPANIES.map((c, i) => ({
    id: uid(),
    name: NAMES[i % NAMES.length],
    email: `${NAMES[i % NAMES.length].split(" ")[0].toLowerCase()}@${c[0].toLowerCase()}.com`,
    company: c[0],
    title: TITLES[i % TITLES.length],
    intent: 55 + Math.round(Math.random() * 40),
    message: `Interested in ${c[1]} solutions for our growing team.`,
    source: "Seed",
    status: (["New", "Contacted", "Qualified", "Won"] as const)[i % 4],
    createdAt: now - i * 1000 * 60 * 45,
  }));
}

function ensureSeed(): void {
  const existing = read<LeadRecord[] | null>(LEADS_KEY, null);
  if (!existing || existing.length === 0) {
    write(LEADS_KEY, seedLeads());
  }
}
ensureSeed();

export const api = {
  async getLeads(): Promise<LeadRecord[]> {
    const leads = read<LeadRecord[]>(LEADS_KEY, []);
    return delay([...leads].sort((a, b) => b.createdAt - a.createdAt), 400);
  },

  async createLead(data: {
    name: string;
    email: string;
    company?: string;
    phone?: string;
    message?: string;
    source: LeadRecord["source"];
  }): Promise<LeadRecord> {
    const leads = read<LeadRecord[]>(LEADS_KEY, []);
    const record: LeadRecord = {
      id: uid(),
      name: data.name,
      email: data.email,
      company: data.company || "—",
      phone: data.phone,
      message: data.message,
      title: "New Inbound Lead",
      intent: 60 + Math.round(Math.random() * 35),
      source: data.source,
      status: "New",
      createdAt: Date.now(),
    };
    write(LEADS_KEY, [record, ...leads]);
    return delay(record, 700);
  },

  async updateLeadStatus(id: string, status: LeadRecord["status"]): Promise<void> {
    const leads = read<LeadRecord[]>(LEADS_KEY, []);
    write(
      LEADS_KEY,
      leads.map((l) => (l.id === id ? { ...l, status } : l))
    );
    return delay(undefined, 250);
  },

  async deleteLead(id: string): Promise<void> {
    const leads = read<LeadRecord[]>(LEADS_KEY, []);
    write(
      LEADS_KEY,
      leads.filter((l) => l.id !== id)
    );
    return delay(undefined, 250);
  },

  async signUp(data: {
    name: string;
    email: string;
    password: string;
    company?: string;
  }): Promise<UserRecord> {
    const users = read<UserRecord[]>(USERS_KEY, []);
    if (users.some((u) => u.email.toLowerCase() === data.email.toLowerCase())) {
      await delay(null, 500);
      throw new Error("This email is already registered.");
    }
    const user: UserRecord = {
      id: uid(),
      name: data.name,
      email: data.email,
      password: data.password,
      company: data.company,
      plan: "Starter",
      createdAt: Date.now(),
    };
    write(USERS_KEY, [...users, user]);
    write(SESSION_KEY, user.id);
    await this.createLead({
      name: data.name,
      email: data.email,
      company: data.company,
      source: "Start Free Trial",
      message: "New signup — started free trial",
    });
    return delay(user, 700);
  },

  async signIn(email: string, password: string): Promise<UserRecord> {
    const users = read<UserRecord[]>(USERS_KEY, []);
    const user = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!user) {
      await delay(null, 500);
      throw new Error("Incorrect email or password.");
    }
    write(SESSION_KEY, user.id);
    return delay(user, 600);
  },

  async signInDemo(): Promise<UserRecord> {
    const users = read<UserRecord[]>(USERS_KEY, []);
    let demo = users.find((u) => u.email === "demo@leadfresh.ai");
    if (!demo) {
      demo = {
        id: uid(),
        name: "Alex Morgan",
        email: "demo@leadfresh.ai",
        password: "demo",
        company: "LeadFresh AI",
        plan: "Growth",
        createdAt: Date.now(),
      };
      write(USERS_KEY, [...users, demo]);
    }
    write(SESSION_KEY, demo.id);
    return delay(demo, 500);
  },

  async signOut(): Promise<void> {
    localStorage.removeItem(SESSION_KEY);
    return delay(undefined, 150);
  },

  async getSession(): Promise<UserRecord | null> {
    const sessionId = read<string | null>(SESSION_KEY, null);
    if (!sessionId) return delay(null, 150);
    const users = read<UserRecord[]>(USERS_KEY, []);
    const user = users.find((u) => u.id === sessionId) || null;
    return delay(user, 150);
  },
};
