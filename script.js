// ═══════════════════════════════════════════════════════════
//  AI ENGINEER CURRICULUM TRACKER — script.js
//  Features:
//  • Auto-detect delays (week passed, not marked done)
//  • Public / Private delay reasons
//  • Daily slot tracking (resets weekly)
//  • Roadmap state persists forever (localStorage)
//  • Per-phase progress bars
//  • 3 Capstone project cards
//  • Milestone timeline
//  • Light/Dark theme
// ═══════════════════════════════════════════════════════════

// ── Persistent roadmap state (never resets automatically) ──
const RKEY = 'ai_curriculum_state_v1';
function loadRS() { return JSON.parse(localStorage.getItem(RKEY) || '{}'); }
function saveRS()  { localStorage.setItem(RKEY, JSON.stringify(RS)); }
let RS = loadRS(); // { weekNum: { status, reason, visibility, timestamp } }

// ── Daily slot state (resets each Monday) ──
function weekKey() {
  const d = new Date();
  const mon = new Date(d);
  mon.setDate(d.getDate() - ((d.getDay() + 6) % 7));
  return `ai_daily_${mon.getFullYear()}_${mon.getMonth()}_${mon.getDate()}`;
}
function loadDS() { return JSON.parse(localStorage.getItem(weekKey()) || '{"s":{}}'); }
function saveDS()  { localStorage.setItem(weekKey(), JSON.stringify(DS)); }
let DS = loadDS(); // { s: { slotId: 'done' } }

// ── Modal state ──
let pendingWeek = null;
let pendingVis  = 'public';

// ══════════════════════════════
//  TIME UTILITIES
// ══════════════════════════════

function nowMins() {
  const n = new Date();
  return n.getHours() * 60 + n.getMinutes();
}
function toMins(t) {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
}
function todayDOW() { return new Date().getDay(); }

// How many weeks since ROADMAP_START
function currentRoadmapWeek() {
  const diff = new Date() - new Date(ROADMAP_START);
  const wk   = Math.floor(diff / (7 * 86400000)) + 1;
  return Math.max(1, Math.min(wk, 26));
}

// Estimated finish date
function estFinish() {
  const done      = Object.values(RS).filter(v => v.status === 'completed').length;
  const remaining = 26 - done;
  const d         = new Date();
  d.setDate(d.getDate() + remaining * 7);
  return d.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' });
}

// ══════════════════════════════
//  STATUS LOGIC
// ══════════════════════════════

function getStatus(week) {
  const manual = RS[week]?.status;
  if (manual) return manual;
  const cur = currentRoadmapWeek();
  if (week < cur)  return 'auto-delay';  // missed!
  if (week === cur) return 'in-progress';
  return 'pending';
}

function pendingAfter(week) {
  return ROADMAP.filter(w => w.week > week && getStatus(w.week) !== 'completed').length;
}

// ══════════════════════════════
//  LIVE CLOCK
// ══════════════════════════════

