(() => {
  "use strict";
  const form = document.getElementById("enquiry-form");
  if (!form) return;
  const inbox = "anbsolutionser@gmail.com";
  const status = document.getElementById("enquiry-status");
  const message = document.getElementById("enquiry-message");
  const count = document.getElementById("message-count");
  const honeypot = document.getElementById("company-website");
  const showStatus = (text, kind = "info") => {
    if (!status) return;
    status.textContent = text;
    status.className = `enquiry-status is-visible is-${kind}`;
  };
  if (message && count) message.addEventListener("input", () => {
    count.textContent = `${message.value.length} / 5000`;
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const consent = document.getElementById("enquiry-consent");
    if (consent && !consent.checked) {
      showStatus("Please confirm the notice before continuing.", "error");
      return;
    }
    if (honeypot && honeypot.value.trim()) {
      showStatus("Unable to prepare this message. Please try again.", "error");
      return;
    }
    const data = Object.fromEntries(new FormData(form).entries());
    const subject = `[ANB ${String(data.type || "Enquiry").slice(0, 40)}] ${String(data.subject || "Website message").slice(0, 120)}`;
    const body = [
      "ANB Official Website — Enquiry / Suggestion", "",
      `Type: ${data.type || "Enquiry"}`,
      `Project: ${data.project || "General / Other"}`,
      `Name: ${data.name || "Not provided"}`,
      `Reply email: ${data.email || "Not provided"}`,
      `Priority: ${data.priority || "Normal"}`,
      `Subject: ${data.subject || "Website message"}`, "", "Message:",
      String(data.message || ""), "", "Sent via the ANB website email-draft form."
    ].join("\n");
    // mailto opens the visitor's email app; it does not send automatically or store submissions.
    const mailto = `mailto:${inbox}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    showStatus("Opening your email app with the message prepared. Review it and press Send there. The website does not store or automatically send this enquiry.", "info");
    window.location.href = mailto;
  });
})();
