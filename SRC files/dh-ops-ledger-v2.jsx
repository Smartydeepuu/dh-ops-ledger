import React, { useState, useMemo, useEffect, useRef, useLayoutEffect } from "react";
import {
  LayoutGrid, Building2, FileText, Users, Wallet, Receipt, FolderClosed,
  Settings, Search, Bell, Moon, Sun, ChevronDown, ChevronRight, ChevronLeft, Plus, X, Calendar as CalendarIcon,
  Mail, Phone, Pencil, Upload, AlertTriangle, Trash2,
  Download, TrendingUp, PiggyBank, Package, BarChart3, Clock, CheckCircle2,
  CircleDot, FileSignature, MoreHorizontal, ChevronsLeft
} from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";

/* ----------------------------- design tokens ----------------------------- */

const T = {
  light: {
    bg: "#F8F9FB", card: "#FFFFFF", sidebar: "#FFFFFF",
    border: "#ECEEF3", ink: "#0F172A", inkSoft: "#64748B", muted: "#94A3B8",
    hover: "#F8FAFC",
  },
  dark: {
    bg: "#0B1220", card: "#111A2E", sidebar: "#0E1626",
    border: "#1F2A40", ink: "#E8ECF4", inkSoft: "#93A1B8", muted: "#64748B",
    hover: "#16203A",
  },
};

const A = {
  orange: "#C2410C", orangeSoft: "#FDF0E6",
  indigo: "#4F46E5", indigoSoft: "#EEF0FE",
  green: "#16A34A", greenSoft: "#E8F7EE",
  red: "#DC2626", redSoft: "#FDECEC",
  amber: "#EA8C0C", amberSoft: "#FDF3E3",
  purple: "#7C3AED", purpleSoft: "#F1ECFE",
  blue: "#2563EB", blueSoft: "#E8EFFD",
};

const FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
*{font-family:'Inter',system-ui,sans-serif;box-sizing:border-box;
  scrollbar-width:none;-ms-overflow-style:none;}
*::-webkit-scrollbar{display:none;width:0;height:0;}
.no-sb::-webkit-scrollbar{display:none}
.no-sb{-ms-overflow-style:none;scrollbar-width:none}

/* ---- shell ---- */
.dh-shell{display:flex;min-height:100vh;overflow-x:hidden;max-width:100vw}
.dh-sidebar{display:none}
.dh-sidefoot{margin-top:auto;position:sticky;bottom:0;padding:16px 22px;font-size:11.5px;line-height:1.5}
.dh-bottomnav{position:fixed;left:0;right:0;bottom:0;z-index:20}
.dh-navscroll{display:flex;overflow-x:auto;scroll-snap-type:x proximity;
  -ms-overflow-style:none;scrollbar-width:none;-webkit-overflow-scrolling:touch}
.dh-navscroll::-webkit-scrollbar{display:none;height:0}
.dh-navitem{flex:0 0 20%;min-width:74px;scroll-snap-align:center;
  display:flex;flex-direction:column;align-items:center;gap:4px;padding:9px 0}
.dh-mobile-logo{display:block}
.dh-search{display:none}
.dh-user{display:none}
.dh-main{flex:1;min-width:0;display:flex;flex-direction:column}
.dh-pad{padding:16px}

/* ---- grids ---- */
.dh-kpi{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px;margin-bottom:20px}
.dh-mid{display:grid;grid-template-columns:1fr;gap:16px;margin-bottom:20px}
.dh-bottom{display:grid;grid-template-columns:1fr;gap:16px}

@media (min-width:768px){
  .dh-shell{height:100vh;overflow:hidden}
  .dh-sidebar{display:flex !important;flex-direction:column !important;width:240px;flex-shrink:0;height:100vh}
  .dh-sidenav{flex:1;overflow-y:auto}
  .dh-main{height:100vh;overflow:hidden}
  .dh-scrollarea{height:100%;overflow-y:auto}
  .dh-bottomnav{display:none !important}
  .dh-mobile-logo{display:none !important}
  .dh-search{display:flex !important}
  .dh-pad{padding:24px}
  .dh-bottom{grid-template-columns:repeat(2,minmax(0,1fr))}
}
@media (min-width:1024px){
  .dh-kpi{grid-template-columns:repeat(5,minmax(0,1fr))}
  .dh-fin4{grid-template-columns:repeat(4,minmax(0,1fr))}
  .dh-sidebar{width:256px}
  .dh-user{display:flex !important}
  .dh-pad{padding:32px}
  .dh-mid{grid-template-columns:1.6fr 1fr 1fr}
  .dh-bottom{grid-template-columns:repeat(3,minmax(0,1fr))}
}
@media (min-width:1280px){
  .dh-mid{grid-template-columns:2fr 1fr 1fr}
  .kpi-label{font-size:12.5px}
}

