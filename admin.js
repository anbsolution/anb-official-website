(() => {
  "use strict";
  const $ = (id) => document.getElementById(id);
  const cfg = window.ANB_ENQUIRY_CONFIG || {};
  const base = String(cfg.API_BASE_URL || "").replace(/\/+$/, "");
  const publicKey = String(cfg.PUBLISHABLE_KEY || "");
  let password = "", rows = [];
  function setMessage(id, text, error = false) {
    const el = $(id); if (!el) return;
    el.textContent = text; el.className = error ? "admin-status error" : "admin-status";
  }
  async function api(path, options = {}) {
    const response = await fetch(`${base}${path}`, {
      ...options,
      headers: { "Content-Type": "application/json", "apikey": publicKey,
        ...(password ? { "X-ANB-Admin-Password": password } : {}), ...(options.headers || {}) }
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.error || `Request failed (${response.status})`);
    return data;
  }
  function render() {
    const query = $("admin-search").value.trim().toLowerCase(), filter = $("admin-filter").value;
    const visible = rows.filter((r) => (!filter || r.status === filter) &&
      [r.reference,r.enquiry_type,r.project,r.customer_name,r.reply_email,r.subject,r.message]
        .some((v) => String(v || "").toLowerCase().includes(query)));
    $("stat-total").textContent = String(rows.length);
    $("stat-new").textContent = String(rows.filter(r => r.status === "New").length);
    $("stat-resolved").textContent = String(rows.filter(r => r.status === "Resolved").length);
    const list = $("admin-list"); list.replaceChildren();
    if (!visible.length) { const p=document.createElement("p"); p.textContent="No matching enquiries."; list.append(p); return; }
    for (const r of visible) {
      const card=document.createElement("article"); card.className="enquiry-record";
      const top=document.createElement("div"); top.className="admin-record-top";
      const ref=document.createElement("strong"); ref.textContent=r.reference || "No reference";
      const date=document.createElement("span"); date.className="admin-meta";
      date.textContent=r.created_at ? new Date(r.created_at).toLocaleString() : "";
      top.append(ref,date); card.append(top);
      const title=document.createElement("h3"); title.textContent=r.subject || "(No subject)"; card.append(title);
      const meta=document.createElement("p"); meta.className="admin-meta";
      meta.textContent=[r.customer_name || "Name not provided",r.reply_email || "Reply email not provided",r.enquiry_type,r.project,`Priority: ${r.priority || "Normal"}`].filter(Boolean).join(" · ");
      card.append(meta);
      const body=document.createElement("p"); body.className="admin-message"; body.textContent=r.message || ""; card.append(body);
      const controls=document.createElement("div"); controls.className="admin-row";
      const select=document.createElement("select");
      for (const s of ["New","In Progress","Resolved"]) { const o=document.createElement("option"); o.value=s; o.textContent=`Status: ${s}`; o.selected=r.status===s; select.append(o); }
      select.addEventListener("change",async()=>{ select.disabled=true; try {
        await api(`/admin/enquiries/${encodeURIComponent(r.id)}`,{method:"PATCH",body:JSON.stringify({status:select.value})});
        setMessage("admin-status","Status updated."); await loadRows();
      } catch(e) { setMessage("admin-status",e.message || "Unable to update status.",true); select.value=r.status; }
      finally { select.disabled=false; }});
      controls.append(select); card.append(controls); list.append(card);
    }
  }
  async function loadRows() { const d=await api("/admin/enquiries"); rows=Array.isArray(d.enquiries)?d.enquiries:[]; render(); }
  async function signIn() {
    const candidate=$("admin-password").value;
    if(!candidate){setMessage("admin-login-status","Enter your admin password.",true);return;}
    password=candidate; $("admin-signin").disabled=true; setMessage("admin-login-status","Checking password…");
    try { await loadRows(); $("admin-login").hidden=true; $("admin-dashboard").hidden=false; $("admin-password").value=""; setMessage("admin-status","Signed in. Inbox loaded."); }
    catch(e){password="";setMessage("admin-login-status",e.message || "Sign-in failed.",true);}
    finally{$("admin-signin").disabled=false;}
  }
  function logout(){password="";rows=[];$("admin-dashboard").hidden=true;$("admin-login").hidden=false;$("admin-password").value="";$("admin-list").replaceChildren();setMessage("admin-login-status","Signed out.");}
  $("admin-signin").addEventListener("click",signIn);
  $("admin-password").addEventListener("keydown",e=>{if(e.key==="Enter")signIn();});
  $("admin-refresh").addEventListener("click",async()=>{try{await loadRows();setMessage("admin-status","Inbox refreshed.");}catch(e){setMessage("admin-status",e.message||"Refresh failed.",true);}});
  $("admin-logout").addEventListener("click",logout);
  $("admin-search").addEventListener("input",render);
  $("admin-filter").addEventListener("change",render);
})();
