export interface LeadRecord {
  id: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message?: string;
  title?: string;
  intent: number;
  source: "Contact Form" | "Start Free Trial" | "Newsletter" | "Demo Request" | "Seed";
  status: "New" | "Contacted" | "Qualified" | "Won";
  createdAt: number;
}

export interface UserRecord {
  id: string;
  name: string;
  email: string;
  password: string;
  company?: string;
  plan: "Starter" | "Growth" | "Scale";
  createdAt: number;
}

export interface ActivityItem {
  id: string;
  text: string;
  time: string;
}
