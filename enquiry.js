(() => {
  "use strict";
  const form = document.getElementById("enquiry-form");
  if (!form) return;
  const cfg = window.ANB_ENQUIRY_CONFIG || {};
  const apiBase = String(cfg.API_BASE_URL || "").replace(/\/+$/, "");
  const publicKey = String(cfg.PUBLISHABLE_KEY || "");
  const status = document.getElementById("enquiry-status");
  const message = document.getElementById("enquiry-message");
  const count = document.getElementById("message-count");
  const honeypot = document.getElementById("company-website");
  const receipt = document.getElementById("enquiry-receipt");
  const submitButton = document.getElementById("enquiry-submit");
  const showStatus = (text, kind = "info") => {
    if (!status) return;
    status.textContent = text;
    status.className = `enquiry-status is-visible is-${kind}`;
  };
  if (message && count) message.addEventListener("input", () => {
    count.textContent = `${message.value.length} / 5000`;
  });
  const readForm = () => {
    const f = new FormData(form);
    return {
      type: String(f.get("type") || "Enquiry"),
      project: String(f.get("project") || "General / Other"),
      name: String(f.get("name") || "").trim(),
      email: String(f.get("email") || "").trim(),
      subject: String(f.get("subject") || "").trim(),
      priority: String(f.get("priority") || "Normal"),
      message: String(f.get("message") || "").trim(),
      company_website: String(f.get("company_website") || "").trim()
    };
  };
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    if (!document.getElementById("enquiry-consent")?.checked) {
      showStatus("Please confirm the privacy notice before submitting.", "error");
      return;
    }
    if (!apiBase || !publicKey || apiBase.includes("YOUR-OWN-API")) {
      showStatus("The enquiry API is not configured yet.", "error");
      return;
    }
    const data = readForm();
    if (data.company_website) {
      showStatus("Unable to submit this message. Please try again.", "error");
      return;
    }
    submitButton.disabled = true;
    submitButton.setAttribute("aria-busy", "true");
    showStatus("Submitting securely to ANB…");
    try {
      const response = await fetch(`${apiBase}/enquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "apikey": publicKey },
        body: JSON.stringify(data)
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.ok || !result.reference) {
        throw new Error(result.error || `Could not save enquiry (${response.status}).`);
      }
      form.hidden = true;
      if (receipt) receipt.hidden = false;
      const ref = document.getElementById("receipt-reference-code");
      const copy = document.getElementById("receipt-copy");
      if (ref) ref.textContent = result.reference;
      if (copy) copy.textContent = "Your enquiry has been saved to the ANB enquiry database. Keep this reference ID for follow-up.";
      showStatus("Enquiry saved successfully.", "success");
    } catch (error) {
      showStatus(error instanceof Error ? error.message : "Network error. Check your connection and retry.", "error");
    } finally {
      submitButton.disabled = false;
      submitButton.removeAttribute("aria-busy");
    }
  });
  document.getElementById("copy-reference")?.addEventListener("click", async () => {
    const value = document.getElementById("receipt-reference-code")?.textContent || "";
    try {
      await navigator.clipboard.writeText(value);
      document.getElementById("copy-reference").textContent = "Copied";
    } catch {
      showStatus("Please copy the reference ID manually.", "info");
    }
  });
  document.getElementById("new-enquiry")?.addEventListener("click", () => {
    form.reset();
    form.hidden = false;
    if (receipt) receipt.hidden = true;
    if (count) count.textContent = "0 / 5000";
    showStatus("");
    window.scrollTo({ top: form.getBoundingClientRect().top + window.scrollY - 100, behavior: "smooth" });
  });
})();