/* ---- KPI cards ---- */
.kpi-card{padding:14px}
.kpi-tile{width:38px;height:38px;min-width:38px;border-radius:12px}
.kpi-label{font-size:12.5px;line-height:1.35;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.kpi-value{line-height:1.2;margin-top:2px;letter-spacing:-0.015em;font-size:15px}
.kpi-body{min-width:0;flex:1}
.kpi-card{overflow:hidden}
.kpi-note{font-size:11.5px;margin-top:8px}
.kpi-head{display:flex;align-items:flex-start;gap:10px}
.kpi-mobile-only{display:block}
.dh-datebox{white-space:nowrap;font-size:12.5px;padding:9px 12px}
@media (min-width:768px){
  .kpi-card{padding:16px}
  .kpi-tile{width:42px;height:42px;min-width:42px}
  .kpi-label{font-size:12.5px}
  .kpi-value{margin-top:3px;font-size:18px}
  .kpi-note{font-size:12px;margin-top:10px}
  .kpi-head{gap:11px}
  .kpi-mobile-only{display:none !important}
  .dh-datebox{font-size:13.5px;padding:10px 16px}
}

/* ---- tables / profile ---- */
.dh-table{display:none}
.dh-cards{display:block}
.dh-profile{display:grid;grid-template-columns:1fr;gap:16px}
.dh-fin3{display:grid;grid-template-columns:1fr;gap:12px}
.dh-fin2{display:grid;grid-template-columns:1fr;gap:16px}
.dh-fin4{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}
.dh-tabs{display:flex;gap:4px;overflow-x:auto;-ms-overflow-style:none;scrollbar-width:none}
.dh-tabs::-webkit-scrollbar{display:none}
.dh-pagehead{display:flex;flex-direction:column;gap:12px;margin-bottom:20px}
.dh-toolbar{display:flex;flex-direction:column;gap:10px;margin-bottom:16px}

/* keep grid/flex children from stretching the page wider than the screen */
.dh-profile>*,.dh-mid>*,.dh-bottom>*,.dh-kpi>*,.dh-fin3>*,.dh-fin2>*,.dh-fin4>*{min-width:0}
.dh-main{overflow-x:hidden}
.dh-pad{max-width:100%}

/* ---- invoice editor / print ---- */
.dh-editor{display:grid;grid-template-columns:1fr;gap:16px}
@media (min-width:1024px){ .dh-editor{grid-template-columns:minmax(0,1fr) minmax(0,1fr)} }
.dh-editor>*{min-width:0}
@media print{
  body *{visibility:hidden !important}
  .print-area,.print-area *{visibility:visible !important}
  .print-area{position:absolute;left:0;top:0;width:100%;border:0 !important;box-shadow:none !important}
  .no-print{display:none !important}
}
@media (min-width:768px){
  .dh-table{display:table;width:100%}
  .dh-cards{display:none !important}
  .dh-fin3{grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}
  .dh-fin2{grid-template-columns:repeat(2,minmax(0,1fr))}
  .dh-fin4{grid-template-columns:repeat(4,minmax(0,1fr))}
  .dh-pagehead{flex-direction:row;align-items:flex-end;justify-content:space-between}
  .dh-toolbar{flex-direction:row;align-items:center;justify-content:space-between}
}
@media (min-width:1024px){
  .dh-profile{grid-template-columns:310px minmax(0,1fr)}
}
`;

const inr = (n) => "₹" + Math.round(n || 0).toLocaleString("en-IN");

const CURRENCIES = {
  INR: { sym: "₹",  locale: "en-IN", label: "INR — Indian Rupee" },
  USD: { sym: "$",  locale: "en-US", label: "USD — US Dollar" },
  EUR: { sym: "€",  locale: "de-DE", label: "EUR — Euro" },
  AUD: { sym: "A$", locale: "en-AU", label: "AUD — Australian Dollar" },
};

const money = (n, cur = "INR") => {
  const k = CURRENCIES[cur] ? cur : "INR";
  return CURRENCIES[k].sym + Math.round(n || 0).toLocaleString(CURRENCIES[k].locale);
};

// Sums invoices grouped by their own currency, e.g. "₹3,25,000 · $1,200"
const moneyGroup = (list) => {
  const by = {};
  list.forEach(i => {
    const cur = i.currency || "INR";
    by[cur] = (by[cur] || 0) + invTotals(i).total;
  });
  const keys = Object.keys(by);
  if (keys.length === 0) return money(0, "INR");
  return keys.map(k => money(by[k], k)).join(" · ");
};

/* ------------------------------ sample data ------------------------------ */

const SAMPLE = {
  kpi: { income: 240000, expenses: 105000, profit: 135000, outstanding: 82000, paidInvoices: 12 },
  chart: [
    { d: "01 Aug", income: 70000,  invoices: 40000,  salaries: 20000 },
    { d: "05 Aug", income: 155000, invoices: 78000,  salaries: 30000 },
    { d: "10 Aug", income: 150000, invoices: 82000,  salaries: 32000 },
    { d: "15 Aug", income: 235000, invoices: 152000, salaries: 42000 },
    { d: "20 Aug", income: 205000, invoices: 128000, salaries: 40000 },
    { d: "25 Aug", income: 290000, invoices: 180000, salaries: 55000 },
    { d: "31 Aug", income: 335000, invoices: 240000, salaries: 72000 },
  ],
  pl: { income: 240000, expenses: 105000, salaries: 72000, other: 33000, profit: 135000 },
  invoices: [
    { client: "ABC Dental Care",   no: "INV-2026-014", amt: 35000, status: "Paid" },
    { client: "Shine Orthodontics",no: "INV-2026-013", amt: 28000, status: "Partial" },
    { client: "Bright Smile Clinic",no:"INV-2026-012", amt: 22000, status: "Overdue" },
    { client: "Smile Studio",      no: "INV-2026-011", amt: 30000, status: "Paid" },
  ],
  salaries: [
    { name: "Rahul Sharma", role: "Designer",        date: "20 Aug", amt: 25000 },
    { name: "Priya Mehta",  role: "Project Manager", date: "20 Aug", amt: 28000 },
    { name: "Aman Verma",   role: "Developer",       date: "20 Aug", amt: 30000 },
  ],
  attention: [
    { icon: CircleDot,     tone: "red",    title: "3 invoices are overdue",     sub: "Total overdue amount: ₹82,000" },
    { icon: Users,         tone: "amber",  title: "2 salaries are due in 6 days", sub: "Total amount: ₹72,000" },
    { icon: FileSignature, tone: "blue",   title: "1 contract is expiring soon", sub: "ABC Dental Care — 28 Aug 2026" },
  ],
};

const EMPTY = {
  kpi: { income: 0, expenses: 0, profit: 0, outstanding: 0, paidInvoices: 0 },
  chart: SAMPLE.chart.map(p => ({ d: p.d, income: 0, invoices: 0, salaries: 0 })),
  pl: { income: 0, expenses: 0, salaries: 0, other: 0, profit: 0 },
  invoices: [], salaries: [], attention: [],
};

const SAMPLE_CLIENTS = [
  {
    id: 1, company: "ABC Dental Care", contact: "Rahul Sharma", email: "info@abcdentalcare.com",
    phone: "+91 98765 43210", address: "123, Dental Street, Andheri West, Mumbai – 400058, Maharashtra",
    gstin: "27AABCU9603R1ZM", service: "Website maintenance & SEO", type: "Retainer",
    since: "10 Jan 2023", status: "Active", totalInvoices: 6, paid: 120000, outstanding: 15000,
    notes: "Important client. Monthly website maintenance and SEO services. Prefers communication over email.",
    notesUpdated: "12 Aug 2026",
    invoices: [
      { no: "INV-2026-014", date: "01 Aug 2026", due: "15 Aug 2026", amt: 35000, status: "Paid" },
      { no: "INV-2026-013", date: "15 Jul 2026", due: "31 Jul 2026", amt: 28000, status: "Paid" },
      { no: "INV-2026-012", date: "01 Jul 2026", due: "15 Jul 2026", amt: 22000, status: "Paid" },
      { no: "INV-2026-011", date: "01 May 2026", due: "15 May 2026", amt: 30000, status: "Paid" },
      { no: "INV-2026-010", date: "10 Apr 2026", due: "25 Apr 2026", amt: 20000, status: "Pending" },
      { no: "INV-2026-009", date: "28 Mar 2026", due: "12 Apr 2026", amt: 18000, status: "Overdue" },
    ],
    documents: [
      { name: "Service Agreement.pdf", cat: "Contract", size: "412 KB", date: "10 Jan 2023" },
      { name: "GST Certificate.pdf",   cat: "Legal",    size: "180 KB", date: "12 Jan 2023" },
      { name: "Proposal 2026.pdf",     cat: "Proposal", size: "1.2 MB", date: "02 Jan 2026" },
      { name: "Brand Assets.pdf",      cat: "Other",    size: "3.4 MB", date: "18 Feb 2026" },
    ],
    contacts: [
      { name: "Rahul Sharma", role: "Primary Contact", email: "rahul@abcdentalcare.com", phone: "+91 98765 43210" },
      { name: "Meera Iyer",   role: "Accounts",        email: "accounts@abcdentalcare.com", phone: "+91 98765 11223" },
    ],
    noteList: [
      { text: "Renewal discussion scheduled for last week of August.", by: "Deepak Kumar", date: "12 Aug 2026" },
      { text: "Payment usually received around the 10th of the month.", by: "Deepak Kumar", date: "02 Jun 2026" },
    ],
    activity: [
      { text: "Invoice INV-2026-014 marked as Paid", date: "05 Aug 2026, 4:12 PM", tone: "green" },
      { text: "Invoice INV-2026-014 created",        date: "01 Aug 2026, 11:05 AM", tone: "indigo" },
      { text: "Document “Brand Assets.pdf” uploaded", date: "18 Feb 2026, 6:40 PM", tone: "blue" },
      { text: "Client details updated",               date: "02 Jan 2026, 1:15 PM", tone: "amber" },
    ],
  },
  {
    id: 2, company: "Shine Orthodontics", contact: "Neha Kapoor", email: "hello@shineortho.com",
    phone: "+91 99887 66554", address: "42, Kothrud, Pune – 411038, Maharashtra", gstin: "27AACCS1234M1Z9",
    service: "Social media management", type: "Retainer", since: "22 Mar 2024", status: "Active",
    totalInvoices: 4, paid: 90000, outstanding: 10000, notes: "Approvals take 2–3 days. Reels perform best.",
    notesUpdated: "28 Jul 2026",
    invoices: [
      { no: "INV-2026-013", date: "15 Jul 2026", due: "31 Jul 2026", amt: 28000, status: "Partial" },
      { no: "INV-2026-007", date: "12 Jun 2026", due: "27 Jun 2026", amt: 24000, status: "Paid" },
      { no: "INV-2026-004", date: "10 May 2026", due: "25 May 2026", amt: 20000, status: "Paid" },
      { no: "INV-2026-002", date: "08 Apr 2026", due: "23 Apr 2026", amt: 18000, status: "Paid" },
    ],
    documents: [{ name: "Service Agreement.pdf", cat: "Contract", size: "388 KB", date: "22 Mar 2024" }],
    contacts: [{ name: "Neha Kapoor", role: "Primary Contact", email: "neha@shineortho.com", phone: "+91 99887 66554" }],
    noteList: [{ text: "Prefers WhatsApp for quick approvals.", by: "Deepak Kumar", date: "28 Jul 2026" }],
    activity: [{ text: "Partial payment of ₹18,000 recorded", date: "29 Jul 2026, 3:02 PM", tone: "green" }],
  },
  {
    id: 3, company: "Bright Smile Clinic", contact: "Arjun Nair", email: "contact@brightsmile.com",
    phone: "+91 90909 80808", address: "7, MG Road, Bengaluru – 560001, Karnataka", gstin: "",
    service: "Google Ads", type: "Project", since: "05 Sep 2025", status: "Active",
    totalInvoices: 5, paid: 60000, outstanding: 0, notes: "", notesUpdated: "",
    invoices: [{ no: "INV-2026-012", date: "01 Jul 2026", due: "15 Jul 2026", amt: 22000, status: "Overdue" }],
    documents: [], contacts: [{ name: "Arjun Nair", role: "Primary Contact", email: "contact@brightsmile.com", phone: "+91 90909 80808" }],
    noteList: [], activity: [{ text: "Invoice INV-2026-012 became overdue", date: "16 Jul 2026, 12:00 AM", tone: "red" }],
  },
  {
    id: 4, company: "Smile Studio", contact: "Priya Desai", email: "hi@smilestudio.com",
    phone: "+91 91234 56789", address: "18, Satellite, Ahmedabad – 380015, Gujarat", gstin: "",
    service: "Branding", type: "Project", since: "14 Nov 2024", status: "Inactive",
    totalInvoices: 3, paid: 45000, outstanding: 15000, notes: "Project on hold since June.", notesUpdated: "10 Jun 2026",
    invoices: [{ no: "INV-2026-011", date: "01 May 2026", due: "15 May 2026", amt: 30000, status: "Paid" }],
    documents: [], contacts: [{ name: "Priya Desai", role: "Primary Contact", email: "hi@smilestudio.com", phone: "+91 91234 56789" }],
    noteList: [], activity: [],
  },
  {
    id: 5, company: "Dentaline", contact: "Kabir Malhotra", email: "care@dentaline.com",
    phone: "+91 98111 22334", address: "K-9, Saket, New Delhi – 110017", gstin: "",
    service: "Website development", type: "Project", since: "02 Feb 2026", status: "Active",
    totalInvoices: 2, paid: 20000, outstanding: 20000, notes: "", notesUpdated: "",
    invoices: [{ no: "INV-2026-010", date: "10 Apr 2026", due: "25 Apr 2026", amt: 20000, status: "Pending" }],
    documents: [], contacts: [{ name: "Kabir Malhotra", role: "Primary Contact", email: "care@dentaline.com", phone: "+91 98111 22334" }],
    noteList: [], activity: [],
  },
];


const COMPANY = {
  name: "Digital Hikers", tagline: "Digital marketing & AI automation",
  address: "Dhanbad · Bokaro, Jharkhand, India",
  email: "billing@digitalhikers.in", phone: "+91 90000 00000",
  gstin: "20AAAAA0000A1Z5", bank: "HDFC Bank · A/C 50100XXXXXXX · IFSC HDFC0000XXX",
};

const mkItems = (arr) => arr.map(([desc, qty, rate]) => ({ desc, qty, rate }));

const SAMPLE_INVOICES = [
  { id: 14, no: "INV-2026-014", clientId: 1, client: "ABC Dental Care", date: "2026-08-01", due: "2026-08-15",
    terms: "Net 15", currency: "INR", discount: 0, status: "Paid", notes: "Thank you for your business.",
    items: mkItems([["Website maintenance \u2014 August", 1, 18000], ["SEO retainer \u2014 August", 1, 11661]]),
    payments: [{ amt: 35000, date: "2026-08-05", method: "Bank Transfer", ref: "UTR8827341" }] },
  { id: 13, no: "INV-2026-013", clientId: 2, client: "Shine Orthodontics", date: "2026-07-15", due: "2026-07-31",
    terms: "Net 15", currency: "INR", discount: 0, status: "Partially Paid", notes: "",
    items: mkItems([["Social media management \u2014 July", 1, 23729]]),
    payments: [{ amt: 18000, date: "2026-07-29", method: "UPI", ref: "UPI-556123" }] },
  { id: 12, no: "INV-2026-012", clientId: 3, client: "Bright Smile Clinic", date: "2026-07-01", due: "2026-07-15",
    terms: "Net 15", currency: "INR", discount: 0, status: "Overdue", notes: "Second reminder sent.",
    items: mkItems([["Google Ads management \u2014 July", 1, 12000], ["Landing page revamp", 1, 6644]]), payments: [] },
  { id: 11, no: "INV-2026-011", clientId: 4, client: "Smile Studio", date: "2026-05-01", due: "2026-05-15",
    terms: "Net 15", currency: "INR", discount: 0, status: "Paid", notes: "",
    items: mkItems([["Brand identity package", 1, 25424]]),
    payments: [{ amt: 30000, date: "2026-05-12", method: "Bank Transfer", ref: "UTR7761190" }] },
  { id: 10, no: "INV-2026-010", clientId: 5, client: "Dentaline", date: "2026-04-10", due: "2026-04-25",
    terms: "Net 15", currency: "USD", discount: 0, status: "Pending", notes: "",
    items: mkItems([["Website development \u2014 milestone 1", 1, 1200]]), payments: [] },
  { id: 9, no: "INV-2026-009", clientId: 1, client: "ABC Dental Care", date: "2026-03-28", due: "2026-04-12",
    terms: "Net 15", currency: "INR", discount: 0, status: "Pending", notes: "",
    items: mkItems([["Website maintenance \u2014 March", 1, 15254]]), payments: [] },
  { id: 8, no: "INV-2026-008", clientId: 2, client: "Shine Orthodontics", date: "2026-03-20", due: "2026-04-04",
    terms: "Net 15", currency: "AUD", discount: 0, status: "Draft", notes: "",
    items: mkItems([["Content production \u2014 12 reels", 12, 95]]), payments: [] },
  { id: 7, no: "INV-2026-007", clientId: 2, client: "Shine Orthodontics", date: "2026-06-12", due: "2026-06-27",
    terms: "Net 15", currency: "INR", discount: 0, status: "Paid", notes: "",
    items: mkItems([["Social media management \u2014 June", 1, 20339]]),
    payments: [{ amt: 24000, date: "2026-06-20", method: "UPI", ref: "UPI-441002" }] },
  { id: 6, no: "INV-2026-006", clientId: 3, client: "Bright Smile Clinic", date: "2026-06-05", due: "2026-06-20",
    terms: "Net 15", currency: "INR", discount: 2000, status: "Paid", notes: "Loyalty discount applied.",
    items: mkItems([["Google Ads management \u2014 June", 1, 14000]]),
    payments: [{ amt: 14160, date: "2026-06-18", method: "Bank Transfer", ref: "UTR6612388" }] },
  { id: 5, no: "INV-2026-005", clientId: 5, client: "Dentaline", date: "2026-05-22", due: "2026-06-06",
    terms: "Net 15", currency: "INR", discount: 0, status: "Cancelled", notes: "Scope changed \u2014 reissued as INV-2026-010.",
    items: mkItems([["Website development \u2014 advance", 1, 25000]]), payments: [] },
];

const TERMS = { "Due on receipt": 0, "Net 7": 7, "Net 15": 15, "Net 30": 30, "Net 45": 45 };

const invTotals = (inv) => {
  const subtotal = inv.items.reduce((a, i) => a + (Number(i.qty) || 0) * (Number(i.rate) || 0), 0);
  const total = Math.max(0, subtotal - (Number(inv.discount) || 0));
  const paid = (inv.payments || []).reduce((a, p) => a + (Number(p.amt) || 0), 0);
  return { subtotal, discount: Number(inv.discount) || 0, total, paid, due: Math.max(0, total - paid) };
};

const fmtDate = (iso) => {
  if (!iso) return "\u2014";
  const d = new Date(iso);
  if (isNaN(d)) return iso;
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
};

const addDaysISO = (iso, days) => {
  const d = new Date(iso); d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
};


const DEPTS = ["Design", "Development", "Content", "Marketing", "Project Management", "Creative", "Automation", "Operations"];

const SAMPLE_EMPLOYEES = [
  { id: 1, name: "Rahul Sharma", email: "rahul@digitalhikers.com", phone: "+91 98200 11111", role: "Designer",
    dept: "Design", salary: 25000, status: "Active", joinDate: "2026-08-20", payDate: 20,
    salaryType: "Monthly", address: "Dhanbad, Jharkhand", bank: "HDFC ****4471", img: 30,
    documents: [{ name: "Offer Letter.pdf", cat: "HR", size: "220 KB", date: "18 Aug 2026" },
                { name: "Aadhaar.pdf", cat: "ID Proof", size: "180 KB", date: "18 Aug 2026" }],
    notes: "Handles all client creatives and brand work.",
    history: [{ from: "Aug 2026", amt: 25000 }, { from: "Jan 2026", amt: 22000 }] },
  { id: 2, name: "Priya Mehta", email: "priya@digitalhikers.com", phone: "+91 98200 22222", role: "Project Manager",
    dept: "Project Management", salary: 28000, status: "Active", joinDate: "2026-08-20", payDate: 20,
    salaryType: "Monthly", address: "Bokaro, Jharkhand", bank: "ICICI ****9920", img: 31,
    documents: [{ name: "Offer Letter.pdf", cat: "HR", size: "212 KB", date: "18 Aug 2026" }],
    notes: "", history: [{ from: "Aug 2026", amt: 28000 }] },
  { id: 3, name: "Aman Verma", email: "aman@digitalhikers.com", phone: "+91 98200 33333", role: "Developer",
    dept: "Development", salary: 30000, status: "Active", joinDate: "2026-08-20", payDate: 20,
    salaryType: "Monthly", address: "Ranchi, Jharkhand", bank: "SBI ****1123", img: 32,
    documents: [], notes: "Full-stack. Owns internal tooling.",
    history: [{ from: "Aug 2026", amt: 30000 }, { from: "Feb 2026", amt: 26000 }] },
  { id: 4, name: "Neha Singh", email: "neha@digitalhikers.com", phone: "+91 98200 44444", role: "Content Writer",
    dept: "Content", salary: 22000, status: "Active", joinDate: "2026-08-18", payDate: 20,
    salaryType: "Monthly", address: "Dhanbad, Jharkhand", bank: "HDFC ****7781", img: 33,
    documents: [], notes: "", history: [{ from: "Aug 2026", amt: 22000 }] },
  { id: 5, name: "Rohit Kumar", email: "rohit@digitalhikers.com", phone: "+91 98200 55555", role: "Video Editor",
    dept: "Creative", salary: 20000, status: "Inactive", joinDate: "2026-08-15", payDate: 20,
    salaryType: "Monthly", address: "Bokaro, Jharkhand", bank: "", img: 34,
    documents: [], notes: "On break since July.", history: [{ from: "Aug 2026", amt: 20000 }] },
  { id: 6, name: "Sanjay Patel", email: "sanjay@digitalhikers.com", phone: "+91 98200 66666", role: "SEO Specialist",
    dept: "Marketing", salary: 18000, status: "Active", joinDate: "2026-08-10", payDate: 20,
    salaryType: "Monthly", address: "Dhanbad, Jharkhand", bank: "Axis ****3390", img: 35,
    documents: [], notes: "", history: [{ from: "Aug 2026", amt: 18000 }] },
  { id: 7, name: "Kavya Joshi", email: "kavya@digitalhikers.com", phone: "+91 98200 77777", role: "Social Media Manager",
    dept: "Marketing", salary: 23000, status: "Active", joinDate: "2026-08-05", payDate: 20,
    salaryType: "Monthly", address: "Kolkata, West Bengal", bank: "HDFC ****2210", img: 36,
    documents: [], notes: "", history: [{ from: "Aug 2026", amt: 23000 }] },
  { id: 8, name: "Vivek Tiwari", email: "vivek@digitalhikers.com", phone: "+91 98200 88888", role: "AI Automation Specialist",
    dept: "Automation", salary: 26000, status: "Active", joinDate: "2026-08-01", payDate: 20,
    salaryType: "Monthly", address: "Dhanbad, Jharkhand", bank: "HDFC ****5540", img: 37,
    documents: [], notes: "Runs LinkedIn outreach and automation stack.",
    history: [{ from: "Aug 2026", amt: 26000 }] },
];

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

// month is 1-12
const SAMPLE_PAYROLL = [
  { id: 1, empId: 1, month: 8, year: 2026, basic: 25000, bonus: 0,    deductions: 0,    status: "Paid",    paidOn: "2026-08-20", method: "Bank Transfer", ref: "SAL-AUG-01" },
  { id: 2, empId: 2, month: 8, year: 2026, basic: 28000, bonus: 2000, deductions: 0,    status: "Paid",    paidOn: "2026-08-20", method: "Bank Transfer", ref: "SAL-AUG-02" },
  { id: 3, empId: 3, month: 8, year: 2026, basic: 30000, bonus: 0,    deductions: 0,    status: "Pending", paidOn: "", method: "", ref: "" },
  { id: 4, empId: 4, month: 8, year: 2026, basic: 22000, bonus: 0,    deductions: 1000, status: "Pending", paidOn: "", method: "", ref: "" },
  { id: 5, empId: 6, month: 8, year: 2026, basic: 18000, bonus: 0,    deductions: 0,    status: "Pending", paidOn: "", method: "", ref: "" },
  { id: 6, empId: 7, month: 8, year: 2026, basic: 23000, bonus: 1500, deductions: 0,    status: "Pending", paidOn: "", method: "", ref: "" },
  { id: 7, empId: 8, month: 8, year: 2026, basic: 26000, bonus: 0,    deductions: 0,    status: "Pending", paidOn: "", method: "", ref: "" },
  { id: 8, empId: 1, month: 7, year: 2026, basic: 25000, bonus: 0,    deductions: 0,    status: "Paid",    paidOn: "2026-07-20", method: "Bank Transfer", ref: "SAL-JUL-01" },
  { id: 9, empId: 3, month: 7, year: 2026, basic: 30000, bonus: 0,    deductions: 500,  status: "Paid",    paidOn: "2026-07-20", method: "Bank Transfer", ref: "SAL-JUL-03" },
];

const payNet = (r) => (Number(r.basic) || 0) + (Number(r.bonus) || 0) - (Number(r.deductions) || 0);
const slipNo = (r) => `DH-SAL-${r.year}${String(r.month).padStart(2, "0")}-${String(r.empId).padStart(2, "0")}`;

/* -------------------------------- helpers -------------------------------- */

const pill = (status) => {
  const map = {
    Paid:    [A.greenSoft, A.green], Overdue: [A.redSoft, A.red],
    Pending: [A.amberSoft, A.amber], Partial: [A.amberSoft, A.amber],
    Draft:   [A.blueSoft, A.blue],
  };
  const [bg, fg] = map[status] || map.Draft;
  return { background: bg, color: fg };
};

function Card({ c, className = "", style = {}, children }) {
  return (
    <div className={`rounded-2xl ${className}`}
      style={{ background: c.card, border: `1px solid ${c.border}`, ...style }}>
      {children}
    </div>
  );
}

/* Renders text at its normal (CSS-defined) size, and only shrinks it — never
   grows it — just enough to stop it overflowing its own box. Re-measures on
   resize and whenever the text changes. */
function FitText({ text, className, style, floor = 11 }) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fit = () => {
      el.style.fontSize = "";
      const max = parseFloat(window.getComputedStyle(el).fontSize) || 16;
      let size = max;
      el.style.fontSize = size + "px";
      while (el.scrollWidth > el.clientWidth + 0.5 && size > floor) {
        size -= 1;
        el.style.fontSize = size + "px";
      }
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    window.addEventListener("resize", fit);
    return () => { ro.disconnect(); window.removeEventListener("resize", fit); };
  }, [text]);

  return (
    <div ref={ref} className={className}
      style={{ ...style, whiteSpace: "nowrap", overflow: "hidden", maxWidth: "100%" }}>
      {text}
    </div>
  );
}

/* ------------------------------ date picker ------------------------------ */

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];

// A date string is only trusted if it actually parses to a real calendar date.
// Protects against garbage values like MySQL's "0000-00-00" zero-date, which
// would otherwise produce an Invalid Date and crash the calendar grid.
function safeDate(iso) {
  if (!iso) return null;
  const d = new Date(iso + "T00:00:00");
  return isNaN(d.getTime()) ? null : d;
}

function DateField({ c, value, onChange, placeholder = "Select date" }) {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState(() => safeDate(value) || new Date());
  const [pos, setPos] = useState(null);
  const ref = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => {
    const onDoc = (e) => {
      if (ref.current && !ref.current.contains(e.target) && panelRef.current && !panelRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  useEffect(() => { setView(safeDate(value) || new Date()); }, [open]); // eslint-disable-line

  useEffect(() => {
    if (!open || !ref.current) return;
    const place = () => {
      const r = ref.current.getBoundingClientRect();
      const width = 272;
      let left = r.left;
      if (left + width > window.innerWidth - 12) left = window.innerWidth - width - 12;
      setPos({ top: r.bottom + 6, left, width: r.width });
    };
    place();
    window.addEventListener("scroll", place, true);
    window.addEventListener("resize", place);
    return () => { window.removeEventListener("scroll", place, true); window.removeEventListener("resize", place); };
  }, [open]);

  const y = view.getFullYear(), m = view.getMonth();
  const first = Math.max(0, new Date(y, m, 1).getDay() || 0);
  const days = Math.max(0, new Date(y, m + 1, 0).getDate() || 0);
  const todayISO = new Date().toISOString().slice(0, 10);

  const cells = [...Array(first).fill(null), ...Array.from({ length: days }, (_, i) => i + 1)];

  const pick = (d) => {
    const iso = `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    onChange(iso);
    setOpen(false);
  };

  const nav = (delta) => setView(new Date(y, m + delta, 1));

  const panel = open && pos && (
      <div ref={panelRef} style={{
        position: "fixed", top: pos.top, left: pos.left, zIndex: 200, background: c.card,
        border: `1px solid ${c.border}`, borderRadius: 14, padding: 14, width: 272,
        boxShadow: "0 16px 40px rgba(15,23,42,.22)",
      }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
            <button type="button" onClick={() => nav(-1)} style={{ color: c.inkSoft, padding: 4 }}><ChevronLeft size={16} /></button>
            <span style={{ fontSize: 13.5, fontWeight: 700 }}>{MONTHS[m]} {y}</span>
            <button type="button" onClick={() => nav(1)} style={{ color: c.inkSoft, padding: 4 }}><ChevronRight size={16} /></button>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 2, marginBottom: 4 }}>
            {WEEKDAYS.map((w, i) => (
              <div key={i} style={{ textAlign: "center", fontSize: 10.5, fontWeight: 600, color: c.muted, padding: "4px 0" }}>{w}</div>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 2 }}>
            {cells.map((d, i) => {
              if (!d) return <div key={i} />;
              const iso = `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
              const isSel = iso === value;
              const isToday = iso === todayISO;
              return (
                <button key={i} type="button" onClick={() => pick(d)}
                  style={{
                    aspectRatio: "1/1", borderRadius: 9, fontSize: 12.5, fontWeight: isSel ? 700 : 500,
                    background: isSel ? A.orange : "transparent",
                    color: isSel ? "#fff" : (isToday ? A.orange : c.ink),
                    border: isToday && !isSel ? `1px solid ${A.orange}` : "1px solid transparent",
                  }}>
                  {d}
                </button>
              );
            })}
          </div>

          <button type="button" onClick={() => { onChange(todayISO); setOpen(false); }}
            style={{ width: "100%", marginTop: 10, padding: "8px", borderRadius: 9, fontSize: 12, fontWeight: 600,
              color: A.orange, background: A.orangeSoft }}>
            Today
          </button>
      </div>
  );

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button type="button" onClick={() => setOpen(o => !o)}
        className="dh-datebox flex items-center gap-2 rounded-xl font-medium"
        style={{ border: `1px solid ${c.border}`, background: c.card, color: value ? c.ink : c.muted, width: "100%", boxSizing: "border-box" }}>
        <CalendarIcon size={15} color={c.muted} />
        <span style={{ flex: 1, textAlign: "left" }}>{value ? fmtDate(value) : placeholder}</span>
        <ChevronDown size={14} color={c.muted} />
      </button>
      {panel}
    </div>
  );
}

function PeriodDropdown({ c, value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const opts = ["This Month", "Last Month", "This Quarter", "This Year", "Custom Range"];

  useEffect(() => {
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button type="button" onClick={() => setOpen(o => !o)}
        className="dh-datebox flex items-center gap-2 rounded-xl font-medium"
        style={{ border: `1px solid ${c.border}`, background: c.card, color: c.ink }}>
        <CalendarIcon size={15} color={c.muted} />
        <span>{value}</span>
        <ChevronDown size={14} color={c.muted} />
      </button>
      {open && (
        <div style={{
          position: "absolute", right: 0, zIndex: 60, marginTop: 6, background: c.card,
          border: `1px solid ${c.border}`, borderRadius: 14, padding: 6, minWidth: 180,
          boxShadow: "0 16px 40px rgba(15,23,42,.18)",
        }}>
          {opts.map(o => (
            <button key={o} type="button" onClick={() => { onChange(o); setOpen(false); }}
              style={{
                width: "100%", textAlign: "left", padding: "9px 12px", borderRadius: 9,
                fontSize: 13.5, fontWeight: o === value ? 600 : 500,
                color: o === value ? A.orange : c.ink,
                background: o === value ? A.orangeSoft : "transparent",
              }}>
              {o}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function IconTile({ Icon, tone, size = 40, className = "" }) {
  const map = {
    green: [A.greenSoft, A.green], red: [A.redSoft, A.red], blue: [A.blueSoft, A.blue],
    amber: [A.amberSoft, A.amber], purple: [A.purpleSoft, A.purple], indigo: [A.indigoSoft, A.indigo],
  };
  const [bg, fg] = map[tone] || map.indigo;

  // fixed square, same corner curve everywhere, glyph always the same share of the tile
  const box = className ? {} : { width: size, height: size, minWidth: size, minHeight: size };
  const glyph = className ? 19 : Math.round(size * 0.46);

  return (
    <div className={`flex items-center justify-center ${className}`}
      style={{
        background: bg, color: fg, borderRadius: 12, flexShrink: 0, aspectRatio: "1 / 1", ...box,
      }}>
      <Icon size={glyph} strokeWidth={2} />
    </div>
  );
}

/* ---------------------------------- app ---------------------------------- */

export default function App() {
  const [dark, setDark] = useState(false);
  const [page, setPage] = useState("dashboard");
  const [sample, setSample] = useState(true);
  const [period, setPeriod] = useState("This Month");
  const [customFrom, setCustomFrom] = useState("");
  const [customTo, setCustomTo] = useState("");
  const [clients, setClients] = useState(SAMPLE_CLIENTS);
  const [activeClient, setActiveClient] = useState(null);
  const [showClientForm, setShowClientForm] = useState(false);
  const [invoices, setInvoices] = useState(SAMPLE_INVOICES);
  const [invView, setInvView] = useState({ mode: "list", inv: null });
  const [payFor, setPayFor] = useState(null);
  const [employees, setEmployees] = useState(SAMPLE_EMPLOYEES);
  const [activeEmp, setActiveEmp] = useState(null);
  const [showEmpForm, setShowEmpForm] = useState(false);
  const [payroll, setPayroll] = useState(SAMPLE_PAYROLL);
  const [salMonth, setSalMonth] = useState(8);
  const [salYear, setSalYear] = useState(2026);
  const [slipRec, setSlipRec] = useState(null);
  const [salPayFor, setSalPayFor] = useState(null);
  const [showNewSlip, setShowNewSlip] = useState(false);
  const [docs, setDocs] = useState(SAMPLE_DOCS);
  const [showUpload, setShowUpload] = useState(false);
  const [expenses, setExpenses] = useState(SAMPLE_EXPENSES);
  const [expModal, setExpModal] = useState(null);      // {} = new, object = edit
  const [showBell, setShowBell] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef(null);
  const [showSearch, setShowSearch] = useState(false);
  const [editClient, setEditClient] = useState(null);
  const [editEmp, setEditEmp] = useState(null);
  const [addContactFor, setAddContactFor] = useState(null);
  const [settings, setSettings] = useState({
    company_name: "Digital Hikers", company_tagline: "Digital marketing & AI automation",
    company_address: "Dhanbad · Bokaro, Jharkhand, India", company_email: "billing@digitalhikers.in",
    company_phone: "+91 90000 00000", company_gstin: "", company_pan: "", company_website: "",
    company_bank: "HDFC Bank · A/C 50100XXXXXXX · IFSC HDFC0000XXX",
    invoice_prefix: "INV", invoice_terms: "Net 15", invoice_currency: "INR",
    invoice_footer: "Thank you for your business.", salary_pay_date: "20",
  });

  const c = dark ? T.dark : T.light;
  const D = sample ? SAMPLE : EMPTY;
  const clientList = sample ? clients : [];
  const invoiceList = sample ? invoices : [];
  const employeeList = sample ? employees : [];
  const payrollList = sample ? payroll : [];

  const goto = (id) => {
    setPage(id); setActiveClient(null); setInvView({ mode: "list", inv: null });
    setActiveEmp(null); setSlipRec(null);
  };

  const navRef = React.useRef(null);
  useEffect(() => {
    const el = navRef.current?.querySelector(`[data-nav="${page}"]`);
    if (el && navRef.current) {
      const box = navRef.current.getBoundingClientRect();
      const item = el.getBoundingClientRect();
      if (item.left < box.left || item.right > box.right) {
        el.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      }
    }
  }, [page]);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setShowSearch(true); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const onDoc = (e) => { if (userMenuRef.current && !userMenuRef.current.contains(e.target)) setShowUserMenu(false); };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const liveTotals = useMemo(() => {
    const now = new Date(), m = now.getMonth(), y = now.getFullYear();
    const thisMonth = (d) => { const x = new Date(d); return x.getMonth() === m && x.getFullYear() === y; };

    const other = (sample ? expenses : []).filter(e => thisMonth(e.date)).reduce((a, e) => a + e.amt, 0);
    const salaries = (sample ? payroll : [])
      .filter(r => r.status === "Paid" && r.month === m + 1 && r.year === y)
      .reduce((a, r) => a + payNet(r), 0);
    const income = (sample ? invoices : []).reduce((a, i) =>
      a + (i.currency === "INR" || !i.currency
        ? (i.payments || []).filter(p => thisMonth(p.date)).reduce((b, p) => b + p.amt, 0) : 0), 0);

    return { income, salaries, other, expenses: salaries + other, profit: income - salaries - other };
  }, [expenses, payroll, invoices, sample]);

  const notifications = useMemo(
    () => buildNotifications({ invoices: sample ? invoices : [], payroll: sample ? payroll : [], employees, docs }),
    [invoices, payroll, employees, docs, sample]);

  const goToRecord = ({ page: pg, ref }) => {
    goto(pg);
    if (pg === "clients") setActiveClient(ref);
    if (pg === "invoices") setInvView({ mode: "view", inv: ref });
    if (pg === "employees") setActiveEmp(ref);
    if (pg === "salary") setSlipRec(ref);
  };

  const generateSlip = (emp) => {
    const rec = {
      id: Date.now(), empId: emp.id, month: salMonth, year: salYear,
      basic: emp.salary, bonus: 0, deductions: 0, status: "Pending", paidOn: "", method: "", ref: "",
    };
    setPayroll(prev => [...prev, rec]);
    setSlipRec(rec);
  };

  const saveSlip = (rec) => {
    setPayroll(prev => prev.map(r => r.id === rec.id ? rec : r));
    setSlipRec(rec);
  };

  const markSalaryPaid = (rec, p) => {
    const updated = { ...rec, status: "Paid", paidOn: p.paidOn, method: p.method, ref: p.ref };
    setPayroll(prev => prev.map(r => r.id === rec.id ? updated : r));
    setSlipRec(updated);
    setSalPayFor(null);
  };

  const saveInvoice = (data) => {
    setInvoices(prev => prev.some(i => i.id === data.id)
      ? prev.map(i => i.id === data.id ? data : i)
      : [data, ...prev]);
    setInvView({ mode: "view", inv: data });
  };

  const updateInvoice = (id, patch) => {
    setInvoices(prev => prev.map(i => i.id === id ? { ...i, ...patch } : i));
    setInvView(v => v.inv && v.inv.id === id ? { ...v, inv: { ...v.inv, ...patch } } : v);
  };

  const addPayment = (inv, p) => {
    const payments = [...(inv.payments || []), { amt: p.amt, date: p.date, method: p.method, ref: p.ref }];
    const t = invTotals({ ...inv, payments });
    const status = t.due <= 0 ? "Paid" : "Partially Paid";
    updateInvoice(inv.id, { payments, status });
    setPayFor(null);
  };

  const nav = [
    { id: "dashboard", label: "Dashboard", icon: LayoutGrid },
    { id: "clients",   label: "Clients",   icon: Building2 },
    { id: "invoices",  label: "Invoices",  icon: FileText },
    { id: "employees", label: "Employees", icon: Users },
    { id: "salary",    label: "Salary",    icon: Wallet },
    { id: "expenses",  label: "Expenses",  icon: Receipt },
    { id: "documents", label: "Documents", icon: FolderClosed },
    { id: "settings",  label: "Settings",  icon: Settings },
  ];


  return (
    <div className="dh-shell" style={{ background: c.bg, color: c.ink }}>
      <style>{FONTS}</style>

      {/* ---------------- Sidebar (desktop) ---------------- */}
      <aside className="dh-sidebar border-r"
        style={{ background: c.sidebar, borderColor: c.border }}>
        <div style={{ padding: "26px 22px 22px" }}>
          <div style={{ fontSize: 21, fontWeight: 800, letterSpacing: "-0.02em", color: c.ink }}>Digital Hikers</div>
          <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.18em", marginTop: 3, color: A.orange }}>OPS LEDGER</div>
        </div>

        <nav className="dh-sidenav" style={{ padding: "0 12px", display: "block" }}>
          {nav.map(n => {
            const on = page === n.id;
            return (
              <button key={n.id} onClick={() => goto(n.id)}
                style={{
                  width: "100%", display: "flex", alignItems: "center", gap: 12,
                  padding: "11px 14px", marginBottom: 4, borderRadius: 12,
                  fontSize: 14.5, fontWeight: 500, textAlign: "left",
                  background: on ? (dark ? "#1B2540" : A.indigoSoft) : "transparent",
                  color: on ? A.indigo : c.inkSoft,
                }}>
                <n.icon size={19} strokeWidth={on ? 2.2 : 1.9} />
                {n.label}
              </button>
            );
          })}
        </nav>

        <div className="dh-sidefoot" style={{ color: c.muted, borderTop: `1px solid ${c.border}`, background: c.sidebar }}>
          © {new Date().getFullYear()} Digital Hikers.<br />All rights reserved.
        </div>
      </aside>

      {/* ---------------- Main ---------------- */}
      <div className="dh-main">

        {/* Topbar */}
        <header className="dh-pad sticky top-0 z-20 flex items-center gap-3 border-b"
          style={{ background: c.card, borderColor: c.border, paddingTop: 14, paddingBottom: 14 }}>
          <div className="dh-mobile-logo">
            <div className="text-[16px] font-extrabold tracking-tight">Digital Hikers</div>
            <div className="text-[9px] font-semibold tracking-[0.18em]" style={{ color: A.orange }}>OPS LEDGER</div>
          </div>

          <button onClick={() => setShowSearch(true)}
            className="dh-search items-center gap-2.5 rounded-xl px-4 py-2.5 flex-1 max-w-lg"
            style={{ border: `1px solid ${c.border}`, background: dark ? c.hover : "#fff", textAlign: "left" }}>
            <Search size={17} color={c.muted} />
            <span className="flex-1 text-[14px]" style={{ color: c.muted }}>Search anything...</span>
            <span className="text-[11px] font-medium px-1.5 py-0.5 rounded"
              style={{ background: dark ? "#1C2740" : "#F1F3F7", color: c.muted }}>⌘ K</span>
          </button>

          <div className="flex items-center gap-2.5 ml-auto">
            <button onClick={() => setDark(!dark)} className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ border: `1px solid ${c.border}`, color: c.inkSoft }}>
              {dark ? <Sun size={17} /> : <Moon size={17} />}
            </button>
            <div style={{ position: "relative" }}>
              <button onClick={() => setShowBell(v => !v)} className="relative w-10 h-10 rounded-full flex items-center justify-center"
                style={{ border: `1px solid ${c.border}`, color: c.inkSoft }}>
                <Bell size={17} />
                {notifications.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 rounded-full text-[10px] font-bold text-white flex items-center justify-center"
                    style={{ background: A.red, width: 18, height: 18 }}>{notifications.length}</span>
                )}
              </button>
              {showBell && (
                <NotificationPanel c={c} dark={dark} items={notifications}
                  onClose={() => setShowBell(false)} onGo={goToRecord} />
              )}
            </div>
            <div className="dh-user relative items-center gap-2.5 pl-2.5" style={{ borderLeft: `1px solid ${c.border}` }} ref={userMenuRef}>
              <button onClick={() => setShowUserMenu(v => !v)} className="flex items-center gap-2.5" style={{ background: "transparent" }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: A.orange, color: "#fff",
                  display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 14 }}>
                  D
                </div>
                <div className="leading-tight text-left">
                  <div className="text-[13.5px] font-semibold">Deepak Kumar</div>
                  <div className="text-[10px]" style={{ color: c.muted }}>Admin</div>
                </div>
                <ChevronDown size={16} color={c.muted} />
              </button>
              {showUserMenu && (
                <div style={{
                  position: "absolute", right: 0, top: "calc(100% + 8px)", zIndex: 50, width: 180,
                  background: c.card, border: `1px solid ${c.border}`, borderRadius: 12, padding: 6,
                  boxShadow: "0 16px 40px rgba(15,23,42,.16)",
                }}>
                  <button onClick={() => { setShowUserMenu(false); goto("settings"); }}
                    style={{ width: "100%", textAlign: "left", padding: "9px 12px", borderRadius: 8, fontSize: 13.5, color: c.ink }}>
                    Account settings
                  </button>
                  <button style={{ width: "100%", textAlign: "left", padding: "9px 12px", borderRadius: 8, fontSize: 13.5, color: A.clay, fontWeight: 600 }}>
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="dh-pad dh-scrollarea" style={{ flex: 1, paddingBottom: 96 }}>
          {page === "dashboard" && (
            <Dashboard c={c} dark={dark} D={D} live={liveTotals} period={period} setPeriod={setPeriod} customFrom={customFrom} setCustomFrom={setCustomFrom} customTo={customTo} setCustomTo={setCustomTo} sample={sample} setSample={setSample}
              onNewInvoice={() => { setPage("invoices"); setInvView({ mode: "edit", inv: null }); }}
              onViewInvoices={() => goto("invoices")}
              onNewSlip={() => { goto("salary"); setShowNewSlip(true); }}
              onAddExpense={() => { goto("expenses"); setExpModal({}); }}
              onUploadDoc={() => { goto("documents"); setShowUpload(true); }} />
          )}
          {page === "clients" && !activeClient && (
            <ClientsPage c={c} dark={dark} clients={clientList} onOpen={setActiveClient}
              onNew={() => setShowClientForm(true)} />
          )}
          {page === "clients" && activeClient && (
            <ClientProfile c={c} dark={dark}
              client={clients.find(x => x.id === activeClient.id) || activeClient}
              onBack={() => setActiveClient(null)}
              onEdit={() => setEditClient(clients.find(x => x.id === activeClient.id) || activeClient)}
              onAddContact={() => setAddContactFor(activeClient)}
              onAddNote={(text) => setClients(prev => prev.map(x => x.id === activeClient.id
                ? { ...x, noteList: [{ text, by: "Deepak Kumar", date: "Just now" }, ...(x.noteList || [])] }
                : x))} />
          )}
          {page === "invoices" && invView.mode === "list" && (
            <InvoicesPage c={c} dark={dark} invoices={invoiceList}
              onOpen={(i) => setInvView({ mode: "view", inv: i })}
              onNew={() => setInvView({ mode: "edit", inv: null })} />
          )}
          {page === "invoices" && invView.mode === "view" && invView.inv && (
            <InvoiceView c={c} dark={dark}
              inv={invoices.find(i => i.id === invView.inv.id) || invView.inv}
              client={clients.find(x => x.id === invView.inv.clientId)}
              onBack={() => setInvView({ mode: "list", inv: null })}
              onEdit={() => setInvView({ mode: "edit", inv: invoices.find(i => i.id === invView.inv.id) })}
              onPayment={() => setPayFor(invoices.find(i => i.id === invView.inv.id) || invView.inv)}
              onStatus={(s) => updateInvoice(invView.inv.id, { status: s })} />
          )}
          {page === "invoices" && invView.mode === "edit" && (
            <InvoiceEditor c={c} dark={dark} invoice={invView.inv} clients={clients} invoices={invoices}
              onCancel={() => setInvView(invView.inv ? { mode: "view", inv: invView.inv } : { mode: "list", inv: null })}
              onSave={saveInvoice} />
          )}
          {page === "employees" && !activeEmp && (
            <EmployeesPage c={c} dark={dark} employees={employeeList}
              onOpen={setActiveEmp} onNew={() => setShowEmpForm(true)} />
          )}
          {page === "employees" && activeEmp && (
            <EmployeeProfile c={c} dark={dark}
              emp={employees.find(e => e.id === activeEmp.id) || activeEmp}
              payroll={payroll} onBack={() => setActiveEmp(null)}
              onEdit={() => setEditEmp(employees.find(e => e.id === activeEmp.id) || activeEmp)}
              onOpenSlip={(r) => { setPage("salary"); setActiveEmp(null); setSlipRec(r); }} />
          )}
          {page === "salary" && !slipRec && (
            <SalaryPage c={c} dark={dark} employees={employeeList} payroll={payrollList}
              month={salMonth} year={salYear} setMonth={setSalMonth} setYear={setSalYear}
              onOpenSlip={setSlipRec} onGenerate={generateSlip}
              onNewSlip={() => setShowNewSlip(true)} />
          )}
          {page === "salary" && slipRec && (
            <SlipView c={c} dark={dark}
              rec={payroll.find(r => r.id === slipRec.id) || slipRec}
              emp={employees.find(e => e.id === slipRec.empId)}
              onBack={() => setSlipRec(null)} onSave={saveSlip}
              onMarkPaid={(f) => setSalPayFor(f)} />
          )}
          {page === "expenses" && (
            <ExpensesPage c={c} dark={dark} expenses={sample ? expenses : []}
              onNew={() => setExpModal({})}
              onEdit={(e) => setExpModal(e)}
              onDelete={(e) => setExpenses(prev => prev.filter(x => x.id !== e.id))} />
          )}
          {page === "settings" && (
            <SettingsPage c={c} dark={dark} settings={settings}
              user={{ name: "Deepak Kumar", username: "deepak" }}
              onSave={(f) => setSettings(f)}
              onChangePassword={async () => "Password changes work on the live app."} />
          )}
          {page === "documents" && (
            <DocumentsPage c={c} dark={dark} docs={sample ? docs : []}
              onUpload={() => setShowUpload(true)}
              onDelete={(d) => setDocs(prev => prev.filter(x => x.id !== d.id))} />
          )}
          {page !== "dashboard" && page !== "clients" && page !== "invoices"
            && page !== "employees" && page !== "salary" && page !== "documents"
            && page !== "expenses" && page !== "settings" && (
            <Placeholder c={c} label={nav.find(n => n.id === page)?.label || "More"} />
          )}
        </main>
      </div>

      {payFor && (
        <PaymentModal c={c} inv={payFor} onClose={() => setPayFor(null)}
          onSave={(p) => addPayment(payFor, p)} />
      )}

      {showEmpForm && (
        <EmployeeForm c={c} onClose={() => setShowEmpForm(false)}
          onSave={(f) => {
            setEmployees([...employees, { ...f, id: Date.now(), img: 0, documents: [], notes: "",
              history: [{ from: "Now", amt: f.salary }] }]);
            setShowEmpForm(false);
          }} />
      )}

      {showNewSlip && (
        <NewSlipModal c={c} employees={employees} payroll={payroll}
          defMonth={salMonth} defYear={salYear}
          onClose={() => setShowNewSlip(false)}
          onOpenExisting={(r) => { setShowNewSlip(false); setPage("salary"); setSlipRec(r); }}
          onCreate={(rec) => {
            setPayroll(prev => [...prev, rec]);
            setShowNewSlip(false);
            setSalMonth(rec.month); setSalYear(rec.year);
            setPage("salary"); setSlipRec(rec);
          }} />
      )}

      {expModal && (
        <ExpenseModal c={c} dark={dark} expense={expModal.id ? expModal : null}
          onClose={() => setExpModal(null)}
          onSave={(f) => {
            setExpenses(prev => f.id ? prev.map(x => x.id === f.id ? f : x) : [{ ...f, id: Date.now() }, ...prev]);
            setExpModal(null);
          }}
          onDelete={(f) => { setExpenses(prev => prev.filter(x => x.id !== f.id)); setExpModal(null); }} />
      )}

      {showSearch && (
        <GlobalSearch c={c} dark={dark}
          data={{ clients: sample ? clients : [], invoices: sample ? invoices : [],
                  employees: sample ? employees : [], docs: sample ? docs : [], expenses: sample ? expenses : [] }}
          onClose={() => setShowSearch(false)} onGo={goToRecord} />
      )}

      {editClient && (
        <ClientForm c={c} initial={editClient} onClose={() => setEditClient(null)}
          onSave={(f) => {
            setClients(prev => prev.map(x => x.id === editClient.id ? { ...x, ...f } : x));
            setActiveClient(a => a && a.id === editClient.id ? { ...a, ...f } : a);
            setEditClient(null);
          }} />
      )}

      {editEmp && (
        <EmployeeForm c={c} initial={editEmp} onClose={() => setEditEmp(null)}
          onSave={(f) => {
            setEmployees(prev => prev.map(x => x.id === editEmp.id ? { ...x, ...f, salary: Number(f.salary) || 0 } : x));
            setActiveEmp(a => a && a.id === editEmp.id ? { ...a, ...f } : a);
            setEditEmp(null);
          }} />
      )}

      {addContactFor && (
        <ContactModal c={c} onClose={() => setAddContactFor(null)}
          onSave={(f) => {
            setClients(prev => prev.map(x => x.id === addContactFor.id
              ? { ...x, contacts: [...(x.contacts || []), f] } : x));
            setAddContactFor(null);
          }} />
      )}

      {showUpload && (
        <UploadModal c={c} dark={dark} onClose={() => setShowUpload(false)}
          onSave={(f) => {
            setDocs(prev => [{ ...f, id: Date.now(), date: new Date().toISOString().slice(0, 10), by: "Deepak Kumar" }, ...prev]);
            setShowUpload(false);
          }} />
      )}

      {salPayFor && (
        <SalaryPayModal c={c} rec={salPayFor} emp={employees.find(e => e.id === salPayFor.empId)}
          onClose={() => setSalPayFor(null)} onSave={(p) => markSalaryPaid(salPayFor, p)} />
      )}

      {showClientForm && (
        <ClientForm c={c} onClose={() => setShowClientForm(false)}
          onSave={(f) => {
            setClients([...clients, {
              ...f, id: Date.now(), totalInvoices: 0, paid: 0, outstanding: 0,
              invoices: [], documents: [], contacts: [{ name: f.contact, role: "Primary Contact", email: f.email, phone: f.phone }],
              noteList: f.notes ? [{ text: f.notes, by: "Deepak Kumar", date: "Today" }] : [],
              activity: [{ text: "Client created", date: "Just now", tone: "indigo" }],
            }]);
            setShowClientForm(false);
          }} />
      )}

      {/* Mobile bottom nav */}
      <div className="dh-bottomnav border-t"
        style={{ background: c.card, borderColor: c.border }}>
        <div className="dh-navscroll" ref={navRef}
          onWheel={(e) => {
            if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
              navRef.current.scrollLeft += e.deltaY;
            }
          }}>
          {nav.map(n => {
            const on = page === n.id;
            return (
              <button key={n.id} data-nav={n.id} className="dh-navitem"
                onClick={(e) => {
                  e.currentTarget.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
                  goto(n.id);
                }}>
                <n.icon size={20} color={on ? A.indigo : c.muted} />
                <span className="text-[10px] font-medium" style={{ color: on ? A.indigo : c.muted, whiteSpace: "nowrap" }}>
                  {n.label === "Employees" ? "Staff" : n.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------- dashboard ------------------------------- */

function Dashboard({ c, dark, D, live, period, setPeriod, customFrom, setCustomFrom, customTo, setCustomTo, sample, setSample, onNewInvoice, onViewInvoices, onNewSlip, onAddExpense, onUploadDoc }) {
  const kpis = [
    { label: "Total Income",  value: inr(live.income),        Icon: PiggyBank, tone: "green",
      note: sample ? "↑ 18.4%  vs last month" : "No data yet", noteColor: sample ? A.green : c.muted },
    { label: "Total Expenses",value: inr(live.expenses),      Icon: Package,   tone: "red",
      note: sample ? "↑ 12.6%  vs last month" : "No data yet", noteColor: sample ? A.green : c.muted },
    { label: "Net Profit",    value: inr(live.income - live.expenses), Icon: BarChart3, tone: "blue",
      note: sample ? "↑ 22.5%  vs last month" : "No data yet", noteColor: sample ? A.green : c.muted },
    { label: "Outstanding",   value: inr(D.kpi.outstanding), Icon: Clock,     tone: "amber",
      note: sample ? "3 invoices overdue" : "Nothing overdue", noteColor: sample ? A.red : c.muted },
    { label: "Paid Invoices", value: String(D.kpi.paidInvoices), Icon: CheckCircle2, tone: "purple",
      note: "This month", noteColor: c.muted },
  ];

  return (
    <div className="mx-auto" style={{ maxWidth: 1560 }}>
      {/* header */}
      <div className="flex flex-wrap items-start justify-between gap-3 mb-6">
        <div>
          <h1 className="text-[24px] md:text-[28px] lg:text-[30px] font-bold tracking-tight">Dashboard Overview</h1>
          <p className="text-[14px] mt-1" style={{ color: c.inkSoft }}>
            Here's your business summary for 14 Aug 2026.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <button onClick={() => setSample(!sample)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-[12.5px] font-medium"
            style={{ border: `1px solid ${c.border}`, color: sample ? A.indigo : c.muted, background: c.card }}>
            <span className="w-8 h-4.5 rounded-full relative transition" style={{ background: sample ? A.indigo : c.border, height: 18, width: 32 }}>
              <span className="absolute top-0.5 w-3.5 h-3.5 rounded-full bg-white transition-all"
                style={{ left: sample ? 16 : 2 }} />
            </span>
            Sample data
          </button>
          <PeriodDropdown c={c} value={period} onChange={setPeriod} />
          {period === "Custom Range" && (
            <>
              <span className="text-[12.5px] font-medium" style={{ color: c.inkSoft }}>From</span>
              <div style={{ width: 150 }}><DateField c={c} value={customFrom} onChange={setCustomFrom} placeholder="Start date" /></div>
              <span className="text-[12.5px] font-medium" style={{ color: c.inkSoft }}>To</span>
              <div style={{ width: 150 }}><DateField c={c} value={customTo} onChange={setCustomTo} placeholder="End date" /></div>
            </>
          )}
        </div>
      </div>

      {/* KPI row */}
      <div className="dh-kpi">
        {kpis.map(k => (
          <Card key={k.label} c={c} className="kpi-card">
            <div className="kpi-head">
              <IconTile Icon={k.Icon} tone={k.tone} className="kpi-tile" />
              <div className="kpi-body">
                <FitText text={k.label} className="kpi-label font-medium" style={{ color: c.inkSoft }} />
                <FitText text={k.value} className="kpi-value font-bold tracking-tight" />
              </div>
            </div>
            <div className="kpi-note font-medium" style={{ color: k.noteColor }}>{k.note}</div>
          </Card>
        ))}

        {/* Mobile only — fills the empty slot next to Paid Invoices */}
        <Card c={c} className="kpi-card kpi-mobile-only">
          <div className="kpi-head">
              <IconTile Icon={Users} tone="blue" className="kpi-tile" />
              <div className="kpi-body">
                <FitText text="Upcoming Salaries" className="kpi-label font-medium" style={{ color: c.inkSoft }} />
                <FitText text={inr(D.salaries.reduce((a, s) => a + s.amt, 0))}
              className="kpi-value font-bold tracking-tight" />
              </div>
            </div>
          <div className="kpi-note font-medium" style={{ color: D.salaries.length ? A.orange : c.muted }}>
            {D.salaries.length ? "Due in 6 days" : "Nothing scheduled"}
          </div>
        </Card>
      </div>

      {/* chart + P&L + quick actions */}
      <div className="dh-mid">
        <Card c={c} className="p-5">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-[17px] font-bold tracking-tight">Income Overview</h2>
            <PeriodDropdown c={c} value={period} onChange={setPeriod} />
          </div>
          <div style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={D.chart} margin={{ top: 5, right: 8, left: -12, bottom: 0 }}>
                <CartesianGrid stroke={c.border} vertical={false} />
                <XAxis dataKey="d" tick={{ fontSize: 12, fill: c.muted }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: c.muted }} axisLine={false} tickLine={false}
                  tickFormatter={v => v >= 1000 ? `${v/1000}K` : v} />
                <Tooltip
                  contentStyle={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: 12, fontSize: 13 }}
                  formatter={v => inr(v)} />
                <Legend iconType="plainline" wrapperStyle={{ fontSize: 13, paddingBottom: 10 }} verticalAlign="top" align="left" />
                <Line type="monotone" dataKey="income"   name="Income"   stroke={A.green}  strokeWidth={2.5} dot={false} activeDot={{ r: 5 }} />
                <Line type="monotone" dataKey="invoices" name="Invoices" stroke={A.purple} strokeWidth={2.5} dot={false} activeDot={{ r: 5 }} />
                <Line type="monotone" dataKey="salaries" name="Salaries" stroke="#F97316"  strokeWidth={2.5} dot={false} activeDot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card c={c} className="p-5">
          <h2 className="text-[17px] font-bold tracking-tight mb-1">
            P&amp;L Summary <span className="text-[13px] font-medium" style={{ color: c.muted }}>({period})</span>
          </h2>
          <div className="mt-4">
            {[
              ["Total Income",   inr(live.income),          c.ink],
              ["Total Expenses", "– " + inr(live.expenses), c.ink],
              ["Salaries Paid",  "– " + inr(live.salaries), c.ink],
              ["Other Expenses", "– " + inr(live.other),    c.ink],
            ].map(([l, v, col], i) => (
              <button key={l} className="w-full flex items-center justify-between py-3.5 text-left"
                style={{ borderTop: i === 0 ? "none" : `1px solid ${c.border}` }}>
                <span className="text-[14px]" style={{ color: c.inkSoft }}>{l}</span>
                <span className="text-[14.5px] font-semibold" style={{ color: col }}>{v}</span>
              </button>
            ))}
          </div>
          <div className="flex items-center justify-between rounded-xl px-4 py-3.5 mt-2"
            style={{ background: dark ? "#0F2A1E" : A.greenSoft }}>
            <span className="text-[15px] font-bold" style={{ color: A.green }}>Net Profit</span>
            <span className="text-[19px] font-bold" style={{ color: live.profit >= 0 ? A.green : A.clay }}>{inr(live.profit)}</span>
          </div>
        </Card>

        <Card c={c} className="p-5">
          <h2 className="text-[17px] font-bold tracking-tight mb-4">Quick Actions</h2>
          <div className="space-y-3">
            {[
              { Icon: FileText, tone: "green",  t: "New Invoice",     s: "Create & send invoice", go: onNewInvoice },
              { Icon: Users,    tone: "purple", t: "New Salary Slip", s: "Generate salary slip", go: onNewSlip },
              { Icon: FolderClosed, tone: "blue", t: "Upload Document", s: "Upload PDF document", go: onUploadDoc },
              { Icon: Receipt,  tone: "amber",  t: "Add Expense",     s: "Record an expense", go: onAddExpense },
            ].map(q => (
              <button key={q.t} onClick={q.go} className="w-full flex items-center gap-3.5 p-3.5 rounded-xl text-left transition hover:opacity-90"
                style={{ border: `1px solid ${c.border}` }}>
                <IconTile Icon={q.Icon} tone={q.tone} size={40} />
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div className="text-[14.5px] font-semibold">{q.t}</div>
                  <div className="text-[12px]" style={{ color: c.muted, lineHeight: 1.4 }}>{q.s}</div>
                </div>
              </button>
            ))}
          </div>
        </Card>
      </div>

      {/* bottom row */}
      <div className="dh-bottom">
        <Card c={c} className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[17px] font-bold tracking-tight">Recent Invoices</h2>
            <button onClick={onViewInvoices} className="text-[13px] font-semibold" style={{ color: A.indigo }}>View all</button>
          </div>
          {D.invoices.length === 0 ? (
            <Empty c={c} text="No invoices yet." />
          ) : D.invoices.map(i => (
            <div key={i.no} className="flex items-center gap-3 py-3.5"
              style={{ borderBottom: `1px solid ${c.border}` }}>
              <div className="min-w-0 flex-1">
                <div className="text-[13.5px] font-semibold truncate">{i.client}</div>
                <div className="text-[12px] mt-0.5" style={{ color: c.muted, lineHeight: 1.4 }}>{i.no}</div>
              </div>
              <div className="text-[14px] font-semibold whitespace-nowrap">{inr(i.amt)}</div>
              <span className="text-[9.5px] font-normal px-2 py-0.5 rounded-full" style={pill(i.status)}>{i.status}</span>
              <button style={{ color: c.muted }}><Download size={17} /></button>
            </div>
          ))}
        </Card>

        <Card c={c} className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[17px] font-bold tracking-tight">Upcoming Salaries</h2>
            <button onClick={onNewSlip} className="text-[13px] font-semibold" style={{ color: A.indigo }}>View all</button>
          </div>
          {D.salaries.length === 0 ? (
            <Empty c={c} text="No salaries scheduled." />
          ) : (
            <>
              {D.salaries.map((s, idx) => (
                <div key={s.name} className="flex items-center gap-3 py-3"
                  style={{ borderBottom: `1px solid ${c.border}` }}>
                  <Avatar name={s.name} size={36} />
                  <div className="min-w-0 flex-1">
                    <div className="text-[13.5px] font-semibold truncate">{s.name}</div>
                    <div className="text-[12px] mt-0.5" style={{ color: c.muted, lineHeight: 1.4 }}>{s.role}</div>
                  </div>
                  <div className="text-[13px]" style={{ color: c.inkSoft }}>{s.date}</div>
                  <div className="text-[14px] font-semibold whitespace-nowrap">{inr(s.amt)}</div>
                </div>
              ))}
              <div className="flex items-center justify-between pt-4">
                <span className="text-[15px] font-bold" style={{ color: A.orange }}>Total Payroll</span>
                <span className="text-[18px] font-bold" style={{ color: A.orange }}>
                  {inr(D.salaries.reduce((a, s) => a + s.amt, 0))}
                </span>
              </div>
            </>
          )}
        </Card>

        <Card c={c} className="p-5">
          <h2 className="text-[17px] font-bold tracking-tight mb-4">Needs Your Attention</h2>
          {D.attention.length === 0 ? (
            <Empty c={c} text="Nothing needs attention." />
          ) : D.attention.map(a => (
            <button key={a.title} className="w-full flex items-center gap-3.5 p-3.5 mb-3 rounded-xl text-left"
              style={{ border: `1px solid ${c.border}` }}>
              <IconTile Icon={a.icon} tone={a.tone} size={40} />
              <div className="min-w-0 flex-1">
                <div className="text-[13.5px] font-semibold truncate">{a.title}</div>
                <div className="text-[12px] mt-0.5" style={{ color: c.muted, lineHeight: 1.4 }}>{a.sub}</div>
              </div>
              <ChevronRight size={17} color={c.muted} />
            </button>
          ))}
        </Card>
      </div>

    </div>
  );
}

function Empty({ c, text }) {
  return <div className="py-10 text-center text-[13.5px]" style={{ color: c.muted }}>{text}</div>;
}

function Placeholder({ c, label }) {
  return (
    <div className="mx-auto" style={{ maxWidth: 1560 }}>
      <h1 className="text-[24px] md:text-[28px] lg:text-[30px] font-bold tracking-tight mb-1">{label}</h1>
      <p className="text-[14px] mb-6" style={{ color: c.inkSoft }}>This section comes in the next phase.</p>
      <Card c={c} className="p-16 text-center">
        <div className="text-[15px] font-semibold mb-1">Not built yet</div>
        <div className="text-[13.5px]" style={{ color: c.muted }}>
          Dashboard is Phase 1. {label} will be wired up with the database next.
        </div>
      </Card>
    </div>
  );
}

/* ------------------------------- clients -------------------------------- */

function PageHead({ c, title, sub, action }) {
  return (
    <div className="dh-pagehead">
      <div>
        <h1 style={{ fontSize: 26, fontWeight: 700, letterSpacing: "-0.02em" }}>{title}</h1>
        <p style={{ fontSize: 14, marginTop: 4, color: c.inkSoft }}>{sub}</p>
      </div>
      {action}
    </div>
  );
}

function PrimaryBtn({ children, onClick }) {
  return (
    <button onClick={onClick}
      style={{
        display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
        background: A.orange, color: "#fff", fontSize: 14, fontWeight: 600,
        padding: "11px 20px", borderRadius: 12, whiteSpace: "nowrap",
      }}>
      {children}
    </button>
  );
}

function SearchBox({ c, placeholder, value, onChange, width }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 10, border: `1px solid ${c.border}`,
      background: c.card, borderRadius: 12, padding: "10px 14px", width: width || "100%", maxWidth: 320,
    }}>
      <Search size={16} color={c.muted} />
      <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        style={{ flex: 1, background: "transparent", outline: "none", fontSize: 14, color: c.ink, minWidth: 0 }} />
    </div>
  );
}

function Th({ c, children, align = "left" }) {
  return (
    <th style={{ textAlign: align, fontSize: 12.5, fontWeight: 600, color: c.muted, padding: "14px 20px", whiteSpace: "nowrap" }}>
      {children}
    </th>
  );
}

function Td({ c, children, align = "left", bold, color }) {
  return (
    <td style={{
      textAlign: align, fontSize: 14, padding: "16px 20px",
      fontWeight: bold ? 600 : 400, color: color || c.ink, whiteSpace: "nowrap",
    }}>{children}</td>
  );
}

function Pill({ status }) {
  return (
    <span style={{ ...pill(status), fontSize: 11.5, fontWeight: 600, padding: "4px 10px", borderRadius: 999, whiteSpace: "nowrap" }}>
      {status}
    </span>
  );
}

function StatusPill({ status }) {
  const on = status === "Active";
  return (
    <span style={{
      background: on ? A.greenSoft : A.redSoft, color: on ? A.green : A.red,
      fontSize: 11.5, fontWeight: 600, padding: "4px 10px", borderRadius: 999,
    }}>{status}</span>
  );
}

function ClientsPage({ c, dark, clients, onOpen, onNew }) {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("All");
  const [sort, setSort] = useState("Name");

  const rows = useMemo(() => {
    let r = clients.filter(x => {
      const hit = [x.company, x.contact, x.email, x.phone].join(" ").toLowerCase().includes(q.toLowerCase());
      const st = status === "All" || x.status === status;
      return hit && st;
    });
    if (sort === "Name") r = [...r].sort((a, b) => a.company.localeCompare(b.company));
    if (sort === "Newest") r = [...r].reverse();
    if (sort === "Outstanding") r = [...r].sort((a, b) => b.outstanding - a.outstanding);
    return r;
  }, [clients, q, status, sort]);

  const selectStyle = {
    fontSize: 13.5, fontWeight: 500, padding: "10px 12px", borderRadius: 12,
    border: `1px solid ${c.border}`, background: c.card, color: c.ink, outline: "none",
  };

  return (
    <div style={{ maxWidth: 1560, margin: "0 auto" }}>
      <PageHead c={c} title="Clients" sub="Manage your all clients and their details."
        action={<PrimaryBtn onClick={onNew}><Plus size={17} /> New Client</PrimaryBtn>} />

      <div className="dh-toolbar">
        <SearchBox c={c} placeholder="Search clients..." value={q} onChange={setQ} />
        <div style={{ display: "flex", gap: 10 }}>
          <select value={status} onChange={e => setStatus(e.target.value)} style={selectStyle}>
            {["All", "Active", "Inactive"].map(s => <option key={s}>{s}</option>)}
          </select>
          <select value={sort} onChange={e => setSort(e.target.value)} style={selectStyle}>
            {["Name", "Newest", "Outstanding"].map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
      </div>

      <Card c={c} style={{ overflow: "hidden" }}>
        {rows.length === 0 ? (
          <div style={{ padding: "64px 20px", textAlign: "center" }}>
            <Building2 size={28} color={c.muted} style={{ margin: "0 auto 10px" }} />
            <div style={{ fontSize: 14.5, fontWeight: 600 }}>No clients yet</div>
            <div style={{ fontSize: 13.5, color: c.muted, marginTop: 4 }}>Add your first client to start invoicing.</div>
          </div>
        ) : (
          <>
            {/* desktop table */}
            <table className="dh-table" style={{ borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${c.border}` }}>
                  <Th c={c}>Client Name</Th><Th c={c}>Contact</Th>
                  <Th c={c} align="right">Total Invoices</Th>
                  <Th c={c} align="right">Paid</Th><Th c={c} align="right">Outstanding</Th>
                  <Th c={c}>Status</Th><Th c={c} align="right">Action</Th>
                </tr>
              </thead>
              <tbody>
                {rows.map(x => (
                  <tr key={x.id} onClick={() => onOpen(x)}
                    style={{ borderBottom: `1px solid ${c.border}`, cursor: "pointer" }}>
                    <Td c={c} bold>{x.company}</Td>
                    <Td c={c} color={A.indigo}>{x.email}</Td>
                    <Td c={c} align="right">{x.totalInvoices}</Td>
                    <Td c={c} align="right">{inr(x.paid)}</Td>
                    <Td c={c} align="right" color={x.outstanding ? A.red : c.inkSoft}>{inr(x.outstanding)}</Td>
                    <Td c={c}><StatusPill status={x.status} /></Td>
                    <Td c={c} align="right"><MoreHorizontal size={18} color={c.muted} /></Td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* mobile cards */}
            <div className="dh-cards">
              {rows.map(x => (
                <button key={x.id} onClick={() => onOpen(x)}
                  style={{ width: "100%", textAlign: "left", padding: 16, borderBottom: `1px solid ${c.border}` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 10, marginBottom: 8 }}>
                    <div style={{ fontSize: 14.5, fontWeight: 600 }}>{x.company}</div>
                    <StatusPill status={x.status} />
                  </div>
                  <div style={{ fontSize: 12.5, color: c.muted, marginBottom: 10 }}>{x.email}</div>
                  <div style={{ display: "flex", gap: 18, fontSize: 12.5 }}>
                    <span style={{ color: c.inkSoft }}>{x.totalInvoices} invoices</span>
                    <span style={{ color: A.green }}>Paid {inr(x.paid)}</span>
                    {x.outstanding > 0 && <span style={{ color: A.red }}>Due {inr(x.outstanding)}</span>}
                  </div>
                </button>
              ))}
            </div>

            <div style={{ padding: "14px 20px", fontSize: 13, color: c.muted, borderTop: `1px solid ${c.border}` }}>
              Showing 1 to {rows.length} of {rows.length} clients
            </div>
          </>
        )}
      </Card>
    </div>
  );
}

