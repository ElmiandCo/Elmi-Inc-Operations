(() => {
  const RECIPIENT = 'elmiandco@gmail.com';
  const $ = (s, r = document) => r.querySelector(s);
  const esc = v => String(v ?? '').replace(/[&<>\"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[m]));

  function inject() {
    if (!document.body || $('#elmiContractRequest')) return;
    const wrap = document.createElement('div');
    wrap.id = 'elmiContractRequest';
    wrap.innerHTML = `
      <button class="elmi-contract-fab" type="button" aria-label="Request a contract with Elmi Inc.">✦ Request a Contract</button>
      <div class="elmi-contract-modal" hidden>
        <div class="elmi-contract-backdrop" data-close-contract></div>
        <section class="elmi-contract-card" role="dialog" aria-modal="true" aria-labelledby="elmiContractTitle">
          <button class="elmi-contract-close" type="button" data-close-contract aria-label="Close">×</button>
          <div class="elmi-contract-kicker">ELMI INC. CONSULTING</div>
          <h2 id="elmiContractTitle">Request a Contract</h2>
          <p class="elmi-contract-sub">Tell us what you need. We’ll review the request and follow up about scope, timeline, and next steps.</p>
          <form id="elmiContractForm">
            <div class="elmi-contract-grid">
              <label><span>Your name *</span><input name="name" required placeholder="Full name"></label>
              <label><span>Organization *</span><input name="organization" required placeholder="Company or agency"></label>
              <label><span>Email *</span><input name="email" type="email" required placeholder="you@company.com"></label>
              <label><span>Phone</span><input name="phone" type="tel" placeholder="Optional"></label>
              <label><span>Service needed *</span><select name="service" required><option value="">Select a service</option><option>Microsoft Power Apps</option><option>Power Automate</option><option>Power BI</option><option>Dataverse</option><option>Power Pages</option><option>Power Platform Consulting</option><option>Application Modernization</option><option>Other IT Consulting</option></select></label>
              <label><span>Estimated budget</span><select name="budget"><option value="">Prefer not to say</option><option>Under $25,000</option><option>$25,000–$75,000</option><option>$75,000–$150,000</option><option>$150,000–$500,000</option><option>$500,000+</option></select></label>
              <label class="full"><span>What do you need? *</span><textarea name="details" required rows="5" placeholder="Describe the project, problem, deliverables, timeline, or procurement need."></textarea></label>
            </div>
            <div class="elmi-contract-foot"><small>This request is an inquiry, not a contract or award.</small><button class="btn primary" type="submit">Send Request to Elmi Inc. →</button></div>
          </form>
        </section>
      </div>`;
    document.body.appendChild(wrap);
    const modal = $('.elmi-contract-modal', wrap);
    const open = () => { modal.hidden = false; document.body.style.overflow = 'hidden'; setTimeout(() => $('[name="name"]', wrap)?.focus(), 50); };
    const close = () => { modal.hidden = true; document.body.style.overflow = ''; };
    $('.elmi-contract-fab', wrap).onclick = open;
    wrap.querySelectorAll('[data-close-contract]').forEach(x => x.onclick = close);
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && !modal.hidden) close(); });
    $('#elmiContractForm', wrap).onsubmit = e => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(e.currentTarget).entries());
      const subject = `Contract Request — ${data.organization} — ${data.service}`;
      const body = [
        'ELMI INC. CONSULTING — CONTRACT REQUEST', '',
        `Name: ${data.name}`, `Organization: ${data.organization}`, `Email: ${data.email}`, `Phone: ${data.phone || 'Not provided'}`,
        `Service: ${data.service}`, `Estimated budget: ${data.budget || 'Not provided'}`, '',
        'PROJECT / PROCUREMENT DETAILS:', data.details, '',
        'Submitted from: Elmi Inc. Operations dashboard'
      ].join('\n');
      window.location.href = `mailto:${RECIPIENT}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      close();
      if (typeof window.toast === 'function') window.toast('Your email draft is ready to send to Elmi Inc.');
    };
  }

  const css = document.createElement('style');
  css.textContent = `
    .elmi-contract-fab{position:fixed;right:24px;bottom:24px;z-index:850;border:0;border-radius:999px;padding:13px 18px;background:#5138c9;color:#fff;font-weight:800;box-shadow:0 12px 30px rgba(35,25,100,.25);cursor:pointer}.elmi-contract-fab:hover{transform:translateY(-2px)}
    .elmi-contract-modal[hidden]{display:none}.elmi-contract-modal{position:fixed;inset:0;z-index:1200;display:grid;place-items:center;padding:20px}.elmi-contract-backdrop{position:absolute;inset:0;background:rgba(13,20,38,.62);backdrop-filter:blur(5px)}
    .elmi-contract-card{position:relative;width:min(760px,100%);max-height:90vh;overflow:auto;background:#fff;border-radius:22px;box-shadow:0 28px 90px rgba(8,15,30,.35);padding:30px}.elmi-contract-close{position:absolute;right:18px;top:14px;border:0;background:transparent;font-size:30px;color:#6c7890;cursor:pointer}.elmi-contract-kicker{font-size:10px;font-weight:900;letter-spacing:2px;color:#5138c9}.elmi-contract-card h2{margin:8px 0 6px;font-size:30px}.elmi-contract-sub{color:#69758b;line-height:1.55;margin:0 0 22px;max-width:650px}.elmi-contract-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}.elmi-contract-grid label{display:flex;flex-direction:column;gap:6px;font-size:11px;font-weight:750;color:#5d6880}.elmi-contract-grid label.full{grid-column:1/-1}.elmi-contract-grid input,.elmi-contract-grid select,.elmi-contract-grid textarea{width:100%;border:1px solid #dce2ec;border-radius:10px;padding:11px;background:#fff;outline:none;color:#172033}.elmi-contract-grid input:focus,.elmi-contract-grid select:focus,.elmi-contract-grid textarea:focus{border-color:#6b59d7;box-shadow:0 0 0 3px rgba(81,56,201,.08)}.elmi-contract-foot{display:flex;align-items:center;justify-content:space-between;gap:16px;margin-top:20px;padding-top:18px;border-top:1px solid #edf0f5}.elmi-contract-foot small{color:#7a859a;font-size:10px;line-height:1.4}.elmi-contract-foot .btn{white-space:nowrap}@media(max-width:650px){.elmi-contract-fab{right:14px;bottom:14px}.elmi-contract-card{padding:24px 18px}.elmi-contract-grid{grid-template-columns:1fr}.elmi-contract-grid label.full{grid-column:auto}.elmi-contract-foot{align-items:stretch;flex-direction:column}.elmi-contract-foot .btn{width:100%}}
  `;
  document.head.appendChild(css);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', inject); else inject();
})();