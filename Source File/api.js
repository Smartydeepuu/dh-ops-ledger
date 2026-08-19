const BASE = "api";

async function call(file, action, payload = {}, method = "POST") {
  const url = `${BASE}/${file}.php`;
  const opts = {
    method,
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
  };
  if (method === "POST") opts.body = JSON.stringify({ action, ...payload });

  let res, json;
  try {
    res = await fetch(method === "GET" ? `${url}?action=${action}` : url, opts);
  } catch {
    throw new Error("Can't reach the server. Check your connection.");
  }

  try {
    json = await res.json();
  } catch {
    throw new Error("Server returned an unexpected response.");
  }

  if (res.status === 401) {
    const e = new Error(json.error || "Not signed in.");
    e.unauthorized = true;
    throw e;
  }
  if (!res.ok || !json.ok) throw new Error(json.error || "Something went wrong.");
  return json;
}

export const api = {
  me:            ()      => call("auth", "me"),
  login:         (u, p)  => call("auth", "login", { username: u, password: p }),
  logout:        ()      => call("auth", "logout"),
  changePassword:(c, n)  => call("auth", "change_password", { current: c, next: n }),

  clients:       ()      => call("clients", "list"),
  createClient:  (f)     => call("clients", "create", f),
  updateClient:  (f)     => call("clients", "update", f),
  archiveClient: (id)    => call("clients", "archive", { id }),
  addClientNote: (id, b) => call("clients", "add_note", { client_id: id, body: b }),
  addContact:    (f)     => call("clients", "add_contact", f),

  invoices:      ()      => call("invoices", "list"),
  nextInvoiceNo: ()      => call("invoices", "next_number"),
  saveInvoice:   (f)     => call("invoices", "save", f),
  setInvoiceStatus: (id, status) => call("invoices", "set_status", { id, status }),
  addPayment:    (f)     => call("invoices", "add_payment", f),
  fxPreview:     (amt, currency) => call("invoices", "fx_preview", { amt, currency }),
  deleteInvoice: (id)    => call("invoices", "delete", { id }),

  employees:     ()      => call("employees", "list"),
  createEmployee:(f)     => call("employees", "create", f),
  updateEmployee:(f)     => call("employees", "update", f),
  deleteEmployee:(id)    => call("employees", "delete", { id }),

  payroll:       ()      => call("payroll", "list"),
  createSlip:    (f)     => call("payroll", "create", f),
  updateSlip:    (f)     => call("payroll", "update", f),
  markSlipPaid:  (f)     => call("payroll", "mark_paid", f),

  dashboard:     (from, to) => call("dashboard", "stats", { from, to }),

  documents:     ()      => call("documents", "list"),
  deleteDocument:(id)    => call("documents", "delete", { id }),
  documentUrl:   (id)    => `${BASE}/documents.php?action=download&id=${id}`,

  uploadDocument: async (file, name, cat, assoc = {}) => {
    const fd = new FormData();
    fd.append("action", "upload");
    fd.append("file", file);
    fd.append("name", name);
    fd.append("cat", cat);
    if (assoc.clientId) fd.append("client_id", assoc.clientId);
    if (assoc.empId) fd.append("employee_id", assoc.empId);

    let res, json;
    try {
      res = await fetch(`${BASE}/documents.php`, { method: "POST", credentials: "same-origin", body: fd });
    } catch {
      throw new Error("Upload failed — check your connection.");
    }
    try { json = await res.json(); } catch { throw new Error("Server returned an unexpected response."); }
    if (res.status === 401) { const e = new Error(json.error || "Not signed in."); e.unauthorized = true; throw e; }
    if (!res.ok || !json.ok) throw new Error(json.error || "Upload failed.");
    return json;
  },

  expenses:      ()      => call("expenses", "list"),
  saveExpense:   (f)     => call("expenses", "save", f),
  deleteExpense: (id)    => call("expenses", "delete", { id }),

  settings:      ()      => call("settings", "get"),
  saveSettings:  (settings) => call("settings", "save", { settings }),

  banks:         ()      => call("banks", "list"),
  saveBank:      (b)     => call("banks", "save", b),
  deleteBank:    (id)    => call("banks", "delete", { id }),
};