/* ---------------------------- client profile ---------------------------- */

const TABS = ["Overview", "Invoices", "Documents", "Contacts", "Notes", "Activity"];

function ClientProfile({ c, dark, client, onBack, onEdit, onAddNote, onAddContact }) {
  const [tab, setTab] = useState("Overview");
  const [noteText, setNoteText] = useState("");
  const [invFilter, setInvFilter] = useState("All");

  const invoices = invFilter === "All" ? client.invoices : client.invoices.filter(i => i.status === invFilter);

  return (
    <div style={{ maxWidth: 1560, margin: "0 auto" }}>
      {/* breadcrumb + actions */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14 }}>
          <button onClick={onBack} style={{ color: c.inkSoft }}>Clients</button>
          <ChevronRight size={15} color={c.muted} />
          <span style={{ fontWeight: 600 }}>{client.company}</span>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={onEdit} style={{
            display: "flex", alignItems: "center", gap: 8, fontSize: 13.5, fontWeight: 600,
            padding: "10px 16px", borderRadius: 12, border: `1px solid ${c.border}`, background: c.card, color: c.ink,
          }}>
            <Pencil size={15} /> Edit Client
          </button>
          <button style={{
            width: 42, borderRadius: 12, border: `1px solid ${c.border}`, background: c.card,
            display: "flex", alignItems: "center", justifyContent: "center", color: c.inkSoft,
          }}><MoreHorizontal size={18} /></button>
        </div>
      </div>

      <div className="dh-profile">
        {/* left panel */}
        <Card c={c} style={{ padding: 24, alignSelf: "start" }}>
          <div style={{ textAlign: "center", marginBottom: 18 }}>
            <div style={{
              width: 84, height: 84, borderRadius: "50%", margin: "0 auto 14px",
              background: dark ? "#1B2540" : "#EEF1F6", color: c.inkSoft,
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, fontWeight: 700,
            }}>{client.company[0]}</div>
            <div style={{ fontSize: 19, fontWeight: 700, letterSpacing: "-0.01em" }}>{client.company}</div>
            <div style={{ marginTop: 8 }}><StatusPill status={client.status} /></div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13.5, color: c.inkSoft, marginBottom: 10 }}>
            <Mail size={16} color={c.muted} /> <span style={{ wordBreak: "break-all" }}>{client.email}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13.5, color: c.inkSoft, paddingBottom: 18, borderBottom: `1px solid ${c.border}` }}>
            <Phone size={16} color={c.muted} /> {client.phone}
          </div>

          {[["Since", client.since], ["Total Invoices", client.totalInvoices],
            ["Total Paid", inr(client.paid)], ["Total Outstanding", inr(client.outstanding)]].map(([l, v]) => (
            <div key={l} style={{ padding: "14px 0", borderBottom: `1px solid ${c.border}` }}>
              <div style={{ fontSize: 12.5, color: c.muted }}>{l}</div>
              <div style={{ fontSize: 15.5, fontWeight: 600, marginTop: 3 }}>{v}</div>
            </div>
          ))}
        </Card>

        {/* right column */}
        <div>
          <Card c={c} style={{ padding: "0 16px", marginBottom: 16 }}>
            <div className="dh-tabs">
              {TABS.map(t => {
                const on = tab === t;
                return (
                  <button key={t} onClick={() => setTab(t)}
                    style={{
                      padding: "16px 14px", fontSize: 14, fontWeight: on ? 600 : 500,
                      color: on ? A.orange : c.inkSoft, whiteSpace: "nowrap",
                      borderBottom: on ? `2px solid ${A.orange}` : "2px solid transparent",
                    }}>{t}</button>
                );
              })}
            </div>
          </Card>

          {tab === "Overview" && (
            <>
              <Card c={c} style={{ padding: 20, marginBottom: 16 }}>
                <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 14 }}>Financial Overview</div>
                <div className="dh-fin3">
                  {[
                    { l: "Total Invoices", v: client.totalInvoices, Icon: FileText, tone: "indigo" },
                    { l: "Total Paid", v: inr(client.paid), Icon: Wallet, tone: "green" },
                    { l: "Outstanding", v: inr(client.outstanding), Icon: Clock, tone: "amber" },
                  ].map(f => (
                    <div key={f.l} style={{ display: "flex", alignItems: "center", gap: 12, padding: 16, borderRadius: 14, border: `1px solid ${c.border}` }}>
                      <IconTile Icon={f.Icon} tone={f.tone} size={40} />
                      <div>
                        <div style={{ fontSize: 12.5, color: c.inkSoft }}>{f.l}</div>
                        <div style={{ fontSize: 20, fontWeight: 700, marginTop: 2 }}>{f.v}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card c={c} style={{ padding: 20, marginBottom: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                  <div style={{ fontSize: 16, fontWeight: 700 }}>Recent Invoices</div>
                  <button onClick={() => setTab("Invoices")} style={{ fontSize: 13, fontWeight: 600, color: A.indigo }}>
                    View all invoices →
                  </button>
                </div>
                <InvoiceRows c={c} rows={client.invoices.slice(0, 5)} />
              </Card>

              <div className="dh-fin2">
                <Card c={c} style={{ padding: 20 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                    <div style={{ fontSize: 16, fontWeight: 700 }}>Contact Information</div>
                    <IconTile Icon={Users} tone="indigo" size={34} />
                  </div>
                  {[["Primary Contact", client.contact], ["Email", client.email],
                    ["Phone", client.phone], ["Address", client.address]].map(([l, v]) => (
                    <div key={l} style={{ display: "flex", gap: 14, padding: "8px 0", fontSize: 13.5 }}>
                      <div style={{ width: 118, color: c.inkSoft, flexShrink: 0 }}>{l}</div>
                      <div style={{ color: c.ink }}>{v || "—"}</div>
                    </div>
                  ))}
                </Card>

                <Card c={c} style={{ padding: 20 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                    <div style={{ fontSize: 16, fontWeight: 700 }}>Notes</div>
                    <IconTile Icon={FileText} tone="amber" size={34} />
                  </div>
                  {client.notes ? (
                    <>
                      <div style={{ background: dark ? "#1A1410" : A.orangeSoft, borderRadius: 12, padding: 16, fontSize: 13.5, lineHeight: 1.6, color: c.ink }}>
                        {client.notes}
                      </div>
                      <div style={{ fontSize: 12, color: c.muted, marginTop: 12 }}>
                        Last updated on {client.notesUpdated} by Deepak Kumar
                      </div>
                    </>
                  ) : (
                    <div style={{ fontSize: 13.5, color: c.muted, padding: "20px 0" }}>No notes yet.</div>
                  )}
                </Card>
              </div>
            </>
          )}

          {tab === "Invoices" && (
            <Card c={c} style={{ padding: 20 }}>
              <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
                {["All", "Paid", "Pending", "Overdue", "Partial", "Draft"].map(f => (
                  <button key={f} onClick={() => setInvFilter(f)}
                    style={{
                      fontSize: 12.5, fontWeight: 500, padding: "7px 14px", borderRadius: 999,
                      border: `1px solid ${invFilter === f ? A.indigo : c.border}`,
                      background: invFilter === f ? A.indigoSoft : c.card,
                      color: invFilter === f ? A.indigo : c.inkSoft,
                    }}>{f}</button>
                ))}
              </div>
              <InvoiceRows c={c} rows={invoices} showActions />
            </Card>
          )}

          {tab === "Documents" && (
            <Card c={c} style={{ padding: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, gap: 10, flexWrap: "wrap" }}>
                <div style={{ fontSize: 16, fontWeight: 700 }}>Documents</div>
                <PrimaryBtn><Upload size={16} /> Upload Document</PrimaryBtn>
              </div>
              {client.documents.length === 0 ? (
                <Blank c={c} Icon={FolderClosed} title="No documents yet"
                  sub="Upload contracts, proposals or certificates for this client." />
              ) : client.documents.map(d => (
                <div key={d.name} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 0", borderBottom: `1px solid ${c.border}` }}>
                  <IconTile Icon={FileText} tone="red" size={38} />
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{d.name}</div>
                    <div style={{ fontSize: 12, color: c.muted, marginTop: 2 }}>{d.size} · {d.date}</div>
                  </div>
                  <span style={{ background: A.indigoSoft, color: A.indigo, fontSize: 11.5, fontWeight: 600, padding: "4px 10px", borderRadius: 999, whiteSpace: "nowrap" }}>{d.cat}</span>
                  <button style={{ color: c.muted }}><Download size={17} /></button>
                  <button style={{ color: c.muted }}><MoreHorizontal size={17} /></button>
                </div>
              ))}
            </Card>
          )}

          {tab === "Contacts" && (
            <Card c={c} style={{ padding: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, gap: 10, flexWrap: "wrap" }}>
                <div style={{ fontSize: 16, fontWeight: 700 }}>Contacts</div>
                <PrimaryBtn onClick={onAddContact}><Plus size={16} /> Add Contact</PrimaryBtn>
              </div>
              {client.contacts.map(p => (
                <div key={p.email} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 0", borderBottom: `1px solid ${c.border}` }}>
                  <div style={{
                    width: 42, height: 42, borderRadius: "50%", background: dark ? "#1B2540" : "#EEF1F6",
                    color: c.inkSoft, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, flexShrink: 0,
                  }}>{p.name[0]}</div>
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{p.name}</div>
                    <div style={{ fontSize: 12.5, color: c.muted, marginTop: 2 }}>{p.email} · {p.phone}</div>
                  </div>
                  <span style={{ background: A.greenSoft, color: A.green, fontSize: 11.5, fontWeight: 600, padding: "4px 10px", borderRadius: 999, whiteSpace: "nowrap" }}>{p.role}</span>
                </div>
              ))}
            </Card>
          )}

          {tab === "Notes" && (
            <Card c={c} style={{ padding: 20 }}>
              <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 14 }}>Notes</div>
              <textarea placeholder="Write a note about this client..." value={noteText}
                onChange={e => setNoteText(e.target.value)}
                style={{
                  width: "100%", boxSizing: "border-box", minHeight: 90, borderRadius: 12, border: `1px solid ${c.border}`,
                  background: c.card, color: c.ink, padding: 14, fontSize: 14, outline: "none", resize: "vertical",
                }} />
              <div style={{ display: "flex", justifyContent: "flex-end", margin: "12px 0 20px" }}>
                <PrimaryBtn onClick={() => { if (noteText.trim()) { onAddNote(noteText.trim()); setNoteText(""); } }}>
                  <Plus size={16} /> Add Note
                </PrimaryBtn>
              </div>
              {client.noteList.length === 0 ? (
                <Blank c={c} Icon={FileText} title="No notes yet" sub="Notes help you remember how this client likes to work." />
              ) : client.noteList.map((n, i) => (
                <div key={i} style={{ padding: 16, borderRadius: 12, border: `1px solid ${c.border}`, marginBottom: 10 }}>
                  <div style={{ fontSize: 13.5, lineHeight: 1.6 }}>{n.text}</div>
                  <div style={{ fontSize: 12, color: c.muted, marginTop: 8 }}>{n.by} · {n.date}</div>
                </div>
              ))}
            </Card>
          )}

          {tab === "Activity" && (
            <Card c={c} style={{ padding: 20 }}>
              <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Activity</div>
              {client.activity.length === 0 ? (
                <Blank c={c} Icon={Clock} title="No activity yet" sub="Actions on this client will show up here." />
              ) : client.activity.map((a, i) => {
                const dot = { green: A.green, red: A.red, indigo: A.indigo, blue: A.blue, amber: A.amber }[a.tone] || A.indigo;
                const last = i === client.activity.length - 1;
                return (
                  <div key={i} style={{ display: "flex", gap: 14 }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <div style={{ width: 10, height: 10, borderRadius: "50%", background: dot, marginTop: 5 }} />
                      {!last && <div style={{ width: 2, flex: 1, background: c.border, margin: "4px 0" }} />}
                    </div>
                    <div style={{ paddingBottom: last ? 0 : 22 }}>
                      <div style={{ fontSize: 14, fontWeight: 500 }}>{a.text}</div>
                      <div style={{ fontSize: 12, color: c.muted, marginTop: 3 }}>{a.date}</div>
                    </div>
                  </div>
                );
              })}
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

function InvoiceRows({ c, rows, showActions }) {
  if (rows.length === 0) return <Blank c={c} Icon={FileText} title="No invoices" sub="Nothing matches this filter." />;
  return (
    <>
      <table className="dh-table" style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: `1px solid ${c.border}` }}>
            <Th c={c}>Invoice #</Th><Th c={c}>Date</Th>
            <Th c={c} align="right">Amount</Th><Th c={c}>Status</Th>
            <Th c={c}>Due Date</Th><Th c={c} align="right">{showActions ? "Actions" : ""}</Th>
          </tr>
        </thead>
        <tbody>
          {rows.map(i => (
            <tr key={i.no} style={{ borderBottom: `1px solid ${c.border}` }}>
              <Td c={c} bold>{i.no}</Td>
              <Td c={c} color={c.inkSoft}>{i.date}</Td>
              <Td c={c} align="right" bold>{inr(i.amt)}</Td>
              <Td c={c}><Pill status={i.status} /></Td>
              <Td c={c} color={c.inkSoft}>{i.due}</Td>
              <Td c={c} align="right">
                <span style={{ display: "inline-flex", gap: 14, color: c.muted }}>
                  <Download size={17} />
                  {showActions && <MoreHorizontal size={17} />}
                </span>
              </Td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="dh-cards">
        {rows.map(i => (
          <div key={i.no} style={{ padding: "14px 0", borderBottom: `1px solid ${c.border}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 10, marginBottom: 6 }}>
              <span style={{ fontSize: 14, fontWeight: 600 }}>{i.no}</span>
              <Pill status={i.status} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5, color: c.muted }}>
              <span>{i.date} · Due {i.due}</span>
              <span style={{ fontSize: 14, fontWeight: 600, color: c.ink }}>{inr(i.amt)}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function Blank({ c, Icon, title, sub }) {
  return (
    <div style={{ padding: "56px 20px", textAlign: "center" }}>
      <Icon size={26} color={c.muted} style={{ margin: "0 auto 10px" }} />
      <div style={{ fontSize: 14.5, fontWeight: 600 }}>{title}</div>
      <div style={{ fontSize: 13, color: c.muted, marginTop: 4 }}>{sub}</div>
    </div>
  );
}

/* ------------------------------ client form ----------------------------- */

function ClientForm({ c, onClose, onSave, initial }) {
  const [f, setF] = useState(initial || {
    company: "", contact: "", email: "", phone: "", address: "", gstin: "",
    service: "", type: "Retainer", since: "", status: "Active", notes: "",
  });
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  const label = { fontSize: 12.5, fontWeight: 500, color: c.inkSoft, display: "block", marginBottom: 6 };
  const input = {
    width: "100%", fontSize: 15, padding: "10px 12px", borderRadius: 10,
    border: `1px solid ${c.border}`, background: c.card, color: c.ink, outline: "none",
  };
  const section = { fontSize: 13, fontWeight: 700, color: c.ink, margin: "18px 0 12px" };

  return (
    <div onClick={onClose}
      style={{ position: "fixed", inset: 0, zIndex: 50, background: "rgba(15,23,42,.45)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div onClick={e => e.stopPropagation()}
        style={{ background: c.card, borderRadius: 18, width: "100%", maxWidth: 520, maxHeight: "88vh", overflowY: "auto" }}>
        <div style={{ position: "sticky", top: 0, background: c.card, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 22px", borderBottom: `1px solid ${c.border}` }}>
          <div style={{ fontSize: 18, fontWeight: 700 }}>{initial ? "Edit Client" : "New Client"}</div>
          <button onClick={onClose} style={{ color: c.muted }}><X size={19} /></button>
        </div>

        <div style={{ padding: 22 }}>
          <div style={{ ...section, marginTop: 0 }}>Basic Information</div>
          <label style={label}>Company name
            <input style={input} value={f.company} onChange={set("company")} /></label>
          <label style={label}>Contact person
            <input style={input} value={f.contact} onChange={set("contact")} /></label>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <label style={label}>Email<input style={input} value={f.email} onChange={set("email")} /></label>
            <label style={label}>Phone<input style={input} value={f.phone} onChange={set("phone")} /></label>
          </div>
          <label style={label}>Address
            <textarea rows={2} style={{ ...input, resize: "vertical" }} value={f.address} onChange={set("address")} /></label>

          <div style={section}>Business Information</div>
          <label style={label}>Service
            <input style={input} value={f.service} onChange={set("service")} placeholder="e.g. Website maintenance & SEO" /></label>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <label style={label}>Client type
              <select style={input} value={f.type} onChange={set("type")}>
                {["Retainer", "Project", "One-time"].map(t => <option key={t}>{t}</option>)}
              </select></label>
            <label style={label}>Status
              <select style={input} value={f.status} onChange={set("status")}>
                {["Active", "Inactive"].map(t => <option key={t}>{t}</option>)}
              </select></label>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <label style={label}>Start date<DateField c={c} value={f.since} onChange={(v) => setF({ ...f, since: v })} /></label>
            <label style={label}>GSTIN (optional)<input style={input} value={f.gstin} onChange={set("gstin")} /></label>
          </div>

          <div style={section}>Notes</div>
          <label style={label}>Optional
            <textarea rows={2} style={{ ...input, resize: "vertical" }} value={f.notes} onChange={set("notes")} /></label>

          <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
            <button onClick={onClose}
              style={{ flex: 1, padding: "12px", borderRadius: 12, border: `1px solid ${c.border}`, background: c.card, color: c.ink, fontSize: 14, fontWeight: 600 }}>
              Cancel
            </button>
            <button onClick={() => f.company && onSave({ ...f, since: f.since || "Today" })}
              style={{ flex: 1, padding: "12px", borderRadius: 12, background: A.orange, color: "#fff", fontSize: 14, fontWeight: 600 }}>
              {initial ? "Save changes" : "Save client"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------- invoices ------------------------------- */

const INV_STATUSES = ["Draft", "Sent", "Pending", "Partially Paid", "Paid", "Overdue", "Cancelled"];

function invPillStyle(status) {
  const map = {
    Paid: [A.greenSoft, A.green], Overdue: [A.redSoft, A.red],
    Pending: [A.amberSoft, A.amber], "Partially Paid": [A.amberSoft, A.amber],
    Sent: [A.blueSoft, A.blue], Draft: [A.blueSoft, A.blue],
    Cancelled: ["#EEF0F3", "#8A93A6"],
  };
  const [bg, fg] = map[status] || map.Draft;
  return { background: bg, color: fg, fontSize: 11.5, fontWeight: 600, padding: "4px 10px", borderRadius: 999, whiteSpace: "nowrap" };
}

function InvPill({ status }) { return <span style={invPillStyle(status)}>{status}</span>; }

function InvoicesPage({ c, dark, invoices, onOpen, onNew }) {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("All Status");
  const [page, setPage] = useState(1);
  const perPage = 7;

  const rows = useMemo(() => {
    return invoices.filter(i => {
      const hit = [i.no, i.client].join(" ").toLowerCase().includes(q.toLowerCase());
      const st = status === "All Status" || i.status === status;
      return hit && st;
    });
  }, [invoices, q, status]);

  const pages = Math.max(1, Math.ceil(rows.length / perPage));
  const shown = rows.slice((page - 1) * perPage, page * perPage);

  const listBy = (...sts) => invoices.filter(i => sts.includes(i.status));
  const cntBy = (st) => invoices.filter(i => i.status === st).length;

  const stats = [
    { label: "Total Invoices", val: invoices.length, sub: "All time", Icon: FileText, tone: "indigo", subColor: c.muted },
    { label: "Paid Invoices", val: cntBy("Paid"), sub: moneyGroup(listBy("Paid")), Icon: CheckCircle2, tone: "green", subColor: A.green },
    { label: "Pending Invoices", val: cntBy("Pending") + cntBy("Partially Paid"), sub: moneyGroup(listBy("Pending", "Partially Paid")), Icon: Clock, tone: "amber", subColor: A.amber },
    { label: "Overdue Invoices", val: cntBy("Overdue"), sub: moneyGroup(listBy("Overdue")), Icon: CircleDot, tone: "red", subColor: A.red },
    { label: "Draft Invoices", val: cntBy("Draft"), sub: moneyGroup(listBy("Draft")), Icon: FileText, tone: "blue", subColor: A.blue },
  ];

  const selectStyle = {
    fontSize: 13.5, fontWeight: 500, padding: "10px 12px", borderRadius: 12,
    border: `1px solid ${c.border}`, background: c.card, color: c.ink, outline: "none",
  };

  return (
    <div style={{ maxWidth: 1560, margin: "0 auto" }}>
      <PageHead c={c} title="Invoices" sub="Create, manage and track invoices."
        action={<PrimaryBtn onClick={onNew}><Plus size={17} /> New Invoice</PrimaryBtn>} />

      <div className="dh-kpi">
        {stats.map(s => (
          <Card key={s.label} c={c} className="kpi-card">
            <div className="kpi-head">
              <IconTile Icon={s.Icon} tone={s.tone} className="kpi-tile" />
              <div className="kpi-body">
                <FitText text={s.label} className="kpi-label font-medium" style={{ color: c.inkSoft }} />
                <FitText text={s.val} className="kpi-value font-bold tracking-tight" />
              </div>
            </div>
            <div className="kpi-note font-medium" style={{ color: s.subColor }}>{s.sub}</div>
          </Card>
        ))}
      </div>

      <div className="dh-toolbar">
        <SearchBox c={c} placeholder="Search invoices..." value={q} onChange={v => { setQ(v); setPage(1); }} />
        <select value={status} onChange={e => { setStatus(e.target.value); setPage(1); }} style={selectStyle}>
          {["All Status", ...INV_STATUSES].map(s => <option key={s}>{s}</option>)}
        </select>
      </div>

      <Card c={c} style={{ overflow: "hidden" }}>
        {shown.length === 0 ? (
          <Blank c={c} Icon={FileText} title="No invoices" sub="Nothing matches this search or filter." />
        ) : (
          <>
            <table className="dh-table" style={{ borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${c.border}` }}>
                  <Th c={c}>Invoice #</Th><Th c={c}>Client</Th><Th c={c}>Date</Th><Th c={c}>Due Date</Th>
                  <Th c={c} align="right">Amount</Th><Th c={c}>Status</Th><Th c={c} align="right">Action</Th>
                </tr>
              </thead>
              <tbody>
                {shown.map(i => {
                  const t = invTotals(i);
                  return (
                    <tr key={i.id} onClick={() => onOpen(i)} style={{ borderBottom: `1px solid ${c.border}`, cursor: "pointer" }}>
                      <Td c={c} bold>{i.no}</Td>
                      <Td c={c} color={c.inkSoft}>{i.client}</Td>
                      <Td c={c} color={c.inkSoft}>{fmtDate(i.date)}</Td>
                      <Td c={c} color={i.status === "Overdue" ? A.red : c.inkSoft}>{fmtDate(i.due)}</Td>
                      <Td c={c} align="right" bold>{money(t.total, i.currency)}</Td>
                      <Td c={c}><InvPill status={i.status} /></Td>
                      <Td c={c} align="right">
                        <span style={{ display: "inline-flex", gap: 14, color: c.muted }}>
                          <Download size={17} /><MoreHorizontal size={17} />
                        </span>
                      </Td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div className="dh-cards">
              {shown.map(i => {
                const t = invTotals(i);
                return (
                  <button key={i.id} onClick={() => onOpen(i)}
                    style={{ width: "100%", textAlign: "left", padding: 16, borderBottom: `1px solid ${c.border}` }}>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 10, marginBottom: 6 }}>
                      <span style={{ fontSize: 14.5, fontWeight: 600 }}>{i.no}</span>
                      <InvPill status={i.status} />
                    </div>
                    <div style={{ fontSize: 13, color: c.inkSoft, marginBottom: 8 }}>{i.client}</div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5, color: c.muted }}>
                      <span>{fmtDate(i.date)} · Due {fmtDate(i.due)}</span>
                      <span style={{ fontSize: 14.5, fontWeight: 700, color: c.ink }}>{money(t.total, i.currency)}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10, padding: "14px 20px", borderTop: `1px solid ${c.border}` }}>
              <span style={{ fontSize: 13, color: c.muted }}>
                Showing {(page - 1) * perPage + 1} to {Math.min(page * perPage, rows.length)} of {rows.length} invoices
              </span>
              <div style={{ display: "flex", gap: 6 }}>
                {Array.from({ length: pages }).map((_, n) => (
                  <button key={n} onClick={() => setPage(n + 1)}
                    style={{
                      width: 34, height: 34, borderRadius: 10, fontSize: 13, fontWeight: 600,
                      border: `1px solid ${page === n + 1 ? A.orange : c.border}`,
                      background: page === n + 1 ? A.orange : c.card,
                      color: page === n + 1 ? "#fff" : c.inkSoft,
                    }}>{n + 1}</button>
                ))}
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}

/* ---------------------------- invoice document --------------------------- */

function InvoiceDoc({ c, dark, inv, client }) {
  const t = invTotals(inv);
  const cur = inv.currency || "INR";
  const m = (n) => money(n, cur);
  const line = { display: "flex", justifyContent: "space-between", padding: "6px 0", fontSize: 13.5 };
  return (
    <div className="print-area" style={{ background: "#fff", color: "#0F172A", borderRadius: 16, border: `1px solid ${c.border}`, padding: 28 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, flexWrap: "wrap" }}>
        <div>
          <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-0.02em" }}>{COMPANY.name}</div>
          <div style={{ fontSize: 11.5, color: "#64748B", marginTop: 3 }}>{COMPANY.tagline}</div>
          <div style={{ fontSize: 11.5, color: "#64748B" }}>{COMPANY.address}</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.02em" }}>INVOICE</div>
          <div style={{ fontSize: 13, fontWeight: 600, marginTop: 2 }}>{inv.no}</div>
          <div style={{ fontSize: 11.5, color: "#64748B", marginTop: 2 }}>Currency: {cur}</div>
          <div style={{ marginTop: 8 }}><InvPill status={inv.status} /></div>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", gap: 20, flexWrap: "wrap", margin: "26px 0 18px" }}>
        <div>
          <div style={{ fontSize: 10, letterSpacing: ".12em", textTransform: "uppercase", color: "#94A3B8", marginBottom: 6 }}>Bill to</div>
          <div style={{ fontSize: 15, fontWeight: 700 }}>{client?.company || inv.client}</div>
          {client && <>
            <div style={{ fontSize: 12.5, color: "#64748B", marginTop: 2 }}>{client.contact}</div>
            <div style={{ fontSize: 12.5, color: "#64748B", maxWidth: 260 }}>{client.address}</div>
            <div style={{ fontSize: 12.5, color: "#64748B" }}>{client.email}</div>
          </>}
        </div>
        <div style={{ fontSize: 12.5, color: "#64748B", textAlign: "right" }}>
          <div>Invoice date: <b style={{ color: "#0F172A" }}>{fmtDate(inv.date)}</b></div>
          <div>Due date: <b style={{ color: "#0F172A" }}>{fmtDate(inv.due)}</b></div>
          <div>Terms: <b style={{ color: "#0F172A" }}>{inv.terms}</b></div>
        </div>
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 6 }}>
        <thead>
          <tr style={{ borderBottom: "1px solid #E2E8F0" }}>
            <th style={{ textAlign: "left", fontSize: 11, color: "#94A3B8", padding: "8px 0", fontWeight: 600 }}>DESCRIPTION</th>
            <th style={{ textAlign: "right", fontSize: 11, color: "#94A3B8", padding: "8px 0", fontWeight: 600, width: 60 }}>QTY</th>
            <th style={{ textAlign: "right", fontSize: 11, color: "#94A3B8", padding: "8px 0", fontWeight: 600, width: 90 }}>RATE</th>
            <th style={{ textAlign: "right", fontSize: 11, color: "#94A3B8", padding: "8px 0", fontWeight: 600, width: 100 }}>AMOUNT</th>
          </tr>
        </thead>
        <tbody>
          {inv.items.map((it, n) => (
            <tr key={n} style={{ borderBottom: "1px solid #F1F5F9" }}>
              <td style={{ fontSize: 13.5, padding: "11px 0" }}>{it.desc || "—"}</td>
              <td style={{ fontSize: 13.5, padding: "11px 0", textAlign: "right" }}>{it.qty}</td>
              <td style={{ fontSize: 13.5, padding: "11px 0", textAlign: "right" }}>{m(it.rate)}</td>
              <td style={{ fontSize: 13.5, padding: "11px 0", textAlign: "right", fontWeight: 600 }}>{m(it.qty * it.rate)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 16 }}>
        <div style={{ width: 240 }}>
          <div style={line}><span style={{ color: "#64748B" }}>Subtotal</span><span>{m(t.subtotal)}</span></div>
          {t.discount > 0 && <div style={line}><span style={{ color: "#64748B" }}>Discount</span><span>– {m(t.discount)}</span></div>}
          <div style={{ ...line, borderTop: "1px solid #E2E8F0", marginTop: 6, paddingTop: 12, fontSize: 16, fontWeight: 800 }}>
            <span>Grand Total</span><span>{m(t.total)}</span>
          </div>
          {t.paid > 0 && <>
            <div style={{ ...line, color: "#16A34A" }}><span>Paid</span><span>– {m(t.paid)}</span></div>
            <div style={{ ...line, fontWeight: 700, color: t.due > 0 ? "#B4392F" : "#16A34A" }}>
              <span>Balance due</span><span>{m(t.due)}</span>
            </div>
          </>}
        </div>
      </div>

      <div style={{ marginTop: 22, paddingTop: 16, borderTop: "1px solid #E2E8F0", fontSize: 12, color: "#64748B" }}>
        {inv.notes && <div style={{ marginBottom: 8 }}>{inv.notes}</div>}
        <div><b style={{ color: "#0F172A" }}>Payment details:</b> {COMPANY.bank}</div>
        <div style={{ marginTop: 4 }}>{COMPANY.email} · {COMPANY.phone}</div>
      </div>
    </div>
  );
}

/* ------------------------------ invoice view ----------------------------- */

function InvoiceView({ c, dark, inv, client, onBack, onEdit, onPayment, onStatus }) {
  const t = invTotals(inv);
  const m = (n) => money(n, inv.currency);
  const btn = {
    display: "flex", alignItems: "center", gap: 8, fontSize: 13.5, fontWeight: 600,
    padding: "10px 16px", borderRadius: 12, border: `1px solid ${c.border}`, background: c.card, color: c.ink,
  };

  return (
    <div style={{ maxWidth: 1560, margin: "0 auto" }}>
      <div className="no-print" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14 }}>
          <button onClick={onBack} style={{ color: c.inkSoft }}>Invoices</button>
          <ChevronRight size={15} color={c.muted} />
          <span style={{ fontWeight: 600 }}>{inv.no}</span>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button style={btn} onClick={onEdit}><Pencil size={15} /> Edit</button>
          <button style={btn} onClick={() => window.print()}><Download size={15} /> Download PDF</button>
          {inv.status !== "Paid" && inv.status !== "Cancelled" && (
            <PrimaryBtn onClick={onPayment}><Wallet size={16} /> Record Payment</PrimaryBtn>
          )}
        </div>
      </div>

      <div className="dh-editor">
        <InvoiceDoc c={c} dark={dark} inv={inv} client={client} />

        <div className="no-print">
          <Card c={c} style={{ padding: 20, marginBottom: 16 }}>
            <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 14 }}>Payment status</div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", fontSize: 14 }}>
              <span style={{ color: c.inkSoft }}>Invoice total</span><b>{m(t.total)}</b>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", fontSize: 14 }}>
              <span style={{ color: c.inkSoft }}>Received</span><b style={{ color: A.green }}>{m(t.paid)}</b>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0 0", marginTop: 6, borderTop: `1px solid ${c.border}`, fontSize: 15 }}>
              <b>Balance due</b><b style={{ color: t.due > 0 ? A.red : A.green }}>{m(t.due)}</b>
            </div>

            <div style={{ height: 8, borderRadius: 999, background: dark ? "#1B2540" : "#EEF1F6", marginTop: 14, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${t.total ? Math.min(100, (t.paid / t.total) * 100) : 0}%`, background: A.green }} />
            </div>

            <div style={{ marginTop: 16 }}>
              <div style={{ fontSize: 12.5, color: c.inkSoft, marginBottom: 8 }}>Change status</div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {["Draft", "Sent", "Pending", "Overdue", "Cancelled"].map(s => (
                  <button key={s} onClick={() => onStatus(s)}
                    style={{
                      fontSize: 12, fontWeight: 500, padding: "6px 12px", borderRadius: 999,
                      border: `1px solid ${inv.status === s ? A.indigo : c.border}`,
                      background: inv.status === s ? A.indigoSoft : c.card,
                      color: inv.status === s ? A.indigo : c.inkSoft,
                    }}>{s}</button>
                ))}
              </div>
            </div>
          </Card>

          <Card c={c} style={{ padding: 20 }}>
            <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>Payment history</div>
            {(!inv.payments || inv.payments.length === 0) ? (
              <Blank c={c} Icon={Wallet} title="No payments yet" sub="Record a payment when money comes in." />
            ) : inv.payments.map((p, n) => (
              <div key={n} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0", borderBottom: `1px solid ${c.border}` }}>
                <IconTile Icon={CheckCircle2} tone="green" size={36} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{m(p.amt)}</div>
                  <div style={{ fontSize: 12, color: c.muted, marginTop: 2 }}>
                    {fmtDate(p.date)} · {p.method}{p.ref ? ` · ${p.ref}` : ""}
                  </div>
                </div>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------- invoice editor ---------------------------- */

function InvoiceEditor({ c, dark, invoice, clients, invoices, onCancel, onSave }) {
  const isNew = !invoice;
  const todayISO = new Date().toISOString().slice(0, 10);

  const nextNo = () => {
    const year = new Date().getFullYear();
    const n = invoices.filter(i => i.no.includes(`INV-${year}`)).length + 1;
    return `INV-${year}-${String(n).padStart(3, "0")}`;
  };

  const [f, setF] = useState(invoice ? { ...invoice, items: invoice.items.map(i => ({ ...i })) } : {
    id: 0, no: nextNo(), clientId: clients[0]?.id || 0, client: clients[0]?.company || "",
    date: todayISO, terms: "Net 15", due: addDaysISO(todayISO, 15),
    currency: "INR", discount: 0, status: "Draft", notes: "Thank you for your business.",
    items: [{ desc: "", qty: 1, rate: 0 }], payments: [],
  });

  const client = clients.find(x => x.id === Number(f.clientId));
  const t = invTotals(f);

  const setDateAndTerms = (date, terms) => {
    const days = TERMS[terms] ?? 15;
    setF(p => ({ ...p, date, terms, due: addDaysISO(date, days) }));
  };

  const setItem = (n, k, v) => {
    const items = f.items.map((it, i) => i === n ? { ...it, [k]: v } : it);
    setF({ ...f, items });
  };

  const label = { fontSize: 12.5, fontWeight: 500, color: c.inkSoft, display: "block", marginBottom: 6 };
  const input = {
    width: "100%", fontSize: 15, padding: "10px 12px", borderRadius: 10,
    border: `1px solid ${c.border}`, background: c.card, color: c.ink, outline: "none",
  };

  return (
    <div style={{ maxWidth: 1560, margin: "0 auto" }}>
      <div className="no-print" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14 }}>
          <button onClick={onCancel} style={{ color: c.inkSoft }}>Invoices</button>
          <ChevronRight size={15} color={c.muted} />
          <span style={{ fontWeight: 600 }}>{isNew ? "New Invoice" : f.no}</span>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={onCancel} style={{
            fontSize: 13.5, fontWeight: 600, padding: "10px 18px", borderRadius: 12,
            border: `1px solid ${c.border}`, background: c.card, color: c.ink,
          }}>Cancel</button>
          <PrimaryBtn onClick={() => onSave({ ...f, client: client?.company || f.client, clientId: Number(f.clientId) })}>
            Save Invoice
          </PrimaryBtn>
        </div>
      </div>

      <div className="dh-editor">
        <Card c={c} style={{ padding: 20 }}>
          <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 14 }}>Invoice details</div>

          <label style={label}>Client
            <select style={input} value={f.clientId}
              onChange={e => {
                const id = Number(e.target.value);
                const cl = clients.find(x => x.id === id);
                setF({ ...f, clientId: id, client: cl?.company || "" });
              }}>
              {clients.length === 0 && <option>Add a client first</option>}
              {clients.map(x => <option key={x.id} value={x.id}>{x.company}</option>)}
            </select>
          </label>

          {client && (
            <div style={{ background: dark ? "#141C2E" : "#F8FAFC", borderRadius: 10, padding: 12, fontSize: 12.5, color: c.inkSoft, marginBottom: 14 }}>
              {client.contact} · {client.email}<br />{client.address}
              {client.gstin && <><br />GSTIN: {client.gstin}</>}
            </div>
          )}

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <label style={label}>Invoice number<input style={input} value={f.no} onChange={e => setF({ ...f, no: e.target.value })} /></label>
            <label style={label}>Payment terms
              <select style={input} value={f.terms} onChange={e => setDateAndTerms(f.date, e.target.value)}>
                {Object.keys(TERMS).map(k => <option key={k}>{k}</option>)}
              </select>
            </label>
            <label style={label}>Invoice date
              <DateField c={c} value={f.date} onChange={(v) => setDateAndTerms(v, f.terms)} />
            </label>
            <label style={label}>Due date
              <DateField c={c} value={f.due} onChange={(v) => setF({ ...f, due: v })} />
            </label>
          </div>

          <div style={{ fontSize: 13, fontWeight: 700, margin: "16px 0 10px" }}>Items</div>
          {f.items.map((it, n) => (
            <div key={n} style={{ display: "flex", gap: 8, marginBottom: 8, alignItems: "center" }}>
              <input placeholder="Description" style={{ ...input, flex: 2, minWidth: 0 }} value={it.desc} onChange={e => setItem(n, "desc", e.target.value)} />
              <input type="number" style={{ ...input, width: 62 }} value={it.qty} onChange={e => setItem(n, "qty", Number(e.target.value))} />
              <input type="number" style={{ ...input, width: 96 }} value={it.rate} onChange={e => setItem(n, "rate", Number(e.target.value))} />
              <button onClick={() => setF({ ...f, items: f.items.filter((_, i) => i !== n) })}
                style={{ color: A.red, padding: 4 }} disabled={f.items.length === 1}><X size={16} /></button>
            </div>
          ))}
          <button onClick={() => setF({ ...f, items: [...f.items, { desc: "", qty: 1, rate: 0 }] })}
            style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, color: A.orange, marginBottom: 16 }}>
            <Plus size={14} /> Add line item
          </button>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <label style={label}>Currency
              <select style={input} value={f.currency || "INR"} onChange={e => setF({ ...f, currency: e.target.value })}>
                {Object.keys(CURRENCIES).map(k => <option key={k} value={k}>{CURRENCIES[k].label}</option>)}
              </select>
            </label>
            <label style={label}>Discount ({CURRENCIES[f.currency || "INR"].sym})
              <input type="number" style={input} value={f.discount} onChange={e => setF({ ...f, discount: Number(e.target.value) })} /></label>
          </div>

          <label style={label}>Notes
            <textarea rows={2} style={{ ...input, resize: "vertical" }} value={f.notes} onChange={e => setF({ ...f, notes: e.target.value })} />
          </label>

          <label style={label}>Status
            <select style={input} value={f.status} onChange={e => setF({ ...f, status: e.target.value })}>
              {INV_STATUSES.map(s => <option key={s}>{s}</option>)}
            </select>
          </label>

          <div style={{ borderTop: `1px solid ${c.border}`, marginTop: 8, paddingTop: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 17, fontWeight: 800 }}>
              <span>Grand Total</span><span>{money(t.total, f.currency)}</span>
            </div>
          </div>
        </Card>

        <InvoiceDoc c={c} dark={dark} inv={f} client={client} />
      </div>
    </div>
  );
}

/* ----------------------------- payment modal ----------------------------- */

function PaymentModal({ c, inv, onClose, onSave }) {
  const t = invTotals(inv);
  const cur = inv.currency || "INR";
  const m = (n) => money(n, cur);
  const [f, setF] = useState({
    amt: t.due, date: new Date().toISOString().slice(0, 10),
    method: "Bank Transfer", ref: "", note: "",
  });

  const label = { fontSize: 12.5, fontWeight: 500, color: c.inkSoft, display: "block", marginBottom: 6 };
  const input = {
    width: "100%", fontSize: 15, padding: "10px 12px", borderRadius: 10,
    border: `1px solid ${c.border}`, background: c.card, color: c.ink, outline: "none",
  };

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 50, background: "rgba(15,23,42,.45)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div onClick={e => e.stopPropagation()} style={{ background: c.card, borderRadius: 18, width: "100%", maxWidth: 440, maxHeight: "88vh", overflowY: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 22px", borderBottom: `1px solid ${c.border}` }}>
          <div style={{ fontSize: 18, fontWeight: 700 }}>Record Payment</div>
          <button onClick={onClose} style={{ color: c.muted }}><X size={19} /></button>
        </div>
        <div style={{ padding: 22 }}>
          <div style={{ background: c.bg, borderRadius: 12, padding: 14, marginBottom: 16, fontSize: 13.5 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
              <span style={{ color: c.inkSoft }}>{inv.no} total</span><b>{m(t.total)}</b>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: c.inkSoft }}>Balance due</span><b style={{ color: A.red }}>{m(t.due)}</b>
            </div>
          </div>

          <label style={label}>Amount received ({CURRENCIES[cur].sym})
            <input type="number" style={input} value={f.amt} onChange={e => setF({ ...f, amt: Number(e.target.value) })} /></label>
          <label style={label}>Payment date
            <DateField c={c} value={f.date} onChange={(v) => setF({ ...f, date: v })} /></label>
          <label style={label}>Payment method
            <select style={input} value={f.method} onChange={e => setF({ ...f, method: e.target.value })}>
              {["Bank Transfer", "UPI", "Cash", "Cheque", "Card", "Other"].map(m => <option key={m}>{m}</option>)}
            </select></label>
          <label style={label}>Transaction ID / Reference
            <input style={input} value={f.ref} onChange={e => setF({ ...f, ref: e.target.value })} /></label>
          <label style={label}>Notes (optional)
            <textarea rows={2} style={{ ...input, resize: "vertical" }} value={f.note} onChange={e => setF({ ...f, note: e.target.value })} /></label>

          <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
            <button onClick={onClose} style={{ flex: 1, padding: 12, borderRadius: 12, border: `1px solid ${c.border}`, background: c.card, color: c.ink, fontSize: 14, fontWeight: 600 }}>Cancel</button>
            <button onClick={() => f.amt > 0 && onSave(f)}
              style={{ flex: 1, padding: 12, borderRadius: 12, background: A.orange, color: "#fff", fontSize: 14, fontWeight: 600 }}>
              Save payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------- employees ------------------------------- */

const AVATAR_TONES = [
  [A.indigoSoft, A.indigo], [A.greenSoft, A.green], [A.amberSoft, A.amber],
  [A.purpleSoft, A.purple], [A.blueSoft, A.blue], [A.redSoft, A.red],
];

function Avatar({ name, size = 38 }) {
  const hash = (name || "?").split("").reduce((a, ch) => a + ch.charCodeAt(0), 0);
  const [bg, fg] = AVATAR_TONES[hash % AVATAR_TONES.length];
  return (
    <div style={{
      width: size, height: size, minWidth: size, borderRadius: "50%", flexShrink: 0,
      background: bg, color: fg,
      display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: size * 0.4,
    }}>{(name || "?")[0].toUpperCase()}</div>
  );
}

function EmployeesPage({ c, dark, employees, onOpen, onNew }) {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("All");

  const rows = employees.filter(e => {
    const hit = [e.name, e.email, e.role, e.dept].join(" ").toLowerCase().includes(q.toLowerCase());
    return hit && (status === "All" || e.status === status);
  });

  const selectStyle = {
    fontSize: 13.5, fontWeight: 500, padding: "10px 12px", borderRadius: 12,
    border: `1px solid ${c.border}`, background: c.card, color: c.ink, outline: "none",
  };

  return (
    <div style={{ maxWidth: 1560, margin: "0 auto" }}>
      <PageHead c={c} title="Employees" sub="Manage your team members and their details."
        action={<PrimaryBtn onClick={onNew}><Plus size={17} /> Add Employee</PrimaryBtn>} />

      <div className="dh-toolbar">
        <SearchBox c={c} placeholder="Search employees..." value={q} onChange={setQ} />
        <select value={status} onChange={e => setStatus(e.target.value)} style={selectStyle}>
          {["All", "Active", "Inactive"].map(s => <option key={s}>{s}</option>)}
        </select>
      </div>

      <Card c={c} style={{ overflow: "hidden" }}>
        {rows.length === 0 ? (
          <Blank c={c} Icon={Users} title="No employees" sub="Add your team to start generating salary slips." />
        ) : (
          <>
            <table className="dh-table" style={{ borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${c.border}` }}>
                  <Th c={c}>Employee</Th><Th c={c}>Role</Th><Th c={c}>Department</Th>
                  <Th c={c} align="right">Salary</Th><Th c={c}>Status</Th><Th c={c}>Join Date</Th>
                  <Th c={c} align="right">Action</Th>
                </tr>
              </thead>
              <tbody>
                {rows.map(e => (
                  <tr key={e.id} onClick={() => onOpen(e)} style={{ borderBottom: `1px solid ${c.border}`, cursor: "pointer" }}>
                    <td style={{ padding: "14px 20px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <Avatar name={e.name} />
                        <div>
                          <div style={{ fontSize: 14, fontWeight: 600 }}>{e.name}</div>
                          <div style={{ fontSize: 12, color: c.muted, marginTop: 2 }}>{e.email}</div>
                        </div>
                      </div>
                    </td>
                    <Td c={c} color={c.inkSoft}>{e.role}</Td>
                    <Td c={c} color={c.inkSoft}>{e.dept}</Td>
                    <Td c={c} align="right" bold>{inr(e.salary)}</Td>
                    <Td c={c}><StatusPill status={e.status} /></Td>
                    <Td c={c} color={c.inkSoft}>{fmtDate(e.joinDate)}</Td>
                    <Td c={c} align="right">
                      <span style={{ display: "inline-flex", gap: 14, color: c.muted }}>
                        <Pencil size={16} /><MoreHorizontal size={17} />
                      </span>
                    </Td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="dh-cards">
              {rows.map(e => (
                <button key={e.id} onClick={() => onOpen(e)}
                  style={{ width: "100%", textAlign: "left", padding: 16, borderBottom: `1px solid ${c.border}`, display: "flex", gap: 12, alignItems: "center" }}>
                  <Avatar name={e.name} size={42} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                      <span style={{ fontSize: 14.5, fontWeight: 600 }}>{e.name}</span>
                      <StatusPill status={e.status} />
                    </div>
                    <div style={{ fontSize: 12.5, color: c.muted, marginTop: 3 }}>{e.role} · {e.dept}</div>
                    <div style={{ fontSize: 13.5, fontWeight: 600, marginTop: 5 }}>{inr(e.salary)}<span style={{ fontSize: 12, fontWeight: 400, color: c.muted }}>/mo</span></div>
                  </div>
                </button>
              ))}
            </div>

            <div style={{ padding: "14px 20px", fontSize: 13, color: c.muted, borderTop: `1px solid ${c.border}` }}>
              Showing 1 to {rows.length} of {rows.length} employees
            </div>
          </>
        )}
      </Card>
    </div>
  );
}

const EMP_TABS = ["Overview", "Salary History", "Salary Slips", "Documents", "Notes"];

function EmployeeProfile({ c, dark, emp, payroll, onBack, onOpenSlip, onEdit }) {
  const [tab, setTab] = useState("Overview");
  const slips = payroll.filter(r => r.empId === emp.id).sort((a, b) => (b.year * 12 + b.month) - (a.year * 12 + a.month));

  return (
    <div style={{ maxWidth: 1560, margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14 }}>
          <button onClick={onBack} style={{ color: c.inkSoft }}>Employees</button>
          <ChevronRight size={15} color={c.muted} />
          <span style={{ fontWeight: 600 }}>{emp.name}</span>
        </div>
        <button onClick={onEdit} style={{
          display: "flex", alignItems: "center", gap: 8, fontSize: 13.5, fontWeight: 600,
          padding: "10px 16px", borderRadius: 12, border: `1px solid ${c.border}`, background: c.card, color: c.ink,
        }}><Pencil size={15} /> Edit Employee</button>
      </div>

      <div className="dh-profile">
        <Card c={c} style={{ padding: 24, alignSelf: "start" }}>
          <div style={{ textAlign: "center", marginBottom: 18 }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 14 }}>
              <Avatar name={emp.name} size={84} />
            </div>
            <div style={{ fontSize: 19, fontWeight: 700 }}>{emp.name}</div>
            <div style={{ fontSize: 13, color: c.inkSoft, marginTop: 3 }}>{emp.role}</div>
            <div style={{ marginTop: 8 }}><StatusPill status={emp.status} /></div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13.5, color: c.inkSoft, marginBottom: 10 }}>
            <Mail size={16} color={c.muted} /> <span style={{ wordBreak: "break-all" }}>{emp.email}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13.5, color: c.inkSoft, paddingBottom: 18, borderBottom: `1px solid ${c.border}` }}>
            <Phone size={16} color={c.muted} /> {emp.phone}
          </div>
          {[["Department", emp.dept], ["Joined", fmtDate(emp.joinDate)],
            ["Current Salary", inr(emp.salary) + " / month"], ["Salary Date", `${emp.payDate}th of month`],
            ["Bank", emp.bank || "—"]].map(([l, v]) => (
            <div key={l} style={{ padding: "14px 0", borderBottom: `1px solid ${c.border}` }}>
              <div style={{ fontSize: 12.5, color: c.muted }}>{l}</div>
              <div style={{ fontSize: 15, fontWeight: 600, marginTop: 3 }}>{v}</div>
            </div>
          ))}
        </Card>

        <div>
          <Card c={c} style={{ padding: "0 16px", marginBottom: 16 }}>
            <div className="dh-tabs">
              {EMP_TABS.map(t => {
                const on = tab === t;
                return (
                  <button key={t} onClick={() => setTab(t)}
                    style={{
                      padding: "16px 14px", fontSize: 14, fontWeight: on ? 600 : 500,
                      color: on ? A.orange : c.inkSoft, whiteSpace: "nowrap",
                      borderBottom: on ? `2px solid ${A.orange}` : "2px solid transparent",
                    }}>{t}</button>
                );
              })}
            </div>
          </Card>

          {tab === "Overview" && (
            <>
              <Card c={c} style={{ padding: 20, marginBottom: 16 }}>
                <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 14 }}>Employment Summary</div>
                <div className="dh-fin3">
                  {[
                    { l: "Monthly Salary", v: inr(emp.salary), Icon: Wallet, tone: "green" },
                    { l: "Slips Generated", v: slips.length, Icon: FileText, tone: "indigo" },
                    { l: "Pending This Month", v: slips.filter(r => r.status === "Pending").length, Icon: Clock, tone: "amber" },
                  ].map(f => (
                    <div key={f.l} style={{ display: "flex", alignItems: "center", gap: 12, padding: 16, borderRadius: 14, border: `1px solid ${c.border}` }}>
                      <IconTile Icon={f.Icon} tone={f.tone} size={40} />
                      <div>
                        <div style={{ fontSize: 12.5, color: c.inkSoft }}>{f.l}</div>
                        <div style={{ fontSize: 20, fontWeight: 700, marginTop: 2 }}>{f.v}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card c={c} style={{ padding: 20 }}>
                <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>Details</div>
                {[["Role", emp.role], ["Department", emp.dept], ["Salary type", emp.salaryType],
                  ["Address", emp.address], ["Status", emp.status]].map(([l, v]) => (
                  <div key={l} style={{ display: "flex", gap: 14, padding: "9px 0", fontSize: 13.5 }}>
                    <div style={{ width: 130, color: c.inkSoft, flexShrink: 0 }}>{l}</div>
                    <div>{v || "—"}</div>
                  </div>
                ))}
              </Card>
            </>
          )}

          {tab === "Salary History" && (
            <Card c={c} style={{ padding: 20 }}>
              <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>Salary History</div>
              {emp.history.map((h, n) => (
                <div key={n} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: `1px solid ${c.border}` }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{inr(h.amt)} / month</div>
                    <div style={{ fontSize: 12.5, color: c.muted, marginTop: 2 }}>Effective from {h.from}</div>
                  </div>
                  {n === 0 && <span style={{ background: A.greenSoft, color: A.green, fontSize: 11.5, fontWeight: 600, padding: "4px 10px", borderRadius: 999 }}>Current</span>}
                </div>
              ))}
            </Card>
          )}

          {tab === "Salary Slips" && (
            <Card c={c} style={{ padding: 20 }}>
              <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>Salary Slips</div>
              {slips.length === 0 ? (
                <Blank c={c} Icon={FileText} title="No slips yet" sub="Generate one from the Salary page." />
              ) : slips.map(r => (
                <button key={r.id} onClick={() => onOpenSlip(r)}
                  style={{ width: "100%", display: "flex", alignItems: "center", gap: 14, padding: "13px 0", borderBottom: `1px solid ${c.border}`, textAlign: "left" }}>
                  <IconTile Icon={FileText} tone="indigo" size={38} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{MONTHS[r.month - 1]} {r.year}</div>
                    <div style={{ fontSize: 12, color: c.muted, marginTop: 2 }}>{slipNo(r)}</div>
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{inr(payNet(r))}</div>
                  <span style={{ ...invPillStyle(r.status === "Paid" ? "Paid" : "Pending") }}>{r.status}</span>
                </button>
              ))}
            </Card>
          )}

          {tab === "Documents" && (
            <Card c={c} style={{ padding: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, gap: 10, flexWrap: "wrap" }}>
                <div style={{ fontSize: 16, fontWeight: 700 }}>Documents</div>
                <PrimaryBtn><Upload size={16} /> Upload Document</PrimaryBtn>
              </div>
              {emp.documents.length === 0 ? (
                <Blank c={c} Icon={FolderClosed} title="No documents yet" sub="Offer letter, ID proof, agreements." />
              ) : emp.documents.map(d => (
                <div key={d.name} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 0", borderBottom: `1px solid ${c.border}` }}>
                  <IconTile Icon={FileText} tone="red" size={38} />
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{d.name}</div>
                    <div style={{ fontSize: 12, color: c.muted, marginTop: 2 }}>{d.size} · {d.date}</div>
                  </div>
                  <span style={{ background: A.indigoSoft, color: A.indigo, fontSize: 11.5, fontWeight: 600, padding: "4px 10px", borderRadius: 999 }}>{d.cat}</span>
                  <button style={{ color: c.muted }}><Download size={17} /></button>
                </div>
              ))}
            </Card>
          )}

          {tab === "Notes" && (
            <Card c={c} style={{ padding: 20 }}>
              <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>Notes</div>
              <textarea placeholder="Write a note about this employee..."
                style={{ width: "100%", minHeight: 90, borderRadius: 12, border: `1px solid ${c.border}`, background: c.card, color: c.ink, padding: 14, fontSize: 14, outline: "none", resize: "vertical" }} />
              <div style={{ display: "flex", justifyContent: "flex-end", margin: "12px 0 18px" }}>
                <PrimaryBtn><Plus size={16} /> Add Note</PrimaryBtn>
              </div>
              {emp.notes ? (
                <div style={{ padding: 16, borderRadius: 12, border: `1px solid ${c.border}`, fontSize: 13.5, lineHeight: 1.6 }}>{emp.notes}</div>
              ) : <Blank c={c} Icon={FileText} title="No notes yet" sub="Keep track of anything important." />}
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

function EmployeeForm({ c, onClose, onSave, initial }) {
  const [f, setF] = useState(initial || {
    name: "", email: "", phone: "", role: "", dept: DEPTS[0], salary: "",
    status: "Active", joinDate: new Date().toISOString().slice(0, 10),
    salaryType: "Monthly", payDate: 20, address: "", bank: "",
  });
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const label = { fontSize: 12.5, fontWeight: 500, color: c.inkSoft, display: "block", marginBottom: 6 };
  const input = { width: "100%", fontSize: 15, padding: "10px 12px", borderRadius: 10, border: `1px solid ${c.border}`, background: c.card, color: c.ink, outline: "none" };
  const section = { fontSize: 13, fontWeight: 700, margin: "18px 0 12px" };

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 50, background: "rgba(15,23,42,.45)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div onClick={e => e.stopPropagation()} style={{ background: c.card, borderRadius: 18, width: "100%", maxWidth: 520, maxHeight: "88vh", overflowY: "auto" }}>
        <div style={{ position: "sticky", top: 0, background: c.card, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 22px", borderBottom: `1px solid ${c.border}` }}>
          <div style={{ fontSize: 18, fontWeight: 700 }}>{initial ? "Edit Employee" : "Add Employee"}</div>
          <button onClick={onClose} style={{ color: c.muted }}><X size={19} /></button>
        </div>
        <div style={{ padding: 22 }}>
          <div style={{ ...section, marginTop: 0 }}>Personal</div>
          <label style={label}>Full name<input style={input} value={f.name} onChange={set("name")} /></label>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <label style={label}>Email<input style={input} value={f.email} onChange={set("email")} /></label>
            <label style={label}>Phone<input style={input} value={f.phone} onChange={set("phone")} /></label>
          </div>
          <label style={label}>Address<input style={input} value={f.address} onChange={set("address")} /></label>

          <div style={section}>Employment</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <label style={label}>Role<input style={input} value={f.role} onChange={set("role")} /></label>
            <label style={label}>Department
              <select style={input} value={f.dept} onChange={set("dept")}>{DEPTS.map(d => <option key={d}>{d}</option>)}</select>
            </label>
            <label style={label}>Joining date<DateField c={c} value={f.joinDate} onChange={(v) => setF({ ...f, joinDate: v })} /></label>
            <label style={label}>Status
              <select style={input} value={f.status} onChange={set("status")}>{["Active", "Inactive"].map(x => <option key={x}>{x}</option>)}</select>
            </label>
          </div>

          <div style={section}>Salary</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <label style={label}>Monthly salary (₹)<input type="number" style={input} value={f.salary} onChange={set("salary")} /></label>
            <label style={label}>Salary type
              <select style={input} value={f.salaryType} onChange={set("salaryType")}>{["Monthly", "Hourly", "Contract"].map(x => <option key={x}>{x}</option>)}</select>
            </label>
            <label style={label}>Payment date (day)<input type="number" style={input} value={f.payDate} onChange={set("payDate")} /></label>
            <label style={label}>Bank (optional)<input style={input} value={f.bank} onChange={set("bank")} /></label>
          </div>

          <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
            <button onClick={onClose} style={{ flex: 1, padding: 12, borderRadius: 12, border: `1px solid ${c.border}`, background: c.card, color: c.ink, fontSize: 14, fontWeight: 600 }}>Cancel</button>
            <button onClick={() => f.name && onSave({ ...f, salary: Number(f.salary) || 0 })}
              style={{ flex: 1, padding: 12, borderRadius: 12, background: A.orange, color: "#fff", fontSize: 14, fontWeight: 600 }}>
              {initial ? "Save changes" : "Save employee"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* --------------------------------- salary -------------------------------- */

function SalaryPage({ c, dark, employees, payroll, month, year, setMonth, setYear, onOpenSlip, onGenerate, onNewSlip }) {
  const active = employees.filter(e => e.status === "Active");
  const rows = active.map(e => {
    const rec = payroll.find(r => r.empId === e.id && r.month === month && r.year === year);
    return { emp: e, rec };
  });

  const totalPayroll = rows.reduce((a, r) => a + (r.rec ? payNet(r.rec) : r.emp.salary), 0);
  const paidTotal = rows.filter(r => r.rec?.status === "Paid").reduce((a, r) => a + payNet(r.rec), 0);
  const pendingCount = rows.filter(r => !r.rec || r.rec.status !== "Paid").length;

  const selectStyle = { fontSize: 13.5, fontWeight: 500, padding: "10px 12px", borderRadius: 12, border: `1px solid ${c.border}`, background: c.card, color: c.ink, outline: "none" };

  const stats = [
    { label: "Total Payroll", val: inr(totalPayroll), sub: `${active.length} active employees`, Icon: Wallet, tone: "indigo", subColor: c.muted },
    { label: "Paid", val: inr(paidTotal), sub: `${rows.filter(r => r.rec?.status === "Paid").length} employees`, Icon: CheckCircle2, tone: "green", subColor: A.green },
    { label: "Pending", val: inr(totalPayroll - paidTotal), sub: `${pendingCount} employees`, Icon: Clock, tone: "amber", subColor: A.amber },
  ];

  return (
    <div style={{ maxWidth: 1560, margin: "0 auto" }}>
      <PageHead c={c} title="Salary" sub="Run monthly payroll and generate salary slips."
        action={
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <select value={month} onChange={e => setMonth(Number(e.target.value))} style={selectStyle}>
              {MONTHS.map((m, i) => <option key={m} value={i + 1}>{m}</option>)}
            </select>
            <select value={year} onChange={e => setYear(Number(e.target.value))} style={selectStyle}>
              {[2025, 2026, 2027].map(y => <option key={y} value={y}>{y}</option>)}
            </select>
            <PrimaryBtn onClick={onNewSlip}><Plus size={17} /> New Salary Slip</PrimaryBtn>
          </div>
        } />

      <div className="dh-fin3" style={{ marginBottom: 16 }}>
        {stats.map(s => (
          <Card key={s.label} c={c} className="kpi-card">
            <div className="kpi-head">
              <IconTile Icon={s.Icon} tone={s.tone} className="kpi-tile" />
              <div className="kpi-body">
                <FitText text={s.label} className="kpi-label font-medium" style={{ color: c.inkSoft }} />
                <FitText text={s.val} className="kpi-value font-bold tracking-tight" />
              </div>
            </div>
            <div className="kpi-note font-medium" style={{ color: s.subColor }}>{s.sub}</div>
          </Card>
        ))}
      </div>

      <Card c={c} style={{ overflow: "hidden" }}>
        <div style={{ padding: "16px 20px", borderBottom: `1px solid ${c.border}`, fontSize: 16, fontWeight: 700 }}>
          Payroll — {MONTHS[month - 1]} {year}
        </div>

        {rows.length === 0 ? (
          <Blank c={c} Icon={Users} title="No active employees" sub="Add employees to run payroll." />
        ) : (
          <>
            <table className="dh-table" style={{ borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${c.border}` }}>
                  <Th c={c}>Employee</Th>
                  <Th c={c} align="right">Salary</Th><Th c={c} align="right">Bonus</Th>
                  <Th c={c} align="right">Deduction</Th><Th c={c} align="right">Net Salary</Th>
                  <Th c={c}>Status</Th><Th c={c} align="right">Action</Th>
                </tr>
              </thead>
              <tbody>
                {rows.map(({ emp, rec }) => {
                  const r = rec || { empId: emp.id, month, year, basic: emp.salary, bonus: 0, deductions: 0, status: "Pending" };
                  return (
                    <tr key={emp.id} style={{ borderBottom: `1px solid ${c.border}` }}>
                      <td style={{ padding: "14px 20px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                          <Avatar name={emp.name} size={34} />
                          <div>
                            <div style={{ fontSize: 14, fontWeight: 600 }}>{emp.name}</div>
                            <div style={{ fontSize: 12, color: c.muted, marginTop: 2 }}>{emp.role}</div>
                          </div>
                        </div>
                      </td>
                      <Td c={c} align="right">{inr(r.basic)}</Td>
                      <Td c={c} align="right" color={r.bonus ? A.green : c.muted}>{r.bonus ? "+ " + inr(r.bonus) : "—"}</Td>
                      <Td c={c} align="right" color={r.deductions ? A.red : c.muted}>{r.deductions ? "– " + inr(r.deductions) : "—"}</Td>
                      <Td c={c} align="right" bold>{inr(payNet(r))}</Td>
                      <Td c={c}><span style={invPillStyle(r.status === "Paid" ? "Paid" : "Pending")}>{r.status}</span></Td>
                      <Td c={c} align="right">
                        <button onClick={() => rec ? onOpenSlip(rec) : onGenerate(emp)}
                          style={{ fontSize: 12.5, fontWeight: 600, color: A.indigo, whiteSpace: "nowrap" }}>
                          {rec ? "View slip" : "Generate slip"}
                        </button>
                      </Td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div className="dh-cards">
              {rows.map(({ emp, rec }) => {
                const r = rec || { empId: emp.id, month, year, basic: emp.salary, bonus: 0, deductions: 0, status: "Pending" };
                return (
                  <div key={emp.id} style={{ padding: 16, borderBottom: `1px solid ${c.border}` }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                      <Avatar name={emp.name} size={38} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 14.5, fontWeight: 600 }}>{emp.name}</div>
                        <div style={{ fontSize: 12, color: c.muted }}>{emp.role}</div>
                      </div>
                      <span style={invPillStyle(r.status === "Paid" ? "Paid" : "Pending")}>{r.status}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ fontSize: 16, fontWeight: 700 }}>{inr(payNet(r))}</div>
                      <button onClick={() => rec ? onOpenSlip(rec) : onGenerate(emp)}
                        style={{ fontSize: 12.5, fontWeight: 600, color: A.indigo }}>
                        {rec ? "View slip" : "Generate slip"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", padding: "16px 20px", borderTop: `1px solid ${c.border}` }}>
              <span style={{ fontSize: 15, fontWeight: 700, color: A.orange }}>Total Payroll</span>
              <span style={{ fontSize: 18, fontWeight: 800, color: A.orange }}>{inr(totalPayroll)}</span>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}

/* ------------------------------ salary slip ------------------------------ */

function SlipDoc({ c, rec, emp }) {
  const net = payNet(rec);
  const line = { display: "flex", justifyContent: "space-between", padding: "8px 0", fontSize: 13.5 };
  return (
    <div className="print-area" style={{ background: "#fff", color: "#0F172A", borderRadius: 16, border: `1px solid ${c.border}`, padding: 28 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, flexWrap: "wrap" }}>
        <div>
          <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-0.02em" }}>{COMPANY.name}</div>
          <div style={{ fontSize: 11.5, color: "#64748B", marginTop: 3 }}>{COMPANY.address}</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-0.02em" }}>SALARY SLIP</div>
          <div style={{ fontSize: 13, fontWeight: 600, marginTop: 2 }}>{MONTHS[rec.month - 1]} {rec.year}</div>
          <div style={{ fontSize: 11.5, color: "#64748B", marginTop: 2 }}>{slipNo(rec)}</div>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", gap: 20, flexWrap: "wrap", margin: "26px 0 14px" }}>
        <div>
          <div style={{ fontSize: 10, letterSpacing: ".12em", textTransform: "uppercase", color: "#94A3B8", marginBottom: 6 }}>Employee</div>
          <div style={{ fontSize: 15, fontWeight: 700 }}>{emp?.name}</div>
          <div style={{ fontSize: 12.5, color: "#64748B", marginTop: 2 }}>{emp?.role} · {emp?.dept}</div>
          {emp?.bank && <div style={{ fontSize: 12.5, color: "#64748B" }}>Bank: {emp.bank}</div>}
        </div>
        <div style={{ fontSize: 12.5, color: "#64748B", textAlign: "right" }}>
          <div>Salary period: <b style={{ color: "#0F172A" }}>{MONTHS[rec.month - 1]} {rec.year}</b></div>
          <div>Payment status: <b style={{ color: rec.status === "Paid" ? "#16A34A" : "#EA8C0C" }}>{rec.status}</b></div>
          {rec.paidOn && <div>Payment date: <b style={{ color: "#0F172A" }}>{fmtDate(rec.paidOn)}</b></div>}
        </div>
      </div>

      <div style={{ borderTop: "1px solid #E2E8F0", marginTop: 14, paddingTop: 10 }}>
        <div style={line}><span style={{ color: "#64748B" }}>Basic salary</span><span>{inr(rec.basic)}</span></div>
        <div style={line}><span style={{ color: "#64748B" }}>Bonus</span><span>{rec.bonus ? "+ " + inr(rec.bonus) : inr(0)}</span></div>
        <div style={line}><span style={{ color: "#64748B" }}>Deductions</span><span>{rec.deductions ? "– " + inr(rec.deductions) : inr(0)}</span></div>
        <div style={{ ...line, borderTop: "1px solid #E2E8F0", marginTop: 8, paddingTop: 14, fontSize: 17, fontWeight: 800 }}>
          <span>Net Salary</span><span>{inr(net)}</span>
        </div>
      </div>

      <div style={{ marginTop: 24, paddingTop: 16, borderTop: "1px solid #E2E8F0", fontSize: 11.5, color: "#64748B" }}>
        This is a computer-generated salary slip and does not require a signature.<br />
        {COMPANY.email} · {COMPANY.phone}
      </div>
    </div>
  );
}

function SlipView({ c, dark, rec, emp, onBack, onSave, onMarkPaid }) {
  const [f, setF] = useState({ ...rec });
  const label = { fontSize: 12.5, fontWeight: 500, color: c.inkSoft, display: "block", marginBottom: 6 };
  const input = { width: "100%", fontSize: 15, padding: "10px 12px", borderRadius: 10, border: `1px solid ${c.border}`, background: c.card, color: c.ink, outline: "none" };

  return (
    <div style={{ maxWidth: 1560, margin: "0 auto" }}>
      <div className="no-print" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14 }}>
          <button onClick={onBack} style={{ color: c.inkSoft }}>Salary</button>
          <ChevronRight size={15} color={c.muted} />
          <span style={{ fontWeight: 600 }}>{emp?.name} · {MONTHS[f.month - 1]} {f.year}</span>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button onClick={() => window.print()} style={{
            display: "flex", alignItems: "center", gap: 8, fontSize: 13.5, fontWeight: 600,
            padding: "10px 16px", borderRadius: 12, border: `1px solid ${c.border}`, background: c.card, color: c.ink,
          }}><Download size={15} /> Download PDF</button>
          {f.status !== "Paid" && <PrimaryBtn onClick={() => onMarkPaid(f)}><CheckCircle2 size={16} /> Mark as Paid</PrimaryBtn>}
        </div>
      </div>

      <div className="dh-editor">
        <SlipDoc c={c} rec={f} emp={emp} />

        <div className="no-print">
          <Card c={c} style={{ padding: 20 }}>
            <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 14 }}>Adjust this month</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <label style={label}>Basic salary (₹)
                <input type="number" style={input} value={f.basic} onChange={e => setF({ ...f, basic: Number(e.target.value) })} /></label>
              <label style={label}>Bonus (₹)
                <input type="number" style={input} value={f.bonus} onChange={e => setF({ ...f, bonus: Number(e.target.value) })} /></label>
            </div>
            <label style={label}>Deductions (₹)
              <input type="number" style={input} value={f.deductions} onChange={e => setF({ ...f, deductions: Number(e.target.value) })} /></label>
            <div style={{ fontSize: 12, color: c.muted, marginTop: -6, marginBottom: 14 }}>
              Advance, leave or other adjustments for this month only.
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderTop: `1px solid ${c.border}`, fontSize: 16, fontWeight: 800 }}>
              <span>Net Salary</span><span>{inr(payNet(f))}</span>
            </div>

            <button onClick={() => onSave(f)}
              style={{ width: "100%", marginTop: 12, padding: 12, borderRadius: 12, background: A.orange, color: "#fff", fontSize: 14, fontWeight: 600 }}>
              Save changes
            </button>

            {f.status === "Paid" && (
              <div style={{ marginTop: 16, padding: 14, borderRadius: 12, background: dark ? "#0F2A1E" : A.greenSoft }}>
                <div style={{ fontSize: 13.5, fontWeight: 700, color: A.green }}>Paid on {fmtDate(f.paidOn)}</div>
                <div style={{ fontSize: 12.5, color: A.green, marginTop: 3 }}>{f.method}{f.ref ? ` · ${f.ref}` : ""}</div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}

function SalaryPayModal({ c, rec, emp, onClose, onSave }) {
  const [f, setF] = useState({ paidOn: new Date().toISOString().slice(0, 10), method: "Bank Transfer", ref: "" });
  const label = { fontSize: 12.5, fontWeight: 500, color: c.inkSoft, display: "block", marginBottom: 6 };
  const input = { width: "100%", fontSize: 15, padding: "10px 12px", borderRadius: 10, border: `1px solid ${c.border}`, background: c.card, color: c.ink, outline: "none" };

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 50, background: "rgba(15,23,42,.45)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div onClick={e => e.stopPropagation()} style={{ background: c.card, borderRadius: 18, width: "100%", maxWidth: 420 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 22px", borderBottom: `1px solid ${c.border}` }}>
          <div style={{ fontSize: 18, fontWeight: 700 }}>Mark salary as paid</div>
          <button onClick={onClose} style={{ color: c.muted }}><X size={19} /></button>
        </div>
        <div style={{ padding: 22 }}>
          <div style={{ background: c.bg, borderRadius: 12, padding: 14, marginBottom: 16, fontSize: 13.5 }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: c.inkSoft }}>{emp?.name}</span><b>{inr(payNet(rec))}</b>
            </div>
          </div>
          <label style={label}>Payment date<DateField c={c} value={f.paidOn} onChange={(v) => setF({ ...f, paidOn: v })} /></label>
          <label style={label}>Method
            <select style={input} value={f.method} onChange={e => setF({ ...f, method: e.target.value })}>
              {["Bank Transfer", "UPI", "Cash", "Cheque"].map(m => <option key={m}>{m}</option>)}
            </select></label>
          <label style={label}>Reference<input style={input} value={f.ref} onChange={e => setF({ ...f, ref: e.target.value })} /></label>
          <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
            <button onClick={onClose} style={{ flex: 1, padding: 12, borderRadius: 12, border: `1px solid ${c.border}`, background: c.card, color: c.ink, fontSize: 14, fontWeight: 600 }}>Cancel</button>
            <button onClick={() => onSave(f)} style={{ flex: 1, padding: 12, borderRadius: 12, background: A.orange, color: "#fff", fontSize: 14, fontWeight: 600 }}>Confirm paid</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* --------------------------- new salary slip ---------------------------- */

function NewSlipModal({ c, employees, payroll, defMonth, defYear, onClose, onCreate, onOpenExisting }) {
  const [f, setF] = useState({
    empId: employees[0]?.id || 0, month: defMonth, year: defYear,
    basic: employees[0]?.salary || 0, bonus: 0, deductions: 0,
  });
  const emp = employees.find(e => e.id === Number(f.empId));

  const existing = payroll.find(r =>
    r.empId === Number(f.empId) && r.month === Number(f.month) && r.year === Number(f.year));

  const net = (Number(f.basic) || 0) + (Number(f.bonus) || 0) - (Number(f.deductions) || 0);

  const label = { fontSize: 12.5, fontWeight: 500, color: c.inkSoft, display: "block", marginBottom: 6 };
  const input = { width: "100%", fontSize: 15, padding: "10px 12px", borderRadius: 10, border: `1px solid ${c.border}`, background: c.card, color: c.ink, outline: "none" };

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 50, background: "rgba(15,23,42,.45)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div onClick={e => e.stopPropagation()} style={{ background: c.card, borderRadius: 18, width: "100%", maxWidth: 480, maxHeight: "88vh", overflowY: "auto" }}>
        <div style={{ position: "sticky", top: 0, background: c.card, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 22px", borderBottom: `1px solid ${c.border}` }}>
          <div style={{ fontSize: 18, fontWeight: 700 }}>New Salary Slip</div>
          <button onClick={onClose} style={{ color: c.muted }}><X size={19} /></button>
        </div>

        <div style={{ padding: 22 }}>
          <label style={label}>Employee
            <select style={input} value={f.empId}
              onChange={e => {
                const id = Number(e.target.value);
                const em = employees.find(x => x.id === id);
                setF({ ...f, empId: id, basic: em?.salary || 0 });
              }}>
              {employees.length === 0 && <option>Add an employee first</option>}
              {employees.map(e => (
                <option key={e.id} value={e.id}>{e.name} — {e.role}{e.status === "Inactive" ? " (Inactive)" : ""}</option>
              ))}
            </select>
          </label>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <label style={label}>Month
              <select style={input} value={f.month} onChange={e => setF({ ...f, month: Number(e.target.value) })}>
                {MONTHS.map((m, i) => <option key={m} value={i + 1}>{m}</option>)}
              </select>
            </label>
            <label style={label}>Year
              <select style={input} value={f.year} onChange={e => setF({ ...f, year: Number(e.target.value) })}>
                {[2025, 2026, 2027].map(y => <option key={y} value={y}>{y}</option>)}
              </select>
            </label>
          </div>

          {existing ? (
            <div style={{ background: A.amberSoft, borderRadius: 12, padding: 14, marginTop: 4 }}>
              <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <AlertTriangle size={17} color={A.amber} style={{ marginTop: 1, flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: 13.5, fontWeight: 700, color: A.amber }}>
                    Slip already exists for {MONTHS[f.month - 1]} {f.year}
                  </div>
                  <div style={{ fontSize: 12.5, color: A.amber, marginTop: 3 }}>
                    {emp?.name} · {inr(payNet(existing))} · {existing.status}
                  </div>
                  <button onClick={() => onOpenExisting(existing)}
                    style={{ fontSize: 12.5, fontWeight: 700, color: A.amber, textDecoration: "underline", marginTop: 8 }}>
                    Open that slip instead
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <label style={label}>Basic salary (₹)
                  <input type="number" style={input} value={f.basic} onChange={e => setF({ ...f, basic: Number(e.target.value) })} /></label>
                <label style={label}>Bonus (₹)
                  <input type="number" style={input} value={f.bonus} onChange={e => setF({ ...f, bonus: Number(e.target.value) })} /></label>
              </div>
              <label style={label}>Deductions (₹)
                <input type="number" style={input} value={f.deductions} onChange={e => setF({ ...f, deductions: Number(e.target.value) })} /></label>
              <div style={{ fontSize: 12, color: c.muted, marginTop: -6 }}>Advance, leave or other adjustments.</div>

              <div style={{ display: "flex", justifyContent: "space-between", padding: "14px 0", marginTop: 10, borderTop: `1px solid ${c.border}`, fontSize: 16, fontWeight: 800 }}>
                <span>Net Salary</span><span>{inr(net)}</span>
              </div>
            </>
          )}

          <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
            <button onClick={onClose} style={{ flex: 1, padding: 12, borderRadius: 12, border: `1px solid ${c.border}`, background: c.card, color: c.ink, fontSize: 14, fontWeight: 600 }}>Cancel</button>
            <button
              disabled={!!existing || !emp}
              onClick={() => onCreate({
                id: Date.now(), empId: Number(f.empId), month: Number(f.month), year: Number(f.year),
                basic: Number(f.basic) || 0, bonus: Number(f.bonus) || 0, deductions: Number(f.deductions) || 0,
                status: "Pending", paidOn: "", method: "", ref: "",
              })}
              style={{
                flex: 1, padding: 12, borderRadius: 12, fontSize: 14, fontWeight: 600, color: "#fff",
                background: (existing || !emp) ? c.muted : A.orange, cursor: (existing || !emp) ? "not-allowed" : "pointer",
              }}>
              Create slip
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------- documents ------------------------------- */

const DOC_CATS = ["Legal", "Finance", "HR", "Templates", "Marketing", "Other"];

const CAT_TONE = {
  Legal: "purple", Finance: "blue", HR: "green",
  Templates: "amber", Marketing: "red", Other: "indigo",
};

const SAMPLE_DOCS = [
  { id: 1, name: "Company Registration.pdf", cat: "Legal",     size: 412000,  date: "2026-08-10", by: "Deepak Kumar" },
  { id: 2, name: "GST Certificate.pdf",      cat: "Legal",     size: 180000,  date: "2026-08-10", by: "Deepak Kumar" },
  { id: 3, name: "PAN Card.pdf",             cat: "Legal",     size: 96000,   date: "2026-08-10", by: "Deepak Kumar" },
  { id: 4, name: "Rent Agreement — July 2026.pdf", cat: "Finance", size: 1240000, date: "2026-08-09", by: "Deepak Kumar" },
  { id: 5, name: "Service Agreement Template.pdf", cat: "Templates", size: 220000, date: "2026-08-09", by: "Deepak Kumar" },
  { id: 6, name: "Employee Handbook.pdf",    cat: "HR",        size: 890000,  date: "2026-08-08", by: "Deepak Kumar" },
  { id: 7, name: "Bank Statement — July 2026.pdf", cat: "Finance", size: 320000, date: "2026-08-08", by: "Deepak Kumar" },
  { id: 8, name: "Brand Guidelines.pdf",     cat: "Marketing", size: 3400000, date: "2026-08-07", by: "Deepak Kumar" },
];

const fileSize = (b) => {
  if (!b) return "—";
  if (b < 1024) return b + " B";
  if (b < 1048576) return Math.round(b / 1024) + " KB";
  return (b / 1048576).toFixed(1) + " MB";
};

function DocumentsPage({ c, dark, docs, onUpload, onDelete }) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All Categories");
  const [page, setPage] = useState(1);
  const perPage = 8;

  const rows = docs.filter(d => {
    const hit = d.name.toLowerCase().includes(q.toLowerCase());
    return hit && (cat === "All Categories" || d.cat === cat);
  });

  const pages = Math.max(1, Math.ceil(rows.length / perPage));
  const shown = rows.slice((page - 1) * perPage, page * perPage);

  const selectStyle = {
    fontSize: 13.5, fontWeight: 500, padding: "10px 12px", borderRadius: 12,
    border: `1px solid ${c.border}`, background: c.card, color: c.ink, outline: "none",
  };

  return (
    <div style={{ maxWidth: 1560, margin: "0 auto" }}>
      <PageHead c={c} title="Documents" sub="Store and manage important company documents."
        action={<PrimaryBtn onClick={onUpload}><Upload size={17} /> Upload Document</PrimaryBtn>} />

      <div className="dh-toolbar">
        <SearchBox c={c} placeholder="Search documents..." value={q} onChange={v => { setQ(v); setPage(1); }} />
        <select value={cat} onChange={e => { setCat(e.target.value); setPage(1); }} style={selectStyle}>
          {["All Categories", ...DOC_CATS].map(x => <option key={x}>{x}</option>)}
        </select>
      </div>

      <Card c={c} style={{ overflow: "hidden" }}>
        {shown.length === 0 ? (
          <Blank c={c} Icon={FolderClosed} title="No documents"
            sub={docs.length === 0 ? "Upload contracts, certificates and templates here." : "Nothing matches this search."} />
        ) : (
          <>
            <table className="dh-table" style={{ borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${c.border}` }}>
                  <Th c={c}>Document Name</Th><Th c={c}>Category</Th>
                  <Th c={c}>Uploaded On</Th><Th c={c}>Size</Th>
                  <Th c={c}>Uploaded By</Th><Th c={c} align="right">Action</Th>
                </tr>
              </thead>
              <tbody>
                {shown.map(d => (
                  <tr key={d.id} style={{ borderBottom: `1px solid ${c.border}` }}>
                    <td style={{ padding: "14px 20px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <IconTile Icon={FileText} tone="red" size={38} />
                        <span style={{ fontSize: 14, fontWeight: 600 }}>{d.name}</span>
                      </div>
                    </td>
                    <Td c={c}>
                      <span style={{
                        background: A[CAT_TONE[d.cat] + "Soft"], color: A[CAT_TONE[d.cat]],
                        fontSize: 11.5, fontWeight: 600, padding: "4px 10px", borderRadius: 999,
                      }}>{d.cat}</span>
                    </Td>
                    <Td c={c} color={c.inkSoft}>{fmtDate(d.date)}</Td>
                    <Td c={c} color={c.muted}>{fileSize(d.size)}</Td>
                    <Td c={c} color={c.inkSoft}>{d.by}</Td>
                    <Td c={c} align="right">
                      <span style={{ display: "inline-flex", gap: 14, color: c.muted }}>
                        <Download size={17} />
                        <button onClick={() => onDelete(d)} style={{ color: c.muted, display: "flex" }}>
                          <Trash2 size={16} />
                        </button>
                      </span>
                    </Td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="dh-cards">
              {shown.map(d => (
                <div key={d.id} style={{ padding: 16, borderBottom: `1px solid ${c.border}`, display: "flex", gap: 12, alignItems: "center" }}>
                  <IconTile Icon={FileText} tone="red" size={38} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, wordBreak: "break-word" }}>{d.name}</div>
                    <div style={{ fontSize: 12, color: c.muted, marginTop: 3 }}>
                      {fmtDate(d.date)} · {fileSize(d.size)}
                    </div>
                  </div>
                  <span style={{
                    background: A[CAT_TONE[d.cat] + "Soft"], color: A[CAT_TONE[d.cat]],
                    fontSize: 11, fontWeight: 600, padding: "4px 9px", borderRadius: 999, whiteSpace: "nowrap",
                  }}>{d.cat}</span>
                  <button style={{ color: c.muted }}><Download size={17} /></button>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10, padding: "14px 20px", borderTop: `1px solid ${c.border}` }}>
              <span style={{ fontSize: 13, color: c.muted }}>
                Showing {(page - 1) * perPage + 1} to {Math.min(page * perPage, rows.length)} of {rows.length} documents
              </span>
              <div style={{ display: "flex", gap: 6 }}>
                {Array.from({ length: pages }).map((_, n) => (
                  <button key={n} onClick={() => setPage(n + 1)}
                    style={{
                      width: 34, height: 34, borderRadius: 10, fontSize: 13, fontWeight: 600,
                      border: `1px solid ${page === n + 1 ? A.orange : c.border}`,
                      background: page === n + 1 ? A.orange : c.card,
                      color: page === n + 1 ? "#fff" : c.inkSoft,
                    }}>{n + 1}</button>
                ))}
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}

function UploadModal({ c, dark, onClose, onSave }) {
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(DOC_CATS[0]);
  const [name, setName] = useState("");
  const [err, setErr] = useState("");

  const MAX = 10 * 1024 * 1024;

  const pick = (f) => {
    if (!f) return;
    if (f.type !== "application/pdf" && !f.name.toLowerCase().endsWith(".pdf")) {
      setErr("Only PDF files can be uploaded."); setFile(null); return;
    }
    if (f.size > MAX) { setErr("File is too large. Maximum size is 10 MB."); setFile(null); return; }
    setErr(""); setFile(f); if (!name) setName(f.name);
  };

  const label = { fontSize: 12.5, fontWeight: 500, color: c.inkSoft, display: "block", marginBottom: 6 };
  const input = {
    width: "100%", boxSizing: "border-box", fontSize: 15, padding: "10px 12px", borderRadius: 10,
    border: `1px solid ${c.border}`, background: c.card, color: c.ink, outline: "none",
  };

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 50, background: "rgba(15,23,42,.45)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div onClick={e => e.stopPropagation()} style={{ background: c.card, borderRadius: 18, width: "100%", maxWidth: 460, maxHeight: "88vh", overflowY: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 22px", borderBottom: `1px solid ${c.border}` }}>
          <div style={{ fontSize: 18, fontWeight: 700 }}>Upload Document</div>
          <button onClick={onClose} style={{ color: c.muted }}><X size={19} /></button>
        </div>

        <div style={{ padding: 22 }}>
          <label style={{
            display: "block", border: `2px dashed ${file ? A.green : c.border}`, borderRadius: 14,
            padding: "26px 16px", textAlign: "center", cursor: "pointer", marginBottom: 16,
            background: file ? (dark ? "#0F2A1E" : A.greenSoft) : "transparent",
          }}>
            <input type="file" accept="application/pdf" style={{ display: "none" }}
              onChange={e => pick(e.target.files?.[0])} />
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}>
              <IconTile Icon={file ? FileText : Upload} tone={file ? "green" : "indigo"} size={44} />
            </div>
            {file ? (
              <>
                <div style={{ fontSize: 14, fontWeight: 600, wordBreak: "break-word" }}>{file.name}</div>
                <div style={{ fontSize: 12.5, color: c.muted, marginTop: 3 }}>{fileSize(file.size)} · tap to change</div>
              </>
            ) : (
              <>
                <div style={{ fontSize: 14, fontWeight: 600 }}>Choose a PDF</div>
                <div style={{ fontSize: 12.5, color: c.muted, marginTop: 3 }}>Maximum 10 MB</div>
              </>
            )}
          </label>

          {err && (
            <div style={{ background: A.redSoft, color: A.red, fontSize: 12.5, padding: "9px 12px", borderRadius: 10, marginBottom: 12 }}>
              {err}
            </div>
          )}

          <label style={label}>Display name
            <input style={input} value={name} onChange={e => setName(e.target.value)} placeholder="GST Certificate.pdf" />
          </label>
          <label style={label}>Category
            <select style={input} value={cat} onChange={e => setCat(e.target.value)}>
              {DOC_CATS.map(x => <option key={x}>{x}</option>)}
            </select>
          </label>

          <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
            <button onClick={onClose}
              style={{ flex: 1, padding: 12, borderRadius: 12, border: `1px solid ${c.border}`, background: c.card, color: c.ink, fontSize: 14, fontWeight: 600 }}>
              Cancel
            </button>
            <button disabled={!file}
              onClick={() => onSave({ name: name || file.name, cat, size: file.size })}
              style={{
                flex: 1, padding: 12, borderRadius: 12, fontSize: 14, fontWeight: 600, color: "#fff",
                background: file ? A.orange : c.muted, cursor: file ? "pointer" : "not-allowed",
              }}>
              Upload
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------- expenses ------------------------------- */

const EXP_CATS = ["Software", "Hosting", "Advertising", "Freelancer", "Office", "Equipment", "Travel", "Other"];

const EXP_TONE = {
  Software: "indigo", Hosting: "blue", Advertising: "red", Freelancer: "purple",
  Office: "amber", Equipment: "green", Travel: "blue", Other: "indigo",
};

const PAY_METHODS = ["Bank Transfer", "UPI", "Card", "Cash", "Cheque", "Other"];

const SAMPLE_EXPENSES = [
  { id: 1, name: "Hostinger — annual hosting", cat: "Hosting", amt: 8400, date: "2026-08-02", method: "Card", notes: "Business plan renewal", receipt: "hostinger-invoice.pdf" },
  { id: 2, name: "Claude API credits", cat: "Software", amt: 12500, date: "2026-08-04", method: "Card", notes: "", receipt: "" },
  { id: 3, name: "Meta Ads — client campaigns", cat: "Advertising", amt: 45000, date: "2026-08-06", method: "Card", notes: "Billed to 3 clients", receipt: "" },
  { id: 4, name: "Freelance video editor", cat: "Freelancer", amt: 15000, date: "2026-08-08", method: "UPI", notes: "6 reels", receipt: "" },
  { id: 5, name: "Office rent — August", cat: "Office", amt: 18000, date: "2026-08-01", method: "Bank Transfer", notes: "", receipt: "rent-receipt.pdf" },
  { id: 6, name: "Canva Pro", cat: "Software", amt: 4200, date: "2026-07-28", method: "Card", notes: "Annual", receipt: "" },
  { id: 7, name: "New monitor", cat: "Equipment", amt: 21000, date: "2026-07-20", method: "UPI", notes: "For design desk", receipt: "" },
];

function ExpensesPage({ c, dark, expenses, onNew, onEdit, onDelete }) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All Categories");
  const [range, setRange] = useState("This Month");

  const inRange = (d) => {
    const dt = new Date(d), now = new Date();
    if (range === "All Time") return true;
    if (range === "This Month") return dt.getMonth() === now.getMonth() && dt.getFullYear() === now.getFullYear();
    if (range === "Last Month") {
      const m = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      return dt.getMonth() === m.getMonth() && dt.getFullYear() === m.getFullYear();
    }
    if (range === "This Year") return dt.getFullYear() === now.getFullYear();
    return true;
  };

  const rows = expenses
    .filter(e => e.name.toLowerCase().includes(q.toLowerCase()))
    .filter(e => cat === "All Categories" || e.cat === cat)
    .filter(e => inRange(e.date))
    .sort((a, b) => b.date.localeCompare(a.date));

  const total = rows.reduce((a, e) => a + e.amt, 0);

  const byCat = {};
  rows.forEach(e => { byCat[e.cat] = (byCat[e.cat] || 0) + e.amt; });
  const topCat = Object.keys(byCat).sort((a, b) => byCat[b] - byCat[a])[0];

  const selectStyle = {
    fontSize: 13.5, fontWeight: 500, padding: "10px 12px", borderRadius: 12,
    border: `1px solid ${c.border}`, background: c.card, color: c.ink, outline: "none",
  };

  const toolsSpend = rows.filter(e => e.cat === "Software" || e.cat === "Hosting").reduce((a, e) => a + e.amt, 0);

  const stats = [
    { label: "Total Expenses", val: inr(total), sub: `${rows.length} entries`,
      Icon: Receipt, tone: "red", subColor: c.muted },
    { label: topCat || "Top Category", val: topCat ? inr(byCat[topCat]) : inr(0),
      sub: topCat ? `${Math.round((byCat[topCat] / total) * 100)}% of spend` : "Nothing spent yet",
      Icon: Package, tone: "amber", subColor: c.muted },
    { label: "Tools", val: inr(toolsSpend),
      sub: toolsSpend ? "Software & hosting" : "No tool spend",
      Icon: Settings, tone: "purple", subColor: c.muted },
    { label: "Average Entry", val: rows.length ? inr(total / rows.length) : inr(0), sub: range,
      Icon: BarChart3, tone: "indigo", subColor: c.muted },
  ];

  return (
    <div style={{ maxWidth: 1560, margin: "0 auto" }}>
      <PageHead c={c} title="Expenses" sub="Track what the business spends, so profit stays honest."
        action={<PrimaryBtn onClick={onNew}><Plus size={17} /> Add Expense</PrimaryBtn>} />

      <div className="dh-fin4" style={{ marginBottom: 16 }}>
        {stats.map(s => (
          <Card key={s.label} c={c} className="kpi-card">
            <div className="kpi-head">
              <IconTile Icon={s.Icon} tone={s.tone} className="kpi-tile" />
              <div className="kpi-body">
                <div className="kpi-label font-medium truncate" style={{ color: c.inkSoft }}>{s.label}</div>
                <FitText text={s.val} className="kpi-value font-bold tracking-tight" />
              </div>
            </div>
            <div className="kpi-note font-medium truncate" style={{ color: s.subColor }}>{s.sub}</div>
          </Card>
        ))}
      </div>

      <div className="dh-toolbar">
        <SearchBox c={c} placeholder="Search expenses..." value={q} onChange={setQ} />
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <select value={range} onChange={e => setRange(e.target.value)} style={selectStyle}>
            {["This Month", "Last Month", "This Year", "All Time"].map(x => <option key={x}>{x}</option>)}
          </select>
          <select value={cat} onChange={e => setCat(e.target.value)} style={selectStyle}>
            {["All Categories", ...EXP_CATS].map(x => <option key={x}>{x}</option>)}
          </select>
        </div>
      </div>

      <Card c={c} style={{ overflow: "hidden" }}>
        {rows.length === 0 ? (
          <Blank c={c} Icon={Receipt} title="No expenses"
            sub={expenses.length === 0 ? "Add your first expense to complete the P&L." : "Nothing matches these filters."} />
        ) : (
          <>
            <table className="dh-table" style={{ borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${c.border}` }}>
                  <Th c={c}>Expense</Th><Th c={c}>Category</Th><Th c={c}>Date</Th>
                  <Th c={c}>Method</Th><Th c={c} align="right">Amount</Th><Th c={c} align="right">Action</Th>
                </tr>
              </thead>
              <tbody>
                {rows.map(e => (
                  <tr key={e.id} onClick={() => onEdit(e)} style={{ borderBottom: `1px solid ${c.border}`, cursor: "pointer" }}>
                    <td style={{ padding: "14px 20px" }}>
                      <div style={{ fontSize: 14, fontWeight: 600 }}>{e.name}</div>
                      {e.notes && <div style={{ fontSize: 12, color: c.muted, marginTop: 2 }}>{e.notes}</div>}
                    </td>
                    <Td c={c}>
                      <span style={{
                        background: A[EXP_TONE[e.cat] + "Soft"], color: A[EXP_TONE[e.cat]],
                        fontSize: 11.5, fontWeight: 600, padding: "4px 10px", borderRadius: 999,
                      }}>{e.cat}</span>
                    </Td>
                    <Td c={c} color={c.inkSoft}>{fmtDate(e.date)}</Td>
                    <Td c={c} color={c.inkSoft}>{e.method}</Td>
                    <Td c={c} align="right" bold>{inr(e.amt)}</Td>
                    <Td c={c} align="right">
                      <span style={{ display: "inline-flex", gap: 14, color: c.muted }}>
                        {e.receipt ? <Download size={17} /> : <span style={{ width: 17 }} />}
                        <button onClick={(ev) => { ev.stopPropagation(); onDelete(e); }} style={{ color: c.muted, display: "flex" }}>
                          <Trash2 size={16} />
                        </button>
                      </span>
                    </Td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="dh-cards">
              {rows.map(e => (
                <button key={e.id} onClick={() => onEdit(e)}
                  style={{ width: "100%", textAlign: "left", padding: 16, borderBottom: `1px solid ${c.border}` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 10, marginBottom: 6 }}>
                    <span style={{ fontSize: 14.5, fontWeight: 600 }}>{e.name}</span>
                    <span style={{ fontSize: 14.5, fontWeight: 700 }}>{inr(e.amt)}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{
                      background: A[EXP_TONE[e.cat] + "Soft"], color: A[EXP_TONE[e.cat]],
                      fontSize: 11, fontWeight: 600, padding: "3px 9px", borderRadius: 999,
                    }}>{e.cat}</span>
                    <span style={{ fontSize: 12.5, color: c.muted }}>{fmtDate(e.date)} · {e.method}</span>
                  </div>
                </button>
              ))}
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", padding: "16px 20px", borderTop: `1px solid ${c.border}` }}>
              <span style={{ fontSize: 15, fontWeight: 700, color: A.orange }}>Total — {range}</span>
              <span style={{ fontSize: 18, fontWeight: 800, color: A.orange }}>{inr(total)}</span>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}

function ExpenseModal({ c, dark, expense, onClose, onSave, onDelete }) {
  const isNew = !expense;
  const [f, setF] = useState(expense || {
    name: "", cat: EXP_CATS[0], amt: "", date: new Date().toISOString().slice(0, 10),
    method: PAY_METHODS[0], notes: "", receipt: "",
  });
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  const label = { fontSize: 12.5, fontWeight: 500, color: c.inkSoft, display: "block", marginBottom: 6 };
  const input = {
    width: "100%", boxSizing: "border-box", fontSize: 15, padding: "10px 12px", borderRadius: 10,
    border: `1px solid ${c.border}`, background: c.card, color: c.ink, outline: "none",
  };

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 50, background: "rgba(15,23,42,.45)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div onClick={e => e.stopPropagation()} style={{ background: c.card, borderRadius: 18, width: "100%", maxWidth: 460, maxHeight: "88vh", overflowY: "auto" }}>
        <div style={{ position: "sticky", top: 0, background: c.card, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 22px", borderBottom: `1px solid ${c.border}` }}>
          <div style={{ fontSize: 18, fontWeight: 700 }}>{isNew ? "Add Expense" : "Edit Expense"}</div>
          <button onClick={onClose} style={{ color: c.muted }}><X size={19} /></button>
        </div>

        <div style={{ padding: 22 }}>
          <label style={label}>Expense name
            <input style={input} value={f.name} onChange={set("name")} placeholder="Hostinger — annual hosting" autoFocus /></label>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <label style={label}>Amount (₹)
              <input type="number" style={input} value={f.amt} onChange={set("amt")} /></label>
            <label style={label}>Date
              <DateField c={c} value={f.date} onChange={(v) => setF({ ...f, date: v })} /></label>
            <label style={label}>Category
              <select style={input} value={f.cat} onChange={set("cat")}>
                {EXP_CATS.map(x => <option key={x}>{x}</option>)}
              </select></label>
            <label style={label}>Payment method
              <select style={input} value={f.method} onChange={set("method")}>
                {PAY_METHODS.map(x => <option key={x}>{x}</option>)}
              </select></label>
          </div>

          <label style={label}>Notes (optional)
            <textarea rows={2} style={{ ...input, resize: "vertical" }} value={f.notes} onChange={set("notes")} /></label>

          <label style={{
            display: "flex", alignItems: "center", gap: 12, border: `1px dashed ${c.border}`,
            borderRadius: 12, padding: 14, cursor: "pointer", marginBottom: 4,
          }}>
            <input type="file" accept="application/pdf" style={{ display: "none" }}
              onChange={e => setF({ ...f, receipt: e.target.files?.[0]?.name || "" })} />
            <IconTile Icon={Upload} tone={f.receipt ? "green" : "indigo"} size={36} />
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 13.5, fontWeight: 600 }}>{f.receipt || "Attach receipt (optional)"}</div>
              <div style={{ fontSize: 12, color: c.muted, marginTop: 2 }}>PDF, up to 10 MB</div>
            </div>
          </label>

          <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
            {!isNew && (
              <button onClick={() => onDelete(f)}
                style={{ padding: "12px 16px", borderRadius: 12, border: `1px solid ${c.border}`, background: c.card, color: A.clay, fontSize: 14, fontWeight: 600 }}>
                <Trash2 size={16} />
              </button>
            )}
            <button onClick={onClose}
              style={{ flex: 1, padding: 12, borderRadius: 12, border: `1px solid ${c.border}`, background: c.card, color: c.ink, fontSize: 14, fontWeight: 600 }}>
              Cancel
            </button>
            <button
              disabled={!f.name || !Number(f.amt)}
              onClick={() => onSave({ ...f, amt: Number(f.amt) || 0 })}
              style={{
                flex: 1, padding: 12, borderRadius: 12, fontSize: 14, fontWeight: 600, color: "#fff",
                background: (f.name && Number(f.amt)) ? A.orange : c.muted,
                cursor: (f.name && Number(f.amt)) ? "pointer" : "not-allowed",
              }}>
              {isNew ? "Add expense" : "Save changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------- notifications ----------------------------- */

function buildNotifications({ invoices, payroll, employees, docs }) {
  const out = [];
  const today = new Date().toISOString().slice(0, 10);
  const soon = new Date(); soon.setDate(soon.getDate() + 5);
  const soonISO = soon.toISOString().slice(0, 10);

  invoices.forEach(i => {
    const t = invTotals(i);
    if (i.status === "Cancelled" || i.status === "Draft" || t.due <= 0) return;
    if (i.due && i.due < today) {
      out.push({ id: "ov" + i.id, tone: "red", Icon: CircleDot, page: "invoices", ref: i,
        title: `${i.no} is overdue`, sub: `${i.client} · ${money(t.due, i.currency)} outstanding`, date: i.due });
    } else if (i.due && i.due <= soonISO) {
      out.push({ id: "due" + i.id, tone: "amber", Icon: Clock, page: "invoices", ref: i,
        title: `${i.no} is due soon`, sub: `${i.client} · due ${fmtDate(i.due)}`, date: i.due });
    }
  });

  payroll.filter(r => r.status === "Pending").forEach(r => {
    const emp = employees.find(e => e.id === r.empId);
    out.push({ id: "sal" + r.id, tone: "amber", Icon: Users, page: "salary", ref: r,
      title: `Salary pending — ${emp?.name || "employee"}`,
      sub: `${MONTHS[r.month - 1]} ${r.year} · ${inr(payNet(r))}`, date: `${r.year}-${String(r.month).padStart(2, "0")}-01` });
  });

  invoices.filter(i => (i.payments || []).length > 0).slice(0, 3).forEach(i => {
    const last = i.payments[i.payments.length - 1];
    out.push({ id: "pay" + i.id, tone: "green", Icon: CheckCircle2, page: "invoices", ref: i,
      title: `Payment received — ${money(last.amt, i.currency)}`, sub: `${i.client} · ${i.no}`, date: last.date });
  });

  return out.sort((a, b) => (b.date || "").localeCompare(a.date || "")).slice(0, 12);
}

function NotificationPanel({ c, dark, items, onClose, onGo }) {
  return (
    <>
      <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 40 }} />
      <div style={{
        position: "absolute", right: 0, top: "calc(100% + 10px)", width: 340, maxWidth: "92vw", zIndex: 45,
        background: c.card, border: `1px solid ${c.border}`, borderRadius: 16,
        boxShadow: "0 16px 40px rgba(15,23,42,.16)", overflow: "hidden",
      }}>
        <div style={{ padding: "14px 16px", borderBottom: `1px solid ${c.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 15, fontWeight: 700 }}>Notifications</span>
          <span style={{ fontSize: 12, color: c.muted }}>{items.length}</span>
        </div>

        <div style={{ maxHeight: 380, overflowY: "auto" }}>
          {items.length === 0 ? (
            <div style={{ padding: "40px 20px", textAlign: "center" }}>
              <CheckCircle2 size={24} color={A.green} style={{ margin: "0 auto 8px" }} />
              <div style={{ fontSize: 13.5, fontWeight: 600 }}>All clear</div>
              <div style={{ fontSize: 12.5, color: c.muted, marginTop: 3 }}>Nothing needs your attention.</div>
            </div>
          ) : items.map(n => (
            <button key={n.id} onClick={() => { onGo(n); onClose(); }}
              style={{ width: "100%", textAlign: "left", display: "flex", gap: 12, padding: "12px 16px", borderBottom: `1px solid ${c.border}` }}>
              <IconTile Icon={n.Icon} tone={n.tone} size={34} />
              <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{ fontSize: 13.5, fontWeight: 600, lineHeight: 1.35 }}>{n.title}</div>
                <div style={{ fontSize: 12, color: c.muted, marginTop: 3 }}>{n.sub}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

/* ------------------------------ global search ---------------------------- */

function GlobalSearch({ c, dark, data, onClose, onGo }) {
  const [q, setQ] = useState("");
  const term = q.trim().toLowerCase();

  const groups = useMemo(() => {
    if (term.length < 1) return [];
    const hit = (s) => (s || "").toString().toLowerCase().includes(term);
    const g = [];

    const cl = data.clients.filter(x => hit(x.company) || hit(x.contact) || hit(x.email));
    if (cl.length) g.push({ label: "Clients", Icon: Building2, tone: "indigo",
      items: cl.slice(0, 5).map(x => ({ key: "c" + x.id, title: x.company, sub: x.email || x.contact, go: { page: "clients", ref: x } })) });

    const iv = data.invoices.filter(x => hit(x.no) || hit(x.client));
    if (iv.length) g.push({ label: "Invoices", Icon: FileText, tone: "green",
      items: iv.slice(0, 5).map(x => ({ key: "i" + x.id, title: x.no, sub: `${x.client} · ${money(invTotals(x).total, x.currency)}`, go: { page: "invoices", ref: x } })) });

    const em = data.employees.filter(x => hit(x.name) || hit(x.role) || hit(x.email));
    if (em.length) g.push({ label: "Employees", Icon: Users, tone: "purple",
      items: em.slice(0, 5).map(x => ({ key: "e" + x.id, title: x.name, sub: x.role, go: { page: "employees", ref: x } })) });

    const dc = data.docs.filter(x => hit(x.name) || hit(x.cat));
    if (dc.length) g.push({ label: "Documents", Icon: FolderClosed, tone: "red",
      items: dc.slice(0, 5).map(x => ({ key: "d" + x.id, title: x.name, sub: x.cat, go: { page: "documents", ref: x } })) });

    const ex = data.expenses.filter(x => hit(x.name) || hit(x.cat));
    if (ex.length) g.push({ label: "Expenses", Icon: Receipt, tone: "amber",
      items: ex.slice(0, 5).map(x => ({ key: "x" + x.id, title: x.name, sub: `${x.cat} · ${inr(x.amt)}`, go: { page: "expenses", ref: x } })) });

    return g;
  }, [term, data]);

  const count = groups.reduce((a, g) => a + g.items.length, 0);

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 60, background: "rgba(15,23,42,.45)", display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "10vh 16px 16px" }}>
      <div onClick={e => e.stopPropagation()}
        style={{ background: c.card, borderRadius: 18, width: "100%", maxWidth: 560, overflow: "hidden", boxShadow: "0 24px 60px rgba(15,23,42,.3)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px 18px", borderBottom: `1px solid ${c.border}` }}>
          <Search size={18} color={c.muted} />
          <input autoFocus value={q} onChange={e => setQ(e.target.value)}
            onKeyDown={e => e.key === "Escape" && onClose()}
            placeholder="Search clients, invoices, employees, documents..."
            style={{ flex: 1, background: "transparent", outline: "none", fontSize: 15.5, color: c.ink }} />
          <button onClick={onClose} style={{ fontSize: 11, fontWeight: 600, color: c.muted, border: `1px solid ${c.border}`, borderRadius: 6, padding: "3px 7px" }}>ESC</button>
        </div>

        <div style={{ maxHeight: "56vh", overflowY: "auto" }}>
          {term.length === 0 ? (
            <div style={{ padding: "36px 20px", textAlign: "center", fontSize: 13.5, color: c.muted }}>
              Start typing to search across everything.
            </div>
          ) : count === 0 ? (
            <div style={{ padding: "36px 20px", textAlign: "center" }}>
              <div style={{ fontSize: 14, fontWeight: 600 }}>No matches</div>
              <div style={{ fontSize: 13, color: c.muted, marginTop: 4 }}>Nothing found for “{q}”.</div>
            </div>
          ) : groups.map(g => (
            <div key={g.label}>
              <div style={{ padding: "10px 18px 6px", fontSize: 11, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: c.muted }}>
                {g.label}
              </div>
              {g.items.map(it => (
                <button key={it.key} onClick={() => { onGo(it.go); onClose(); }}
                  style={{ width: "100%", textAlign: "left", display: "flex", alignItems: "center", gap: 12, padding: "11px 18px" }}>
                  <IconTile Icon={g.Icon} tone={g.tone} size={34} />
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{it.title}</div>
                    <div style={{ fontSize: 12, color: c.muted, marginTop: 2 }}>{it.sub}</div>
                  </div>
                  <ChevronRight size={16} color={c.muted} />
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------- settings ------------------------------- */

function SettingsPage({ c, dark, settings, onSave, onChangePassword, user }) {
  const [f, setF] = useState(settings || {});
  const [dirty, setDirty] = useState(false);
  const [pw, setPw] = useState({ current: "", next: "", confirm: "" });
  const [pwMsg, setPwMsg] = useState("");
  const [pwErr, setPwErr] = useState("");

  useEffect(() => { setF(settings || {}); setDirty(false); }, [settings]);

  const set = (k) => (e) => { setF({ ...f, [k]: e.target.value }); setDirty(true); };

  const label = { fontSize: 12.5, fontWeight: 500, color: c.inkSoft, display: "block", marginBottom: 6 };
  const input = {
    width: "100%", boxSizing: "border-box", fontSize: 15, padding: "10px 12px", borderRadius: 10,
    border: `1px solid ${c.border}`, background: c.card, color: c.ink, outline: "none",
  };
  const grid2 = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 };

  const submitPw = async () => {
    setPwErr(""); setPwMsg("");
    if (pw.next.length < 8) return setPwErr("New password must be at least 8 characters.");
    if (pw.next !== pw.confirm) return setPwErr("New passwords don't match.");
    const r = await onChangePassword(pw.current, pw.next);
    if (r === true) { setPwMsg("Password changed."); setPw({ current: "", next: "", confirm: "" }); }
    else setPwErr(r || "Could not change password.");
  };

  return (
    <div style={{ maxWidth: 900, margin: "0 auto" }}>
      <PageHead c={c} title="Settings" sub="Company details used on invoices and salary slips."
        action={
          <PrimaryBtn onClick={() => { onSave(f); setDirty(false); }}>
            {dirty ? "Save changes" : "Saved"}
          </PrimaryBtn>
        } />

      <Card c={c} style={{ padding: 20, marginBottom: 16 }}>
        <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>Company Profile</div>
        <div style={{ fontSize: 12.5, color: c.muted, marginBottom: 16 }}>
          This appears at the top of every invoice and salary slip.
        </div>

        <label style={label}>Company name<input style={input} value={f.company_name || ""} onChange={set("company_name")} /></label>
        <label style={label}>Tagline<input style={input} value={f.company_tagline || ""} onChange={set("company_tagline")} placeholder="Digital marketing & AI automation" /></label>
        <label style={label}>Address<textarea rows={2} style={{ ...input, resize: "vertical" }} value={f.company_address || ""} onChange={set("company_address")} /></label>

        <div style={grid2}>
          <label style={label}>Email<input style={input} value={f.company_email || ""} onChange={set("company_email")} /></label>
          <label style={label}>Phone<input style={input} value={f.company_phone || ""} onChange={set("company_phone")} /></label>
          <label style={label}>GSTIN (optional)<input style={input} value={f.company_gstin || ""} onChange={set("company_gstin")} /></label>
          <label style={label}>PAN (optional)<input style={input} value={f.company_pan || ""} onChange={set("company_pan")} /></label>
        </div>
        <label style={label}>Website<input style={input} value={f.company_website || ""} onChange={set("company_website")} placeholder="digitalhikers.in" /></label>
        <label style={label}>Bank / payment details
          <textarea rows={2} style={{ ...input, resize: "vertical" }} value={f.company_bank || ""} onChange={set("company_bank")}
            placeholder="HDFC Bank · A/C 50100XXXXXXX · IFSC HDFC0000XXX" />
        </label>
        <div style={{ fontSize: 12, color: c.muted, marginTop: -4 }}>Printed at the bottom of invoices so clients know where to pay.</div>
      </Card>

      <Card c={c} style={{ padding: 20, marginBottom: 16 }}>
        <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Invoice Settings</div>
        <div style={grid2}>
          <label style={label}>Invoice prefix
            <input style={input} value={f.invoice_prefix || ""} onChange={set("invoice_prefix")} placeholder="INV" />
          </label>
          <label style={label}>Default payment terms
            <select style={input} value={f.invoice_terms || "Net 15"} onChange={set("invoice_terms")}>
              {Object.keys(TERMS).map(k => <option key={k}>{k}</option>)}
            </select>
          </label>
          <label style={label}>Default currency
            <select style={input} value={f.invoice_currency || "INR"} onChange={set("invoice_currency")}>
              {Object.keys(CURRENCIES).map(k => <option key={k} value={k}>{CURRENCIES[k].label}</option>)}
            </select>
          </label>
          <label style={label}>Default salary date (day)
            <input type="number" min="1" max="31" style={input} value={f.salary_pay_date || 20} onChange={set("salary_pay_date")} />
          </label>
        </div>
        <label style={label}>Invoice footer note
          <textarea rows={2} style={{ ...input, resize: "vertical" }} value={f.invoice_footer || ""} onChange={set("invoice_footer")}
            placeholder="Thank you for your business." />
        </label>
        <div style={{ background: dark ? "#141C2E" : "#F8FAFC", borderRadius: 10, padding: 12, fontSize: 12.5, color: c.inkSoft, marginTop: 4 }}>
          Next invoice number will look like <b style={{ color: c.ink }}>
            {(f.invoice_prefix || "INV").toUpperCase()}-{new Date().getFullYear()}-001
          </b>. Changing the prefix doesn't renumber past invoices.
        </div>
      </Card>

      <Card c={c} style={{ padding: 20 }}>
        <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>Security</div>
        <div style={{ fontSize: 12.5, color: c.muted, marginBottom: 16 }}>
          Signed in as <b style={{ color: c.ink }}>{user?.name}</b> (@{user?.username})
        </div>
        <div style={grid2}>
          <label style={label}>Current password
            <input type="password" style={input} value={pw.current} onChange={e => setPw({ ...pw, current: e.target.value })} />
          </label>
          <div />
          <label style={label}>New password
            <input type="password" style={input} value={pw.next} onChange={e => setPw({ ...pw, next: e.target.value })} />
          </label>
          <label style={label}>Confirm new password
            <input type="password" style={input} value={pw.confirm} onChange={e => setPw({ ...pw, confirm: e.target.value })} />
          </label>
        </div>
        {pwErr && <div style={{ background: A.redSoft, color: A.red, fontSize: 12.5, padding: "9px 12px", borderRadius: 10, marginBottom: 10 }}>{pwErr}</div>}
        {pwMsg && <div style={{ background: A.greenSoft, color: A.green, fontSize: 12.5, padding: "9px 12px", borderRadius: 10, marginBottom: 10 }}>{pwMsg}</div>}
        <button onClick={submitPw}
          style={{ padding: "11px 20px", borderRadius: 12, border: `1px solid ${c.border}`, background: c.card, color: c.ink, fontSize: 14, fontWeight: 600 }}>
          Change password
        </button>
      </Card>
    </div>
  );
}


function ContactModal({ c, onClose, onSave }) {
  const [f, setF] = useState({ name: "", role: "", email: "", phone: "" });
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const label = { fontSize: 12.5, fontWeight: 500, color: c.inkSoft, display: "block", marginBottom: 6 };
  const input = {
    width: "100%", boxSizing: "border-box", fontSize: 15, padding: "10px 12px", borderRadius: 10,
    border: `1px solid ${c.border}`, background: c.card, color: c.ink, outline: "none",
  };
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 50, background: "rgba(15,23,42,.45)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div onClick={e => e.stopPropagation()} style={{ background: c.card, borderRadius: 18, width: "100%", maxWidth: 420 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 22px", borderBottom: `1px solid ${c.border}` }}>
          <div style={{ fontSize: 18, fontWeight: 700 }}>Add Contact</div>
          <button onClick={onClose} style={{ color: c.muted }}><X size={19} /></button>
        </div>
        <div style={{ padding: 22 }}>
          <label style={label}>Name<input style={input} value={f.name} onChange={set("name")} autoFocus /></label>
          <label style={label}>Role<input style={input} value={f.role} onChange={set("role")} placeholder="Accounts / Marketing head" /></label>
          <label style={label}>Email<input style={input} value={f.email} onChange={set("email")} /></label>
          <label style={label}>Phone<input style={input} value={f.phone} onChange={set("phone")} /></label>
          <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
            <button onClick={onClose} style={{ flex: 1, padding: 12, borderRadius: 12, border: `1px solid ${c.border}`, background: c.card, color: c.ink, fontSize: 14, fontWeight: 600 }}>Cancel</button>
            <button onClick={() => f.name && onSave(f)}
              style={{ flex: 1, padding: 12, borderRadius: 12, background: f.name ? A.orange : c.muted, color: "#fff", fontSize: 14, fontWeight: 600 }}>
              Add contact
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