function updateClock() {
  const n = new Date();
  document.getElementById('live-clock').textContent =
    '🕐 ' + n.toLocaleTimeString('en-IN', { hour12: false });
  document.getElementById('live-date').textContent =
    n.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

// ══════════════════════════════
//  MEGA STRIP
// ══════════════════════════════

function renderMegaStrip() {
  const cur     = currentRoadmapWeek();
  const item    = ROADMAP.find(w => w.week === cur);
  const phase   = item?.phase || 1;
  const cfg     = PHASE_CONFIG[phase];

  const done    = Object.values(RS).filter(v => v.status === 'completed').length;
  const caps    = [12, 22, 26].filter(w => RS[w]?.status === 'completed').length;
  const delayed = ROADMAP.filter(w => {
    const s = getStatus(w.week);
    return s === 'delayed' || s === 'auto-delay';
  }).length;
  const pct = Math.round((done / 26) * 100);

  document.getElementById('mc-phase').textContent   = `Ph ${phase} · ${cfg.label.split('—')[1]?.trim() || cfg.label}`;
  document.getElementById('mc-phase').style.color   = cfg.color;
  document.getElementById('mc-week').textContent    = `Week ${cur} / 26`;
  document.getElementById('mc-done').textContent    = `${done} / 26`;
  document.getElementById('mc-caps').textContent    = `${caps} / 3`;
  document.getElementById('mc-delayed').textContent = delayed;
  document.getElementById('mc-pct').textContent     = pct + '%';
  document.getElementById('mc-finish').textContent  = estFinish();

  // Global bar
  document.getElementById('global-bar').style.width = pct + '%';
}

// ══════════════════════════════
//  PHASE BARS
// ══════════════════════════════

function renderPhaseBars() {
  const row = document.getElementById('phase-bars-row');
  row.innerHTML = '';
  [1,2,3,4,5,6,7,8,9].forEach(ph => {
    const cfg   = PHASE_CONFIG[ph];
    const weeks = ROADMAP.filter(w => w.phase === ph);
    const done  = weeks.filter(w => getStatus(w.week) === 'completed').length;
    const pct   = Math.round((done / weeks.length) * 100);
    const d = document.createElement('div');
    d.className = 'pb-wrap';
    d.innerHTML = `
      <div class="pb-label" style="color:${cfg.color}" title="${cfg.label}">${cfg.label.split('—')[0].trim()}</div>
      <div class="pb-track"><div class="pb-fill" style="width:${pct}%;background:${cfg.color}"></div></div>
      <div class="pb-pct">${done}/${weeks.length} · ${pct}%</div>
    `;
    row.appendChild(d);
  });
}

// ══════════════════════════════
//  DAILY SLOTS
// ══════════════════════════════

function renderDailySlots() {
  const dow = todayDOW();
  const now = nowMins();
  const c   = document.getElementById('daily-slots-container');
  c.innerHTML = '';

  DAILY_SLOTS.forEach(slot => {
    const ok    = slot.days.includes(dow);
    const saved = DS.s[slot.id];
    const start = toMins(slot.start);
    const end   = toMins(slot.end);
    let cls = 'slot-na', badge = '', badgeCls = '';

    if (ok) {
      if (saved === 'done') {
        cls = 'slot-done'; badge = '✅ Done'; badgeCls = 'sb-done';
      } else if (now >= start && now < end) {
        cls = 'slot-active'; badge = '▶ NOW'; badgeCls = 'sb-active';
      } else if (now >= end) {
        cls = 'slot-missed'; badge = '⚠ Missed?'; badgeCls = 'sb-missed';
      } else {
        cls = 'slot-upcoming'; badge = '⏳ Later'; badgeCls = 'sb-upcoming';
      }
    }

    const d = document.createElement('div');
    d.className = `slot-card ${cls}`;
    d.innerHTML = `
      ${badge ? `<span class="slot-badge ${badgeCls}">${badge}</span>` : ''}
      <div class="slot-label">${slot.label}</div>
      <div class="slot-time">${slot.start}–${slot.end}${!ok ? ' <em style="color:var(--muted)">(not today)</em>' : ''}</div>
      ${ok && saved !== 'done' ? `<button class="btn-done" style="margin-top:5px;font-size:.68rem" onclick="markSlot('${slot.id}')">✅ Mark Done</button>` : ''}
    `;
    c.appendChild(d);
  });
}

function markSlot(id) {
  DS.s[id] = 'done';
  saveDS();
  renderDailySlots();
}

// ══════════════════════════════
//  LEFT PANEL: ROADMAP LIST
// ══════════════════════════════

function renderRoadmapList() {
  const c       = document.getElementById('roadmap-list');
  const pfilt   = parseInt(document.getElementById('phase-filter').value);
  const sfilt   = document.getElementById('status-filter').value;
  const cur     = currentRoadmapWeek();
  c.innerHTML   = '';
  let lastPhase = null;

  const filtered = ROADMAP.filter(item => {
    const eff = getStatus(item.week);
    if (pfilt && item.phase !== pfilt) return false;
    if (sfilt !== 'all') {
      if (sfilt === 'delayed' && eff !== 'delayed' && eff !== 'auto-delay') return false;
      if (sfilt !== 'delayed' && eff !== sfilt) return false;
    }
    return true;
  });

  filtered.forEach(item => {
    const eff = getStatus(item.week);
    const cfg = PHASE_CONFIG[item.phase];

    if (item.phase !== lastPhase) {
      lastPhase = item.phase;
      const hdr = document.createElement('div');
      hdr.className = 'phase-hdr';
      hdr.style.color = cfg.color;
      hdr.innerHTML = `
        <span style="display:inline-block;width:9px;height:9px;background:${cfg.color};border-radius:50%"></span>
        ${cfg.label}
        <span style="color:var(--muted);font-weight:400">${cfg.weeks}</span>
        <span style="color:var(--muted);font-weight:400;font-size:.58rem">${cfg.difficulty}</span>
      `;
      c.appendChild(hdr);
    }

    const statusCls = {
      'completed':   'ri-completed',
      'in-progress': 'ri-in-progress',
      'auto-delay':  'ri-auto-delay',
      'delayed':     'ri-delayed',
      'pending':     'ri-pending',
    }[eff] || 'ri-pending';

    const isNow  = item.week === cur;
    const isCap  = !!item.isCapstone;
    const lcol   = eff === 'completed' ? 'var(--green)'
                 : (eff === 'delayed' || eff === 'auto-delay') ? 'var(--red)'
                 : cfg.color;

    const modHTML = item.modules.map(m =>
      `<span class="ri-mod-chip">${m}</span>`
    ).join('');

    const div = document.createElement('div');
    div.className = `roadmap-item ${statusCls}${isCap ? ' ri-capstone' : ''}`;
    div.style.borderLeftColor = lcol;

    div.innerHTML = `
      <div class="ri-top">
        <span class="ri-wk-badge" style="background:${cfg.bg};color:${cfg.color}">${item.weekLabel}</span>
        <span class="ri-topic">${item.topic}</span>
        ${isNow ? '<span class="ri-now">▶ THIS WEEK</span>' : ''}
        ${isCap ? '<span class="ri-capstone-badge">🏆 CAPSTONE</span>' : ''}
      </div>
      <div class="ri-modules">${modHTML}</div>
      <div class="ri-detail">${item.detail}</div>
      <div class="ri-resources">📚 ${item.resources.join(' · ')}</div>
      ${item.endState ? `<div class="ri-endstate">🎯 End State: ${item.endState}</div>` : ''}
      ${item.milestone ? `<div class="ri-milestone">${item.milestone}</div>` : ''}
    `;
    c.appendChild(div);
  });
}

// ══════════════════════════════
//  RIGHT PANEL: PROGRESS
// ══════════════════════════════

function renderProgress() {
  const cur  = currentRoadmapWeek();
  const item = ROADMAP.find(w => w.week === cur);

  // ── Focus Card ──
  if (item) {
    const cfg = PHASE_CONFIG[item.phase];
    document.getElementById('focus-card').innerHTML = `
      <div class="fc-label">🎯 This Week's Focus</div>
      <div class="fc-week" style="color:${cfg.color}">Week ${item.week} — ${item.topic}</div>
      <div class="fc-topic">${item.detail}</div>
      <div class="fc-phase">${cfg.label} · ${cfg.weeks} · ${cfg.difficulty}</div>
      ${item.endState ? `<div class="fc-endstate">"${item.endState}"</div>` : ''}
    `;
  }

  // ── Week Schedule ──
  if (item) {
    document.getElementById('week-schedule').innerHTML = `
      <div class="wsb-title">📅 This Week's Daily Plan</div>
      <div class="wsb-row"><div class="wsb-icon">🌅</div><div class="wsb-body"><div class="wsb-time">6:30–7:30 AM Mon–Fri</div><div>${item.morning}</div></div></div>
      <div class="wsb-row"><div class="wsb-icon">🌙</div><div class="wsb-body"><div class="wsb-time">8:00–9:30 PM Mon–Fri</div><div>${item.evening}</div></div></div>
      <div class="wsb-row"><div class="wsb-icon">🗓️</div><div class="wsb-body"><div class="wsb-time">Saturday 9 AM–1 PM</div><div>${item.saturday}</div></div></div>
      <div class="wsb-row"><div class="wsb-icon">☀️</div><div class="wsb-body"><div class="wsb-time">Sunday 10 AM–1 PM</div><div>${item.sunday}</div></div></div>
    `;
  }

  // ── Auto-delay alert ──
  const autoD = ROADMAP.filter(w => getStatus(w.week) === 'auto-delay');
  const alertEl = document.getElementById('delay-alert');
  if (autoD.length > 0) {
    alertEl.classList.remove('hidden');
    alertEl.innerHTML = `⚠️ <strong>${autoD.length} week(s) auto-flagged as delayed</strong> — time passed without marking done:<br/>
      ${autoD.map(w => `• Week ${w.week}: ${w.topic}`).join('<br/>')}
      <br/><span style="color:var(--muted);font-size:.68rem;">Please mark done ✅ or log a delay reason 🔴 below.</span>`;
  } else {
    alertEl.classList.add('hidden');
  }

  // ── Progress items: show auto-delays + current + next 4 ──
  const piEl = document.getElementById('progress-items');
  piEl.innerHTML = '';

  const toShow = ROADMAP.filter(w => {
    const s = getStatus(w.week);
    return s === 'auto-delay' || s === 'in-progress' || s === 'delayed'
      || (s === 'pending' && w.week <= cur + 4);
  }).slice(0, 10);

  toShow.forEach(w => {
    const eff = getStatus(w.week);
    const cfg = PHASE_CONFIG[w.phase];
    const chipMap = {
      'completed':   { cls: 'chip-c',  lbl: '✅ Completed' },
      'in-progress': { cls: 'chip-ip', lbl: '⚡ In Progress' },
      'auto-delay':  { cls: 'chip-ad', lbl: '🟠 Auto-Delay' },
      'delayed':     { cls: 'chip-d',  lbl: '🔴 Delayed' },
      'pending':     { cls: 'chip-p',  lbl: '⏳ Pending' },
    };
    const chip = chipMap[eff];

    const div = document.createElement('div');
    div.className = `progress-item pi-${eff}`;

    let btns = '';
    if (eff !== 'completed')
      btns += `<button class="btn-done"  onclick="markDone(${w.week})">✅ Done</button>`;
    if (eff !== 'delayed' && eff !== 'completed')
      btns += `<button class="btn-delay" onclick="openModal(${w.week})">🔴 Delay Reason</button>`;
    if (eff !== 'pending')
      btns += `<button class="btn-undo"  onclick="resetWeek(${w.week})">↩️ Reset</button>`;

    div.innerHTML = `
      <span class="pi-chip ${chip.cls}">${chip.lbl}</span>
      <div class="pi-name">Week ${w.week}: ${w.topic}</div>
      <div class="pi-detail" style="color:${cfg.color}">${cfg.label}</div>
      ${eff === 'auto-delay' ? `<div class="pi-overdue">⏰ This week passed without completion — please act!</div>` : ''}
      <div class="action-row">${btns}</div>
    `;
    piEl.appendChild(div);
  });

  renderDelayLog();
}

// ══════════════════════════════
//  DELAY LOG
// ══════════════════════════════

function renderDelayLog() {
  const c   = document.getElementById('delay-log-container');
  c.innerHTML = '';

  const autoNoReason = ROADMAP.filter(w =>
    getStatus(w.week) === 'auto-delay' && !RS[w.week]
  );
  const manual = Object.entries(RS).filter(([, v]) => v.status === 'delayed');

  if (!autoNoReason.length && !manual.length) {
    c.innerHTML = '<div class="no-delay">🎉 No delays logged — keep the streak alive! 💪</div>';
    return;
  }

  autoNoReason.forEach(item => {
    const after = pendingAfter(item.week);
    const d = document.createElement('div');
    d.className = 'delay-entry';
    d.innerHTML = `
      <div class="de-task">🟠 Week ${item.week}: ${item.topic}</div>
      <div class="de-meta">${PHASE_CONFIG[item.phase].label}</div>
      <div style="color:var(--orange);margin-top:3px">⚠️ Auto-detected — no reason given yet</div>
      <div class="de-pending">📌 ${after} week(s) still pending after this</div>
      <button class="btn-delay" style="margin-top:5px;font-size:.68rem" onclick="openModal(${item.week})">📝 Add Reason</button>
    `;
    c.appendChild(d);
  });

  manual.forEach(([wkStr, info]) => {
    const wk   = parseInt(wkStr);
    const item = ROADMAP.find(w => w.week === wk);
    if (!item) return;
    const after = pendingAfter(wk);
    const reasonHTML = info.visibility === 'public'
      ? `<div class="de-public">📝 Reason: <em>"${info.reason}"</em> <span style="color:var(--green);font-size:.64rem">🌐 Public</span></div>`
      : `<div class="de-private">🔒 Reason is private (local only)</div>`;

    const d = document.createElement('div');
    d.className = 'delay-entry';
    d.innerHTML = `
      <div class="de-task">🔴 Week ${wk}: ${item.topic}</div>
      <div class="de-meta">${PHASE_CONFIG[item.phase].label} · Logged: ${info.timestamp}</div>
      ${reasonHTML}
      <div class="de-pending">📌 ${after} week(s) still pending after this</div>
    `;
    c.appendChild(d);
  });
}

// ══════════════════════════════
//  MILESTONES
// ══════════════════════════════

function renderMilestones() {
  const track = document.getElementById('milestone-track');
  const cur   = currentRoadmapWeek();
  track.innerHTML = '';

  MILESTONES.forEach((ms, i) => {
    const done    = getStatus(ms.week) === 'completed' || cur > ms.week;
    const current = !done && (i === 0 ? cur <= ms.week : cur > MILESTONES[i-1].week && cur <= ms.week);
    const div = document.createElement('div');
    div.className = `ms-item ${done ? 'ms-done' : current ? 'ms-current' : 'ms-future'}`;
    div.innerHTML = `
      <div class="ms-month">${ms.icon} ${ms.month}</div>
      <div class="ms-text" style="color:${done ? 'var(--green)' : current ? 'var(--yellow)' : 'var(--muted)'}">${ms.text}</div>
    `;
    track.appendChild(div);
    if (i < MILESTONES.length - 1) {
      const arr = document.createElement('div');
      arr.className = 'ms-arrow';
      arr.textContent = '→';
      track.appendChild(arr);
    }
  });
}

// ══════════════════════════════
//  CAPSTONE CARDS
// ══════════════════════════════

function renderCapstones() {
  const row = document.getElementById('capstone-row');
  row.innerHTML = '';
  const cur = currentRoadmapWeek();

  const caps = [
    {
      num: 1, week: 12, title: "Distributed Document Ingestion + RAG Pipeline",
      weeks: "Phase 4 · Week 12", domain: "Unstructured document Q&A (legal, pharma, technical docs)",
      stack: ["Docling","Pinecone","Neo4j","ECS Fargate","DynamoDB","S3","Bedrock","LangSmith"],
      proves: "You can build production RAG, not a Streamlit demo."
    },
    {
      num: 2, week: 22, title: "Multi-Agent Natural Language → SQL on E-commerce Data",
      weeks: "Phase 7 · Week 22", domain: "E-commerce analytics for non-technical users",
      stack: ["LangChain","LangGraph","LangSmith","AgentCore","RDS PostgreSQL","FastAPI","Streamlit","Bedrock"],
      proves: "You can orchestrate multiple specialised agents safely against real production data."
    },
    {
      num: 3, week: 26, title: "Clinical Trials Knowledge Base",
      weeks: "Phases 8–9 · Week 26", domain: "Life sciences AI (substitute legal, finance, or your industry)",
      stack: ["LangChain","LangGraph","Neo4j","Pinecone","Bedrock+AgentCore+Lambda","S3","LangSmith","MLflow"],
      proves: "You can ship an agent into a regulated domain without it killing anyone (or your career)."
    },
  ];

  caps.forEach(cap => {
    const done   = getStatus(cap.week) === 'completed';
    const active = !done && cur <= cap.week && cur > (cap.week - 5);
    const cls    = done ? 'cap-done' : active ? 'cap-active' : 'cap-future';
    const scls   = done ? 'cs-done'  : active ? 'cs-active'  : 'cs-future';
    const slbl   = done ? '✅ Shipped!' : active ? '⚡ In Progress' : '⏳ Upcoming';

    const techHTML = cap.stack.map(t => `<span class="cap-tech">${t}</span>`).join('');
    const div = document.createElement('div');
    div.className = `cap-card ${cls}`;
    div.innerHTML = `
      <div class="cap-num">🏆 CAPSTONE ${cap.num}</div>
      <div class="cap-title">${cap.title}</div>
      <div class="cap-weeks">${cap.weeks} · ${cap.domain}</div>
      <div class="cap-stack">${techHTML}</div>
      <div class="cap-status ${scls}">${slbl}</div>
      <div style="font-size:.65rem;color:var(--muted);margin-top:6px;font-style:italic">Proves: ${cap.proves}</div>
    `;
    row.appendChild(div);
  });
}

// ══════════════════════════════
//  ACTIONS
// ══════════════════════════════

function markDone(week) {
  RS[week] = { status: 'completed', timestamp: new Date().toLocaleString('en-IN') };
  saveRS();
  render();
}

function resetWeek(week) {
  delete RS[week];
  saveRS();
  render();
}

// ── Modal ──
function openModal(week) {
  pendingWeek = week;
  pendingVis  = 'public';
  const item  = ROADMAP.find(w => w.week === week);
  document.getElementById('modal-info').innerHTML =
    `<strong>Week ${week}:</strong> ${item.topic}<br/><span style="color:var(--muted)">${PHASE_CONFIG[item.phase].label}</span>`;
  document.getElementById('modal-reason').value = RS[week]?.reason || '';
  document.getElementById('btn-pub').className  = 'vis-btn v-pub-active';
  document.getElementById('btn-priv').className = 'vis-btn';
  document.getElementById('vis-hint').textContent = '🌐 Public: reason shown on this GitHub Pages URL to all visitors.';
  document.getElementById('delay-modal').classList.remove('hidden');
}

function closeModal() {
  document.getElementById('delay-modal').classList.add('hidden');
  pendingWeek = null;
}

function setVis(v) {
  pendingVis = v;
  document.getElementById('btn-pub').className  = v === 'public'  ? 'vis-btn v-pub-active'  : 'vis-btn';
  document.getElementById('btn-priv').className = v === 'private' ? 'vis-btn v-priv-active' : 'vis-btn';
  document.getElementById('vis-hint').textContent = v === 'public'
    ? '🌐 Public: reason shown on this GitHub Pages URL to all visitors.'
    : '🔒 Private: reason stored in your browser only — NOT shown publicly on the page.';
}

function confirmDelay() {
  const reason = document.getElementById('modal-reason').value.trim();
  if (!reason) { alert('⚠️ Please enter a reason.'); return; }
  RS[pendingWeek] = {
    status:     'delayed',
    reason,
    visibility: pendingVis,
    timestamp:  new Date().toLocaleString('en-IN'),
  };
  saveRS();
  closeModal();
  render();
}

// ── Theme ──
function toggleTheme() {
  document.body.classList.toggle('light');
  localStorage.setItem('ai_theme', document.body.classList.contains('light') ? 'light' : 'dark');
}

// ── Reset Day ──
function confirmResetDay() {
  if (confirm('Reset today\'s slot completion only? (Roadmap week progress is NOT affected)')) {
    DS = { s: {} };
    saveDS();
    renderDailySlots();
  }
}

// ══════════════════════════════
//  MASTER RENDER
// ══════════════════════════════

function render() {
  renderMegaStrip();
  renderPhaseBars();
  renderDailySlots();
  renderRoadmapList();
  renderProgress();
  renderMilestones();
  renderCapstones();
}

// ══════════════════════════════
//  INIT
// ══════════════════════════════

if (localStorage.getItem('ai_theme') === 'light') document.body.classList.add('light');

setInterval(updateClock, 1000);
updateClock();
setInterval(render, 60000); // re-render every 60s (auto-delay detection)
render();
