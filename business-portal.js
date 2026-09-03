(() => {
  const app = document.getElementById('app');
  if (!app) return;

  const tasks = [
    {section:'Minnesota Vendor Registration', items:['Receive Minnesota vendor registration approval','Save approval/registration confirmation','Record vendor number and login details securely','Confirm UNSPSC/service categories are accurate']},
    {section:'Company & Capability Package', items:['Finalize one-page capabilities statement','Finalize company profile / service description','Document Microsoft Power Platform expertise','Prepare core service offerings and differentiators','Prepare NAICS and UNSPSC code list']},
    {section:'Resumes & Past Performance', items:['Create owner / lead consultant resume','Create lead developer resume','Create additional consultant resumes','Prepare 3–5 project summaries','Prepare past-performance references and contact information']},
    {section:'Proposal Readiness', items:['Create proposal response template','Create technical approach template','Create management / staffing approach','Create pricing / rate sheet','Create milestone-based delivery language','Create quality assurance approach','Create accessibility / security response language']},
    {section:'Documents & Compliance', items:['Business registration documents','W-9 / tax documentation','Insurance certificate','Banking / ACH information','Diversity / certification documents if applicable','Standard terms and representations','Secure folder for bid documents']},
    {section:'Bid Submission Workflow', items:['Review solicitation requirements','Confirm mandatory forms and attachments','Map requirements to company capabilities','Identify questions / clarifications before deadline','Perform final compliance check','Submit before deadline','Save submitted proposal and confirmation']}
  ];

  const key = 'elmi-contract-readiness-v1';
  let checked = JSON.parse(localStorage.getItem(key) || '{}');
  const esc = v => String(v ?? '').replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  const all = tasks.flatMap(s => s.items.map(item => ({id:s.section+'::'+item, section:s.section, item})));

  function save(){ localStorage.setItem(key, JSON.stringify(checked)); }
  function progress(){ const done = all.filter(x => checked[x.id]).length; return {done,total:all.length,pct:Math.round(done/all.length*100)}; }

  const style=document.createElement('style');
  style.textContent=`
    .biz-landing{min-height:100vh;background:#f5f7fb;color:#172033;display:grid;grid-template-columns:1.1fr .9fr}
    .biz-hero{padding:72px 8vw;display:flex;flex-direction:column;justify-content:center;background:#10182d;color:#fff;position:relative;overflow:hidden}
    .biz-hero:after{content:'';position:absolute;width:420px;height:420px;border-radius:50%;right:-170px;top:-150px;border:1px solid rgba(255,255,255,.1);box-shadow:0 0 0 60px rgba(255,255,255,.025),0 0 0 120px rgba(255,255,255,.018)}
    .biz-logo-card{width:86px;height:86px;background:#fff;border-radius:18px;display:grid;place-items:center;padding:13px;margin-bottom:28px;box-shadow:0 16px 45px rgba(0,0,0,.22);position:relative;z-index:1}.biz-logo-card img{max-width:100%;max-height:100%;object-fit:contain}
    .biz-eyebrow{font-size:11px;letter-spacing:2px;font-weight:800;color:#9ba9c5}.biz-hero h1{font-size:clamp(38px,5vw,64px);line-height:1.02;margin:12px 0 18px;max-width:720px}.biz-hero p{font-size:16px;line-height:1.7;color:#bdc7d9;max-width:680px}.biz-services{display:flex;flex-wrap:wrap;gap:8px;margin-top:22px}.biz-chip{border:1px solid rgba(255,255,255,.16);background:rgba(255,255,255,.05);padding:8px 11px;border-radius:999px;font-size:11px;color:#e5eaf3}
    .biz-panel{background:#fff;display:flex;align-items:center;padding:50px 7vw}.biz-panel-inner{width:min(500px,100%)}.biz-panel h2{font-size:30px;margin:0 0 10px}.biz-panel p{color:#69758b;line-height:1.6}.biz-login{margin-top:25px;padding:24px;border:1px solid #e4e8ef;border-radius:18px;box-shadow:0 18px 55px rgba(20,33,61,.08)}
    .biz-actions{display:flex;gap:10px;margin-top:18px}.biz-btn{border:1px solid #d8deea;background:#fff;color:#25314a;border-radius:10px;padding:12px 16px;font-weight:750;cursor:pointer}.biz-btn.primary{background:#5138c9;border-color:#5138c9;color:#fff}.biz-note{margin-top:14px;font-size:10px;color:#8a94a7;background:#f6f8fc;padding:10px;border-radius:8px}
    .readiness-page{max-width:1280px}.readiness-hero{background:linear-gradient(135deg,#10182d,#1e2c4d);color:#fff;border-radius:18px;padding:26px 28px;margin-bottom:18px;display:flex;justify-content:space-between;gap:24px;align-items:center}.readiness-hero h1{margin:5px 0 7px;font-size:30px}.readiness-hero p{margin:0;color:#c6cfdf}.readiness-score{text-align:right;min-width:120px}.readiness-score strong{font-size:38px;display:block}.readiness-bar{height:8px;background:#35415d;border-radius:99px;overflow:hidden;margin-top:8px}.readiness-bar i{display:block;height:100%;background:#72d59b;border-radius:inherit}.readiness-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}.readiness-card{background:#fff;border:1px solid #e3e8f0;border-radius:15px;padding:20px}.readiness-card h3{margin:0 0 14px;font-size:15px}.readiness-task{display:flex;gap:10px;align-items:flex-start;padding:10px 0;border-bottom:1px solid #eef1f5;font-size:12px;color:#39455c}.readiness-task:last-child{border-bottom:0}.readiness-task input{margin-top:2px;accent-color:#5138c9}.readiness-task.done span{text-decoration:line-through;color:#8993a5}.readiness-tools{display:flex;justify-content:space-between;gap:10px;align-items:center;margin:16px 0}.readiness-tools button{border:1px solid #dce2ed;background:#fff;border-radius:9px;padding:8px 11px;cursor:pointer;font-size:11px;font-weight:700}.readiness-primary{background:#5138c9!important;color:#fff;border-color:#5138c9!important}
    .readiness-nav-btn{margin:12px 14px 0;width:calc(100% - 28px);border:1px solid #384565;background:#182541;color:#fff;border-radius:9px;padding:10px;text-align:left;cursor:pointer;font-weight:700}
    @media(max-width:900px){.biz-landing{grid-template-columns:1fr}.biz-hero{padding:48px 9vw}.biz-panel{padding:38px 9vw}.readiness-grid{grid-template-columns:1fr}.readiness-hero{align-items:flex-start;flex-direction:column}.readiness-score{text-align:left}}
  `;
  document.head.appendChild(style);

  function landing(){
    app.innerHTML=`<div class="biz-landing">
      <section class="biz-hero"><div class="biz-logo-card"><img src="logo.png" alt="Elmi Inc. logo"></div><span class="biz-eyebrow">ELMI INC. CONSULTING</span><h1>Technology services built for modern organizations.</h1><p>Elmi Inc. provides Microsoft Power Platform consulting, application development, automation, data and analytics, systems integration, and technical delivery support.</p><div class="biz-services"><span class="biz-chip">Power Apps</span><span class="biz-chip">Power Automate</span><span class="biz-chip">Power BI</span><span class="biz-chip">Dataverse</span><span class="biz-chip">Power Pages</span><span class="biz-chip">IT Consulting</span><span class="biz-chip">Application Modernization</span></div></section>
      <section class="biz-panel"><div class="biz-panel-inner"><span class="biz-eyebrow" style="color:#5138c9">ELMI INC. BUSINESS PORTAL</span><h2>Ready for your next engagement.</h2><p>Explore our service capabilities, vendor readiness, proposal workflow, documentation, compliance and contract operations in one place.</p><div class="biz-actions"><button class="biz-btn primary" id="bizSignIn">Sign In</button><button class="biz-btn" id="bizExplore">Explore Services</button></div><div class="biz-note">Demo portal • Sign-in is currently front-end only. Production authentication will be connected later.</div></div></section>
    </div>`;
    document.getElementById('bizSignIn').onclick=()=>window.doLogin();
    document.getElementById('bizExplore').onclick=()=>{document.querySelector('.biz-services')?.scrollIntoView({behavior:'smooth'});};
  }

  function readiness(){
    const p=progress();
    const host=document.querySelector('.content'); if(!host)return;
    host.innerHTML=`<div class="readiness-page"><div class="readiness-hero"><div><div class="biz-eyebrow">ELMI INC. · PROCUREMENT OPERATIONS</div><h1>Contract Readiness</h1><p>A practical checklist for getting Elmi Inc. from vendor registration to a complete, compliant proposal.</p></div><div class="readiness-score"><strong>${p.pct}%</strong><span>${p.done} of ${p.total} complete</span><div class="readiness-bar"><i style="width:${p.pct}%"></i></div></div></div><div class="readiness-tools"><span class="small muted">Saved automatically in this browser.</span><div><button onclick="window.elmiReadinessMarkAll()">Mark all</button> <button onclick="window.elmiReadinessClear()">Clear all</button></div></div><div class="readiness-grid">${tasks.map(s=>`<section class="readiness-card"><h3>${esc(s.section)}</h3>${s.items.map(item=>{const id=s.section+'::'+item;return `<label class="readiness-task ${checked[id]?'done':''}"><input type="checkbox" data-task="${esc(id)}" ${checked[id]?'checked':''}><span>${esc(item)}</span></label>`}).join('')}</section>`).join('')}</div></div>`;
    host.querySelectorAll('[data-task]').forEach(cb=>cb.addEventListener('change',e=>{checked[e.target.dataset.task]=e.target.checked;save();readiness();}));
  }

  window.elmiReadinessMarkAll=()=>{all.forEach(x=>checked[x.id]=true);save();readiness();};
  window.elmiReadinessClear=()=>{checked={};save();readiness();};

  function addNav(){
    const sidebar=document.querySelector('.sidebar'); if(!sidebar||document.getElementById('contractReadinessNav'))return;
    const b=document.createElement('button');b.id='contractReadinessNav';b.className='readiness-nav-btn';b.textContent='☑  Contract Readiness';b.onclick=()=>{state.page='readiness';readiness();};
    sidebar.querySelector('.nav')?.appendChild(b);
  }

  const originalDoLogin=window.doLogin;
  window.doLogin=function(){ originalDoLogin(); setTimeout(addNav,30); };
  window.addEventListener('load',()=>setTimeout(()=>{ if(!state.logged) landing(); },0));
  setTimeout(()=>{ if(!state.logged) landing(); },20);
})();
